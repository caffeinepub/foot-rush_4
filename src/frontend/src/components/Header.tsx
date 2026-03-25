import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Check,
  Menu,
  Palette,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import { useCart } from "../store/cartStore";
import { type ThemeId, themes, useTheme } from "../store/themeStore";

const navLinks = [
  { label: "MEN", href: "/products?category=menShoes" },
  { label: "WOMEN", href: "/products?category=womenShoes" },
  { label: "KIDS", href: "/products?category=kidsShoes" },
  { label: "NEW ARRIVALS", href: "/products" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "ABOUT", href: "/about" },
  { label: "SALE", href: "/products", sale: true },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { data: isAdmin } = useIsAdmin();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      {/* Rainbow accent top border */}
      <div className="h-1 rainbow-bar w-full" />

      {/* Promo bar */}
      <div
        className="text-[10px] text-center py-2 flex items-center justify-center gap-3 border-b border-foreground/6"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.58 0.26 300 / 8%), oklch(0.62 0.24 340 / 10%), oklch(0.62 0.22 35 / 8%))",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: "oklch(0.58 0.26 300)" }}
        />
        <span className="text-foreground/60 tracking-widest uppercase font-bold">
          Free Shipping on Orders Over{" "}
          <span className="text-electric font-extrabold">₹5,999</span>
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: "oklch(0.62 0.22 35)" }}
        />
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
          <nav className="hidden lg:flex items-center gap-6 flex-1">
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
                        ? "text-foreground"
                        : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rainbow-bar transition-all duration-300 ${
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
                    : "text-foreground/55 hover:text-foreground"
                }`}
              >
                ADMIN
              </Link>
            )}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/30" />
              <input
                placeholder="Search shoes..."
                className="pl-9 pr-3 py-2 w-full rounded-full text-sm bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-electric/50 transition-colors"
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
              className="hidden md:flex text-[11px] text-foreground/50 hover:text-electric hover:bg-electric/8 gap-1 tracking-widest uppercase font-bold rounded-full"
            >
              <User className="w-4 h-4" />
              {isLoggedIn ? "Logout" : "Login"}
            </Button>

            {/* Theme switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-electric hover:bg-electric/8 rounded-full"
                  data-ocid="header.theme_button"
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="p-3 min-w-[160px]"
                data-ocid="theme.dropdown_menu"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mb-2 px-1">
                  Color Theme
                </p>
                <div className="flex flex-col gap-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id as ThemeId)}
                      data-ocid={`theme.${t.id}.button`}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-foreground/5 transition-colors w-full text-left"
                    >
                      <span className="relative shrink-0">
                        <span
                          className="w-5 h-5 rounded-full block border border-black/10"
                          style={{ background: t.swatch }}
                        />
                        {theme === t.id && (
                          <Check
                            className="absolute inset-0 m-auto w-3 h-3 text-white drop-shadow"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                      <span className="text-xs font-semibold text-foreground/70">
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground/60 hover:text-electric hover:bg-electric/8 rounded-full"
              data-ocid="header.cart_button"
              onClick={openCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] font-extrabold rounded-full px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.26 300), oklch(0.62 0.26 340))",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground/60 hover:text-electric hover:bg-electric/8 rounded-full"
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
          <div className="lg:hidden border-t border-foreground/8 bg-white/95 backdrop-blur-md px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.split("?")[0]}
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-bold tracking-widest uppercase ${
                  link.sale ? "text-sale" : "text-foreground/65"
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
              className="border-electric/20 text-electric hover:text-white hover:bg-electric w-fit rounded-full"
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
