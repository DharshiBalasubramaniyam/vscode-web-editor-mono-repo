import React from "react";
import styled from "@emotion/styled";
import { Button, Codicon } from "@dharshi/ui-toolkit";
import { useStyles } from "./style";

const EmptyLocalVarContainer = styled.div`
    width: 100%;
    height: 120px;
    padding: 15px;
    background-color: var(--vscode-inputValidation-infoBackground);
    color: var(--vscode-input-foreground);
`;

const AlertText = styled.p`
    margin-bottom: 10px;
`;

interface EmptyLocalVarPanelProps {
    onAddNewVar: () => void;
}

export function EmptyLocalVarPanel(props: EmptyLocalVarPanelProps) {
    const { onAddNewVar } = props;
    const overlayClasses = useStyles();

    return (
        <EmptyLocalVarContainer>
            <AlertText>You do not have any local variable in this transformation.</AlertText>
            <Button
                appearance="icon"
                onClick={onAddNewVar}
                className={overlayClasses.linePrimaryButton} 
                sx={{width: '100%'}}
            >
                <Codicon sx={{marginTop: 2, marginRight: 5}} name="add"/>
                <div>Add New</div>
            </Button>
        </EmptyLocalVarContainer>
    );
}
