import React, { useState } from 'react';
import { Phone, Menu, X, MapPin, Search, Sun, Moon } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <a
            href="#"
            className="flex items-center gap-3 text-slate-900 dark:text-white group whitespace-nowrap shrink-0"
          >
            <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shadow-md bg-white border border-slate-200 dark:border-neutral-800">
              <img
                src={RESTAURANT_INFO.logo}
                alt={RESTAURANT_INFO.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-neutral-100 tracking-tight leading-none group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-medium tracking-wide mt-1">
                {RESTAURANT_INFO.nameEn}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-600 dark:text-neutral-300">
            <a
              href="#menu"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              المنيو الإلكتروني
            </a>
            <a
              href="#section-broasted"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              البروستد
            </a>
            <a
              href="#section-grilled"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              المشويات
            </a>
            <a
              href="#section-skewers_kg"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              مشويات بالكيلو
            </a>
            <a
              href="#location"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>موقعنا ومواعيدنا</span>
            </a>
          </nav>

          {/* Zone 3: Search, Theme Toggle & Contact */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-amber-500/50 dark:text-amber-400 dark:hover:text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-xs group"
              aria-label={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span className="hidden md:inline text-neutral-300 group-hover:text-white">فاتح</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform" />
                  <span className="hidden md:inline text-slate-700">داكن</span>
                </>
              )}
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-amber-500/50 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs group"
              aria-label="البحث في الموقع"
            >
              <Search className="w-4 h-4 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">ابحث بالمنيو...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-slate-200 dark:bg-neutral-800 text-[10px] text-slate-600 dark:text-neutral-400 font-mono">
                Ctrl+K
              </kbd>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone1}`}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-white font-mono font-bold text-xs transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.whatsappFormatted}</span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer links */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-neutral-900/98 border-b border-slate-200 dark:border-neutral-800 px-4 py-4 space-y-3 text-right shadow-xl">
          {/* Theme Toggle row in Mobile */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-slate-700 dark:text-neutral-300">
              مظهر الموقع:
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-bold text-slate-800 dark:text-amber-400 cursor-pointer shadow-xs"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>تفعيل الوضع الفاتح</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>تفعيل الوضع الداكن</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-amber-500 dark:text-amber-400 bg-slate-50 dark:bg-neutral-950 rounded-xl border border-slate-200 dark:border-neutral-800 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>البحث الفوري في المنيو</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-neutral-500 font-mono">Ctrl+K</span>
          </button>

          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
          >
            المنيو الإلكتروني الكامل (204 أصناف)
          </a>
          <a
            href="#section-broasted"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
          >
            قسم البروستد
          </a>
          <a
            href="#section-grilled"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
          >
            قسم المشويات
          </a>
          <a
            href="#section-skewers_kg"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
          >
            مشويات بالأسياخ بالكيلو
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
          >
            الموقع وطرق التواصل
          </a>
          <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>اتصل قبل أن تصل:</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone1}`}
              className="text-amber-600 dark:text-amber-400 font-mono font-bold"
            >
              {RESTAURANT_INFO.whatsappFormatted}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
