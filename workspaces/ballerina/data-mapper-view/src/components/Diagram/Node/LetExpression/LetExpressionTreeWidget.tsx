// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React, { ReactNode, useMemo } from 'react';

import styled from "@emotion/styled";
import { Button, Codicon, Icon } from '@dharshi/ui-toolkit';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { CaptureBindingPattern, STKindChecker } from "@dharshi/syntax-tree";

import { useDMSearchStore } from "../../../../store/store";
import { IDataMapperContext } from "../../../../utils/DataMapperContext/DataMapperContext";
import { RecordFieldPortModel } from '../../Port';
import { LET_EXPRESSION_SOURCE_PORT_PREFIX } from "../../utils/constants";
import { TreeContainer } from '../commons/Tree/Tree';

import { DMLetVarDecl } from "./index";
import { LetVarDeclItemWidget } from "./LetVarDeclItemWidget";
import { useIONodesStyles } from '../../../styles';

export interface LetExpressionTreeWidgetProps {
    letVarDecls: DMLetVarDecl[];
    engine: DiagramEngine;
    context: IDataMapperContext;
    isWithinQuery: boolean;
    getPort: (portId: string) => RecordFieldPortModel;
    handleCollapse: (portName: string, isExpanded?: boolean) => void;
}

export function LetExpressionTreeWidget(props: LetExpressionTreeWidgetProps) {
    const { engine, letVarDecls, context, isWithinQuery, getPort, handleCollapse } = props;
    const searchValue = useDMSearchStore.getState().inputSearch;
    const classes = useIONodesStyles();
    const selectedST = context.selection.selectedST.stNode;

    const onClick = () => {
        context.handleLocalVarConfigPanel(true);
    };

    const letVarDeclItems: ReactNode[] = useMemo(() => {
        return letVarDecls.map(decl => {
            const isExprPlaceholder = decl.declaration.expression.source.trim() === "EXPRESSION";
            const isSelfReferencedWithinQuery = isWithinQuery
                && STKindChecker.isLetVarDecl(selectedST)
                && (selectedST.typedBindingPattern.bindingPattern as CaptureBindingPattern)
                    .variableName.value === decl.varName;
            if (!isExprPlaceholder && !isSelfReferencedWithinQuery) {
                return (
                    <LetVarDeclItemWidget
                        key={`${LET_EXPRESSION_SOURCE_PORT_PREFIX}.${decl.varName}`}
                        id={`${LET_EXPRESSION_SOURCE_PORT_PREFIX}.${decl.varName}`}
                        engine={engine}
                        declaration={decl.declaration}
                        context={context}
                        typeDesc={decl.type}
                        getPort={(portId: string) => getPort(portId) as RecordFieldPortModel}
                        handleCollapse={handleCollapse}
                        valueLabel={decl.varName}
                    />
                );
            }
        }).filter(decl => !!decl);
    }, [letVarDecls]);

    return (
        <>
            {letVarDeclItems.length > 0 ? (
                <TreeContainer data-testid={"local-variables-node"}>
                    <LocalVarsHeader>
                        <HeaderText>Local Variables</HeaderText>
                        {!isWithinQuery && (
                            <Button
                                appearance="icon"
                                tooltip="Edit"
                                onClick={onClick}
                                data-testid={"edit-local-variables-btn"}
                                sx={{ paddingRight: "8px" }}
                            >
                                <Icon name="editIcon" />
                            </Button>
                        )}
                    </LocalVarsHeader>
                    {letVarDeclItems}
                </TreeContainer>
            ) : !isWithinQuery && !searchValue && (
                <Button
                    className={classes.addLocalVariableButton}
                    onClick={onClick}
                    appearance="secondary"
                >
                     <Codicon name="add" />
                    Add Sub Mapping
                </Button>
            )}
        </>
    );
}

const LocalVarsHeader = styled.div`
    background: var(--vscode-editorWidget-background);
    width: 100%;
    line-height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
`;

const HeaderText = styled.span`
    margin-left: 10px;
    min-width: 280px;
    font-size: 13px;
    font-weight: 600;
    color: var(--vscode-inputOption-activeForeground)
`;
