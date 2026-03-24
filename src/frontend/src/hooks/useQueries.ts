import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import type { ProductCategory } from "../backend.d";
import { SAMPLE_PRODUCTS } from "../lib/sampleData";
import { useActor } from "./useActor";

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PRODUCTS;
      try {
        const result = await actor.getAllProducts();
        return result.length > 0 ? result : SAMPLE_PRODUCTS;
      } catch {
        return SAMPLE_PRODUCTS;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PRODUCTS,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PRODUCTS.filter((p) => p.featured);
      try {
        const result = await actor.getFeaturedProducts();
        return result.length > 0
          ? result
          : SAMPLE_PRODUCTS.filter((p) => p.featured);
      } catch {
        return SAMPLE_PRODUCTS.filter((p) => p.featured);
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PRODUCTS.filter((p) => p.featured),
  });
}

export function useProductsByCategory(category: ProductCategory | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const fallback = category
        ? SAMPLE_PRODUCTS.filter((p) => p.category === category)
        : SAMPLE_PRODUCTS;
      if (!actor) return fallback;
      try {
        const result = category
          ? await actor.getProductsByCategory(category)
          : await actor.getAllProducts();
        return result.length > 0 ? result : fallback;
      } catch {
        return fallback;
      }
    },
    enabled: !isFetching,
    placeholderData: category
      ? SAMPLE_PRODUCTS.filter((p) => p.category === category)
      : SAMPLE_PRODUCTS,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.createProduct(product);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updateProduct(product);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deleteProduct(productId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
