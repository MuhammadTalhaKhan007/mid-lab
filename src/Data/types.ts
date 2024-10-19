export interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    description: string;
    available: boolean;
}

export interface GetProductsAPIResponse {
    docs: Product[];
}