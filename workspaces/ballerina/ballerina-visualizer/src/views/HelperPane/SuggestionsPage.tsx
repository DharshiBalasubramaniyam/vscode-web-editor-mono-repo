
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { LineRange } from "@dharshi/ballerina-core";
import { HelperPaneVariableInfo } from "@dharshi/ballerina-side-panel";
import { COMPLETION_ITEM_KIND, CompletionItemKind, getIcon, HelperPane } from "@dharshi/ui-toolkit";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { convertToHelperPaneVariable, filterHelperPaneVariables } from "../../utils/bi";

type SuggestionsPageProps = {
    fileName: string;
    targetLineRange: LineRange;
    defaultValue: string;
    onChange: (value: string) => void;
};

export const SuggestionsPage = ({ fileName, targetLineRange, defaultValue, onChange }: SuggestionsPageProps) => {
    const { rpcClient } = useRpcContext();
    const firstRender = useRef<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [variableInfo, setVariableInfo] = useState<HelperPaneVariableInfo | undefined>(undefined);
    const [filteredVariableInfo, setFilteredVariableInfo] = useState<HelperPaneVariableInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getVariableInfo = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            rpcClient
                .getBIDiagramRpcClient()
                .getVisibleVariableTypes({
                    filePath: fileName,
                    position: {
                        line: targetLineRange.startLine.line,
                        offset: targetLineRange.startLine.offset,
                    },
                })
                .then((response) => {
                    if (response.categories?.length) {
                        const convertedHelperPaneVariable = convertToHelperPaneVariable(response.categories);
                        setVariableInfo(convertedHelperPaneVariable);
                        setFilteredVariableInfo(convertedHelperPaneVariable);
                    }
                })
                .then(() => setIsLoading(false));
        }, 1100)
    }, [rpcClient, fileName, targetLineRange]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            getVariableInfo();
        }
    }, []);

    const debounceFilterVariables = useCallback(
        debounce((searchText: string) => {
            setFilteredVariableInfo(filterHelperPaneVariables(variableInfo, searchText));
            setIsLoading(false);
        }, 1100),
        [variableInfo, setFilteredVariableInfo, setIsLoading, filterHelperPaneVariables]
    );

    const handleSearch = (searchText: string) => {
        setSearchValue(searchText);
        setIsLoading(true);
        debounceFilterVariables(searchText);
    };

    return (
        <>
            <HelperPane.Header
                searchValue={searchValue}
                onSearch={handleSearch}
                titleSx={{ fontFamily: "GilmerRegular" }}
            />
            <HelperPane.Body loading={isLoading}>
                {defaultValue && defaultValue !== '""' && (
                    <HelperPane.Section
                        title="Suggestions"
                        titleSx={{ fontFamily: "GilmerMedium" }}
                    >
                        <HelperPane.CompletionItem
                            label={defaultValue}
                            onClick={() => onChange(defaultValue)}
                            getIcon={() => getIcon(COMPLETION_ITEM_KIND.Snippet)}
                        />
                    </HelperPane.Section>
                )}
                {filteredVariableInfo?.category.map((category) => (
                    <HelperPane.Section
                        title={category.label}
                        titleSx={{ fontFamily: "GilmerMedium" }}
                    >
                        {category.items.map((item) => (
                            <HelperPane.CompletionItem
                                key={`${category.label}-${item.label}`}
                                label={item.label}
                                type={item.type}
                                onClick={() => onChange(item.label)}
                                getIcon={() => getIcon(item.type as CompletionItemKind)}
                            />
                        ))}
                    </HelperPane.Section>
                ))}
            </HelperPane.Body>
        </>
    );
};
