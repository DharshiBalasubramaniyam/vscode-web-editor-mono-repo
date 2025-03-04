/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import React, { forwardRef, useImperativeHandle } from 'react';
import { getIsDarkThemeActive } from '../../utils';

interface MonacoEditorProps {
    value: string;
    onChange?: (value: string) => void;
    onValidate?: (markers: monaco.editor.IMarker[]) => void;
}

export interface MonacoEditorHandle {
    addFunction: (functionSignature: string, wrapCurrentValue: boolean) => void;
}

export const MonacoEditor = forwardRef<MonacoEditorHandle, MonacoEditorProps>(({ value, onChange, onValidate }, ref) => {
    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [height, setHeight] = React.useState<number>(value ? value.split('\n').length * 24 : 24); // Set initial height based on number of lines

    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editor;

        // Configure validation
        const validateContent = () => {
            const model = editor.getModel();
            if (!model) return;

            const content = model.getValue();
            const markers: any[] = [];

            // Check if content is valid text
            if (!content.trim()) {
                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: 'Expression cannot be empty',
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                });
            }

            // check if function aruments are missing
            const functionMatch = content.match(/^(\w+)\s*\((.*)\)$/);
            if (functionMatch) {
                const [_fullMatch, fnName, args] = functionMatch;
                const argList = args.split(',');
                argList.forEach((arg, index) => {
                    if (arg.trim().length === 0) {
                        const startColumn = content.indexOf('(', content.indexOf(fnName)) + 1;
                        const argStartIndex = startColumn + argList.slice(0, index).join(',').length + (index > 0 ? 1 : 0);
                        const argEndIndex = content.indexOf(',', argStartIndex) !== -1 ? content.indexOf(',', argStartIndex) : content.indexOf(')', argStartIndex);
                        markers.push({
                            severity: monaco.MarkerSeverity.Error,
                            message: 'Function argument missing',
                            startLineNumber: 1,
                            startColumn: argStartIndex + 1,
                            endLineNumber: 1,
                            endColumn: argEndIndex + 1
                        });
                    }
                });
            }

            monaco.editor.setModelMarkers(model, 'customLanguage', markers);
            onValidate?.(markers);
        };

        editor.onDidChangeModelContent(() => {
            validateContent();
            onChange?.(editor.getValue());

            // Update height
            const contentHeight = editor.getContentHeight();
            setHeight(contentHeight);
        });

        // Enable undo/redo
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
            editor.trigger('keyboard', 'undo', null);
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {
            editor.trigger('keyboard', 'redo', null);
        });

        // Add syntax highlighting
        monaco.languages.register({ id: 'customLanguage' });
        monaco.languages.setMonarchTokensProvider('customLanguage', {
            tokenizer: {
                root: [
                    [/\b(payload)\b/, 'keyword'],
                    [/\bvars\.\w+\b/, 'variable.vars'],
                    [/\bheaders\.\w+\b/, 'variable.headers'],
                    [/\bparams\.\w+\b/, 'variable.params'],
                    [/\bproperties\.\w+\b/, 'variable.properties'],
                    [/\bconfigs\.\w+\b/, 'variable.configs'],
                    [/\b\d+\b/, 'number'],
                    [/".*?"/, 'string'],
                    [/[{}()\[\]]/, '@brackets'],
                    [/[;,.]/, 'delimiter'],
                    [/\b\w+(?=\s*\()/, 'function.name'],
                ]
            }
        });
        monaco.editor.defineTheme('customTheme', {
            base: getIsDarkThemeActive() ? 'vs-dark' : 'vs',
            inherit: true,
            rules: [
                { token: 'variable.vars', foreground: '569CD6' },
                { token: 'variable.headers', foreground: '4EC9B0' },
                { token: 'variable.params', foreground: '9CDCFE' },
                { token: 'variable.properties', foreground: 'C586C0' },
                { token: 'variable.configs', foreground: '4FC1FF' },
                { token: 'function.name', foreground: 'DCDCAA', fontStyle: 'bold' },
                { token: 'keyword', foreground: 'CF222E', fontStyle: 'bold' },
                { token: 'string', foreground: '098658' },
                { token: 'number', foreground: '098658' }
            ],
            colors: {}
        });
        monaco.editor.setTheme('customTheme');

        editor.setModel(monaco.editor.createModel(value, 'customLanguage'));

        // TODO: Add completions with the help of LS
        // Configure completions
        // const displosable = monaco.languages.registerCompletionItemProvider('customLanguage', {
        //     provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {
        //         const wordUntilPosition = model.getWordUntilPosition(position);
        //         const range = {
        //             startLineNumber: position.lineNumber,
        //             endLineNumber: position.lineNumber,
        //             startColumn: wordUntilPosition.startColumn,
        //             endColumn: wordUntilPosition.endColumn
        //         };

        //         const suggestions = [
        //             {
        //                 label: 'concat',
        //                 kind: monaco.languages.CompletionItemKind.Function,
        //                 insertText: 'concat(${1:string1}, ${2:string2})',
        //                 insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        //                 documentation: 'Concatenates two strings',
        //                 range: range
        //             },
        //             {
        //                 label: 'length',
        //                 kind: monaco.languages.CompletionItemKind.Function,
        //                 insertText: 'length(${1:string})',
        //                 insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        //                 documentation: 'Returns the length of a string',
        //                 range: range
        //             },
        //             {
        //                 label: 'substring',
        //                 kind: monaco.languages.CompletionItemKind.Function,
        //                 insertText: 'substring(${1:string}, ${2:start}, ${3:end})',
        //                 insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        //                 documentation: 'Extracts a substring between start and end positions',
        //                 range: range
        //             }
        //         ];

        //         return { suggestions };
        //     },
        //     triggerCharacters: ['.', '(']
        // });

        // editor.onDidDispose(() => {
        //     displosable.dispose();
        // });
    };

    useImperativeHandle(ref, () => ({
        addFunction: (functionSignature: string) => {
            const editor = editorRef.current;
            if (!editor) return;

            const model = editor.getModel();
            if (!model) return;

            const currentValue = model.getValue();
            const currentSelectionRange = editor.getSelection();
            const currentSelection = model.getValueInRange(currentSelectionRange);
            const isSelected = currentSelection.length > 0;
            const args = functionSignature.match(/\$\d+/g);
            const wrapCurrentValue = args?.length > 0;
            editor.pushUndoStop();

            if (wrapCurrentValue) {
                // Replace $1 with current value and remove other placeholders
                let wrappedContent = functionSignature.replace('$1', isSelected ? currentSelection : currentValue);
                const range = isSelected ? currentSelectionRange : model.getFullModelRange();

                // Find positions of remaining placeholders
                const placeholders = [...wrappedContent.matchAll(/\$(\d+)/g)];
                if (placeholders.length > 0) {
                    // Get position of first placeholder
                    const firstPlaceholder = placeholders[0];
                    const position = firstPlaceholder.index || 0;

                    // Remove all placeholders
                    wrappedContent = wrappedContent.replace(/\$\d+/g, '');

                    // Use pushEditOperations to update content
                    model.pushEditOperations(
                        [],
                        [{
                            range,
                            text: wrappedContent
                        }],
                        () => null
                    );

                    // Set cursor to first placeholder position
                    editor.setPosition({
                        lineNumber: 1,
                        column: position + 1
                    });
                } else {
                    // No placeholders, set cursor to end
                    model.pushEditOperations(
                        [],
                        [{
                            range,
                            text: wrappedContent
                        }],
                        () => null
                    );

                    editor.setPosition({
                        lineNumber: 1,
                        column: wrappedContent.length + 1
                    });
                }
            } else {
                // No placeholders, set cursor to end
                const currentText = isSelected ? currentSelection : currentValue;
                const text = currentText.endsWith('.') ? `${currentText}${functionSignature}` : `${currentText}.${functionSignature}`;
                model.pushEditOperations(
                    [],
                    [{
                        range: isSelected ? currentSelectionRange : model.getFullModelRange(),
                        text
                    }],
                    () => null
                );

                editor.setPosition({
                    lineNumber: 1,
                    column: text.length + 1
                });
            }
            editor.pushUndoStop();
            editor.focus();
        },

        addVariable: (variable: string) => {
            const editor = editorRef.current;
            if (!editor) return;

            const model = editor.getModel();
            if (!model) return;

            const currentSelectionRange = editor.getSelection();
            editor.pushUndoStop();

            model.pushEditOperations(
                [],
                [{
                    range: currentSelectionRange,
                    text: variable
                }],
                () => null
            );

            editor.pushUndoStop();
            editor.focus();
        }
    }));

    return (
        <Editor
            height={height + 10}
            defaultLanguage="customLanguage"
            value={value}
            theme={getIsDarkThemeActive() ? 'vs-dark' : 'vs'}
            options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                folding: false,
                lineNumbers: 'off',
                wordWrap: 'on',
                automaticLayout: true,
                scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden',
                    handleMouseWheel: false,
                    alwaysConsumeMouseWheel: false,
                    useShadows: false
                },
                overviewRulerBorder: false,
                overviewRulerLanes: 0,
                padding: { top: 10 }
            }}
            onMount={handleEditorDidMount}
        />
    );
});
