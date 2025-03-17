// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";

import { TypeField } from "@dharshi/ballerina-core";
import { Button } from "@dharshi/ui-toolkit";


import { useStmtEditorHelperPanelStyles } from "./styles";
import { isAnyFieldSelected, isRequiredParam } from "./utils";

import * as Types from "./Types";

export interface ParameterBranchProps {
    parameters: TypeField[];
    depth: number;
    onChange: () => void;
}

export interface TypeProps {
    param: TypeField;
    depth: number;
    onChange: () => void;
}

export function ParameterBranch(props: ParameterBranchProps) {
    const { parameters, depth, onChange } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();

    const [showOptionalParams, setShowOptionalParams] = useState(isAnyFieldSelected(parameters));

    const requiredParams: JSX.Element[] = [];
    const optionalParams: JSX.Element[] = [];

    parameters?.forEach((param: TypeField, index: number) => {
        let TypeComponent = (Types as any)[param.typeName];
        const typeProps: TypeProps = {
            param,
            depth,
            onChange,
        };
        if (!TypeComponent) {
            TypeComponent = (Types as any).custom;
        }
        if (isRequiredParam(param)) {
            requiredParams.push(<TypeComponent key={index} {...typeProps} />);
        } else {
            optionalParams.push(<TypeComponent key={index} {...typeProps} />);
        }
    });

    function toggleOptionalParams(e: any) {
        setShowOptionalParams(!showOptionalParams);
    }

    return (
        <div data-testid="parameter-branch">
            {requiredParams}
            {(optionalParams.length > 0 && depth === 1) ? (
                optionalParams
            ) : (
                <>
                    {optionalParams.length > 0 && (
                        <div className={stmtEditorHelperClasses.listOptionalWrapper}>
                            <div className={stmtEditorHelperClasses.listOptionalHeader}>Optional fields </div>
                            <Button
                                data-testid="optional-toggle-button"
                                className={stmtEditorHelperClasses.listOptionalBtn}
                                onClick={toggleOptionalParams}
                                appearance="secondary"
                            >
                                {showOptionalParams ? "Hide" : "Show"}
                            </Button>
                        </div>
                    )}
                    {showOptionalParams && optionalParams.length > 0 && optionalParams}
                </>
            )}
        </div>
    );
}

export const MemoizedParameterBranch = React.memo(ParameterBranch);
