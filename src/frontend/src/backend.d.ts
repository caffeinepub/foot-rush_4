import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: number;
    featured: boolean;
    name: string;
    description: string;
    sizes: Uint8Array;
    stock: number;
    imageUrl: string;
    category: ProductCategory;
    price: number;
}
export type CartId = string;
export interface CartItem {
    size: number;
    productId: number;
    quantity: number;
}
export interface Order {
    id: string;
    total: number;
    timestamp: bigint;
    items: Array<CartItem>;
}
export interface UserProfile {
    name: string;
}
export enum ProductCategory {
    womenShoes = "womenShoes",
    menShoes = "menShoes",
    kidsShoes = "kidsShoes"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addItemToCart(cartId: CartId, item: CartItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(cartId: CartId): Promise<void>;
    createProduct(product: Product): Promise<void>;
    deleteProduct(productId: number): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(cartId: CartId): Promise<Array<CartItem>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(productId: number): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getUserOrders(user: Principal): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(cartId: CartId): Promise<string>;
    removeItemFromCart(cartId: CartId, productId: number, size: number): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
