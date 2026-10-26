import JSZip from 'jszip';
import { MENU_ITEMS } from '../data/menuData';
import { COFFEE_ORIGINS } from '../data/originsData';
import { BREW_METHODS } from '../data/brewData';

// Generates the pristine, standalone index.html
export function generateStandaloneHTML(): string {
  return `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Salam Kopi - Kedai Kopi & Specialty Coffee Nusantara</title>
  <meta name="description" content="Website resmi Salam Kopi - Jelajahi menu kopi spesial nusantara, pesan online, seduh manual brew, dan nikmati racikan kopi terbaik." />
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          },
          colors: {
            coffee: {
              50: '#FAF7F2',
              100: '#EFE8DD',
              200: '#E7DFD5',
              300: '#D7C4B7',
              400: '#A8A29E',
              500: '#78716C',
              600: '#57534E',
              700: '#44403C',
              800: '#292524',
              900: '#1C1917',
              dark: '#29170E',
              primary: '#451A03',
              terracotta: '#C2410C',
              warmgold: '#FDE68A',
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Custom Stylesheet -->
  <link rel="stylesheet" href="style.css" />
</head>
<body class="bg-[#FAF7F2] text-[#292524] font-sans antialiased selection:bg-[#C2410C]/20 selection:text-[#C2410C]">

  <!-- Top Announcement Promo Ticker -->
  <div class="bg-[#451A03] text-[#FAF7F2] py-2 px-4 text-xs font-medium border-b border-[#2E1002]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2 text-[#FDE68A] flex-shrink-0">
        <i data-lucide="tag" class="w-3.5 h-3.5"></i>
        <span class="font-semibold uppercase tracking-wider text-[11px]">Promo Kedai</span>
      </div>
      
      <div class="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5 text-xs text-[#FAF7F2]/90">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <span>☕ Bawa Tumbler Sendiri Diskon Rp 3.000</span>
          <span class="text-[#C2410C] font-bold">·</span>
          <span>🥐 Bundling Sarapan: Kopi Susu Aren + Croissant Mentega cuma Rp 38.000</span>
          <span class="text-[#C2410C] font-bold">·</span>
          <span>🛵 Gratis Ongkir radius 3 KM pemesanan WhatsApp minimal Rp 75.000</span>
          <span class="text-[#C2410C] font-bold">·</span>
          <span>🌱 100% Single Origin Fair-Trade dari Petani Bener Meriah & Kintamani</span>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-1.5 text-[11px] text-[#E7DFD5]">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Roaster Aktif Hari Ini</span>
      </div>
    </div>
  </div>

  <!-- Navigation Header -->
  <header id="main-header" class="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="#" class="flex items-center gap-3 group text-left">
        <div class="w-10 h-10 rounded-xl bg-[#451A03] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#C2410C] transition-colors">
          <i data-lucide="coffee" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#292524]">
              Salam Kopi
            </span>
            <span class="text-[10px] font-semibold text-[#C2410C] uppercase tracking-widest hidden sm:inline-block">
              Kedai & POS
            </span>
          </div>
          <p class="text-[11px] text-[#78716C] -mt-0.5 hidden sm:block">
            Kopi Nusantara & Sistem Toko Terpadu
          </p>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-2 text-xs font-semibold">
        <button onclick="switchView('customer-menu')" id="nav-btn-customer-menu" class="nav-tab active px-3 py-1.5 rounded-xl bg-[#451A03] text-white flex items-center gap-1.5 transition-all">
          <i data-lucide="store" class="w-3.5 h-3.5"></i>
          <span>Menu Kopi</span>
        </button>
        <button onclick="switchView('dashboard')" id="nav-btn-dashboard" class="nav-tab px-3 py-1.5 rounded-xl text-[#57534E] hover:text-[#C2410C] hover:bg-[#EFE8DD] flex items-center gap-1.5 transition-all">
          <i data-lucide="bar-chart-3" class="w-3.5 h-3.5 text-[#C2410C]"></i>
          <span>Dasbor</span>
        </button>
        <button onclick="switchView('pos')" id="nav-btn-pos" class="nav-tab px-3 py-1.5 rounded-xl text-[#57534E] hover:text-[#C2410C] hover:bg-[#EFE8DD] flex items-center gap-1.5 transition-all">
          <i data-lucide="credit-card" class="w-3.5 h-3.5 text-[#16A34A]"></i>
          <span>Kasir (POS)</span>
        </button>
        <button onclick="switchView('warehouse')" id="nav-btn-warehouse" class="nav-tab px-3 py-1.5 rounded-xl text-[#57534E] hover:text-[#C2410C] hover:bg-[#EFE8DD] flex items-center gap-1.5 transition-all">
          <i data-lucide="package" class="w-3.5 h-3.5 text-[#0284C7]"></i>
          <span>Gudang Stok</span>
        </button>
      </nav>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-2.5">
        
        <!-- Cart Drawer Trigger -->
        <button onclick="toggleCartDrawer(true)" class="relative flex items-center gap-2 bg-[#451A03] hover:bg-[#290E02] text-white px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer">
          <i data-lucide="shopping-bag" class="w-4 h-4 text-[#FDE68A]"></i>
          <div class="hidden sm:flex flex-col text-left">
            <span id="cart-btn-count" class="text-xs font-semibold leading-tight">0 Item</span>
            <span id="cart-btn-total" class="text-[10px] text-[#FDE68A] font-mono leading-none">Rp 0</span>
          </div>
          <span id="cart-badge-mobile" class="sm:hidden w-5 h-5 bg-[#C2410C] text-white text-[11px] font-bold rounded-full flex items-center justify-center hidden">
            0
          </span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button onclick="toggleMobileNav()" class="lg:hidden p-2 rounded-lg text-[#57534E] hover:bg-[#EFE8DD] transition-colors">
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Submenu -->
    <div id="mobile-nav" class="hidden lg:hidden border-t border-[#E7DFD5] px-4 py-3 bg-[#FAF7F2] space-y-1">
      <button onclick="switchView('customer-menu'); toggleMobileNav();" class="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-[#451A03] text-white">
        <i data-lucide="store" class="w-4 h-4"></i> Menu Kopi
      </button>
      <button onclick="switchView('dashboard'); toggleMobileNav();" class="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#57534E] hover:bg-[#EFE8DD]">
        <i data-lucide="bar-chart-3" class="w-4 h-4 text-[#C2410C]"></i> Dasbor Finansial
      </button>
      <button onclick="switchView('pos'); toggleMobileNav();" class="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#57534E] hover:bg-[#EFE8DD]">
        <i data-lucide="credit-card" class="w-4 h-4 text-[#16A34A]"></i> Kasir POS
      </button>
      <button onclick="switchView('warehouse'); toggleMobileNav();" class="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#57534E] hover:bg-[#EFE8DD]">
        <i data-lucide="package" class="w-4 h-4 text-[#0284C7]"></i> Stok & Gudang
      </button>
    </div>
  </header>

  <!-- VIEW 1: CUSTOMER STOREFRONT -->
  <main id="view-customer-menu" class="view-panel block">
    
    <!-- Hero Section -->
    <section class="relative pt-12 pb-16 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2.5 text-xs text-[#78716C] bg-[#EFE8DD] px-3.5 py-1.5 rounded-full">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-medium text-[#44403C]">Kedai Buka Hari Ini</span>
              <span class="text-[#A8A29E]">·</span>
              <span>07:00 – 23:00 WIB</span>
            </div>

            <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#292524] leading-[1.15]">
              Salam Hangat dari Secangkir Kopi <span class="text-[#C2410C] italic font-normal">Terbaik Nusantara.</span>
            </h1>

            <p class="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dari lereng sejuk Bener Meriah Aceh hingga tanah vulkanik Kintamani Bali. Dipanggang segar setiap minggu di roastery kami, diseduh sepenuh rasa untuk menemani harimu.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a href="#menu-catalog" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#451A03] text-[#FAF7F2] font-semibold text-sm hover:bg-[#2B1002] transition-all shadow-md">
                <span>Buka Menu & Pesan</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
              <a href="#prompt-barista" class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#D7C4B7] text-[#44403C] font-semibold text-sm hover:border-[#C2410C] hover:text-[#C2410C] transition-all shadow-xs">
                <i data-lucide="sparkles" class="w-4 h-4 text-[#C2410C]"></i>
                <span>Barista Prompt AI</span>
              </a>
              <a href="#origins-section" class="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-[#78716C] hover:text-[#C2410C] transition-colors">
                <span>Peta Kopi Nusantara</span>
              </a>
            </div>

            <!-- Highlights -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7DFD5]">
              <div>
                <p class="font-serif text-2xl font-bold text-[#451A03]">100%</p>
                <p class="text-xs text-[#78716C]">Biji Asli Nusantara</p>
              </div>
              <div>
                <p class="font-serif text-2xl font-bold text-[#451A03]">4.9 ★</p>
                <p class="text-xs text-[#78716C]">Dari 12.000+ Cangkir</p>
              </div>
              <div>
                <p class="font-serif text-2xl font-bold text-[#451A03]">4 Cabang</p>
                <p class="text-xs text-[#78716C]">Jakarta, BDG, JOG, Bali</p>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="lg:col-span-5 relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square max-w-md mx-auto">
              <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" alt="Salam Kopi Specialty" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div class="text-white">
                  <span class="px-2.5 py-1 rounded-full bg-[#C2410C] text-[11px] font-bold uppercase tracking-wider">Signature #1</span>
                  <h3 class="font-serif text-xl font-bold mt-1">Kopi Susu Gula Aren Salam</h3>
                  <p class="text-xs text-[#FAF7F2]/90">Espresso Gayo & Sirup Aren Smoky Karamel</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Menu Catalog Section -->
    <section id="menu-catalog" class="py-14 bg-white border-y border-[#E7DFD5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-bold text-[#C2410C] uppercase tracking-widest">Koleksi Rasa</span>
            <h2 class="font-serif text-2xl sm:text-4xl font-bold text-[#292524] mt-1">Daftar Menu Salam Kopi</h2>
            <p class="text-xs sm:text-sm text-[#78716C] mt-1">Pilih minuman favoritmu, tentukan suhu, level gula, hingga pilihan susu nabati.</p>
          </div>

          <!-- Search Input -->
          <div class="w-full md:w-72 relative">
            <i data-lucide="search" class="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="text" id="menu-search" oninput="filterMenuItems()" placeholder="Cari nama kopi, rasa, atau bahan..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D7C4B7] bg-[#FAF7F2] text-xs focus:outline-none focus:border-[#C2410C]" />
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8" id="category-pills">
          <button onclick="setMenuCategory('all')" class="cat-pill active px-4 py-2 rounded-xl text-xs font-semibold bg-[#451A03] text-white whitespace-nowrap shadow-xs">Semua Menu</button>
          <button onclick="setMenuCategory('signature')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Signature Kopi Susu</button>
          <button onclick="setMenuCategory('manual-brew')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Manual Brew Nusantara</button>
          <button onclick="setMenuCategory('classic')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Espresso & Klasik</button>
          <button onclick="setMenuCategory('non-coffee')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Non-Kopi & Teh</button>
          <button onclick="setMenuCategory('snack')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Camilan & Pastry</button>
          <button onclick="setMenuCategory('beans')" class="cat-pill px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#57534E] hover:bg-[#EFE8DD] whitespace-nowrap border border-[#E7DFD5]">Biji Kopi (250g)</button>
        </div>

        <!-- Menu Grid -->
        <div id="menu-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Rendered dynamically by app.js -->
        </div>

      </div>
    </section>

    <!-- Barista Prompt Interactive Section -->
    <section id="prompt-barista" class="py-14 bg-[#FAF7F2]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="bg-gradient-to-br from-[#451A03] to-[#2E1002] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div class="relative z-10 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2410C]/80 text-[#FDE68A] text-xs font-semibold">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Barista AI Assistant</span>
            </div>

            <h2 class="font-serif text-2xl sm:text-3xl font-bold">Bingung mau pesan apa hari ini?</h2>
            <p class="text-xs sm:text-sm text-[#E7DFD5] max-w-xl">
              Pilih suasana hati atau kebutuhan energimu, biar barista AI kami yang memilihkan racikan kopi terbaik untukmu!
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2" id="mood-options">
              <button onclick="getBaristaRec('ngantuk')" class="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all">
                <p class="font-semibold text-xs sm:text-sm text-[#FDE68A]">⚡ Butuh Kafein Kuat</p>
                <p class="text-[11px] text-[#FAF7F2]/80 mt-0.5">Tugas numpuk, mata berat & butuh fokus tinggi.</p>
              </button>
              <button onclick="getBaristaRec('santai')" class="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all">
                <p class="font-semibold text-xs sm:text-sm text-[#FDE68A]">🍯 Creamy, Manis & Santai</p>
                <p class="text-[11px] text-[#FAF7F2]/80 mt-0.5">Nongkrong sore santai dengan rasa gurih manis aren.</p>
              </button>
              <button onclick="getBaristaRec('segar')" class="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all">
                <p class="font-semibold text-xs sm:text-sm text-[#FDE68A]">🍃 Segar & Dingin Cuaca Panas</p>
                <p class="text-[11px] text-[#FAF7F2]/80 mt-0.5">Sensasi buah sitrus, aroma pandan, atau kelapa bakar.</p>
              </button>
              <button onclick="getBaristaRec('expert')" class="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all">
                <p class="font-semibold text-xs sm:text-sm text-[#FDE68A]">☕ Penikmat Kopi Hitam Kompleks</p>
                <p class="text-[11px] text-[#FAF7F2]/80 mt-0.5">Manual brew V60 dengan notes buah-buahan eksotis.</p>
              </button>
            </div>

            <!-- Barista Result Box -->
            <div id="barista-result" class="hidden mt-6 p-4 rounded-2xl bg-white/15 border border-white/20 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider text-[#FDE68A] font-bold">Rekomendasi Barista:</span>
                <span id="barista-rec-category" class="text-[10px] bg-[#C2410C] px-2 py-0.5 rounded-full font-bold">Signature</span>
              </div>
              <h4 id="barista-rec-title" class="font-serif text-lg font-bold text-white">Kopi Susu Gula Aren Salam</h4>
              <p id="barista-rec-reason" class="text-xs text-[#FAF7F2]/90 leading-relaxed"></p>
              <div class="flex items-center gap-3 pt-2">
                <button id="barista-rec-add-btn" class="px-4 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                  + Pesan Sekarang Langsung
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Origins Section -->
    <section id="origins-section" class="py-14 bg-white border-t border-[#E7DFD5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold text-[#C2410C] uppercase tracking-widest">Kekayaan Alam Nusantara</span>
          <h2 class="font-serif text-2xl sm:text-4xl font-bold text-[#292524] mt-1">Jejak Asal Biji Kopi Salam</h2>
          <p class="text-xs sm:text-sm text-[#78716C] mt-2">Bermitra langsung dengan kelompok tani mandiri di dataran tinggi Nusantara dengan prinsip perdagangan berkeadilan (Fair Trade).</p>
        </div>

        <div id="origins-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Rendered dynamically by app.js -->
        </div>
      </div>
    </section>

    <!-- Brew Guide Section -->
    <section id="brew-guide" class="py-14 bg-[#FAF7F2] border-t border-[#E7DFD5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-bold text-[#C2410C] uppercase tracking-widest">Edukasi Barista</span>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#292524] mt-1">Panduan Seduh Manual Rumahan</h2>
            <p class="text-xs sm:text-sm text-[#78716C] mt-1">Rasio emas, temperatur air, dan gilingan yang tepat agar kopi di rumah selezat buatan kafe.</p>
          </div>
        </div>

        <div id="brew-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Rendered by app.js -->
        </div>
      </div>
    </section>

    <!-- Store Locations Section -->
    <section id="locations" class="py-14 bg-white border-t border-[#E7DFD5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold text-[#C2410C] uppercase tracking-widest">Kunjungi Kami</span>
          <h2 class="font-serif text-2xl sm:text-4xl font-bold text-[#292524] mt-1">Cabang Salam Kopi</h2>
          <p class="text-xs sm:text-sm text-[#78716C] mt-2">Temukan kedai terdekat untuk menikmati suasana hangat, WiFi kencang, dan racikan kopi segar.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
            <span class="px-2.5 py-0.5 rounded-full bg-[#451A03] text-white text-[10px] font-bold">Pusat Roastery</span>
            <h3 class="font-serif text-lg font-bold">Senopati, Jakarta</h3>
            <p class="text-xs text-[#78716C]">Jl. Senopati No. 42B, Kebayoran Baru, Jakarta Selatan</p>
            <p class="text-xs font-semibold text-[#C2410C]">07:00 – 23:00 WIB</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
            <span class="px-2.5 py-0.5 rounded-full bg-[#C2410C] text-white text-[10px] font-bold">Cabang Bandung</span>
            <h3 class="font-serif text-lg font-bold">Dago Atas, Bandung</h3>
            <p class="text-xs text-[#78716C]">Jl. Rancakendal No. 18, Dago Atas, Coblong, Bandung</p>
            <p class="text-xs font-semibold text-[#C2410C]">07:00 – 22:00 WIB</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
            <span class="px-2.5 py-0.5 rounded-full bg-[#C2410C] text-white text-[10px] font-bold">Cabang Jogja</span>
            <h3 class="font-serif text-lg font-bold">Prawirotaman, DIY</h3>
            <p class="text-xs text-[#78716C]">Jl. Prawirotaman I No. 27, Brontokusuman, Yogyakarta</p>
            <p class="text-xs font-semibold text-[#C2410C]">08:00 – 24:00 WIB</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
            <span class="px-2.5 py-0.5 rounded-full bg-[#C2410C] text-white text-[10px] font-bold">Cabang Bali</span>
            <h3 class="font-serif text-lg font-bold">Canggu, Bali</h3>
            <p class="text-xs text-[#78716C]">Jl. Pantai Batu Bolong No. 88, Canggu, Kuta Utara, Bali</p>
            <p class="text-xs font-semibold text-[#C2410C]">06:30 – 21:00 WITA</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- VIEW 2: FINANCIAL DASHBOARD -->
  <section id="view-dashboard" class="view-panel hidden py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#292524]">Dasbor Finansial & Operasional</h2>
          <p class="text-xs sm:text-sm text-[#78716C]">Ringkasan pendapatan, omset harian, keuntungan kotor, dan riwayat transaksi kasir.</p>
        </div>
        <button onclick="switchView('customer-menu')" class="self-start px-3 py-1.5 rounded-xl bg-[#EFE8DD] text-xs font-bold text-[#44403C] hover:bg-[#E7DFD5]">
          ← Kembali ke Menu Pelanggan
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
          <p class="text-xs font-semibold text-[#78716C]">Total Penjualan Hari Ini</p>
          <p id="dash-stat-revenue" class="font-serif text-2xl font-bold text-[#451A03] mt-1">Rp 1.840.000</p>
          <p class="text-[11px] text-emerald-600 font-medium mt-1">↑ +14.2% vs kemarin</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
          <p class="text-xs font-semibold text-[#78716C]">Transaksi Berhasil</p>
          <p id="dash-stat-tx" class="font-serif text-2xl font-bold text-[#C2410C] mt-1">48 Pesanan</p>
          <p class="text-[11px] text-[#78716C] mt-1">Rata-rata: Rp 38.300/pesanan</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
          <p class="text-xs font-semibold text-[#78716C]">Estimasi Laba Kotor</p>
          <p id="dash-stat-profit" class="font-serif text-2xl font-bold text-emerald-700 mt-1">Rp 1.104.000</p>
          <p class="text-[11px] text-[#78716C] mt-1">Margin rata-rata ~60%</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
          <p class="text-xs font-semibold text-[#78716C]">Status Kasir</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-sm font-bold text-[#292524]">Kasir Online (Shift 1)</span>
          </div>
          <p class="text-[11px] text-[#78716C] mt-1">Kasir Aktif: Dinda Larasati</p>
        </div>
      </div>

      <!-- Transaction Log -->
      <div class="bg-white rounded-2xl border border-[#E7DFD5] p-5 shadow-xs">
        <h3 class="font-serif text-lg font-bold mb-4">Transaksi Kasir Terakhir</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#FAF7F2] text-[#78716C] uppercase font-bold text-[10px]">
              <tr>
                <th class="p-3">ID Nota</th>
                <th class="p-3">Waktu</th>
                <th class="p-3">Pelanggan</th>
                <th class="p-3">Tipe</th>
                <th class="p-3">Total</th>
                <th class="p-3">Pembayaran</th>
              </tr>
            </thead>
            <tbody id="dash-tx-tbody" class="divide-y divide-[#E7DFD5]">
              <!-- Filled by JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- VIEW 3: POS TERMINAL -->
  <section id="view-pos" class="view-panel hidden py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- POS Left: Quick Menu Selection -->
      <div class="lg:col-span-7 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="font-serif text-2xl font-bold text-[#292524]">Terminal Kasir (POS)</h2>
          <button onclick="switchView('customer-menu')" class="px-3 py-1.5 rounded-xl bg-[#EFE8DD] text-xs font-bold text-[#44403C]">
            Tutup Kasir
          </button>
        </div>

        <div id="pos-menu-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <!-- Rendered by app.js -->
        </div>
      </div>

      <!-- POS Right: Register Bill -->
      <div class="lg:col-span-5 bg-white rounded-2xl border border-[#E7DFD5] p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-[#E7DFD5] pb-3">
          <div>
            <h3 class="font-serif text-base font-bold">Struk Kasir</h3>
            <p class="text-[11px] text-[#78716C]">Shift 1 · Kasir 01</p>
          </div>
          <button onclick="clearPosCart()" class="text-xs text-red-600 hover:underline">Hapus Semua</button>
        </div>

        <!-- POS Cart Items -->
        <div id="pos-cart-items" class="space-y-2 max-h-[300px] overflow-y-auto">
          <p class="text-center text-xs text-[#A8A29E] py-8">Belum ada item dipilih di kasir.</p>
        </div>

        <!-- POS Totals -->
        <div class="border-t border-[#E7DFD5] pt-3 space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-[#78716C]">Subtotal:</span>
            <span id="pos-subtotal" class="font-mono font-bold">Rp 0</span>
          </div>
          <div class="flex justify-between text-base font-bold text-[#451A03] pt-2 border-t border-[#E7DFD5]">
            <span>Total Bayar:</span>
            <span id="pos-total" class="font-mono">Rp 0</span>
          </div>
        </div>

        <!-- Quick Cash Buttons -->
        <div class="grid grid-cols-3 gap-2 pt-2">
          <button onclick="posQuickPay(20000)" class="py-2 rounded-lg bg-[#FAF7F2] border border-[#D7C4B7] text-xs font-bold hover:bg-[#EFE8DD]">Rp 20.000</button>
          <button onclick="posQuickPay(50000)" class="py-2 rounded-lg bg-[#FAF7F2] border border-[#D7C4B7] text-xs font-bold hover:bg-[#EFE8DD]">Rp 50.000</button>
          <button onclick="posQuickPay(100000)" class="py-2 rounded-lg bg-[#FAF7F2] border border-[#D7C4B7] text-xs font-bold hover:bg-[#EFE8DD]">Rp 100.000</button>
        </div>

        <button onclick="posProcessOrder()" class="w-full py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-md transition-all">
          Selesaikan Transaksi & Cetak Struk
        </button>
      </div>

    </div>
  </section>

  <!-- VIEW 4: WAREHOUSE STOCK -->
  <section id="view-warehouse" class="view-panel hidden py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-serif text-2xl font-bold text-[#292524]">Manajemen Stok & Bahan Baku</h2>
          <p class="text-xs sm:text-sm text-[#78716C]">Pantau ketersediaan biji kopi roast beans, susu, sirup aren, dan kemasan.</p>
        </div>
        <button onclick="switchView('customer-menu')" class="px-3 py-1.5 rounded-xl bg-[#EFE8DD] text-xs font-bold">
          ← Kembali ke Menu
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-[#E7DFD5] p-5 shadow-xs overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[#FAF7F2] text-[#78716C] uppercase font-bold text-[10px]">
            <tr>
              <th class="p-3">Bahan / Item</th>
              <th class="p-3">Kategori</th>
              <th class="p-3">Stok Saat Ini</th>
              <th class="p-3">Batas Minimum</th>
              <th class="p-3">Status</th>
              <th class="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody id="warehouse-tbody" class="divide-y divide-[#E7DFD5]">
            <!-- Rendered by app.js -->
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ITEM CUSTOMIZATION MODAL -->
  <div id="customize-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
      <button onclick="closeCustomizeModal()" class="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 text-[#78716C]">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div>
        <span id="cust-modal-category" class="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">Signature</span>
        <h3 id="cust-modal-title" class="font-serif text-xl font-bold text-[#292524] mt-0.5">Kopi Susu Gula Aren Salam</h3>
        <p id="cust-modal-desc" class="text-xs text-[#78716C] mt-1"></p>
      </div>

      <!-- Size Selection -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-[#44403C]">Pilihan Ukuran Cup:</label>
        <div class="grid grid-cols-2 gap-2" id="cust-size-options">
          <button type="button" onclick="setCustOption('size', 'reguler')" data-val="reguler" class="cust-btn active p-2.5 rounded-xl border border-[#D7C4B7] text-xs font-semibold text-center">
            Reguler (12oz)
          </button>
          <button type="button" onclick="setCustOption('size', 'large')" data-val="large" class="cust-btn p-2.5 rounded-xl border border-[#D7C4B7] text-xs font-semibold text-center">
            Large (16oz) +Rp 4.000
          </button>
        </div>
      </div>

      <!-- Temperature Selection -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-[#44403C]">Suhu Sajian:</label>
        <div class="grid grid-cols-2 gap-2" id="cust-temp-options">
          <button type="button" onclick="setCustOption('temperature', 'iced')" data-val="iced" class="cust-btn active p-2.5 rounded-xl border border-[#D7C4B7] text-xs font-semibold text-center">
            Dingin (Iced)
          </button>
          <button type="button" onclick="setCustOption('temperature', 'hot')" data-val="hot" class="cust-btn p-2.5 rounded-xl border border-[#D7C4B7] text-xs font-semibold text-center">
            Panas (Hot)
          </button>
        </div>
      </div>

      <!-- Sugar Level -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-[#44403C]">Tingkat Kemanisan:</label>
        <div class="grid grid-cols-3 gap-2" id="cust-sugar-options">
          <button type="button" onclick="setCustOption('sugar', 'normal')" data-val="normal" class="cust-btn active p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Normal 100%</button>
          <button type="button" onclick="setCustOption('sugar', 'less')" data-val="less" class="cust-btn p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Sedikit 50%</button>
          <button type="button" onclick="setCustOption('sugar', 'none')" data-val="none" class="cust-btn p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Tanpa Gula</button>
        </div>
      </div>

      <!-- Milk Choice -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-[#44403C]">Pilihan Susu:</label>
        <div class="grid grid-cols-3 gap-2" id="cust-milk-options">
          <button type="button" onclick="setCustOption('milk', 'fresh-milk')" data-val="fresh-milk" class="cust-btn active p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Fresh Milk</button>
          <button type="button" onclick="setCustOption('milk', 'oat')" data-val="oat" class="cust-btn p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Oatmilk (+6k)</button>
          <button type="button" onclick="setCustOption('milk', 'almond')" data-val="almond" class="cust-btn p-2 rounded-lg border border-[#D7C4B7] text-[11px] font-semibold text-center">Almond (+7k)</button>
        </div>
      </div>

      <!-- Add to cart CTA -->
      <div class="pt-2 border-t border-[#E7DFD5] flex items-center justify-between">
        <div>
          <span class="text-[11px] text-[#78716C] block">Total Harga:</span>
          <span id="cust-modal-price" class="font-serif text-lg font-bold text-[#451A03]">Rp 24.000</span>
        </div>
        <button onclick="confirmAddToCart()" class="px-5 py-3 rounded-xl bg-[#451A03] hover:bg-[#2B1002] text-white text-xs font-bold shadow-md transition-all">
          Tambahkan ke Keranjang
        </button>
      </div>

    </div>
  </div>

  <!-- SLIDE-OVER CART DRAWER -->
  <div id="cart-drawer-overlay" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs hidden" onclick="toggleCartDrawer(false)"></div>
  <aside id="cart-drawer" class="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#FAF7F2] z-50 shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300">
    <div class="p-4 sm:p-5 border-b border-[#E7DFD5] flex items-center justify-between bg-white">
      <div class="flex items-center gap-2">
        <i data-lucide="shopping-bag" class="w-5 h-5 text-[#C2410C]"></i>
        <h3 class="font-serif text-lg font-bold">Keranjang Pesanan</h3>
      </div>
      <button onclick="toggleCartDrawer(false)" class="p-1.5 rounded-full hover:bg-gray-100 text-[#78716C]">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Tumbler Promo Banner in Cart -->
    <div class="px-5 py-3 bg-[#FEF3C7] border-b border-[#FDE68A] flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-[#92400E]">
        <i data-lucide="coffee" class="w-4 h-4"></i>
        <span>Bawa Tumbler Sendiri? Hemat Rp 3.000</span>
      </div>
      <input type="checkbox" id="cart-tumbler-check" onchange="toggleTumblerDiscount(this.checked)" class="w-4 h-4 rounded text-[#C2410C] cursor-pointer" />
    </div>

    <!-- Items List -->
    <div id="cart-items-list" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
      <!-- Injected by app.js -->
    </div>

    <!-- Cart Footer & Checkout -->
    <div class="p-5 bg-white border-t border-[#E7DFD5] space-y-3">
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-[#78716C]">
          <span>Subtotal:</span>
          <span id="cart-subtotal" class="font-mono font-medium">Rp 0</span>
        </div>
        <div id="cart-discount-row" class="flex justify-between text-emerald-700 hidden">
          <span>Diskon Tumbler Hijau:</span>
          <span class="font-mono font-medium">-Rp 3.000</span>
        </div>
        <div class="flex justify-between text-base font-bold text-[#451A03] pt-2 border-t border-[#E7DFD5]">
          <span>Total Akhir:</span>
          <span id="cart-total" class="font-mono">Rp 0</span>
        </div>
      </div>

      <button onclick="openCheckoutModal()" id="cart-checkout-btn" class="w-full py-3.5 rounded-xl bg-[#451A03] hover:bg-[#2B1002] text-white text-xs font-bold shadow-md transition-all">
        Lanjut ke Pembayaran & Checkout
      </button>
    </div>
  </aside>

  <!-- CHECKOUT MODAL -->
  <div id="checkout-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
      <button onclick="closeCheckoutModal()" class="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 text-[#78716C]">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div>
        <h3 class="font-serif text-xl font-bold text-[#292524]">Konfirmasi Pemesanan</h3>
        <p class="text-xs text-[#78716C] mt-0.5">Lengkapi informasi untuk memproses pesananmu.</p>
      </div>

      <!-- Order Details Form -->
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-semibold mb-1">Nama Pemesan:</label>
          <input type="text" id="chk-name" value="Budi Santoso" class="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-[#FAF7F2]" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold mb-1">Tipe Pesanan:</label>
            <select id="chk-type" class="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-[#FAF7F2]">
              <option value="dine-in">Dine-in (Makan di Tempat)</option>
              <option value="pick-up">Pick-up (Bawa Pulang)</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1">Nomor Meja / Alamat:</label>
            <input type="text" id="chk-table" value="Meja 04" class="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-[#FAF7F2]" />
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1">Metode Pembayaran:</label>
          <div class="grid grid-cols-2 gap-2" id="chk-pay-methods">
            <button type="button" onclick="setPaymentMethod('QRIS')" class="pay-btn active p-3 rounded-xl border border-[#D7C4B7] text-left font-semibold">
              <span class="block text-xs">📱 QRIS Instan</span>
              <span class="text-[10px] text-[#78716C]">GoPay, OVO, ShopeePay, BCA</span>
            </button>
            <button type="button" onclick="setPaymentMethod('Tunai')" class="pay-btn p-3 rounded-xl border border-[#D7C4B7] text-left font-semibold">
              <span class="block text-xs">💵 Tunai / Cash</span>
              <span class="text-[10px] text-[#78716C]">Bayar di kasir kedai</span>
            </button>
            <button type="button" onclick="setPaymentMethod('Debit/Kartu')" class="pay-btn p-3 rounded-xl border border-[#D7C4B7] text-left font-semibold">
              <span class="block text-xs">💳 Kartu Debit / EDC</span>
              <span class="text-[10px] text-[#78716C]">BCA, Mandiri, BRI, BNI</span>
            </button>
            <button type="button" onclick="setPaymentMethod('Transfer')" class="pay-btn p-3 rounded-xl border border-[#D7C4B7] text-left font-semibold">
              <span class="block text-xs">🏦 Transfer Bank</span>
              <span class="text-[10px] text-[#78716C]">Virtual Account</span>
            </button>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-between">
        <span class="text-xs font-semibold text-[#78716C]">Total Tagihan:</span>
        <span id="chk-total-price" class="font-serif text-xl font-bold text-[#451A03]">Rp 0</span>
      </div>

      <button onclick="submitOrder()" class="w-full py-3.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-lg transition-all">
        Bayar Sekarang & Cetak Struk
      </button>
    </div>
  </div>

  <!-- THERMAL RECEIPT MODAL -->
  <div id="receipt-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
      <div class="text-center border-b border-dashed border-gray-300 pb-3">
        <h4 class="font-serif text-base font-bold">SALAM KOPI NUSANTARA</h4>
        <p class="text-[10px] text-gray-500">Jl. Senopati No. 42B, Jakarta Selatan</p>
        <p class="text-[10px] text-gray-500">Telp: 0812-8822-7711</p>
      </div>

      <div id="receipt-content" class="space-y-2">
        <!-- Rendered by app.js -->
      </div>

      <div class="border-t border-dashed border-gray-300 pt-3 text-center space-y-2">
        <p class="text-[10px] text-gray-500">Terima kasih atas kunjungan Anda!</p>
        <div class="flex items-center gap-2">
          <button onclick="window.print()" class="flex-1 py-2 rounded-lg bg-[#451A03] text-white text-[11px] font-sans font-bold">
            Cetak Struk
          </button>
          <button onclick="closeReceiptModal()" class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-sans">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 bg-[#451A03] text-white px-4 py-3 rounded-xl shadow-xl border border-[#78350F] items-center gap-2.5 text-xs font-medium hidden">
    <i data-lucide="check-circle" class="w-4 h-4 text-[#FDE68A]"></i>
    <span id="toast-text">Berhasil menambahkan item</span>
  </div>

  <!-- Main Footer -->
  <footer class="bg-[#29170E] text-[#FAF7F2] pt-14 pb-8 border-t border-[#3D2316]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#3D2316]">
        
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#C2410C] text-white flex items-center justify-center">
              <i data-lucide="coffee" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="font-serif text-2xl font-bold tracking-tight">Salam Kopi</span>
              <span class="text-xs text-[#FDE68A] block font-sans">Kedai Kopi & Specialty Coffee Nusantara</span>
            </div>
          </div>
          <p class="text-xs text-[#D7C4B7] leading-relaxed max-w-sm">
            Menghubungkan petani kopi dataran tinggi Indonesia langsung dengan cangkirmu. Disangrai dengan penuh cinta, disajikan dengan salam hangat kebersamaan.
          </p>
        </div>

        <div class="lg:col-span-3 space-y-3">
          <h4 class="font-serif text-sm font-bold text-[#FDE68A] uppercase tracking-wider">Jelajahi</h4>
          <ul class="space-y-2 text-xs text-[#D7C4B7]">
            <li><a href="#menu-catalog" class="hover:text-white">Menu Minuman</a></li>
            <li><a href="#prompt-barista" class="hover:text-white">Barista Prompt AI</a></li>
            <li><a href="#origins-section" class="hover:text-white">Biji Kopi Nusantara</a></li>
            <li><a href="#brew-guide" class="hover:text-white">Panduan Seduh Rumahan</a></li>
            <li><a href="#locations" class="hover:text-white">Lokasi Kedai</a></li>
          </ul>
        </div>

        <div class="lg:col-span-4 space-y-3">
          <h4 class="font-serif text-sm font-bold text-[#FDE68A] uppercase tracking-wider">Hubungi Barista</h4>
          <div class="space-y-2 text-xs text-[#D7C4B7]">
            <p>Pusat Roastery: Jl. Senopati No. 42B, Jakarta Selatan</p>
            <p>WhatsApp: +62 812-8822-7711 (Fast Respon)</p>
            <p class="text-[#A8A29E]">Buka Setiap Hari: 07:00 – 23:00 WIB</p>
          </div>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29E] gap-3">
        <p>© 2026 Salam Kopi Indonesia. Hak cipta dilindungi undang-undang.</p>
        <p>Dibuat untuk pecinta kopi Nusantara ☕</p>
      </div>
    </div>
  </footer>

  <!-- Application Logic -->
  <script src="app.js"></script>
  <script>
    // Initialize Lucide Icons
    lucide.createIcons();
  </script>
</body>
</html>`;
}

