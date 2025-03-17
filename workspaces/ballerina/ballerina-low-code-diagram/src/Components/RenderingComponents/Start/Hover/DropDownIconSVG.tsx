// tslint:disable: jsx-no-multiline-js
// tslint:disable: jsx-wrap-multiline
import * as React from "react";

export const DROPDOWN_ICON_SVG_WIDTH = 79;
export const DROPDOWN_ICON_SVG_HEIGHT = 79;
export const DROPDOWN_ICON_OFFSET = 16;

export function DropDownIconSVG(props: { x: number, y: number, onClick: () => void }) {
    const { onClick, ...xyProps } = props;
    return (
        <svg {...xyProps} width={DROPDOWN_ICON_SVG_WIDTH} height={DROPDOWN_ICON_SVG_HEIGHT} >
            <defs>
                <filter id="DefaultDropDownIcon" x="0" y="0" width="34" height="34" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feFlood floodColor="#9a9eac" floodOpacity="0.302" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="HoverDropDownIcon" x="0" y="0" width="34" height="34" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feFlood floodColor="#9a9eac" floodOpacity="0.302" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="DropDownWrapper" className="dropdown-icon-button" transform="translate(4.5 3.5)" onClick={onClick}>
                <g transform="matrix(1, 0, 0, 1, -4.5, -3.5)">
                    <g id="Rectangle_Copy_5-2" className="dropdown-icon-wrapper" transform="translate(4.5 3.5)">
                        <rect width="25" height="25" rx="12.5" stroke="none" />
                        <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="none" />
                    </g>
                </g>
                <path id="DropDownWrapperIcon" className="dropdown-icon" d="M0,0,3.4,3.4,6.8,0" transform="translate(9.018 11.1)"/>
            </g>
        </svg>
    )
}
