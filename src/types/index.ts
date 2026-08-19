export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Category {
  id: string;
  label: string;
  heading: string;
  items: readonly MenuItem[];
}

export interface CartEntry extends MenuItem {
  qty: number;
}
