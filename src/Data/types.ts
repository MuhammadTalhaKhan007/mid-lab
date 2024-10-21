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
    totalPages: number;
    page: number;

}

export interface Food {
    id: number;
    category: string;
    name: string,
    inStock: boolean
}

export type FoodItem = {
    id: number;
    category: string;
    name: string;
    inStock: boolean;
};