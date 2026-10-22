import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const CartDrawer: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    orderType,
    setOrderType,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerNotes,
    setCustomerNotes,
    generateWhatsAppLink,
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppLink();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-right">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">قائمة الطلب المختارة</h2>
              <span className="text-xs bg-slate-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-mono font-bold">
                {totalCount} صنف
              </span>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 transition-colors px-2 py-1 cursor-pointer"
                  title="تفريغ السلة"
                >
                  مسح الكل
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="إغلاق السلة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 dark:text-neutral-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-3xl mb-4 shadow-xs">
                  🍗
                </div>
                <h3 className="font-bold text-slate-800 dark:text-neutral-200 text-base mb-1">
                  سلة طلباتك فارغة حالياً
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs mb-6">
                  تصفح قائمة الطعام الغنية واختر وجبتك المفضلة من البروستد والمشويات والشاورما!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-neutral-950 font-bold text-sm transition-colors cursor-pointer shadow-md"
                >
                  تصفح قائمة الطعام الآن
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {items.map((cartItem) => {
                    const itemTotal = (cartItem.quantity * cartItem.unitPrice).toFixed(0);
                    return (
                      <div
                        key={cartItem.cartItemId}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-2 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-neutral-100">
                              {cartItem.item.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-500 dark:text-neutral-400">
                              {cartItem.selectedVariant && (
                                <span className="bg-slate-200 dark:bg-neutral-800 px-2 py-0.5 rounded text-amber-700 dark:text-amber-400 font-medium">
                                  {cartItem.selectedVariant.name}
                                </span>
                              )}
                              {cartItem.isSpicy && (
                                <span className="bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded font-medium border border-red-200 dark:border-red-900/50">
                                  حراق 🌶️
                                </span>
                              )}
                              <span className="font-mono text-slate-600 dark:text-neutral-400">
                                {cartItem.unitPrice} ر.س للواحد
                              </span>
                            </div>
                            {cartItem.notes && (
                              <div className="mt-1.5 p-2 rounded-lg bg-white dark:bg-neutral-900/90 border border-amber-300 dark:border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5 shadow-xs">
                                <span className="font-bold text-slate-600 dark:text-neutral-400 shrink-0">وصف الطلب:</span>
                                <span>{cartItem.notes}</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => removeItem(cartItem.cartItemId)}
                            className="text-slate-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="حذف الصنف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Controls & Total */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 dark:border-neutral-800/60">
                          <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 shadow-xs">
                            <button
                              onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                              className="text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer"
                              aria-label="تقليل الكمية"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-xs font-bold text-slate-900 dark:text-neutral-100 min-w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                              className="text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                            {itemTotal} ر.س
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery / Pickup Mode Selector */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300">
                    طريقة الاستلام المفضلة:
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrderType('car_pickup')}
                      className={`p-2.5 rounded-xl border text-right text-xs transition-colors cursor-pointer ${
                        orderType === 'car_pickup'
                          ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>🚗 اتصل قبل أن تصل (استلام سيارة)</span>
                        {orderType === 'car_pickup' && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 block mt-0.5">
                        نجهز طلبك مسبقاً لتستلمه ساخناً من محطة بترو هلا
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('dine_in')}
                      className={`p-2.5 rounded-xl border text-right text-xs transition-colors cursor-pointer ${
                        orderType === 'dine_in'
                          ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>🍽️ استلام سفري من المحل</span>
                        {orderType === 'dine_in' && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 block mt-0.5">
                        استلام مباشر من كاونتر المطعم
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-2.5 rounded-xl border text-right text-xs transition-colors cursor-pointer ${
                        orderType === 'delivery'
                          ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>🛵 توصيل إلى الموقع</span>
                        {orderType === 'delivery' && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 block mt-0.5">
                        سيتم التنسيق معك عبر الواتساب لتحديد موقع التوصيل
                      </span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300">
                    بيانات العميل (اختياري للتنسيق السريع):
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="رقم الجوال للتواصل"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="ملاحظات الطلب (نوع السيارة، وقت الوصول...)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer with Total and WhatsApp Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/90 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-neutral-400 font-bold">الإجمالي التقريبي:</span>
                <span className="font-mono font-black text-xl text-amber-600 dark:text-amber-400">
                  {totalPrice.toFixed(0)} ر.س
                </span>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/20 active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال الطلب عبر الواتساب ({RESTAURANT_INFO.whatsappFormatted})</span>
              </button>

              <p className="text-[11px] text-center text-slate-500 dark:text-neutral-500 leading-tight">
                يتم فتح محادثة واتساب الرسمية مع المطعم بملخص طلبك للتأكيد الفوري والتجهيز.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
