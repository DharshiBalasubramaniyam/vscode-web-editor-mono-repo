// tslint:disable: jsx-no-multiline-js jsx-wrap-multiline
import React from "react";

import {FunctionDefinition, RequiredParam, RestParam, STKindChecker, STNode} from "@dharshi/syntax-tree";

import {BlockViewState} from "../../../ViewState";
import {DefaultConfig} from "../../../Visitors/default";
import {START_SVG_HEIGHT_WITH_SHADOW} from "../Start/StartSVG";

import "./style.scss";
import {TriggerParamsSVG, TRIGGER_PARAMS_SVG_WIDTH_WITH_SHADOW} from "./TriggerParamsSVG";

export interface TriggerParamsProps {
    model?: STNode;
    blockViewState?: BlockViewState;
}

export function TriggerParams(props: TriggerParamsProps) {
    const { model, blockViewState } = props;

    const viewState = model.viewState;
    const cx = viewState.triggerParams.bBox.cx;
    const cy = viewState.triggerParams.bBox.cy;
    const modelTriggerParams: FunctionDefinition = model as FunctionDefinition
    let triggerParamsText = "";
    let funcParam;

    for (let i = 0; i <= modelTriggerParams?.functionSignature?.parameters?.length - 1; i++) {
        if (STKindChecker.isRequiredParam(modelTriggerParams?.functionSignature?.parameters[i])) {
            funcParam = modelTriggerParams?.functionSignature?.parameters[i] as RequiredParam;
            triggerParamsText = triggerParamsText + " " + funcParam?.paramName?.value + ",";
        } else if (STKindChecker.isRestParam(modelTriggerParams?.functionSignature?.parameters[i])) {
            funcParam = modelTriggerParams?.functionSignature?.parameters[i] as RestParam;
            triggerParamsText = triggerParamsText + " " + funcParam?.paramName?.value + ",";
        }
    }

    const component: React.ReactElement = ((!model?.viewState.collapsed || blockViewState) &&
        (<TriggerParamsSVG
            x={(cx - (TRIGGER_PARAMS_SVG_WIDTH_WITH_SHADOW / 2) + (DefaultConfig.dotGap / 8))}
            y={(cy + START_SVG_HEIGHT_WITH_SHADOW) - (TRIGGER_PARAMS_SVG_WIDTH_WITH_SHADOW / 2) + DefaultConfig.dotGap * 2}
            text={triggerParamsText.slice(1, -1)}
        />)
    );

    return (
        <g className="trigger-params-wrapper" data-testid="trigger-params-block">
            {component}
        </g>
    );
}
