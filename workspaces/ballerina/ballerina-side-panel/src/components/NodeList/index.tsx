
import React, { useEffect, useState } from "react";
import {
    Button,
    Codicon,
    ProgressRing,
    SearchBox,
    SidePanelBody,
    Switch,
    TextArea,
    ThemeColors,
    Tooltip,
} from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { BackIcon, CloseIcon, LogIcon } from "../../resources";
import { Category, Item, Node } from "./types";
import { cloneDeep, debounce } from "lodash";
import GroupList from "../GroupList";

namespace S {
    export const Container = styled.div<{}>`
        width: 100%;
    `;

    export const HeaderContainer = styled.div<{}>`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
    `;

    export const PanelBody = styled(SidePanelBody)`
        height: calc(100vh - 100px);
        padding-top: 0;
    `;

    export const StyledSearchInput = styled(SearchBox)`
        height: 30px;
    `;

    export const CategoryRow = styled.div<{ showBorder?: boolean }>`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-top: 8px;
        margin-bottom: ${({ showBorder }) => (showBorder ? "20px" : "12px")};
        padding-bottom: 8px;
        border-bottom: ${({ showBorder }) => (showBorder ? `1px solid ${ThemeColors.OUTLINE_VARIANT}` : "none")};
    `;

    export const Row = styled.div<{}>`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        margin-bottom: 4px;
        width: 100%;
    `;

    export const LeftAlignRow = styled(Row)`
        justify-content: flex-start;
    `;

    export const Grid = styled.div<{ columns: number }>`
        display: grid;
        grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
        gap: 8px;
        width: 100%;
        margin-top: 8px;
    `;

    export const Title = styled.div<{}>`
        font-size: 14px;
        font-family: GilmerBold;
        text-wrap: nowrap;
        &:first {
            margin-top: 0;
        }
    `;

    export const SubTitle = styled.div<{}>`
        font-size: 12px;
        opacity: 0.9;
    `;

    export const BodyText = styled.div<{}>`
        font-size: 11px;
        opacity: 0.5;
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
        width: 124px;
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

    export const HorizontalLine = styled.hr`
        width: 100%;
        border: 0;
        border-top: 1px solid ${ThemeColors.OUTLINE_VARIANT};
    `;

    export const BackButton = styled(Button)`
        /* position: absolute;
        right: 10px; */
        border-radius: 5px;
    `;

    export const CloseButton = styled(Button)`
        position: absolute;
        right: 10px;
        border-radius: 5px;
    `;

    export const HighlightedButton = styled.div`
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 8px;
        padding: 6px 2px;
        color: ${ThemeColors.PRIMARY};
        border: 1px dashed ${ThemeColors.PRIMARY};
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            border: 1px solid ${ThemeColors.PRIMARY};
            background-color: ${ThemeColors.PRIMARY_CONTAINER};
        }
    `;

    export const AddConnectionButton = styled(Button)`
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    `;

    export const AiContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        width: 100%;
        margin-top: 20px;
    `;
}

interface NodeListProps {
    categories: Category[];
    showAiPanel?: boolean;
    title?: string;
    onSelect: (id: string, metadata?: any) => void;
    onSearchTextChange?: (text: string) => void;
    onAddConnection?: () => void;
    onAddFunction?: () => void;
    onBack?: () => void;
    onClose?: () => void;
}

