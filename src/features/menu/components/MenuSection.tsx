import { Category, MenuItem } from "@/types";
import { CD } from "@/constants/styles";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  category: Category;
  onAdd: (item: MenuItem, qty: number) => void;
}

export function MenuSection({ category, onAdd }: MenuSectionProps) {
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
