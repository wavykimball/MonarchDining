import { CD } from "@/constants/styles";
import { svgPaths, svgPathsDark } from "@/constants/svgPaths";
import imgVerifiedCopy131 from "@/imports/Desktop2/ef708a855fffb0c4132837df500df1a290411342.png";

interface HeroProps {
  isDark: boolean;
  onExplore: () => void;
  onCart: () => void;
}

export function Hero({ isDark, onExplore, onCart }: HeroProps) {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-20 transition-colors duration-300
      bg-white dark:bg-[#050505]">

      <div className="flex flex-col items-center text-center z-10 w-full max-w-3xl">
        {/* Title */}
        <h1
          className="text-[clamp(2rem,9vw,6rem)] leading-none uppercase transition-colors duration-300
            text-black dark:text-white whitespace-nowrap"
          style={{ ...CD, fontWeight: 700 }}
        >
          Monarch's Dining
        </h1>
        <h2
          className="text-[clamp(2.4rem,8vw,5rem)] leading-none uppercase mt-1 transition-colors duration-300
            text-black dark:text-white"
          style={{ ...CD, fontWeight: 500 }}
        >
          Food Menu
        </h2>

        {/* Wavy underline — different SVG path in dark mode */}
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
                className="text-[15px] transition-colors duration-300 text-black dark:text-white"
                style={{ ...CD, fontWeight: 500 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <button
            onClick={onExplore}
            className="px-6 py-3 bg-[#0c131f] text-[#faf4ec] text-[15px] rounded-lg transition-transform hover:scale-105 active:scale-95"
            style={{ ...CD, fontWeight: 500 }}
          >
            Explore Menu
          </button>
          <button
            onClick={onCart}
            className="group px-6 py-3 border border-[#0c131f] text-[#0c131f] dark:border-[#faf4ec] dark:text-[#faf4ec] text-[15px] rounded-lg flex items-center gap-2 transition-colors hover:bg-[#0c131f] hover:text-[#faf4ec] dark:hover:bg-[#faf4ec] dark:hover:text-[#0c131f]"
            style={{ ...CD, fontWeight: 500 }}
          >
            View Cart
            <svg fill="none" viewBox="0 0 16 16" width="10" height="10" className="transition-transform group-hover:translate-x-1">
              {/* arrow fill: orange in light, cream in dark */}
              <path d={svgPaths.p8582c00} fill={isDark ? "#faf4ec" : "#FF572D"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
