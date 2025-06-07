---
title: "OAuth 2.0"
description: "OAuth 2.0 与 OpenID Connect 技术解析 - 现代认证授权体系详解"
pubDate: 2024-01-30
---

# OAuth 2.0

## OAuth 2.0 与 OpenID Connect 技术解析

### 引言：协议的必要性演进

在移动支付和开放银行场景中，传统密码验证暴露两大问题：

信任成本过高：第三方应用需要存储用户敏感凭证
权限控制缺失：无法限制第三方访问数据的范围
OAuth 2.0 解决资源访问授权问题，OpenID Connect（OIDC）在其基础上扩展标准化身份验证，二者形成现代认证授权体系的基石。

---

### 一、OAuth 2.0：授权框架的核心

OAuth 2.0 是一个**授权框架**，核心目标是允许第三方应用在用户授权下访问受保护的资源（如用户数据），而无需共享用户密码。

#### 1.1 核心角色

- **资源所有者（Resource Owner）**：用户，拥有数据（如 Google 账户）。
- **客户端（Client）**：第三方应用（如你的网页应用）。
- **授权服务器（Authorization Server）**：颁发令牌的服务（如 Google 的 OAuth 2.0 端点）。
- **资源服务器（Resource Server）**：存储数据的服务（如 Google Drive API）。

#### 1.2 核心流程

OAuth 2.0 定义了多种授权流程，最常见的是**Authorization Code Flow**（授权码流程），适用于服务器端应用。其核心步骤：

1. 用户通过客户端发起授权请求。
2. 授权服务器返回 Authorization Code（授权码）。
3. 客户端使用 Authorization Code 交换 Access Token（访问令牌）。
4. 客户端使用 Access Token 访问资源服务器。

---

### 二、Authorization Code：临时的安全凭证

#### 2.1 什么是 Authorization Code？

Authorization Code 是一个**短期有效的临时授权码**，由授权服务器生成并返回给客户端。它的唯一目的是用于交换 Access Token。

#### 2.2 为什么需要 Authorization Code？

- **安全性**：避免 Access Token 直接暴露在客户端（如浏览器 URL）。
- **支持长期会话**：通过 Authorization Code 可以获取 Refresh Token，用于刷新 Access Token。

#### 2.3 典型使用场景

- 服务器端 Web 应用（如传统多页应用）。
- 需要高安全性的场景（如涉及支付的应用）。

---

### 三、Access Token：访问资源的钥匙

#### 3.1 什么是 Access Token？

Access Token 是 OAuth 2.0 的核心令牌，用于**访问受保护资源**。它是一个字符串，通常由授权服务器颁发，资源服务器根据它决定是否允许访问。

#### 3.2 Access Token 的特点

- **短期有效**：通常 1 小时过期。
- **不包含用户信息**：仅作为访问凭证，需通过 API 获取用户数据。

#### 3.3 使用示例

```bash
# 使用Access Token访问Google Drive API
GET https://www.googleapis.com/drive/v3/files?access_token=YOUR_ACCESS_TOKEN
```

---

### 四、ID Token：身份验证的凭证

#### 4.1 什么是 ID Token？

ID Token 是 OpenID Connect（OIDC）的一部分，是一个**JWT（JSON Web Token）**，用于表示用户的身份信息。它由身份提供商（如 Google）签名，包含用户的基本信息（如用户 ID、邮箱）。

#### 4.2 ID Token 的作用

- **验证用户身份**：客户端可直接解码 JWT 获取用户信息。
- **自包含**：无需调用 API 即可验证用户身份。

#### 4.3 ID Token 示例

```json
{
  "iss": "https://accounts.google.com",
  "sub": "1234567890",
  "aud": "YOUR_CLIENT_ID",
  "exp": 1672444800,
  "email": "user@example.com"
}
```

---

### 五、OAuth 2.0 与 OpenID Connect 的关系

- **OAuth 2.0**：专注于**资源访问授权**（如访问用户的 Google Drive 文件）。
- **OpenID Connect**：在 OAuth 2.0 基础上扩展，增加**身份验证**功能（通过 ID Token）。

#### 5.1 结合使用场景

- 用户登录时，通过 OIDC 获取 ID Token 验证身份。
- 访问 API 时，通过 OAuth 2.0 获取 Access Token。

