import React, { useState, useEffect, useRef } from "react";
import logoImg from "./src/logo.png";
import {
  Home, QrCode, User, Bell, MapPin, ShieldCheck, Clock, Star,
  ChevronLeft, Camera, Check, AlertTriangle, Video, ArrowRight,
  CreditCard, Sparkles, Lock, Store, Coffee, Pill, Search,
  TrendingUp, Award, Zap, X, ChevronRight, Package, Eye
} from "lucide-react";

// ============ DESIGN TOKENS ============
const C = {
  bg: "#F3F4F6",
  card: "#FFFFFF",
  orange: "#F97316",
  orangeDark: "#EA580C",
  orangeLight: "#FFEDD5",
  orangeFaint: "#FFF7ED",
  text: "#1F2937",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  green: "#10B981",
  greenLight: "#D1FAE5",
  red: "#EF4444",
  redLight: "#FEE2E2",
};

// ============ TRANSLATIONS ============
const translations = {
  ru: {
    // App
    disputeOpened: "Спор открыт. Хост уведомлён.",
    // ExploreScreen
    location: "Янгиер",
    greeting: "Привет, Диёрбек 👋",
    subtitle: "Найди товар у соседей за углом",
    searchPlaceholder: "Поиск товаров рядом...",
    pointsInCity: "точек в Янгиере",
    kycVerified: "Все хосты прошли KYC-верификацию",
    nearbyPoints: "Точки рядом",
    onMap: "На карте",
    items: "товаров",
    scanQR: "Сканировать QR",
    scanHint: "Уже стоишь у точки? Сканируй ценник.",
    // MiniMap
    cityCenter: "Янгиер, центр",
    fourNearby: "4 точки рядом",
    // ScannerScreen
    scanning: "SCANNING",
    qrFound: "QR Найден",
    aimAtQR: "Наведите на QR ценника",
    loadingProduct: "Загружаем товар...",
    cameraAutoDetect: "Камера автоматически распознает код товара на полке.",
    simulateScan: "Симулировать сканирование (Demo)",
    // ProductScreen
    fresh: "СВЕЖИЙ",
    certified: "Сертифицирован",
    hostGuarantee: "Гарантия Хоста точки",
    sealIntact: "Пломба упаковки",
    intact: "Цела",
    ocrExpiry: "OCR срока годности",
    passed: "Пройдено",
    hostAccepted: "Хост принял в",
    sellerLabel: "Продавец",
    sales: "продаж · KYC ✓",
    pickupFromHost: "Забрать у хоста",
    description: "Описание",
    reportDefect: "Сообщить о браке",
    buyFor: "Купить за",
    // CheckoutScreen
    payment: "Оплата",
    itemLabel: "Товар",
    nuktaFee: "Комиссия NUKTA (5%)",
    includedInPrice: "входит в цену",
    hostFee: "Хосту точки (5%)",
    totalToPay: "К оплате",
    escrowProtection: "Escrow-защита:",
    escrowText: "деньги замораживаются на 3 часа после получения. Не получил товар — возврат автоматический.",
    paymentMethod: "Способ оплаты",
    recommended: "Рекомендуем",
    processing: "Обрабатываем...",
    pay: "Оплатить",
    // SuccessScreen
    paid: "Оплачено!",
    showQRToHost: "Покажите QR хосту, чтобы забрать товар",
    pickupCode: "Код выдачи",
    directions: "Маршрут",
    paymentDone: "Оплата прошла",
    moneyInEscrow: "Деньги в Escrow (3ч)",
    pickupFromHostAction: "Заберите у хоста",
    done: "Готово",
    // DisputeScreen
    reportDefectTitle: "Сообщить о браке",
    recordVideoAtShelf: "Запишите видео-распаковку у полки",
    returnPolicy: "Возврат возможен только при записи видео прямо у точки выдачи. Ушли — спор не открывается.",
    howItWorks: "Как это работает",
    videoAtShelf: "Видео у полки",
    filmUnboxing: "Снимите вскрытие товара под камерами Хоста.",
    hostConfirms: "Хост подтверждает",
    hostVoteWeight: "Голос Хоста весит 70% при принятии решения.",
    refundIn3Hours: "Возврат за 3 часа",
    moneyReturn: "Деньги вернутся из Escrow или страхового фонда.",
    posVideo: "Точка-of-Sale Video",
    recordingLabel: (s) => `Запись... ${s}с`,
    showProductAndSeal: "Покажите товар и пломбу",
    maxDuration: "Длительность: до 30 сек.",
    videoRecorded: (s) => `Видео записано (${s}с)`,
    readyToSendHost: "Готово к отправке Хосту",
    startRecording: "Начать запись",
    recordingBtn: "Запись...",
    openDispute: "Открыть спор",
    // ProfileScreen
    profile: "Профиль",
    kycSince: "KYC ✓ · с апреля 2026",
    purchases: "Покупок",
    level: "Уровень",
    myOrders: "Мои заказы",
    activeOrders: "3 активных",
    becomeSeller: "Стать продавцом",
    earnOnShelves: "Заработай на полках",
    statistics: "Статистика",
    securityKYC: "Безопасность · KYC",
    verifiedLabel: "Подтверждено",
    nuktaTeam: "Команда NUKTA",
    roleCEO: "CEO",
    roleFullstack: "Fullstack",
    roleBackend: "Backend",
    roleMarketing: "Marketing",
    // BottomTabBar
    tabOverview: "Обзор",
    tabScan: "Скан",
    tabProfile: "Профиль",
  },
  uz: {
    // App
    disputeOpened: "Nizo ochildi. Xost xabardor qilindi.",
    // ExploreScreen
    location: "Yangiyer",
    greeting: "Salom, Diyorbek 👋",
    subtitle: "Qo'shnilardagi mahsulotni top",
    searchPlaceholder: "Yaqin oradagi mahsulotlarni qidiring...",
    pointsInCity: "ta nuqta Yangiyer shahride",
    kycVerified: "Barcha xostlar KYC-tekshiruvidan o'tgan",
    nearbyPoints: "Yaqin oradagi nuqtalar",
    onMap: "Xaritada",
    items: "mahsulot",
    scanQR: "QR skanerlash",
    scanHint: "Nuqtada turibsizmi? Narx yorlig'ini skaner qiling.",
    // MiniMap
    cityCenter: "Yangiyer, markaz",
    fourNearby: "4 ta yaqin nuqta",
    // ScannerScreen
    scanning: "SKANERLASH",
    qrFound: "QR Topildi",
    aimAtQR: "QR narx yorlig'iga yo'naltiring",
    loadingProduct: "Mahsulot yuklanmoqda...",
    cameraAutoDetect: "Kamera javondagi mahsulot kodini avtomatik aniqlaydi.",
    simulateScan: "Skanerlashni simulatsiya qilish (Demo)",
    // ProductScreen
    fresh: "YANGI",
    certified: "Sertifikatlangan",
    hostGuarantee: "Nuqta xosti kafolati",
    sealIntact: "Qadoq muhri",
    intact: "Butun",
    ocrExpiry: "OCR yaroqlilik muddati",
    passed: "O'tildi",
    hostAccepted: "Xost qabul qildi",
    sellerLabel: "Sotuvchi",
    sales: "sotuv · KYC ✓",
    pickupFromHost: "Xostdan olish",
    description: "Tavsif",
    reportDefect: "Nuqsonni xabar qilish",
    buyFor: "Sotib olish",
    // CheckoutScreen
    payment: "To'lov",
    itemLabel: "Mahsulot",
    nuktaFee: "NUKTA komissiyasi (5%)",
    includedInPrice: "narxga kiritilgan",
    hostFee: "Xost ulushi (5%)",
    totalToPay: "To'lash kerak",
    escrowProtection: "Escrow-himoya:",
    escrowText: "pul olganidan so'ng 3 soat muzlatiladi. Mahsulot kelmasa — qaytarish avtomatik.",
    paymentMethod: "To'lov usuli",
    recommended: "Tavsiya etiladi",
    processing: "Ishlanmoqda...",
    pay: "To'lash",
    // SuccessScreen
    paid: "To'landi!",
    showQRToHost: "Mahsulotni olish uchun QRni xostga ko'rsating",
    pickupCode: "Berish kodi",
    directions: "Yo'nalish",
    paymentDone: "To'lov amalga oshdi",
    moneyInEscrow: "Pul Escrowda (3s)",
    pickupFromHostAction: "Xostdan oling",
    done: "Tayyor",
    // DisputeScreen
    reportDefectTitle: "Nuqsonni xabar qilish",
    recordVideoAtShelf: "Javon yonida ochilish videosini yozing",
    returnPolicy: "Qaytarish faqat mahsulot berish nuqtasida video yozilganda mumkin. Ketib qolsangiz — nizo ochilmaydi.",
    howItWorks: "Bu qanday ishlaydi",
    videoAtShelf: "Javon yonida video",
    filmUnboxing: "Mahsulot ochilishini xost kameralari ostida tasvirlang.",
    hostConfirms: "Xost tasdiqlaydi",
    hostVoteWeight: "Xost ovozi qaror qabul qilishda 70% og'irlikka ega.",
    refundIn3Hours: "3 soat ichida qaytarish",
    moneyReturn: "Pul Escrow yoki sug'urta fondidan qaytariladi.",
    posVideo: "Savdo nuqtasi videosi",
    recordingLabel: (s) => `Yozilmoqda... ${s}s`,
    showProductAndSeal: "Mahsulot va muhrni ko'rsating",
    maxDuration: "Davomiyligi: 30 s gacha.",
    videoRecorded: (s) => `Video yozildi (${s}s)`,
    readyToSendHost: "Xostga yuborishga tayyor",
    startRecording: "Yozishni boshlash",
    recordingBtn: "Yozilmoqda...",
    openDispute: "Nizoni ochish",
    // ProfileScreen
    profile: "Profil",
    kycSince: "KYC ✓ · 2026-yil aprelidan",
    purchases: "Xaridlar",
    level: "Daraja",
    myOrders: "Mening buyurtmalarim",
    activeOrders: "3 ta faol",
    becomeSeller: "Sotuvchi bo'lish",
    earnOnShelves: "Javonlarda ishlang",
    statistics: "Statistika",
    securityKYC: "Xavfsizlik · KYC",
    verifiedLabel: "Tasdiqlangan",
    nuktaTeam: "NUKTA jamoasi",
    roleCEO: "CEO",
    roleFullstack: "Fullstack",
    roleBackend: "Backend",
    roleMarketing: "Marketing",
    // BottomTabBar
    tabOverview: "Ko'rinish",
    tabScan: "Skaner",
    tabProfile: "Profil",
  },
};

