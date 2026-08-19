import { useState } from "react";
import { X, ShoppingCart, AlignJustify, Sun, Moon } from "lucide-react";
import { CD } from "@/constants/styles";
import { LogoMark } from "@/components/LogoMark";
import { CATEGORIES } from "@/constants/menuData";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function Navbar({ cartCount, onCartOpen, isDark, onToggleDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
      {/* Pill */}
      <nav className="border border-[#ff572d] rounded-full w-full max-w-[1080px] h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 transition-colors duration-300
        bg-white dark:bg-[#0d0d0d]">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <LogoMark isDark={isDark} />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="text-[#555] dark:text-[#a3a3a3] text-[13px] hover:text-[#ff572d] dark:hover:text-[#ff572d] transition-colors uppercase"
              style={{ ...CD, fontWeight: 500 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative bg-[#ff572d] flex items-center justify-center gap-2 h-10 px-4 rounded-full text-[#faf4ec] text-[13px] hover:bg-[#e04d28] transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            Cart
            <ShoppingCart size={13} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#262626] text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] px-1 font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dark / light toggle — matches design's Button4 */}
          <button
            onClick={onToggleDark}
            className="flex items-center justify-center h-10 px-4 rounded-full transition-colors
              bg-[#030712] dark:bg-[#faf4ec]
              hover:opacity-80"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark
              ? <Sun size={16} className="text-[#030712]" />
              : <Moon size={16} className="text-[#faf4ec]" />
            }
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-[#222] rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X size={18} className="text-gray-700 dark:text-[#faf4ec]" />
              : <AlignJustify size={18} className="text-gray-700 dark:text-[#faf4ec]" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {mobileOpen && (
        <div className="absolute top-[80px] inset-x-3 bg-white dark:bg-[#0d0d0d] border border-gray-100 dark:border-[#222] rounded-2xl shadow-xl p-5 flex flex-col gap-4 md:hidden z-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="text-left py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#333] dark:text-[#faf4ec] text-[15px] uppercase"
              style={{ ...CD, fontWeight: 500 }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
