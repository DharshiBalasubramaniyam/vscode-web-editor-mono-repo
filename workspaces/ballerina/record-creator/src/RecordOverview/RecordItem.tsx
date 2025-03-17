// tslint:disable: jsx-no-multiline-js
import React from "react";
import { RecordItemModel } from "../types";
import { CheckBoxGroup } from "../components/FormComponents/FormFieldComponents/CheckBox";
import { Button, Codicon } from "@dharshi/ui-toolkit";
import { useStyles } from "../style";

interface ParamItemProps {
    record: RecordItemModel;
    onEditClick: (param: string) => void;
    handleOnCheck: () => void;
}

export function RecordItem(props: ParamItemProps) {
    const classes = useStyles();
    const { record, onEditClick, handleOnCheck } = props;

    const handleEdit = () => {
        onEditClick(record.name);
    };

    const handleCheckboxClick = (list: string[]) => {
        record.checked = list.length > 0;
        handleOnCheck();
    };

    return (
        <div className={classes.headerWrapper} data-testid={`${record.name}-item`}>
            <div className={classes.contentSection}>
                <CheckBoxGroup
                    values={[record.name]}
                    defaultValues={record.checked ? [record.name] : []}
                    onChange={handleCheckboxClick}
                />
            </div>
            <div className={classes.iconSection}>
                <Button appearance="icon" onClick={handleEdit} sx={{ height: "14px", width: "14px", marginRight: "5px" }}>
                    <Codicon name="edit" />
                </Button>
            </div>
        </div>
    );
}