// ============ MOCK DATA ============
const POINTS = [
  {
    id: 1,
    name: "Аптека №1",
    type: "Аптека",
    address: "ул. Янги Аср, 14",
    distance: "320 м",
    trustScore: 4.9,
    items: 12,
    icon: Pill,
    host: "Шахноза Каримова",
    hostSince: "2026",
    verified: true,
    bgGradient: "from-orange-50 to-orange-100",
    product: {
      id: "nk-1101",
      title: "Витамины C + Цинк",
      seller: "Шахноза Каримова",
      sellerInitials: "ШК",
      sellerRating: 4.9,
      sellerSales: 89,
      price: 18000,
      currency: "сум",
      description: "Витамины C и цинк для поддержки иммунитета. Производство: Узбекистан. Состав: аскорбиновая кислота 500мг, цинк 10мг. 30 таблеток в упаковке.",
      weight: "30 таб.",
      expiresLabel: "Срок: до 2027",
      hostCheckin: "Сегодня, 08:30",
      category: "Аптека",
      emoji: "💊",
    },
  },
  {
    id: 2,
    name: "Кафе «Бахор»",
    type: "Кафе",
    address: "ул. Мустакиллик, 7",
    distance: "560 м",
    trustScore: 4.8,
    items: 8,
    icon: Coffee,
    host: "Акмал Турсунов",
    hostSince: "2026",
    verified: true,
    bgGradient: "from-orange-50 to-amber-50",
    product: {
      id: "nk-7821",
      title: "Домашнее печенье «Курабье»",
      seller: "Зарина Рашидова",
      sellerInitials: "ЗР",
      sellerRating: 4.9,
      sellerSales: 47,
      price: 25000,
      currency: "сум",
      description: "Свежая выпечка по семейному рецепту. Без консервантов. Состав: мука, сливочное масло, сахарная пудра, желток, ваниль.",
      weight: "300 г",
      expiresLabel: "Expires in: 48h",
      hostCheckin: "Сегодня, 09:14",
      category: "Еда",
      emoji: "🍪",
    },
  },
  {
    id: 3,
    name: "Salon Hayot",
    type: "Парикмахерская",
    address: "ул. Навои, 22",
    distance: "780 м",
    trustScore: 4.7,
    items: 5,
    icon: Store,
    host: "Дилфуза Юсупова",
    hostSince: "2026",
    verified: true,
    bgGradient: "from-amber-50 to-orange-50",
    product: {
      id: "nk-3302",
      title: "Маска для волос «Аргановое масло»",
      seller: "Дилфуза Юсупова",
      sellerInitials: "ДЮ",
      sellerRating: 4.7,
      sellerSales: 31,
      price: 35000,
      currency: "сум",
      description: "Питательная маска для волос с аргановым маслом и кератином. Восстанавливает структуру повреждённых волос, придаёт блеск. Объём: 200 мл.",
      weight: "200 мл",
      expiresLabel: "Срок: до 2028",
      hostCheckin: "Вчера, 18:00",
      category: "Красота",
      emoji: "💆",
    },
  },
  {
    id: 4,
    name: "Учебный центр «Madinabonu»",
    type: "Образование",
    address: "ул. Янги Аср, 9",
    distance: "1.1 км",
    trustScore: 4.6,
    items: 15,
    icon: Store,
    host: "Бекзод Хамидов",
    hostSince: "2026",
    verified: true,
    bgGradient: "from-orange-100 to-amber-100",
    product: {
      id: "nk-4415",
      title: "Рабочие тетради (набор 10 шт.)",
      seller: "Бекзод Хамидов",
      sellerInitials: "БХ",
      sellerRating: 4.6,
      sellerSales: 112,
      price: 22000,
      currency: "сум",
      description: "Школьные тетради в клетку, 48 листов, плотная бумага 80г/м². Подходят для учеников 1–11 классов. Упаковка: 10 штук.",
      weight: "10 шт.",
      expiresLabel: "Не истекает",
      hostCheckin: "Сегодня, 10:05",
      category: "Образование",
      emoji: "📚",
    },
  },
];

