import React, { useContext } from 'react';

import { ClassIcon, DeleteButton, EditButton } from '@dharshi/ballerina-core';
import { ClassDefinition } from '@dharshi/syntax-tree';
import classNames from 'classnames';

import { Context } from '../../../../Context/diagram';
import { HeaderWrapper } from '../../../../HeaderWrapper';

interface ClassHeaderProps {
    model: ClassDefinition;
    onExpandClick: () => void;
    isExpanded: boolean;
}

export function ClassHeader(props: ClassHeaderProps) {
    const { model, onExpandClick } = props;
    const diagramContext = useContext(Context);
    const { isReadOnly } = diagramContext.props;
    const deleteComponent = diagramContext?.api?.edit?.deleteComponent;
    const gotoSource = diagramContext?.api?.code?.gotoSource;
    const renderDialogBox = diagramContext?.api?.edit?.renderDialogBox;

    const handleDeleteBtnClick = () => {
        deleteComponent(model);
    }

    const handleEditBtnClick = () => {
        renderDialogBox("Unsupported", handleEditBtnConfirm);
    }

    const handleEditBtnConfirm = () => {
        const targetposition = model.position;
        gotoSource({ startLine: targetposition.startLine, startColumn: targetposition.startColumn });
    }

    const editButtons = (
        <div className="class-amendment-options">
            <div className={classNames("class-component-edit", "show-on-hover")}>
                <EditButton onClick={handleEditBtnClick} />
            </div>
            <div className={classNames("class-component-delete", "show-on-hover")}>
                <DeleteButton onClick={handleDeleteBtnClick} />
            </div>
        </div>
    );

    return (
        <HeaderWrapper
            className={'class-component-header'}
            onClick={onExpandClick}
        >
            <div className={'header-segement-container'}>
                <div className="header-segment" >
                    <ClassIcon />
                </div>
                <div className={"header-segment"}>Class</div>
                <div className={"header-segment-path"}>{model.className.value}</div>
            </div>
            {!isReadOnly && editButtons}
        </HeaderWrapper>
    );
}
