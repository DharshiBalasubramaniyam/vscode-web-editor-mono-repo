// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";

import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { Typography } from "@dharshi/ui-toolkit";

import { TypeProps } from "../../index";
import { useStmtEditorHelperPanelStyles } from "../../styles";
import { isRequiredParam } from "../../utils";

export default function CustomType(props: TypeProps) {
    const { param, onChange } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const requiredParam = isRequiredParam(param);

    const [paramSelected, setParamSelected] = useState<boolean>(param.selected || requiredParam);

    const toggleParamCheck = () => {
        if (!requiredParam) {
            param.selected = !paramSelected;
            setParamSelected(!paramSelected);
            onChange();
        }
    };

    return (
        <div className={param.documentation ? stmtEditorHelperClasses.docListCustom : stmtEditorHelperClasses.docListDefault}>
            <div className={stmtEditorHelperClasses.listItemMultiLine} data-testid="custom-arg">
                <div className={stmtEditorHelperClasses.listItemHeader}>
                    <VSCodeCheckbox
                        checked={paramSelected}
                        {...(requiredParam && { disabled: true })}
                        onClick={toggleParamCheck}
                        data-testid="arg-check"
                        className={stmtEditorHelperClasses.parameterCheckbox}
                    />
                    <Typography
                        variant="body3"
                        sx={{ margin: '0px 5px' }}
                    >
                        {param.name}
                    </Typography>
                    <Typography
                        className={stmtEditorHelperClasses.suggestionDataType}
                        variant="body3"
                        data-testid="arg-type"
                    >
                        {param.optional || param.defaultable ? param.typeName + " (Optional)" : param.typeName}
                    </Typography>
                </div>
                {param.documentation && (
                    <div className={stmtEditorHelperClasses.documentationWrapper}>
                        <Typography
                            className={stmtEditorHelperClasses.docParamDescriptionText}
                            variant="body3"
                        >
                            {param.documentation}
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
}
