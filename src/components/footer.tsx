import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-white border-t py-12">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="font-bold text-gray-900 mb-4">联系我们: &emsp;<span className="text-sm text-gray-600">495818445@qq.com</span></h3>
					</div>
				</div>

				<div className="mt-10 pt-6 border-t">
					<p className="text-center text-sm text-gray-600">
						© {new Date().getFullYear()} 焦木盘搜. 保留所有权利.
					</p>
				</div>
			</div>
		</footer>
	);
}
