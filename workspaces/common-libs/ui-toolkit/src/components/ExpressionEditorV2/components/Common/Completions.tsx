/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from '@emotion/styled';
import { VSCodeTag } from '@vscode/webview-ui-toolkit/react';
import {
    CompletionDropdownItemProps,
    CompletionDropdownProps,
    DefaultCompletionDropdownItemProps,
    StyleBase
} from './types';
import { getIcon } from '../../utils';
import { Codicon } from '../../../Codicon/Codicon';
import Typography from '../../../Typography/Typography';

/* Styled components */
const StyledTag = styled(VSCodeTag)`
    ::part(control) {
        text-transform: none;
        font-size: 10px;
        height: 16px;
    }
`;

const DropdownBody = styled.div<StyleBase>`
    width: 350px;
    padding-top: 8px;
    border-radius: 2px;
    background-color: var(--vscode-dropdown-background);
    ${(props: StyleBase) => props.sx}
`;

const DropdownItemBody = styled.div`
    max-height: 249px;
    overflow-y: scroll;
`;

const DropdownItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    font-family: monospace;
    cursor: pointer;

    & > #description {
        display: none;
    }

    &.hovered > #description {
        display: block;
        color: var(--vscode-list-deemphasizedForeground);
    }
    &.hovered {
        background-color: var(--vscode-list-activeSelectionBackground);
        color: var(--vscode-list-activeSelectionForeground);
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Divider = styled.div`
    height: 1px;
    background-color: var(--vscode-editorWidget-border);
`;

const DropdownFooter = styled.div`
    display: flex;
    padding: 8px 4px;
    gap: 4px;
`;

const DropdownFooterSection = styled.div`
    display: flex;
    align-items: center;
`;

const DropdownFooterText = styled.p`
    margin: 0;
    font-size: 12px;
`;

const DropdownFooterKey = styled.p`
    margin: 0;
    font-size: 10px;
    font-weight: 800;
`;

const KeyContainer = styled.div`
    padding: 2px;
    margin-inline: 4px;
    border-radius: 2px;
    border: 1px solid var(--vscode-editorWidget-border);
`;

const DefaultCompletionItem = (props: DefaultCompletionDropdownItemProps) => {
    const { getDefaultCompletion, onClick } = props;
    const itemRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        const parentEl = itemRef.current.parentElement;
        const hoveredEl = parentEl.querySelector('.hovered');
        if (hoveredEl) {
            hoveredEl.classList.remove('hovered');
        }
        itemRef.current.classList.add('hovered');
    }

    const handleClick = () => {
        onClick();
    }

    return (
        <DropdownItemContainer
            ref={itemRef}
            className="hovered"
            id="default-completion"
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
        >
            {getDefaultCompletion()}
        </DropdownItemContainer>
    );
}

const DropdownItem = (props: CompletionDropdownItemProps) => {
    const { item, isSelected, onClick } = props;
    const itemRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        const superParentEl = itemRef.current.parentElement.parentElement;
        const hoveredEl = superParentEl.querySelector('.hovered');
        if (hoveredEl) {
            hoveredEl.classList.remove('hovered');
        }
        itemRef.current.classList.add('hovered');
    };

    return (
        <DropdownItemContainer
            ref={itemRef}
            {...(isSelected && { className: 'hovered' })}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
        >
            <TitleContainer>
                {getIcon(item.kind)}
                {item.tag && <StyledTag>{item.tag}</StyledTag>}
                <Typography variant="body3" sx={{ fontWeight: 600 }}>
                    {item.label}
                </Typography>
            </TitleContainer>
            {item.description && (
                <Typography id="description" variant="caption">
                    {item.description}
                </Typography>)
            }
        </DropdownItemContainer>
    );
};

export const Dropdown = forwardRef<HTMLDivElement, CompletionDropdownProps>((props, ref) => {
    const { items, showDefaultCompletion, autoSelectFirstItem, getDefaultCompletion, onCompletionSelect, onDefaultCompletionSelect, isSavable, sx } = props;
    const listBoxRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => listBoxRef.current);

    return (
        <DropdownBody sx={sx}>
            {showDefaultCompletion && (
                <DefaultCompletionItem
                    getDefaultCompletion={getDefaultCompletion}
                    onClick={async () => await onDefaultCompletionSelect()}
                />
            )}
            <DropdownItemBody ref={listBoxRef}>
                {items.map((item, index) => {
                    return (
                        <DropdownItem
                            key={`dropdown-item-${index}`}
                            {...(autoSelectFirstItem && { isSelected: index === 0 })}
                            item={item}
                            onClick={async () => await onCompletionSelect(item)}
                        />
                    );
                })}
            </DropdownItemBody>
            <Divider />
            <DropdownFooter>
                <DropdownFooterSection>
                    <KeyContainer>
                        <Codicon
                            name="arrow-small-up"
                            sx={{ display: 'flex', height: '12px', width: '12px' }}
                            iconSx={{
                                fontSize: '12px',
                                fontWeight: '600',
                            }}
                        />
                    </KeyContainer>
                    <DropdownFooterText>,</DropdownFooterText>
                    <KeyContainer>
                        <Codicon
                            name="arrow-small-down"
                            sx={{ display: 'flex', height: '12px', width: '12px' }}
                            iconSx={{
                                fontSize: '12px',
                                fontWeight: '600',
                            }}
                        />
                    </KeyContainer>
                    <DropdownFooterText>to navigate.</DropdownFooterText>
                </DropdownFooterSection>
                <DropdownFooterSection>
                    <KeyContainer>
                        <DropdownFooterKey>ENTER</DropdownFooterKey>
                    </KeyContainer>
                    <DropdownFooterText>{isSavable ? 'to select/save.' : 'to select.'}</DropdownFooterText>
                </DropdownFooterSection>
                <DropdownFooterSection>
                    <KeyContainer>
                        <DropdownFooterKey>ESC</DropdownFooterKey>
                    </KeyContainer>
                    <DropdownFooterText>to cancel.</DropdownFooterText>
                </DropdownFooterSection>
            </DropdownFooter>
        </DropdownBody>
    );
});
Dropdown.displayName = 'Dropdown';
