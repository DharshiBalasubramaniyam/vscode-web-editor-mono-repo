import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
    Codicon,
    getIcon,
    HelperPane,
    HelperPaneHeight,
    Typography
} from '@dharshi/ui-toolkit';
import { TypeHelperCategory, TypeHelperItem, TypeHelperOperator } from '.';
import { TypeBrowser } from './TypeBrowser';
import { isTypePanelOpen } from './Utils';

/* Constants */
const PANEL_TABS = {
    TYPES: 0,
    OPERATORS: 1
} as const;

/* Types */
type TypeHelperComponentProps = {
    open: boolean;
    currentType: string;
    currentCursorPosition: number;
    loading?: boolean;
    loadingTypeBrowser?: boolean;
    basicTypes: TypeHelperCategory[];
    operators: TypeHelperOperator[];
    typeBrowserTypes: TypeHelperCategory[];
    typeBrowserRef: React.RefObject<HTMLDivElement>;
    typeHelperHeight?: HelperPaneHeight;
    onChange: (newType: string, newCursorPosition: number) => void;
    onSearchTypeHelper: (searchText: string, isType: boolean) => void;
    onSearchTypeBrowser: (searchText: string) => void;
    onTypeItemClick: (item: TypeHelperItem) => Promise<string>;
    onClose: () => void;
};

type StyleBase = {
    sx?: React.CSSProperties;
};

/* Styles */
namespace S {
    export const Container = styled.div<StyleBase>`
        position: absolute;
        z-index: 2001;
        filter: drop-shadow(0 3px 8px rgb(0 0 0 / 0.2));

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        ${(props) => props.sx && { ...props.sx }}
    `;

    export const OperatorContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
    `;

    export const Operator = styled.div`
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 2px 4px;
        cursor: pointer;

        &:hover {
            background-color: var(--vscode-list-hoverBackground);
        }
    `;

    export const OptionIcon = styled.div`
        margin-top: 2px;
    `;

    export const CategoryContainer = styled.div`
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
    `;

    export const ItemContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
    `;

    export const Item = styled.div`
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
    `;
}

