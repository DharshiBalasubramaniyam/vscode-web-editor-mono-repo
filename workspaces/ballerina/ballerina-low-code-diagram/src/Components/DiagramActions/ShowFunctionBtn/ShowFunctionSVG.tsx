// tslint:disable: jsx-no-multiline-js
import * as React from "react";

export const SHOW_FUNCTION_SVG_WIDTH_WITH_SHADOW = 20;
export const SHOW_FUNCTION_SVG_HEIGHT_WITH_SHADOW = 20;

export function ShowFunctionSVG(props: {
  x: number;
  y: number;
  ref?: any;
}) {
  const { ...xyProps } = props;
  const center = SHOW_FUNCTION_SVG_WIDTH_WITH_SHADOW / 2;
  return (
    <svg
      {...xyProps}
      width={SHOW_FUNCTION_SVG_WIDTH_WITH_SHADOW}
      height={SHOW_FUNCTION_SVG_HEIGHT_WITH_SHADOW}
    >
      <g id="Expand-Button" className="expand-circle expand-click">
        <circle
          cx={center}
          cy={center}
          r="6.5"
        />
         <path d="m7.74249,8.90568c0.1195,-0.13327 0.30648,-0.14538 0.43826,-0.03635l0.03775,0.03635l1.78151,1.98668l1.78151,-1.98668c0.1195,-0.13327 0.30648,-0.14538 0.43826,-0.03635l0.03775,0.03635c0.1195,0.13327 0.13036,0.34181 0.03259,0.48876l-0.03259,0.04211l-2.25751,2.51772l-2.25751,-2.51772c-0.13144,-0.14659 -0.13144,-0.38428 0,-0.53087z" className="expand-icon" id="Icon-Path"/>
      </g>
    </svg>
  );
}
