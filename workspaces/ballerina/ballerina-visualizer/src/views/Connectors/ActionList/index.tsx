// tslint:disable: jsx-no-multiline-js jsx-wrap-multiline
import React, { useEffect, useState } from "react";

import { ActionCard } from "./ActionCard";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import styled from "@emotion/styled";
import { SearchBox, Typography, ThemeColors } from "@dharshi/ui-toolkit";
import { FunctionDefinitionInfo } from "@dharshi/ballerina-core";

export namespace S {
    export const Container = styled.div<{}>`
        height: 83vh;
        width: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    `;
    export const Component = styled.div<{}>`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border: 1px solid ${ThemeColors.OUTLINE_VARIANT};
        border-radius: 5px;
        height: 36px;
        cursor: "pointer";
        font-size: 14px;
        &:hover {    
                background-color: ${ThemeColors.PRIMARY_CONTAINER};
                border: 1px solid ${ThemeColors.PRIMARY};
        };
        margin: 5px;
    `;

    export const ActionContainer = styled.div<{}>`
        display: block;
        gap: 5px;
        padding: 5px;
        border: 1px solid ${ThemeColors.OUTLINE_VARIANT};
        border-radius: 5px;
        cursor: "pointer";
        font-size: 14px;
        &:hover {    
                background-color: ${ThemeColors.PRIMARY_CONTAINER};
                border: 1px solid ${ThemeColors.PRIMARY};
        };
        margin: 5px;
    `;

    export const ComponentTitle = styled.div`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
    `;

    export const IconContainer = styled.div`
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

interface ActionListProps {
    actions: FunctionDefinitionInfo[];
    onSelect: (action: FunctionDefinitionInfo) => void;
    isHttp: boolean;
    onCancel?: () => void;
}

export function ActionList(props: ActionListProps) {
    const { actions, isHttp, onSelect, onCancel } = props;

    const [keyword, setKeyword] = useState("");
    const [filteredActions, setFilteredActions] = useState<FunctionDefinitionInfo[]>([]);

    useEffect(() => {
        const searchKeyword = keyword.toLowerCase().trim();
        if (searchKeyword.length > 1 && searchKeyword !== "") {
            const filter = actions.filter((action) => {
                if (
                    action.name.toLowerCase().indexOf(searchKeyword) > -1 ||
                    action.displayAnnotation?.label?.toLowerCase().toLowerCase().indexOf(searchKeyword) > -1
                ) {
                    return action;
                }
            });
            setFilteredActions(filter);
        } else {
            setFilteredActions(actions);
        }
    }, [actions, keyword]);

    const supportedActions = filteredActions?.filter((action) => {
        if (action.name === "init") {
            return false;
        }
        if (!(action.isRemote || action.qualifiers?.includes("remote") || action.qualifiers?.includes("resource"))) {
            return false; // Skip non-remote actions and non-resource actions
        }
        if (isHttp && action.qualifiers?.includes("resource")) {
            return false; // Skip resource actions from http connector to avoid listing duplicate actions
        }
        return true;
    });

    const actionElementList = supportedActions?.map((action) => {
        return <ActionCard key={action.name} action={action} onSelect={onSelect} />;
    });

    const handleActionSearch = (input: string) => {
        setKeyword(input);
    };

    // const handleOnBack = () => {
    //     onBack();
    // };

    return (
        <>
            <PanelContainer title="Action" show={true} onClose={onCancel}>
                <div style={{ width: '100%', flexDirection: "row", padding: '15px 20px' }}>
                    <SearchBox placeholder="Search actions" onChange={(text: string) => handleActionSearch(text)} value={keyword} iconPosition="end" />
                    {supportedActions?.length > 0 && (
                        <>
                            <Typography>
                                Select an action
                            </Typography>

                            <S.Container>{actionElementList}</S.Container>
                        </>
                    )}
                    {supportedActions?.length === 0 && (
                        <Typography>
                            Sorry. We currently support `remote` and `resource` actions only.
                        </Typography>
                    )}
                    {(filteredActions?.length === 0 || !actions) && (
                        <div>
                            <Typography>
                                No actions found
                            </Typography>
                        </div>
                    )}
                </div>
            </PanelContainer>
        </>
    );
}
