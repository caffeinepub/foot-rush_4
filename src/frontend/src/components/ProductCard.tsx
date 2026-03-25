import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { CATEGORY_LABELS } from "../lib/sampleData";
import { useCart } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product.sizes.length > 0 ? product.sizes[0] : null,
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Cycle through vivid card accent colors
  const accentHues = [300, 35, 180, 130, 320];
  const hue = accentHues[index % accentHues.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card overflow-hidden group flex flex-col border border-foreground/8 rounded-2xl"
      style={{
        boxShadow: "0 2px 12px oklch(0 0 0 / 6%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 12px 40px oklch(0.58 0.26 ${hue} / 22%)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 12px oklch(0 0 0 / 6%)";
      }}
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary aspect-square rounded-t-2xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-colors duration-300" />

        {/* Category tag */}
        <div className="absolute top-0 left-0">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 block rounded-tl-2xl rounded-br-xl"
            style={{
              background: `oklch(0.58 0.26 ${hue} / 15%)`,
              color: `oklch(0.42 0.22 ${hue})`,
            }}
          >
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {product.featured && (
          <Badge
            className="absolute top-6 left-0 text-white text-[9px] font-extrabold border-0 rounded-r-full px-3 py-1"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.26 320), oklch(0.65 0.22 35))",
            }}
          >
            NEW
          </Badge>
        )}
        <button
          type="button"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: wishlisted
              ? "oklch(0.62 0.26 13 / 15%)"
              : "oklch(0 0 0 / 12%)",
          }}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              wishlisted ? "fill-sale text-sale" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display font-bold text-sm text-foreground leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-foreground/45 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${
                s <= 4 ? "fill-gold text-gold" : "text-foreground/20"
              }`}
            />
          ))}
          <span className="text-xs text-foreground/35 ml-1.5">(4.0)</span>
        </div>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {Array.from(product.sizes).map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => setSelectedSize(size)}
                className="text-[10px] font-bold px-2 py-0.5 border rounded-md transition-all"
                style={{
                  background:
                    selectedSize === size
                      ? `oklch(0.58 0.26 ${hue})`
                      : "transparent",
                  color:
                    selectedSize === size ? "white" : `oklch(0.5 0.08 ${hue})`,
                  borderColor:
                    selectedSize === size
                      ? `oklch(0.58 0.26 ${hue})`
                      : `oklch(0.58 0.26 ${hue} / 25%)`,
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto space-y-3">
          <span
            className="font-display font-extrabold text-2xl block"
            style={{
              background: `linear-gradient(135deg, oklch(0.48 0.26 ${hue}), oklch(0.52 0.24 ${(hue + 40) % 360}))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full text-white font-extrabold text-[11px] py-3 flex items-center justify-center gap-1.5 transition-all uppercase tracking-widest rounded-xl"
            style={{
              background: `linear-gradient(135deg, oklch(0.58 0.26 ${hue}), oklch(0.58 0.24 ${(hue + 50) % 360}))`,
              boxShadow: `0 4px 16px oklch(0.58 0.26 ${hue} / 30%)`,
            }}
            data-ocid={`products.item.${index + 1}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
