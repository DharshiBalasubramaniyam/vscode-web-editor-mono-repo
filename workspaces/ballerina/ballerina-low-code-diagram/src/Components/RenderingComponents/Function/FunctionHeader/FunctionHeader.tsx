// tslint:disable: jsx-no-multiline-js
import React from "react";

import { EVENT_TYPE, MACHINE_VIEW, SettingsIcon, VisualizerLocation } from "@dharshi/ballerina-core";
import {
    STKindChecker,
} from "@dharshi/syntax-tree";
import classNames from "classnames";

import { useDiagramContext } from "../../../../Context/diagram";
import { useFunctionContext } from "../../../../Context/Function";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";

import "./style.scss";

export function FunctionHeader() {
    const { functionNode } = useFunctionContext();
    const diagramContext = useDiagramContext();
    const contextProps = diagramContext?.props;
    const { rpcClient } = useRpcContext();

    const titleComponents: React.ReactElement[] = [];
    const argumentComponents: React.ReactElement[] = [];

    console.log(diagramContext);
    const handleConfigFormClick = async () => {
        console.log("editing function", functionNode);
        if (STKindChecker.isFunctionDefinition(functionNode)) {
            const context: VisualizerLocation = {
                position: functionNode.position,
                view: MACHINE_VIEW.FunctionForm,
                identifier: functionNode.functionName.value
            }
            await rpcClient.getVisualizerRpcClient().openView(
                { type: EVENT_TYPE.OPEN_VIEW, location: context }
            );
        }

    }

    if (STKindChecker.isFunctionDefinition(functionNode)) {
        // TODO: handle general funciton
        titleComponents.push(
            <div key={"title"} className="title-components">
                {`Function ${functionNode.functionName.value}`}
            </div>
        );

        functionNode.functionSignature.parameters
            .forEach((param, paramIndex) => {
                if (STKindChecker.isRequiredParam(param)
                    || STKindChecker.isDefaultableParam(param)
                    || STKindChecker.isRestParam(param)) {

                    argumentComponents.push(
                        <div key={paramIndex} className={'argument-item'}>
                            <span className="type-name">{param.typeName.source.trim()}</span>
                            <span className="argument-name">{param.paramName.value}</span>
                        </div>
                    );
                }
            });
    } else if (STKindChecker.isResourceAccessorDefinition(functionNode)) {
        // TODO: handle resource function
        const resourceTitleContent: React.ReactElement[] = [];
        resourceTitleContent.push(
            <span className={classNames("resource-badge", functionNode.functionName.value)}>
                {functionNode.functionName.value.toUpperCase()}
            </span>
        )

        functionNode.relativeResourcePath.forEach(node => {
            if (STKindChecker.isIdentifierToken(node) || STKindChecker.isSlashToken(node)) {
                resourceTitleContent.push(
                    <>{node.value}</>
                );
            } else if (STKindChecker.isResourcePathSegmentParam(node) || STKindChecker.isResourcePathRestParam(node)) {
                resourceTitleContent.push(
                    <>
                        [<span className={'type-descriptor'}>
                            {`${(node as any).typeDescriptor?.name?.value} `}
                        </span>
                        {STKindChecker.isResourcePathRestParam(node) ? '...' : ''}{(node as any).paramName?.value}]
                    </>
                );
            } else if (STKindChecker.isDotToken(node)) {
                resourceTitleContent.push(<>/</>);
            }
        });

        functionNode.functionSignature.parameters
            .forEach((param, paramIndex) => {
                if (STKindChecker.isRequiredParam(param)
                    || STKindChecker.isDefaultableParam(param)
                    || STKindChecker.isRestParam(param)) {
                    argumentComponents.push(
                        <div key={paramIndex} className={'argument-item'}>
                            <span className="type-name">{param.typeName.source.trim()}</span>
                            <span className="argument-name">{param.paramName.value}</span>
                        </div>
                    );
                }
            });

        titleComponents.push(
            <div key={"params"} className="title-components">
                <div className="content">
                    {resourceTitleContent}
                </div>
            </div>
        )
    } else if (STKindChecker.isObjectMethodDefinition(functionNode)) {
        titleComponents.push(
            <div key={"title"} className="title-components">{`${functionNode.functionName.value}`}</div>
        );

        functionNode.functionSignature.parameters
            .forEach((param, paramIndex) => {
                if (STKindChecker.isRequiredParam(param)
                    || STKindChecker.isDefaultableParam(param)
                    || STKindChecker.isRestParam(param)) {

                    argumentComponents.push(
                        <div key={paramIndex} className={'argument-item'}>
                            <span className="type-name">{param.typeName.source.trim()}</span>
                            <span className="argument-name">{param.paramName.value}</span>
                        </div>
                    );
                }
            });
    }

    if (!contextProps.isReadOnly) {
        titleComponents.push(
            <div key={"config"} className="config-form-btn" onClick={handleConfigFormClick}>
                <SettingsIcon onClick={handleConfigFormClick} />
            </div>
        );
    }

    return (
        <>
            <div className="title-container">
                {titleComponents}
            </div>
            <div className="argument-container">{argumentComponents}</div>
        </>
    )
}
