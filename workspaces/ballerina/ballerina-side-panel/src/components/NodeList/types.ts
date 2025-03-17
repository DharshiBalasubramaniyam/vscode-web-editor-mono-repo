
export type Item = Category | Node;

export type Category = {
    title: string;
    description: string;
    icon?: React.JSX.Element;
    items: Item[];
};

export type Node = {
    id: string;
    label: string;
    description: string;
    icon?: React.JSX.Element;
    enabled?: boolean;
    metadata?: any;
};
