import { Logo } from "./logo";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import SearchForm from "./search-form";
import { getHotResource, getResourceCount } from "@/lib/db/queries/resource";
import { Suspense } from "react";

export async function Hero() {
	const hotResources = await getHotResource();
	const count = await getResourceCount();
	return (
		<div className="bg-blue-50 py-12">
			<div className="container grid grid-cols-1 md:grid-cols-1 gap-8 items-center flex-col">
				<div className="space-y-6">
					<div className="flex items-center gap-2 justify-center">
						<Logo size={28} />
						<h1 className="text-2xl font-bold text-blue-500">盘小子</h1>
						<span className="text-gray-700">已收录</span>
						<span className="text-blue-500 font-bold">{count + 3306}</span>
						<span className="text-gray-700">个高质量资源</span>
					</div>
					<SearchForm path="/resource" />
				</div>
				<div>
					<Card className="h-full">
						<CardContent className="p-5 h-full">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-bold">热门搜索</h3>
							</div>
							<ul className="grid grid-cols-2 gap-x-4 gap-y-3">
								{hotResources.map((item, index) => (
									<li key={index}>
										<Link
											href={`/resource?q=${item}`}
											className="flex items-center gap-2 group"
										>
											<span className="text-xs block text-orange-500 font-bold min-w-5">
												{index + 1}
											</span>
											<span className="text-sm group-hover:text-blue-500 text-gray-700 line-clamp-1">
												{item}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