export const TypeHelperComponent = (props: TypeHelperComponentProps) => {
    const {
        open,
        typeHelperHeight = "full",
        currentType,
        currentCursorPosition,
        typeBrowserRef,
        loading = false,
        loadingTypeBrowser = false,
        basicTypes,
        operators,
        typeBrowserTypes,
        onChange,
        onSearchTypeHelper,
        onSearchTypeBrowser,
        onTypeItemClick,
        onClose
    } = props;
    const [searchValue, setSearchValue] = useState<string>('');
    const [isTypeBrowserOpen, setIsTypeBrowserOpen] = useState<boolean>(false);
    const [activePanelIndex, setActivePanelIndex] = useState<number>(PANEL_TABS.TYPES);

    const handleOperatorClick = (operator: TypeHelperOperator) => {
        if (operator.insertType === 'global') {
            if (operator.insertLocation === 'start') {
                onChange(
                    operator.insertText + ' ' + currentType.trimStart(),
                    currentCursorPosition + operator.insertText.length + 1
                );
            } else {
                onChange(currentType.trimEnd() + operator.insertText, currentCursorPosition);
            }
        } else {
            const suffixRegex = /^[a-zA-Z0-9_']*/;
            const suffixMatch = currentType.slice(currentCursorPosition).match(suffixRegex);

            if (suffixMatch) {
                const newCursorPosition = currentCursorPosition + suffixMatch[0].length;
                onChange(
                    currentType.slice(0, newCursorPosition) +
                        operator.insertText +
                        currentType.slice(newCursorPosition),
                    newCursorPosition + operator.insertText.length
                );
            }
        }
    };

    const handleTypeItemClick = (item: TypeHelperItem) => {
        const prefixRegex = /[a-zA-Z0-9_':]*$/;
        const suffixRegex = /^[a-zA-Z0-9_':]*/;
        const prefixMatch = currentType.slice(0, currentCursorPosition).match(prefixRegex);
        const suffixMatch = currentType.slice(currentCursorPosition).match(suffixRegex);
        const prefixCursorPosition = currentCursorPosition - (prefixMatch?.[0]?.length ?? 0);
        const suffixCursorPosition = currentCursorPosition + (suffixMatch?.[0]?.length ?? 0);

        onChange(
            currentType.slice(0, prefixCursorPosition) + item.insertText + currentType.slice(suffixCursorPosition),
            prefixCursorPosition + item.insertText.length
        );
    };

    const handleHelperPaneSearch = (searchText: string) => {
        setSearchValue(searchText);
        onSearchTypeHelper(searchText, isTypePanelOpen(activePanelIndex));
    };

    useEffect(() => {
        if (open) {
            onSearchTypeHelper(searchValue, isTypePanelOpen(activePanelIndex));
        }
    }, [activePanelIndex, open]);

    return (
        <HelperPane helperPaneHeight={typeHelperHeight}>
            <HelperPane.Header
                title="Type Helper"
                titleSx={{ fontFamily: 'GilmerRegular' }}
                onClose={onClose}
                searchValue={searchValue}
                onSearch={handleHelperPaneSearch}
            />
            <HelperPane.Body>
                <HelperPane.Panels>
                    {/* Type helper tabs */}
                    <HelperPane.PanelTab
                        title="Types"
                        id={PANEL_TABS.TYPES}
                        onClick={() => setActivePanelIndex(PANEL_TABS.TYPES)}
                    />
                    <HelperPane.PanelTab
                        title="Operators"
                        id={PANEL_TABS.OPERATORS}
                        onClick={() => setActivePanelIndex(PANEL_TABS.OPERATORS)}
                    />

                    {/* Type helper panel views */}
                    <HelperPane.PanelView id={PANEL_TABS.TYPES}>
                        {loading ? (
                            <HelperPane.Loader rows={3} columns={2} sections={3} />
                        ) : (
                            basicTypes?.length > 0 &&
                            basicTypes.map((category) => (
                                <HelperPane.Section
                                    key={category.category}
                                    title={category.category}
                                    titleSx={{ fontFamily: 'GilmerMedium' }}
                                    columns={2}
                                >
                                    {category.items.map((item) => (
                                        <HelperPane.CompletionItem
                                            key={`${category.category}-${item.name}`}
                                            label={item.name}
                                            getIcon={() => getIcon(item.type)}
                                            onClick={() => handleTypeItemClick(item)}
                                        />
                                    ))}
                                </HelperPane.Section>
                            ))
                        )}
                    </HelperPane.PanelView>
                    <HelperPane.PanelView id={PANEL_TABS.OPERATORS}>
                        {loading ? (
                            <HelperPane.Loader rows={5} columns={1} sections={1} />
                        ) : (
                            operators?.length > 0 && (
                                <S.OperatorContainer>
                                    {operators.map((operator) => (
                                        <S.Operator key={operator.name} onClick={() => handleOperatorClick(operator)}>
                                            <S.OptionIcon>{operator.getIcon()}</S.OptionIcon>
                                            <Typography variant="body3">{operator.name}</Typography>
                                        </S.Operator>
                                    ))}
                                </S.OperatorContainer>
                            )
                        )}
                    </HelperPane.PanelView>
                </HelperPane.Panels>
            </HelperPane.Body>
            <HelperPane.Footer>
                <HelperPane.IconButton
                    title="Open type browser"
                    getIcon={() => <Codicon name="library" />}
                    onClick={() => setIsTypeBrowserOpen(true)}
                />
            </HelperPane.Footer>

            {/* Type browser */}
            {isTypeBrowserOpen && (
                <TypeBrowser
                    typeBrowserRef={typeBrowserRef}
                    currentType={currentType}
                    currentCursorPosition={currentCursorPosition}
                    loadingTypeBrowser={loadingTypeBrowser}
                    typeBrowserTypes={typeBrowserTypes}
                    onSearchTypeBrowser={onSearchTypeBrowser}
                    onTypeItemClick={onTypeItemClick}
                    onChange={onChange}
                    onClose={() => setIsTypeBrowserOpen(false)}
                />
            )}
        </HelperPane>
    );
};
