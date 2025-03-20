// tslint:disable: jsx-no-lambda  jsx-no-multiline-js
import React, { useState } from "react";

import { STModification } from "@dharshi/ballerina-core";
import {
    CaptureBindingPattern,
    LetClause,
    LetVarDecl,
    NodePosition,
    QueryExpression,
    STNode,
} from "@dharshi/syntax-tree";

import { IDataMapperContext } from "../../../../../utils/DataMapperContext/DataMapperContext";
import { getRenameEdits } from "../../../utils/ls-utils";
import { ClauseAddButton } from "../ClauseAddButton";
import { ClickableExpression } from "../Common";
import { useStyles } from "../styles";
import { Button, Codicon, ProgressRing } from "@dharshi/ui-toolkit";

export function LetClauseItem(props: {
    intermediateNode: LetClause;
    onEditClick: (value: string, position: NodePosition, label: string) => void;
    onDeleteClick: () => Promise<void>;
    context: IDataMapperContext;
    queryExprNode: QueryExpression;
    itemIndex: number;
}) {
    const {
        onEditClick,
        onDeleteClick,
        intermediateNode,
        context,
        queryExprNode,
        itemIndex,
    } = props;
    const { filePath, applyModifications, langServerRpcClient } = context;
    const classes = useStyles();
    const [nameEditable, setNameEditable] = useState(false);
    const letVarDeclaration = intermediateNode.letVarDeclarations[0] as LetVarDecl;
    const variableName = (
        letVarDeclaration.typedBindingPattern.bindingPattern as CaptureBindingPattern
    )?.variableName?.value;
    const [updatedName, setUpdatedName] = useState(variableName);
    const [isLoading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        try {
            await onDeleteClick();
        } finally {
            setLoading(false);
        }
    };

    const onKeyUp = async (key: string, node?: STNode) => {
        if (key === "Escape") {
            setNameEditable(false);
            setUpdatedName("");
        }
        if (key === "Enter") {
            setLoading(true);
            try {
                const workspaceEdit = await getRenameEdits(
                    filePath,
                    updatedName,
                    node.position as NodePosition,
                    langServerRpcClient
                );
                const modifications: STModification[] = [];

                Object.values(workspaceEdit?.changes).forEach((edits) => {
                    edits.forEach((edit) => {
                        modifications.push({
                            type: "INSERT",
                            config: { STATEMENT: edit.newText },
                            endColumn: edit.range.end.character,
                            endLine: edit.range.end.line,
                            startColumn: edit.range.start.character,
                            startLine: edit.range.start.line,
                        });
                    });
                });

                modifications.sort((a, b) => a.startLine - b.startLine);
                await applyModifications(modifications);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className={classes.clauseItem}>
                <div className={classes.clauseKeyWrap}>{intermediateNode.letKeyword.value}</div>

                <div className={classes.clauseItemBody}>
                    <div className={classes.clauseWrap}>
                        <span className={classes.clauseExpression}>
                            {nameEditable ? (
                                <input
                                    spellCheck={false}
                                    className={classes.input}
                                    autoFocus={true}
                                    value={updatedName}
                                    onChange={(event) => setUpdatedName(event.target.value)}
                                    onKeyUp={(event) =>
                                        onKeyUp(
                                            event.key,
                                            (
                                                letVarDeclaration.typedBindingPattern
                                                    .bindingPattern as CaptureBindingPattern
                                            )?.variableName
                                        )
                                    }
                                    onBlur={() => {
                                        setNameEditable(false);
                                        setUpdatedName(variableName);
                                    }}
                                    data-testid={`let-clause-name-input-${itemIndex}`}
                                />
                            ) : (
                                <span onClick={() => setNameEditable(true)} data-testid={`let-clause-name-${itemIndex}`}>{updatedName}</span>
                            )}
                        </span>
                        <span>{letVarDeclaration.equalsToken.value}</span>
                        <ClickableExpression
                            node={letVarDeclaration.expression}
                            onEditClick={() =>
                                onEditClick(
                                    letVarDeclaration?.expression?.source,
                                    letVarDeclaration?.expression?.position,
                                    "Let clause"
                                )
                            }
                            index={itemIndex}
                        />
                    </div>
                    {isLoading ? (
                        <ProgressRing sx={{ height: '16px', width: '16px', marginRight: '10px' }} />
                    ) : (
                        <Button
                            appearance="icon"
                            onClick={onDelete}
                            data-testid={`let-clause-delete-${itemIndex}`}
                            sx={{ marginRight: "10px"}}
                        >
                            <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                        </Button>
                    )}
                </div>
            </div>

            <ClauseAddButton context={context} queryExprNode={queryExprNode} addIndex={itemIndex} />
        </>
    );
}
