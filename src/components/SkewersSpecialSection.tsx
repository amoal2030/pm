import React from 'react';
import { Gift, Plus } from 'lucide-react';
import { MenuItem, getItemImage } from '../data/menuData';

interface SkewersSpecialSectionProps {
  onSelectItem: (item: MenuItem) => void;
  skewerItems: MenuItem[];
}

export const SkewersSpecialSection: React.FC<SkewersSpecialSectionProps> = ({
  onSelectItem,
  skewerItems,
}) => {
  return (
    <section id="skewers" className="py-14 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-950/70 via-neutral-900 to-amber-950/70 border border-orange-500/30 p-6 sm:p-8 mb-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-amber-400 border border-orange-500/30 text-xs font-bold">
                <Gift className="w-4 h-4 text-orange-400" />
                <span>عرض مجاني مع كل طلب أسياخ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                أسياخ المشويات الطازجة بالكيلو ونصف الكيلو
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                الاختيار والتصنيف وتتبيل وشك الأسياخ.. حسب طلبكم! لحوم ودواجن طازجة تشوى على جمر الفحم الطبيعي.
              </p>
              
              {/* Free Gift Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-amber-300">
                <span className="text-neutral-400">تحصل مجاناً مع كل كيلو أو نصف كيلو على:</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-amber-500/30">
                  🌶️ سيخ فلفل مشوي
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-amber-500/30">
                  🍅 سيخ طماطم مشوي
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-amber-500/30">
                  🧅 سيخ بصل مشوي
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-amber-500/30">
                  🧄 صحن ثومية كريمي
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-4 rounded-2xl bg-neutral-950/90 border border-amber-500/40 text-center shadow-lg">
                <div className="text-xs text-neutral-400 font-medium">الخيارات المتاحة:</div>
                <div className="text-base font-black text-white mt-1">1 كيلو (16 سيخ)</div>
                <div className="text-sm font-bold text-amber-400">أو نصف كيلو (8 أسياخ)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skewers List Cards with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skewerItems.map((item) => {
            const imageUrl = getItemImage(item);
            const halfKgPrice = item.variants?.find((v) => v.name.includes('نصف'))?.price || item.price;
            const fullKgPrice = item.variants?.find((v) => v.name.includes('كيلو كامل'))?.price || 115;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden bg-neutral-950">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-neutral-950 font-black text-xs">
                      مشويات فحم
                    </span>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div className="space-y-0.5 text-xs text-neutral-300">
                    <div>
                      نصف كجم: <span className="font-mono font-bold text-amber-400">{halfKgPrice} ر.س</span>
                    </div>
                    <div>
                      1 كجم: <span className="font-mono font-bold text-amber-400">{fullKgPrice} ر.س</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs transition-colors cursor-pointer border border-neutral-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>اختيار الصنف</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