// ============ NUKTA LOGO ============
function NuktaLogo({ size = 36 }) {
  return (
    <img src={logoImg} alt="NUKTA" width={size} height={size} style={{ objectFit: "contain" }} />
  );
}

// ============ LANG SWITCH ============
function LangSwitch({ lang, setLang }) {
  return (
    <div
      className="flex items-center rounded-xl overflow-hidden"
      style={{ border: `1.5px solid ${C.border}`, background: C.card }}
    >
      {["ru", "uz"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: lang === l ? C.orange : "transparent",
            color: lang === l ? "white" : C.textMuted,
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ============ HELPERS ============
function formatPrice(n) {
  return n.toLocaleString("ru-RU");
}

// ============ APP ============
export default function App() {
  const [screen, setScreen] = useState("explore");
  const [tab, setTab] = useState("explore");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [lang, setLang] = useState("ru");

  const t = translations[lang];

  const toast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const goTab = (tab_) => {
    setTab(tab_);
    if (tab_ === "explore") setScreen("explore");
    if (tab_ === "scan") setScreen("scanner");
    if (tab_ === "profile") setScreen("profile");
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #FFF7ED 0%, #F3F4F6 50%, #FFEDD5 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Phone frame */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-30 -z-10"
          style={{ background: C.orange, transform: "scale(1.1)" }}
        />

        <div
          className="relative w-96 overflow-hidden rounded-3xl shadow-2xl"
          style={{
            height: 780,
            background: C.bg,
            boxShadow: "0 25px 60px -15px rgba(249, 115, 22, 0.25), 0 30px 80px -20px rgba(0,0,0,0.3)",
          }}
        >
          <StatusBar />

          <div className="relative" style={{ height: 720 }}>
            <ScreenContainer keyName={screen}>
              {screen === "explore" && (
                <ExploreScreen
                  lang={lang}
                  setLang={setLang}
                  onPointClick={(p) => {
                    setSelectedPoint(p);
                    setScreen("product");
                  }}
                  onScanClick={() => {
                    setTab("scan");
                    setScreen("scanner");
                  }}
                />
              )}
              {screen === "scanner" && (
                <ScannerScreen
                  lang={lang}
                  onBack={() => {
                    setTab("explore");
                    setScreen("explore");
                  }}
                  onDetect={() => {
                    setSelectedPoint(POINTS[0]);
                    setScreen("product");
                    setTab("explore");
                  }}
                />
              )}
              {screen === "product" && (
                <ProductScreen
                  lang={lang}
                  point={selectedPoint || POINTS[0]}
                  product={(selectedPoint || POINTS[0]).product}
                  onBack={() => setScreen("explore")}
                  onBuy={() => setScreen("checkout")}
                  onDispute={() => setScreen("dispute")}
                />
              )}
              {screen === "checkout" && (
                <CheckoutScreen
                  lang={lang}
                  point={selectedPoint || POINTS[0]}
                  product={(selectedPoint || POINTS[0]).product}
                  onBack={() => setScreen("product")}
                  onPay={() => setScreen("success")}
                />
              )}
              {screen === "success" && (
                <SuccessScreen
                  lang={lang}
                  point={selectedPoint || POINTS[0]}
                  product={(selectedPoint || POINTS[0]).product}
                  onDone={() => {
                    setScreen("explore");
                    setTab("explore");
                  }}
                />
              )}
              {screen === "dispute" && (
                <DisputeScreen
                  lang={lang}
                  onBack={() => setScreen("product")}
                  onSubmit={() => {
                    toast(t.disputeOpened);
                    setScreen("product");
                  }}
                />
              )}
              {screen === "profile" && (
                <ProfileScreen
                  lang={lang}
                  onBack={() => { setTab("explore"); setScreen("explore"); }}
                />
              )}
            </ScreenContainer>
          </div>

          {!["scanner", "checkout", "success", "dispute"].includes(screen) && (
            <BottomTabBar lang={lang} tab={tab} onChange={goTab} />
          )}

          {showToast && (
            <div
              className="absolute bottom-24 left-4 right-4 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg"
              style={{
                background: C.text,
                color: "white",
                animation: "slideUp 0.3s ease-out",
              }}
            >
              <Check size={18} style={{ color: C.green }} />
              <span className="text-sm font-medium">{showToast}</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanLine {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .anim-fade-up { animation: fadeInUp 0.4s ease-out both; }
        .anim-scan { animation: scanLine 2.5s ease-in-out infinite; }
        .anim-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        .anim-success { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// ============ STATUS BAR ============
function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold"
      style={{ height: 32, color: C.text }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="text-[10px]">●●●●</span>
        <span className="text-[10px] ml-1">5G</span>
        <div className="w-6 h-3 border rounded-sm flex items-center px-0.5" style={{ borderColor: C.text }}>
          <div className="h-full w-4/5 rounded-sm" style={{ background: C.text }} />
        </div>
      </div>
    </div>
  );
}

// ============ SCREEN CONTAINER (with fade) ============
function ScreenContainer({ keyName, children }) {
  return (
    <div key={keyName} className="absolute inset-0 anim-fade-up overflow-hidden">
      {children}
    </div>
  );
}

// ============ SCREEN: EXPLORE ============
function ExploreScreen({ lang, setLang, onPointClick, onScanClick }) {
  const t = translations[lang];
  return (
    <div className="h-full overflow-y-auto pb-24 scrollbar-hide">
      {/* Header */}
      <div className="px-6 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NuktaLogo size={36} />
            <div>
              <div className="text-lg font-bold" style={{ color: C.text }}>
                NUKTA
              </div>
              <div className="text-[10px] -mt-0.5 flex items-center gap-1" style={{ color: C.textMuted }}>
                <MapPin size={10} /> {t.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitch lang={lang} setLang={setLang} />
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <Bell size={18} style={{ color: C.text }} />
              <div
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ background: C.orange }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hero greeting */}
      <div className="px-6 mb-4">
        <h1 className="text-2xl font-bold leading-tight" style={{ color: C.text }}>
          {t.greeting}
        </h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>
          {t.subtitle}
        </p>
      </div>

      {/* Search */}
      <div className="px-6 mb-5">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <Search size={18} style={{ color: C.textLight }} />
          <input
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: C.text }}
          />
        </div>
      </div>

      {/* Stats banner */}
      <div className="px-6 mb-5">
        <div
          className="rounded-2xl p-4 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
            boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)",
          }}
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20" style={{ background: "white" }} />
          <div className="absolute -right-4 -bottom-12 w-24 h-24 rounded-full opacity-10" style={{ background: "white" }} />

          <div className="relative">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={12} className="text-white" />
              <span className="text-[10px] font-semibold tracking-widest text-white uppercase">
                Trust Network
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-white">40+</span>
              <span className="text-xs text-white opacity-90">{t.pointsInCity}</span>
            </div>
            <div className="text-xs text-white opacity-80">
              {t.kycVerified}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: C.text }}>
            {t.nearbyPoints}
          </h2>
          <button className="text-xs font-semibold flex items-center gap-0.5" style={{ color: C.orange }}>
            {t.onMap} <ChevronRight size={12} />
          </button>
        </div>

        <MiniMap lang={lang} />
      </div>

      {/* Points list */}
      <div className="px-6 space-y-3">
        {POINTS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => onPointClick(p)}
            className="w-full text-left rounded-2xl p-4 transition-transform active:scale-95"
            style={{
              background: C.card,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              animation: `fadeInUp 0.4s ease-out ${idx * 0.05}s both`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: C.orangeFaint }}
              >
                <p.icon size={22} style={{ color: C.orange }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: C.text }}>
                    {p.name}
                  </span>
                  {p.verified && (
                    <ShieldCheck size={14} style={{ color: C.green }} fill={C.greenLight} />
                  )}
                </div>
                <div className="text-xs mb-1.5" style={{ color: C.textMuted }}>
                  {p.address} · {p.distance}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} style={{ color: C.orange }} fill={C.orange} />
                    <span className="text-xs font-semibold" style={{ color: C.text }}>
                      {p.trustScore}
                    </span>
                    <span className="text-xs" style={{ color: C.textLight }}>
                      Trust
                    </span>
                  </div>
                  <div className="w-px h-3" style={{ background: C.border }} />
                  <div className="flex items-center gap-1">
                    <Package size={12} style={{ color: C.textMuted }} />
                    <span className="text-xs" style={{ color: C.textMuted }}>
                      {p.items} {t.items}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight size={18} style={{ color: C.textLight }} className="flex-shrink-0 mt-2" />
            </div>
          </button>
        ))}
      </div>

      {/* Quick action card */}
      <div className="px-6 mt-5">
        <button
          onClick={onScanClick}
          className="w-full rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-95"
          style={{
            background: C.text,
            boxShadow: "0 8px 20px -8px rgba(31, 41, 55, 0.4)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: C.orange }}
          >
            <QrCode size={22} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold text-sm">{t.scanQR}</div>
            <div className="text-xs" style={{ color: "#9CA3AF" }}>
              {t.scanHint}
            </div>
          </div>
          <ArrowRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

// ============ MINI MAP ============
function MiniMap({ lang }) {
  const t = translations[lang];
  return (
    <div
      className="rounded-2xl overflow-hidden relative mb-4"
      style={{
        height: 130,
        background: "linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 50%, #FED7AA 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 130" preserveAspectRatio="none">
        <path d="M 0 60 Q 100 40 200 70 T 384 50" stroke="#FFFFFF" strokeWidth="6" fill="none" opacity="0.7" />
        <path d="M 90 0 L 110 130" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.6" />
        <path d="M 250 0 L 270 130" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.6" />
        <path d="M 0 100 L 384 110" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.5" />
      </svg>

      <Pin x="22%" y="35%" />
      <Pin x="55%" y="55%" />
      <Pin x="75%" y="30%" />
      <Pin x="40%" y="72%" delay="0.4s" />

      <div className="absolute" style={{ left: "48%", top: "48%" }}>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full anim-pulse-soft"
            style={{ background: "#3B82F6", width: 24, height: 24, left: -8, top: -8, opacity: 0.3 }}
          />
          <div
            className="rounded-full border-2 border-white"
            style={{ width: 12, height: 12, background: "#3B82F6", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
          />
        </div>
      </div>

      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1"
        style={{ background: "rgba(255,255,255,0.9)", color: C.text, backdropFilter: "blur(4px)" }}
      >
        <MapPin size={10} style={{ color: C.orange }} />
        {t.cityCenter}
      </div>

      <div
        className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
        style={{ background: C.text, color: "white" }}
      >
        {t.fourNearby}
      </div>
    </div>
  );
}

function Pin({ x, y, delay = "0s" }) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, animation: `fadeInUp 0.5s ease-out ${delay} both` }}
    >
      <div className="relative" style={{ transform: "translate(-50%, -100%)" }}>
        <div
          className="w-7 h-7 rounded-full rounded-br-sm flex items-center justify-center -rotate-45"
          style={{ background: C.orange, boxShadow: "0 2px 6px rgba(249,115,22,0.5)" }}
        >
          <div className="rotate-45">
            <Store size={14} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SCREEN: SCANNER ============
function ScannerScreen({ lang, onBack, onDetect }) {
  const t = translations[lang];
  const [phase, setPhase] = useState("scanning");
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPhase("detected");
      setTimeout(onDetect, 900);
    }, 3500);
    return () => clearTimeout(timerRef.current);
  }, [onDetect]);

  const handleSimulate = () => {
    clearTimeout(timerRef.current);
    setPhase("detected");
    setTimeout(onDetect, 700);
  };

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ background: "#111827" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120, 113, 108, 0.6) 0%, rgba(28, 25, 23, 0.95) 70%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 384 700" preserveAspectRatio="xMidYMid slice">
        <rect x="40" y="200" width="304" height="350" rx="8" fill="#44403C" />
        <rect x="60" y="260" width="120" height="80" rx="4" fill="#78716C" opacity="0.6" />
        <rect x="200" y="240" width="120" height="100" rx="4" fill="#A8A29E" opacity="0.5" />
        <rect x="60" y="380" width="260" height="6" fill="#1C1917" />
        <rect x="80" y="410" width="100" height="90" rx="4" fill="#78716C" opacity="0.5" />
        <rect x="200" y="400" width="100" height="100" rx="4" fill="#A8A29E" opacity="0.4" />
      </svg>

      <div className="absolute top-0 left-0 right-0 px-5 pt-12 pb-4 flex items-center justify-between z-20">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          <X size={20} className="text-white" />
        </button>
        <div
          className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full anim-pulse-soft" style={{ background: C.red }} />
          <span className="text-[11px] font-semibold text-white">{t.scanning}</span>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          <Zap size={18} className="text-white" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 240, height: 240 }}>
          {[
            { top: 0, left: 0, br: { borderTop: 3, borderLeft: 3 } },
            { top: 0, right: 0, br: { borderTop: 3, borderRight: 3 } },
            { bottom: 0, left: 0, br: { borderBottom: 3, borderLeft: 3 } },
            { bottom: 0, right: 0, br: { borderBottom: 3, borderRight: 3 } },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 36, height: 36,
                top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                borderColor: phase === "detected" ? C.green : C.orange,
                borderTopWidth: c.br.borderTop || 0,
                borderLeftWidth: c.br.borderLeft || 0,
                borderRightWidth: c.br.borderRight || 0,
                borderBottomWidth: c.br.borderBottom || 0,
                borderStyle: "solid",
                borderRadius: 6,
                transition: "border-color 0.3s",
              }}
            />
          ))}

          {phase === "scanning" && (
            <div
              className="absolute left-0 right-0 anim-scan"
              style={{
                top: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${C.orange}, transparent)`,
                boxShadow: `0 0 16px ${C.orange}`,
              }}
            />
          )}

          {phase === "detected" && (
            <div className="absolute inset-0 flex items-center justify-center anim-success">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: C.green, boxShadow: `0 0 40px ${C.green}` }}
              >
                <Check size={42} className="text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 z-20">
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <QrCode size={14} className="text-white" />
            <span className="text-[11px] font-semibold tracking-wider text-white uppercase">
              {phase === "detected" ? t.qrFound : t.aimAtQR}
            </span>
          </div>
          <p className="text-xs text-white opacity-70">
            {phase === "detected" ? t.loadingProduct : t.cameraAutoDetect}
          </p>
        </div>

        <button
          onClick={handleSimulate}
          className="w-full rounded-2xl py-3.5 font-semibold text-sm transition-transform active:scale-95"
          style={{ background: C.orange, color: "white", boxShadow: "0 8px 20px -8px rgba(249, 115, 22, 0.6)" }}
        >
          {t.simulateScan}
        </button>
      </div>
    </div>
  );
}

// ============ SCREEN: PRODUCT ============
function ProductScreen({ lang, point, product, onBack, onBuy, onDispute }) {
  const t = translations[lang];
  const p = product || POINTS[0].product;
  return (
    <div className="h-full relative" style={{ background: C.bg }}>
      <div className="absolute inset-0 overflow-y-auto pb-36 scrollbar-hide">

        {/* Hero image */}
        <div
          className="relative"
          style={{
            height: 240,
            background: "linear-gradient(135deg, #FED7AA 0%, #FDBA74 50%, #FB923C 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full" style={{ background: "rgba(255,255,255,0.25)", filter: "blur(30px)" }} />
              <div className="absolute inset-0 flex items-center justify-center text-6xl" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}>
                {p.emoji}
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 px-5 pt-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}
            >
              <ChevronLeft size={20} style={{ color: C.text }} />
            </button>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}
            >
              <Eye size={18} style={{ color: C.text }} />
            </button>
          </div>

          <div
            className="absolute bottom-3 left-5 right-5 rounded-2xl px-4 py-2.5 flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.15)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.orangeFaint }}>
              <Clock size={16} style={{ color: C.orange }} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: C.textMuted }}>Smart Expiry · OCR</div>
              <div className="text-sm font-bold" style={{ color: C.text }}>{p.expiresLabel}</div>
            </div>
            <div className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: C.greenLight, color: C.green }}>
              {t.fresh}
            </div>
          </div>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-t-3xl p-5 pt-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: C.orangeFaint, color: C.orangeDark }}>
              {p.category}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1" style={{ background: C.greenLight, color: C.green }}>
              <ShieldCheck size={10} /> {t.certified}
            </span>
          </div>
          <h2 className="text-xl font-bold leading-tight mb-0.5" style={{ color: C.text }}>{p.title}</h2>
          <div className="text-xs mb-3" style={{ color: C.textMuted }}>{p.weight} · ID {p.id}</div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold" style={{ color: C.text }}>{formatPrice(p.price)}</span>
            <span className="text-sm font-semibold" style={{ color: C.textMuted }}>{p.currency}</span>
          </div>

          {/* Safe Check */}
          <div className="rounded-2xl p-4 mb-3" style={{ background: `linear-gradient(135deg, ${C.orangeFaint} 0%, #FFFFFF 100%)`, border: `1px solid ${C.orangeLight}` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.orange }}>
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: C.text }}>Safe Check ✓</div>
                <div className="text-[10px]" style={{ color: C.textMuted }}>{t.hostGuarantee}</div>
              </div>
            </div>
            <div className="space-y-2">
              <SafeCheckRow label={t.sealIntact} value={t.intact} />
              <SafeCheckRow label={t.ocrExpiry} value={t.passed} />
              <SafeCheckRow label={t.hostAccepted} value={p.hostCheckin} />
            </div>
          </div>

          {/* Seller */}
          <div className="rounded-2xl p-4 mb-3" style={{ background: C.bg }}>
            <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: C.textMuted }}>{t.sellerLabel}</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})` }}>
                {p.sellerInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold" style={{ color: C.text }}>{p.seller}</span>
                  <ShieldCheck size={12} style={{ color: C.green }} fill={C.greenLight} />
                </div>
                <div className="flex items-center gap-2 text-[11px]" style={{ color: C.textMuted }}>
                  <Star size={10} style={{ color: C.orange }} fill={C.orange} />
                  <span className="font-semibold" style={{ color: C.text }}>{p.sellerRating}</span>
                  <span>· {p.sellerSales} {t.sales}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup point */}
          <div className="rounded-2xl p-4 mb-3" style={{ background: C.bg }}>
            <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: C.textMuted }}>{t.pickupFromHost}</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.orangeFaint }}>
                <point.icon size={18} style={{ color: C.orange }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: C.text }}>{point.name}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>{point.address} · {point.distance}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{t.description}</h3>
            <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{p.description}</p>
          </div>

          {/* Dispute */}
          <button
            onClick={onDispute}
            className="w-full rounded-2xl py-3 text-xs font-semibold flex items-center justify-center gap-2"
            style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }}
          >
            <AlertTriangle size={14} />
            {t.reportDefect}
          </button>
        </div>
      </div>

      {/* Buy bar */}
      <div
        className="absolute left-0 right-0 px-5 py-3"
        style={{
          bottom: 48,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <button
          onClick={onBuy}
          className="w-full rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
            color: "white",
            boxShadow: "0 10px 25px -8px rgba(249, 115, 22, 0.65)",
          }}
        >
          {t.buyFor} {formatPrice(p.price)} {p.currency}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function SafeCheckRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: C.textMuted }}>{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-semibold" style={{ color: C.text }}>{value}</span>
        <Check size={14} style={{ color: C.green }} strokeWidth={3} />
      </div>
    </div>
  );
}

// ============ SCREEN: CHECKOUT ============
function CheckoutScreen({ lang, point, product, onBack, onPay }) {
  const t = translations[lang];
  const p = product || POINTS[0].product;
  const [method, setMethod] = useState("payme");
  const [paying, setPaying] = useState(false);

  const total = p.price;

  const handlePay = () => {
    setPaying(true);
    setTimeout(onPay, 1400);
  };

  return (
    <div className="h-full relative" style={{ background: C.bg }}>
      <div className="absolute inset-0 overflow-y-auto pb-24 scrollbar-hide">
        <div className="px-5 pt-4 pb-2 flex items-center gap-3" style={{ background: C.bg }}>
          <button
            onClick={onBack}
            disabled={paying}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <ChevronLeft size={20} style={{ color: C.text }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: C.text }}>{t.payment}</h1>
        </div>

        <div className="px-5 mt-3 space-y-4">
          {/* Order card */}
          <div className="rounded-2xl p-4" style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: C.border }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: C.orangeFaint }}>
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{p.title}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>{p.seller}</div>
              </div>
              <div className="text-sm font-bold" style={{ color: C.text }}>{formatPrice(p.price)} {p.currency}</div>
            </div>

            <div className="pt-3 space-y-2 text-xs">
              <div className="flex justify-between" style={{ color: C.textMuted }}>
                <span>{t.itemLabel}</span><span>{formatPrice(p.price)} {p.currency}</span>
              </div>
              <div className="flex justify-between" style={{ color: C.textMuted }}>
                <span>{t.nuktaFee}</span><span>{t.includedInPrice}</span>
              </div>
              <div className="flex justify-between" style={{ color: C.textMuted }}>
                <span>{t.hostFee}</span><span>{t.includedInPrice}</span>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: C.border }}>
                <span className="font-bold" style={{ color: C.text }}>{t.totalToPay}</span>
                <span className="font-bold text-base" style={{ color: C.text }}>{formatPrice(total)} {p.currency}</span>
              </div>
            </div>
          </div>

          {/* Escrow info */}
          <div className="rounded-2xl p-3 flex items-start gap-3" style={{ background: C.orangeFaint, border: `1px solid ${C.orangeLight}` }}>
            <Lock size={18} style={{ color: C.orange }} className="flex-shrink-0 mt-0.5" />
            <div className="text-xs" style={{ color: C.text }}>
              <span className="font-bold">{t.escrowProtection}</span>{" "}
              <span style={{ color: C.textMuted }}>{t.escrowText}</span>
            </div>
          </div>

          {/* Payment methods */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: C.textMuted }}>
              {t.paymentMethod}
            </div>
            <div className="space-y-2">
              <PayMethodCard id="payme" name="Payme" tag={t.recommended} color="#00C7E6" selected={method === "payme"} onClick={() => setMethod("payme")} />
              <PayMethodCard id="click" name="Click" color="#1A77F2" selected={method === "click"} onClick={() => setMethod("click")} />
              <PayMethodCard id="uzcard" name="UzCard / Humo" color="#16A085" selected={method === "uzcard"} onClick={() => setMethod("uzcard")} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.border}` }}
      >
        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full rounded-2xl py-4 font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{
            background: paying ? C.textMuted : `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
            color: "white",
            boxShadow: paying ? "none" : "0 10px 25px -10px rgba(249, 115, 22, 0.6)",
          }}
        >
          {paying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" style={{ animation: "spin-slow 0.8s linear infinite" }} />
              {t.processing}
            </>
          ) : (
            <>
              <CreditCard size={18} />
              {t.pay} {formatPrice(total)} {p.currency}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function PayMethodCard({ id, name, tag, color, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-3 flex items-center gap-3 transition-all"
      style={{
        background: C.card,
        border: `2px solid ${selected ? C.orange : "transparent"}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ background: color }}
      >
        {name.charAt(0)}
      </div>
      <div className="flex-1 text-left flex items-center gap-2">
        <span className="font-semibold text-sm" style={{ color: C.text }}>
          {name}
        </span>
        {tag && (
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
            style={{ background: C.orangeFaint, color: C.orangeDark }}
          >
            {tag.toUpperCase()}
          </span>
        )}
      </div>
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          border: `2px solid ${selected ? C.orange : C.border}`,
          background: selected ? C.orange : "transparent",
        }}
      >
        {selected && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
    </button>
  );
}

