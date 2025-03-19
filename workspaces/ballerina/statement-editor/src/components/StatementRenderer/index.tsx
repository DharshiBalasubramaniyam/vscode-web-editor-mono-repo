import React, { useContext } from "react";

import { StatementNodes } from "../../constants";
import { StatementEditorContext } from "../../store/statement-editor-context";
import { getExpressionTypeComponent, getStatementTypeComponent } from "../../utils";

export interface StatementRendererProps {
    model: StatementNodes;
}

export function StatementRenderer(props: StatementRendererProps) {
    const { model } = props;
    const { isExpressionMode } = useContext(StatementEditorContext);
    const component = isExpressionMode ? getExpressionTypeComponent(model) : getStatementTypeComponent(model);

    return (
        <span>
            {component}
        </span>
    );
}
