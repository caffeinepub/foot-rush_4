import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Ruler,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { useFeaturedProducts } from "../hooks/useQueries";
import { SAMPLE_PRODUCTS } from "../lib/sampleData";

const categories = [
  {
    label: "Men",
    image: "/assets/generated/shoe-men-1.dim_400x400.jpg",
    href: "/products?category=menShoes",
    sub: "Performance & Street",
  },
  {
    label: "Women",
    image: "/assets/generated/shoe-women-1.dim_400x400.jpg",
    href: "/products?category=womenShoes",
    sub: "Runway to Everyday",
  },
  {
    label: "Kids",
    image: "/assets/generated/shoe-kids-1.dim_400x400.jpg",
    href: "/products?category=kidsShoes",
    sub: "Built for Energy",
  },
];

const features = [
  {
    icon: Layers,
    title: "Premium Materials",
    desc: "Hand-picked leathers and performance mesh sourced from the world's best tanneries.",
  },
  {
    icon: Ruler,
    title: "Ergonomic Fit",
    desc: "Engineered last shapes for all-day comfort — from boardroom to basketball court.",
  },
  {
    icon: Sparkles,
    title: "Style Forward",
    desc: "Runway to street, every step matters. Trend-led silhouettes, season after season.",
  },
];

const MARQUEE_ITEMS = [
  { id: "p1", text: "PERFORMANCE" },
  { id: "s1", text: "STYLE" },
  { id: "c1", text: "COMFORT" },
  { id: "i1", text: "INNOVATION" },
  { id: "f1", text: "FOOTWEAR" },
  { id: "y1", text: "SINCE 2024" },
  { id: "r1", text: "FREE RETURNS" },
  { id: "p2", text: "PERFORMANCE" },
  { id: "s2", text: "STYLE" },
  { id: "c2", text: "COMFORT" },
  { id: "i2", text: "INNOVATION" },
  { id: "f2", text: "FOOTWEAR" },
  { id: "y2", text: "SINCE 2024" },
  { id: "r2", text: "FREE RETURNS" },
];

export default function HomePage() {
  const { data: featured = [], isLoading } = useFeaturedProducts();
  const displayFeatured =
    featured.length > 0 ? featured : SAMPLE_PRODUCTS.filter((p) => p.featured);
  const topSellers = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <main className="bg-background">
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-banner.dim_1400x600.jpg"
          alt="Foot Rush hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

        {/* Blue accent bar left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-electric to-transparent opacity-80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <p className="font-display font-extrabold text-[10px] tracking-[0.35em] text-electric uppercase mb-4">
              Foot Rush — New Season 2024
            </p>

            <h1
              className="font-display font-extrabold leading-none text-white mb-4"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              EVERY
              <br />
              <em className="not-italic text-electric">STRIDE</em>
              <br />
              COUNTS.
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              Precision-crafted footwear for athletes, creators, and everyone in
              between. Performance meets the street.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                search={{ category: undefined }}
                data-ocid="hero.primary_button"
              >
                <Button className="bg-electric hover:bg-electric/90 text-white font-bold px-10 py-6 text-sm rounded-full gap-2 shadow-electric uppercase tracking-widest">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                to="/products"
                search={{ category: undefined }}
                data-ocid="hero.secondary_button"
              >
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/15 hover:text-white px-10 py-6 text-sm rounded-full gap-2 bg-transparent uppercase tracking-widest"
                >
                  Collections <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="overflow-hidden bg-electric py-3 border-y-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-4 mx-6 text-white font-display font-extrabold text-xs tracking-[0.25em] uppercase"
            >
              {item.text}
              <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURE STRIP ── */}
      <section className="bg-secondary/60 py-20 border-b border-foreground/6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-foreground/8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col gap-4 px-8 py-10"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-electric/15 border border-electric/25">
                  <f.icon className="w-5 h-5 text-electric" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARRIVALS ── */}
      <section className="bg-background py-24" data-ocid="featured.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
                01 / FEATURED
              </p>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
                NEW
                <br />
                <span className="text-electric">ARRIVALS</span>
              </h2>
            </div>
            <Link
              to="/products"
              search={{ category: undefined }}
              data-ocid="featured.link"
              className="text-xs text-foreground/40 hover:text-electric font-bold flex items-center gap-1 transition-colors tracking-widest uppercase"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="featured.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="featured.list"
            >
              {displayFeatured.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="bg-secondary/40 py-24" data-ocid="categories.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-14">
            <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
              02 / BROWSE
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
              SHOP BY
              <br />
              <span className="text-foreground/30">CATEGORY</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                to="/products"
                search={{ category: undefined }}
                key={cat.label}
                data-ocid="categories.link"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden aspect-[2/3] cursor-pointer group"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
                      {cat.sub}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3 className="font-display font-extrabold text-4xl text-white leading-none">
                        {cat.label}
                      </h3>
                      <div className="w-9 h-9 border border-white/30 flex items-center justify-center group-hover:bg-electric group-hover:border-electric transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP SELLERS ── */}
      <section className="bg-background py-24" data-ocid="topsellers.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
                03 / POPULAR
              </p>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
                TOP
                <br />
                <span className="text-foreground/30">SELLERS</span>
              </h2>
            </div>
            <Link
              to="/products"
              search={{ category: undefined }}
              data-ocid="topsellers.link"
              className="text-xs text-foreground/40 hover:text-electric font-bold flex items-center gap-1 transition-colors tracking-widest uppercase"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="topsellers.list"
          >
            {topSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND FEATURE BANNER ── */}
      <section className="bg-secondary border-y border-foreground/8 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-extrabold text-5xl md:text-8xl text-foreground/[0.05] leading-none mb-6 tracking-tight">
              BUILT FOR EVERY STRIDE
            </h2>
            <div className="w-24 h-px bg-electric mx-auto mb-8" />
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { value: "PRECISION CRAFTED", label: "Design Philosophy" },
                { value: "EST. 2024", label: "Founded" },
                { value: "500+ MODELS", label: "In Catalog" },
                { value: "50K+ CUSTOMERS", label: "Worldwide" },
              ].map((item) => (
                <div key={item.value} className="text-center">
                  <p className="font-display font-extrabold text-xl md:text-2xl text-foreground">
                    {item.value}
                  </p>
                  <p className="text-[10px] text-electric/70 uppercase tracking-[0.2em] mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA SALE SECTION ── */}
      <section
        className="relative overflow-hidden bg-foreground py-32"
        data-ocid="cta.section"
      >
        {/* Huge faded SALE text in background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold text-white/[0.04] leading-none"
            style={{ fontSize: "clamp(8rem, 30vw, 28rem)" }}
          >
            SALE
          </span>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-electric text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Limited Time Offer
            </p>
            <h2
              className="font-display font-extrabold leading-none text-white mb-3"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              UP TO
            </h2>
            <h2
              className="font-display font-extrabold leading-none text-electric mb-6"
              style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
            >
              40% OFF
            </h2>
            <p className="text-white/50 mb-12 max-w-sm mx-auto text-base">
              Don't miss our biggest sale of the season. Premium shoes at
              unbeatable prices.
            </p>
            <Link
              to="/products"
              search={{ category: undefined }}
              data-ocid="cta.primary_button"
            >
              <Button className="bg-electric hover:bg-electric/90 text-white font-extrabold px-14 py-7 text-sm shadow-electric uppercase tracking-[0.2em] rounded-full">
                Shop the Sale
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
