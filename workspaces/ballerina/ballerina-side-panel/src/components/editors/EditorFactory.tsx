import React from "react";

import { NodeKind, SubPanel, SubPanelView } from "@dharshi/ballerina-core";

import { FormField } from "../Form/types";
import { MultiSelectEditor } from "./MultiSelectEditor";
import { TextEditor } from "./TextEditor";
import { TypeEditor } from "./TypeEditor";
import { ContextAwareExpressionEditor } from "./ExpressionEditor";
import { FormExpressionEditorRef } from "@dharshi/ui-toolkit";
import { ParamManagerEditor } from "../ParamManager/ParamManager";
import { DropdownEditor } from "./DropdownEditor";
import { FileSelect } from "./FileSelect";
import { CheckBoxEditor } from "./CheckBoxEditor";
import { ArrayEditor } from "./ArrayEditor";
import { MapEditor } from "./MapEditor";
import { ChoiceForm } from "./ChoiceForm";
import { FormMapEditor } from "./FormMapEditor";
import { IdentifierEditor } from "./IdentifierEditor";
import { ReadonlyField } from "./ReadonlyField";

interface FormFieldEditorProps {
    field: FormField;
    filePath?: string;
    selectedNode?: NodeKind;
    openRecordEditor?: (open: boolean) => void;
    openSubPanel?: (subPanel: SubPanel) => void;
    subPanelView?: SubPanelView;
    handleOnFieldFocus?: (key: string) => void;
    autoFocus?: boolean;
    handleOnTypeChange?: () => void;
    visualizableFields?: string[];
}

export const EditorFactory = React.forwardRef<FormExpressionEditorRef, FormFieldEditorProps>((props, ref) => {
    const {
        field,
        filePath,
        selectedNode,
        openRecordEditor,
        openSubPanel,
        subPanelView,
        handleOnFieldFocus,
        autoFocus,
        handleOnTypeChange,
        visualizableFields
    } = props;

    console.log("====editor fatcory props=====", props)

    if (field.type === "MULTIPLE_SELECT") {
        return <MultiSelectEditor field={field} label={"Add Another"} openSubPanel={openSubPanel} />;
    } else if (field.type === "CHOICE") {
        return <ChoiceForm field={field} />;
    } else if (field.type === "EXPRESSION_SET") {
        return <ArrayEditor field={field} label={"Add Another Value"} />;
    } else if (field.type === "MAPPING_EXPRESSION_SET") {
        return <MapEditor field={field} label={"Add Another Key-Value Pair"} />;
    } else if (field.type === "FLAG") {
        return <CheckBoxEditor field={field} />;
    } else if (field.type === "EXPRESSION" && field.key === "resourcePath") {
        // HACK: this should fixed with the LS API. this is used to avoid the expression editor for resource path field.
        return <TextEditor field={field} handleOnFieldFocus={handleOnFieldFocus} />;
    } else if (field.type.toUpperCase() === "ENUM") {
        // Enum is a dropdown field
        return <DropdownEditor field={field} />;
    } else if (field.type === "FILE_SELECT" && field.editable) {
        return <FileSelect field={field} />;
    } else if (field.type === "SINGLE_SELECT" && field.editable) {
        // HACK:Single select field is treat as type editor for now
        return <DropdownEditor field={field} openSubPanel={openSubPanel} />;
    } else if (!field.items && (field.key === "type" || field.type === "TYPE") && field.editable) {
        // Type field is a type editor
        return (
            <TypeEditor
                field={field}
                openRecordEditor={openRecordEditor}
                handleOnFieldFocus={handleOnFieldFocus}
                autoFocus={autoFocus}
                handleOnTypeChange={handleOnTypeChange}
            />
        );
    } else if (!field.items && field.type === "EXPRESSION" && field.editable) {
        // Expression field is a inline expression editor
        return (
            <ContextAwareExpressionEditor
                ref={ref}
                field={field}
                openSubPanel={openSubPanel}
                subPanelView={subPanelView}
                handleOnFieldFocus={handleOnFieldFocus}
                autoFocus={autoFocus}
                visualizable={visualizableFields?.includes(field.key)}
            />
        );
    } else if (field.type === "VIEW") {
        // Skip this property
        return <></>;
    } else if (field.type === "PARAM_MANAGER") {
        return <ParamManagerEditor field={field} openRecordEditor={openRecordEditor} handleOnFieldFocus={handleOnFieldFocus} selectedNode={selectedNode} filePath={filePath}/>;
    } else if (field.type === "REPEATABLE_PROPERTY") {
        return <FormMapEditor field={field} label={"Add Another Key-Value Pair"} />;
    } else if (field.type === "IDENTIFIER" && !field.editable && field?.lineRange) {
        return <IdentifierEditor field={field} filePath={filePath} handleOnFieldFocus={handleOnFieldFocus} autoFocus={autoFocus} />;
    } else if (field.type !== "IDENTIFIER" && !field.editable) {
        return <ReadonlyField field={field} />;
    } else {
        // Default to text editor
        // Readonly fields are also treated as text editor
        return <TextEditor field={field} handleOnFieldFocus={handleOnFieldFocus} autoFocus={autoFocus} />;
    }
});
