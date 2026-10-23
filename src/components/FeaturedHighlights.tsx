import React from 'react';
import { Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { MenuItem } from '../data/menuData';

interface FeaturedHighlightsProps {
  onSelectItem: (item: MenuItem) => void;
  featuredItems: MenuItem[];
  onScrollToCategory: (categoryId: string) => void;
}

export const FeaturedHighlights: React.FC<FeaturedHighlightsProps> = ({
  onSelectItem,
  featuredItems,
  onScrollToCategory,
}) => {
  return (
    <section id="featured" className="py-12 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مختارات مشوار الفرسان</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              الأصناف الأكثر تميزاً وطلباً
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            نخبة من أطباقنا المميزة المحضرة يومياً بأجود المكونات الطازجة والتتبيلات الخاصة.
          </p>
        </div>

        {/* Grid of Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Broasted Highlight */}
          <div
            onClick={() => onScrollToCategory('broasted')}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/broasted_chicken_hero_1792665160048.jpg`}
                alt="بروستد الفرسان"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-orange-600 text-neutral-950 font-black text-xs">
                بروستد مقرمش
              </span>
            </div>
            <div className="p-4 text-right flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  بروستد مشوار (عادي / حراق)
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  4 قطع دجاج طازج محمر ومقرمش مع البطاطس الذهبية وصلصة الثوم الأصلية.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 text-sm">من 18 ر.س</span>
                <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 font-medium">
                  استكشف القسم
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Skewers by KG */}
          <div
            onClick={() => onScrollToCategory('skewers_kg')}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/mixed_grills_platter_1792665161760.jpg`}
                alt="مشويات بالكيلو"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-neutral-950 font-black text-xs">
                مشويات بالكيلو
              </span>
            </div>
            <div className="p-4 text-right flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  أسياخ طازجة شك وتتبيل
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  أوصال لحم، شيش طاووق، وكباب + مجاناً: سيخ فلفل وطماطم وبصل وصحن ثوم.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 text-sm">من 55 ر.س</span>
                <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 font-medium">
                  استكشف القسم
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Shawarma */}
          <div
            onClick={() => onScrollToCategory('shawarma')}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/arabic_shawarma_plate_1792665161698.jpg`}
                alt="شاورما الفرسان"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-red-600 text-white font-black text-xs">
                شاورما صاج
              </span>
            </div>
            <div className="p-4 text-right flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  شاورما صاروخ وصحن عربي
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  شاورما ساخنة بخبز الصاج المحمص مع الثوم والمخلل وبطاطس الفرسان.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 text-sm">من 7 ر.س</span>
                <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 font-medium">
                  استكشف القسم
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Natural Juices */}
          <div
            onClick={() => onScrollToCategory('juices')}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/fresh_natural_juices_1792665161919.jpg`}
                alt="عصائر طبيعية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs">
                طبيعي 100%
              </span>
            </div>
            <div className="p-4 text-right flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  عوار قلب وفافخينة وطبقات
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  تشكيلة مميزة من العصائر الطبيعية الطازجة والخلطات المنعشة.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-mono font-black text-amber-400 text-sm">من 4 ر.س</span>
                <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 font-medium">
                  استكشف القسم
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
