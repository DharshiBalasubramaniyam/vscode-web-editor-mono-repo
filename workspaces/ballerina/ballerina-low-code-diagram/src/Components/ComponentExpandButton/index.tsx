// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { ComponentCollapseIcon, ComponentExpandIcon } from '@dharshi/ballerina-core';

import './style.scss';

export interface ComponentExpandButtonProps {
    onClick: () => void;
    isExpanded: boolean;
}

export function ComponentExpandButton(props: ComponentExpandButtonProps) {
    const { onClick, isExpanded } = props;

    return (
        <div className={'component-expand-icon-container'} onClick={onClick} >
            {isExpanded ? <ComponentExpandIcon /> : <ComponentCollapseIcon />}
        </div>
    );
}
