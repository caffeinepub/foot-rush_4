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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card rounded-none overflow-hidden group flex flex-col border border-white/5 shadow-card"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image — sharp corners, no radius */}
      <div className="relative overflow-hidden bg-secondary aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Category tag — sharp badge top-left */}
        <div className="absolute top-0 left-0">
          <span className="bg-black/70 text-white/60 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 block">
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {product.featured && (
          <Badge className="absolute top-6 left-0 bg-electric text-black text-[9px] font-extrabold border-0 rounded-none px-2.5 py-1">
            FEATURED
          </Badge>
        )}
        <button
          type="button"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/80 hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              wishlisted ? "fill-sale text-sale" : "text-white/50"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display font-bold text-sm text-white leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-white/30 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${
                s <= 4 ? "fill-gold text-gold" : "text-white/15"
              }`}
            />
          ))}
          <span className="text-xs text-white/25 ml-1.5">(4.0)</span>
        </div>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {Array.from(product.sizes).map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] font-bold px-2 py-0.5 border transition-all ${
                  selectedSize === size
                    ? "bg-electric text-black border-electric"
                    : "border-white/10 text-white/35 hover:border-electric/40 hover:text-white/60"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto space-y-3">
          <span className="font-display font-extrabold text-2xl text-electric block">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-electric hover:bg-electric/90 text-black font-extrabold text-[11px] py-3 flex items-center justify-center gap-1.5 transition-all hover:shadow-electric uppercase tracking-widest rounded-none"
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
