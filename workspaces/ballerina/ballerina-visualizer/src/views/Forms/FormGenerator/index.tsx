import { RefObject, useCallback, useEffect, useMemo, useRef,useState } from "react";
import {
    EVENT_TYPE,
    FlowNode,
    LineRange,
    NodePosition,
    SubPanel,
    VisualizerLocation,
    TRIGGER_CHARACTERS,
    TriggerCharacter,
    FormDiagnostics,
    TextEdit,
    Type,
    FunctionKind,
    SubPanelView,
    LinePosition
} from "@dharshi/ballerina-core";
import { FormField, FormValues, Form, ExpressionFormField, FormExpressionEditorProps, HelperPaneData, HelperPaneCompletionItem, PanelContainer } from "@dharshi/ballerina-side-panel";
import {
    convertBalCompletion,
    convertNodePropertiesToFormFields,
    convertToFnSignature,
    convertToVisibleTypes,
    enrichFormPropertiesWithValueConstraint,
    extractFunctionInsertText,
    getFormProperties,
    removeDuplicateDiagnostics,
    updateLineRange
} from "../../../utils/bi";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import IfForm from "../IfForm";
import { CompletionItem, FormExpressionEditorRef } from "@dharshi/ui-toolkit";
import { cloneDeep, debounce } from "lodash";
import {
    createNodeWithUpdatedLineRange,
    processFormData,
    removeEmptyNodes,
    updateNodeWithProperties
} from "../form-utils";
import ForkForm from "../ForkForm";
import { getHelperPane } from "../../HelperPane"
import { FormTypeEditor } from "../../TypeDiagram/typeEditor";

interface FormProps {
    fileName: string;
    node: FlowNode;
    nodeFormTemplate?: FlowNode; // used in edit forms
    connections?: FlowNode[];
    clientName?: string;
    targetLineRange: LineRange;
    isGraphql: boolean;
    projectPath?: string;
    editForm?: boolean;
    onSubmit: (node?: FlowNode, isDataMapper?: boolean) => void;
    subPanelView?: SubPanelView;
    openSubPanel?: (subPanel: SubPanel) => void;
    updatedExpressionField?: ExpressionFormField;
    resetUpdatedExpressionField?: () => void;
}

interface TypeEditorState {
    isOpen: boolean;
    fieldKey?: string; // Optional, to store the key of the field being edited
}

