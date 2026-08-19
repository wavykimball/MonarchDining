import { CD } from "@/constants/styles";
import imgMotorbike1 from "@/imports/Desktop2/e195e67e394b1f013bc3ac0c53a003cc1ff0c3c2.png";

export function DeliveryBanner() {
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
