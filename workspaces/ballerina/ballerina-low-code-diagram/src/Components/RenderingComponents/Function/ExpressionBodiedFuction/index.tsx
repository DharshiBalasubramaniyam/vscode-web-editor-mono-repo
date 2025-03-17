// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react"

import {
    DeleteButton,
    EditButton,
    FunctionIcon
} from "@dharshi/ballerina-core";
import {
    FunctionDefinition,
    STKindChecker
} from "@dharshi/syntax-tree";
import classNames from "classnames";

import { Context } from "../../../../Context/diagram";

import "./style.scss";

export interface ExprBodiedFuncComponentProps {
    model: FunctionDefinition;
}

export function ExprBodiedFuncComponent(props: ExprBodiedFuncComponentProps) {
    const { model } = props;

    const diagramContext = useContext(Context);
    const { isReadOnly } = diagramContext.props;
    const deleteComponent = diagramContext?.api?.edit?.deleteComponent;
    const renderEditForm = diagramContext?.api?.edit?.renderEditForm;

    const handleDeleteConfirm = () => {
        deleteComponent(model);
    };
    const handleEditClick = () => {
        renderEditForm(model, model.position, {
            formType: 'DataMapper', isLoading: false
        }
        )
    };

    const component: JSX.Element[] = [];

    if (STKindChecker.isExpressionFunctionBody(model.functionBody)) {
        const funcName = model.functionName.value;

        component.push(
            <div className="expr-bodied-func-comp" data-record-name={funcName}>
                <div className="function-header" >
                    <div className="function-content">
                        <div className="function-icon">
                            <FunctionIcon />
                        </div>
                        <div className="function-name">
                            {funcName}
                        </div>
                    </div>
                    {!isReadOnly && (
                        <div className="amendment-options">
                            <div className={classNames("edit-btn-wrapper", "show-on-hover")}>
                                <EditButton onClick={handleEditClick} />
                            </div>
                            <div className={classNames("delete-btn-wrapper", "show-on-hover")}>
                                <DeleteButton onClick={handleDeleteConfirm} />
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="function-separator" />
            </div>
        )
    }

    return (
        <>
            <div id={"edit-div"} />
            {component}
        </>
    );
}
