import { CD } from "@/constants/styles";

export function Footer() {
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
        </div>
      </div>
    </footer>
  );
}
