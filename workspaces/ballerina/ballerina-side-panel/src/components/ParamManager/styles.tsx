// tslint:disable: no-explicit-any
import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";

export interface ContainerProps {
    readonly?: boolean;
}

export const EditorContainer = styled.div<CSSObject>`
    display: flex;
    margin: 10px 0;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid var(--vscode-dropdown-border);
`;

export const ActionWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const EditIconWrapper = styled.div`
    cursor: pointer;
    height: 14px;
    width: 14px;
    margin-top: 16px;
    margin-bottom: 13px;
    margin-left: 10px;
    color: var(--vscode-statusBarItem-remoteBackground);
`;

export const DeleteIconWrapper = styled.div`
    cursor: pointer;
    height: 14px;
    width: 14px;
    margin-top: 16px;
    margin-bottom: 13px;
    margin-left: 10px;
    color: var(--vscode-notificationsErrorIcon-foreground);
`;

export const IconWrapper = styled.div`
    cursor: pointer;
    height: 14px;
    width: 14px;
    margin-top: 16px;
    margin-bottom: 13px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const ContentWrapper = styled.div<ContainerProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: ${(props: ContainerProps) => `${props.readonly ? "100%" : "calc(100% - 60px)"}`};
    cursor: ${(props: ContainerProps) => `${props.readonly ? "default" : "pointer"}`};
    height: 100%;
    color: var(--vscode-editor-foreground);
    &:hover, &.active {
        ${(props: ContainerProps) => `${props.readonly ? "" : "background: var(--vscode-welcomePage-tileHoverBackground)"}`};
    };
`;

export const KeyTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 150px;
    background-color: var(--vscode-inputValidation-infoBackground);
    height: 100%;
`;

export const Key= styled.div`
    cursor: pointer;
    margin-left: 10px;
`;


export const IconTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 150px;
    background-color: var(--vscode-inputValidation-infoBackground);
    height: 100%;
`;

export const ValueTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 0 10px;
    height: 100%;
`;

export const OptionLabel = styled.div`
    font-size: 12px;
    line-height: 14px;
    margin-left: 5px;
`;

export const HeaderLabel = styled.div`
    display: flex;
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-dropdown-border);
    margin-top: 8px;
    display: flex;
    width: 100%;
    height: 32px;
    align-items: center;
`;

export const ActionIconWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 14px;
    width: 14px;
`;
