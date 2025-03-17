/* eslint-disable @typescript-eslint/ban-types */
import { CSSProperties, PropsWithChildren, ReactNode, RefObject } from "react";
import { StyleBase } from "./common";
import { HelperPaneHeight, HelperPaneOrigin } from "../../../types/common";

export type ArrowProps = StyleBase & {
    origin: HelperPaneOrigin;
}

export type LibraryBrowserProps = PropsWithChildren<{
    anchorRef: RefObject<HTMLDivElement>;
    loading?: boolean;
    searchValue: string;
    title?: string;
    titleSx?: CSSProperties;
    onSearch: (searchTerm: string) => void;
    onClose: () => void;
}>;

export type HelperPaneIconButtonProps = {
    title: string;
    getIcon: () => ReactNode;
    onClick: () => void;
}

export type HelperPaneFooterProps = PropsWithChildren<{}>;

export type HelperPaneCompletionItemProps = PropsWithChildren<{
    indent?: boolean;
    label: string;
    type?: string;
    getIcon?: () => ReactNode;
    onClick: () => void;
}>;

export type HelperPaneCategoryItemProps = {
    label: string;
    labelSx?: CSSProperties;
    onClick: () => void;
    getIcon?: () => ReactNode;
};

type CollapsibleConditionalProps = {
    collapsible: boolean;
    defaultCollapsed?: boolean;
    collapsedItemsCount?: number;
} | {
    collapsible?: never;
    defaultCollapsed?: never;
    collapsedItemsCount?: never;
}

export type LoadingItemProps = {
    columns?: number;
}

export type PanelViewProps = PropsWithChildren<{
    id: number;
}>;

export type LoadingSectionProps = {
    rows?: number;
    columns?: number;
    sections?: number;
}

export type PanelTabProps = {
    id: number;
    title: string;
    onClick?: (panelId: number) => void;
};

export type PanelsProps = PropsWithChildren<{
    sx?: CSSProperties;
}>;

export type HelperPaneSectionProps = PropsWithChildren<{
    title: string;
    columns?: number;
    loading?: boolean;
    titleSx?: CSSProperties;
} & CollapsibleConditionalProps>;

type SearchBoxConditionalProps = {
    searchValue: string;
    onSearch: (searchTerm: string) => void;
} | {
    searchValue?: never;
    onSearch?: never;
}

export type HelperPaneBodyProps = PropsWithChildren<{
    loading?: boolean;
} & StyleBase>;

export type HelperPaneHeaderProps = SearchBoxConditionalProps & {
    title?: string;
    titleSx?: CSSProperties;
    onBack?: () => void;
    onClose?: () => void;
};

export type HelperPaneProps = PropsWithChildren<{
    helperPaneHeight: HelperPaneHeight;
    sx?: CSSProperties;
}>;
