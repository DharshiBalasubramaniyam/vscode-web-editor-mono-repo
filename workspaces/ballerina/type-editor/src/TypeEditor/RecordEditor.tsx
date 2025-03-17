
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Member, Type } from '@dharshi/ballerina-core';
import { Codicon, Icon, CheckBox } from '@dharshi/ui-toolkit';
import { Button } from '@dharshi/ui-toolkit';
import { TextField } from '@dharshi/ui-toolkit';
import { FieldEditor } from './FieldEditor';
import styled from '@emotion/styled';


 const Header = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 0px;
    `;

const SectionTitle = styled.div`
        font-size: 13px;
        font-weight: 500;
        color: var(--vscode-editor-foreground);
        margin-bottom: 4px;
    `;

interface RecordEditorProps {
    type: Type;
    isAnonymous: boolean;
    onChange: (type: Type) => void;
    onImportJson: () => void;
    onImportXml: () => void;
    isGraphql?: boolean;
}

export const RecordEditor = forwardRef<{ addMember: () => void }, RecordEditorProps>((props, ref) => {
    const { type, isAnonymous = false, onChange, onImportJson, onImportXml, isGraphql } = props;
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    const addMember = () => {
        const memberCount = Object.keys(type.members).length;
        const newMemberName = `name${memberCount + 1}`;
        const newMember: Member = {
            name: newMemberName,
            type: "string",
            kind: "FIELD",
            refs: [],
            docs: ""
        }
        onChange({ ...type, members: [...type.members, newMember] });
    }

    useImperativeHandle(ref, () => ({
        addMember
    }));

    const deleteSelected = () => {
        const newMembers = type.members.filter((_, index) => !selectedMembers.includes(index));
        setSelectedMembers([]);
        onChange({ ...type, members: newMembers });
    }

    const onSelect = (index: number) => () => {
        setSelectedMembers([...selectedMembers, index]);
    }

    const onDeselect = (index: number) => () => {
        setSelectedMembers(selectedMembers.filter(i => i !== index));
    }

    const handleMemberChange = (index: number) => (member: Member) => {
        const newMembers = [...type.members];
        newMembers[index] = member;
        onChange({ ...type, members: newMembers });
    }

    return (
        <div className="record-editor">
            {!isAnonymous &&
                <Header>
                    <SectionTitle>{isGraphql ? 'Input Object Fields' : 'Record'}</SectionTitle>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button appearance="icon" onClick={onImportJson}>
                            <Codicon name="arrow-circle-down" />&nbsp;JSON
                        </Button>
                        <Button appearance="icon" onClick={onImportXml}>
                            <Codicon name="arrow-circle-down" />&nbsp;XML
                        </Button>
                        <Button appearance="icon" onClick={addMember}><Codicon name="add" /></Button>
                        <Button appearance="icon" onClick={deleteSelected}><Codicon name="trash" /></Button>
                        {/* <Button appearance="icon"><Codicon name="kebab-vertical" /></Button> */}
                    </div>
            </Header>
            }
            {type.members.map((member, index) => (
                <>
                    <FieldEditor selected={selectedMembers.includes(index)} member={member} onChange={handleMemberChange(index)} onSelect={onSelect(index)} onDeselect={onDeselect(index)} />
                </>
            ))}
        </div >
    );
});
