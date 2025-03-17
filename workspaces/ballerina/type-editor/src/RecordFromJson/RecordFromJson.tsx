
import React, { useState } from 'react';
import { Button, SidePanelBody, TextArea, CheckBox } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { FileSelect } from '../style';
import { FileSelector } from '../components/FileSelector';
import { BallerinaRpcClient } from '@dharshi/ballerina-rpc-client';
import { JsonToRecord, Type, TypeDataWithReferences } from '@dharshi/ballerina-core';
import { NOT_SUPPORTED_TYPE } from '@dharshi/ballerina-core';

interface RecordFromJsonProps {
    name: string;
    filePathUri: string;
    onImport: (types: Type[]) => void;
    onCancel: () => void;
    rpcClient: BallerinaRpcClient;
}

namespace S {
    export const Container = styled(SidePanelBody)`
        display: flex;
        flex-direction: column;
        gap: 20px;
    `;

    export const Footer = styled.div<{}>`
        display: flex;
        gap: 8px;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 8px;
        width: 100%;
    `;
}

export const RecordFromJson = (props: RecordFromJsonProps) => {
    const { name, onImport, onCancel, rpcClient, filePathUri } = props;
    const [json, setJson] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const [isSeparateDefinitions, setIsSeparateDefinitions] = useState<boolean>(false);

    const validateJson = (jsonString: string) => {
        try {
            if (jsonString.trim() === "") {
                setError("");
                return;
            }
            JSON.parse(jsonString);
            setError("");
        } catch (e) {
            setError("Invalid JSON format");
        }
    };

    const onJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newJson = event.target.value;
        setJson(newJson);
        validateJson(newJson);
    }

    const onJsonUpload = (json: string) => {
        setJson(json);
        validateJson(json);
    }

    const importJsonAsRecord = async () => {
        console.log("import json: ", props);
        const resp: TypeDataWithReferences = await rpcClient.getRecordCreatorRpcClient().convertJsonToRecordType({
            jsonString: json,
            recordName: name,
            filePathUri: filePathUri,
            isClosed,
            isRecordTypeDesc: !isSeparateDefinitions,
            prefix: ""
        });
        const targetRecord = resp.types.find((t) => t.type.name === name);
        const otherRecords = resp.types
            .filter((t) => t.type.name !== name)
            .map((t) => t.type);
        if (otherRecords.length > 0) {
            await rpcClient.getBIDiagramRpcClient().updateTypes({
                filePath: filePathUri,
                types: otherRecords
            });
        }

        onImport([targetRecord.type]);
    }

    return (
        <>
            <h4>Import Record From JSON</h4>
            <FileSelect>
                <FileSelector label="Select JSON file" extension="json" onReadFile={onJsonUpload} />
            </FileSelect>
            <TextArea
                rows={10}
                value={json}
                onChange={onJsonChange}
                errorMsg={error}
            />
            <CheckBox label="Is Separate Definitions" checked={isSeparateDefinitions} onChange={setIsSeparateDefinitions} />
            <S.Footer>
                <Button appearance="secondary" onClick={onCancel}>Cancel</Button>
                <Button onClick={importJsonAsRecord} disabled={!!error || !json.trim()}>Import</Button>
            </S.Footer>
        </>
    );
};