export function NodeList(props: NodeListProps) {
    const {
        categories,
        showAiPanel,
        title,
        onSelect,
        onSearchTextChange,
        onAddConnection,
        onAddFunction,
        onBack,
        onClose,
    } = props;

    console.log(">>> categories", { categories });

    const [searchText, setSearchText] = useState<string>("");
    const [showGeneratePanel, setShowGeneratePanel] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (onSearchTextChange) {
            setIsSearching(true);
            debouncedSearch(searchText);
            return () => debouncedSearch.cancel();
        }
    }, [searchText]);

    const handleSearch = (text: string) => {
        onSearchTextChange(text);
    };

    const debouncedSearch = debounce(handleSearch, 1100);

    const handleOnSearch = (text: string) => {
        setSearchText(text);
    };

    useEffect(() => {
        setIsSearching(false);
    }, [categories]);

    const handleAddNode = (node: Node, category?: string) => {
        onSelect(node.id, { node: node.metadata, category });
    };

    const handleAddConnection = () => {
        if (onAddConnection) {
            onAddConnection();
        }
    };

    const handleAddFunction = () => {
        if (onAddFunction) {
            onAddFunction();
        }
    };

    const getNodesContainer = (nodes: Node[]) => (
        <S.Grid columns={2}>
            {nodes.map((node, index) => {
                if (["MATCH"].includes(node.id)) {
                    // HACK: Skip the MATCH and FOREACH nodes until the implementation is ready
                    return;
                }

                return (
                    <S.Component key={node.id + index} enabled={node.enabled} onClick={() => handleAddNode(node)} title={node.label}>
                        <S.IconContainer>{node.icon || <LogIcon />}</S.IconContainer>
                        <S.ComponentTitle>{node.label}</S.ComponentTitle>
                    </S.Component>
                );
            })}
        </S.Grid>
    );

    const getConnectionContainer = (categories: Category[]) => (
        <S.Grid columns={1}>
            {categories.map((category, index) => (
                // <Tooltip content={category.description} key={category.title + index + "tooltip"}>
                <GroupList
                    key={category.title + index + "tooltip"}
                    category={category}
                    expand={searchText?.length > 0}
                    onSelect={handleAddNode}
                />
                // </Tooltip>
            ))}
        </S.Grid>
    );

    const getCategoryContainer = (groups: Category[], isSubCategory = false) => {
        const content = (
            <>
                {groups.map((group, index) => {
                    const isConnectionCategory = group.title === "Connections";
                    const isProjectFunctionsCategory = group.title === "Current Integration";
                    const isFunctionsCategory = isProjectFunctionsCategory && title === "Functions";
                    if ((!group || group.items.length === 0) && !isConnectionCategory && !isProjectFunctionsCategory) {
                        return null;
                    }
                    if (searchText && group.items.length === 0) {
                        return null;
                    }
                    return (
                        <S.CategoryRow key={group.title + index} showBorder={!isSubCategory}>
                            <S.Row>
                                {isSubCategory && (
                                    <Tooltip content={group.description}>
                                        <S.SubTitle>{group.title}</S.SubTitle>
                                    </Tooltip>
                                )}
                                {!isSubCategory && (
                                    <>
                                        <S.Title>{group.title}</S.Title>
                                        {(isConnectionCategory || isProjectFunctionsCategory) && (
                                            <Button
                                                appearance="icon"
                                                tooltip={
                                                    isConnectionCategory
                                                        ? "Add Connection"
                                                        : `Create ${isFunctionsCategory ? "Function" : "Data Mapper"}`
                                                }
                                                onClick={
                                                    isConnectionCategory
                                                        ? handleAddConnection
                                                        : handleAddFunction
                                                }
                                            >
                                                <Codicon name="add" />
                                            </Button>
                                        )}
                                    </>
                                )}
                            </S.Row>
                            {/* {!isSubCategory && <S.BodyText>{group.description}</S.BodyText>} */}
                            {isConnectionCategory && group.items.length === 0 && (
                                <S.HighlightedButton onClick={handleAddConnection}>
                                    <Codicon name="add" iconSx={{ fontSize: 12 }} />
                                    Add Connection
                                </S.HighlightedButton>
                            )}
                            {isProjectFunctionsCategory && group.items.length === 0 && !searchText && !isSearching && (
                                <S.HighlightedButton onClick={handleAddFunction}>
                                    <Codicon name="add" iconSx={{ fontSize: 12 }} />
                                    {`Create ${isFunctionsCategory ? "Function" : "Data Mapper"}`}
                                </S.HighlightedButton>
                            )}
                            {group.items.length > 0 && "id" in group.items.at(0)
                                ? getNodesContainer(group.items as Node[])
                                : isConnectionCategory || isProjectFunctionsCategory
                                    ? getConnectionContainer(group.items as Category[])
                                    : getCategoryContainer(group.items as Category[], true)}
                        </S.CategoryRow>
                    );
                })}
            </>
        );

        // Check if the content is empty
        const isEmpty = React.Children.toArray(content.props.children).every((child) => child === null);

        return isEmpty ? <div style={{ paddingTop: "10px" }}>No matching results found</div> : content;
    };

    // filter out category items based on search text
    const filterItems = (items: Item[]): Item[] => {
        return items
            .map((item) => {
                if ("items" in item) {
                    const filteredItems = filterItems(item.items);
                    return {
                        ...item,
                        items: filteredItems,
                    };
                } else {
                    const lowerCaseTitle = item.label.toLowerCase();
                    const lowerCaseDescription = item.description?.toLowerCase() || "";
                    const lowerCaseSearchText = searchText.toLowerCase();
                    if (
                        lowerCaseTitle.includes(lowerCaseSearchText) ||
                        lowerCaseDescription.includes(lowerCaseSearchText)
                    ) {
                        return item;
                    }
                }
            })
            .filter(Boolean);
    };

    const filteredCategories = cloneDeep(categories).map((category) => {
        if (!category || !category.items || onSearchTextChange) {
            return category;
        }
        category.items = filterItems(category.items);
        return category;
    });

    return (
        <S.Container>
            <S.HeaderContainer>
                <S.Row>
                    {showAiPanel && (
                        <Switch
                            leftLabel="Search"
                            rightLabel="Generate"
                            checked={showGeneratePanel}
                            checkedColor={ThemeColors.PRIMARY}
                            enableTransition={true}
                            onChange={() => {
                                setShowGeneratePanel(!showGeneratePanel);
                            }}
                            sx={{
                                margin: "auto",
                                zIndex: "2",
                                border: "unset",
                            }}
                            disabled={false}
                        />
                    )}
                    {onBack && title && (
                        <S.LeftAlignRow>
                            <S.BackButton appearance="icon" onClick={onBack}>
                                <BackIcon />
                            </S.BackButton>
                            {title}
                        </S.LeftAlignRow>
                    )}
                    {onClose && (
                        <S.CloseButton appearance="icon" onClick={onClose}>
                            <CloseIcon />
                        </S.CloseButton>
                    )}
                </S.Row>
                {!showGeneratePanel && (
                    <S.Row>
                        <S.StyledSearchInput
                            value={searchText}
                            placeholder="Search"
                            autoFocus={true}
                            onChange={handleOnSearch}
                            size={60}
                        />
                    </S.Row>
                )}
            </S.HeaderContainer>
            {isSearching && (
                <S.PanelBody>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <ProgressRing />
                    </div>
                </S.PanelBody>
            )}
            {!showGeneratePanel && !isSearching && (
                <S.PanelBody>{getCategoryContainer(filteredCategories)}</S.PanelBody>
            )}
            {showAiPanel && showGeneratePanel && (
                <S.PanelBody>
                    <S.AiContainer>
                        <S.Title>Describe what you want you want to do</S.Title>
                        <TextArea
                            rows={10}
                            placeholder={
                                "E.g. I need to add functionality to validate user input before saving to the database."
                            }
                            sx={{ width: "100%" }}
                        ></TextArea>
                        <Button>Generate</Button>
                    </S.AiContainer>
                </S.PanelBody>
            )}
        </S.Container>
    );
}

export default NodeList;
