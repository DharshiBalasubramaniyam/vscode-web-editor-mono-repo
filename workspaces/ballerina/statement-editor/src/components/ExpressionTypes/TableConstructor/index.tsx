import React, { useContext } from "react";

import { NodePosition, TableConstructor } from "@dharshi/syntax-tree";

import { MAPPING_CONSTRUCTOR } from "../../../constants";
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { NewExprAddButton } from "../../Button/NewExprAddButton";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface TableConstructorProps {
    model: TableConstructor;
}

export function TableConstructorComponent(props: TableConstructorProps) {
    const { model } = props;

    const {
        modelCtx: {
            updateModel,
        }
    } = useContext(StatementEditorContext);

    const addNewExpression = () => {
        const expressionTemplate = MAPPING_CONSTRUCTOR;
        const newField = model.rows.length !== 0 ? `, { ${expressionTemplate} }` : `{ ${expressionTemplate} }`;
        const newPosition: NodePosition = model.rows.length === 0
            ? {
                ...model.closeBracket.position,
                endColumn: model.closeBracket.position.startColumn
            }
            : {
                startLine: model.rows[model.rows.length - 1].position.endLine,
                startColumn:  model.rows[model.rows.length - 1].position.endColumn,
                endLine: model.closeBracket.position.startLine,
                endColumn: model.closeBracket.position.startColumn
            }
        updateModel(newField, newPosition);
    };

    return (
        <>
            <TokenComponent model={model.tableKeyword} className={"keyword"} />
            <TokenComponent model={model.openBracket} />
            <ExpressionArrayComponent expressions={model.rows} />
            <NewExprAddButton model={model} onClick={addNewExpression}/>
            <TokenComponent model={model.closeBracket} />
        </>
    );
}
