import { Input } from "@/components/ui/input";
import { useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCategory } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useProductsByCategory } from "../hooks/useQueries";

const FILTERS = [
  { label: "All", value: null },
  { label: "Men", value: ProductCategory.menShoes },
  { label: "Women", value: ProductCategory.womenShoes },
  { label: "Kids", value: ProductCategory.kidsShoes },
];

export default function ProductsPage() {
  const search = useSearch({ strict: false }) as { category?: string };
  const initialCat = search.category as ProductCategory | undefined;
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(
    initialCat || null,
  );
  const [query, setQuery] = useState("");

  const { data: products = [], isLoading } =
    useProductsByCategory(activeCategory);
  const filtered = query
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : products;

  return (
    <main className="min-h-screen bg-background" data-ocid="products.page">
      {/* Page header — dramatic */}
      <div className="relative overflow-hidden bg-black border-b border-white/6 py-24">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Faded giant header text */}
        <div
          className="absolute inset-0 flex items-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold text-white/[0.025] leading-none ml-2"
            style={{ fontSize: "clamp(5rem, 20vw, 18rem)" }}
          >
            SHOES
          </span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.35em] uppercase mb-3">
            Complete Collection
          </p>
          <h1
            className="font-display font-extrabold text-white leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          >
            ALL SHOES
          </h1>
          <p className="text-white/35 text-sm">
            Discover our complete collection of premium footwear.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters + Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveCategory(f.value)}
                data-ocid="products.filter.tab"
                className={`text-[11px] font-extrabold tracking-[0.2em] uppercase px-5 py-2.5 border transition-all rounded-none ${
                  activeCategory === f.value
                    ? "bg-electric text-black border-electric"
                    : "bg-transparent border-white/12 text-white/45 hover:border-white/35 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shoes..."
              className="pl-9 h-10 rounded-none w-56 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-electric/50"
              data-ocid="products.search_input"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="products.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-28" data-ocid="products.empty_state">
            <p className="text-4xl font-display font-extrabold text-white mb-3">
              No shoes found
            </p>
            <p className="text-white/30">
              Try a different filter or search term.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="products.list"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
