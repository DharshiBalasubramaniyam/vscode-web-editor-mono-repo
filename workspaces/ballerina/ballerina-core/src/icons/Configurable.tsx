/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import React from 'react';

export interface ConfigurableIconProps {
    className?: string
}

export default function ConfigurableIcon(props: ConfigurableIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className={props?.className ? props.className : "sub-menu-dark-fill"}>
            <path id="config" className="svg-sub-menu-plus-option-icon" d="M9,12.5v-9a3.5,3.5,0,1,1,7,0v9a3.5,3.5,0,1,1-7,0Zm1.4-9v9l0,.15A2.1,2.1,0,0,0,14.6,12.5v-9l-.005-.15A2.1,2.1,0,0,0,10.4,3.5ZM0,12.5v-9a3.5,3.5,0,1,1,7,0v9a3.5,3.5,0,1,1-7,0ZM1.4,3.35l0,.15v9a2.1,2.1,0,0,0,4.194.15L5.6,12.5v-9A2.1,2.1,0,0,0,1.4,3.35ZM12.1,12.6V9.128l.008-.081a.4.4,0,0,1,.792.081V12.6l-.008.081A.4.4,0,0,1,12.1,12.6ZM3.108,6.953,3.1,6.872V3.4a.4.4,0,0,1,.792-.081L3.9,3.4V6.872a.4.4,0,0,1-.792.081Z"/>
        </svg>
    );
}
