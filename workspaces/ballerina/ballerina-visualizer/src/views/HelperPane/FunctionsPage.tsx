
import { useCallback, useEffect, useRef, useState } from 'react';
import { Codicon, COMPLETION_ITEM_KIND, getIcon, HelperPane } from '@dharshi/ui-toolkit';
import { LibraryBrowser } from './LibraryBrowser';
import { HelperPaneCompletionItem, HelperPaneFunctionInfo } from '@dharshi/ballerina-side-panel';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import { LineRange, FunctionKind } from '@dharshi/ballerina-core';
import { convertToHelperPaneFunction, extractFunctionInsertText } from '../../utils/bi';
import { debounce } from 'lodash';

type FunctionsPageProps = {
    fileName: string;
    targetLineRange: LineRange;
    onClose: () => void;
    onChange: (value: string) => void;
};

export const FunctionsPage = ({ fileName, targetLineRange, onClose, onChange }: FunctionsPageProps) => {
    const { rpcClient } = useRpcContext();
    const firstRender = useRef<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLibraryBrowserOpen, setIsLibraryBrowserOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [functionInfo, setFunctionInfo] = useState<HelperPaneFunctionInfo | undefined>(undefined);
    const [libraryBrowserInfo, setLibraryBrowserInfo] = useState<HelperPaneFunctionInfo | undefined>(undefined);

    const debounceFetchFunctionInfo = useCallback(
        debounce((searchText: string, includeAvailableFunctions?: string) => {
            rpcClient
                .getBIDiagramRpcClient()
                .getFunctions({
                    position: targetLineRange,
                    filePath: fileName,
                    queryMap: {
                        q: searchText.trim(),
                        limit: 12,
                        offset: 0,
                        ...(!!includeAvailableFunctions && { includeAvailableFunctions })
                    }
                })
                .then((response) => {
                    if (response.categories?.length) {
                        if (!!includeAvailableFunctions) {
                            setLibraryBrowserInfo(convertToHelperPaneFunction(response.categories));
                        } else {
                            setFunctionInfo(convertToHelperPaneFunction(response.categories));
                        }
                    }
                })
                .then(() => setIsLoading(false));
        }, 1100),
        [rpcClient, fileName, targetLineRange]
    );

    const fetchFunctionInfo = useCallback(
        (searchText: string, includeAvailableFunctions?: string) => {
            setIsLoading(true);
            debounceFetchFunctionInfo(searchText, includeAvailableFunctions);
        },
        [debounceFetchFunctionInfo, searchValue]
    );

    const onFunctionItemSelect = async (item: HelperPaneCompletionItem) => {
        const response = await rpcClient.getBIDiagramRpcClient().addFunction({
            filePath: fileName,
            codedata: item.codedata,
            kind: item.kind as FunctionKind,
            searchKind: "FUNCTION"
        });

        if (response.template) {
            return extractFunctionInsertText(response.template);
        }

        return '';
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            fetchFunctionInfo('');
        }
    }, []);

    const handleFunctionSearch = (searchText: string) => {
        setSearchValue(searchText);

        // Search functions
        if (isLibraryBrowserOpen) {
            fetchFunctionInfo(searchText, 'true');
        } else {
            fetchFunctionInfo(searchText);
        }
    };

    const handleFunctionItemSelect = async (item: HelperPaneCompletionItem) => {
        const insertText = await onFunctionItemSelect(item);
        onChange(insertText);
        onClose();
    };

    return (
        <>
            <HelperPane.Header
                searchValue={searchValue}
                onSearch={handleFunctionSearch}
                titleSx={{ fontFamily: 'GilmerRegular' }}
            />
            <HelperPane.Body loading={isLoading}>
                {functionInfo?.category.map((category) => {
                    /* If no sub category found */
                    if (!category.subCategory) {
                        return (
                            <HelperPane.Section
                                title={category.label}
                                collapsible
                                defaultCollapsed
                                columns={2}
                                collapsedItemsCount={6}
                                titleSx={{ fontFamily: 'GilmerMedium' }}
                            >
                                {category.items.map((item) => (
                                    <HelperPane.CompletionItem
                                        key={`${category.label}-${item.label}`}
                                        label={item.label}
                                        type={item.type}
                                        onClick={async () => await handleFunctionItemSelect(item)}
                                        getIcon={() => getIcon(COMPLETION_ITEM_KIND.Function)}
                                    />
                                ))}
                            </HelperPane.Section>
                        );
                    }

                    /* If sub category found */
                    return (
                        <HelperPane.Section title={category.label} titleSx={{ fontFamily: 'GilmerMedium' }}>
                            {category.subCategory.map((subCategory) => (
                                <HelperPane.SubSection
                                    key={`${category.label}-${subCategory.label}`}
                                    title={subCategory.label}
                                    collapsible
                                    defaultCollapsed
                                    columns={2}
                                    collapsedItemsCount={6}
                                >
                                    {subCategory.items?.map((item) => (
                                        <HelperPane.CompletionItem
                                            key={`${category.label}-${subCategory.label}-${item.label}`}
                                            label={item.label}
                                            onClick={async () => await handleFunctionItemSelect(item)}
                                            getIcon={() => getIcon(COMPLETION_ITEM_KIND.Function)}
                                        />
                                    ))}
                                </HelperPane.SubSection>
                            ))}
                        </HelperPane.Section>
                    );
                })}
            </HelperPane.Body>
            <HelperPane.Footer>
                <HelperPane.IconButton
                    title="Open library browser"
                    getIcon={() => <Codicon name="library" />}
                    onClick={() => setIsLibraryBrowserOpen(true)}
                />
            </HelperPane.Footer>
            {isLibraryBrowserOpen && (
                <LibraryBrowser
                    isLoading={isLoading}
                    libraryBrowserInfo={libraryBrowserInfo as HelperPaneFunctionInfo}
                    setFilterText={handleFunctionSearch}
                    onBack={() => setIsLibraryBrowserOpen(false)}
                    onClose={onClose}
                    onChange={onChange}
                    onFunctionItemSelect={onFunctionItemSelect}
                />
            )}
        </>
    );
};
