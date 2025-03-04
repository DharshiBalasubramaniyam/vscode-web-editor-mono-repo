import styled from "@emotion/styled";
import { VSCodeDataGrid, VSCodeDataGridCell, VSCodeDataGridRow } from "@vscode/webview-ui-toolkit/react";

export const HorizontalGrid = styled(VSCodeDataGrid)`
    flex-direction: row;
`;

export const LeftAllignGridRow = styled(VSCodeDataGridRow)`
    width: auto;
`;

export const TruncatedGridTitleCell = styled(VSCodeDataGridCell)`
    padding-left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.7;
    color: var(--foreground); // Override the default color to match the theme
`;

export const TruncatedGridCell = styled(VSCodeDataGridCell)`
    padding-left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--foreground); // Override the default color to match the theme
`;
