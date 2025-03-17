
export function extractAttributeType(retrievedType: string) {
    let attributeType: string = '';

    if (retrievedType) {
        if (retrievedType.includes(':') && retrievedType.includes('|')) {
            let types: string[] = retrievedType.split('|');
            types.forEach((type, index) => {
                attributeType = attributeType + type.slice(type.lastIndexOf(':') + 1);
    
                if (index != types.length - 1) {
                    attributeType = attributeType + '|';
                }
            })
        } else {
            attributeType = retrievedType.slice(retrievedType.lastIndexOf(':') + 1);
        }
    }

    return attributeType;
}
