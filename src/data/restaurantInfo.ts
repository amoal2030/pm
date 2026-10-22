export interface RestaurantInfo {
  name: string;
  nameEn: string;
  tagline: string;
  subTagline: string;
  whatsapp: string;
  whatsappFormatted: string;
  phone1: string;
  phone2: string;
  logo: string;
  address: string;
  addressDetails: string;
  mapsUrl: string;
  workingHours: string;
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "بروستد مشوار الفرسان",
  nameEn: "Meshwar Al Forsan Broasted",
  tagline: "اتصل قبل أن تصل",
  subTagline: "أشهى بروستد مقرمش، مشويات طازجة على الفحم، وشاورما وفطائر وعصائر طبيعية على أصولها في حي الفرسان بالدمام",
  whatsapp: "966530111352",
  whatsappFormatted: "053 011 1352",
  phone1: "0530111352",
  phone2: "0530111352",
  logo: "/assets/aistudio/image_d5528c1b.png",
  address: "محطة بترو هلا - حي الفرسان - طريق الدمام الرياض السريع",
  addressDetails: "الدمام، حي الفرسان، طريق الدمام - الرياض السريع، محطة بترو هلا",
  mapsUrl: "https://maps.app.goo.gl/f5oGGiNFEkMrYZR4A",
  workingHours: "يومياً من الساعة 12:00 ظهراً حتى 02:00 بعد منتصف الليل",
};
