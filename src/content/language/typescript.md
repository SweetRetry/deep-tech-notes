---
title: "TypeScript 完整指南"
description: "从基础类型到高级特性 - 现代前端开发的类型安全之道"
pubDate: 2024-01-12
---

# TypeScript 完整指南

> TypeScript 不仅仅是 JavaScript 的超集，它是现代前端开发的类型安全守护神。掌握 TypeScript，就是掌握了代码质量和开发效率的双重提升。

## 🎯 为什么选择 TypeScript？

### 开发体验对比

| 特性 | JavaScript | TypeScript | 优势 |
|------|-----------|-----------|------|
| **类型检查** | 运行时发现错误 | 编译时发现错误 | 🚀 提前发现 bug |
| **IDE 支持** | 基础自动补全 | 智能提示和重构 | 🎯 开发效率提升 |
| **代码维护** | 依赖文档和注释 | 类型即文档 | 📚 自文档化 |
| **团队协作** | 接口约定容易漂移 | 强制接口契约 | 🤝 减少沟通成本 |

---

## 📋 基础类型系统

### 原始类型全览

```typescript
// 🔤 字符串类型
let productName: string = "iPhone 15";
let welcomeMsg: string = `Hello, ${productName}!`;

// 🔢 数字类型 
let price: number = 999;
let discount: number = 0.15;
let inventory: bigint = 1000000n;

// ✅ 布尔类型
let isAvailable: boolean = true;
let isDiscounted: boolean = price > 500;

// 🔍 特殊类型
let notSet: undefined = undefined;
let empty: null = null;
let uniqueKey: symbol = Symbol("product-id");
```

### ⚠️ 类型陷阱与最佳实践

```typescript
// ❌ 常见错误
let value: number = null;  // 默认情况下会报错

// ✅ 正确配置
// tsconfig.json: "strictNullChecks": true
let value: number | null = null;  // 明确允许 null

// ❌ 类型混淆
let count: number = 100n;  // bigint 不能赋值给 number

// ✅ 明确类型转换
let count: number = Number(100n);
```

---

## 📚 数组和集合类型

### 数组声明的多种方式

```typescript
// 🎯 基础数组
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// 🔗 联合类型数组
let mixedData: (string | number)[] = ["产品", 100, "价格", 999];

// 📝 对象数组 - 接口定义
interface Product {
  id: number;
  name: string;
  price: number;
  inStock?: boolean;  // 可选属性
}

let products: Product[] = [
  { id: 1, name: "MacBook", price: 1999, inStock: true },
  { id: 2, name: "iPhone", price: 999 }  // inStock 是可选的
];
```

### 高级数组操作

```typescript
// 🔍 数组方法的类型推断
const numbers = [1, 2, 3, 4, 5];  // TypeScript 推断为 number[]

// map 方法保持类型安全
const doubled = numbers.map(n => n * 2);  // number[]
const strings = numbers.map(n => n.toString());  // string[]

// filter 方法的类型保护
const evenNumbers = numbers.filter(n => n % 2 === 0);  // number[]
```

---

## 🎭 元组：精确的数组类型

### 基础元组操作

```typescript
// 📊 固定长度和类型
let userInfo: [number, string, boolean] = [1, "admin", true];
let [id, username, isActive] = userInfo;

// ❌ 错误用法
userInfo = [1, "admin"];  // 长度不匹配
userInfo = ["admin", 1, true];  // 类型顺序错误
```

### 高级元组特性

```typescript
// 🔧 可选元素
type UserInfo = [number, string, boolean?];
let user1: UserInfo = [1, "Alice", true];
let user2: UserInfo = [2, "Bob"];  // 第三个元素可选

// 📦 剩余元素
type EventLog = [string, Date, ...string[]];
let loginEvent: EventLog = ["login", new Date(), "user123", "success"];
let errorEvent: EventLog = ["error", new Date(), "timeout", "retry", "failed"];

// 🔒 只读元组
type ReadonlyCoords = readonly [number, number];
let position: ReadonlyCoords = [10, 20];
// position[0] = 30;  // 错误：无法修改只读元组
```

### 实战应用场景

```typescript
// 🎯 React useState 返回值
function useState<T>(initial: T): [T, (value: T) => void] {
  // 简化实现
  let state = initial;
  const setState = (newValue: T) => { state = newValue; };
  return [state, setState];
}

// 使用示例
const [count, setCount] = useState(0);
const [message, setMessage] = useState("Hello");
```

---

## 🔧 函数类型设计

### 函数声明的多种形式

```typescript
// 📝 函数声明
function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

// 🎯 函数表达式
const calculateDiscount = (price: number, percentage: number): number => {
  return price * (percentage / 100);
};

// 📋 接口定义函数类型
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;
```

