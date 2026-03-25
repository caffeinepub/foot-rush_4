import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Layers, Ruler, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "2024", label: "Est." },
  { value: "500+", label: "Models" },
  { value: "50K+", label: "Customers" },
  { value: "30-Day", label: "Returns" },
];

const values = [
  {
    Icon: Sparkles,
    title: "Performance",
    desc: "Every material, every component, every stitch is selected for maximum output. We don't cut corners — we engineer them out.",
  },
  {
    Icon: Layers,
    title: "Style",
    desc: "Fashion fades. Silhouette endures. Our design language is built for the long game — timeless shapes with contemporary edge.",
  },
  {
    Icon: Ruler,
    title: "Comfort",
    desc: "Ergonomic lasts, adaptive foam, and precision fit systems mean every pair feels like it was made for you — because it was.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Foot Rush Founded",
    desc: "Started with a vision: premium performance footwear for every Indian athlete, creator, and dreamer.",
  },
  {
    year: "2024",
    title: "First 1,000 Orders",
    desc: "Our community grew fast. The first thousand orders shipped within 90 days of launch — all across India.",
  },
  {
    year: "2024",
    title: "500 Models Catalog",
    desc: "We hit a landmark milestone: over 500 distinct models spanning men, women, and kids collections.",
  },
  {
    year: "2025",
    title: "Nationwide Shipping",
    desc: "Free delivery to every pin code in India. No minimums for metro cities, ₹5,999+ threshold for all others.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen" data-ocid="about.section">
      {/* Full-screen brand hero */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center border-b border-foreground/8">
        {/* Ghost text */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold leading-none text-foreground/[0.04]"
            style={{ fontSize: "clamp(6rem, 25vw, 22rem)" }}
          >
            RUSH
          </span>
        </div>

        {/* Electric accent line left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-electric to-transparent opacity-80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-electric font-bold text-[10px] tracking-[0.35em] uppercase mb-6">
              Foot Rush — Our Story
            </p>
            <h1
              className="font-display font-extrabold leading-none text-foreground"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
            >
              OUR
              <br />
              <span className="text-electric">STORY</span>
            </h1>
            <div className="w-24 h-1 bg-electric mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Mission 2-col */}
      <section className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-b border-foreground/8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display font-extrabold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            BUILT FOR
            <br />
            <span className="text-electric">EVERY STRIDE.</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-foreground/55 text-lg leading-relaxed mb-6">
            Foot Rush was born from a single belief: that every person —
            athlete, creator, student, professional — deserves footwear that
            doesn't compromise on performance, style, or comfort.
          </p>
          <p className="text-foreground/40 text-base leading-relaxed">
            We set out to create a brand that speaks to modern India. One that
            understands the pace of life here, the diversity of terrain, the
            ambition of its people. Every pair we make carries that mission
            forward.
          </p>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="bg-foreground py-16" data-ocid="about.panel">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <span className="font-display font-extrabold text-4xl md:text-5xl text-white leading-none">
                  {s.value}
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mt-2">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-24 border-b border-foreground/8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
              WHAT DRIVES US
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
              OUR <span className="text-foreground/30">VALUES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-foreground/8 border border-foreground/8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-10 flex flex-col gap-5"
              >
                <div className="w-12 h-12 bg-electric/10 border border-electric/20 flex items-center justify-center">
                  <v.Icon className="w-6 h-6 text-electric" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-foreground">
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-b border-foreground/8">
        <div className="mb-16">
          <p className="text-electric/60 font-display font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
            THE JOURNEY
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-none">
            MILESTONES
          </h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-foreground/8 hidden md:block" />

          <div className="space-y-0 divide-y divide-foreground/8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 py-10 items-start"
                data-ocid={`about.item.${i + 1}`}
              >
                {/* Year dot */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-[4.5rem] h-[4.5rem] bg-electric/10 border border-electric/25 flex items-center justify-center">
                    <span className="font-display font-extrabold text-sm text-electric">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden bg-foreground py-28"
        data-ocid="about.panel"
      >
        {/* Ghost text bg */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold text-white/[0.04] leading-none"
            style={{ fontSize: "clamp(6rem, 22vw, 20rem)" }}
          >
            SHOP
          </span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-electric/10 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-electric text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Ready to Rush?
            </p>
            <h2
              className="font-display font-extrabold text-white leading-none mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              START
              <br />
              <span className="text-electric">SHOPPING</span>
            </h2>
            <Link
              to="/products"
              search={{ category: undefined }}
              data-ocid="about.primary_button"
            >
              <Button className="bg-electric hover:bg-electric/90 text-white font-extrabold px-14 py-7 text-sm shadow-[0_0_30px_rgba(59,130,246,0.4)] uppercase tracking-[0.2em] rounded-full">
                Explore All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
