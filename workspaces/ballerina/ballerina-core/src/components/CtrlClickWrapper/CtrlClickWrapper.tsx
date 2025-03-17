/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface CtrlClickWrapperProps {
    onClick: () => void;
}

// Wrapper to capture ctrl click action of children and run an action that's passed through props
export const CtrlClickWrapper = (props: React.PropsWithChildren<CtrlClickWrapperProps>) => {
    const { children, onClick } = props;
    const handleClick = (e: any) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        }
    };

    const mappedChildren = React.Children.map(children, (child: any) => {
        return React.cloneElement(child as React.ReactElement, {
            onClick: handleClick
        });
    });

    return (
        <>
            {mappedChildren}
        </>
    );
}
