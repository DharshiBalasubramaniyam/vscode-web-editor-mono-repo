
import React from "react";

import { FunctionProperties, ViewMode } from "./types";

const defaultState: FunctionProperties = {
    overlayId: '',
    overlayNode: undefined,
    functionNode: undefined,
    hasWorker: false,
    viewMode: ViewMode.STATEMENT
}

export const Context = React.createContext<FunctionProperties>(defaultState);

export const Provider: React.FC<FunctionProperties> = (props) => {
    const { children, ...restProps } = props;
    return (
        <Context.Provider value={{ ...restProps }} >
            {props.children}
        </Context.Provider>
    )
}

export const useFunctionContext = () => React.useContext(Context);
