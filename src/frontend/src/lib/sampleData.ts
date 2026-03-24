import { ProductCategory } from "../backend.d";
import type { Product } from "../backend.d";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Speed Pro X",
    description:
      "Engineered for serious runners. Lightweight mesh upper with responsive foam midsole for race-day performance.",
    price: 10799,
    category: ProductCategory.menShoes,
    imageUrl: "/assets/generated/shoe-men-1.dim_400x400.jpg",
    featured: true,
    sizes: new Uint8Array([7, 8, 9, 10, 11, 12]),
    stock: 42,
  },
  {
    id: 2,
    name: "Street Classic",
    description:
      "Timeless silhouette meets modern comfort. Perfect for everyday wear with premium leather upper.",
    price: 7499,
    category: ProductCategory.menShoes,
    imageUrl: "/assets/generated/shoe-men-2.dim_400x400.jpg",
    featured: false,
    sizes: new Uint8Array([7, 8, 9, 10, 11]),
    stock: 28,
  },
  {
    id: 3,
    name: "Cloud Runner",
    description:
      "Feather-light construction with cloud-like cushioning. Designed for the woman who runs the world.",
    price: 9999,
    category: ProductCategory.womenShoes,
    imageUrl: "/assets/generated/shoe-women-1.dim_400x400.jpg",
    featured: true,
    sizes: new Uint8Array([5, 6, 7, 8, 9, 10]),
    stock: 35,
  },
  {
    id: 4,
    name: "Style Glide",
    description:
      "Effortless style meets all-day comfort. Versatile design that transitions from gym to street seamlessly.",
    price: 8299,
    category: ProductCategory.womenShoes,
    imageUrl: "/assets/generated/shoe-women-2.dim_400x400.jpg",
    featured: true,
    sizes: new Uint8Array([5, 6, 7, 8, 9]),
    stock: 20,
  },
  {
    id: 5,
    name: "Spark Jump",
    description:
      "Built for active kids. Extra durable with easy hook-and-loop closure for quick on/off.",
    price: 5799,
    category: ProductCategory.kidsShoes,
    imageUrl: "/assets/generated/shoe-kids-1.dim_400x400.jpg",
    featured: true,
    sizes: new Uint8Array([1, 2, 3, 4, 5]),
    stock: 50,
  },
  {
    id: 6,
    name: "Turbo Stride",
    description:
      "Lightweight and flexible for growing feet. Breathable upper keeps feet cool all day long.",
    price: 4999,
    category: ProductCategory.kidsShoes,
    imageUrl: "/assets/generated/shoe-kids-2.dim_400x400.jpg",
    featured: false,
    sizes: new Uint8Array([1, 2, 3, 4, 5, 6]),
    stock: 38,
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  menShoes: "Men",
  womenShoes: "Women",
  kidsShoes: "Kids",
};
