import React, { useContext } from "react";

import {
    AscendingKeyword, DescendingKeyword, FinalKeyword
} from "@dharshi/syntax-tree";
import cn from "classnames";

import { StatementEditorContext } from "../../store/statement-editor-context";
import { checkCommentMinutiae, getJSXForMinutiae, isPositionsEquals } from "../../utils";
import { StatementEditorViewState } from "../../utils/statement-editor-viewstate";
import { InputEditor } from "../InputEditor";
import { useStatementRendererStyles } from "../styles";

export interface KeywordComponentProps {
    model: AscendingKeyword |
        DescendingKeyword |
        FinalKeyword;
}

export function KeywordComponent(props: KeywordComponentProps) {
    const { model } = props;

    const [isHovered, setHovered] = React.useState(false);

    const { modelCtx } = useContext(StatementEditorContext);
    const {
        currentModel: selectedModel,
        changeCurrentModel,
        hasSyntaxDiagnostics
    } = modelCtx;

    const statementRenedererClasses = useStatementRendererStyles();

    const isSelected = selectedModel.model && model && isPositionsEquals(selectedModel.model.position, model.position);

    const onMouseOver = (e: React.MouseEvent) => {
        setHovered(true);
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseOut = (e: React.MouseEvent) => {
        setHovered(false);
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseClick = (e: React.MouseEvent) => {
        if (!hasSyntaxDiagnostics) {
            e.stopPropagation();
            e.preventDefault();
            changeCurrentModel(model);
        }
    }

    const styleClassNames = cn(statementRenedererClasses.expressionElement,
        isSelected && statementRenedererClasses.expressionElementSelected,
        {
            "hovered": !isSelected && isHovered && !hasSyntaxDiagnostics,
        },
    )
    const inputEditorProps = {
        model,
        classNames: "keyword",
        notEditable: true
    };

    const multiLineConstructorConfig = (model.viewState as StatementEditorViewState).multilineConstructConfig;
    const isFieldWithNewLine = multiLineConstructorConfig.isFieldWithNewLine;

    const leadingMinutiaeJSX = getJSXForMinutiae(model.leadingMinutiae, isFieldWithNewLine);
    const trailingMinutiaeJSX = getJSXForMinutiae(model.trailingMinutiae, isFieldWithNewLine);
    const filteredLeadingMinutiaeJSX = checkCommentMinutiae(leadingMinutiaeJSX);

    return (
        <span
            data-testid="Keyword"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={styleClassNames}
            onClick={onMouseClick}
        >
            {filteredLeadingMinutiaeJSX}
            <InputEditor {...inputEditorProps} />
            {trailingMinutiaeJSX}
        </span>
    );
}
