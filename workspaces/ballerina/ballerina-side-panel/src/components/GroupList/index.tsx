
import React, { useState } from "react";
import { Codicon, ThemeColors } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { CallIcon, LogIcon } from "../../resources";
import { Category, Node } from "./../NodeList/types";

namespace S {
    export const Card = styled.div<{}>`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
        width: 100%;
        padding: 8px 0;
        border-radius: 5px;
        background-color: ${ThemeColors.SURFACE_DIM_2};
    `;

    export const Row = styled.div<{}>`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        margin-bottom: 4px;
        width: 100%;
    `;

    export const TitleRow = styled(Row) <{}>`
        cursor: pointer;
        padding: 0 5px;
    `;

    export const Title = styled.div<{}>`
        font-size: 12px;
        opacity: 0.9;
    `;

    export const BodyText = styled.div<{}>`
        font-size: 11px;
        opacity: 0.5;
        padding: 0 8px;
    `;

    export const Grid = styled.div<{ columns: number }>`
        display: grid;
        grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
        gap: 8px;
        width: 100%;
        margin-top: 8px;
        padding: 0 8px;
    `;

    export const CardAction = styled.div<{}>`
        padding: 0 8px;
        margin-left: auto;
    `;

    export const Component = styled.div<{ enabled?: boolean }>`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border: 1px solid ${ThemeColors.OUTLINE_VARIANT};
        border-radius: 5px;
        height: 36px;
        cursor: ${({ enabled }) => (enabled ? "pointer" : "not-allowed")};
        font-size: 14px;
        ${({ enabled }) => !enabled && "opacity: 0.5;"}
        &:hover {
            ${({ enabled }) =>
            enabled &&
            `
        background-color: ${ThemeColors.PRIMARY_CONTAINER};
        border: 1px solid ${ThemeColors.PRIMARY};
    `}
        }
    `;

    export const ComponentTitle = styled.div`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 115px;
        word-break: break-all;
    `;

    export const ComponentIcon = styled.div`
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        & svg {
            height: 16px;
            width: 16px;
            fill: ${ThemeColors.ON_SURFACE};
            stroke: ${ThemeColors.ON_SURFACE};
        }
    `;
}

interface GroupListProps {
    category: Category;
    expand?: boolean;
    onSelect: (node: Node, category: string) => void;
}

export function GroupList(props: GroupListProps) {
    const { category, expand, onSelect } = props;

    const [showList, setShowList] = useState(expand ?? false);

    const nodes = category.items as Node[];
    const openList = expand || showList;

    const handleToggleList = () => {
        setShowList(!showList);
    };

    if (nodes.length === 0) {
        return null;
    }

    return (
        <S.Card>
            <S.TitleRow onClick={handleToggleList}>
                <S.ComponentIcon>{category.icon || <LogIcon />}</S.ComponentIcon>
                <S.Title>{category.title}</S.Title>
                <S.CardAction>
                    {openList ? <Codicon name={"chevron-up"} /> : <Codicon name={"chevron-down"} />}
                </S.CardAction>
            </S.TitleRow>
            {openList && (
                <>
                    <S.BodyText>{category.description}</S.BodyText>
                    <S.Grid columns={2}>
                        {nodes.filter(node => node.enabled).map((node, index) => (
                            <S.Component
                                key={node.id + index}
                                enabled={node.enabled}
                                onClick={() => onSelect(node, category.title)}
                                title={node.label}
                            >
                                <S.ComponentIcon>{node.icon || <CallIcon />}</S.ComponentIcon>
                                <S.ComponentTitle >{node.label}</S.ComponentTitle>
                            </S.Component>
                        ))}
                    </S.Grid>
                </>
            )}
        </S.Card>
    );
}

export default GroupList;
