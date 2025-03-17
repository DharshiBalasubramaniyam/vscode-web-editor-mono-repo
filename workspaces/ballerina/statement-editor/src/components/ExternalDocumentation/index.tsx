
import React, { useContext } from "react";

import { BallerinaConnectorInfo } from "@dharshi/ballerina-core";
import { Tooltip } from "@dharshi/ui-toolkit";

import ToolbarDocumentationIcon from "../../assets/icons/ToolbarDocumentationIcon";
import { StatementEditorContext } from "../../store/statement-editor-context";
import { useStatementEditorStyles } from "../styles";

export interface DocButtonProps {
    connectorInfo?: BallerinaConnectorInfo;
}

export function DocumentationButton(props: DocButtonProps) {
    const { connectorInfo } = props;
    const statementEditorClasses = useStatementEditorStyles();
    const {
        openExternalUrl
    } = useContext(StatementEditorContext);

    const openStatementEditorHelp = () => {
        if (connectorInfo) {
            openExternalUrl("https://lib.ballerina.io/" + connectorInfo.package.organization + "/" +
                connectorInfo.moduleName + "/" + connectorInfo.package.version + "/#" + connectorInfo.name);
        }
    }

    return (
        <div className={statementEditorClasses.docButton}>
            <ToolbarDocumentationIcon/>
            <Tooltip content={"Refer Ballerina Docs"} position="bottom">
                <div
                    onClick={openStatementEditorHelp}
                    className={statementEditorClasses.helpLink}
                >
                    Docs
                </div>
            </Tooltip>
        </div>
    );
}
