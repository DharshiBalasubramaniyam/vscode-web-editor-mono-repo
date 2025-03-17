
import React, { PropsWithChildren, useContext } from 'react';
import { Type } from '@dharshi/ballerina-core';
import { CtrlClickWrapper } from '@dharshi/ballerina-core';
import { DiagramContext } from '../DiagramContext/DiagramContext';

interface CtrlClickProps {
    node: Type;
}

export function CtrlClickGo2Source(props: PropsWithChildren<CtrlClickProps>) {
    const { node, children } = props;
    const { goToSource } = useContext(DiagramContext);
    const handleOnClick = () => {
        goToSource(node);
    };

    return (
        <CtrlClickWrapper onClick={handleOnClick}>
            {children}
        </CtrlClickWrapper>
    )
}
