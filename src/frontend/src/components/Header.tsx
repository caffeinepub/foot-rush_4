import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import { useCart } from "../store/cartStore";

const navLinks = [
  { label: "MEN", href: "/products?category=menShoes" },
  { label: "WOMEN", href: "/products?category=womenShoes" },
  { label: "KIDS", href: "/products?category=kidsShoes" },
  { label: "NEW ARRIVALS", href: "/products" },
  { label: "SALE", href: "/products", sale: true },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { data: isAdmin } = useIsAdmin();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Amber top border */}
      <div className="h-0.5 bg-electric w-full" />

      {/* Promo bar */}
      <div className="bg-black text-[10px] text-center py-2 flex items-center justify-center gap-3 border-b border-white/5">
        <span className="w-1 h-1 rounded-full bg-electric inline-block" />
        <span className="text-white/50 tracking-widest uppercase font-bold">
          Free Shipping on Orders Over{" "}
          <span className="text-electric">₹5,999</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-electric inline-block" />
      </div>

      {/* Main header */}
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center mr-4 shrink-0"
          >
            <img
              src="/assets/uploads/whatsapp_image_2026-03-24_at_12.17.32_pm-019d2071-dd70-7448-b573-81ed8313e846-1.jpeg"
              alt="Foot Rush Shoecare"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.label}
                  to={link.href.split("?")[0]}
                  search={
                    link.href.includes("?")
                      ? Object.fromEntries(
                          new URLSearchParams(link.href.split("?")[1]),
                        )
                      : {}
                  }
                  data-ocid="nav.link"
                  className={`text-[11px] font-bold tracking-widest uppercase relative pb-0.5 transition-colors ${
                    link.sale
                      ? "text-sale"
                      : isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Amber underline on active */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-electric transition-all duration-300 ${
                      isActive && !link.sale
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                data-ocid="nav.link"
                className={`text-[11px] font-bold tracking-widest uppercase relative pb-0.5 transition-colors ${
                  location.pathname === "/admin"
                    ? "text-electric"
                    : "text-white/55 hover:text-white"
                }`}
              >
                ADMIN
              </Link>
            )}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                placeholder="Search shoes..."
                className="pl-9 pr-3 py-2 w-full rounded-none text-sm bg-white/5 border border-white/8 text-white placeholder:text-white/25 focus:outline-none focus:border-electric/50 transition-colors"
                data-ocid="header.search_input"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={isLoggedIn ? clear : login}
              data-ocid="header.login_button"
              className="hidden md:flex text-[11px] text-white/50 hover:text-white hover:bg-white/5 gap-1 tracking-widest uppercase font-bold rounded-none"
            >
              <User className="w-4 h-4" />
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white/60 hover:text-white hover:bg-white/5 rounded-none"
              data-ocid="header.cart_button"
              onClick={openCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-electric text-black text-[10px] font-extrabold rounded-full px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white/60 hover:text-white hover:bg-white/5 rounded-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="header.menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/6 bg-black/90 backdrop-blur-md px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.split("?")[0]}
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-bold tracking-widest uppercase ${
                  link.sale ? "text-sale" : "text-white/65"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold tracking-widest uppercase text-electric"
              >
                ADMIN
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={isLoggedIn ? clear : login}
              data-ocid="header.login_button"
              className="border-white/15 text-white/60 hover:text-white w-fit rounded-none"
            >
              <User className="w-4 h-4 mr-1" />
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
