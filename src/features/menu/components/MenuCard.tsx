import { useState } from "react";
import { MenuItem } from "@/types";
import { CD } from "@/constants/styles";
import { svgPaths } from "@/constants/svgPaths";

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem, qty: number) => void;
}

export function MenuCard({ item, onAdd }: MenuCardProps) {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-[#f0e8da] dark:border-[#2a2a2a]">
      {/* Gradient header — unchanged in both modes */}
      <div
        className="flex items-center justify-between px-3 py-3 gap-2 min-h-[54px]"
        style={{ background: "linear-gradient(to right, #351100, #aa3700)" }}
      >
        <span className="text-white text-[15px] leading-snug flex-1" style={{ ...CD, fontWeight: 600 }}>
          {item.name}
        </span>
        <span className="text-white text-[13px] whitespace-nowrap shrink-0 ml-2" style={{ ...CD, fontWeight: 500 }}>
          {item.price}
        </span>
      </div>

      {/* Cream body — unchanged in both modes (matches the Figma design) */}
      <div className="bg-[#faf4ec] flex flex-col px-3 pt-3 pb-3 gap-3 flex-1">
        <p className="text-black text-[13px] leading-relaxed flex-1" style={{ ...CD, fontWeight: 400 }}>
          {item.description}
        </p>
        <div className="border-t border-dashed border-black/20" />
        <div className="flex items-center justify-between gap-2">
          {/* Qty stepper */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full bg-[#ff572d] flex items-center justify-center hover:bg-[#e04d28] transition-colors active:scale-95"
              aria-label="Decrease quantity"
            >
              <svg width="11" height="1.5" viewBox="0 0 11.5 1.5" fill="none">
                <path d="M10.75 0.75L0.75 0.75" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
            <span className="text-[#001529] text-[14px] w-5 text-center tabular-nums" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 rounded-full bg-[#ff572d] flex items-center justify-center hover:bg-[#e04d28] transition-colors active:scale-95"
              aria-label="Increase quantity"
            >
              <svg fill="none" height="10" viewBox="0 0 10 10" width="10">
                <path d={svgPaths.p1b5e77e0} fill="white" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => { onAdd(item, qty); setQty(1); }}
            className="bg-[#262626] text-white text-[13px] rounded-lg px-3 py-1.5 hover:bg-[#3a3a3a] transition-colors active:scale-95 whitespace-nowrap"
            style={{ ...CD, fontWeight: 500 }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
