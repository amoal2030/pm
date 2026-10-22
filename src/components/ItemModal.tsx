import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, ShoppingBag, Check, FileText, ArrowRight, Trash2 } from 'lucide-react';
import { MenuItem, PriceVariant, getItemImage, CATEGORIES } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const { items, addItem, removeItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<PriceVariant | undefined>(undefined);
  const [isSpicy, setIsSpicy] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Check if item is already in cart
  const existingCartItem = items.find((ci) => ci.item.id === item?.id);

  useEffect(() => {
    if (item) {
      if (existingCartItem) {
        setSelectedVariant(existingCartItem.selectedVariant);
        setIsSpicy(existingCartItem.isSpicy || false);
        setNotes(existingCartItem.notes || '');
        setQuantity(existingCartItem.quantity || 1);
      } else {
        if (item.variants && item.variants.length > 0) {
          setSelectedVariant(item.variants[0]);
        } else {
          setSelectedVariant(undefined);
        }
        setIsSpicy(item.name.includes('حراق') || false);
        setNotes('');
        setQuantity(1);
      }
      setAddedSuccess(false);
    }
  }, [item, existingCartItem]);

  if (!item) return null;

  const imageUrl = getItemImage(item);
  const currentUnitPrice = selectedVariant ? selectedVariant.price : item.price;
  const currentTotalPrice = currentUnitPrice * quantity;
  const categoryObj = CATEGORIES.find((c) => c.id === item.category);

  // Check if item supports spicy option
  const canBeSpicy =
    item.category === 'broasted' ||
    item.category === 'meals' ||
    item.category === 'sandwiches' ||
    item.category === 'shawarma' ||
    item.category === 'pizza';

  // Preset suggestions based on category
  const getPresetTags = () => {
    switch (item.category) {
      case 'broasted':
      case 'meals':
      case 'sandwiches':
      case 'shawarma':
        return [
          '🧄 ثومية زيادة',
          '🧅 بدون بصل',
          '🥒 بدون مخلل',
          '🌶️ شطة زيادة',
          '🍟 بطاطس مقرمشة زيادة',
          '🍞 خبز إضافي',
          '🍅 بدون طماطم',
          '🔥 استواء وتحمير مقمر',
        ];
      case 'pizza':
      case 'pasta':
        return [
          '🧀 جبنة إضافية',
          '🌶️ صوص حار',
          '🌿 رشة أوريجانو',
          '🍄 فطر زيادة',
          '🧄 ثومية على جنب',
          '🍕 مقرمشة وخفيفة',
        ];
      case 'pies':
        return [
          '🧀 جبنة زيادة',
          '🍯 عسل إضافي',
          '🌿 زعتر بلدي زيادة',
          '🔥 تحمير مقمر',
          '🫒 زيتون إضافي',
        ];
      case 'juices':
        return [
          '🧊 ثلج قليل',
          '❄️ بدون ثلج',
          '🍯 عسل إضافي',
          '🥤 سكر خفيف',
          '🚫 بدون سكر نهائياً',
          '🥛 حليب زيادة',
          '🥜 مكسرات وقشطة',
        ];
      case 'hot_drinks':
        return [
          '☕ سكر خفيف',
          '☕ سكر زيادة',
          '🌿 هيل وزعفران زيادة',
          '🚫 بدون سكر نهائياً',
          '🥛 حليب مركز إضافي',
        ];
      case 'skewers_kg':
      case 'grilled':
        return [
          '🧅 بصل مشوي زيادة',
          '🍅 طماطم مشوية إضافية',
          '🌶️ فلفل حار مشوي زيادة',
          '🧄 صحن ثومية إضافي',
          '🍞 خبز صاج ساخن',
          '🔥 استواء ناضج ممتاز',
        ];
      default:
        return ['🧄 ثومية زيادة', '🌶️ صوص حار', '🍞 خبز إضافي', '🧅 بدون بصل'];
    }
  };

  const handleAddTag = (tag: string) => {
    setNotes((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return tag;
      if (trimmed.includes(tag)) return trimmed;
      return `${trimmed} · ${tag}`;
    });
  };

  const handleAddToCart = () => {
    addItem(item, selectedVariant, isSpicy, notes.trim(), quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const handleRemoveExisting = () => {
    if (existingCartItem) {
      removeItem(existingCartItem.cartItemId);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in text-right"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up flex flex-col max-h-[92vh] text-slate-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation & Return to Menu Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-neutral-800 shadow-xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى المنيو</span>
          </button>

          <div className="flex items-center gap-2">
            {categoryObj && (
              <span className="text-xs text-slate-700 dark:text-neutral-300 font-bold bg-white dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 shadow-xs">
                {categoryObj.icon} {categoryObj.name}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-neutral-800"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Image */}
        <div className="relative w-full h-44 sm:h-52 bg-slate-100 dark:bg-neutral-950 shrink-0">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

          {item.badge && (
            <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-amber-400 text-neutral-950 font-black text-xs shadow-md">
              {item.badge}
            </span>
          )}

          {item.calories !== undefined && (
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/85 text-orange-400 border border-orange-500/20 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{item.calories} سعرة حرارية</span>
            </span>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Title, Category & Price */}
          <div className="border-b border-slate-200 dark:border-neutral-800/80 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {item.name}
                </h2>
                {item.nameEn && (
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 font-mono tracking-wide" dir="ltr">
                    {item.nameEn}
                  </p>
                )}
                {categoryObj && (
                  <span className="inline-block mt-1.5 text-[11px] text-amber-600 dark:text-amber-400/90 font-medium">
                    القسم: {categoryObj.name} ({categoryObj.nameEn})
                  </span>
                )}
              </div>

              <div className="text-left shrink-0">
                <div className="font-mono text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                  {currentUnitPrice} <span className="text-xs font-sans font-bold">ر.س</span>
                </div>
                {item.variants && item.variants.length > 0 && selectedVariant && (
                  <span className="text-[11px] text-slate-500 dark:text-neutral-400 block mt-0.5 font-medium">
                    (حجم: {selectedVariant.name})
                  </span>
                )}
              </div>
            </div>

            {/* Skewers Free Gifts Note */}
            {item.freeSideNotes && (
              <div className="mt-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-500/30 text-xs text-orange-900 dark:text-amber-300 font-medium leading-relaxed">
                🎁 <span className="font-bold text-orange-950 dark:text-white">تحصل مجاناً مع هذا الطلب على:</span> {item.freeSideNotes}
              </div>
            )}

            {item.description && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 mt-3 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Variants selector (Sizes or Weights) from PDF */}
          {item.variants && item.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-200">
                اختر الحجم أو الوزن من قائمة المنيو:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/15 text-slate-900 dark:text-white font-bold ring-1 ring-amber-500/40 shadow-xs'
                          : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/60 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{v.name}</div>
                      <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                        {v.price} ر.س
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spicy / Normal Option */}
          {canBeSpicy && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-200">
                مستوى الحرارة المفضل:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSpicy(false)}
                  className={`p-2.5 rounded-xl border text-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    !isSpicy
                      ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/60 text-slate-600 dark:text-neutral-400'
                  }`}
                >
                  🌿 عادي (بارد)
                </button>
                <button
                  type="button"
                  onClick={() => setIsSpicy(true)}
                  className={`p-2.5 rounded-xl border text-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSpicy
                      ? 'border-red-500 bg-red-500/15 text-red-600 dark:text-red-400'
                      : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/60 text-slate-600 dark:text-neutral-400'
                  }`}
                >
                  🌶️ حراق (سبايسي)
                </button>
              </div>
            </div>
          )}

          {/* Detailed Order Description / Notes Section */}
          <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-neutral-800/80">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>وصف وتفاصيل طلبك لهذا الصنف:</span>
              </label>
              {notes && (
                <button
                  type="button"
                  onClick={() => setNotes('')}
                  className="text-[11px] text-slate-500 dark:text-neutral-500 hover:text-red-500 cursor-pointer"
                >
                  مسح الوصف
                </button>
              )}
            </div>

            {/* Quick-tap preset chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">
                خيارات سريعة لتحضير وجبتك:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {getPresetTags().map((tag) => {
                  const isChecked = notes.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300 font-bold'
                          : 'bg-slate-100 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {isChecked ? `✓ ${tag}` : tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea for custom description */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="اكتب هنا أي وصف أو تفاصيل مخصصة لتحضير وجبتك كما تحب (مثال: صوص ثوم على جنب، بدون بصل، خبز محمص زيادة)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer: Stepper & Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/95 space-y-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="تقليل الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* If already in cart, allow removing */}
            {existingCartItem && (
              <button
                type="button"
                onClick={handleRemoveExisting}
                className="p-3 rounded-xl bg-white dark:bg-neutral-900 hover:bg-red-50 dark:hover:bg-red-950 border border-slate-200 dark:border-neutral-800 hover:border-red-400 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                title="إلغاء اختيار هذا الصنف من القائمة"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Confirm & Save Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addedSuccess}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-emerald-950/20'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>تم تأكيد الصنف ووصفه!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {existingCartItem ? 'تحديث وتأكيد الطلب' : 'تأكيد اختيار الصنف'} · {currentTotalPrice} ر.س
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Back to Menu link */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              العودة إلى المنيو وتصفح باقي الأصناف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
