/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import React from 'react';

export default function WebhookIcon(props: any) {
    return (
        <svg  width="16" height="16" viewBox="0 0 16 16" {...props}>
            <g fill="#5668D5" fillRule="evenodd">
                <path d="M8 0c4.418 0 8 3.582 8 8 0 .631-.512 1.143-1.143 1.143S13.714 8.63 13.714 8c0-3.156-2.558-5.714-5.714-5.714-3.156 0-5.714 2.558-5.714 5.714 0 3.156 2.558 5.714 5.714 5.714.631 0 1.143.512 1.143 1.143S8.63 16 8 16c-1.797 0-3.455-.592-4.79-1.592l-.59.588c-.446.446-1.17.446-1.616 0-.446-.447-.446-1.17 0-1.616l.588-.59C.592 11.456 0 9.798 0 8c0-4.418 3.582-8 8-8z" />
                <path fillRule="nonzero" d="M8 4.571c1.894 0 3.429 1.535 3.429 3.429 0 .529-.12 1.03-.334 1.477l3.9 3.903c.447.446.447 1.17 0 1.616-.446.446-1.17.446-1.615 0l-3.903-3.901c-.447.214-.948.334-1.477.334-1.894 0-3.429-1.535-3.429-3.429S6.106 4.571 8 4.571z" opacity=".3" />
            </g>
        </svg>
    )
}
