import React from "react";
import { LinkButton, ThemeColors } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";

const Card = styled.div<{ active?: boolean }>`
    gap: 16px;
    max-width: 42rem;
    padding: 16px;
    border-radius: 4px;
    border: 2px solid ${(props: { active: boolean }) => (props.active ? ThemeColors.PRIMARY : ThemeColors.OUTLINE_VARIANT)};
    background-color: ${(props: { active: boolean }) => (props.active ? ThemeColors.PRIMARY_CONTAINER : ThemeColors.SURFACE_DIM)};
    cursor: pointer;
    &:hover {
        background-color: ${ThemeColors.PRIMARY_CONTAINER};
        border: 2px solid ${ThemeColors.PRIMARY};
    }
`;

const CardContainer = styled.div<{ active?: boolean }>`
    display: flex;
    gap: 12px;
    align-items: flex-start;
`;

const Text = styled.p`
    font-size: 14px;
    color: ${ThemeColors.ON_SURFACE};
    margin: 0;
`;

const Title = styled(Text)`
    font-weight: bold;
`;

const Caption = styled(Text)`
    font-size: 11px;
    font-weight: bold;
    opacity: 0.6;
`;

const Description = styled(Text)`
    opacity: 0.8;
    margin-top: 4px;
`;

const ContentContainer = styled.div`
    flex: 1;
`;

const IconContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 32px;
    > div:first-child {
        width: 32px;
        height: 32px;
        font-size: 28px;
    }
`;

const ActionButton = styled(LinkButton)`
    padding: 8px 4px;
`;

export interface ButtonCardProps {
    title: string;
    caption?: string;
    description: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick: () => void;
}

export function ButtonCard(props: ButtonCardProps) {
    const { title, caption, description, icon, active, onClick } = props;
    return (
        <Card onClick={onClick} active={active ?? false}>
            <CardContainer>
                {icon && <IconContainer>{icon}</IconContainer>}
                <ContentContainer>
                    {caption && <Caption>{caption}</Caption>}
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </ContentContainer>
            </CardContainer>
        </Card>
    );
}

export default ButtonCard;