### 参数处理策略

```typescript
// 🔧 可选参数和默认值
function createUser(
  name: string,
  age: number = 18,      // 默认值
  email?: string         // 可选参数
): User {
  return { name, age, email };
}

// ✅ 正确调用
createUser("Alice");
createUser("Bob", 25);
createUser("Charlie", 30, "charlie@example.com");

// 📦 剩余参数
function logMessages(level: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}

logMessages("INFO", "服务启动", "端口 3000", "准备就绪");
```

### 函数重载：类型安全的多态

```typescript
// 📝 函数重载声明
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;

// 🎯 函数实现
function format(value: string | number | Date): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  if (value instanceof Date) return value.toISOString();
  throw new Error("Unsupported type");
}

// ✅ 使用时获得精确的类型推断
const text = format("hello");      // string
const num = format(123.456);      // string
const date = format(new Date());   // string
```

---

## 🔍 void 和函数返回类型

### void vs undefined 的区别

```typescript
// 🔄 void：函数不返回值
function logMessage(msg: string): void {
  console.log(msg);
  // 没有 return 语句，或者 return; 
}

// ❌ undefined：必须显式返回 undefined
function getUndefined(): undefined {
  return undefined;  // 必须显式返回
}

// ⚠️ 常见错误
function processData(): undefined {
  console.log("Processing...");
  // 错误：没有返回 undefined
}
```

### 实际应用场景

```typescript
// 🎯 事件处理函数
interface EventHandler {
  (event: Event): void;  // 不关心返回值
}

const handleClick: EventHandler = (e) => {
  e.preventDefault();
  console.log("Button clicked");
  // 无需返回值
};

// 📋 Promise 链式调用
async function processUser(id: number): Promise<void> {
  const user = await fetchUser(id);
  await updateUserStatus(user);
  await logActivity(user.id);
  // 无需返回值，但需要等待所有异步操作完成
}
```

---

## 🎯 高级类型技巧

### 类型保护和类型收窄

```typescript
// 🔍 类型保护函数
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number | boolean) {
  if (isString(value)) {
    // 在这个块中，TypeScript 知道 value 是 string
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    // 在这个块中，value 是 number
    console.log(value.toFixed(2));
  } else {
    // 在这个块中，value 是 boolean
    console.log(value ? "是" : "否");
  }
}
```

### 实用工具类型

```typescript
// 🛠️ 内置工具类型示例
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 🔧 Partial：所有属性变为可选
type UserUpdate = Partial<User>;
// 等同于: { id?: number; name?: string; email?: string; password?: string; }

// 🎯 Pick：选择特定属性
type UserPublic = Pick<User, "id" | "name" | "email">;
// 等同于: { id: number; name: string; email: string; }

// 🚫 Omit：排除特定属性
type UserWithoutPassword = Omit<User, "password">;
// 等同于: { id: number; name: string; email: string; }

// 🔒 Required：所有属性变为必需
type UserRequired = Required<UserUpdate>;
// 等同于原始的 User 接口
```

---

## 🏆 最佳实践和性能优化

### 类型定义策略

```typescript
// ✅ 推荐：使用 interface 定义对象结构
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ✅ 推荐：使用 type 定义联合类型
type Theme = "light" | "dark" | "system";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 🎯 泛型约束
interface Identifiable {
  id: number;
}

function updateEntity<T extends Identifiable>(
  entity: T, 
  updates: Partial<T>
): T {
  return { ...entity, ...updates };
}
```

### 类型安全的API设计

```typescript
// 🌐 类型安全的API客户端
class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
  }
  
  async post<TRequest, TResponse>(
    url: string, 
    data: TRequest
  ): Promise<ApiResponse<TResponse>> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// 使用示例
const api = new ApiClient();
const users = await api.get<User[]>("/users");  // 类型推断为 ApiResponse<User[]>
```

---

## 🚀 进阶学习路线

### 下一步掌握的概念

1. **装饰器模式** - 元编程和依赖注入
2. **模块系统** - 命名空间和模块解析
3. **编译器API** - 代码转换和静态分析
4. **声明文件** - 为JS库添加类型定义

### 推荐工具链

| 工具 | 用途 | 推荐指数 |
|------|------|---------|
| **ESLint + @typescript-eslint** | 代码规范 | ⭐⭐⭐⭐⭐ |
| **Prettier** | 代码格式化 | ⭐⭐⭐⭐⭐ |
| **ts-node** | 直接运行TS文件 | ⭐⭐⭐⭐ |
| **TypeDoc** | 生成API文档 | ⭐⭐⭐ |

TypeScript 的学习是一个渐进的过程，从基础类型开始，逐步掌握高级特性，最终能够设计出类型安全、易维护的大型应用。
