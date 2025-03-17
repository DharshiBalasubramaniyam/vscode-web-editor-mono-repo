
import { TypeWithIdentifier, VarIcon } from '@dharshi/ballerina-core';

import { IconContainer, VariableComponent, VariableName, VariableType } from '../VariablesView';
import { getIcon, getTypeName } from './utils';

interface PrimitiveTypeProps {
    variable: TypeWithIdentifier;
    handleOnClick: (name: string) => void;
}
export function PrimitiveType(props: PrimitiveTypeProps) {
    const { variable, handleOnClick } = props;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <VariableComponent onClick={() => handleOnClick(variable.name)}>
                <IconContainer>
                    {getIcon(variable.type.typeName)}
                </IconContainer>
                <VariableName>
                    {variable.name}
                </VariableName>
                <VariableType>
                    {getTypeName(variable.type)}
                </VariableType>
            </VariableComponent>
        </div>
    );
}
