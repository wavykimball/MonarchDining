import { useState } from "react";
import { MenuItem, CartEntry } from "@/types";

export function useCart() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  return {
    cart,
    cartOpen,
    setCartOpen,
    handleAdd,
    handleUpdateQty,
    handleRemove,
    cartCount,
  };
}
