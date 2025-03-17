// tslint:disable: jsx-no-multiline-js
import * as React from "react";

export const COLLAPSE_DOTS_SVG_WIDTH = 18;
export const COLLAPSE_DOTS_SVG_HEIGHT = 4;

export function ThreeDotsSVG(props: { x: number, y: number }) {
    const { ...xyProps } = props;
    return (
        <svg {...xyProps} width={COLLAPSE_DOTS_SVG_WIDTH} height={COLLAPSE_DOTS_SVG_HEIGHT} >
            <g id="CollapseDots" transform="translate(0.5 0.5)">
                <path
                    id="Combined_Shape"
                    d="M14,1.5A1.5,1.5,0,1,1,15.5,3,1.5,1.5,0,0,1,14,1.5Zm-7,0A1.5,1.5,0,1,1,8.5,3,1.5,1.5,0,0,1,7,
                    1.5Zm-7,0A1.5,1.5,0,1,1,1.5,3,1.5,1.5,0,0,1,0,1.5Z"
                    fill="#f7f8fb"
                    stroke="#757785"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                />
            </g>
        </svg>
    )
}
