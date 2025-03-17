import React, { useContext } from "react";

import { RecordField } from "@dharshi/syntax-tree";

import { FIELD_DESCRIPTOR } from "../../../../constants";
import { StatementEditorContext } from "../../../../store/statement-editor-context";
import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface RecordFieldProps {
    model: RecordField;
    isHovered?: boolean;
}

export function RecordFieldComponent(props: RecordFieldProps) {
    const { model, isHovered } = props;

    const stmtCtx = useContext(StatementEditorContext);
    const {
        modelCtx: {
            updateModel,
        }
    } = stmtCtx;

    const onClickOnPlusIcon = (event: any) => {
        event.stopPropagation();
        const newPosition = {
            startLine: model.position.endLine,
            startColumn: model.position.endColumn,
            endLine: model.position.endLine,
            endColumn: model.position.endColumn
        }
        updateModel(`${FIELD_DESCRIPTOR};`, newPosition);
    };

    return (
        <>
            {model.readonlyKeyword && <ExpressionComponent model={model.readonlyKeyword} />}
            <ExpressionComponent model={model.typeName} />
            <ExpressionComponent model={model.fieldName} />
            {model.questionMarkToken && <TokenComponent model={model.questionMarkToken}/>}
            <TokenComponent
                model={model.semicolonToken}
                parentIdentifier={model.fieldName.value}
                isHovered={isHovered}
                onPlusClick={onClickOnPlusIcon}
            />
        </>
    );
}
