import React from 'react';
import { MessageCircle, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const BottomSelectionBar: React.FC = () => {
  const { totalCount, totalPrice, isCartOpen, setIsCartOpen, generateWhatsAppLink } = useCart();

  if (totalCount === 0 || isCartOpen) return null;

  const handleSendOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open drawer to finalize details, or direct WhatsApp
    setIsCartOpen(true);
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-slide-up">
      <div
        onClick={() => setIsCartOpen(true)}
        className="pointer-events-auto w-full max-w-xl p-3 sm:p-3.5 rounded-2xl bg-neutral-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 cursor-pointer hover:border-amber-400 transition-all text-right group"
      >
        {/* Left Side: Green Send Order Button */}
        <button
          type="button"
          onClick={handleSendOrder}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm transition-transform active:scale-95 shadow-md shadow-emerald-950/40 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-neutral-950" />
          <span>إرسال الطلب</span>
        </button>

        {/* Right Side: Selection Counter & Details */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-black text-amber-400">
              تم اختيار {totalCount} {totalCount === 1 ? 'صنف' : totalCount === 2 ? 'صنفين' : 'أصناف'}
            </span>
            <span className="text-white font-mono font-black text-sm sm:text-base">
              ({totalPrice.toFixed(0)} ر.س)
            </span>
            <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">
            جاهز للإرسال إلى واتساب المطعم ({RESTAURANT_INFO.whatsappFormatted})
          </span>
        </div>
      </div>
    </div>
  );
};