// Generates the pristine style.css
export function generateStandaloneCSS(): string {
  return `/* Salam Kopi - Standalone CSS Stylesheet */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --color-coffee-bg: #FAF7F2;
  --color-coffee-dark: #29170E;
  --color-coffee-primary: #451A03;
  --color-coffee-terracotta: #C2410C;
  --color-coffee-gold: #FDE68A;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-coffee-bg);
  color: #292524;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #FAF7F2;
}
::-webkit-scrollbar-thumb {
  background: #D7C4B7;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #A8A29E;
}

/* Hide scrollbars for carousel navigation */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Nav Tab Active states */
.nav-tab.active {
  background-color: #451A03 !important;
  color: #ffffff !important;
}

/* Category Pill Active states */
.cat-pill.active {
  background-color: #451A03 !important;
  color: #ffffff !important;
  border-color: #451A03 !important;
}

/* Customizer Button Active state */
.cust-btn.active {
  border-color: #C2410C !important;
  background-color: #FEF3C7 !important;
  color: #9A3412 !important;
  font-weight: 700 !important;
}

/* Payment Method Button Active state */
.pay-btn.active {
  border-color: #C2410C !important;
  background-color: #FFF7ED !important;
  box-shadow: 0 0 0 1px #C2410C !important;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.view-panel {
  animation: fadeIn 0.25s ease-out;
}

/* Thermal printer receipt styling */
@media print {
  body * {
    visibility: hidden;
  }
  #receipt-modal, #receipt-modal * {
    visibility: visible;
  }
  #receipt-modal {
    position: absolute;
    left: 0;
    top: 0;
    width: 80mm;
    background: white;
    padding: 0;
  }
}
`;
}

