import { useState, useEffect } from "react";
import { X, ShoppingCart, List, Sun, Moon } from "@phosphor-icons/react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        const mainTop = mainEl.getBoundingClientRect().top;
        setScrolled(mainTop <= 100);
      } else {
        setScrolled(window.scrollY > 500);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-30 flex justify-center px-3 pt-3 pb-3 sm:px-5 sm:pt-5 sm:pb-3 transition-all duration-300${scrolled ? (isDark ? " bg-black" : " bg-white") : ""}`}>
      {/* Pill */}
      <nav
        className={`border border-white rounded-full w-full max-w-[1080px] h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 bg-white${scrolled ? " shadow-[0_4px_24px_rgba(0,0,0,0.18)]" : ""}`}
      >
        
        {/* Desktop Brand Logo */}
        <button
          onClick={scrollToHero}
          className="hidden md:flex items-center shrink-0 cursor-pointer focus:outline-none"
          aria-label="Go to top"
        >
          <LogoMark isDark={isDark} />
        </button>

        {/* Mobile Brand Logo Icon */}
        <button
          onClick={scrollToHero}
          className="flex md:hidden items-center shrink-0 cursor-pointer focus:outline-none"
          aria-label="Go to top"
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-auto text-black"
          >
            <g clipPath="url(#clip0_485_9601)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3604 31.3108C18.551 31.3108 23.5695 26.2923 23.5695 20.1017C23.5695 13.9112 18.551 8.8927 12.3604 8.8927C6.16984 8.8927 1.15137 13.9112 1.15137 20.1017C1.15137 26.2923 6.16984 31.3108 12.3604 31.3108Z"
                stroke="currentColor"
                strokeWidth="0.574126"
                strokeMiterlimit="22.9256"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.223 16.4852L13.2436 16.912L13.5719 16.8094C17.1036 15.7051 17.1832 25.1626 11.1772 23.396C10.7005 23.2559 10.1816 22.9614 10.1816 22.9614C10.1816 22.9614 10.527 23.3938 10.8967 23.6064C14.2363 25.5264 17.4327 23.616 17.8516 20.7599C18.0059 19.7083 17.8517 18.9651 17.6694 18.4322C17.1351 16.8704 15.041 15.9988 13.5115 16.3912C13.4552 16.4057 13.2738 16.4664 13.223 16.4852Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.0478497"
                strokeMiterlimit="22.9256"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3749 15.7618L14.0392 15.7477C14.0392 15.7477 13.7138 15.8772 13.5085 16.0753C13.0525 16.5151 13.292 18.2362 13.2631 18.8825C13.3358 19.7164 13.5113 20.0256 13.8243 20.7338C14.2258 21.642 14.1078 23.138 12.921 23.2829C12.3902 23.3476 11.8864 22.8637 11.7626 22.6904C11.36 22.1267 11.495 21.3925 11.7375 20.7863C12.1241 19.8198 12.1473 18.8738 12.0605 17.7335L12.0133 17.1127L10.0694 21.7835L8.23253 17.7032L8.27458 21.7134L8.30266 22.4426C8.41477 23.0781 8.80551 23.1375 9.34317 23.3514L6.61719 23.3329C7.11648 23.1152 7.48525 23.1009 7.59998 22.4984C7.6742 22.1089 7.61858 19.5128 7.61858 19.5128L7.63708 17.2875C7.67052 16.3612 7.68696 16.2668 6.94002 15.8187H8.70802L10.476 19.6961L11.9528 16.3175C11.9085 16.136 11.5018 15.761 11.3749 15.7617V15.7618L11.3749 15.7618Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.0478497"
                strokeMiterlimit="22.9256"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.1183 13.2972C6.00979 13.5897 5.93369 13.4743 5.71325 13.7622C5.26247 14.3509 5.07998 14.4755 4.62443 15.2525C2.19199 19.4022 3.34185 24.6119 7.10657 27.2709C11.862 30.6296 18.2725 28.6428 20.4669 23.4897C21.7326 20.5173 21.3109 16.7688 19.2155 14.2458L18.8421 13.7881C18.7489 13.6665 18.7501 13.6808 18.6236 13.5715C18.4629 13.4327 18.4652 13.421 18.4167 13.2957C19.0153 13.6915 19.7545 14.5921 20.1814 15.2032C21.9162 17.6864 22.1813 21.111 21.0236 23.9147C20.7855 24.4911 20.4321 25.1758 20.0709 25.6716C19.5094 26.4423 19.2738 26.7398 18.5656 27.3584C18.4646 27.4466 18.4244 27.5136 18.3218 27.5957C16.7433 28.8603 14.7185 29.763 12.2685 29.7657C10.1758 29.768 8.08636 28.9948 6.76681 28.0058C6.00714 27.4364 5.51706 27.0073 4.8906 26.2507L4.13892 25.169C2.19503 21.9511 2.36243 17.6709 4.72517 14.6996C5.05963 14.2789 5.69766 13.5601 6.1183 13.2972Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.72092 3.61141C10.4716 4.00604 10.8933 4.2837 11.2828 5.2197C11.5962 5.9726 11.7822 7.07908 11.3229 7.86206C10.4587 9.33552 7.5883 7.70819 7.8018 6.15341C8.44767 6.12029 8.83068 6.22315 9.20868 6.51532C9.44929 6.70133 9.49997 6.78518 9.61703 7.04328C9.70808 7.24389 9.83877 7.52103 9.81975 7.71865C9.92252 6.59371 9.53068 5.68018 8.77469 5.1883C8.05461 4.71965 6.56892 4.62052 5.71387 5.00017C5.92435 5.29462 7.41145 6.11875 7.89545 8.50888C7.96993 8.8766 7.97014 9.38418 8.19012 9.60861C8.50559 9.93033 8.80951 9.87376 9.33359 9.81141C10.2114 9.70698 11.1639 9.68868 12.0821 9.68295C16.0294 9.65832 16.0092 10.516 16.3583 8.59657C16.6007 7.2629 17.5181 5.6316 18.5657 5.04263C18.1222 4.63555 14.3272 4.17396 14.4607 7.4723C14.7125 7.13383 14.7029 6.08192 16.4774 6.14384C16.6892 7.72193 13.8443 9.28717 12.9656 7.8874C12.5111 7.16341 12.6488 6.03681 12.9663 5.25316C13.5205 3.88543 14.3605 3.82502 14.4604 3.59092C13.9783 3.35636 13.2768 3.30481 12.7906 2.31595C12.2552 1.2272 12.3754 0.927393 12.1923 0.165352C12.1887 0.150569 12.1853 0.136706 12.1813 0.122719C12.1773 0.108749 12.1714 0.0935067 12.1674 0.0810757C12.1634 0.06868 12.1549 0.0502899 12.1513 0.0403345C12.1478 0.0303614 12.1414 0.0125902 12.134 0C12.1004 0.0521112 12.1097 0.0246498 12.0851 0.126202C12.0258 0.370508 11.9906 0.842993 11.8754 1.25758C11.5768 2.33219 10.9798 3.44063 9.72093 3.61145L9.72088 3.61141H9.72092Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.0713 11.4403C8.36899 11.455 8.65934 11.3494 8.96808 11.3267C9.35368 11.2982 9.60764 11.2532 9.99588 11.2306C11.7324 11.1291 12.7537 11.0947 14.4886 11.2381C15.0519 11.2847 15.6807 11.4252 16.2073 11.4497C16.3522 10.325 15.4089 10.3854 14.938 10.3257C13.5257 10.1469 10.9454 10.0882 9.55639 10.3006C9.25004 10.3474 7.758 10.2829 8.0713 11.4402V11.4403Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_485_9601">
                <rect width="23.7876" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="text-[#030712] text-[13px] hover:text-[#ff572d] transition-colors uppercase"
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
            className="relative bg-[#ff572d] flex items-center justify-center gap-1.5 sm:gap-2 h-10 w-10 sm:w-auto sm:px-4 rounded-full text-[#faf4ec] text-[13px] hover:bg-[#e04d28] transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            <span className="hidden sm:inline">Cart</span>
            <ShoppingCart size={13} weight="bold" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#262626] text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] px-1 font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme switcher — desktop view only */}
          <button
            onClick={onToggleDark}
            className="hidden md:flex items-center justify-center h-10 px-4 rounded-full transition-colors bg-[#030712] hover:opacity-80"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark
              ? <Sun size={16} className="text-[#faf4ec]" />
              : <Moon size={16} className="text-[#faf4ec]" />
            }
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X size={18} className="text-[#030712]" />
              : <List size={18} className="text-[#030712]" />
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

          {/* Mobile Theme Toggle Button */}
          <div className="h-px bg-gray-100 dark:bg-[#222] my-1" />
          <button
            onClick={onToggleDark}
            className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#333] dark:text-[#faf4ec] text-[15px]"
            style={{ ...CD, fontWeight: 500 }}
          >
            <span className="uppercase">Theme</span>
            <div className="flex items-center gap-2">
              {isDark ? (
                <>
                  <Sun size={15} className="text-yellow-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-blue-500" />
                  <span>Dark Mode</span>
                </>
              )}
            </div>
          </button>
        </div>
      )}
    </header>
  );
}
