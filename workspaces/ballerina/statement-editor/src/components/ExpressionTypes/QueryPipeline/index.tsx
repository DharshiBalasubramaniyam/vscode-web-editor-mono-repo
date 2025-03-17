import React, { useContext } from "react";

import { NodePosition, QueryPipeline, STNode } from "@dharshi/syntax-tree";

import { ArrayType, DEFAULT_WHERE_INTERMEDIATE_CLAUSE } from "../../../constants";
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { NewExprAddButton } from "../../Button/NewExprAddButton";
import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";

interface QueryPipelineProps {
    model: QueryPipeline;
}

export function QueryPipelineComponent(props: QueryPipelineProps) {
    const { model } = props;

    const {
        modelCtx: {
            updateModel
        }
    } = useContext(StatementEditorContext);

    const [isHovered, setHovered] = React.useState(false);

    const addNewExpression = (fromClauseModel: STNode) => {
        const newPosition: NodePosition = {
            ...fromClauseModel.position,
            startLine: fromClauseModel.position.endLine,
            startColumn: fromClauseModel.position.endColumn
        }
        updateModel(`\n ${DEFAULT_WHERE_INTERMEDIATE_CLAUSE}`, newPosition);
    };

    const onMouseEnter = (e: React.MouseEvent) => {
        setHovered(true);
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseLeave = (e: React.MouseEvent) => {
        setHovered(false);
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <>
            <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                <ExpressionComponent model={model.fromClause} />
                <NewExprAddButton
                    model={model.fromClause}
                    onClick={addNewExpression}
                    classNames={isHovered ? "view" : "hide"}
                />
            </span>
            <br/>
            <ExpressionArrayComponent
                modifiable={true}
                arrayType={ArrayType.INTERMEDIATE_CLAUSE}
                expressions={model.intermediateClauses}
            />
        </>
    );
}
