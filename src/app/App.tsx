import { useCart } from "@/hooks/useCart";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Navbar } from "@/features/navigation/components/Navbar";
import { Hero } from "@/features/hero/components/Hero";
import { MenuSection } from "@/features/menu/components/MenuSection";
import { CartSidebar } from "@/features/cart/components/CartSidebar";
import { DeliveryBanner } from "@/components/DeliveryBanner";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/constants/menuData";
import imgTomato1 from "@/imports/Desktop2/ef16c2c75d9d118fedbea1902e98a0debbd796f3.png";
import imgLayer82 from "@/imports/Desktop2/8b795082b7999cb4df7ba1198e88badcd648ea83.png";

export default function App() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    handleAdd,
    handleUpdateQty,
    handleRemove,
    cartCount,
  } = useCart();

  const { isDark, toggleDarkMode } = useDarkMode();

  const scrollToMenu = () => {
    document.getElementById("mains")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Adding the `dark` class here activates Tailwind's dark: variants site-wide
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300 bg-white dark:bg-[#050505]">
        {/* Floating food illustration backgrounds repeated uniformly down the page */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {Array.from({ length: 10 }).map((_, i) => {
            const top = 250 + i * 600;
            const isLeft = i % 2 === 0;
            const isTomato = (i % 4) < 2;
            const img = isTomato ? imgTomato1 : imgLayer82;
            const widthClass = isTomato ? "w-24 sm:w-40" : "w-48 sm:w-80";
            const opacityClass = isTomato ? "opacity-80" : "opacity-90";
            
            const transform = isTomato
              ? `translateX(${isLeft ? "-75%" : "75%"})`
              : `translateX(${isLeft ? "-65%" : "65%"}) rotate(${isLeft ? "45deg" : "-15deg"})`;

            const style: React.CSSProperties = {
              top: `${top}px`,
              transform,
            };
            if (isLeft) {
              style.left = 0;
            } else {
              style.right = 0;
            }

            return (
              <img
                key={i}
                src={img}
                alt=""
                aria-hidden
                className={`absolute ${widthClass} ${opacityClass}`}
                style={style}
              />
            );
          })}
        </div>

        <Navbar
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          isDark={isDark}
          onToggleDark={toggleDarkMode}
        />

        <Hero
          isDark={isDark}
          onExplore={scrollToMenu}
          onCart={() => setCartOpen(true)}
        />

        <main className="relative z-10 max-w-[1082px] mx-auto px-4 sm:px-6 pb-20 flex flex-col gap-16 sm:gap-20">
          {CATEGORIES.map((cat) => (
            <MenuSection key={cat.id} category={cat} onAdd={handleAdd} />
          ))}
        </main>

        <DeliveryBanner />
        <Footer />

        <CartSidebar
          cart={cart}
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
