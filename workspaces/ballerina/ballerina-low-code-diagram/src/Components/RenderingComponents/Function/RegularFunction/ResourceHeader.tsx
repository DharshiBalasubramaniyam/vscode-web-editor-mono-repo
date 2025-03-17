// tslint:disable: jsx-no-multiline-js
import React, { useContext, useEffect, useState } from "react";

import { ErrorIcon, WarningIcon } from "@dharshi/ballerina-core";
import { NodePosition, ResourceAccessorDefinition } from "@dharshi/syntax-tree";
import classNames from "classnames";

import { Context } from "../../../../Context/diagram";
import { HeaderActionsWithMenu } from "../../../../HeaderActions";
import { HeaderWrapper } from "../../../../HeaderWrapper";
import { getDiagnosticInfo } from "../../../../Utils";

import { ResourceOtherParams } from "./ResourceOtherParams";
import { ResourceQueryParams } from "./ResourceQueryParams";
import "./style.scss";

interface ResourceHeaderProps {
    model: ResourceAccessorDefinition;
    onExpandClick: () => void;
    isExpanded: boolean;
}

export function ResourceHeader(props: ResourceHeaderProps) {
    const { model, onExpandClick, isExpanded } = props;

    const sourceSnippet = model?.source;
    const diagnostics = model?.typeData?.diagnostics;
    const diagnosticMsgs = getDiagnosticInfo(diagnostics);
    const diagramContext = useContext(Context);
    const gotoSource = diagramContext?.api?.code?.gotoSource;
    const deleteComponent = diagramContext?.api?.edit?.deleteComponent;
    const showTooltip = diagramContext?.api?.edit?.showTooltip;
    const [tooltip, setTooltip] = useState(undefined);
    const { isReadOnly } = diagramContext.props;

    const onDeleteClick = () => {
        if (deleteComponent) {
            deleteComponent(model);
        }
    };

    const onClickOpenInCodeView = () => {
        if (model && gotoSource) {
            const position: NodePosition = model.position as NodePosition;
            gotoSource({ startLine: position.startLine, startColumn: position.startColumn });
        }
    }
    const openInCodeView = !isReadOnly && model && model.position && onClickOpenInCodeView;

    const errorIcon = diagnosticMsgs?.severity === "ERROR" ? <ErrorIcon /> : <WarningIcon />;

    const errorSnippet = {
        diagnosticMsgs: diagnosticMsgs?.message,
        code: sourceSnippet,
        severity: diagnosticMsgs?.severity
    }
    const iconElement = (
        <div className="error-icon-wrapper">
            {errorIcon}
        </div>
    );


    // TODO:Check this and fix the tooltip rendering issue
    useEffect(() => {
        if (diagnosticMsgs && showTooltip) {
            setTooltip(showTooltip(iconElement, errorSnippet.diagnosticMsgs, undefined, model));
        }
    }, [model]);

    return (
        <HeaderWrapper
            className={classNames("function-signature", model.functionName.value)}
            onClick={onExpandClick}
        >
            <div className={classNames("resource-badge", model.functionName.value)}>
                <p className={"text"}>{model.functionName.value.toUpperCase()}</p>
            </div>
            <div className="param-wrapper">
                <ResourceQueryParams
                    parameters={model.functionSignature.parameters}
                    relativeResourcePath={model.relativeResourcePath}
                />
                <ResourceOtherParams parameters={model.functionSignature.parameters} />
            </div>
            <div className="return-type">
                {model.functionSignature.returnTypeDesc?.source}
            </div>
            {diagnosticMsgs ?
                (
                    <div>
                        {tooltip ? tooltip : iconElement}
                    </div>
                )
                : null
            }

            <HeaderActionsWithMenu
                model={model}
                isExpanded={isExpanded}
                onExpandClick={onExpandClick}
                onConfirmDelete={onDeleteClick}
                isResource={true}
            />
        </HeaderWrapper >
    );
}