---

### 六、实践：集成 Google 登录（Authorization Code Flow + PKCE）

如果应用涉及敏感操作（如支付），推荐使用**Authorization Code Flow with PKCE**，即使它是单页应用（SPA）。

#### 6.1 步骤概览

1. **生成 Code Verifier 和 Challenge**

```javascript
// 生成随机的Code Verifier（43-128字符）
function generateCodeVerifier() {
  const array = new Uint8Array(32); // 生成 32 字节的随机数据
  window.crypto.getRandomValues(array);
  return base64UrlEncode(array); // 转换为 Base64 URL 安全格式
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // 移除尾部等号
}

const codeVerifier = generateCodeVerifier();

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier); // 将字符串转换为 Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data); // 计算 SHA-256 哈希
  return base64UrlEncode(hashBuffer); // 转换为 Base64 URL 安全格式
}
```

2. **发起授权请求**
   将用户重定向到 Google 授权页面：

```bash
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=openid email profile&
  code_challenge=YOUR_CODE_CHALLENGE&
  code_challenge_method=S256
```

3. **处理回调并交换 Token**  
   使用 Authorization Code 和 Code Verifier 获取 Token：

   ```javascript
   POST https://oauth2.googleapis.com/token
   Content-Type: application/x-www-form-urlencoded

   client_id=YOUR_CLIENT_ID&
   code=YOUR_AUTHORIZATION_CODE&
   redirect_uri=YOUR_REDIRECT_URI&
   code_verifier=YOUR_CODE_VERIFIER&
   grant_type=authorization_code
   ```

4. **验证 ID Token**  
   在服务器端验证 ID Token 的签名和`aud`字段：

   ```javascript
   const { OAuth2Client } = require("google-auth-library");
   const client = new OAuth2Client("YOUR_CLIENT_ID");

   async function verifyIdToken(idToken) {
     const ticket = await client.verifyIdToken({
       idToken,
       audience: "YOUR_CLIENT_ID",
     });
     return ticket.getPayload();
   }
   ```

---

### 七、安全性最佳实践

1. **始终使用 HTTPS**：防止 Token 在传输中被窃取。
2. **验证 Token 的`aud`字段**：确保 Token 是颁发给你的应用。
3. **短期 Token 与 Refresh Token**：Access Token 有效期设为 1 小时，并通过 Refresh Token 续期。
4. **避免客户端存储敏感数据**：如`client_secret`应仅保存在服务器端。
5. **监控与日志**：记录 Token 使用情况，及时发现异常请求。

---

### 八、总结

- **Authorization Code**：用于安全交换 Access Token，适合服务器端应用。
- **Access Token**：访问资源的凭证，需短期有效。
- **ID Token**：验证用户身份，适合客户端快速登录。
- **OAuth 2.0 + OIDC**：结合使用以实现授权与身份验证。

在涉及金钱交易等高安全性场景中，务必使用 Authorization Code Flow，并通过 PKCE 增强公共客户端的安全性。正确理解和使用这些概念，将帮助您构建安全、可靠的现代 Web 应用。

### 九、举例（Vue - oauth2.0）

