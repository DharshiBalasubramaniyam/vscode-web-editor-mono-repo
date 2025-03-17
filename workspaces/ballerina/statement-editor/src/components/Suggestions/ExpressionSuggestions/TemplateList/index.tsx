// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React, { useContext } from "react";

import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { Grid, GridItem, Tooltip, Typography } from "@dharshi/ui-toolkit";

import { MAX_COLUMN_WIDTH, SUGGESTION_COLUMN_SIZE } from "../../../../constants";
import { Suggestion } from "../../../../models/definitions";
import { StatementEditorContext } from "../../../../store/statement-editor-context";
import { displayCheckBoxAsExpression, isClosedRecord } from "../../../../utils";
import { Expression, ExpressionGroup } from "../../../../utils/expressions";
import { useStmtEditorHelperPanelStyles } from "../../../styles";

interface TemplateListProps {
    group: ExpressionGroup;
    groupIndex: number;
    selectedSuggestions: Suggestion;
    onClickExpressionSuggestion: (expression: Expression, clickedSuggestion: Suggestion) => void
}

export function TemplateList(props: TemplateListProps) {
    const {
        group,
        groupIndex,
        selectedSuggestions,
        onClickExpressionSuggestion,
    } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();

    const {
        modelCtx: {
            currentModel
        }
    } = useContext(StatementEditorContext);

    return (
        <Grid columns={SUGGESTION_COLUMN_SIZE}>
            {
                group.expressions.map((expression, index) => {
                    const isSelected = groupIndex === selectedSuggestions?.selectedGroup
                        && index === selectedSuggestions?.selectedListItem;
                    return (
                        <GridItem
                            key={index}
                            id={index}
                            onClick={() => onClickExpressionSuggestion(expression,
                                { selectedGroup: groupIndex, selectedListItem: index })}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: MAX_COLUMN_WIDTH,
                                color: isSelected ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--foreground)'
                            }}
                            selected={isSelected}
                        >
                            <Tooltip
                                content={expression.name}
                                position="bottom-end"
                            >
                                {displayCheckBoxAsExpression(currentModel.model, expression) ? (
                                    <>
                                        <VSCodeCheckbox
                                            checked={isClosedRecord(currentModel.model)}
                                            onChange={null}
                                            data-testid="is-closed"
                                        />
                                        <div>{"is-closed ?"}</div>
                                    </>
                                ) : (
                                    <Typography
                                        variant="body3"
                                        className={stmtEditorHelperClasses.expressionExample}
                                        data-testid="expression-title"
                                    >
                                        {expression.example}
                                    </Typography>
                                )}
                            </Tooltip>
                        </GridItem>
                    );
                })
            }
        </Grid>
    );
}
