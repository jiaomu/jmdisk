import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "盘小子 - 免费网盘资源搜索引擎 | 一站式网盘搜索平台",
	description:
		"盘小子为您提供免费的网盘资源搜索服务，支持夸克网盘、百度网盘、阿里云盘等主流网盘平台。快速精准搜索，一键直达，让您轻松找到需要的资源。安全无广告，简单好用。",
	keywords:
		"盘小子,网盘搜索,夸克网盘,百度网盘,阿里云盘,免费资源搜索,网盘资源下载,网盘搜索引擎,资源搜索",
	authors: [{ name: "盘小子" }],
	robots: "index, follow",
	metadataBase: new URL("https://pan.xiaozi.cc"),
	alternates: {
		canonical: "./",
	},
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "盘小子 - 免费网盘资源搜索引擎 | 一站式网盘搜索平台",
		description:
			"盘小子为您提供免费的网盘资源搜索服务，支持多个主流网盘平台。快速精准搜索，一键直达，让您轻松找到需要的资源。安全无广告，简单好用。",
		type: "website",
		locale: "zh_CN",
		siteName: "盘小子",
		url: "https://pan.xiaozi.cc",
		images: ["/og.png"],
	},
	twitter: {
		card: "summary_large_image",
		site: "https://pan.xiaozi.cc",
		creator: "@towelong",
		title: "盘小子 - 免费网盘资源搜索引擎 | 一站式网盘搜索平台",
		description:
			"盘小子为您提供免费的网盘资源搜索服务，支持多个主流网盘平台。快速精准搜索，一键直达，让您轻松找到需要的资源。安全无广告，简单好用。",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh">
			<body className={inter.className}>
				{children}
				{process.env.NODE_ENV === "production" && (
					<Script
						src="https://umami.xiaozi.cc/script.js"
						data-website-id="3ee3abd4-dbdc-47aa-a0a0-f5defc29d76f"
						defer
					/>
				)}
			</body>
		</html>
	);
}
