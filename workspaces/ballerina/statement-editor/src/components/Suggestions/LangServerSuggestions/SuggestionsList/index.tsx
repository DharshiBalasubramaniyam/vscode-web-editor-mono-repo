// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React from "react";

import { Grid, GridItem } from "@dharshi/ui-toolkit";

import { MAX_COLUMN_WIDTH, SUGGESTION_COLUMN_SIZE } from "../../../../constants";
import { Suggestion, SuggestionItem } from "../../../../models/definitions";
import { useStmtEditorHelperPanelStyles } from "../../../styles";
import { SuggestionListItem } from "../SuggestionListItem";

export interface SuggestionsListProps {
    lsSuggestions: SuggestionItem[];
    selectedSuggestion: Suggestion;
    currentGroup: number;
    onClickLSSuggestion: (suggestion: SuggestionItem) => void;
    selection?: string;
    header?: string;
    isReference?: boolean
}

export function SuggestionsList(props: SuggestionsListProps) {
    const {
        lsSuggestions,
        selectedSuggestion,
        onClickLSSuggestion,
        selection,
        currentGroup,
        header,
        isReference = false
    } = props;
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();

    return (
        <>
            {(header) && (
                <div className={stmtEditorHelperClasses.groupHeaderWrapper}>
                    <div className={stmtEditorHelperClasses.groupHeader}>{header}</div>
                    <div className={stmtEditorHelperClasses.selectionSeparator} />
                </div>
            )}
            {(selection) && (
                <>
                    <div className={stmtEditorHelperClasses.selectionWrapper}>
                        <div className={stmtEditorHelperClasses.selectionSubHeader}>{selection}</div>
                        <div className={stmtEditorHelperClasses.selectionSeparator} />
                    </div>
                    <br/>
                </>
            )}
            <Grid columns={SUGGESTION_COLUMN_SIZE}>
                {
                    lsSuggestions.map((suggestion: SuggestionItem, index: number) => {
                        const isSelected = selectedSuggestion && (
                            index === selectedSuggestion.selectedListItem &&
                            currentGroup === selectedSuggestion.selectedGroup
                        )
                        return (
                            <GridItem
                                key={index}
                                id={index}
                                onClick={() => onClickLSSuggestion(suggestion)}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: MAX_COLUMN_WIDTH,
                                    color: isSelected ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--foreground)'
                                }}
                                selected={isSelected}
                            >
                                <SuggestionListItem
                                    key={index}
                                    suggestion={suggestion}
                                    isReference={isReference}
                                />
                            </GridItem>
                        )
                    })
                }
            </Grid>
            {isReference && (
                <div className={stmtEditorHelperClasses.suggestionDividerWrapper}>
                    <div className={stmtEditorHelperClasses.selectionSeparator} />
                    <br />
                </div>
            )}
        </>
    );
}
