import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../lib/sampleData";
import { useCart } from "../store/cartStore";

export default function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const product = SAMPLE_PRODUCTS.find((p) => p.id === Number(productId));
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<number | null>(
    product ? (product.sizes.length > 0 ? product.sizes[0] : null) : null,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display font-extrabold text-5xl text-foreground/20 mb-4">
            404
          </h1>
          <p className="text-foreground/50 mb-6">Product not found.</p>
          <Link to="/products" search={{ category: undefined }}>
            <Button className="bg-electric text-white rounded-none">
              ← Back to Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const related = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 3);
  const fallbackRelated = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id,
  ).slice(0, 3);
  const displayRelated = related.length >= 2 ? related : fallbackRelated;

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
      quantity: qty,
    });
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const features = [
    "Premium breathable upper material",
    "Responsive foam midsole technology",
    "Durable rubber outsole with traction pattern",
    "Padded collar and tongue for comfort",
    "Available in half sizes",
  ];

  return (
    <main
      className="bg-background min-h-screen"
      data-ocid="product_detail.section"
    >
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link
          to="/products"
          search={{ category: undefined }}
          data-ocid="product_detail.link"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-electric transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Shoes
        </Link>
      </div>

      {/* Hero grid */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0">
        {/* Image panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-secondary aspect-square lg:aspect-auto lg:min-h-[600px]"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.featured && (
            <div className="absolute top-6 left-6 bg-electric text-white text-[10px] font-extrabold uppercase tracking-[0.25em] px-3 py-1.5">
              FEATURED
            </div>
          )}
          {/* Electric accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-electric" />
        </motion.div>

        {/* Details panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6 p-8 lg:p-12 border border-foreground/8 border-l-0"
        >
          {/* Category */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-electric">
            {product.category === "menShoes"
              ? "Men's"
              : product.category === "womenShoes"
                ? "Women's"
                : "Kids'"}{" "}
            Collection
          </p>

          {/* Name */}
          <h1
            className="font-display font-extrabold leading-none text-foreground"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= 4 ? "fill-gold text-gold" : "text-foreground/20"}`}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/50 font-medium">
              4.0 (128 reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display font-extrabold text-5xl text-electric">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-foreground/40 line-through">
              ₹{Math.round(product.price * 1.2).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="h-px bg-foreground/8" />

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                Select Size
              </p>
              <button
                type="button"
                className="text-[10px] text-electric underline underline-offset-2 font-semibold"
              >
                Size Guide
              </button>
            </div>
            <div
              className="flex flex-wrap gap-2"
              data-ocid="product_detail.select"
            >
              {Array.from(product.sizes).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-sm font-bold border-2 transition-all ${
                    selectedSize === size
                      ? "bg-electric text-white border-electric"
                      : "border-foreground/15 text-foreground/60 hover:border-electric/50 hover:text-foreground"
                  }`}
                  data-ocid="product_detail.toggle"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex gap-3">
            <div className="flex items-center border border-foreground/15">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-12 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
                data-ocid="product_detail.secondary_button"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(Math.min(10, qty + 1))}
                className="w-12 h-12 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
                data-ocid="product_detail.secondary_button"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 font-extrabold text-sm uppercase tracking-widest transition-all h-12 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-electric hover:bg-electric/90 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              }`}
              data-ocid="product_detail.submit_button"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Shipping info */}
          <div className="flex items-center gap-3 text-xs text-foreground/50 bg-foreground/[0.03] border border-foreground/8 px-4 py-3">
            <Truck className="w-4 h-4 text-electric shrink-0" />
            Free shipping on orders above ₹5,999 · 30-day returns
          </div>

          {/* Description */}
          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-foreground/60 mb-2">
              Description
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-foreground/60 mb-3">
              Features
            </h2>
            <ul className="space-y-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-foreground/55"
                >
                  <span className="w-1 h-1 rounded-full bg-electric mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      <section className="bg-secondary/40 py-20 border-t border-foreground/8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
              YOU MAY ALSO LIKE
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground leading-none">
              RELATED <span className="text-foreground/30">PRODUCTS</span>
            </h2>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-ocid="product_detail.list"
          >
            {displayRelated.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
