// tslint:disable: no-empty jsx-no-multiline-js
import React, { useState } from 'react';

export interface ToolbarCtx {
    toolbarMoreExp: boolean,
    onClickMoreExp: (value: boolean) => void
}

export const ToolbarContext = React.createContext<ToolbarCtx>({
    toolbarMoreExp: false,
    onClickMoreExp: (value: boolean) => {}
});

export const ToolbarContextProvider: React.FC = (props) => {
    const [toolbarMoreExp, setToolbarMoreExp] = useState(false);

    const onClickMoreExp = (value: boolean) => {
        setToolbarMoreExp(value);
    };

    return (
        <ToolbarContext.Provider
            value={{
                toolbarMoreExp,
                onClickMoreExp
            }}
        >
            {props.children}
        </ToolbarContext.Provider>
    );
};