// ============ SCREEN: SUCCESS ============
function SuccessScreen({ lang, point, onDone }) {
  const t = translations[lang];
  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div
        className="pt-12 pb-8 px-6 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)` }}
      >
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-20" style={{ background: "white" }} />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full opacity-10" style={{ background: "white" }} />

        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 anim-success"
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "white" }}
            >
              <Check size={32} style={{ color: C.orange }} strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t.paid}</h1>
          <p className="text-sm text-white opacity-90">{t.showQRToHost}</p>
        </div>
      </div>

      <div className="px-5 -mt-6 relative">
        <div
          className="rounded-3xl p-5"
          style={{ background: C.card, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.15)" }}
        >
          <div
            className="rounded-2xl p-4 mb-4 flex items-center justify-center"
            style={{ background: C.bg }}
          >
            <MockQRCode />
          </div>

          <div className="text-center mb-4">
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: C.textMuted }}>
              {t.pickupCode}
            </div>
            <div className="text-2xl font-bold tracking-widest" style={{ color: C.text }}>
              NK-7821
            </div>
          </div>

          <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: C.orangeFaint }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "white" }}
            >
              <point.icon size={18} style={{ color: C.orange }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: C.text }}>{point.name}</div>
              <div className="text-[11px]" style={{ color: C.textMuted }}>{point.address}</div>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold"
              style={{ background: C.orange, color: "white" }}
            >
              {t.directions}
            </button>
          </div>
        </div>

        <div className="mt-4 px-2">
          <TimelineRow icon={Check} label={t.paymentDone} time="9:41" done />
          <TimelineRow icon={Lock} label={t.moneyInEscrow} time="до 12:41" active />
          <TimelineRow icon={Package} label={t.pickupFromHostAction} time="—" />
        </div>
      </div>

      <div className="mt-auto px-5 pb-5">
        <button
          onClick={onDone}
          className="w-full rounded-2xl py-4 font-semibold text-sm transition-transform active:scale-95"
          style={{ background: C.text, color: "white" }}
        >
          {t.done}
        </button>
      </div>
    </div>
  );
}

