export interface Product {
    id?: number;
    sku?: string;
    name?: string;
    description?: string;
   price:string;
    category?: number;
    similar_products?: []; 
    colors?: Color[];
    tags?: Tag[];
    quantity?:number;
    url?:string;
    size?:string;
   }

export interface Color {
    map(arg0: (color: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id?: number;
    display_name?: string;
    color_name?: string;
    hex_code?: string;
    image_product?: Image[];
}

export interface Image {
    id: number;
    image: string;
}

export interface Tag {
    id?: number;
    text?: string;
}
