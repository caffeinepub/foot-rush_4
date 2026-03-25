import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-secondary border-t border-foreground/8">
      {/* Brand statement */}
      <div className="border-b border-foreground/6 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p
            className="font-display font-extrabold text-foreground/[0.05] leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
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
          <p className="text-sm text-foreground/45 leading-relaxed max-w-xs">
            Engineered for speed. Built for life. Premium footwear for every
            stride.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://instagram.com"
              className="w-8 h-8 border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-electric hover:border-electric transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              className="w-8 h-8 border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-electric hover:border-electric transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              className="w-8 h-8 border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-electric hover:border-electric transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6 text-electric">
            Shop
          </h4>
          <ul className="space-y-3 text-sm text-foreground/45">
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
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/collections"
                data-ocid="footer.link"
                className="hover:text-foreground transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                data-ocid="footer.link"
                className="hover:text-foreground transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                search={{ category: undefined }}
                data-ocid="footer.link"
                className="hover:text-foreground transition-colors text-sale"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6 text-electric">
            Support
          </h4>
          <ul className="space-y-3 text-sm text-foreground/45">
            {[
              "Size Guide",
              "Shipping & Returns",
              "Track My Order",
              "FAQs",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.25em] mb-6 text-electric">
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
                  <p className="text-sm font-semibold text-foreground/65">
                    {item.title}
                  </p>
                  <p className="text-xs text-foreground/35">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/8">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/35">
          <span>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/70 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span>All rights reserved. Foot Rush™</span>
        </div>
      </div>
    </footer>
  );
}