function TimelineRow({ icon: Icon, label, time, done, active }) {
  const color = done ? C.green : active ? C.orange : C.textLight;
  const bg = done ? C.greenLight : active ? C.orangeFaint : C.bg;
  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: bg }}
      >
        <Icon size={14} style={{ color }} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold" style={{ color: done || active ? C.text : C.textMuted }}>
          {label}
        </div>
      </div>
      <div className="text-[11px]" style={{ color: C.textLight }}>
        {time}
      </div>
    </div>
  );
}

function MockQRCode() {
  const cells = [];
  const seed = 7821;
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      const v = (Math.sin((i * 13 + j * 7 + seed) * 1.7) + 1) / 2;
      cells.push({ i, j, fill: v > 0.5 });
    }
  }
  return (
    <svg viewBox="0 0 21 21" width="180" height="180">
      {cells.map((c, idx) =>
        c.fill ? (
          <rect key={idx} x={c.j} y={c.i} width="1" height="1" fill={C.text} />
        ) : null
      )}
      {[{ x: 0, y: 0 }, { x: 14, y: 0 }, { x: 0, y: 14 }].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="7" height="7" fill="white" />
          <rect x={p.x} y={p.y} width="7" height="7" fill="none" stroke={C.text} strokeWidth="1" />
          <rect x={p.x + 2} y={p.y + 2} width="3" height="3" fill={C.text} />
        </g>
      ))}
      <rect x="8" y="8" width="5" height="5" fill="white" />
      <rect x="9" y="9" width="3" height="3" fill={C.orange} rx="0.5" />
    </svg>
  );
}