// Generates the comprehensive, fully-functional app.js
export function generateStandaloneJS(): string {
  // Serialize MENU_ITEMS, COFFEE_ORIGINS, BREW_METHODS into pure JS
  const menuJson = JSON.stringify(MENU_ITEMS, null, 2);
  const originsJson = JSON.stringify(COFFEE_ORIGINS, null, 2);
  const brewJson = JSON.stringify(BREW_METHODS, null, 2);

  return `/**
 * Salam Kopi - Standalone Client JavaScript
 * Zero external dependencies except Lucide Icons and Tailwind CDN
 */

// DATA STORE
const MENU_DATA = ${menuJson};
const ORIGINS_DATA = ${originsJson};
const BREW_DATA = ${brewJson};

let cart = JSON.parse(localStorage.getItem('salamkopi_cart') || '[]');
let bringTumbler = false;
let currentCategory = 'all';
let searchQuery = '';
let selectedItemForCustomizing = null;
let currentCustomization = {
  size: 'reguler',
  temperature: 'iced',
  sugar: 'normal',
  milk: 'fresh-milk'
};
let selectedPaymentMethod = 'QRIS';

// Initial Warehouse Inventory
let warehouseStock = [
  { id: '1', name: 'Arabika Aceh Gayo (Roasted Bean)', cat: 'Biji Kopi', stock: '14.5 kg', min: '5 kg', status: 'Aman' },
  { id: '2', name: 'Arabika Bali Kintamani (Roasted Bean)', cat: 'Biji Kopi', stock: '8.2 kg', min: '4 kg', status: 'Aman' },
  { id: '3', name: 'Susu Segar Greenfield Pasteurisasi', cat: 'Susu & Dairy', stock: '18 Liter', min: '10 Liter', status: 'Aman' },
  { id: '4', name: 'Oatside Barista Oat Milk', cat: 'Susu Nabati', stock: '4 Liter', min: '8 Liter', status: 'Menipis' },
  { id: '5', name: 'Sirup Gula Aren Organik Murni', cat: 'Sirup & Manisan', stock: '12 Liter', min: '5 Liter', status: 'Aman' },
  { id: '6', name: 'Cup Dingin 16oz Biodegradable', cat: 'Kemasan', stock: '450 pcs', min: '200 pcs', status: 'Aman' }
];

// Initial Transactions Log
let transactionsLog = [
  { id: 'TRX-9481', time: '14:22', customer: 'Budi S.', type: 'Dine-in (Meja 04)', total: 48000, method: 'QRIS' },
  { id: 'TRX-9480', time: '14:05', customer: 'Sarah W.', type: 'Take-away', total: 64000, method: 'Debit BCA' },
  { id: 'TRX-9479', time: '13:50', customer: 'Reza P.', type: 'Dine-in (Meja 02)', total: 32000, method: 'Tunai' },
  { id: 'TRX-9478', time: '13:28', customer: 'Nadya A.', type: 'Delivery', total: 88000, method: 'QRIS' }
];

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderOrigins();
  renderBrewGuide();
  renderWarehouse();
  renderTransactions();
  renderPosMenu();
  updateCartUI();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// VIEW ROUTER
function switchView(viewId) {
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.add('hidden');
    panel.classList.remove('block');
  });

  const target = document.getElementById('view-' + viewId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('block');
  }

  // Update navbar button styles
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.remove('active', 'bg-[#451A03]', 'text-white');
    btn.classList.add('text-[#57534E]');
  });
  const activeBtn = document.getElementById('nav-btn-' + viewId);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-[#451A03]', 'text-white');
    activeBtn.classList.remove('text-[#57534E]');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  const el = document.getElementById('mobile-nav');
  if (el) el.classList.toggle('hidden');
}

// MENU RENDERING & FILTERING
function renderMenu() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  const filtered = MENU_DATA.filter(item => {
    const matchCat = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tastingNotes && item.tastingNotes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="col-span-full py-12 text-center text-[#78716C]">Tidak ada menu yang sesuai pencarian.</div>';
    return;
  }

  container.innerHTML = filtered.map(item => \`
    <div class="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E7DFD5] hover:border-[#C2410C]/40 hover:shadow-lg transition-all flex flex-col">
      <div class="relative aspect-4/3 overflow-hidden bg-[#EFE8DD]">
        <img src="\${item.image}" alt="\${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        \${item.tag ? \`<span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#451A03]/90 text-[#FDE68A] text-[10px] font-bold backdrop-blur-xs">\${item.tag}</span>\` : ''}
        <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/95 text-[#292524] text-xs font-bold font-mono shadow-xs">
          Rp \${item.price.toLocaleString('id-ID')}
        </span>
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div class="flex items-center justify-between gap-1 text-[11px] text-[#78716C] mb-1">
            <span class="truncate">\${item.origin || 'Kopi Nusantara'}</span>
            \${item.rating ? \`<span class="text-amber-600 font-bold flex-shrink-0">★ \${item.rating}</span>\` : ''}
          </div>
          <h3 class="font-serif text-base font-bold text-[#292524] group-hover:text-[#C2410C] transition-colors leading-snug">
            \${item.name}
          </h3>
          <p class="text-xs text-[#57534E] line-clamp-2 mt-1 leading-relaxed">
            \${item.description}
          </p>

          \${item.tastingNotes ? \`
            <div class="flex flex-wrap gap-1 mt-2.5">
              \${item.tastingNotes.slice(0, 3).map(n => \`
                <span class="text-[10px] bg-white border border-[#E7DFD5] text-[#78716C] px-2 py-0.5 rounded-md">\${n}</span>
              \`).join('')}
            </div>
          \` : ''}
        </div>

        <div class="pt-2 border-t border-[#E7DFD5] flex items-center gap-2">
          <button onclick="openCustomizeModal('\${item.id}')" class="flex-1 py-2 px-3 rounded-xl bg-[#451A03] hover:bg-[#2B1002] text-white text-xs font-semibold text-center transition-all shadow-xs">
            Pesan & Kustom
          </button>
          <button onclick="quickAdd('\${item.id}')" title="Tambah Cepat" class="p-2 rounded-xl bg-white border border-[#D7C4B7] hover:border-[#C2410C] hover:text-[#C2410C] transition-colors">
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  \`).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setMenuCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('active', 'bg-[#451A03]', 'text-white');
    btn.classList.add('bg-[#FAF7F2]', 'text-[#57534E]');
  });
  event.target.classList.add('active', 'bg-[#451A03]', 'text-white');
  event.target.classList.remove('bg-[#FAF7F2]', 'text-[#57534E]');
  renderMenu();
}

function filterMenuItems() {
  const input = document.getElementById('menu-search');
  searchQuery = input ? input.value : '';
  renderMenu();
}

// ORIGINS RENDERING
function renderOrigins() {
  const container = document.getElementById('origins-grid');
  if (!container) return;

  container.innerHTML = ORIGINS_DATA.map(o => \`
    <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] hover:border-[#C2410C]/40 transition-all space-y-3">
      <div class="aspect-16/9 rounded-xl overflow-hidden bg-gray-200">
        <img src="\${o.image}" alt="\${o.region}" class="w-full h-full object-cover" loading="lazy" />
      </div>
      <div>
        <span class="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider">\${o.island} · \${o.altitude}</span>
        <h3 class="font-serif text-base font-bold text-[#292524] mt-0.5">\${o.region}</h3>
      </div>
      <p class="text-xs text-[#57534E] leading-relaxed line-clamp-3">\${o.story}</p>
      
      <div class="space-y-1.5 pt-2 border-t border-[#E7DFD5] text-[11px]">
        <div class="flex justify-between text-[#78716C]">
          <span>Acidity (Keasaman):</span>
          <span class="font-bold text-[#C2410C]">\${'★'.repeat(o.acidity)}\${'☆'.repeat(5-o.acidity)}</span>
        </div>
        <div class="flex justify-between text-[#78716C]">
          <span>Body (Kekentalan):</span>
          <span class="font-bold text-[#451A03]">\${'★'.repeat(o.body)}\${'☆'.repeat(5-o.body)}</span>
        </div>
      </div>
    </div>
  \`).join('');
}

// BREW GUIDE RENDERING
function renderBrewGuide() {
  const container = document.getElementById('brew-grid');
  if (!container) return;

  container.innerHTML = BREW_DATA.map(b => \`
    <div class="p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-serif text-lg font-bold text-[#451A03]">\${b.name}</h3>
        <span class="px-2 py-0.5 rounded-full bg-[#EFE8DD] text-[#44403C] text-[10px] font-bold">\${b.difficulty}</span>
      </div>
      <p class="text-xs text-[#78716C]">\${b.description}</p>
      <div class="grid grid-cols-3 gap-2 py-2 px-3 bg-[#FAF7F2] rounded-xl text-center text-xs">
        <div>
          <span class="text-[10px] text-[#A8A29E] block">Rasio</span>
          <span class="font-bold">\${b.ratio}</span>
        </div>
        <div>
          <span class="text-[10px] text-[#A8A29E] block">Suhu Air</span>
          <span class="font-bold">\${b.temp}</span>
        </div>
        <div>
          <span class="text-[10px] text-[#A8A29E] block">Waktu</span>
          <span class="font-bold">\${b.time}</span>
        </div>
      </div>
      <ol class="text-xs text-[#57534E] space-y-1.5 list-decimal pl-4">
        \${b.steps.slice(0, 3).map(s => \`<li>\${s}</li>\`).join('')}
      </ol>
    </div>
  \`).join('');
}

// BARISTA PROMPT RECOMMENDATION
function getBaristaRec(mood) {
  const box = document.getElementById('barista-result');
  const title = document.getElementById('barista-rec-title');
  const reason = document.getElementById('barista-rec-reason');
  const addBtn = document.getElementById('barista-rec-add-btn');

  let recItem = MENU_DATA[0];
  let expl = '';

  if (mood === 'ngantuk') {
    recItem = MENU_DATA.find(i => i.id === 'double-espresso') || MENU_DATA[0];
    expl = 'Double Shot Espresso murni dari blend Aceh Gayo & Robusta Temanggung. Pahit mantap, kaya krema, dan ampuh mengembalikan fokus seketika!';
  } else if (mood === 'santai') {
    recItem = MENU_DATA.find(i => i.id === 'kopi-susu-salam') || MENU_DATA[0];
    expl = 'Kopi Susu Gula Aren Salam dengan sirup gula aren smoky alami dan susu gurih. Pas banget dinikmati santai sore hari.';
  } else if (mood === 'segar') {
    recItem = MENU_DATA.find(i => i.id === 'kopi-susu-kelapa-bakar') || MENU_DATA.find(i => i.id === 'kopi-susu-pandan') || MENU_DATA[0];
    expl = 'Kopi Kelapa Bakar dingin atau Pandan Wangi. Sensasi santan gurih panggang dan air kelapa muda bikin dahaga langsung hilang.';
  } else if (mood === 'expert') {
    recItem = MENU_DATA.find(i => i.category === 'manual-brew') || MENU_DATA[0];
    expl = 'Single origin V60 Aceh Gayo Anaerobic Winey. Profil rasa buah persik matang, aroma anggur merah, dan aftertaste manis madu.';
  }

  title.innerText = recItem.name;
  reason.innerText = expl;
  addBtn.onclick = () => {
    quickAdd(recItem.id);
    toggleCartDrawer(true);
  };

  box.classList.remove('hidden');
}

// CUSTOMIZE MODAL
function openCustomizeModal(itemId) {
  selectedItemForCustomizing = MENU_DATA.find(i => i.id === itemId);
  if (!selectedItemForCustomizing) return;

  document.getElementById('cust-modal-category').innerText = selectedItemForCustomizing.category.toUpperCase();
  document.getElementById('cust-modal-title').innerText = selectedItemForCustomizing.name;
  document.getElementById('cust-modal-desc').innerText = selectedItemForCustomizing.description;
  
  currentCustomization = {
    size: 'reguler',
    temperature: selectedItemForCustomizing.defaultTemp || 'iced',
    sugar: 'normal',
    milk: 'fresh-milk'
  };

  updateCustomizePrice();
  document.getElementById('customize-modal').classList.remove('hidden');
}

function closeCustomizeModal() {
  document.getElementById('customize-modal').classList.add('hidden');
}

function setCustOption(type, val) {
  currentCustomization[type] = val;
  const container = document.getElementById('cust-' + type + '-options');
  if (container) {
    container.querySelectorAll('.cust-btn').forEach(btn => {
      if (btn.dataset.val === val) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  updateCustomizePrice();
}

function updateCustomizePrice() {
  if (!selectedItemForCustomizing) return;
  let price = selectedItemForCustomizing.price;
  if (currentCustomization.size === 'large') price += 4000;
  if (currentCustomization.milk === 'oat') price += 6000;
  if (currentCustomization.milk === 'almond') price += 7000;
  document.getElementById('cust-modal-price').innerText = 'Rp ' + price.toLocaleString('id-ID');
}

function confirmAddToCart() {
  if (!selectedItemForCustomizing) return;
  let unitPrice = selectedItemForCustomizing.price;
  if (currentCustomization.size === 'large') unitPrice += 4000;
  if (currentCustomization.milk === 'oat') unitPrice += 6000;
  if (currentCustomization.milk === 'almond') unitPrice += 7000;

  const cartId = selectedItemForCustomizing.id + '-' + currentCustomization.size + '-' + currentCustomization.temperature + '-' + currentCustomization.sugar + '-' + currentCustomization.milk;
  const existing = cart.find(i => i.cartId === cartId);

  if (existing) {
    existing.quantity += 1;
    existing.totalPrice = existing.quantity * existing.unitPrice;
  } else {
    cart.push({
      cartId: cartId,
      item: selectedItemForCustomizing,
      customization: { ...currentCustomization },
      unitPrice: unitPrice,
      quantity: 1,
      totalPrice: unitPrice
    });
  }

  saveCart();
  closeCustomizeModal();
  showToast('✓ "' + selectedItemForCustomizing.name + '" masuk keranjang!');
}

function quickAdd(itemId) {
  const item = MENU_DATA.find(i => i.id === itemId);
  if (!item) return;

  const cartId = item.id + '-reguler-iced-normal-fresh-milk';
  const existing = cart.find(i => i.cartId === cartId);
  if (existing) {
    existing.quantity += 1;
    existing.totalPrice = existing.quantity * existing.unitPrice;
  } else {
    cart.push({
      cartId: cartId,
      item: item,
      customization: { size: 'reguler', temperature: 'iced', sugar: 'normal', milk: 'fresh-milk' },
      unitPrice: item.price,
      quantity: 1,
      totalPrice: item.price
    });
  }

  saveCart();
  showToast('✓ "' + item.name + '" ditambahkan!');
}

// CART MANAGEMENT
function saveCart() {
  localStorage.setItem('salamkopi_cart', JSON.stringify(cart));
  updateCartUI();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (open) {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
  } else {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }
}

function updateCartUI() {
  const count = cart.reduce((acc, i) => acc + i.quantity, 0);
  const rawSubtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  const discount = bringTumbler ? 3000 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discount);

  // Update nav triggers
  const btnCount = document.getElementById('cart-btn-count');
  const btnTotal = document.getElementById('cart-btn-total');
  const badgeMobile = document.getElementById('cart-badge-mobile');

  if (btnCount) btnCount.innerText = count + ' Item';
  if (btnTotal) btnTotal.innerText = 'Rp ' + finalTotal.toLocaleString('id-ID');
  if (badgeMobile) {
    badgeMobile.innerText = count;
    if (count > 0) badgeMobile.classList.remove('hidden');
    else badgeMobile.classList.add('hidden');
  }

  // Update Drawer List
  const list = document.getElementById('cart-items-list');
  if (list) {
    if (cart.length === 0) {
      list.innerHTML = \`
        <div class="text-center py-16 text-[#A8A29E] space-y-2">
          <i data-lucide="coffee" class="w-10 h-10 mx-auto text-[#D7C4B7]"></i>
          <p class="text-xs">Keranjang Anda masih kosong.</p>
          <button onclick="toggleCartDrawer(false)" class="text-xs text-[#C2410C] font-bold underline">Lihat Menu</button>
        </div>
      \`;
    } else {
      list.innerHTML = cart.map(i => \`
        <div class="p-3.5 rounded-xl bg-white border border-[#E7DFD5] flex items-center justify-between gap-3 shadow-2xs">
          <div class="flex-1 min-w-0">
            <h4 class="font-serif text-xs font-bold truncate text-[#292524]">\${i.item.name}</h4>
            <p class="text-[10px] text-[#78716C]">\${i.customization.size} · \${i.customization.temperature} · \${i.customization.sugar}</p>
            <p class="text-xs font-mono font-bold text-[#C2410C] mt-0.5">Rp \${i.totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <div class="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-lg border border-[#E7DFD5]">
            <button onclick="updateItemQty('\${i.cartId}', \${i.quantity - 1})" class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-200">-</button>
            <span class="w-6 text-center text-xs font-mono font-bold">\${i.quantity}</span>
            <button onclick="updateItemQty('\${i.cartId}', \${i.quantity + 1})" class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-200">+</button>
          </div>
        </div>
      \`).join('');
    }
  }

  // Update Subtotals
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const discountRow = document.getElementById('cart-discount-row');

  if (subtotalEl) subtotalEl.innerText = 'Rp ' + rawSubtotal.toLocaleString('id-ID');
  if (totalEl) totalEl.innerText = 'Rp ' + finalTotal.toLocaleString('id-ID');
  if (discountRow) {
    if (bringTumbler && rawSubtotal > 0) discountRow.classList.remove('hidden');
    else discountRow.classList.add('hidden');
  }

  if (window.lucide) window.lucide.createIcons();
}

function updateItemQty(cartId, newQty) {
  if (newQty <= 0) {
    cart = cart.filter(i => i.cartId !== cartId);
  } else {
    const item = cart.find(i => i.cartId === cartId);
    if (item) {
      item.quantity = newQty;
      item.totalPrice = item.quantity * item.unitPrice;
    }
  }
  saveCart();
}

function toggleTumblerDiscount(checked) {
  bringTumbler = checked;
  updateCartUI();
}

// CHECKOUT & PAYMENT
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Keranjang masih kosong!');
    return;
  }
  toggleCartDrawer(false);

  const rawSubtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  const discount = bringTumbler ? 3000 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discount);

  document.getElementById('chk-total-price').innerText = 'Rp ' + finalTotal.toLocaleString('id-ID');
  document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.add('hidden');
}

function setPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pay-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function submitOrder() {
  const name = document.getElementById('chk-name').value || 'Pelanggan Kedai';
  const type = document.getElementById('chk-type').value;
  const table = document.getElementById('chk-table').value;
  const rawSubtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  const discount = bringTumbler ? 3000 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discount);

  const newTrxId = 'TRX-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  // Record to transactions
  transactionsLog.unshift({
    id: newTrxId,
    time: timeStr,
    customer: name,
    type: type + ' (' + table + ')',
    total: finalTotal,
    method: selectedPaymentMethod
  });

  renderTransactions();
  closeCheckoutModal();

  // Show thermal receipt
  showReceipt({
    id: newTrxId,
    time: timeStr,
    customer: name,
    type: type,
    table: table,
    items: [...cart],
    subtotal: rawSubtotal,
    discount: discount,
    total: finalTotal,
    paymentMethod: selectedPaymentMethod
  });

  // Empty cart
  cart = [];
  bringTumbler = false;
  saveCart();
}

// THERMAL RECEIPT
function showReceipt(data) {
  const container = document.getElementById('receipt-content');
  if (!container) return;

  container.innerHTML = \`
    <div class="space-y-1 text-[11px]">
      <div class="flex justify-between"><span>No. Nota:</span><span>\${data.id}</span></div>
      <div class="flex justify-between"><span>Waktu:</span><span>\${data.time} WIB</span></div>
      <div class="flex justify-between"><span>Pelanggan:</span><span>\${data.customer}</span></div>
      <div class="flex justify-between"><span>Pesanan:</span><span>\${data.type} (\${data.table})</span></div>
      <div class="flex justify-between"><span>Bayar:</span><span>\${data.paymentMethod}</span></div>
    </div>

    <div class="border-t border-b border-dashed border-gray-300 py-2 space-y-1 my-2">
      \${data.items.map(i => \`
        <div class="flex justify-between text-[11px]">
          <span>\${i.quantity}x \${i.item.name}</span>
          <span>Rp \${i.totalPrice.toLocaleString('id-ID')}</span>
        </div>
      \`).join('')}
    </div>

    <div class="space-y-1 text-[11px]">
      <div class="flex justify-between"><span>Subtotal:</span><span>Rp \${data.subtotal.toLocaleString('id-ID')}</span></div>
      \${data.discount > 0 ? \`<div class="flex justify-between text-emerald-700"><span>Diskon Tumbler:</span><span>-Rp \${data.discount.toLocaleString('id-ID')}</span></div>\` : ''}
      <div class="flex justify-between font-bold text-xs pt-1 border-t border-gray-200">
        <span>TOTAL:</span>
        <span>Rp \${data.total.toLocaleString('id-ID')}</span>
      </div>
    </div>
  \`;

  document.getElementById('receipt-modal').classList.remove('hidden');
}

function closeReceiptModal() {
  document.getElementById('receipt-modal').classList.add('hidden');
}

// POS TERMINAL LOGIC
let posCart = [];

function renderPosMenu() {
  const container = document.getElementById('pos-menu-grid');
  if (!container) return;

  container.innerHTML = MENU_DATA.slice(0, 12).map(item => \`
    <button onclick="posAddItem('\${item.id}')" class="p-3 bg-white rounded-xl border border-[#E7DFD5] hover:border-[#C2410C] text-left transition-all shadow-2xs">
      <p class="font-serif text-xs font-bold truncate text-[#292524]">\${item.name}</p>
      <p class="text-[10px] text-[#78716C] mt-0.5">\${item.category}</p>
      <p class="text-xs font-mono font-bold text-[#C2410C] mt-1">Rp \${item.price.toLocaleString('id-ID')}</p>
    </button>
  \`).join('');
}

function posAddItem(itemId) {
  const item = MENU_DATA.find(i => i.id === itemId);
  if (!item) return;

  const existing = posCart.find(i => i.item.id === itemId);
  if (existing) {
    existing.quantity += 1;
    existing.totalPrice = existing.quantity * item.price;
  } else {
    posCart.push({ item: item, quantity: 1, totalPrice: item.price });
  }
  updatePosUI();
}

function updatePosUI() {
  const container = document.getElementById('pos-cart-items');
  const subtotalEl = document.getElementById('pos-subtotal');
  const totalEl = document.getElementById('pos-total');

  const total = posCart.reduce((acc, i) => acc + i.totalPrice, 0);

  if (posCart.length === 0) {
    container.innerHTML = '<p class="text-center text-xs text-[#A8A29E] py-8">Belum ada item dipilih di kasir.</p>';
  } else {
    container.innerHTML = posCart.map(i => \`
      <div class="flex items-center justify-between text-xs py-1.5 border-b border-[#E7DFD5]">
        <div class="flex-1 truncate pr-2">
          <p class="font-bold truncate">\${i.item.name}</p>
          <p class="text-[10px] text-[#78716C]">\${i.quantity} x Rp \${i.item.price.toLocaleString('id-ID')}</p>
        </div>
        <span class="font-mono font-bold">Rp \${i.totalPrice.toLocaleString('id-ID')}</span>
      </div>
    \`).join('');
  }

  if (subtotalEl) subtotalEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
  if (totalEl) totalEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function clearPosCart() {
  posCart = [];
  updatePosUI();
}

function posQuickPay(amount) {
  showToast('Uang diterima: Rp ' + amount.toLocaleString('id-ID'));
}

function posProcessOrder() {
  if (posCart.length === 0) {
    showToast('Pilih menu di kasir terlebih dahulu!');
    return;
  }
  const total = posCart.reduce((acc, i) => acc + i.totalPrice, 0);
  const newId = 'POS-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  transactionsLog.unshift({
    id: newId,
    time: timeStr,
    customer: 'Tamu Kasir POS',
    type: 'Dine-in (Meja POS)',
    total: total,
    method: 'Tunai Kasir'
  });

  renderTransactions();
  clearPosCart();
  showToast('✓ Transaksi Kasir ' + newId + ' selesai!');
}

// WAREHOUSE & TRANSACTIONS RENDERING
function renderWarehouse() {
  const tbody = document.getElementById('warehouse-tbody');
  if (!tbody) return;

  tbody.innerHTML = warehouseStock.map(w => \`
    <tr class="hover:bg-[#FAF7F2]">
      <td class="p-3 font-semibold">\${w.name}</td>
      <td class="p-3 text-[#78716C]">\${w.cat}</td>
      <td class="p-3 font-mono font-bold">\${w.stock}</td>
      <td class="p-3 text-[#78716C]">\${w.min}</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold \${w.status === 'Menipis' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">
          \${w.status}
        </span>
      </td>
      <td class="p-3 text-right">
        <button onclick="restockItem('\${w.id}')" class="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#D7C4B7] hover:border-[#C2410C] text-[10px] font-bold text-[#44403C]">
          + Tambah Stok
        </button>
      </td>
    </tr>
  \`).join('');
}

function restockItem(id) {
  const item = warehouseStock.find(w => w.id === id);
  if (item) {
    item.status = 'Aman';
    renderWarehouse();
    showToast('✓ Stok ' + item.name + ' berhasil diperbarui');
  }
}

function renderTransactions() {
  const tbody = document.getElementById('dash-tx-tbody');
  if (!tbody) return;

  tbody.innerHTML = transactionsLog.map(t => \`
    <tr class="hover:bg-[#FAF7F2]">
      <td class="p-3 font-mono font-bold text-[#451A03]">\${t.id}</td>
      <td class="p-3 text-[#78716C]">\${t.time} WIB</td>
      <td class="p-3 font-semibold">\${t.customer}</td>
      <td class="p-3 text-[#78716C]">\${t.type}</td>
      <td class="p-3 font-mono font-bold text-[#C2410C]">Rp \${t.total.toLocaleString('id-ID')}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-md bg-[#EFE8DD] text-[10px] font-semibold">\${t.method}</span></td>
    </tr>
  \`).join('');
}

// TOAST HELPER
function showToast(msg) {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toast-text');
  if (toast && text) {
    text.innerText = msg;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 3000);
  }
}
`;
}

