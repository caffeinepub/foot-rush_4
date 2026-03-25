import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../lib/sampleData";

const COLLECTIONS = [
  {
    id: "men",
    label: "Men",
    sub: "Performance & Street",
    image: "/assets/generated/shoe-men-1.dim_400x400.jpg",
    category: "menShoes",
    description:
      "Engineered for the relentless pursuit of greatness. From track to street.",
  },
  {
    id: "women",
    label: "Women",
    sub: "Runway to Everyday",
    image: "/assets/generated/shoe-women-1.dim_400x400.jpg",
    category: "womenShoes",
    description:
      "Designed for the woman who moves the world. Style without compromise.",
  },
  {
    id: "kids",
    label: "Kids",
    sub: "Built for Energy",
    image: "/assets/generated/shoe-kids-1.dim_400x400.jpg",
    category: "kidsShoes",
    description: "Durable, flexible, and fun. Built for the adventures ahead.",
  },
];

const MARQUEE_ITEMS = [
  { id: "m1", text: "MEN'S" },
  { id: "w1", text: "WOMEN'S" },
  { id: "k1", text: "KIDS'" },
  { id: "n1", text: "NEW SEASON" },
  { id: "s1", text: "SPRING 2024" },
  { id: "c1", text: "CLASSICS" },
  { id: "p1", text: "PERFORMANCE" },
  { id: "m2", text: "MEN'S" },
  { id: "w2", text: "WOMEN'S" },
  { id: "k2", text: "KIDS'" },
  { id: "n2", text: "NEW SEASON" },
  { id: "s2", text: "SPRING 2024" },
  { id: "c2", text: "CLASSICS" },
  { id: "p2", text: "PERFORMANCE" },
];

export default function CollectionsPage() {
  return (
    <main
      className="bg-background min-h-screen"
      data-ocid="collections.section"
    >
      {/* Editorial Hero */}
      <section className="relative overflow-hidden border-b border-foreground/8">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ghost heading */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none pr-4 hidden xl:block"
              aria-hidden="true"
            >
              <span
                className="font-display font-extrabold text-foreground/[0.04] leading-none"
                style={{ fontSize: "clamp(6rem, 18vw, 18rem)" }}
              >
                SHOES
              </span>
            </div>

            <p className="text-electric font-bold text-[10px] tracking-[0.35em] uppercase mb-4">
              Foot Rush — Spring / Summer 2024
            </p>
            <h1
              className="font-display font-extrabold leading-none text-foreground relative z-10"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              OUR
              <br />
              <span className="text-electric">COLLECTIONS</span>
            </h1>
            <div className="w-24 h-1 bg-electric mt-6" />
            <p className="text-foreground/50 mt-6 max-w-md text-base leading-relaxed">
              Three distinct worlds. One relentless standard. Discover footwear
              engineered for every dimension of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Split-screen Cards */}
      <section
        className="max-w-7xl mx-auto px-4 py-16 space-y-4"
        data-ocid="collections.list"
      >
        {COLLECTIONS.map((col, i) => (
          <Link
            key={col.id}
            to="/products"
            search={{ category: col.category }}
            data-ocid={`collections.item.${i + 1}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative overflow-hidden h-[50vh] md:h-[55vh] group cursor-pointer flex"
            >
              {/* Image half */}
              <div
                className={`${i % 2 === 0 ? "order-1" : "order-2"} w-[55%] relative overflow-hidden`}
              >
                <img
                  src={col.image}
                  alt={col.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-400" />
              </div>

              {/* Text half */}
              <div
                className={`${
                  i % 2 === 0 ? "order-2" : "order-1"
                } w-[45%] flex flex-col justify-center px-10 md:px-16 bg-card border border-foreground/8`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-electric/70 mb-3">
                  0{i + 1} / {col.sub}
                </p>
                <h2
                  className="font-display font-extrabold text-foreground leading-none mb-4"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                >
                  {col.label}
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-xs mb-8">
                  {col.description}
                </p>
                <div className="flex items-center gap-3 text-electric font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all duration-300">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                {/* Blue bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden bg-electric py-3 my-4">
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

      {/* Season Highlights grid */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-14">
            <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
              HAND-PICKED
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
              SEASON
              <br />
              <span className="text-foreground/30">HIGHLIGHTS</span>
            </h2>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            data-ocid="collections.table"
          >
            {SAMPLE_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
