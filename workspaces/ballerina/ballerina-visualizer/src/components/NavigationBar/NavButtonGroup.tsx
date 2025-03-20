import React, { useState } from "react";

import { Codicon } from "@dharshi/ui-toolkit";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { HistoryEntry } from "@dharshi/ballerina-core";
import styled from "@emotion/styled";

interface NavButtonGroupProps {
    historyStack?: HistoryEntry[];
    showHome?: boolean;
}

const NavBar = styled.div`
    padding: 6px 8px;
`;
const LeftSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;
const RightSection = styled.div``;
interface NavButtonProps {
    inactive: boolean;
}
const NavButton = styled(VSCodeButton) <NavButtonProps>`
    padding-right: 2px;
    color: ${(props: NavButtonProps) =>
        props.inactive ? "var(--vscode-activityBar-inactiveForeground)" : "var(--vscode-editor-foreground)"};
`;

export function NavButtonGroup(props: NavButtonGroupProps) {
    const { historyStack, showHome } = props;
    const { rpcClient } = useRpcContext();
    const isHistoryAvailable = historyStack && historyStack.length > 0;

    const handleBackButtonClick = () => {
        rpcClient.getVisualizerRpcClient().goBack();
    };

    const handleHomeButtonClick = () => {
        rpcClient.getVisualizerRpcClient().goHome();
    };

    return (
        <>
            <NavBar>
                <LeftSection>
                    <NavButton
                        appearance="icon"
                        title="Go Back"
                        onClick={isHistoryAvailable ? handleBackButtonClick : undefined}
                        inactive={!isHistoryAvailable}
                    >
                        <Codicon name="arrow-left" />
                    </NavButton>
                    {showHome && <NavButton
                        appearance="icon"
                        title="Home"
                        onClick={isHistoryAvailable ? handleHomeButtonClick : undefined}
                        inactive={!isHistoryAvailable}
                    >
                        <Codicon name="home" />
                    </NavButton>
                    }
                </LeftSection>
            </NavBar>
        </>
    );
}
