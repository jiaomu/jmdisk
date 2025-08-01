"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ToastContainer, toast } from "react-toastify";

interface ClickboardButtonProps {
	text: string;
	children?: React.ReactNode; // 子元素
	[key: string]: any; // 允许任意其他 props
}

const ClickboardButton = ({
	text,
	children,
	...restProps
}: ClickboardButtonProps) => {
	const handleCopyClick = () => {
		navigator.clipboard.writeText(text).then(
			() => {
				toast("复制成功！");
			},
			() => {
				toast("复制失败！");
			},
		);
	};

	return (
		<Button onClick={handleCopyClick} {...restProps}>
			{children}
			<ToastContainer position="top-center" limit={1} />
		</Button>
	);
};

export default ClickboardButton;
