
import { TypeWithIdentifier } from "@dharshi/ballerina-core";
import { PrimitiveType } from "./PrimitiveType";
import { RecordTypeTree } from "./RecordType";

interface VariableTreeProps {
    variable: TypeWithIdentifier;
    depth: number;
    handleOnSelection: (variable: string) => void;
    parentValue?: string;
    isOptional?: boolean;
}

export function VariableTree(props: VariableTreeProps) {
    const { variable, depth, handleOnSelection, parentValue, isOptional } = props

    const handleOnClick = (name: string) => {
        handleOnSelection(name);
    }

    if (variable.type.typeName === "record") {
        return (
            <RecordTypeTree
                variable={variable}
                depth={depth}
                handleOnClick={handleOnClick}
                parentValue={parentValue}
                isOptional={isOptional}
            />
        );
    } else {
        return (<PrimitiveType variable={variable} handleOnClick={handleOnClick} />);
    }
}
