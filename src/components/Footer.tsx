import { CD } from "@/constants/styles";

export function Footer() {
  return (
    <footer className="bg-black w-full border-t border-[#ff572d]">
      <div className="max-w-[1440px] mx-auto w-full min-h-[491px] md:h-[491px] p-[20px] bg-black flex flex-col">
        <div className="flex-1 border border-[#ff572d] rounded-3xl bg-black px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-between gap-6 overflow-hidden">
          
          {/* Info Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <p className="text-[#ff572d] text-[13px] tracking-wide" style={{ ...CD, fontWeight: 500 }}>
                Hours Of Service
              </p>
              <div className="flex flex-col gap-1.5">
                <p className="text-[#faf4ec] text-[15px] sm:text-[17px] leading-snug" style={{ ...CD, fontWeight: 400 }}>
                  Monday - Friday: &nbsp;9am - 9pm
                </p>
                <p className="text-[#faf4ec] text-[15px] sm:text-[17px] leading-snug" style={{ ...CD, fontWeight: 400 }}>
                  Saturday - Sunday: &nbsp;10am - 9pm
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <p className="text-[#ff572d] text-[13px] tracking-wide" style={{ ...CD, fontWeight: 500 }}>
                Instagram
              </p>
              <a
                href="https://www.instagram.com/monarchs_dining"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#faf4ec] text-[15px] sm:text-[17px] hover:text-[#ff572d] transition-colors leading-snug"
                style={{ ...CD, fontWeight: 400 }}
              >
                @monarchs_dining
              </a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <p className="text-[#ff572d] text-[13px] tracking-wide" style={{ ...CD, fontWeight: 500 }}>
                Call/Whatstapp
              </p>
              <div className="text-[#faf4ec] text-[15px] sm:text-[17px] leading-snug" style={{ ...CD, fontWeight: 400 }}>
                <a href="tel:+2349072353662" className="hover:text-[#ff572d] transition-colors">0907 235 3662</a>
                <span className="mx-2 text-[#ff572d]">-</span>
                <a href="tel:+2347034675083" className="hover:text-[#ff572d] transition-colors">0703 467 5083</a>
              </div>
            </div>
          </div>

          {/* Bottom Area (Divider, Copyright, Title) */}
          <div className="flex flex-col gap-4">
            <div className="h-px bg-[#232323] w-full my-2" />
            <p className="text-[#6b6b6b] text-[11px] tracking-widest" style={{ ...CD, fontWeight: 400 }}>
              ©2026 Monarch's Dining All Rights Reserved.
            </p>
            {/* Mobile: two lines. Desktop (md+): single line */}
            <div className="md:hidden flex flex-col leading-[0.9] -ml-1.5 select-none w-full" style={{ ...CD }}>
              <span className="font-black text-[#1c1c1c] tracking-tighter uppercase" style={{ fontSize: 'clamp(2rem, 13vw, 5rem)' }}>
                MONARCH'S
              </span>
              <span className="font-black text-[#1c1c1c] tracking-tighter uppercase" style={{ fontSize: 'clamp(2rem, 13vw, 5rem)' }}>
                DINING
              </span>
            </div>
            <h2 className="hidden md:block text-[clamp(2.5rem,10.5vw,8.5rem)] font-black text-[#1c1c1c] tracking-tighter uppercase leading-none select-none -ml-1.5 whitespace-nowrap" style={{ ...CD }}>
              MONARCH'S DINING
            </h2>
          </div>

        </div>
      </div>
    </footer>
  );
}
