import React from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 text-right pt-12 pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-11 rounded-lg overflow-hidden shrink-0 shadow-md bg-white border border-slate-200 dark:border-neutral-800">
                <img
                  src={RESTAURANT_INFO.logo}
                  alt={RESTAURANT_INFO.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{RESTAURANT_INFO.name}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              أفضل خيار للبروستد المقرمش، المشويات على الفحم، والشاورما الطازجة والعصائر في الدمام. نلتزم بأعلى معايير الجودة والنظافة والطعم الأصيل.
            </p>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-bold">
              شعارنا: «{RESTAURANT_INFO.tagline}»
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  المنيو الإلكتروني الكامل
                </a>
              </li>
              <li>
                <a href="#section-broasted" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  قسم البروستد
                </a>
              </li>
              <li>
                <a href="#section-skewers_kg" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  أسياخ المشويات بالكيلو
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  الموقع وساعات العمل
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">التواصل والطلب</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone2}`}
                className="flex items-center gap-2 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>الفرع: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-600 dark:text-neutral-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-neutral-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {RESTAURANT_INFO.name}
          </div>
          <div className="flex items-center gap-1">
            <span>صُنِع بعناية لخدمة عملاء</span>
            <span className="text-slate-700 dark:text-neutral-400 font-medium">مشوار الفرسان</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
