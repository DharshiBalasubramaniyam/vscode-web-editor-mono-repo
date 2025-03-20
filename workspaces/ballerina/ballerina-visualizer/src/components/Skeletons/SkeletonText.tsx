import React, { type FC, type HTMLProps } from "react";

interface Props {
	className?: HTMLProps<HTMLElement>["className"];
}

export const SkeletonText: FC<Props> = ({ className }) => {
	return <div />;
};
