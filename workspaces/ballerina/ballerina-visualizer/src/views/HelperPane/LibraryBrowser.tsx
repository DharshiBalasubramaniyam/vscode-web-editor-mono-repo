
import { useEffect, useRef, useState } from 'react';
import { COMPLETION_ITEM_KIND, getIcon, HelperPane } from '@dharshi/ui-toolkit';
import { HelperPaneCompletionItem, HelperPaneFunctionInfo } from '@dharshi/ballerina-side-panel';

type LibraryBrowserProps = {
    isLoading: boolean;
    libraryBrowserInfo: HelperPaneFunctionInfo;
    setFilterText: (filterText: string) => void;
    onBack: () => void;
    onClose: () => void;
    onChange: (value: string) => void;
    onFunctionItemSelect: (item: HelperPaneCompletionItem) => Promise<string>;
};

export const LibraryBrowser = ({
    isLoading,
    libraryBrowserInfo,
    setFilterText,
    onBack,
    onClose,
    onChange,
    onFunctionItemSelect
}: LibraryBrowserProps) => {
    const firstRender = useRef<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            setFilterText('');
        }
    }, []);

    const handleSearch = (searchText: string) => {
        setFilterText(searchText);
        setSearchValue(searchText);
    };

    const handleFunctionItemSelect = async (item: HelperPaneCompletionItem) => {
        const response = await onFunctionItemSelect(item);
        onChange(response);
        onClose();
    };

    return (
        <HelperPane.LibraryBrowser
            loading={isLoading}
            searchValue={searchValue}
            onSearch={handleSearch}
            onClose={onBack}
            titleSx={{ fontFamily: 'GilmerRegular' }}
        >
            {libraryBrowserInfo?.category.map((category) => (
                <HelperPane.LibraryBrowserSection
                    key={category.label}
                    title={category.label}
                    titleSx={{ fontFamily: 'GilmerMedium' }}
                    {...(category.items?.length > 0 && category.subCategory?.length === 0 && {
                        columns: 4
                    })}
                >
                    {category.items?.map((item) => (
                        <HelperPane.CompletionItem
                            key={`${category.label}-${item.label}`}
                            label={item.label}
                            type={item.type}
                            getIcon={() => getIcon(COMPLETION_ITEM_KIND.Function)}
                            onClick={async () => await handleFunctionItemSelect(item)}
                        />
                    ))}
                    {category.subCategory?.map((subCategory) => (
                        <HelperPane.LibraryBrowserSubSection
                            key={`${category.label}-${subCategory.label}`}
                            title={subCategory.label}
                            columns={4}
                        >
                            {subCategory.items?.map((item) => (
                                <HelperPane.CompletionItem
                                    key={`${category.label}-${subCategory.label}-${item.label}`}
                                    label={item.label}
                                    getIcon={() => getIcon(COMPLETION_ITEM_KIND.Function)}
                                    onClick={async () => await handleFunctionItemSelect(item)}
                                />
                            ))}
                        </HelperPane.LibraryBrowserSubSection>
                    ))}
                </HelperPane.LibraryBrowserSection>
            ))}
        </HelperPane.LibraryBrowser>
    );
};