export function FormGenerator(props: FormProps) {
    const {
        fileName,
        node,
        nodeFormTemplate,
        connections,
        clientName,
        targetLineRange,
        projectPath,
        editForm,
        isGraphql,
        onSubmit,
        openSubPanel,
        subPanelView,
        updatedExpressionField,
        resetUpdatedExpressionField
    } = props;

    const { rpcClient } = useRpcContext();

    const [fields, setFields] = useState<FormField[]>([]);
    const [typeEditorState, setTypeEditorState] = useState<TypeEditorState>({ isOpen: false });
    const [visualizableFields, setVisualizableFields] = useState<string[]>([]);

    /* Expression editor related state and ref variables */
    const [completions, setCompletions] = useState<CompletionItem[]>([]);
    const [filteredCompletions, setFilteredCompletions] = useState<CompletionItem[]>([]);
    const [types, setTypes] = useState<CompletionItem[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<CompletionItem[]>([]);
    const triggerCompletionOnNextRequest = useRef<boolean>(false);
    const expressionOffsetRef = useRef<number>(0); // To track the expression offset on adding import statements

    useEffect(() => {
        if (!node) {
            return;
        }
        if (node.codedata.node === "IF") {
            return;
        }
        initForm();
        handleFormOpen();

        return () => {
            handleFormClose();
        };
    }, [node]);

    const handleFormOpen = () => {
        rpcClient
            .getBIDiagramRpcClient()
            .formDidOpen({ filePath: fileName })
            .then(() => {
                console.log('>>> Form opened');
            });
    };

    const handleFormClose = () => {
        rpcClient
            .getBIDiagramRpcClient()
            .formDidClose({ filePath: fileName })
            .then(() => {
                console.log('>>> Form closed');
            });
    };

    const initForm = () => {
        const formProperties = getFormProperties(node);
        let enrichedNodeProperties;
        if (nodeFormTemplate) {
            const formTemplateProperties = getFormProperties(nodeFormTemplate);
            enrichedNodeProperties = enrichFormPropertiesWithValueConstraint(formProperties, formTemplateProperties);
            console.log(">>> Form properties", { formProperties, formTemplateProperties, enrichedNodeProperties });
        }
        if (Object.keys(formProperties).length === 0) {
            // update node position
            node.codedata.lineRange = {
                ...targetLineRange,
                fileName: fileName,
            };
            // add node to source code
            onSubmit();
            return;
        }

        // hide connection property if node is a REMOTE_ACTION_CALL or RESOURCE_ACTION_CALL node
        if (node.codedata.node === "REMOTE_ACTION_CALL" || node.codedata.node === "RESOURCE_ACTION_CALL") {
            if (enrichedNodeProperties) {
                enrichedNodeProperties.connection.optional = true;
            } else {
                formProperties.connection.optional = true;
            }
        }

        rpcClient
            .getInlineDataMapperRpcClient()
            .getVisualizableFields({filePath: fileName, flowNode: node, position: targetLineRange.startLine})
            .then((res) => {
                setVisualizableFields(res.visualizableProperties);
            });

        // get node properties
        setFields(convertNodePropertiesToFormFields(enrichedNodeProperties || formProperties, connections, clientName));
    };

    const handleOnSubmit = (data: FormValues) => {
        console.log(">>> on form generator submit", data);
        if (node && targetLineRange) {
            const updatedNode = mergeFormDataWithFlowNode(data, targetLineRange);
            console.log(">>> Updated node", updatedNode);

            const isDataMapperFormUpdate = data["isDataMapperFormUpdate"];
            onSubmit(updatedNode, isDataMapperFormUpdate);
        }
    };

    const mergeFormDataWithFlowNode = (
        data: FormValues,
        targetLineRange: LineRange
    ): FlowNode => {
        const clonedNode = cloneDeep(node);
        // Create updated node with new line range
        const updatedNode = createNodeWithUpdatedLineRange(clonedNode, targetLineRange);

        // assign to a existing variable
        const processedData = processFormData(data);

        // Update node properties
        const nodeWithUpdatedProps = updateNodeWithProperties(clonedNode, updatedNode, processedData);

        // check all nodes and remove empty nodes
        return removeEmptyNodes(nodeWithUpdatedProps);
    };

    const handleOpenView = async (filePath: string, position: NodePosition) => {
        console.log(">>> open view: ", { filePath, position });
        const context: VisualizerLocation = {
            documentUri: filePath,
            position: position,
        };
        await rpcClient.getVisualizerRpcClient().openView({ type: EVENT_TYPE.OPEN_VIEW, location: context });
    };

    const handleOpenTypeEditor = (isOpen: boolean, f: FormValues, editingField?: FormField) => {
        const updatedFields = fields.map((field) => {
            const updatedField = { ...field };
            if (f[field.key]) {
                updatedField.value = f[field.key];
            }
            return updatedField;
        });
        setFields(updatedFields);
        setTypeEditorState({ isOpen, fieldKey: editingField?.key });
    };

    const onTypeChange = async (type: Type) => {
        const updatedFields = fields.map((field) => {
            if (field.key === typeEditorState.fieldKey) {
                return { ...field, value: type.name };
            }
            return field;
        });
        setFields(updatedFields);
        setTypeEditorState({ isOpen: false });
    };

    const onTypeEditorClosed = () => {
        setTypeEditorState({ isOpen: false });
    };

    /* Expression editor related functions */
    const handleExpressionEditorCancel = () => {
        setFilteredCompletions([]);
        setCompletions([]);
        setFilteredTypes([]);
        setTypes([]);
        triggerCompletionOnNextRequest.current = false;
    };

    const debouncedRetrieveCompletions = useCallback(debounce(
        async (value: string, key: string, offset: number, triggerCharacter?: string, onlyVariables?: boolean) => {
            let expressionCompletions: CompletionItem[] = [];
            const effectiveText = value.slice(0, offset);
            const completionFetchText = effectiveText.match(/[a-zA-Z0-9_']+$/)?.[0] ?? "";
            const endOfStatementRegex = /[\)\]]\s*$/;
            if (offset > 0 && endOfStatementRegex.test(effectiveText)) {
                // Case 1: When a character unrelated to triggering completions is entered
                setCompletions([]);
            } else if (
                completions.length > 0 &&
                completionFetchText.length > 0 &&
                !triggerCharacter &&
                !onlyVariables &&
                !triggerCompletionOnNextRequest.current
            ) {
                // Case 2: When completions have already been retrieved and only need to be filtered
                expressionCompletions = completions
                    .filter((completion) => {
                        const lowerCaseText = completionFetchText.toLowerCase();
                        const lowerCaseLabel = completion.label.toLowerCase();

                        return lowerCaseLabel.includes(lowerCaseText);
                    })
                    .sort((a, b) => a.sortText.localeCompare(b.sortText));
            } else {
                // Case 3: When completions need to be retrieved from the language server
                // Retrieve completions from the ls
                let completions = await rpcClient.getBIDiagramRpcClient().getExpressionCompletions({
                    filePath: fileName,
                    context: {
                        expression: value,
                        startLine: updateLineRange(targetLineRange, expressionOffsetRef.current).startLine,
                        offset: offset,
                        node: node,
                        property: key
                    },
                    completionContext: {
                        triggerKind: triggerCharacter ? 2 : 1,
                        triggerCharacter: triggerCharacter as TriggerCharacter
                    }
                });

                if (onlyVariables) {
                    // If only variables are requested, filter out the completions based on the kind
                    // 'kind' for variables = 6
                    completions = completions?.filter((completion) => completion.kind === 6);
                    triggerCompletionOnNextRequest.current = true;
                } else {
                    triggerCompletionOnNextRequest.current = false;
                }

                // Convert completions to the ExpressionBar format
                let convertedCompletions: CompletionItem[] = [];
                completions?.forEach((completion) => {
                    if (completion.detail) {
                        // HACK: Currently, completion with additional edits apart from imports are not supported
                        // Completions that modify the expression itself (ex: member access)
                        convertedCompletions.push(convertBalCompletion(completion));
                    }
                });
                setCompletions(convertedCompletions);

                if (triggerCharacter) {
                    expressionCompletions = convertedCompletions;
                } else {
                    expressionCompletions = convertedCompletions
                        .filter((completion) => {
                            const lowerCaseText = completionFetchText.toLowerCase();
                            const lowerCaseLabel = completion.label.toLowerCase();

                            return lowerCaseLabel.includes(lowerCaseText);
                        })
                        .sort((a, b) => a.sortText.localeCompare(b.sortText));
                }
            }

            setFilteredCompletions(expressionCompletions);
        },
        250
    ), [rpcClient, completions, fileName, targetLineRange, node, triggerCompletionOnNextRequest.current]);

    const handleRetrieveCompletions = useCallback(async (
        value: string,
        key: string,
        offset: number,
        triggerCharacter?: string,
        onlyVariables?: boolean
    ) => {
        await debouncedRetrieveCompletions(value, key, offset, triggerCharacter, onlyVariables);

        if (triggerCharacter) {
            await debouncedRetrieveCompletions.flush();
        }
    }, [debouncedRetrieveCompletions]);

    const debouncedGetVisibleTypes = useCallback(debounce(async (value: string, cursorPosition: number) => {
        let visibleTypes: CompletionItem[] = types;
        if (!types.length) {
            const types = await rpcClient.getBIDiagramRpcClient().getVisibleTypes({
                filePath: fileName,
                position: updateLineRange(targetLineRange, expressionOffsetRef.current).startLine,
            });

            visibleTypes = convertToVisibleTypes(types);
            setTypes(visibleTypes);
        }

        const effectiveText = value.slice(0, cursorPosition);
        let filteredTypes = visibleTypes.filter((type) => {
            const lowerCaseText = effectiveText.toLowerCase();
            const lowerCaseLabel = type.label.toLowerCase();

            return lowerCaseLabel.includes(lowerCaseText);
        });

        setFilteredTypes(filteredTypes);
    }, 250), [rpcClient, types, fileName, targetLineRange]);

    const handleGetVisibleTypes = useCallback(async (value: string, cursorPosition: number) => {
        await debouncedGetVisibleTypes(value, cursorPosition);
    }, [debouncedGetVisibleTypes]);

    const extractArgsFromFunction = async (value: string, key: string, cursorPosition: number) => {
        const signatureHelp = await rpcClient.getBIDiagramRpcClient().getSignatureHelp({
            filePath: fileName,
            context: {
                expression: value,
                startLine: updateLineRange(targetLineRange, expressionOffsetRef.current).startLine,
                offset: cursorPosition,
                node: node,
                property: key
            },
            signatureHelpContext: {
                isRetrigger: false,
                triggerKind: 1
            }
        });

        return convertToFnSignature(signatureHelp);
    };

    const handleExpressionFormDiagnostics = useCallback(debounce(async (
        showDiagnostics: boolean,
        expression: string,
        key: string,
        setDiagnosticsInfo: (diagnostics: FormDiagnostics) => void,
        shouldUpdateNode?: boolean,
        variableType?: string
    ) => {
        if (!showDiagnostics) {
            setDiagnosticsInfo({ key, diagnostics: [] });
            return;
        }

        // HACK: For variable nodes, update the type value in the node
        if (shouldUpdateNode) {
            node.properties["type"].value = variableType;
        }

        const response = await rpcClient.getBIDiagramRpcClient().getExpressionDiagnostics({
            filePath: fileName,
            context: {
                expression: expression,
                startLine: updateLineRange(targetLineRange, expressionOffsetRef.current).startLine,
                offset: 0,
                node: node,
                property: key
            },
        });

        const uniqueDiagnostics = removeDuplicateDiagnostics(response.diagnostics);
        setDiagnosticsInfo({ key, diagnostics: uniqueDiagnostics });
    }, 250), [rpcClient, fileName, targetLineRange, node]);

    const handleCompletionItemSelect = async (value: string, additionalTextEdits?: TextEdit[]) => {
        if (additionalTextEdits?.[0]?.newText) {
            const response = await rpcClient.getBIDiagramRpcClient().updateImports({
                filePath: fileName,
                importStatement: additionalTextEdits[0].newText
            });
            expressionOffsetRef.current += response.importStatementOffset;
        }
        debouncedRetrieveCompletions.cancel();
        debouncedGetVisibleTypes.cancel();
        handleExpressionEditorCancel();
    };

    const handleFunctionItemSelect = async (item: HelperPaneCompletionItem) => {
        const response = await rpcClient.getBIDiagramRpcClient().addFunction({
            filePath: fileName,
            codedata: item.codedata,
            kind: item.kind as FunctionKind,
            searchKind: "FUNCTION"
        })

        if (response.template) {
            return extractFunctionInsertText(response.template);
        }

        return "";
    }

    const handleExpressionEditorBlur = () => {
        handleExpressionEditorCancel();
    };

    const handleGetHelperPane = (
        exprRef: RefObject<FormExpressionEditorRef>,
        defaultValue: string,
        value: string,
        onChange: (value: string, updatedCursorPosition: number) => void,
        changeHelperPaneState: (isOpen: boolean) => void
    ) => {
        return getHelperPane({
            fileName: fileName,
            targetLineRange: updateLineRange(targetLineRange, expressionOffsetRef.current),
            exprRef: exprRef,
            onClose: () => changeHelperPaneState(false),
            defaultValue: defaultValue,
            currentValue: value,
            onChange: onChange
        });
    }

    const expressionEditor = useMemo(() => {
        return {
            completions: filteredCompletions,
            triggerCharacters: TRIGGER_CHARACTERS,
            retrieveCompletions: handleRetrieveCompletions,
            extractArgsFromFunction: extractArgsFromFunction,
            types: filteredTypes,
            retrieveVisibleTypes: handleGetVisibleTypes,
            getHelperPane: handleGetHelperPane,
            getExpressionFormDiagnostics: handleExpressionFormDiagnostics,
            onCompletionItemSelect: handleCompletionItemSelect,
            onBlur: handleExpressionEditorBlur,
            onCancel: handleExpressionEditorCancel,
            helperPaneOrigin: "left"
        } as FormExpressionEditorProps;
    }, [
        filteredCompletions,
        filteredTypes,
        handleRetrieveCompletions,
        handleGetVisibleTypes,
        handleFunctionItemSelect,
        handleExpressionFormDiagnostics
    ]);

    const fetchVisualizableFields = async (filePath: string, flowNode: FlowNode, position: LinePosition) => {
        const res = await rpcClient.getInlineDataMapperRpcClient().getVisualizableFields({filePath, flowNode, position});
        setVisualizableFields(res.visualizableProperties);
    }

    // handle if node form
    if (node?.codedata.node === "IF") {
        return (
            <IfForm
                fileName={fileName}
                node={node}
                targetLineRange={targetLineRange}
                expressionEditor={expressionEditor}
                onSubmit={onSubmit}
                openSubPanel={openSubPanel}
                updatedExpressionField={updatedExpressionField}
                subPanelView={subPanelView}
                resetUpdatedExpressionField={resetUpdatedExpressionField}
            />
        );
    }

    // handle fork node form
    if (node?.codedata.node === "FORK") {
        return (
            <ForkForm
                fileName={fileName}
                node={node}
                targetLineRange={targetLineRange}
                expressionEditor={expressionEditor}
                onSubmit={onSubmit}
                openSubPanel={openSubPanel}
                updatedExpressionField={updatedExpressionField}
                resetUpdatedExpressionField={resetUpdatedExpressionField}
                subPanelView={subPanelView}
            />
        );
    }

    // default form
    return (
        <>
            {fields && fields.length > 0 && (
                <Form
                    formFields={fields}
                    projectPath={projectPath}
                    selectedNode={node.codedata.node}
                    openRecordEditor={handleOpenTypeEditor}
                    onSubmit={handleOnSubmit}
                    openView={handleOpenView}
                    openSubPanel={openSubPanel}
                    subPanelView={subPanelView}
                    expressionEditor={expressionEditor}
                    targetLineRange={targetLineRange}
                    fileName={fileName}
                    updatedExpressionField={updatedExpressionField}
                    resetUpdatedExpressionField={resetUpdatedExpressionField}
                    mergeFormDataWithFlowNode={mergeFormDataWithFlowNode}
                    handleVisualizableFields={fetchVisualizableFields}
                    visualizableFields={visualizableFields}
                />
            )}
            {typeEditorState.isOpen && (
                <PanelContainer title={"New Type"} show={true} onClose={onTypeEditorClosed}>
                    <FormTypeEditor 
                        filePath={fileName}
                        newType={true} 
                        isGraphql={isGraphql} 
                        onTypeChange={onTypeChange} 
                    />
                </PanelContainer>
            )}
        </>
    );
}

export default FormGenerator;
