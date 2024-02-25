export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    images: Array<{
        id: number,
        path: string
    }>;
    tags: Array<{
        id: number,
        text: string
    }>;
    sizes: Array<{
        id: number,
        text: string
    }>;
    color: Array<{
        id: number,
        text: string,
        hex: string
    }>;
    inventory: Array<{
        id: number,
        colors: Array<{
            id: number,
            text: string,
            hex: string
        }>
    }>
}