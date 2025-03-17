import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Codicon, Confirm, Icon } from '@dharshi/ui-toolkit';
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { FieldType } from '@dharshi/ballerina-core';

type ContainerProps = {
    borderColor?: string;
    haveErrors?: boolean;
};

type ButtonSectionProps = {
    isExpanded?: boolean;
};

type HeaderProps = {
    expandable?: boolean;
}

const AccordionContainer = styled.div<ContainerProps>`
    margin-top: 10px;
    overflow: hidden;
    background-color: var(--vscode-editorHoverWidget-statusBarBackground);
    &:hover {
        background-color: var(--vscode-editorHoverWidget-border);
        cursor: pointer;
    }
    border: ${(p: ContainerProps) => p.haveErrors ? "1px solid red" : "none"};
`;

const AccordionHeader = styled.div<HeaderProps>`
    padding: 10px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 3fr 1fr;
`;

const MethodSection = styled.div`
    display: flex;
    gap: 4px;
`;

const ButtonSection = styled.div<ButtonSectionProps>`
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: ${(p: ButtonSectionProps) => p.isExpanded ? "8px" : "6px"};
`;

const VariableLabel = styled.span`
    align-self: center;
    margin-left: 5px;
`;


export interface VariableCardProps {
    fieldModel: FieldType;
    goToSource?: (fieldModel: FieldType) => void;
    onEditVariable: (fieldModel: FieldType) => void;
    onDeleteVariable: (fieldModel: FieldType) => void;
    onVariableImplement?: (fieldModel: FieldType) => void;
}

export function VariableCard(params: VariableCardProps) {
    const { fieldModel, goToSource, onEditVariable, onDeleteVariable, onVariableImplement } = params;

    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [confirmEl, setConfirmEl] = React.useState(null);


    const handleEditResource = (e: Event) => {
        e.stopPropagation(); // Stop the event propagation
        onEditVariable(fieldModel);
    };

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleDeleteResource = (e: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        e.stopPropagation(); // Stop the event propagation
        setConfirmEl(e.currentTarget);
        handleOpenConfirm();
    };

    const handleConfirm = (status: boolean) => {
        if (status) {
            onDeleteVariable && onDeleteVariable(fieldModel);
        }
        setConfirmOpen(false);
        setConfirmEl(null);
    };

    const handleVariableImplement = () => {
        onVariableImplement && onVariableImplement(fieldModel)
    }

    return (
        <AccordionContainer>
            <AccordionHeader onClick={handleVariableImplement}>
                <MethodSection>
                    <VariableLabel>{fieldModel.name.value}</VariableLabel>
                    <VariableLabel>{fieldModel.type.value}</VariableLabel>
                </MethodSection>
                <ButtonSection>
                    <>
                        {onEditVariable! && (
                            <VSCodeButton appearance="icon" title="Edit Variable" onClick={handleEditResource}>
                                <Icon name="bi-edit" sx={{ marginTop: 3.5 }} />
                            </VSCodeButton>
                        )}
                        {onDeleteVariable! && (
                            <VSCodeButton appearance="icon" title="Delete Variable" onClick={handleDeleteResource}>
                                <Codicon name="trash" />
                            </VSCodeButton>
                        )}
                    </>
                </ButtonSection>
            </AccordionHeader>
            <Confirm
                isOpen={isConfirmOpen}
                onConfirm={handleConfirm}
                confirmText="Okay"
                message="Are you sure want to delete this variable?"
                anchorEl={confirmEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ zIndex: 3002 }}
            />
        </AccordionContainer>
    );
};
