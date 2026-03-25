import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, oklch(0.2 0.1 280), oklch(0.16 0.08 240))",
      }}
    >
      {/* Brand statement */}
      <div className="border-b border-white/8 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p
            className="font-display font-extrabold leading-none tracking-tight select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              color: "oklch(1 0 0 / 4%)",
            }}
          >
            EVERY STEP FORWARD
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <img
            src="/assets/uploads/whatsapp_image_2026-03-24_at_12.17.32_pm-019d2071-dd70-7448-b573-81ed8313e846-1.jpeg"
            alt="Foot Rush Shoecare"
            className="h-10 w-auto object-contain mb-5"
          />
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "oklch(0.75 0.05 280)" }}
          >
            Engineered for speed. Built for life. Premium footwear for every
            stride.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[
              {
                href: "https://instagram.com",
                icon: Instagram,
                label: "Instagram",
              },
              { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
              { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  borderColor: "oklch(1 0 0 / 15%)",
                  color: "oklch(0.7 0.08 300)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, oklch(0.58 0.26 300), oklch(0.58 0.24 220))";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(1 0 0 / 15%)";
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.7 0.08 300)";
                }}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4
            className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 300), oklch(0.78 0.18 220))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shop
          </h4>
          <ul
            className="space-y-3 text-sm"
            style={{ color: "oklch(0.65 0.05 280)" }}
          >
            {[
              { label: "Men's Shoes", to: "/products", cat: "menShoes" },
              { label: "Women's Shoes", to: "/products", cat: "womenShoes" },
              { label: "Kids' Shoes", to: "/products", cat: "kidsShoes" },
              { label: "New Arrivals", to: "/products", cat: undefined },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  search={{ category: item.cat }}
                  data-ocid="footer.link"
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/collections"
                data-ocid="footer.link"
                className="hover:text-white transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                data-ocid="footer.link"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                search={{ category: undefined }}
                data-ocid="footer.link"
                className="transition-colors"
                style={{ color: "oklch(0.7 0.22 35)" }}
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4
            className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 300), oklch(0.78 0.18 220))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Support
          </h4>
          <ul
            className="space-y-3 text-sm"
            style={{ color: "oklch(0.65 0.05 280)" }}
          >
            {[
              "Size Guide",
              "Shipping & Returns",
              "Track My Order",
              "FAQs",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <span className="hover:text-white cursor-pointer transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Promise */}
        <div>
          <h4
            className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 300), oklch(0.78 0.18 220))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Promise
          </h4>
          <ul className="space-y-4">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On orders over ₹5,999",
              },
              {
                icon: "↩",
                title: "Easy Returns",
                desc: "30-day return policy",
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "256-bit SSL encryption",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.82 0.08 280)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.6 0.04 280)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rainbow divider */}
      <div className="h-px rainbow-bar" />

      <div
        className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
        style={{ color: "oklch(0.55 0.05 280)" }}
      >
        <span>
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </span>
        <span>All rights reserved. Foot Rush™</span>
      </div>
    </footer>
  );
}
