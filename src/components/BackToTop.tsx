import { useState, useEffect } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { CD } from "@/constants/styles";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        // Show when footer enters viewport (or within 150px of entering viewport)
        setShow(footerTop <= window.innerHeight + 150);
      } else {
        // Fallback: show when within 600px of page bottom
        const scrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 600;
        setShow(scrolledToBottom);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF572D] text-white shadow-lg shadow-[#FF572D]/25 transition-all duration-300 hover:bg-[#e04d28] hover:scale-105 active:scale-95 cursor-pointer ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ ...CD, fontWeight: 500 }}
    >
      <ArrowUp size={16} weight="bold" />
      <span className="text-[13px] uppercase tracking-wider">Back to top</span>
    </button>
  );
}
