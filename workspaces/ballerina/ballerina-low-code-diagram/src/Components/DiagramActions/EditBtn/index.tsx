// tslint:disable: jsx-no-multiline-js jsx-wrap-multiline
import React, { useContext } from "react";

import { NodePosition, STNode } from "@dharshi/syntax-tree";

import { Context } from "../../../Context/diagram";

import { EditSVG } from "./EditSVG";
import "./style.scss";

export interface EditBtnProps {
    cx: number;
    cy: number;
    model: STNode;
    onHandleEdit?: () => void;
    className?: string;
    height?: number;
    width?: number;
    // dispatchEditComponentStart: (targetPosition: any) => void;
    isButtonDisabled?: boolean;
}

export function EditBtn(props: EditBtnProps) {
    const {
        props: { isReadOnly },
        actions: { editorComponentStart: dispatchEditComponentStart },
        state: { targetPosition }
    } = useContext(Context);
    const { cx, cy, onHandleEdit, model, isButtonDisabled } = props;
    const onEditClick = () => {
        if (!isButtonDisabled) {
            const targetPos = targetPosition as NodePosition;
            if (model &&
                (targetPos?.startLine !== model.position.startLine
                    || targetPos?.startColumn !== model.position.startColumn)) {
                dispatchEditComponentStart({
                    ...model.position,
                    endLine: 0,
                    endColumn: 0,
                })
            }
            onHandleEdit();
        }
    };

    if (isReadOnly) return null;

    return (
        <g onClick={onEditClick} className="edit-icon-wrapper" data-testid="editBtn">
            <g>
                <EditSVG x={cx} y={cy} />
            </g>
        </g>
    )

}
