import React from 'react';
import { Check, Flame, Edit3, Tag, Eye, Plus } from 'lucide-react';
import { MenuItem, getItemImage, CATEGORIES } from '../data/menuData';

interface MenuItemCardProps {
  item: MenuItem;
  isSelected: boolean;
  selectedQuantity?: number;
  userNotes?: string;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  isSelected,
  selectedQuantity = 0,
  userNotes,
  onOpenDetails,
}) => {
  const imageUrl = getItemImage(item);
  const hasVariants = item.variants && item.variants.length > 0;
  const lowestPrice = hasVariants
    ? Math.min(...item.variants!.map((v) => v.price))
    : item.price;

  const categoryObj = CATEGORIES.find((c) => c.id === item.category);

  return (
    <div
      onClick={() => onOpenDetails(item)}
      className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer text-right shadow-md hover:shadow-lg ${
        isSelected
          ? 'border-amber-500 ring-1 ring-amber-500/50 bg-amber-500/5 dark:bg-neutral-900/95'
          : 'bg-white dark:bg-neutral-900/95 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
      } border`}
    >
      <div>
        {/* Item Image with Badges */}
        <div className="relative w-full h-44 sm:h-48 mb-3.5 rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-950">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

          {/* Top-Right Badge (Category or Popular) */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            {item.badge ? (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-neutral-950 font-black text-xs shadow-md">
                {item.badge}
              </span>
            ) : categoryObj ? (
              <span className="px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold border border-white/10">
                {categoryObj.name}
              </span>
            ) : null}
          </div>

          {/* Bottom-Left Calories Badge */}
          {item.calories !== undefined && (
            <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/85 backdrop-blur-xs text-neutral-100 text-xs font-mono border border-white/10 flex items-center gap-1 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{item.calories} سعرة حرارية</span>
            </span>
          )}
        </div>

        {/* Title, English Name, and Price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors leading-snug">
              {item.name}
            </h3>
            {item.nameEn && (
              <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono block mt-0.5 tracking-wide" dir="ltr">
                {item.nameEn}
              </span>
            )}
          </div>

          {!hasVariants ? (
            <div className="flex items-baseline gap-1 shrink-0 font-mono text-amber-600 dark:text-amber-400 font-black text-base sm:text-lg">
              <span>{item.price}</span>
              <span className="text-xs font-sans font-bold">ر.س</span>
            </div>
          ) : (
            <div className="text-left shrink-0">
              <span className="text-[10px] text-slate-400 dark:text-neutral-400 block font-sans">يبدأ من</span>
              <div className="flex items-baseline gap-1 font-mono text-amber-600 dark:text-amber-400 font-black text-base sm:text-lg">
                <span>{lowestPrice}</span>
                <span className="text-xs font-sans font-bold">ر.س</span>
              </div>
            </div>
          )}
        </div>

        {/* Multi-Size Variants Table/Pills from PDF */}
        {hasVariants && (
          <div className="flex flex-wrap items-center gap-1.5 my-2.5">
            {item.variants!.map((variant, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-neutral-200 font-medium flex items-center gap-1"
              >
                <span className="text-slate-500 dark:text-neutral-400">{variant.name}:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{variant.price} ر.س</span>
              </span>
            ))}
          </div>
        )}

        {/* Free Sides Offer Notes (e.g., Skewers kg) */}
        {item.freeSideNotes && (
          <div className="my-2 p-2 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-500/30 dark:text-amber-300 text-[11px] font-medium leading-relaxed">
            🎁 <span className="font-bold text-orange-950 dark:text-white">مجاناً:</span> {item.freeSideNotes}
          </div>
        )}

        {/* Short Description */}
        {item.description && (
          <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
          {item.name.includes('حراق') && (
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-400 font-medium border border-red-200 dark:border-red-900/50">
              حراق 🌶️
            </span>
          )}
          {item.calories !== undefined && (
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800/80 text-slate-600 dark:text-neutral-400 flex items-center gap-1 border border-slate-200 dark:border-neutral-700/50">
              <Tag className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              <span>سعرات معتمدة</span>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: "عرض التفاصيل" + "اختيار هذا الصنف للطلب" */}
      <div className="pt-2 border-t border-slate-100 dark:border-neutral-800/80">
        <div className="grid grid-cols-2 gap-2">
          {/* Button 1: View Details Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(item);
            }}
            className="w-full py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 hover:border-amber-500/60 transition-all active:scale-98 cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            <span>عرض التفاصيل</span>
          </button>

          {/* Button 2: Order / Select Button */}
          {isSelected ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(item);
              }}
              className="w-full py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-950/20 transition-all active:scale-98 cursor-pointer truncate"
              title="تمت الإضافة - اضغط لتعديل الطلب"
            >
              <Check className="w-4 h-4 stroke-[3] shrink-0" />
              <span className="truncate">مختار {selectedQuantity > 1 ? `(${selectedQuantity})` : ''}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(item);
              }}
              className="w-full py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-neutral-950 transition-all active:scale-98 cursor-pointer shadow-md font-black truncate"
            >
              <Plus className="w-4 h-4 stroke-[3] shrink-0" />
              <span className="truncate">اختيار للطلب</span>
            </button>
          )}
        </div>

        {/* Note preview if user added notes */}
        {isSelected && userNotes && (
          <div className="flex items-center justify-between text-[11px] px-1 pt-1.5 text-slate-500 dark:text-neutral-400">
            <span className="truncate max-w-[210px] text-amber-600 dark:text-amber-300/90 font-medium">
              📝 {userNotes}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(item);
              }}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-white flex items-center gap-0.5 font-bold cursor-pointer shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>تعديل</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
