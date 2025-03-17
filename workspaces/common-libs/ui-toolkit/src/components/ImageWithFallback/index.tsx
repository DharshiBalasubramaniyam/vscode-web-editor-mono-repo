/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import React, { useState } from "react";
import styled from "@emotion/styled";

const IconWrapper = styled.div<{ size: number }>`
    position: relative;
    width: ${(props: { size: number }) => props.size}px;
    height: ${(props: { size: number }) => props.size}px;
`;

const IconImage = styled.img<{ isLoading: boolean }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: ${(props: { isLoading: boolean }) => (props.isLoading ? 0 : 1)};
    transition: opacity 0.3s ease-in-out;
`;

// TODO: Add a loader icon from the font-wso2-vscode library.
function LoaderImage() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRings20" attributeName="transform" begin="0;svgSpinnersPulseRings21.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRings21.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRings21.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRings21" attributeName="transform" begin="svgSpinnersPulseRings20.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRings20.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRings20.begin+0.96s" calcMode="spline" dur="1.92s" keySplines=".52,.6,.25,.99" values="1;0"/></path>
        </svg>
    );
}

interface ImageWithFallbackProps {
    imageUrl: string;
    fallbackEl: React.ReactElement;
    loadingEl?: React.ReactElement;
    size?: number;
    className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    imageUrl,
    fallbackEl: fallbackEl,
    loadingEl = <LoaderImage />,
    size = 24,
    className = "",
}) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setIsLoading(false);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    if (!imageUrl || imageError) {
        return React.cloneElement(fallbackEl, {
            style: { width: size, height: size },
            className,
        });
    }

    return (
        <IconWrapper size={size}>
            {isLoading && loadingEl}
            <IconImage
                src={imageUrl}
                alt="Node Icon"
                className={className}
                isLoading={isLoading}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
        </IconWrapper>
    );
};

export default ImageWithFallback;
