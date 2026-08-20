import { X, Minus, Plus } from "@phosphor-icons/react";
import { CartEntry } from "@/types";
import { CD } from "@/constants/styles";
import { parsePrice, formatNaira } from "@/utils/price";

interface CartSidebarProps {
  cart: CartEntry[];
  open: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartSidebar({
  cart, open, onClose, onUpdateQty, onRemove,
}: CartSidebarProps) {
  const total = cart.reduce((s, e) => s + parsePrice(e.price) * e.qty, 0);

  const handleShare = () => {
    const lines = cart.map((e) => `${e.qty}x ${e.name} — ${e.price}`);
    const text = ["*Monarch's Dining Order*", "", ...lines, "", `*Estimated Total: ${formatNaira(total)}*`].join("\n");
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    window.open(`https://wa.me/2349072353662?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-300 ease-in-out
          bg-white dark:bg-[#111111] border-l border-gray-100 dark:border-[#2a2a2a]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-[#2a2a2a] shrink-0">
          <h2 className="text-[#070d17] dark:text-[#faf4ec] text-[28px] leading-none" style={{ ...CD, fontWeight: 700 }}>
            My Cart
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors" aria-label="Close cart">
            <X size={20} className="text-gray-700 dark:text-[#faf4ec]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center py-20 text-center px-4">
              <p className="text-gray-400 dark:text-[#666] text-[14px] leading-relaxed" style={CD}>
                No items added yet. Tap the &ldquo;Add to Cart&rdquo; button on any dish to compile your list!
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100 dark:divide-[#2a2a2a]">
              {cart.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#070d17] dark:text-[#faf4ec] text-[14px] font-semibold leading-snug" style={CD}>{entry.name}</p>
                    <p className="text-gray-500 dark:text-[#888] text-[12px] mt-0.5">
                      {entry.qty > 1
                        ? <>{entry.price} × {entry.qty} = <span className="text-[#ff572d] font-semibold">{formatNaira(parsePrice(entry.price) * entry.qty)}</span></>
                        : entry.price
                      }
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 border border-gray-200 dark:border-[#333] rounded-lg px-2 py-1">
                      <button onClick={() => onUpdateQty(entry.id, entry.qty - 1)} className="text-gray-400 dark:text-[#888] hover:text-black dark:hover:text-white transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="text-[13px] dark:text-[#faf4ec] w-5 text-center tabular-nums" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                        {entry.qty}
                      </span>
                      <button onClick={() => onUpdateQty(entry.id, entry.qty + 1)} className="text-gray-400 dark:text-[#888] hover:text-black dark:hover:text-white transition-colors">
                        <Plus size={11} />
                      </button>
                    </div>
                    <button onClick={() => onRemove(entry.id)} className="text-[#ff572d] text-[11px] hover:underline" style={CD}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-[#2a2a2a] px-5 py-5 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-gray-500 dark:text-[#888]" style={CD}>Estimated Total:</span>
            <span className="text-[15px] font-bold text-[#070d17] dark:text-[#faf4ec]" style={CD}>{formatNaira(total)}</span>
          </div>
          <p className="text-gray-400 dark:text-[#555] text-[11px] leading-relaxed">
            Click the button below to copy and complete your order on WhatsApp
          </p>
          <button
            onClick={handleShare}
            disabled={cart.length === 0}
            className="w-full bg-[#262626] dark:bg-[#ff572d] text-white rounded-xl py-3 text-[14px] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ ...CD, fontWeight: 600 }}
          >
            Copy list to share
          </button>
        </div>
      </aside>
    </>
  );
}