// ============ SCREEN: DISPUTE ============
function DisputeScreen({ lang, onBack, onSubmit }) {
  const t = translations[lang];
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [recording]);

  const startRecord = () => {
    setRecording(true);
    setSeconds(0);
    setTimeout(() => {
      setRecording(false);
      setRecorded(true);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <ChevronLeft size={20} style={{ color: C.text }} />
        </button>
        <h1 className="text-lg font-bold" style={{ color: C.text }}>
          {t.reportDefectTitle}
        </h1>
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-4 scrollbar-hide">
        <div
          className="rounded-2xl p-4 mb-4 flex items-start gap-3"
          style={{ background: C.redLight, border: `1px solid #FECACA` }}
        >
          <AlertTriangle size={20} style={{ color: C.red }} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold mb-1" style={{ color: C.text }}>
              {t.recordVideoAtShelf}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#7F1D1D" }}>
              {t.returnPolicy}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-4 mb-4" style={{ background: C.card }}>
          <div className="text-[10px] font-semibold tracking-wider uppercase mb-3" style={{ color: C.textMuted }}>
            {t.howItWorks}
          </div>
          <div className="space-y-3">
            <DisputeStep n={1} title={t.videoAtShelf} body={t.filmUnboxing} active={!recorded} />
            <DisputeStep n={2} title={t.hostConfirms} body={t.hostVoteWeight} />
            <DisputeStep n={3} title={t.refundIn3Hours} body={t.moneyReturn} />
          </div>
        </div>

        <div className="rounded-2xl p-5 text-center" style={{ background: C.card }}>
          {!recorded ? (
            <>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all"
                style={{
                  background: recording ? C.redLight : C.orangeFaint,
                  transform: recording ? "scale(1.1)" : "scale(1)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: recording ? C.red : C.orange,
                    animation: recording ? "pulse-soft 1s ease-in-out infinite" : "none",
                  }}
                >
                  <Video size={26} className="text-white" />
                </div>
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: C.text }}>
                {recording ? t.recordingLabel(seconds) : t.posVideo}
              </div>
              <div className="text-xs mb-4" style={{ color: C.textMuted }}>
                {recording ? t.showProductAndSeal : t.maxDuration}
              </div>
              <button
                onClick={startRecord}
                disabled={recording}
                className="rounded-xl px-6 py-2.5 text-xs font-semibold transition-transform active:scale-95"
                style={{
                  background: recording ? C.bg : C.orange,
                  color: recording ? C.textMuted : "white",
                }}
              >
                {recording ? t.recordingBtn : t.startRecording}
              </button>
            </>
          ) : (
            <div className="anim-fade-up">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: C.greenLight }}
              >
                <Check size={36} style={{ color: C.green }} strokeWidth={3} />
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: C.text }}>
                {t.videoRecorded(seconds)}
              </div>
              <div className="text-xs mb-4" style={{ color: C.textMuted }}>
                {t.readyToSendHost}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.border}`, background: "rgba(255,255,255,0.95)" }}>
        <button
          onClick={onSubmit}
          disabled={!recorded}
          className="w-full rounded-2xl py-4 font-semibold text-sm transition-all active:scale-95"
          style={{
            background: recorded
              ? `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`
              : C.border,
            color: recorded ? "white" : C.textLight,
            boxShadow: recorded ? "0 10px 25px -10px rgba(249, 115, 22, 0.6)" : "none",
          }}
        >
          {t.openDispute}
        </button>
      </div>
    </div>
  );
}

function DisputeStep({ n, title, body, active }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
        style={{
          background: active ? C.orange : C.bg,
          color: active ? "white" : C.textMuted,
        }}
      >
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold" style={{ color: C.text }}>{title}</div>
        <div className="text-xs" style={{ color: C.textMuted }}>{body}</div>
      </div>
    </div>
  );
}

// ============ SCREEN: PROFILE ============
function ProfileScreen({ lang, onBack }) {
  const t = translations[lang];
  return (
    <div className="h-full overflow-y-auto pb-24 scrollbar-hide">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ color: C.text }}>
          {t.profile}
        </h1>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: C.card }}
        >
          <Sparkles size={16} style={{ color: C.text }} />
        </button>
      </div>

      <div className="px-5 mt-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${C.text} 0%, #374151 100%)`,
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: C.orange }} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})` }}
              >
                СД
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">Садыков Диёрбек</span>
                  <ShieldCheck size={14} style={{ color: C.green }} fill={C.greenLight} />
                </div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  {t.kycSince}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#9CA3AF" }}>
                  Trust Score
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">4.9</span>
                  <Star size={12} style={{ color: C.orange }} fill={C.orange} />
                </div>
              </div>
              <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div>
                <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#9CA3AF" }}>
                  {t.purchases}
                </div>
                <div className="text-2xl font-bold text-white">12</div>
              </div>
              <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div>
                <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#9CA3AF" }}>
                  {t.level}
                </div>
                <div className="flex items-center gap-1">
                  <Award size={14} style={{ color: C.orange }} />
                  <span className="font-bold text-white text-sm">Pro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-2">
        <MenuRow icon={Package} label={t.myOrders} hint={t.activeOrders} />
        <MenuRow icon={Store} label={t.becomeSeller} hint={t.earnOnShelves} />
        <MenuRow icon={TrendingUp} label={t.statistics} />
        <MenuRow icon={ShieldCheck} label={t.securityKYC} hint={t.verifiedLabel} />
      </div>

      <div className="px-5 mt-6">
        <div
          className="rounded-2xl p-4"
          style={{ background: C.card, border: `1px dashed ${C.orangeLight}` }}
        >
          <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: C.orange }}>
            {t.nuktaTeam}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-semibold" style={{ color: C.text }}>Садыков Д.</div>
              <div style={{ color: C.textMuted }}>{t.roleCEO}</div>
            </div>
            <div>
              <div className="font-semibold" style={{ color: C.text }}>Буранов А.</div>
              <div style={{ color: C.textMuted }}>{t.roleFullstack}</div>
            </div>
            <div>
              <div className="font-semibold" style={{ color: C.text }}>Захарян В.</div>
              <div style={{ color: C.textMuted }}>{t.roleBackend}</div>
            </div>
            <div>
              <div className="font-semibold" style={{ color: C.text }}>Носиров Т.</div>
              <div style={{ color: C.textMuted }}>{t.roleMarketing}</div>
            </div>
          </div>
          <div className="text-[10px] mt-3 text-center" style={{ color: C.textLight }}>
            IDEATHON · Янгиер · 30.04.2026
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuRow({ icon: Icon, label, hint }) {
  return (
    <button
      className="w-full rounded-2xl p-3 flex items-center gap-3"
      style={{ background: C.card, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: C.orangeFaint }}
      >
        <Icon size={18} style={{ color: C.orange }} />
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold" style={{ color: C.text }}>
          {label}
        </div>
        {hint && (
          <div className="text-xs" style={{ color: C.textMuted }}>
            {hint}
          </div>
        )}
      </div>
      <ChevronRight size={18} style={{ color: C.textLight }} />
    </button>
  );
}

// ============ BOTTOM TAB BAR ============
function BottomTabBar({ lang, tab, onChange }) {
  const t = translations[lang];
  const tabs = [
    { id: "explore", icon: Home, label: t.tabOverview },
    { id: "scan", icon: QrCode, label: t.tabScan, primary: true },
    { id: "profile", icon: User, label: t.tabProfile },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-5 pt-2 pb-4 flex items-center justify-around"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      {tabs.map((t_) => {
        const isActive = tab === t_.id;
        if (t_.primary) {
          return (
            <button
              key={t_.id}
              onClick={() => onChange(t_.id)}
              className="-mt-6 transition-transform active:scale-95"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
                  boxShadow: "0 10px 25px -8px rgba(249, 115, 22, 0.5)",
                }}
              >
                <t_.icon size={26} className="text-white" />
              </div>
            </button>
          );
        }
        return (
          <button
            key={t_.id}
            onClick={() => onChange(t_.id)}
            className="flex flex-col items-center gap-0.5 px-4 py-1"
          >
            <t_.icon size={22} style={{ color: isActive ? C.orange : C.textLight }} />
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? C.orange : C.textLight }}
            >
              {t_.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
