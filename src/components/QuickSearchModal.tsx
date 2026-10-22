import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Flame } from 'lucide-react';
import { MENU_ITEMS, MenuItem, getItemImage, CATEGORIES } from '../data/menuData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}

function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '')
    .trim();
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show popular items when empty
      return MENU_ITEMS.filter((i) => i.isPopular).slice(0, 8);
    }
    const norm = normalizeArabic(query);
    return MENU_ITEMS.filter((item) => {
      const name = normalizeArabic(item.name);
      const en = (item.nameEn || '').toLowerCase();
      const desc = normalizeArabic(item.description || '');
      const cat = normalizeArabic(
        CATEGORIES.find((c) => c.id === item.category)?.name || ''
      );
      return (
        name.includes(norm) ||
        en.includes(norm) ||
        desc.includes(norm) ||
        cat.includes(norm)
      );
    });
  }, [query]);

  if (!isOpen) return null;

  const popularSuggestions = [
    'بروستد عادي',
    'بروستد حراق',
    'شاورما صاروخ',
    'عورقلب',
    'كباب لحم',
    'مشويات بالكيلو',
    'بيتزا سبيشل',
    'عصير مانجو',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in text-right"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl mt-12 sm:mt-16 animate-scale-up text-slate-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أي وجبة، عصير، بروستد، أو مشويات..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:text-neutral-400 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs font-mono cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-neutral-950/50 border-b border-slate-200 dark:border-neutral-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-bold shrink-0">اقتراحات شائعة:</span>
          {popularSuggestions.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800/80 hover:bg-slate-100 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap transition-colors cursor-pointer border border-slate-200 dark:border-neutral-700/60 shadow-xs"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 px-1 mb-1">
            <span>{query ? `نتائج البحث (${results.length})` : 'أصناف مختارة ومقترحة لك'}</span>
            {query && (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                اضغط على أي صنف لوصفه وإضافته
              </span>
            )}
          </div>

          {results.length > 0 ? (
            results.map((item) => {
              const imageUrl = getItemImage(item);
              const lowestPrice = item.variants?.length
                ? Math.min(...item.variants.map((v) => v.price))
                : item.price;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 dark:bg-neutral-900 shrink-0">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="text-[10px] bg-amber-400/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 rounded font-bold shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                        {item.description || item.nameEn}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-neutral-500">
                        <span className="text-slate-600 dark:text-neutral-400 font-medium">
                          {CATEGORIES.find((c) => c.id === item.category)?.name}
                        </span>
                        {item.calories !== undefined && (
                          <span className="flex items-center gap-0.5 text-orange-600 dark:text-orange-400 font-mono">
                            <Flame className="w-3 h-3" />
                            <span>{item.calories} سعرة</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mr-3">
                    <div className="text-left font-mono">
                      <div className="font-black text-amber-600 dark:text-amber-400 text-sm sm:text-base">
                        {lowestPrice} ر.س
                      </div>
                      {item.variants && (
                        <div className="text-[10px] text-slate-400 dark:text-neutral-500">خيارات متعددة</div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-neutral-950 font-bold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                    >
                      اختيار ووصف
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500 dark:text-neutral-400">
              <div className="text-3xl mb-2">🔍</div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">لا توجد نتائج مطابقة لبحثك</p>
              <p className="text-xs text-slate-500 dark:text-neutral-500 mt-1">
                جرب البحث باسم صنف آخر أو تصفح الأقسام مباشرة.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