// Generates the detailed, friendly README.md for the user
export function generateStandaloneREADME(): string {
  return `# Salam Kopi - Kedai Kopi & Specialty Coffee Nusantara

Website resmi **Salam Kopi**, kedai kopi dan specialty coffee Indonesia yang menyajikan aneka sajian kopi nusantara, manual brew single origin, sistem pemesanan online, serta modul kasir & dasbor terpadu.

---

## 🚀 Panduan Cepat: Upload ke GitHub & Aktifkan Website Gratis (GitHub Pages)

### CARA 1: Upload via Browser (Paling Mudah, Tanpa Install Apapun)

1. **Buka GitHub**: Kunjungi [github.com/new](https://github.com/new) dan login dengan akun GitHub Anda.
2. **Buat Repository Baru**:
   - Masukkan nama repository, contoh: \`salam-kopi\` atau \`ajirahayu-coffee\`.
   - Pilih **Public** (agar bisa diaktifkan gratis di GitHub Pages).
   - Jangan centang "Add a README file" (karena file ini sudah menyertakan README).
   - Klik **Create repository**.
3. **Upload File**:
   - Pada halaman repository yang baru dibuat, klik link **"uploading an existing file"**.
   - Tarik (drag & drop) semua file hasil download:
     - \`index.html\`
     - \`style.css\`
     - \`app.js\`
     - \`README.md\`
   - Tulis pesan commit di bawah, misalnya: \`Upload Salam Kopi Website\`.
   - Klik tombol hijau **Commit changes**.
4. **Aktifkan GitHub Pages (Agar Website Online)**:
   - Di repository Anda, klik tab **Settings** (di menu atas).
   - Di sidebar kiri, klik menu **Pages**.
   - Pada bagian **Build and deployment** > **Branch**:
     - Ubah dari *None* menjadi **main** (atau **master**).
     - Folder biarkan **/ (root)**.
     - Klik **Save**.
5. **Selesai! 🎉**:
   - Tunggu 1–2 menit, refresh halaman Settings > Pages.
   - Link website Anda akan muncul: \`https://<username-github>.github.io/salam-kopi/\`.

---

### CARA 2: Lewat Git Terminal (CLI)

Jika Anda sudah menginstal Git di komputer:

\`\`\`bash
# 1. Buka folder tempat file index.html, style.css, app.js berada
cd /path/ke/folder/salam-kopi

# 2. Inisialisasi Git
git init
git add .
git commit -m "feat: initial commit Salam Kopi website"

# 3. Hubungkan ke repository GitHub Anda
git branch -M main
git remote add origin https://github.com/<username-github>/<nama-repo>.git

# 4. Push ke GitHub
git push -u origin main
\`\`\`

---

## 📂 Struktur File Standalone

\`\`\`
salam-kopi/
├── index.html        # Halaman utama lengkap (Responsive, Hero, Menu, Drawer, POS)
├── style.css         # Desain & stylesheet khas kopi Nusantara
├── app.js            # Logika interaktif, keranjang belanja, kasir POS & local storage
├── README.md         # Panduan penggunaan & deployment ini
└── .github/
    └── workflows/
        └── deploy.yml # (Opsional) GitHub Actions workflow otomatis
\`\`\`

---

## ✨ Fitur-Fitur Website

- **Katalog Menu Lengkap**: 20+ varian kopi klasik, signature kopi susu aren, manual brew, non-kopi, camilan & biji kopi.
- **Pencarian & Filter Kategori**: Filter instan dan search bar responsif.
- **Kustomisasi Minuman**: Pilihan ukuran cup (Reguler/Large), suhu (Dingin/Panas), gula (Normal/Sedikit/Tanpa Gula), dan susu nabati (Oat/Almond).
- **Keranjang Belanja (Slide-over Cart Drawer)**: Hitung total otomatis, diskon bawa tumbler (-Rp 3.000), tambah/kurang jumlah pesanan.
- **Checkout & QRIS Simulator**: Pilihan pembayaran QRIS, Tunai, Kartu Debit, atau Transfer Bank.
- **Cetak Struk Thermal**: Desain nota kasir retro yang siap dicetak ke printer printer thermal 58mm/80mm atau PDF.
- **Barista AI Assistant**: Kuis interaktif rekomendasi kopi sesuai suasana hati.
- **Cerita Biji Kopi Nusantara**: Peta rasa dari Gayo, Kintamani, Toraja, hingga Flores.
- **Panduan Seduh Rumahan**: Rasio emas, temperatur air, dan metode V60, Aeropress, French Press.
- **Terminal Kasir (POS) & Dasbor Finansial**: Simulator operasional kafe terpadu untuk pemilik bisnis.

---

## ☕ Lisensi
Dibuat untuk **Salam Kopi Indonesia** (ajirahayu). Bebas dikembangkan dan dipublikasikan.
`;
}

// Generates optional GitHub Actions workflow
export function generateGitHubWorkflow(): string {
  return `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
}

// Trigger browser download for a single string content
export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download complete zip file containing index.html, style.css, app.js, README.md, deploy.yml
export async function downloadCompleteZip() {
  const zip = new JSZip();

  const html = generateStandaloneHTML();
  const css = generateStandaloneCSS();
  const js = generateStandaloneJS();
  const readme = generateStandaloneREADME();
  const workflow = generateGitHubWorkflow();

  zip.file('index.html', html);
  zip.file('style.css', css);
  zip.file('app.js', js);
  zip.file('README.md', readme);
  
  // Add GitHub workflow folder
  const githubFolder = zip.folder('.github');
  if (githubFolder) {
    const workflowsFolder = githubFolder.folder('workflows');
    if (workflowsFolder) {
      workflowsFolder.file('deploy.yml', workflow);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'salam-kopi-github-package.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
