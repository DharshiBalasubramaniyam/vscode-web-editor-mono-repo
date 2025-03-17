// tslint:disable: jsx-no-lambda jsx-no-multiline-js
import React, { useState } from "react";

import { LimitClause, NodePosition, QueryExpression } from "@dharshi/syntax-tree";

import { IDataMapperContext } from "../../../../../utils/DataMapperContext/DataMapperContext";
import { ClauseAddButton } from "../ClauseAddButton";
import { ClickableExpression } from "../Common";
import { useStyles } from "../styles";
import { Button, Codicon, ProgressRing } from "@dharshi/ui-toolkit";

export function LimitClauseItem(props: {
    intermediateNode: LimitClause;
    onEditClick: (value: string, position: NodePosition, label: string) => void;
    onDeleteClick: () => Promise<void>;
    context: IDataMapperContext;
    queryExprNode: QueryExpression;
    itemIndex: number;
}) {
    const { onEditClick, onDeleteClick, intermediateNode, context, queryExprNode, itemIndex } =
        props;
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        try {
            await onDeleteClick();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={classes.clauseItem}>
                <div className={classes.clauseKeyWrap}>{intermediateNode.limitKeyword.value}</div>

                <div className={classes.clauseItemBody}>
                    <div className={classes.clauseWrap}>
                        <ClickableExpression
                            node={intermediateNode.expression}
                            onEditClick={() =>
                                onEditClick(
                                    intermediateNode.expression?.source,
                                    intermediateNode.expression?.position,
                                    "Limit clause"
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
                            data-testid={`limit-clause-delete-${itemIndex}`}
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
