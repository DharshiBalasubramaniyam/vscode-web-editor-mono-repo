import styled from '@emotion/styled';
import React from 'react';
export interface DeviderProps {
    id?: string;
    className?: string;
    sx?: any;
}

const Container = styled.div<DeviderProps>`
	border-top: 1px solid var(--vscode-editorIndentGuide-background);
	margin: 10px 0;
	${(props: DeviderProps) => props.sx};
`;

export const Divider: React.FC<DeviderProps> = (props: DeviderProps) => {
    const { id, className, sx } = props;
    return (
        <Container id={id} className={className} sx={sx} />
    );
};
