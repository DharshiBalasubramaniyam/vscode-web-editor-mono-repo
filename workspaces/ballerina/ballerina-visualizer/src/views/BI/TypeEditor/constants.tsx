import { Icon } from "@dharshi/ui-toolkit";
import type { TypeHelperOperator } from "@dharshi/type-editor";

export const TYPE_HELPER_OPERATORS: TypeHelperOperator[] = [
    {
        name: 'Convert type to array',
        getIcon: () => <Icon name="type-array" />,
        insertType: 'global',
        insertText: '[]',
        insertLocation: 'end'
    },
    {
        name: 'Add union type',
        getIcon: () => <Icon name="type-union" />,
        insertType: 'local',
        insertText: '|'
    },
    {
        name: 'Convert to nil type',
        getIcon: () => <Icon name="type-optional" />,
        insertType: 'global',
        insertText: '?',
        insertLocation: 'end'
    },
    {
        name: 'Convert to readonly type',
        getIcon: () => <Icon name="type-readonly" />,
        insertType: 'global',
        insertText: 'readonly',
        insertLocation: 'start'
    }
];
