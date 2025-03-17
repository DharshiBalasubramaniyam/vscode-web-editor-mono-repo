// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";

import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { Typography } from "@dharshi/ui-toolkit";

import { TypeProps } from "../../index";
import { useStmtEditorHelperPanelStyles } from "../../styles";
import { ParameterBranch } from "../../index";
import { isAllDefaultableFields, isRequiredParam } from "../../utils";

export default function InclusionType(props: TypeProps) {
    const { param, depth, onChange } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const requiredParam = isRequiredParam(param);
    const isAllIncludedParamDefaultable = isAllDefaultableFields(param.inclusionType?.fields);

    const [paramSelected, setParamSelected] = useState(
        param.selected || (requiredParam && !isAllIncludedParamDefaultable)
    );

    const toggleParamCheck = () => {
        param.selected = !paramSelected;
        param.inclusionType.selected = !paramSelected;
        setParamSelected(!paramSelected);
        onChange();
    };

    const handleOnChange = () => {
        param.selected = param.inclusionType.selected;
        onChange();
    };

    return (
        <div className={stmtEditorHelperClasses.docListDefault}>
            <div className={stmtEditorHelperClasses.listItemMultiLine} data-testid="inclusion-arg">
                <div className={stmtEditorHelperClasses.listItemHeader}>
                    <VSCodeCheckbox
                        checked={paramSelected}
                        {...(requiredParam && !isAllIncludedParamDefaultable && { disabled: true })}
                        onClick={toggleParamCheck}
                        className={stmtEditorHelperClasses.parameterCheckbox}
                        data-testid="arg-check"
                    />
                    <Typography
                        variant="body3"
                        sx={{ margin: '0px 5px' }}
                    >
                        {param.name}
                    </Typography>
                    {param.inclusionType?.typeInfo && (
                        <Typography
                            className={stmtEditorHelperClasses.suggestionDataType}
                            variant="body3"
                            data-testid="arg-type"
                        >
                            {(param.optional || param.defaultable) && " (Optional)"} *
                            {param.inclusionType.typeInfo.name}
                        </Typography>
                    )}
                </div>
                {param.documentation && (
                    <div className={stmtEditorHelperClasses.documentationWrapper}>
                        <Typography
                            className={stmtEditorHelperClasses.paramTreeDescriptionText}
                            variant="body3"
                        >
                            {param.documentation}
                        </Typography>
                    </div>
                )}
                {paramSelected && param.inclusionType?.fields?.length > 0 && (
                    <div className={stmtEditorHelperClasses.listItemBody}>
                        <ParameterBranch
                            parameters={param.inclusionType.fields}
                            depth={depth + 1}
                            onChange={handleOnChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
