import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartBar: React.FC = () => {
  const { totalCount, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  if (totalCount === 0 || isCartOpen) return null;

  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full h-12 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-neutral-950 font-black text-sm flex items-center justify-between shadow-2xl shadow-orange-950/80 active:scale-98 transition-transform cursor-pointer"
        aria-label="عرض سلة الطلبات"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-950 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
            {totalCount}
          </div>
          <span>عرض سلة الطلب</span>
        </div>

        <div className="flex items-center gap-1 font-mono">
          <span>{totalPrice.toFixed(0)}</span>
          <span className="text-xs font-sans">ر.س</span>
          <ArrowLeft className="w-4 h-4 mr-1" />
        </div>
      </button>
    </div>
  );
};
