
import { LineRange } from '@dharshi/ballerina-core';
import React, { createContext, FC, useContext } from 'react';
import { 
    Control,
    FieldValues, 
    UseFormWatch, 
    UseFormRegister, 
    UseFormSetValue, 
    UseFormUnregister, 
    UseFormSetError,
    UseFormClearErrors,
    FieldErrors
} from 'react-hook-form';
import { FormExpressionEditorProps } from '../components/Form/types';

export interface FormContext {
    form: {
        control: Control<FieldValues, any>;
        setValue: UseFormSetValue<FieldValues>;
        watch: UseFormWatch<any>;
        register: UseFormRegister<FieldValues>;
        unregister: UseFormUnregister<FieldValues>;
        setError: UseFormSetError<FieldValues>;
        clearErrors: UseFormClearErrors<FieldValues>;
        formState: { isValidating: boolean; errors: FieldErrors<FieldValues> };
    };
    expressionEditor?: FormExpressionEditorProps;
    targetLineRange: LineRange;
    fileName: string;
}

const defaultState: any = {};
export const Context = createContext<FormContext>(defaultState);

export const Provider: FC<FormContext> = (props) => {
    const { children, ...restProps } = props;

    return <Context.Provider value={restProps}>{children}</Context.Provider>;
};

export const useFormContext = () => useContext(Context);
