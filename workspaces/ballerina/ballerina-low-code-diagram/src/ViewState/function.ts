/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import { NodePosition, OnFailClause } from "@dharshi/syntax-tree";

import { STOP_SVG_HEIGHT } from "../Components/RenderingComponents/End/StopSVG";
import { START_SVG_HEIGHT } from "../Components/RenderingComponents/Start/StartSVG";
import { DefaultConfig } from "../Visitors/default";

import { BlockViewState } from "./block";
import { EndViewState } from "./end";
import { PlusViewState } from "./plus";
import { SimpleBBox } from "./simple-bbox";
import { TriggerParamsViewState } from "./triggerParams";
import { ViewState } from "./view-state";

export class FunctionViewState extends ViewState {
    public topOffset: number = START_SVG_HEIGHT / 2 ;
    public bottomOffset: number = STOP_SVG_HEIGHT + (2 * DefaultConfig.dotGap);
    public lifeLine: SimpleBBox = new SimpleBBox();
    public wrapper: SimpleBBox = new SimpleBBox();
    public trigger: SimpleBBox = new SimpleBBox();
    public workerLine: SimpleBBox = new SimpleBBox();
    public workerBody: BlockViewState = new BlockViewState();
    public end: EndViewState = new EndViewState();
    public initPlus: PlusViewState = undefined;
    public onFail: OnFailClause = undefined;
    public precedingPlus: PlusViewState = undefined;
    public triggerParams: TriggerParamsViewState = new TriggerParamsViewState();
    public isResource: boolean = false;
    public functionNodeFilePath?: string = undefined;
    public functionNodeSource?: string = undefined;
    public parentBlock?: any = undefined;
    public parentConnectors?: any = undefined;
    public parentNamePlaceHolder?: string = undefined;
    public parentPosition?: NodePosition = undefined;
    constructor() {
        super();
    }
}
