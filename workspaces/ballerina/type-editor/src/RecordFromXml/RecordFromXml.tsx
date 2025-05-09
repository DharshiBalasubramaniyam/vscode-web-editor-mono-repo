
import React, { useState } from 'react';
import { Button, SidePanelBody, TextArea } from '@dharshi/ui-toolkit';
import { BallerinaRpcClient } from '@dharshi/ballerina-rpc-client';
import { FileSelect } from '../style';
import { FileSelector } from '../components/FileSelector';
import { NOT_SUPPORTED_TYPE, Type, TypeDataWithReferences } from '@dharshi/ballerina-core';
import { XMLToRecord } from '@dharshi/ballerina-core';
import styled from '@emotion/styled';

interface RecordFromXmlProps {
    name: string;
    filePath: string;
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

export const RecordFromXml = (props: RecordFromXmlProps) => {
    const { name, onImport, onCancel, rpcClient, filePath } = props;
    const [xml, setXml] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onXmlUpload = (xml: string) => {
        setXml(xml);
    }

    const onXmlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setXml(event.target.value);
    }

    const importXmlAsRecord = async () => {
        const resp: TypeDataWithReferences = await rpcClient.getRecordCreatorRpcClient().convertXmlToRecordType({
            xmlValue: xml,
            prefix: "",
            filePath: filePath
        });
        console.log(resp);
        const targetRecord = resp.types.find((t) => t.type.name === name);
        const otherRecords = resp.types
            .filter((t) => t.type.name !== name)
            .map((t) => t.type);
        if (otherRecords.length > 0) {
            await rpcClient.getBIDiagramRpcClient().updateTypes({
                filePath: filePath,
                types: otherRecords
            });
        }

        onImport([targetRecord.type]);
    }

    return (
        <>
            <h4>Import Record From XML</h4>
            <FileSelect>
                <FileSelector label="Select XML file" extension="xml" onReadFile={onXmlUpload} />
            </FileSelect>
            <TextArea
                rows={10}
                value={xml}
                onChange={onXmlChange}
                errorMsg={error}
            />
            <S.Footer>
                <Button appearance="secondary" onClick={onCancel}>Cancel</Button>
                <Button onClick={importXmlAsRecord} disabled={!!error || !xml.trim()}>Import</Button>
            </S.Footer>
        </>
    );
};
