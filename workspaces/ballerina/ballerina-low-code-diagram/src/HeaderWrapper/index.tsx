import React from 'react';

interface HeaderWrapperProps {
    children?: JSX.Element[] | JSX.Element;
    className: string;
    onClick: () => void;
}

export function HeaderWrapper(props: HeaderWrapperProps) {
    const { className, onClick } = props;

    const handleOnClick = (evt: React.MouseEvent) => {
        if (!evt.isPropagationStopped()) {
            onClick();
        }
    }

    return (
        <div className={className} onClick={handleOnClick}>
            {props.children}
        </div>
    );
}
