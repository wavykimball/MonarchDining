import { CD } from "@/constants/styles";
import { svgPaths, svgPathsDark } from "@/constants/svgPaths";
import { ArrowRight } from "@phosphor-icons/react";
import imgVerifiedCopy131 from "@/imports/Desktop2/ef708a855fffb0c4132837df500df1a290411342.png";
import heroBg from "@/imports/hero_bg.png";

interface HeroProps {
  isDark: boolean;
  onExplore: () => void;
  onCart: () => void;
}

export function Hero({ isDark, onExplore, onCart }: HeroProps) {
  return (
    <section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-20 transition-colors duration-300"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      <div className="relative flex flex-col items-center text-center z-10 w-full max-w-3xl">
        {/* Title */}
        <h1
          className="text-[clamp(2rem,9vw,6rem)] leading-none uppercase transition-colors duration-300 text-white whitespace-nowrap"
          style={{ ...CD, fontWeight: 700 }}
        >
          Monarch's Dining
        </h1>
        <h2
          className="text-[clamp(2.4rem,8vw,5rem)] leading-none uppercase mt-1 transition-colors duration-300 text-white"
          style={{ ...CD, fontWeight: 500 }}
        >
          Food Menu
        </h2>

        {/* Wavy underline */}
        <div className="mt-2 w-full max-w-xs sm:max-w-sm">
          <svg fill="none" viewBox={isDark ? "0 0 360 34" : "0 0 360 19.528"} width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
            <path d={isDark ? svgPathsDark.p109c3900 : svgPaths.p2fe19380} fill="#FF572D" />
          </svg>
        </div>

        {/* Service badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-6">
          {["Pre-Order", "Pickup", "Delivery"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <img src={imgVerifiedCopy131} alt="" aria-hidden className="w-4 h-4 object-contain" />
              <span
                className="text-[15px] text-white transition-colors duration-300"
                style={{ ...CD, fontWeight: 500 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
          <button
            onClick={onExplore}
            className="px-6 py-3 h-[46px] bg-[#FF572D] hover:bg-[#e04d28] text-white text-[15px] rounded-lg transition-colors duration-200"
            style={{ ...CD, fontWeight: 500 }}
          >
            Explore Menu
          </button>
          <button
            onClick={onCart}
            className="group px-6 py-3 h-[46px] flex items-center gap-1.5 text-[15px] text-white underline underline-offset-4 decoration-white hover:opacity-70 transition-opacity"
            style={{ ...CD, fontWeight: 500 }}
          >
            View Cart
            <ArrowRight size={16} weight="bold" className="text-white transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
