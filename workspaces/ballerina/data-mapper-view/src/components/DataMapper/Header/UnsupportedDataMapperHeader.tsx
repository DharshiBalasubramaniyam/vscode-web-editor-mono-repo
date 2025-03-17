// tslint:disable: jsx-no-multiline-js
import React from "react";

import styled from "@emotion/styled";
import { Button, ButtonProps, Codicon } from "@dharshi/ui-toolkit";

export interface DataMapperHeaderProps {
    onClose: () => void;
}

function Home(props: ButtonProps) {
    return (
        <Button
            appearance="icon"
            {...props}
        >
            <Codicon name="home" /> 
        </Button>
    )
}

export function UnsupportedDataMapperHeader(props: DataMapperHeaderProps) {
    const { onClose } = props;
    return (
        <HeaderContainer>
            <HomeButton onClick={onClose} />
            <Title> Data Mapper: </Title>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    padding: 15px;
    background-color: white;
`;

const HomeButton = styled(Home)`
    cursor: pointer;
    margin-right: 10px;
`;

const Title = styled.div`
    font-weight: 600;
    margin-right: 10px;
`;