以下是一个使用[`vue3-google-login`](https://devbaji.github.io/vue3-google-login/)库的简单举例，展示如何使用 Authorization Code Flow 来实现用户登录和授权：

```ts
import { CallbackTypes } from "vue3-google-login";

const emit = defineEmits<{
  (event: "success"): void;
  (event: "register", args?: { source?: string; email?: string }): void;
}>();

// 回调函数
const handleGoogleLogin: CallbackTypes.CodeResponseCallback = async (
  response: any
) => {
  try {
    // 获取授权码
    const authorisationCode = response.code;

    // 发送授权码到服务器进行登录验证
    const { statusCode, content } = await loginAuth({
      source: "google",
      code: authorisationCode,
      redirectUri: window.location.origin,
    });
    // 验证成功
    if (statusCode === 200) {
      // 已注册，触发成功事件，可能是邮箱验证，也可能是直接登录
      if (content.accountId) {
        emit("success");
        // 未注册， 触发注册事件并说明邮箱号和第三方来源 （ 可能有更多的第三方，apple等）
      } else if (!content.userExist) {
        emit("register", { source: "google", email: content.email });
      }
    }
  } catch (e) {
    // 错误处理
    console.error(e);
  }
};
```

使用方法

```html

import {  GoogleLogin } from "vue3-google-login";

 <template>
   <GoogleLogin
     :callback="handleGoogleLogin"
   >
 </template>;
```

### 十、是否使用 PCKE？

1. 前端应用的类型决定是否需要 PKCE

   - 如果前端是公共客户端（Public Client）：

     - 例如：单页应用（SPA）、移动 App，即使有后端，仍需启用 PKCE。
     - 原因：这类前端无法安全存储 client_secret（代码可能暴露在前端），且 OAuth 2.1 已要求所有授权码流程必须使用 PKCE（无论客户端类型）。
     - 典型流程：前端发起授权请求，授权码通过 URL 返回到前端，再由前端将授权码传递给后端。此时若未用 PKCE，授权码可能被劫持并用于令牌请求（即使后端有 client_secret）。

   - 如果前端是机密客户端（Confidential Client）：
     - 例如：传统多页 Web 应用（如 PHP/JSP），前端代码和后端完全隔离，client_secret 仅存储在后端。
     - OAuth 2.0 场景：可省略 PKCE（依赖 client_secret 验证身份）。
     - OAuth 2.1 场景：仍需启用 PKCE（规范强制要求）。

2. 后端是否参与令牌请求

   - 情况 1：前端直接处理令牌请求

     - 流程：前端获取授权码后，直接向授权服务器请求令牌（需传递 client_secret）。
     - 问题：前端暴露 client_secret，属于重大安全风险，此时必须使用 PKCE 替代 client_secret（即使有后端）。

   - 情况 2：后端代理令牌请求
     - 流程：前端将授权码传递给后端，后端用 client_secret 向授权服务器兑换令牌。
     - 安全性提升：
       - 若后端是机密客户端，client_secret 安全存储，此时可依赖 client_secret 验证身份（OAuth 2.0 允许不启用 PKCE）。
       - 但若遵循 OAuth 2.1，仍需启用 PKCE（规范强制要求）。
     - 风险残留：若授权码在传递给后端前被截获（如前端 URL 泄露），攻击者可尝试用其他客户端兑换令牌。启用 PKCE 可绑定授权请求和令牌请求，彻底杜绝此类攻击。

3. 是否遵循 OAuth 2.1 规范

   - OAuth 2.1：强制要求所有授权码流程使用 PKCE，无论客户端是公共还是机密。
   - OAuth 2.0：仅建议公共客户端使用 PKCE，机密客户端可依赖 client_secret。
     建议：即使使用 OAuth 2.0，为增强安全性，推荐所有场景启用 PKCE。

   - 需要启用 PKCE：
     - 前端是公共客户端（SPA/移动 App），无论是否有后端。
     - 遵循 OAuth 2.1 规范。
     - 需要防御授权码劫持或实现纵深防御。
   - 可省略 PKCE（仅限 OAuth 2.0）：
     - 前端是机密客户端（如传统 Web 应用），且后端安全存储 client_secret，同时接受潜在风险（如授权码泄漏）。

4. 安全最佳实践

   - 纵深防御（Defense in Depth）：
     - 即使后端能通过 client_secret 验证身份，PKCE 仍可防御以下攻击：
       1. 授权码泄漏：攻击者截获授权码后，因缺少 code_verifier 无法兑换令牌。
       2. 客户端伪造：即使 client_secret 泄露，PKCE 仍要求攻击者持有 code_verifier。
   - 统一方案：无论前端是否有后端，启用 PKCE 可简化安全设计，避免因流程变动引入漏洞。

5. 总结
   - 需要启用 PKCE：
     - 前端是公共客户端（SPA/移动 App），无论是否有后端。
     - 遵循 OAuth 2.1 规范。
     - 需要防御授权码劫持或实现纵深防御。
   - 可省略 PKCE（仅限 OAuth 2.0）：
     - 前端是机密客户端（如传统 Web 应用），且后端安全存储 client_secret，同时接受潜在风险（如授权码泄漏）。

推荐：无论场景如何，启用 PKCE 是更安全且面向未来的选择。
