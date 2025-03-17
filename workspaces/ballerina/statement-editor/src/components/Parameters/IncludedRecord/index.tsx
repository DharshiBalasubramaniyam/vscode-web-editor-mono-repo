import React, { useContext } from "react";

import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { ParameterInfo } from "@dharshi/ballerina-core";
import { Typography } from "@dharshi/ui-toolkit";

import { StatementEditorContext } from "../../../store/statement-editor-context";
import { getParamHighlight } from "../../../utils";
import { useStmtEditorHelperPanelStyles } from "../../styles";

interface IncludedRecordProps {
    param: ParameterInfo,
    handleCheckboxClick: (param: ParameterInfo) => () => void
    key?: number,
}

// tslint:disable: jsx-no-multiline-js
export function IncludedRecord(props: IncludedRecordProps){
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const { param, handleCheckboxClick, key } = props;
    const {
        modelCtx: {
            currentModel : {
                model
            }
        }
    } = useContext(StatementEditorContext);

    return (
        <>
            {param.modelPosition && (
                <div
                    key={key}
                    className={stmtEditorHelperClasses.docListDefault}
                    style={getParamHighlight(model, param)}
                    data-testid="included-record-arg"
                >
                    <VSCodeCheckbox
                        checked={true}
                        onClick={handleCheckboxClick(param)}
                    />
                    <Typography
                        variant="body3"
                        sx={{margin: '0px 5px'}}
                    >
                        {param.name}
                    </Typography>
                </div>
            )}
        </>
    );
}
