import Image from "next/image";

interface LogoProps {
	className?: string;
	size?: number;
}

export function Logo({ className, size = 32 }: LogoProps) {
	return (
		<div
			className={`relative ${className}`}
			style={{ width: size, height: size }}
		>
			<Image
				src="/logos/logo.png"
				alt="焦木盘搜 Logo"
				width={size}
				height={size}
				className="object-contain"
			/>
		</div>
	);
}
