import React from 'react';
import styled from '@emotion/styled';
import { Codicon } from '../../Codicon/Codicon';
import { Typography } from '../../Typography/Typography';
import { Icon } from '../../Icon/Icon';

export interface HeaderContainerProps {
    id?: string;
    className?: string;
    sx?: any;
}

const Container = styled.div<HeaderContainerProps>`
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
    justify-content: flex-start;
    ${(props: HeaderContainerProps) => props.sx};
`;

export const Header = (props: HeaderContainerProps) => {
    const { id, className, sx } = props;
    return (
        <Container id={id} className={className} sx={sx}>
            <Codicon iconSx={{marginTop: -3, fontWeight: "bold", fontSize: 22}} name='arrow-left'/>
            <Icon sx={{marginLeft: 20, marginTop: -10, fontSize: 30, pointerEvents: "none"}} name='choreo'/>
            <div style={{marginLeft: 30}}>
                <Typography variant="h3">Project Choreo</Typography>
            </div>
        </Container>
    );
};
