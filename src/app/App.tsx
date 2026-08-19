import { useState } from "react";
import { X, ShoppingCart, Plus, Minus, ChevronRight, AlignJustify, Sun, Moon } from "lucide-react";
import svgPaths from "@/imports/Desktop2/svg-tuk7pni1po";
import svgPathsDark from "@/imports/Desktop8/svg-7pgakcadjf";
import imgMotorbike1 from "@/imports/Desktop2/e195e67e394b1f013bc3ac0c53a003cc1ff0c3c2.png";
import imgTomato1 from "@/imports/Desktop2/ef16c2c75d9d118fedbea1902e98a0debbd796f3.png";
import imgLayer82 from "@/imports/Desktop2/8b795082b7999cb4df7ba1198e88badcd648ea83.png";
import imgVerifiedCopy131 from "@/imports/Desktop2/ef708a855fffb0c4132837df500df1a290411342.png";

const CD = { fontFamily: "'Clash Display', sans-serif" } as const;

// ─── Types ────────────────────────────────────────────────────────────────────
type MenuItem = { id: string; name: string; description: string; price: string };
type CartEntry = MenuItem & { qty: number };

// ─── Menu data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "mains", label: "Mains", heading: "Rice, Pasta & More",
    items: [
      { id: "coconut-rice", name: "Coconut Rice", description: "Coconut milk featuring tender shrimp, earthy liver, fluffy basmati rice and unique dried fish, this dish is a perfect blend of texture and taste.", price: "₦6,500" },
      { id: "spicy-beef-penne", name: "Spicy Beef Penne Pasta", description: "Bringing together the hearty flavors of beef with the satisfying texture of penne pasta. Incorporating chili flakes and garlic to create a robust flavor profile.", price: "₦8,000" },
      { id: "smokey-jollof", name: "Smokey Jollof Rice", description: "This iconic West African dish is renowned for its bold flavors and vibrant color. Cooked in a rich, spiced roasted tomato sauce and firewood that gives it a distinctive smoky taste.", price: "₦5,500" },
      { id: "special-fried-rice", name: "Special Fried Rice", description: "Basmati rice, mixed vegetables, eggs, shrimps, chicken, oyster sauce, soy sauce pre-cooked and stir-fried at high heat, fully absorbing the flavors of the sauces and seasonings.", price: "₦7,500" },
      { id: "waakye", name: "Waakye (Rice & Beans)", description: "Ghanaian staple of rice and beans simmered with traditional leaves, creating a distinctive aroma and depth of flavor. Hearty, comforting, and richly satisfying.", price: "₦7,000" },
      { id: "suya-pasta", name: "Suya Pasta", description: "Intense heat and nutty flavor coats the pasta, while the grilled suya meat adds a smoky richness — a satisfying meal that showcases the beauty of culinary fusion.", price: "₦7,500" },
      { id: "alfredo-pasta", name: "Alfredo Pasta", description: "The creamy Italian classic with rich and indulgent sauce. With cream and butter creating a luxurious texture.", price: "₦16,500" },
      { id: "seafood-pasta", name: "Seafood Pasta", description: "Sautéed with garlic and olive oil, tossed with al dente pasta, finished with white wine. Garnished with fresh herbs, shrimps, prawns, mussels and calamari.", price: "₦19,500" },
      { id: "asaro", name: "Asaro (Yam & Potato Pottage)", description: "Creamy yam & potato pottage with assorted proteins. Infused with spices and vibrant vegetables.", price: "₦7,000" },
      { id: "asun-jollof", name: "Asun Jollof Rice", description: "A spicy twist on the traditional Jollof rice, featuring succulent pieces of grilled goat meat. The smoky flavor enhances the rice and gives a satisfying asun flavour.", price: "₦8,500" },
      { id: "chinese-rice", name: "Chinese Rice", description: "Stir-fried rice with vegetables and seasoned with soy sauce. A versatile staple in Chinese cuisine.", price: "₦9,500" },
      { id: "dirty-rice", name: "Dirty Rice", description: "Originating from Louisiana, hearty and flavorful. The mix of spices and vegetables creates a rich, aromatic experience.", price: "₦7,500" },
      { id: "singapore-noodles", name: "Singapore Noodles", description: "Stir-fried rice vermicelli with a vibrant yellow curry powder. Combination of proteins and crunchy vegetables giving a delightful contrast.", price: "₦8,500" },
      { id: "native-rice", name: "Native Rice", description: "A fluffy, aromatic texture making it the perfect accompaniment to our rich palm oil sauce mixed with dried fish, cow skin and tripe.", price: "₦8,000" },
      { id: "jambalaya-rice", name: "Jambalaya Rice", description: "A culinary melting pot of Louisiana, absorbing all the flavors from the spices and meats to create a hearty, colorful and satisfying meal.", price: "₦8,500" },
      { id: "shrimp-noodles", name: "Shrimp Noodles", description: "Succulent shrimp stir-fried with vibrant vegetables and tossed with noodles, all seasoned to perfection.", price: "₦4,500" },
    ],
  },
  {
    id: "combos", label: "Combos", heading: "Monarch's Specials Combos",
    items: [
      { id: "coconut-shitto", name: "Coconut Rice & Shitto", description: "Aromatic Coconut Rice paired with our intense, spicy Ghanaian Shitto sauce loaded with diced deep-fried beef.", price: "₦10,000" },
      { id: "waakye-talia", name: "Waakye & Talia (Spaghetti) Shitto", description: "Classic Rice and Beans (Waakye) combined with spaghetti (Talia), served with a rich, savory Shitto sauce.", price: "₦10,000" },
      { id: "pottage-shitto", name: "Potato/Yam Pottage with Assorted & Shitto", description: "Hearty potato and yam pottage with assorted meats, accompanied by side Shitto sauce to enhance depth and heat.", price: "₦10,000" },
      { id: "suya-rice-shitto", name: "Monarch's Suya Rice Shitto", description: "Fragrant Suya-flavored rice served with a robust, spicy side of Ghanaian Shitto sauce.", price: "₦10,000" },
    ],
  },
  {
    id: "pepper-soup", label: "Pepper-Soup", heading: "Pepper Soup",
    items: [
      { id: "chicken-pepper-soup", name: "Chicken Pepper Soup", description: "A light but fiery broth filled with tender chicken pieces and aromatic native herbs. Comforting and medicinal.", price: "₦3,500" },
      { id: "goat-pepper-soup", name: "Goat Meat Pepper Soup", description: "A local favorite. Succulent, skin-on goat meat simmered in our signature hot pepper broth. Rich, bold flavor.", price: "₦5,000" },
      { id: "fried-cow-pepper", name: "Fried Cow Meat", description: "Hearty chunks of beef in a richly spiced pepper soup broth. Satisfyingly spicy.", price: "₦2,000" },
      { id: "catfish-pepper-soup", name: "Catfish Pepper Soup", description: "Freshly caught catfish cooked gently in a spicy, aromatic broth, retaining its tender texture. Commonly referred to as 'Point & Kill'.", price: "₦6,000" },
      { id: "plantain-cowtail", name: "Plantain & Cow-Tail", description: "Slow-simmered, tender cow-tail paired with sweet boiled plantain, cooked in a hot spice broth. The ultimate gourmet comfort soup.", price: "₦10,500" },
    ],
  },
  {
    id: "proteins", label: "Proteins", heading: "Protein",
    items: [
      { id: "fried-ram", name: "Fried Ram Meat", description: "Tender, deeply seasoned fried ram meat with a rich gamey finish.", price: "₦3,500" },
      { id: "fried-goat", name: "Fried Goat Meat", description: "Crispy and savory bite-sized pieces of fried seasoned goat meat.", price: "₦3,000" },
      { id: "fried-cow", name: "Fried Cow Meat", description: "Classic seasoned fried beef cubes, perfect with Jollof or fried rice.", price: "₦2,000" },
      { id: "spicy-chicken", name: "Spicy Chicken", description: "Juicy chicken portions coated in a spicy, peppery local marinade.", price: "₦5,500" },
      { id: "peppered-snails", name: "Peppered Snails", description: "Large, chewy snails tossed in a fiery, sweet pepper sauce. A premium delicacy.", price: "₦6,000" },
      { id: "peppered-gizzard", name: "Peppered Gizzard", description: "Crunchy gizzard pieces thoroughly coated in a spicy pepper sauce.", price: "₦3,000" },
      { id: "croaker-fish", name: "Grilled/Fried Croaker Fish", description: "Whole croaker fish, deeply seasoned and fried or grilled. Crispy skin and tender flesh.", price: "₦5,000" },
      { id: "peppered-kpomo", name: "Peppered Kpomo", description: "Chewy cow hide (Kpomo) cut into small cubes and stir-fried in a rich pepper sauce.", price: "₦1,000" },
      { id: "spicy-turkey", name: "Spicy Turkey", description: "Rich and meaty turkey parts, fried and tossed in a savory hot pepper glaze.", price: "₦6,500" },
      { id: "grilled-turkey", name: "Grilled/Fried Turkey", description: "Plain seasoned grilled or fried turkey, highlighting its natural rich taste.", price: "₦6,000" },
      { id: "prawns", name: "Prawns", description: "Plump, juicy prawns sautéed with herbs and garlic butter.", price: "₦7,000" },
      { id: "boiled-egg", name: "Boiled Egg", description: "A simple hard-boiled egg, ideal for pairing with Waakye or Rice.", price: "₦500" },
    ],
  },
  {
    id: "sides", label: "Sides", heading: "Sides",
    items: [
      { id: "coleslaw", name: "Coleslaw", description: "Creamy, crisp shredded cabbage and carrots. Served chilled.", price: "₦1,500" },
      { id: "fried-plantain", name: "Fried Plantain", description: "Sweet, caramelized fried ripe plantain slices (Dodo).", price: "₦1,500" },
      { id: "steamed-rice", name: "Steamed Basmati White Rice", description: "Fluffy, long-grain steamed Basmati white rice.", price: "₦2,500" },
      { id: "fries", name: "Fries (Yam, Irish & Sweet Potato)", description: "A trio of freshly fried root vegetable fries — Yam fries, Irish potato, and Sweet potato fries.", price: "₦2,500" },
      { id: "bbq-drumsticks", name: "Barbecue Drumsticks", description: "Tender chicken drumsticks glazed in a sweet, smoky BBQ sauce.", price: "₦8,000" },
      { id: "chicken-salad", name: "Chicken Salad", description: "Fresh garden salad topped with grilled chicken breast and creamy dressing.", price: "₦5,500" },
      { id: "caesar-salad", name: "Caesar Salad", description: "Crisp romaine lettuce tossed in Caesar dressing, croutons, and parmesan shavings.", price: "₦6,500" },
      { id: "beef-plantain", name: "Beef Stuffed Plantain", description: "Baked sweet plantain split and stuffed with savory, spiced minced beef.", price: "₦4,000" },
      { id: "honey-wings", name: "5pcs Honey Glazed Wings", description: "Five crispy chicken wings tossed in a sweet, sticky honey glaze.", price: "₦8,000" },
    ],
  },
  {
    id: "sauces", label: "Sauces", heading: "Dipping Sauces",
    items: [
      { id: "shitto", name: "Shitto", description: "A signature Ghanaian chili sauce — smoky, spicy, and richly seasoned with diced deep fried beef. Adds depth and heat to your meal.", price: "₦3,000" },
      { id: "tartar", name: "Tartar Sauce", description: "A must-have accompaniment for seafood lovers. Crafted with creamy mayonnaise, finely chopped pickles, capers, and a hint of lemon juice.", price: "₦2,000" },
      { id: "garlic-mayo", name: "Spicy Garlic Mayo Dip", description: "A bold and flavorful accompaniment that enhances any dish. Combines smooth mayonnaise with roasted garlic for depth.", price: "₦2,000" },
      { id: "boom-boom", name: "Boom Boom Sauce", description: "A bold and zesty blend with a tantalizing mix of mayonnaise, Sriracha, garlic, and lime juice. Ignites your taste buds.", price: "₦3,000" },
      { id: "palm-oil", name: "Palm Oil Sauce", description: "Traditional savory local palm oil condiment, rich in depth.", price: "₦1,000" },
      { id: "peppered-sauce", name: "Peppered Sauce", description: "Spicy pepper sauce. Complimentary with any orders of Fries.", price: "Free" },
    ],
  },
] as const;

