/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ExpressionFormField } from "@dharshi/ballerina-side-panel";
import { FlowNode, LineRange, SubPanel } from "@dharshi/ballerina-core";
import FormGenerator from "../../Forms/FormGenerator";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";

const Container = styled.div`
    max-width: 600px;
    height: calc(100% - 32px);
`;

export interface SidePanelProps {
    id?: string;
    className?: string;
    isOpen?: boolean;
    overlay?: boolean;
    children?: React.ReactNode;
    alignment?: "left" | "right";
    width?: number;
    sx?: any;
    onClose?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    subPanel?: ReactNode;
    subPanelWidth?: number;
    isSubPanelOpen?: boolean;
}

interface ConnectionConfigViewProps {
    fileName: string; // file path of `connection.bal`
    selectedNode: FlowNode;
    onSubmit: (node?: FlowNode) => void;
    openSubPanel?: (subPanel: SubPanel) => void;
    updatedExpressionField?: ExpressionFormField;
    resetUpdatedExpressionField?: () => void;
    isActiveSubPanel?: boolean;
}

export function ConnectionConfigView(props: ConnectionConfigViewProps) {
    const {
        fileName,
        selectedNode,
        onSubmit,
        openSubPanel,
        updatedExpressionField,
        resetUpdatedExpressionField,
    } = props;
    const { rpcClient } = useRpcContext();
    const [targetLineRange, setTargetLineRange] = useState<LineRange>();

    useEffect(() => {
        if (selectedNode?.codedata?.lineRange) {
            setTargetLineRange(selectedNode.codedata.lineRange);
            return;
        }

        if (rpcClient) {
            rpcClient
                .getBIDiagramRpcClient()
                .getEndOfFile({ filePath: fileName })
                .then((res) => {
                    setTargetLineRange({
                        startLine: res,
                        endLine: res,
                    });
                });
        }
    }, [fileName, selectedNode, rpcClient]);

    return (
        <Container>
            {targetLineRange && (
                <FormGenerator
                    fileName={fileName}
                    node={selectedNode}
                    targetLineRange={targetLineRange}
                    onSubmit={onSubmit}
                    openSubPanel={openSubPanel}
                    updatedExpressionField={updatedExpressionField}
                    resetUpdatedExpressionField={resetUpdatedExpressionField}
                />
            )}
        </Container>
    );
}

export default ConnectionConfigView;
