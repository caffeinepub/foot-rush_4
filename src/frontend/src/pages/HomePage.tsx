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

const featureColors = [
  {
    bg: "oklch(0.95 0.06 280)",
    iconBg: "oklch(0.82 0.14 280)",
    iconColor: "oklch(0.42 0.22 280)",
  },
  {
    bg: "oklch(0.95 0.06 35)",
    iconBg: "oklch(0.88 0.12 35)",
    iconColor: "oklch(0.52 0.2 35)",
  },
  {
    bg: "oklch(0.95 0.07 180)",
    iconBg: "oklch(0.84 0.12 180)",
    iconColor: "oklch(0.42 0.2 180)",
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
        {/* Vivid colorful gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.22 300 / 85%), oklch(0.25 0.2 260 / 60%), oklch(0.45 0.18 35 / 35%))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.15 0.15 280 / 50%), transparent 60%)",
          }}
        />

        {/* Rainbow accent bar left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 rainbow-bar" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <p
              className="font-display font-extrabold text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{ color: "oklch(0.85 0.18 300)" }}
            >
              Foot Rush — New Season 2024
            </p>

            <h1
              className="font-display font-extrabold leading-none text-white mb-4"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              EVERY
              <br />
              <em
                className="not-italic"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.85 0.22 320), oklch(0.85 0.2 60))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                STRIDE
              </em>
              <br />
              COUNTS.
            </h1>

            <p className="text-white/75 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              Precision-crafted footwear for athletes, creators, and everyone in
              between. Performance meets the street.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                search={{ category: undefined }}
                data-ocid="hero.primary_button"
              >
                <Button
                  className="text-white font-bold px-10 py-6 text-sm rounded-full gap-2 uppercase tracking-widest border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.26 300), oklch(0.62 0.24 220))",
                    boxShadow: "0 8px 32px oklch(0.58 0.26 300 / 40%)",
                  }}
                >
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
      <div className="overflow-hidden rainbow-bar py-3 border-y-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-4 mx-6 text-white font-display font-extrabold text-xs tracking-[0.25em] uppercase"
            >
              {item.text}
              <span className="w-1 h-1 rounded-full bg-white/50 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURE STRIP ── */}
      <section className="py-20 border-b border-foreground/6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col gap-4 px-8 py-10 rounded-2xl"
                style={{ background: featureColors[i].bg }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: featureColors[i].iconBg }}
                >
                  <f.icon
                    className="w-6 h-6"
                    strokeWidth={1.5}
                    style={{ color: featureColors[i].iconColor }}
                  />
                </div>
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: featureColors[i].iconColor }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${featureColors[i].iconColor}cc` }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARRIVALS ── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.97 0.03 300)" }}
        data-ocid="featured.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p
                className="font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: "oklch(0.58 0.26 300 / 60%)" }}
              >
                01 / FEATURED
              </p>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
                NEW
                <br />
                <span className="gradient-text">ARRIVALS</span>
              </h2>
            </div>
            <Link
              to="/products"
              search={{ category: undefined }}
              data-ocid="featured.link"
              className="text-xs font-bold flex items-center gap-1 transition-colors tracking-widest uppercase text-electric hover:text-electric/70"
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
                <div
                  key={i}
                  className="bg-card h-80 animate-pulse rounded-xl"
                />
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
      <section
        className="py-24"
        style={{ background: "oklch(0.96 0.04 35)" }}
        data-ocid="categories.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-14">
            <p
              className="font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ color: "oklch(0.52 0.2 35 / 70%)" }}
            >
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
                  className="relative overflow-hidden aspect-[2/3] cursor-pointer group rounded-2xl"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Vivid colorful gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(to top, oklch(0.35 0.22 300 / 90%), oklch(0.55 0.18 220 / 40%), transparent)"
                          : i === 1
                            ? "linear-gradient(to top, oklch(0.38 0.2 35 / 90%), oklch(0.55 0.16 60 / 40%), transparent)"
                            : "linear-gradient(to top, oklch(0.35 0.2 180 / 90%), oklch(0.5 0.16 200 / 40%), transparent)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
                      {cat.sub}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3 className="font-display font-extrabold text-4xl text-white leading-none">
                        {cat.label}
                      </h3>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.26 300), oklch(0.62 0.24 220))",
                        }}
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
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
      <section
        className="py-24"
        style={{ background: "oklch(0.96 0.05 180)" }}
        data-ocid="topsellers.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p
                className="font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: "oklch(0.42 0.2 180 / 70%)" }}
              >
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

      {/* ── BRAND STATS SECTION ── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.22 300), oklch(0.3 0.2 260), oklch(0.32 0.18 220))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-display font-extrabold leading-none mb-6 tracking-tight"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                color: "oklch(1 0 0 / 6%)",
              }}
            >
              BUILT FOR EVERY STRIDE
            </h2>
            <div className="w-24 h-0.5 mx-auto mb-8 rainbow-bar" />
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { value: "PRECISION CRAFTED", label: "Design Philosophy" },
                { value: "EST. 2024", label: "Founded" },
                { value: "500+ MODELS", label: "In Catalog" },
                { value: "50K+ CUSTOMERS", label: "Worldwide" },
              ].map((item) => (
                <div key={item.value} className="text-center">
                  <p className="font-display font-extrabold text-xl md:text-2xl text-white">
                    {item.value}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: "oklch(0.85 0.18 300)" }}
                  >
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
        className="relative overflow-hidden py-32"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.26 320), oklch(0.3 0.24 280), oklch(0.38 0.2 200))",
        }}
        data-ocid="cta.section"
      >
        {/* Huge faded SALE text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold leading-none"
            style={{
              fontSize: "clamp(8rem, 30vw, 28rem)",
              color: "oklch(1 0 0 / 5%)",
            }}
          >
            SALE
          </span>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Colorful glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 blur-3xl"
          style={{ background: "oklch(0.62 0.26 300 / 15%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 blur-3xl"
          style={{ background: "oklch(0.62 0.24 200 / 15%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[10px] font-bold tracking-[0.35em] uppercase mb-6"
              style={{ color: "oklch(0.85 0.18 300)" }}
            >
              Limited Time Offer
            </p>
            <h2
              className="font-display font-extrabold leading-none text-white mb-3"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              UP TO
            </h2>
            <h2
              className="font-display font-extrabold leading-none mb-6"
              style={{
                fontSize: "clamp(4.5rem, 14vw, 11rem)",
                background:
                  "linear-gradient(135deg, oklch(0.85 0.22 320), oklch(0.85 0.2 60))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
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
              <Button
                className="text-white font-extrabold px-14 py-7 text-sm uppercase tracking-[0.2em] rounded-full border-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.26 300), oklch(0.62 0.24 220))",
                  boxShadow: "0 8px 32px oklch(0.58 0.26 300 / 40%)",
                }}
              >
                Shop the Sale
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
