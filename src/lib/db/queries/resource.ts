import { and, count, desc, eq, like, or } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../index";
import {
	type Resource,
	resource,
	type ResourceDisk,
	resourceDisk,
} from "../schema";
import type { PageResult } from "@/types";

// 获取首页资源信息
export async function getHomeResource(): Promise<Resource[]> {
	return await db
		.select()
		.from(resource)
		.where(eq(resource.isShowHome, 1))
		.orderBy(desc(resource.id));
}

export async function getAllResource(): Promise<Resource[]> {
	return await db.select().from(resource).orderBy(desc(resource.id));
}

export async function getResourceCount(): Promise<number> {
	const result = await db.select({ value: count() }).from(resource);
	if (result.length > 0) {
		return result[0].value;
	}
	return 3306;
}

export async function getResourcePageList(
	page = 1,
	pageSize = 10,
	query = "",
	category = "",
): Promise<PageResult<Resource>> {
	const list = await db
		.select()
		.from(resource)
		.where(
			and(
				query !== "" ? like(resource.title, `%${query}%`) : undefined,
				category !== "" ? eq(resource.categoryKey, category) : undefined,
			),
		)
		.orderBy(desc(resource.updatedAt), desc(resource.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const totalResult = await db
		.select({ value: count() })
		.from(resource)
		.where(
			and(
				query !== "" ? like(resource.title, query) : undefined,
				category !== "" ? eq(resource.categoryKey, category) : undefined,
			),
		);
	let total = 0;
	if (totalResult.length > 0) {
		total = totalResult[0].value;
	}

	return {
		list,
		total,
	};
}

// 获取热门资源的核心逻辑
async function getHotResourceCore(): Promise<string[]> {
	let list: string[] = []
	try {
		const configDayUrl = `${process.env.HOT_MOVIE_DAY_API}`
		const configDay = await fetch(configDayUrl)
		const configDayResult = await configDay.json()
		const dateStr = configDayResult.data.DAILY.endDay
		// 构造请求参数
		const params = new URLSearchParams({
			type: "DAILY",
			category: "NETWORK_DRAMA",
			date: dateStr,
			attach: "gdi",
			orderTitle: "gdi",
			platformId: "0"
		})
		const url = `${process.env.HOT_MOVIE_API}?${params.toString()}`
		const res = await fetch(url)
		const result = await res.json()
		list = result.data.map((item: any) => item.name)
		if (list.length > 10) {
			list = list.slice(0, 10)
		}
		if (list.length === 0) {
			throw new Error("获取热门资源失败")
		}
	} catch (error) {
		console.error(error)
		const result = await db
			.select()
			.from(resource)
			.orderBy(desc(resource.hotNum), desc(resource.id))
			.limit(10);
		list = result.map(item => item.title)
	}
	return list
}

// 使用 Next.js 缓存包装的热门资源获取函数
export const getHotResource = unstable_cache(
	getHotResourceCore,
	['hot-resource'],
	{
		revalidate: 30 * 60, // 30分钟缓存
		tags: ['hot-resource']
	}
);

export async function saveResource(
	id: number | undefined,
	title: string,
	categoryKey: string,
	url: string,
	pinyin: string,
	desc: string,
	diskType: string,
	hotNum: number,
	isShowHome: number | null,
) {
	if (id) {
		await db
			.update(resource)
			.set({
				title,
				categoryKey,
				url,
				pinyin,
				desc,
				diskType,
				hotNum,
				isShowHome,
			})
			.where(eq(resource.id, id));
	} else {
		await db.insert(resource).values({
			title,
			categoryKey,
			url,
			pinyin,
			desc,
			diskType,
			hotNum,
			isShowHome,
		});
	}
}

export async function deleteResource(id: number) {
	await db.delete(resource).where(eq(resource.id, id));
}

export async function getResourceByPinyin(
	name: string,
): Promise<(Resource & { diskList: ResourceDisk[] }) | null> {
	const list = await db
		.select()
		.from(resource)
		.where(eq(resource.pinyin, name))
		.limit(1);
	if (list.length === 0) {
		return null;
	}
	// 获取资源对应的网盘信息
	const diskList = await db
		.select()
		.from(resourceDisk)
		.where(eq(resourceDisk.resourceId, list[0].id));
	return { ...list[0], diskList };
}

export async function getRelatedResources(title: string): Promise<Resource[]> {
	// 生成递进的子串数组
	let substrings = Array.from({ length: title.length }, (_, i) =>
		title.slice(0, i + 1),
	);
	substrings = substrings.reverse();
	const list = await db
		.select()
		.from(resource)
		.where(
			or(...substrings.map((substr) => like(resource.title, `${substr}%`))),
		)
		.limit(10);

	return list;
}

