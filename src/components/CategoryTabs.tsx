import React, { useRef, useEffect } from 'react';
import { CATEGORIES, CategoryId } from '../data/menuData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view horizontally inside the scroll container
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeBtn = scrollContainerRef.current.querySelector(
      `[data-category-id="${activeCategory}"]`
    ) as HTMLElement | null;

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -260 : 260;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-20 z-30 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-y border-slate-200 dark:border-neutral-800 shadow-md py-2.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          {/* Right Scroll Arrow */}
          <button
            type="button"
            onClick={() => scrollHorizontally('right')}
            className="hidden sm:flex absolute right-0 z-10 w-8 h-8 items-center justify-center rounded-full bg-white dark:bg-neutral-900/90 border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 shadow-md transition-all cursor-pointer"
            aria-label="تمرير الأقسام يميناً"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Horizontal Scrollable Tabs Strip */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 px-1 sm:px-9"
          >
            {/* All Categories Tab [الكل] */}
            <button
              type="button"
              data-category-id="all"
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 text-neutral-950 shadow-lg shadow-orange-500/25 ring-2 ring-amber-400/60 scale-[1.02]'
                  : 'bg-slate-100 dark:bg-neutral-900/90 text-slate-800 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800'
              }`}
            >
              <span className="text-base">🍽️</span>
              <span>الكل</span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-bold ${
                  activeCategory === 'all'
                    ? 'bg-neutral-950/20 text-neutral-950'
                    : 'bg-slate-200 text-slate-700 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                {categoryCounts['all'] || 0}
              </span>
            </button>

            {/* Exact 11 Categories extracted 100% from original PDF */}
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  data-category-id={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 text-neutral-950 shadow-lg shadow-orange-500/25 ring-2 ring-amber-400/60 scale-[1.02] font-black'
                      : 'bg-slate-100 dark:bg-neutral-900/90 text-slate-800 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 hover:border-amber-500/40'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-bold ${
                      isActive
                        ? 'bg-neutral-950/20 text-neutral-950'
                        : 'bg-slate-200 text-slate-700 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Left Scroll Arrow */}
          <button
            type="button"
            onClick={() => scrollHorizontally('left')}
            className="hidden sm:flex absolute left-0 z-10 w-8 h-8 items-center justify-center rounded-full bg-white dark:bg-neutral-900/90 border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 shadow-md transition-all cursor-pointer"
            aria-label="تمرير الأقسام يساراً"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
