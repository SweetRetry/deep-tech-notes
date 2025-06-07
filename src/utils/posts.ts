import type { CollectionEntry } from 'astro:content';

export type PostType = CollectionEntry<'browser'> | CollectionEntry<'engineering'> | CollectionEntry<'infra'> | CollectionEntry<'language'>;

/**
 * 按发布日期排序文章（最新的在前）
 */
export function sortPostsByDate(posts: PostType[]): PostType[] {
	return posts.sort(
		(a: PostType, b: PostType) => (b.data.pubDate?.valueOf() || 0) - (a.data.pubDate?.valueOf() || 0)
	);
} 