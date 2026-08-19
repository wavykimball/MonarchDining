export function parsePrice(price: string): number {
  if (price === "Free") return 0;
  return parseInt(price.replace(/[₦,]/g, ""), 10) || 0;
}

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}
