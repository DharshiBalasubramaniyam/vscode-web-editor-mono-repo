/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
// tslint:disable: jsx-no-multiline-js
import * as React from 'react';

import { DiagramEngine } from '@projectstorm/react-diagrams';
import { HistoryEntry, MACHINE_VIEW } from "@dharshi/ballerina-core";
import { FunctionCall, NodePosition, STKindChecker } from "@dharshi/syntax-tree";
import { Button, Codicon, Icon, ProgressRing, Tooltip } from '@dharshi/ui-toolkit';
import classnames from "classnames";

import { DiagnosticWidget } from '../../Diagnostic/Diagnostic';
import { DataMapperPortWidget, RecordFieldPortModel } from '../../Port';
import { getCollectClauseActions, getFieldLabel, getMappedFnNames } from '../../utils/dm-utils';

import { LinkConnectorNode } from './LinkConnectorNode';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import { QueryExprMappingType } from '../QueryExpression';
import { CodeActionWidget } from '../../CodeAction/CodeAction';
import { AggregationFunctions } from '../../Label';
import { useIntermediateNodeStyles } from '../../../styles';

export interface LinkConnectorNodeWidgetProps {
    node: LinkConnectorNode;
    engine: DiagramEngine;
}

export function LinkConnectorNodeWidget(props: LinkConnectorNodeWidgetProps) {
    const { node, engine } = props;
    const { context } = node;
    const { rpcClient } = useRpcContext();

    const classes = useIntermediateNodeStyles();
    const hasError = node.hasError();
    const diagnostic = hasError ? node.diagnostics[0] : null;
    const fnDef = node.fnDefForFnCall;
    const isTnfFunctionCall = fnDef && fnDef.isExprBodiedFn;
    const connectedViaCollectClause = context?.selection.selectedST?.mappingType
        && context.selection.selectedST.mappingType === QueryExprMappingType.A2SWithCollect;

    const {
        enableStatementEditor,
        updateSelectedComponent,
        referenceManager: {
            handleCurrentReferences
        }
    } = context;
    const [deleteInProgress, setDeleteInProgress] = React.useState(false);

    const onClickEdit = () => {
        const valueNode = node.valueNode;
        const currentReferences = node.sourcePorts.map((port) => port.fieldFQN);
        handleCurrentReferences(currentReferences)
        if (STKindChecker.isSpecificField(valueNode)) {
            enableStatementEditor({
                valuePosition: valueNode.valueExpr.position as NodePosition,
                value: valueNode.valueExpr.source,
                label: (node.isPrimitiveTypeArrayElement ? getFieldLabel(node.targetPort.parentId) : node.editorLabel)
            });
        } else if (STKindChecker.isBinaryExpression(valueNode)) {
            enableStatementEditor({
                valuePosition: valueNode.position as NodePosition,
                value: valueNode.source,
                label: (node.isPrimitiveTypeArrayElement ? getFieldLabel(node.targetPort.portName) : node.editorLabel)
            });
        } else {
            context.enableStatementEditor({
                valuePosition: valueNode.position as NodePosition,
                value: valueNode.source,
                label: "Expression"
            });
        }
    };

    const onClickDelete = () => {
        setDeleteInProgress(true);
        if (node.deleteLink) {
            node.deleteLink();
        }
    };

    const onClickOnGoToDef = async (evt: React.MouseEvent) => {
        evt.stopPropagation();
        const {fnDefPosition, fileUri, fnName} = fnDef;
        const fnDefFilePath = fileUri.replace(/^file:\/\//, "");
        const history = await rpcClient.getVisualizerRpcClient().getHistory();
        const entry: HistoryEntry = {
            location: {
                documentUri: fnDefFilePath,
                position: fnDefPosition,
                view: MACHINE_VIEW.DataMapper,
                identifier: fnName
            },
            dataMapperDepth: history[history.length - 1].dataMapperDepth + 1
        }
        updateSelectedComponent(entry);
    };

    let aggrFnConfigurations: React.ReactNode = null;
    if (connectedViaCollectClause) {
        const target = node.targetMappedPort;
        const fnNames = getMappedFnNames(target);
        if (fnNames.length === 1 && AggregationFunctions.includes(fnNames[0])) {
            const mappedExpr = (target as RecordFieldPortModel)?.editableRecordField?.value;
            const actions = getCollectClauseActions(fnNames[0], mappedExpr as FunctionCall, context.applyModifications);
            aggrFnConfigurations = (
                <CodeActionWidget
                    context={context}
                    additionalActions={actions}
                    isConfiguration={true}
                    btnSx={{ margin: "0 2px" }}
                />
            );
        }
        // TODO: Add support for multiple aggregation functions
    }

    const loadingScreen = (
        <ProgressRing sx={{ height: '16px', width: '16px' }} />
    );

    return (!node.hidden && (
        <div className={classes.root} data-testid={`link-connector-node-${node?.value}`}>
            <div className={classes.header}>
                <DataMapperPortWidget engine={engine} port={node.inPort} dataTestId={`link-connector-node-${node?.value}-input`}/>
                <Tooltip
                    content={isTnfFunctionCall ? "Transformation Function Call" : "Multi-Input Expression"}
                    position="bottom-end"
                >
                    {isTnfFunctionCall ? (
                        <Icon name="function-icon" iconSx={{ fontSize: "15px", color: "var(--vscode-input-placeholderForeground)" }} />) : (
                        <Icon name="explicit-outlined" sx={{ height: "20px", width: "20px" }} iconSx={{ fontSize: "20px", color: "var(--vscode-input-placeholderForeground)" }} />
                    )}
                </Tooltip>
                {isTnfFunctionCall && (
                    <Button
                        appearance="icon"
                        onClick={onClickOnGoToDef}
                        data-testid={`go-to-tnf-fn-${node?.value}`}
                    >
                        <Codicon name="chevron-right" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                    </Button>
                )}
                {aggrFnConfigurations !== null && aggrFnConfigurations}
                <Button
                    appearance="icon"
                    onClick={onClickEdit}
                    data-testid={`link-connector-edit-${node?.value}`}
                >
                    <Codicon name="code" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                </Button>
                {deleteInProgress ? (
                    <div className={classnames(classes.element, classes.loadingContainer)}>
                        {loadingScreen}
                    </div>
                ) : (
                    <Button
                        appearance="icon"
                        onClick={onClickDelete} data-testid={`link-connector-delete-${node?.value}`}
                    >
                        <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                    </Button>
                )}
                { diagnostic && (
                    <DiagnosticWidget
                        diagnostic={diagnostic}
                        value={node.valueNode.source}
                        onClick={onClickEdit}
                        btnSx={{ margin: "0 2px" }}
                    />
                )}
                <DataMapperPortWidget engine={engine} port={node.outPort} dataTestId={`link-connector-node-${node?.value}-output`}/>
            </div>
        </div>
        )
    );
}
