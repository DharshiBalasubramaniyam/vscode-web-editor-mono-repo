
import { LineRange, VisibleType } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { ExpressionFormField } from "@dharshi/ballerina-side-panel";
import { useEffect, useState } from "react";
import { VariableTree } from "./VariablePanel/VariablesTree";
import styled from "@emotion/styled";
import { SearchBox, Typography, ThemeColors } from "@dharshi/ui-toolkit";
import { PanelBody } from ".";

interface VariablesViewProps {
    filePath: string;
    position: LineRange;
    updateFormField: (data: ExpressionFormField) => void;
    editorKey: string;
}

export const VariableComponent = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding: 5px;
        height: 25px;
        cursor: pointer;
        &:hover {
                background-color: ${ThemeColors.SURFACE_CONTAINER};
        }
`;

export const VariableName = styled(Typography)`
    variant: body3;
    margin: 0px 5px;
`;

export const VariableType = styled(Typography)`
    variant: body3;
    color: var(--vscode-terminal-ansiGreen);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const IconContainer = styled.div`
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        & svg {
            height: 14px;
            width: 14px;
            fill: ${ThemeColors.ON_SURFACE};
            stroke: ${ThemeColors.ON_SURFACE};
        }
    `;

export const SearchWrapper = styled.div<{}>`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        margin-bottom: 4px;
        width: 100%;
    `;
export const SearchInput = styled(SearchBox)`
        height: 30px;
    `;

export const Title = styled.div<{}>`
        font-size: 14px;
        font-family: GilmerBold;
        margin: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-wrap: nowrap;
    `;

const ListView = styled.div<{}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 32px;
    max-width: '100%'
    `;


export function VariablesView(props: VariablesViewProps) {
    const { filePath, position, updateFormField, editorKey } = props;
    const { rpcClient } = useRpcContext();


    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [variableTypes, setVariableTypes] = useState<VisibleType[]>([]);

    useEffect(() => {
        setIsSearching(true);
        rpcClient
            .getBIDiagramRpcClient()
            .getVisibleVariableTypes({
                filePath: filePath,
                position: {
                    line: position.startLine.line,
                    offset: position.startLine.offset,
                }
            }).then((response) => {

                console.log('===!!response', response, filePath, position);
                setVariableTypes(response.categories);
            }).finally(() => {
                setIsSearching(false);
            });
    }, [filePath, position]);

    const handleOnSearch = (text: string) => {
        setSearchText(text);
    };

    const handleOnSelection = (variable: string) => {
        const updateData: ExpressionFormField = {
            value: variable,
            key: editorKey,
            cursorPosition: { line: position.endLine.line, offset: position.endLine.offset }
        }
        updateFormField(updateData);
    }

    return (
        <PanelBody>
            <SearchWrapper>
                <SearchInput
                    value={searchText}
                    placeholder="Search"
                    autoFocus={true}
                    onChange={handleOnSearch}
                    size={60}
                />
            </SearchWrapper>
            {!isSearching &&
                <div style={{ height: "calc(100vh - 100px)", width: "380px", display: 'flex', flexDirection: 'column' }}>
                    <ScopeVariables
                        categories={variableTypes}
                        handleOnSelection={handleOnSelection}
                        searchText={searchText}
                    />
                    <ConfigurableVariables
                        categories={variableTypes}
                        handleOnSelection={handleOnSelection}
                        searchText={searchText}
                    />
                </div>
            }
        </PanelBody>
    );

}

function ScopeVariables({
    categories,
    handleOnSelection,
    searchText
}: {
    categories: VisibleType[],
    handleOnSelection: (variable: string) => void,
    searchText: string
}) {
    const scopeVariables = categories.filter(category =>
        ['Local Variables', 'Module Variables'].includes(category.name)
    );

    const filteredVariables = scopeVariables.flatMap(category =>
        category.types.filter(variable =>
            variable.name.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    if (filteredVariables.length === 0) {
        return null;
    }

    return (
        <ListView style={{ maxHeight: '80vh' }}>
            <Title>Scope Variables</Title>
            <div style={{ overflow: 'scroll' }}>
                {filteredVariables.map((variable) => (
                    <VariableTree
                        variable={variable}
                        depth={1}
                        handleOnSelection={handleOnSelection}
                    />
                ))}
            </div>

        </ListView>
    );
}

function ConfigurableVariables({
    categories,
    handleOnSelection,
    searchText
}: {
    categories: VisibleType[],
    handleOnSelection: (variable: string) => void,
    searchText: string
}) {
    const configurableVariables = categories.find(category => category.name === 'Configurable Variables');

    const filteredVariables = configurableVariables?.types.filter(variable =>
        variable.name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    if (filteredVariables.length === 0) {
        return null;
    }

    return (
        <ListView>
            <Title>Configurable Variables</Title>
            <div style={{ overflow: 'scroll' }}>
                {filteredVariables.map((variable) => (
                    <VariableTree
                        variable={variable}
                        depth={1}
                        handleOnSelection={handleOnSelection}
                    />
                ))}
            </div>
        </ListView>
    );
}
