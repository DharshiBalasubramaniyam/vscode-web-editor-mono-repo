
// tslint:disable: jsx-no-multiline-js
import React, { useContext, useRef, useState } from "react";

import { DeleteButton, EditButton, ExpandButton } from "@dharshi/ballerina-core";
import { STNode } from "@dharshi/syntax-tree";
import classNames from "classnames";

// import { UnsupportedConfirmButtons } from "../../FormComponents/DialogBoxes/UnsupportedConfirmButtons";
import { ComponentExpandButton } from "../Components/ComponentExpandButton";
import { Context } from "../Context/diagram";

import "./style.scss";

export interface HeaderActionsProps {
    model: STNode;
    isExpanded: boolean;
    deleteText: string;
    formType?: string;
    showOnRight?: boolean;
    onExpandClick: () => void;
    onConfirmDelete: () => void;
    onConfirmEdit?: () => void;
    unsupportedType?: boolean;
}

export function HeaderActions(props: HeaderActionsProps) {
    const {
        model,
        isExpanded,
        deleteText,
        showOnRight,
        onExpandClick,
        formType,
        onConfirmDelete,
        onConfirmEdit,
        unsupportedType
    } = props;

    const diagramContext = useContext(Context);
    const { isReadOnly } = diagramContext.props;
    const {state, actions: { updateState }} = diagramContext;

    const gotoSource = diagramContext?.api?.code?.gotoSource;
    const renderEditForm = diagramContext?.api?.edit?.renderEditForm;
    const renderDialogBox = diagramContext?.api?.edit?.renderDialogBox;

    const deleteBtnRef = useRef(null);
    const [isDeleteViewVisible, setIsDeleteViewVisible] = useState(false);
    const handleDeleteBtnClick = () => onConfirmDelete();
    // const handleCancelDeleteBtn = () => setIsDeleteViewVisible(false);

    const [isEditViewVisible, setIsEditViewVisible] = useState(false);
    const [isUnSupported, setIsUnSupported] = useState(false);
    const handleEditBtnClick = () => {
        if (unsupportedType) {
            if (renderDialogBox) {
                renderDialogBox("Unsupported", unsupportedEditConfirm, unSupportedEditCancel);
            }
        } else {
            if (renderEditForm) {
                renderEditForm(model, model?.position, { formType: (formType ? formType : model.kind), isLoading: false }, handleEditBtnCancel, handleEditBtnCancel);
            }
        }
    }

    const handleEditBtnCancel = () => setIsEditViewVisible(false);
    const handleEnumEditBtnConfirm = () => {
        // setIsEditViewVisible(false);
        // onConfirmEdit();
    }

    const unsupportedEditConfirm = () => {
        if (model && gotoSource) {
            const targetposition = model.position;
            setIsUnSupported(false);
            gotoSource({ startLine: targetposition.startLine, startColumn: targetposition.startColumn });
        }
    }

    const unSupportedEditCancel = () => setIsUnSupported(false);

    const onUpdateFunctionExpand = () => {
        state.isDiagramFunctionExpanded = !state.isDiagramFunctionExpanded;
        updateState(state);
    };

    React.useEffect(() => {
        setIsDeleteViewVisible(false);
    }, [model]);

    return (
        <div className={"header-amendment-options"}>
            {!isReadOnly && (
                <>
                    <div className={classNames("amendment-option", "show-on-hover")}>
                        <EditButton onClick={handleEditBtnClick} />
                    </div>
                    <div className={classNames("amendment-option", "show-on-hover")}>
                        <div ref={deleteBtnRef}>
                            <DeleteButton onClick={handleDeleteBtnClick} />
                        </div>
                    </div>
                    <div className={classNames("amendment-option", "show-on-hover")}>
                        <ExpandButton
                            isExpanded={state.isDiagramFunctionExpanded}
                            onClick={onUpdateFunctionExpand}
                        />
                    </div>
                </>
            )}
            <div className={classNames("amendment-option", "show-on-hover")}>
                <ComponentExpandButton
                    isExpanded={isExpanded}
                    onClick={onExpandClick}
                />
            </div>

            {/* {isDeleteViewVisible && (
                <DeleteConfirmDialog
                    onCancel={handleCancelDeleteBtn}
                    onConfirm={onConfirmDelete}
                    position={
                        deleteBtnRef.current
                            ? {
                                x: showOnRight ? deleteBtnRef.current.offsetLeft + 272: deleteBtnRef.current.offsetLeft - 272,
                                y: deleteBtnRef.current.offsetTop,
                            }
                            : { x: 0, y: 0 }
                    }
                    message={deleteText}
                    isFunctionMember={false}
                />
            )} */}
            {/* {!isReadOnly && isEditViewVisible && (
                <FormGenerator
                    model={model}
                    configOverlayFormStatus={{ formType: (formType ? formType : model.kind), isLoading: false }}
                    onCancel={handleEditBtnCancel}
                    onSave={handleEditBtnCancel}
                />
            )}*/}
            {/* {isUnSupported && <UnsupportedConfirmButtons onConfirm={unsupportedEditConfirm} onCancel={unSupportedEditCancel} />} */}
        </div>
    );
}
