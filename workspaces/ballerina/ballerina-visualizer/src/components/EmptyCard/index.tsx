import React from "react";
import { Codicon, LinkButton } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding-bottom: 24px;
`;

const Text = styled.p`
    font-size: 14px;
    margin: 8px 0;
    color: var(--vscode-sideBarTitle-foreground);
    opacity: 0.5;
`;

const ActionButton = styled(LinkButton)`
    padding: 8px 4px;
`

export interface EmptyCardProps {
    description: string;
    actionText: string;
    onClick: () => void;
}

export function EmptyCard(props: EmptyCardProps) {
    const { description, actionText, onClick } = props;
    return (
        <CardContainer>
            <Text>{description}</Text>
            <ActionButton onClick={onClick}>
                <Codicon name="add" />
                {actionText}
            </ActionButton>
        </CardContainer>
    );
}

export default EmptyCard;
