import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuSearchAndFilter, QuickFilterType } from './components/MenuSearchAndFilter';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemModal } from './components/ItemModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { CartDrawer } from './components/CartDrawer';
import { BottomSelectionBar } from './components/BottomSelectionBar';
import { AboutAndLocation } from './components/AboutAndLocation';
import { Footer } from './components/Footer';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { MENU_ITEMS, CATEGORIES, MenuItem, CategoryId } from './data/menuData';
import { ArrowUp, UtensilsCrossed, Sparkles, Filter, ListCollapse } from 'lucide-react';

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

const MainContent: React.FC = () => {
  const { items } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [filterModeOnly, setFilterModeOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isUserClickingRef = useRef<boolean>(false);

  // Map of selected items and their total quantities in cart
  const selectedItemsMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const ci of items) {
      map.set(ci.item.id, (map.get(ci.item.id) || 0) + ci.quantity);
    }
    return map;
  }, [items]);

  // Map of selected items and their custom description notes
  const itemNotesMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const ci of items) {
      if (ci.notes) {
        map.set(ci.item.id, ci.notes);
      }
    }
    return map;
  }, [items]);

  // Guard references so Back-to-Top is strictly triggered on explicit intentional click, never accidentally while scrolling or swiping
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isTouchSwipingRef = useRef<boolean>(false);
  const buttonAppearTimeRef = useRef<number>(0);
  const prevShowBackToTopRef = useRef<boolean>(false);

  // Monitor scroll for back to top button visibility and track active scrolling
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 800;
      if (shouldShow && !prevShowBackToTopRef.current) {
        buttonAppearTimeRef.current = Date.now();
      }
      prevShowBackToTopRef.current = shouldShow;
      setShowBackToTop(shouldShow);

      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard shortcut Ctrl+K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll-Spy: detect which category section is currently in view and update active tab
  useEffect(() => {
    if (filterModeOnly || searchQuery.trim() || quickFilter !== 'all') return;

    const handleScrollSpy = () => {
      if (isUserClickingRef.current) return;

      const firstSection = document.getElementById(`section-${CATEGORIES[0].id}`);
      if (!firstSection) return;

      const scrollPosition = window.scrollY + 180;

      // If user is scrolled above the menu sections, set active tab to 'all'
      if (scrollPosition < firstSection.offsetTop) {
        if (activeCategory !== 'all') {
          setActiveCategory('all');
        }
        return;
      }

      let detectedCat: CategoryId | 'all' = 'all';

      for (const cat of CATEGORIES) {
        const el = document.getElementById(`section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            detectedCat = cat.id;
            break;
          }
        }
      }

      if (detectedCat !== 'all' && detectedCat !== activeCategory) {
        setActiveCategory(detectedCat);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [filterModeOnly, searchQuery, quickFilter, activeCategory]);

  // Back to top function - ONLY triggered upon explicit, intentional click on the back to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTopClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. If button appeared less than 450ms ago (user was scrolling when it appeared under their finger), ignore
    if (Date.now() - buttonAppearTimeRef.current < 450) {
      return;
    }

    // 2. If the user was actively scrolling the window within the last 250ms, ignore accidental taps/releases
    if (isScrollingRef.current) {
      return;
    }

    // 3. If finger dragged / swiped across the button, ignore
    if (isTouchSwipingRef.current) {
      return;
    }

    // Explicit intentional click
    scrollToTop();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    isTouchSwipingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    // If movement > 7px, this was a scroll or swipe gesture, not a deliberate tap
    if (dx > 7 || dy > 7) {
      isTouchSwipingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (isTouchSwipingRef.current || isScrollingRef.current) {
      return;
    }
    // Clean tap: clear state after click event cycle
    setTimeout(() => {
      isTouchSwipingRef.current = false;
      touchStartRef.current = null;
    }, 200);
  };

  const scrollToMenu = () => {
    const target = document.getElementById('menu');
    if (target) {
      const yOffset = -75;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // When clicking on a Category Tab in the sticky navigation
  const handleSelectCategory = (categoryId: CategoryId | 'all') => {
    setActiveCategory(categoryId);
    isUserClickingRef.current = true;
    setTimeout(() => {
      isUserClickingRef.current = false;
    }, 1100);

    // If 'all' is clicked: show all sections and scroll smoothly to the start of menu sections
    if (categoryId === 'all') {
      if (filterModeOnly) {
        setFilterModeOnly(false);
      }
      const firstSection = document.getElementById(`section-${CATEGORIES[0].id}`);
      if (firstSection) {
        const yOffset = -140;
        const y = firstSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }

    // In single filtered section view: scroll to items display area
    if (filterModeOnly) {
      const itemsContainer = document.getElementById('menu-items-container');
      if (itemsContainer) {
        const yOffset = -140;
        const y = itemsContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }

    // In sequential all-sections mode: smoothly scroll directly to that specific section
    const targetSection = document.getElementById(`section-${categoryId}`);
    if (targetSection) {
      const yOffset = -140;
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filter items logic (for search or quick filters)
  const isSearching = searchQuery.trim().length > 0 || quickFilter !== 'all';

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeArabic(searchQuery);

    return MENU_ITEMS.filter((item) => {
      // 1. If filterModeOnly is active and category is selected
      if (filterModeOnly && activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Quick filter match
      if (quickFilter === 'popular' && !item.isPopular) {
        return false;
      }
      if (quickFilter === 'under20') {
        const lowest = item.variants ? Math.min(...item.variants.map((v) => v.price)) : item.price;
        if (lowest > 20) return false;
      }
      if (quickFilter === 'with_calories' && item.calories === undefined) {
        return false;
      }

      // 3. Search query match
      if (normalizedQuery) {
        const nameNorm = normalizeArabic(item.name);
        const nameEnNorm = (item.nameEn || '').toLowerCase();
        const descNorm = normalizeArabic(item.description || '');
        const categoryMatch = normalizeArabic(
          CATEGORIES.find((c) => c.id === item.category)?.name || ''
        );

        const matches =
          nameNorm.includes(normalizedQuery) ||
          nameEnNorm.includes(normalizedQuery) ||
          descNorm.includes(normalizedQuery) ||
          categoryMatch.includes(normalizedQuery);

        if (!matches) return false;
      }

      return true;
    });
  }, [filterModeOnly, activeCategory, searchQuery, quickFilter]);

  // Counts per category for the tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 pb-24 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchModalOpen(true)} />

      {/* Main Hero Header */}
      <Hero onExploreMenu={scrollToMenu} />

      {/* Sticky Category Navigation Bar in the Menu Area */}
      <div id="menu" className="scroll-mt-10">
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Main Electronic Menu Body */}
      <main className="py-8 bg-slate-50 dark:bg-neutral-950 flex-1 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Menu Title, Description & Search Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>قائمة طعام إلكترونية معتمدة 100% من ملف المنيو الأصلي</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                  <span>المنيو الإلكتروني التفاعلي</span>
                </h1>
              </div>

              {/* View Mode Toggle: All Sequential Sections vs Single Filtered Section */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setFilterModeOnly(!filterModeOnly);
                    if (activeCategory === 'all') {
                      setActiveCategory('broasted');
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    filterModeOnly
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                      : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-neutral-800'
                  }`}
                >
                  {filterModeOnly ? (
                    <>
                      <Filter className="w-3.5 h-3.5" />
                      <span>عرض قسم محدد فقط</span>
                    </>
                  ) : (
                    <>
                      <ListCollapse className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>عرض جميع الأقسام بالتسلسل</span>
                    </>
                  )}
                </button>

                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs shadow-xs">
                  {MENU_ITEMS.length} صنفاً في 11 قسماً
                </span>
              </div>
            </div>

            {/* Instant Search Bar & Filter Chips */}
            <MenuSearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              quickFilter={quickFilter}
              onQuickFilterChange={setQuickFilter}
              totalResults={filteredItems.length}
            />
          </div>

          {/* DISPLAY MODE 1: Active Search / Keyword Filtering */}
          {isSearching ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-between text-right shadow-sm">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    نتائج البحث والتصفية ({filteredItems.length} صنف)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                    {searchQuery ? `البحث عن: «${searchQuery}»` : 'تصفية حسب الخيارات المحددة'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setQuickFilter('all');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                >
                  إلغاء البحث والعودة للمنيو
                </button>
              </div>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedItemsMap.has(item.id);
                    const qty = selectedItemsMap.get(item.id) || 0;
                    const notes = itemNotesMap.get(item.id);

                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isSelected={isSelected}
                        selectedQuantity={qty}
                        userNotes={notes}
                        onOpenDetails={(selected) => setSelectedItemForModal(selected)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center space-y-4 rounded-3xl bg-white dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 p-8 shadow-sm">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-3xl">
                    🔍
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">لم نعثر على أي أصناف مطابقة للبحث</h3>
                  <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto">
                    تأكد من كتابة اسم الصنف أو جرب البحث بكلمة عامة مثل: بروستد، كباب، عورقلب، بيتزا.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setQuickFilter('all');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    إعادة ضبط البحث
                  </button>
                </div>
              )}
            </div>
          ) : filterModeOnly && activeCategory !== 'all' ? (
            /* DISPLAY MODE 2: Single Selected Section Only */
            <div id="menu-items-container" className="space-y-6">
              {(() => {
                const categoryObj = CATEGORIES.find((c) => c.id === activeCategory);
                const itemsInThisCat = MENU_ITEMS.filter((item) => item.category === activeCategory);
                if (!categoryObj) return null;

                return (
                  <div className="space-y-5">
                    {/* Category Header */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 border border-slate-200 dark:border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right shadow-md">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl sm:text-3xl">{categoryObj.icon}</span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            {categoryObj.name}
                          </h2>
                          <span
                            className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 tracking-wide"
                            dir="ltr"
                          >
                            {categoryObj.nameEn}
                          </span>
                        </div>

                        {categoryObj.id === 'skewers_kg' && (
                          <div className="mt-2 text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 bg-orange-50 dark:bg-orange-950/60 p-2.5 rounded-xl border border-orange-200 dark:border-orange-500/30 leading-relaxed">
                            🎁 <span className="text-slate-900 dark:text-white">عرض مجاني مع كل طلب أسياخ:</span> سيخ فلفل مشوي + سيخ طماطم مشوي + سيخ بصل مشوي + صحن ثومية كريمي
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => setFilterModeOnly(false)}
                          className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-white bg-slate-100 dark:bg-neutral-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors cursor-pointer"
                        >
                          عرض كل الأقسام بالتسلسل
                        </button>
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-slate-100 dark:bg-neutral-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
                          {itemsInThisCat.length} صنف
                        </span>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {itemsInThisCat.map((item) => {
                        const isSelected = selectedItemsMap.has(item.id);
                        const qty = selectedItemsMap.get(item.id) || 0;
                        const notes = itemNotesMap.get(item.id);

                        return (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            isSelected={isSelected}
                            selectedQuantity={qty}
                            userNotes={notes}
                            onOpenDetails={(selected) => setSelectedItemForModal(selected)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* DISPLAY MODE 3: All 11 Sections Sequentially Ordered as in the Original PDF */
            <div className="space-y-16">
              {CATEGORIES.map((category) => {
                const categoryItems = MENU_ITEMS.filter((item) => item.category === category.id);
                if (categoryItems.length === 0) return null;

                return (
                  <section
                    key={category.id}
                    id={`section-${category.id}`}
                    className="scroll-mt-36 space-y-4"
                  >
                    {/* Section Header Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right shadow-sm hover:border-slate-300 dark:hover:border-neutral-700 transition-colors">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl sm:text-3xl">{category.icon}</span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            {category.name}
                          </h2>
                          <span
                            className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 tracking-wide"
                            dir="ltr"
                          >
                            {category.nameEn}
                          </span>
                        </div>

                        {/* Special Note for Skewers by KG */}
                        {category.id === 'skewers_kg' && (
                          <div className="mt-2 text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 bg-orange-50 dark:bg-orange-950/60 p-2.5 rounded-xl border border-orange-200 dark:border-orange-500/30 leading-relaxed">
                            🎁 <span className="text-slate-900 dark:text-white">عرض مجاني مع كل كيلو أو نصف كيلو:</span> سيخ فلفل مشوي + سيخ طماطم مشوي + سيخ بصل مشوي + صحن ثومية كريمي
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory(category.id);
                            setFilterModeOnly(true);
                            scrollToMenu();
                          }}
                          className="text-xs font-bold text-slate-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-100 dark:bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 hover:border-amber-500/50 transition-colors cursor-pointer"
                        >
                          تصفية هذا القسم فقط
                        </button>
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-slate-100 dark:bg-neutral-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
                          {categoryItems.length} صنف معتمد
                        </span>
                      </div>
                    </div>

                    {/* Category Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categoryItems.map((item) => {
                        const isSelected = selectedItemsMap.has(item.id);
                        const qty = selectedItemsMap.get(item.id) || 0;
                        const notes = itemNotesMap.get(item.id);

                        return (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            isSelected={isSelected}
                            selectedQuantity={qty}
                            userNotes={notes}
                            onOpenDetails={(selected) => setSelectedItemForModal(selected)}
                          />
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* About & Location Section */}
      <AboutAndLocation />

      {/* Footer */}
      <Footer />

      {/* Interactive Item Customization & Notes Modal */}
      <ItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />

      {/* Site-wide Quick Search Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectItem={(item) => setSelectedItemForModal(item)}
      />

      {/* Slide-out Cart Drawer with Order Customization */}
      <CartDrawer />

      {/* Floating Bottom Selection Bar matching user's reference */}
      <BottomSelectionBar />

      {/* Back to Top Floating Button - strictly takes user to top ONLY when clicked */}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTopClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed bottom-24 right-6 z-30 p-3.5 rounded-full bg-white/95 dark:bg-neutral-900/95 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all duration-300 shadow-xl active:scale-95 cursor-pointer pointer-events-auto select-none"
          style={{ touchAction: 'manipulation' }}
          aria-label="العودة لأعلى الصفحة"
          title="العودة لأعلى الصفحة"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ThemeProvider>
  );
}
