/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Codicon, Confirm, ContextMenu, Icon, LinkButton, Typography } from '@dharshi/ui-toolkit';
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { FunctionModel } from '@dharshi/ballerina-core';

type MethodProp = {
    color: string;
    hasLeftMargin?: boolean;
};

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
    background-color: var(--vscode-editorHoverWidget-background);
    &:hover {
        background-color: var(--vscode-list-hoverBackground);
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

const LinkButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 16px;

    :hover {
        outline: 1px solid var(--vscode-inputOption-activeBorder);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 10px;
    width: 40px;
`;

const MethodBox = styled.div<MethodProp>`
    display: flex;
    justify-content: center;
    height: 25px;
    min-width: 70px;
    width: auto;
    margin-left: ${(p: MethodProp) => p.hasLeftMargin ? "10px" : "0px"};
    text-align: center;
    padding: 3px 5px 3px 5px;
    background-color: ${(p: MethodProp) => p.color};
    color: #FFF;
    align-items: center;
    font-weight: bold;
`;

const MethodSection = styled.div`
    display: flex;
    gap: 4px;
`;

const verticalIconStyles = {
    transform: "rotate(90deg)",
    ":hover": {
        backgroundColor: "var(--vscode-welcomePage-tileHoverBackground)",
    }
};

const ButtonSection = styled.div<ButtonSectionProps>`
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: ${(p: ButtonSectionProps) => p.isExpanded ? "8px" : "6px"};
`;

const AccordionContent = styled.div`
    padding: 10px;
`;

const MethodPath = styled.span`
    align-self: center;
    margin-left: 10px;
`;

const colors = {
    "GET": '#3d7eff',
    "PUT": '#fca130',
    "POST": '#49cc90',
    "DELETE": '#f93e3e',
    "PATCH": '#986ee2',
    "OPTIONS": '#0d5aa7',
    "HEAD": '#9012fe'
}

export function getColorByMethod(method: string) {
    switch (method.toUpperCase()) {
        case "GET":
            return colors.GET;
        case "PUT":
            return colors.PUT;
        case "POST":
            return colors.POST;
        case "DELETE":
            return colors.DELETE;
        case "PATCH":
            return colors.PATCH;
        case "OPTIONS":
            return colors.OPTIONS;
        case "HEAD":
            return colors.HEAD;
        default:
            return '#876036'; // Default color
    }
}

export interface ResourceAccordionProps {
    functionModel: FunctionModel;
    goToSource: (resource: FunctionModel) => void;
    onEditResource: (resource: FunctionModel) => void;
    onDeleteResource: (resource: FunctionModel) => void;
    onResourceImplement: (resource: FunctionModel) => void;
}

export function ResourceAccordion(params: ResourceAccordionProps) {
    const { functionModel, goToSource, onEditResource, onDeleteResource, onResourceImplement } = params;

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [confirmEl, setConfirmEl] = React.useState(null);


    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleShowDiagram = (e: Event) => {
        e.stopPropagation(); // Stop the event propagation
        goToSource(functionModel);
    };

    const handleEditResource = (e: Event) => {
        e.stopPropagation(); // Stop the event propagation
        onEditResource(functionModel);
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
            onDeleteResource && onDeleteResource(functionModel);
        }
        setConfirmOpen(false);
        setConfirmEl(null);
    };

    const handleResourceImplement = () => {
        onResourceImplement(functionModel)
    }

    return (
        <AccordionContainer data-testid="service-design-view-resource">
            <AccordionHeader onClick={handleResourceImplement}>
                <MethodSection>
                    <MethodBox color={getColorByMethod(functionModel.accessor?.value || functionModel.kind)}>
                        {functionModel.accessor?.value || functionModel.kind.toLowerCase()}
                    </MethodBox>
                    <MethodPath>{functionModel.name.value}</MethodPath>
                </MethodSection>
                <ButtonSection>
                    <>
                        {onEditResource! && (
                            <VSCodeButton appearance="icon" title="Edit FunctionModel" onClick={handleEditResource}>
                                <Icon name="editIcon" sx={{ marginTop: 3.5 }} />
                            </VSCodeButton>
                        )}
                        {onDeleteResource! && (
                            <VSCodeButton appearance="icon" title="Delete FunctionModel" onClick={handleDeleteResource}>
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
                message="Are you sure want to delete this resource?"
                anchorEl={confirmEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </AccordionContainer>
    );
};
