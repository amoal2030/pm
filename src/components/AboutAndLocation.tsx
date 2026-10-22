import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const AboutAndLocation: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-slate-100/60 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-900 text-right transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* About Restaurant & Promise */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-6 shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 text-xs font-bold mb-3">
                <span>عن مشوار الفرسان</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                طعم أصيل، جودة مضمونة، وخدمة سريعة
              </h2>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mt-3">
                في مطعم <strong>بروستد مشوار الفرسان</strong>، نحرص على تقديم أشهى وجبات البروستد المقرمش المصنوعة من الدجاج الطازج اليومي، إضافة إلى المشويات المتبلة على الفحم بالأسياخ، والشاورما والفطائر والعصائر الطبيعية 100%. شعارنا الدائم <strong>«اتصل قبل أن تصل»</strong> لضمان استلام وجبتك ساخنة وطازجة بدون أي انتظار.
              </p>
            </div>

            {/* Service Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-neutral-200">
                  دجاج ولحوم طازجة يومياً بتتبيلات سرية حصرية
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-neutral-200">
                  خدمة استلام سريعة بالسيارة: اتصل قبل وصولك لتجد طلبك جاهزاً
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-neutral-200">
                  عروض خاصة على أسياخ المشويات بالكيلو مع مقبلات مجانية
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 dark:text-orange-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-neutral-400 font-medium">أوقات العمل:</div>
                <div className="text-sm font-bold text-slate-900 dark:text-neutral-100">{RESTAURANT_INFO.workingHours}</div>
              </div>
            </div>
          </div>

          {/* Location & Quick Contact Card */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-6 shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-xs font-bold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>موقعنا الجغرافي</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {RESTAURANT_INFO.address}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 mt-2">
                موقع متميز يسهل الوصول إليه على طريق الدمام - الرياض السريع داخل محطة بترو هلا بحي الفرسان.
              </p>
            </div>

            {/* Location Navigation Button */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-neutral-400">خرائط Google:</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">حي الفرسان · الدمام</span>
              </div>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>فتح الموقع مباشرة على خرائط Google</span>
              </a>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أود الطلب من بروستد مشوار الفرسان')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone1}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 font-bold text-sm border border-slate-200 dark:border-neutral-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>اتصال مباشر: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
