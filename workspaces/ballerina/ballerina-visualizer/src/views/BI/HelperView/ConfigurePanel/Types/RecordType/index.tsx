// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";

import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { Typography } from "@dharshi/ui-toolkit";

import { TypeProps } from "../../index";
import { useStmtEditorHelperPanelStyles } from "../../styles";
import { MemoizedParameterBranch } from "../../index";
import { isRequiredParam } from "../../utils";

export default function RecordType(props: TypeProps) {
    const { param, depth, onChange } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const requiredParam = isRequiredParam(param);

    const [paramSelected, setParamSelected] = useState(param.selected || requiredParam);

    const toggleParamCheck = () => {
        if (!requiredParam) {
            param.selected = !paramSelected;
            setParamSelected(!paramSelected);
            onChange();
        }
    };

    return (
        <div className={param.documentation ? stmtEditorHelperClasses.docListCustom : stmtEditorHelperClasses.docListDefault}>
            <div className={stmtEditorHelperClasses.listItemMultiLine} data-testid="record-arg">
                <div className={stmtEditorHelperClasses.listItemHeader}>
                    <VSCodeCheckbox
                        checked={paramSelected}
                        {...(requiredParam && { disabled: true })}
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
                    {param.typeInfo && (
                        <Typography
                            className={stmtEditorHelperClasses.suggestionDataType}
                            variant="body3"
                            data-testid="arg-type"
                        >
                            {(param.optional || param.defaultable) && " (Optional)"} {param.typeInfo.name}
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
                {paramSelected && param.fields?.length > 0 && (
                    <div className={stmtEditorHelperClasses.listItemBody}>
                        <MemoizedParameterBranch parameters={param.fields} depth={depth + 1} onChange={onChange} />
                    </div>
                )}
            </div>
        </div>
    );
}
