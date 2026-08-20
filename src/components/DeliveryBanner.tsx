import { CD } from "@/constants/styles";
import imgMotorbike1 from "@/imports/Desktop2/e195e67e394b1f013bc3ac0c53a003cc1ff0c3c2.png";

export function DeliveryBanner() {
  return (
    <div className="w-full h-[190px] bg-[#FF572D] flex items-center justify-center transition-colors duration-300">
      {/* Banner Content */}
      <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-center gap-10 sm:gap-16">
        {/* Left Side: Liter Information */}
        <div className="text-center text-white">
          <p className="text-[20px] sm:text-[26px] md:text-[30px] leading-tight" style={{ ...CD, fontWeight: 600 }}>
            We also sell in liters
          </p>
          <p className="text-[20px] sm:text-[26px] md:text-[30px] leading-tight mt-1" style={{ ...CD, fontWeight: 600 }}>
            (2L, 5L &amp; 10L)
          </p>
        </div>

        {/* Right Side: Delivery Indicator */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 text-white">
          <img
            src={imgMotorbike1}
            alt="Delivery motorbike"
            className="w-12 h-10 object-contain brightness-0 invert"
          />
          <p className="text-[9px] font-bold text-center leading-tight tracking-wider" style={{ ...CD, fontWeight: 700 }}>
            45 MINUTES<br />DELIVERY
          </p>
        </div>
      </div>
    </div>
  );
}
