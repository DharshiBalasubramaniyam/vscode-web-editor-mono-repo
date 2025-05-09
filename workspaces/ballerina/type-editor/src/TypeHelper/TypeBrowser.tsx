import React, { RefObject, useEffect, useRef, useState } from 'react';
import { getIcon, HelperPane } from '@dharshi/ui-toolkit';
import { TypeHelperCategory, TypeHelperItem } from '.';

type TypeBrowserProps = {
    typeBrowserRef: RefObject<HTMLDivElement>;
    currentType: string;
    currentCursorPosition: number;
    loadingTypeBrowser: boolean;
    typeBrowserTypes: TypeHelperCategory[];
    onSearchTypeBrowser: (searchText: string) => void;
    onTypeItemClick: (item: TypeHelperItem) => Promise<string>;
    onChange: (newType: string, newCursorPosition: number) => void;
    onClose: () => void;
};

export const TypeBrowser = (props: TypeBrowserProps) => {
    const {
        typeBrowserRef,
        currentType,
        currentCursorPosition,
        loadingTypeBrowser,
        typeBrowserTypes,
        onSearchTypeBrowser,
        onTypeItemClick,
        onChange,
        onClose
    } = props;

    const firstRender = useRef<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (searchText: string) => {
        setSearchValue(searchText);
        onSearchTypeBrowser(searchText);
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            onSearchTypeBrowser('');
            return;
        }
    }, [typeBrowserTypes]);

    const handleTypeItemClick = async (item: TypeHelperItem) => {
        const prefixRegex = /[a-zA-Z0-9_':]*$/;
        const suffixRegex = /^[a-zA-Z0-9_':]*/;
        const prefixMatch = currentType.slice(0, currentCursorPosition).match(prefixRegex);
        const suffixMatch = currentType.slice(currentCursorPosition).match(suffixRegex);
        const prefixCursorPosition = currentCursorPosition - (prefixMatch?.[0]?.length ?? 0);
        const suffixCursorPosition = currentCursorPosition + (suffixMatch?.[0]?.length ?? 0);

        try {
            const updateText = await onTypeItemClick(item);
            if (updateText) {
                onChange(
                    currentType.slice(0, prefixCursorPosition) + updateText + currentType.slice(suffixCursorPosition),
                    prefixCursorPosition + updateText.length
                );
            }
        } catch (error) {
            console.error(error);
        }

        // Close the type browser
        onClose();
    };

    return (
        <HelperPane.LibraryBrowser
            anchorRef={typeBrowserRef}
            loading={loadingTypeBrowser}
            searchValue={searchValue}
            onSearch={handleSearch}
            onClose={onClose}
            title="Type Browser"
            titleSx={{ fontFamily: 'GilmerRegular' }}
        >
            {typeBrowserTypes?.length > 0 &&
                typeBrowserTypes.map((category) => (
                    <HelperPane.Section
                        key={category.category}
                        title={category.category}
                        titleSx={{ fontFamily: 'GilmerMedium' }}
                        {...(category.items?.length > 0 &&
                            category.subCategory?.length === 0 && {
                                columns: 4
                            })}
                    >
                        {category.items?.map((item) => (
                            <HelperPane.CompletionItem
                                key={`${category.category}-${item.name}`}
                                label={item.name}
                                getIcon={() => getIcon(item.type)}
                                onClick={() => handleTypeItemClick(item)}
                            />
                        ))}
                        {category.subCategory?.map((subCategory) => (
                            <HelperPane.LibraryBrowserSubSection
                                key={subCategory.category}
                                title={subCategory.category}
                                columns={4}
                            >
                                {subCategory.items?.map((item) => (
                                    <HelperPane.CompletionItem
                                        key={`${subCategory.category}-${item.name}`}
                                        label={item.name}
                                        getIcon={() => getIcon(item.type)}
                                        onClick={() => handleTypeItemClick(item)}
                                    />
                                ))}
                            </HelperPane.LibraryBrowserSubSection>
                        ))}
                    </HelperPane.Section>
                ))}
        </HelperPane.LibraryBrowser>
    );
};
