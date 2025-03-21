export function iconNameTranslator(type: string) {
    switch (type) {
        case 'functions':
            return 'function-icon';
        case 'services':
            return 'service-icon';
        case 'records':
            return 'record-icon';
        case 'objects':
            return 'record-icon';
        case 'classes':
            return 'class-icon';
        case 'types':
            return 'record-icon';
        case 'constants':
            return 'constant-icon';
        case 'enums':
            return 'enum-icon';
        case 'listeners':
            return 'listener-icon';
        case 'moduleVariables':
            return 'variable-icon';
        default:
            return 'record-icon';
    }
}