type Category = (typeof CATEGORIES)[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parsePrice(price: string): number {
  if (price === "Free") return 0;
  return parseInt(price.replace(/[₦,]/g, ""), 10) || 0;
}
function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem, qty: number) => void }) {
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

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  cart, open, onClose, onUpdateQty, onRemove,
}: {
  cart: CartEntry[]; open: boolean; onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void; onRemove: (id: string) => void;
}) {
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

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ isDark }: { isDark: boolean }) {
  const fill = isDark ? "#faf4ec" : "black";
  const stroke = isDark ? "#faf4ec" : "black";
  return (
    <div className="h-8 overflow-clip relative shrink-0" style={{ width: 24 }}>
      <div className="absolute inset-[0_0.42%_-19.71%_0.4%]">
        <div className="absolute inset-[0_-0.71%_0_0]">
          <svg fill="none" height="38.3082" preserveAspectRatio="none" viewBox="0 0 23.7624 38.3082" width="23.7624">
            <g>
              <path clipRule="evenodd" d={svgPaths.p1c529300} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p994f000} fillRule="evenodd" stroke={stroke} strokeMiterlimit="22.9256" strokeWidth="0.574126" />
              <path clipRule="evenodd" d={svgPaths.pd726d00} fill={fill} fillRule="evenodd" stroke={stroke} strokeMiterlimit="22.9256" strokeWidth="0.0478497" />
              <path clipRule="evenodd" d={svgPaths.pb17c600} fill={fill} fillRule="evenodd" stroke={stroke} strokeMiterlimit="22.9256" strokeWidth="0.0478497" />
              <path clipRule="evenodd" d={svgPaths.p172f30c0} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p3c5d82c0} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p1b8eb380} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p28728400} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p50d7b80} fill={fill} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p2d10fb00} fill={fill} fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({
  cartCount, onCartOpen, isDark, onToggleDark,
}: {
  cartCount: number; onCartOpen: () => void; isDark: boolean; onToggleDark: () => void;
}) {
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
        <div className="flex items-center gap-2 shrink-0">
          <LogoMark isDark={isDark} />
          <span className="text-[13px] leading-none tracking-tight hidden sm:block text-black dark:text-[#faf4ec]" style={{ ...CD, fontWeight: 600 }}>
            MONARCH'S DINING
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="text-[#030712] dark:text-[#faf4ec] text-[13px] hover:text-[#ff572d] dark:hover:text-[#ff572d] transition-colors whitespace-nowrap"
              style={{ ...CD, fontWeight: 500 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative bg-[#ff572d] flex items-center gap-2 px-3.5 py-2 rounded-full text-[#faf4ec] text-[13px] hover:bg-[#e04d28] transition-colors"
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
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors
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

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-[70px] sm:top-[86px] inset-x-3 sm:inset-x-5 border border-[#ff572d] rounded-2xl overflow-hidden z-50
          bg-white dark:bg-[#0d0d0d]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="w-full text-left px-5 py-3 text-[14px] hover:text-[#ff572d] hover:bg-orange-50 dark:hover:bg-[#1a1a1a] transition-colors border-b border-gray-50 dark:border-[#1a1a1a] last:border-0
                text-[#030712] dark:text-[#faf4ec]"
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ isDark, onExplore, onCart }: { isDark: boolean; onExplore: () => void; onCart: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-20 transition-colors duration-300
      bg-white dark:bg-[#050505]">
      {/* Tomato — left */}
      <img src={imgTomato1} alt="" aria-hidden className="absolute left-0 top-1/3 -translate-x-[40%] w-36 sm:w-56 pointer-events-none select-none" />
      {/* Food bowl — right */}
      <img src={imgLayer82} alt="" aria-hidden className="absolute right-0 top-[200px] translate-x-[30%] w-52 sm:w-80 pointer-events-none select-none rotate-[-22deg] opacity-70" />
      {/* Tomato — lower right */}
      <img src={imgTomato1} alt="" aria-hidden className="absolute right-0 bottom-1/4 translate-x-[40%] w-32 sm:w-48 pointer-events-none select-none opacity-60" />

      <div className="flex flex-col items-center text-center z-10 w-full max-w-3xl">
        {/* Title */}
        <h1
          className="text-[clamp(2.8rem,10vw,6rem)] leading-none uppercase transition-colors duration-300
            text-black dark:text-white"
          style={{ ...CD, fontWeight: 700 }}
        >
          Monarch's Dining
        </h1>
        <h2
          className="text-[clamp(2.4rem,8vw,5rem)] leading-none uppercase mt-1 transition-colors duration-300
            text-black dark:text-white"
          style={{ ...CD, fontWeight: 700 }}
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
          {/* Explore Menu: dark bg in light mode, orange bg in dark mode */}
          <button
            onClick={onExplore}
            className="text-white text-[14px] px-6 py-2.5 rounded-[10px] transition-colors
              bg-[#262626] dark:bg-[#ff572d]
              hover:opacity-90"
            style={{ ...CD, fontWeight: 500 }}
          >
            Explore Menu
          </button>
          {/* View Cart: orange text in light, cream text in dark */}
          <button
            onClick={onCart}
            className="flex items-center gap-1 text-[14px] px-4 py-2.5 rounded-[10px] transition-colors hover:bg-black/5 dark:hover:bg-white/5
              text-[#ff572d] dark:text-[#faf4ec]"
            style={{ ...CD, fontWeight: 500 }}
          >
            View Cart
            <svg fill="none" height="9.546" viewBox="0 0 5.8335 9.546" width="5.8335">
              {/* arrow fill: orange in light, cream in dark */}
              <path d={svgPaths.p8582c00} fill={isDark ? "#faf4ec" : "#FF572D"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────
function MenuSection({ category, onAdd }: { category: Category; onAdd: (item: MenuItem, qty: number) => void }) {
  return (
    <section id={category.id} className="scroll-mt-24">
      {/* Category heading: orange in light, cream in dark */}
      <div className="border-b pb-3 mb-6 transition-colors duration-300 border-black dark:border-[#faf4ec]">
        <h3
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-tight transition-colors duration-300
            text-[#ff572d] dark:text-[#faf4ec]"
          style={{ ...CD, fontWeight: 500 }}
        >
          {category.heading}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

// ─── Delivery Banner ──────────────────────────────────────────────────────────
function DeliveryBanner() {
  return (
    <div className="w-full bg-[#F37A1F] py-6 px-5">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-8">
        <div>
          <p className="text-white text-2xl sm:text-3xl leading-snug" style={{ ...CD, fontWeight: 600 }}>We also sell in liters</p>
          <p className="text-white text-2xl sm:text-3xl" style={{ ...CD, fontWeight: 600 }}>(2l, 5l &amp; 10l)</p>
        </div>
        <div className="flex flex-col items-center shrink-0">
          <p className="text-white text-[9px] font-semibold text-center leading-tight mb-1" style={CD}>45 MINUTES<br />DELIVERY</p>
          <img src={imgMotorbike1} alt="Delivery motorbike" className="w-12 h-10 object-contain" />
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black w-full px-4 py-10">
      <div className="max-w-[1080px] mx-auto border border-[#ff572d] rounded-2xl overflow-hidden relative">
        {[["top-4 left-4"], ["top-4 right-4"], ["bottom-4 left-4"], ["bottom-4 right-4"]].map(([pos], i) => (
          <span key={i} className={`absolute ${pos} w-[19px] h-[19px] rounded-full bg-white block`} />
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 px-10 pt-10 pb-6">
          <div className="flex flex-col gap-2">
            <p className="text-[#ff572d] text-[14px]" style={{ ...CD, fontWeight: 500 }}>Hours Of Service</p>
            <p className="text-[#faf4ec] text-[16px] sm:text-xl leading-relaxed" style={{ ...CD, fontWeight: 400 }}>Monday – Friday<br />9am – 9pm</p>
            <p className="text-[#faf4ec] text-[16px] sm:text-xl leading-relaxed" style={{ ...CD, fontWeight: 400 }}>Saturday – Sunday<br />10am – 9pm</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#ff572d] text-[14px]" style={{ ...CD, fontWeight: 500 }}>Instagram</p>
            <a href="https://www.instagram.com/monarchs_dining" target="_blank" rel="noopener noreferrer"
              className="text-[#faf4ec] text-[16px] sm:text-xl hover:text-[#ff572d] transition-colors" style={CD}>
              @monarchs_dining
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#ff572d] text-[14px]" style={{ ...CD, fontWeight: 500 }}>Call / WhatsApp</p>
            <a href="tel:+2349072353662" className="text-[#faf4ec] text-[16px] sm:text-xl hover:text-[#ff572d] transition-colors" style={CD}>0907 235 3662</a>
            <a href="tel:+2347034675083" className="text-[#faf4ec] text-[16px] sm:text-xl hover:text-[#ff572d] transition-colors" style={CD}>0703 467 5083</a>
          </div>
        </div>
        <div className="h-px bg-[#232323] mx-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-10 py-5">
          <p className="text-[#6b6b6b] text-[11px] tracking-widest uppercase" style={CD}>©2026 Monarch's Dining. All Rights Reserved.</p>
          <p className="text-[#2c2c2c] text-2xl sm:text-3xl text-center" style={{ ...CD, fontWeight: 700 }}>MONARCH'S DINING</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleAdd = (item: MenuItem, qty: number) => {
    setCart((prev) => {
      const found = prev.find((e) => e.id === item.id);
      return found
        ? prev.map((e) => (e.id === item.id ? { ...e, qty: e.qty + qty } : e))
        : [...prev, { ...item, qty }];
    });
  };
  const handleUpdateQty = (id: string, qty: number) => {
    if (qty < 1) setCart((prev) => prev.filter((e) => e.id !== id));
    else setCart((prev) => prev.map((e) => (e.id === id ? { ...e, qty } : e)));
  };
  const handleRemove = (id: string) => setCart((prev) => prev.filter((e) => e.id !== id));
  const cartCount = cart.reduce((s, e) => s + e.qty, 0);
  const scrollToMenu = () => document.getElementById("mains")?.scrollIntoView({ behavior: "smooth" });

  return (
    // Adding the `dark` class here activates Tailwind's dark: variants site-wide
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#050505]">
        <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} isDark={isDark} onToggleDark={() => setIsDark((v) => !v)} />

        <Hero isDark={isDark} onExplore={scrollToMenu} onCart={() => setCartOpen(true)} />

        <main className="max-w-[1082px] mx-auto px-4 sm:px-6 pb-20 flex flex-col gap-16 sm:gap-20">
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
