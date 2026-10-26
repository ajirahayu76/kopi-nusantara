import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { PromoTicker } from './components/PromoTicker';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BaristaPromptSection } from './components/BaristaPromptSection';
import { OriginsSection } from './components/OriginsSection';
import { BrewGuideSection } from './components/BrewGuideSection';
import { StoreLocations } from './components/StoreLocations';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptModal } from './components/pos/ReceiptModal';
import { Footer } from './components/Footer';
import { GitHubExportModal } from './components/GitHubExportModal';

// Integrated Business Modules
import { FinancialDashboard } from './components/dashboard/FinancialDashboard';
import { PosTerminal } from './components/pos/PosTerminal';
import { WarehouseView } from './components/warehouse/WarehouseView';
import { SalesReportView } from './components/reports/SalesReportView';
import { StaffAccessView } from './components/staff/StaffAccessView';
import { StoreSettingsView } from './components/settings/StoreSettingsView';

import { MenuItem, CartItem, CustomizationOptions, OrderType, CustomerDetails, TransactionItem } from './types';
import { ShoppingBag, Download } from 'lucide-react';
import { GithubIcon } from './components/icons/GithubIcon';

const AppContent: React.FC = () => {
  const {
    activeView,
    recordTransaction,
    storeSettings,
    lastCompletedTransaction,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
  } = useStore();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('salamkopi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('Meja 04');
  const [selectedCustomizingItem, setSelectedCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [bringTumbler, setBringTumbler] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('salamkopi_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    item: MenuItem,
    customization: CustomizationOptions,
    quantity: number
  ) => {
    let unitPrice = item.price;
    if (customization.size === 'large') unitPrice += 4000;
    if (customization.milkChoice === 'oat') unitPrice += 6000;
    if (customization.milkChoice === 'almond') unitPrice += 7000;
    if (customization.milkChoice === 'soy') unitPrice += 4000;
    if (customization.sugarLevel === 'stevia') unitPrice += 2000;

    const addonPrices: Record<string, number> = {
      'Extra Shot Espresso': 5000,
      'Grass Jelly Segar': 4000,
      'Boba Aren Kenyal': 5000,
      'Sea Salt Cream Foam': 5000,
    };
    customization.addons.forEach((addon) => {
      unitPrice += addonPrices[addon] || 0;
    });

    const cartItemId = `${item.id}-${customization.size}-${customization.temperature}-${customization.sugarLevel}-${customization.milkChoice}-${customization.grindSize || ''}-${customization.addons.join(',')}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          menuItem: item,
          quantity,
          customization,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`✓ "${item.name}" berhasil ditambahkan ke keranjang`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const defaultCustomization: CustomizationOptions = {
      size: 'reguler',
      temperature: item.defaultTemp || (item.isIcedAvailable ? 'iced' : 'hot'),
      sugarLevel: 'normal',
      iceLevel: 'normal',
      milkChoice: item.category === 'manual-brew' ? 'none' : 'fresh-milk',
      grindSize: item.category === 'beans' ? 'whole-bean' : undefined,
      extraShots: 0,
      addons: [],
      notes: '',
    };
    handleAddToCart(item, defaultCustomization, 1);
  };

  const handleAddRecommendation = (item: MenuItem, suggestedNotes: string) => {
    const customization: CustomizationOptions = {
      size: 'reguler',
      temperature: item.defaultTemp || (item.isIcedAvailable ? 'iced' : 'hot'),
      sugarLevel: 'normal',
      iceLevel: 'normal',
      milkChoice: item.category === 'manual-brew' ? 'none' : 'fresh-milk',
      grindSize: item.category === 'beans' ? 'whole-bean' : undefined,
      extraShots: 0,
      addons: [],
      notes: suggestedNotes,
    };
    handleAddToCart(item, customization, 1);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectOriginToOrder = (_originName: string) => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Connected integration: When customer checks out, reduce warehouse stock in real-time
  const handleOrderSuccess = (details: CustomerDetails) => {
    const rawSubtotal = cartItems.reduce((acc, c) => acc + c.totalPrice, 0);
    const tumblerDiscount = bringTumbler ? 3000 : 0;
    const finalTotal = Math.max(0, rawSubtotal - tumblerDiscount);

    const txItems: TransactionItem[] = cartItems.map((c) => ({
      itemId: `wh-${c.menuItem.id}`,
      menuItemId: c.menuItem.id,
      name: c.menuItem.name,
      quantity: c.quantity,
      unitPrice: c.unitPrice,
      totalPrice: c.totalPrice,
      costPrice: c.menuItem.costPrice || Math.round(c.unitPrice * 0.4),
      customizationSummary: `${c.customization.size} · ${c.customization.temperature}`,
    }));

    recordTransaction({
      customerName: details.name,
      orderType: details.orderType,
      tableNumber: details.tableNumber,
      items: txItems,
      subtotal: rawSubtotal,
      discount: tumblerDiscount,
      tax: 0,
      totalAmount: finalTotal,
      paymentMethod: details.paymentMethod,
      notes: details.notes,
    });

    setCartItems([]);
    setBringTumbler(false);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#292524] selection:bg-[#E2703A]/20 selection:text-[#9A3412]">
      {/* Top cafe promo bar */}
      <PromoTicker />

      {/* Main navigation header */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        tableNumber={tableNumber}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-14">
        {activeView === 'customer-menu' && (
          <>
            <Hero
              onQuickOrderClick={() => setIsCartOpen(true)}
              onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
            />
            <MenuSection
              onSelectItem={(item) => setSelectedCustomizingItem(item)}
              onQuickAdd={handleQuickAdd}
            />
            <BaristaPromptSection onAddRecommendation={handleAddRecommendation} />
            <OriginsSection onSelectOriginToOrder={handleSelectOriginToOrder} />
            <BrewGuideSection />
            <StoreLocations />
          </>
        )}

        {activeView === 'dashboard' && <FinancialDashboard />}
        {activeView === 'pos' && <PosTerminal />}
        {activeView === 'warehouse' && <WarehouseView />}
        {activeView === 'sales-report' && <SalesReportView />}
        {activeView === 'staff-access' && <StaffAccessView />}
        {activeView === 'settings' && <StoreSettingsView />}
      </main>

      {/* Footer */}
      <Footer onOpenGitHubModal={() => setIsGitHubModalOpen(true)} />

      {/* Item Customizer Modal */}
      <ItemCustomizeModal
        item={selectedCustomizingItem}
        isOpen={!!selectedCustomizingItem}
        onClose={() => setSelectedCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        tableNumber={tableNumber}
        onChangeTableNumber={setTableNumber}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        bringTumbler={bringTumbler}
        onToggleTumbler={() => setBringTumbler(!bringTumbler)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        tableNumber={tableNumber}
        bringTumbler={bringTumbler}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Auto-print Thermal Receipt Modal */}
      <ReceiptModal
        transaction={lastCompletedTransaction}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        settings={storeSettings}
      />

      {/* GitHub Source Code Export Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Floating Quick Action Button for GitHub Download */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsGitHubModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1C1917] hover:bg-black text-[#FDE68A] text-xs font-bold border border-[#78350F] shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Download Source Code (HTML, CSS, JS) untuk GitHub"
        >
          <GithubIcon className="w-4 h-4 text-white group-hover:text-[#FDE68A] transition-colors" />
          <span>Download Kode GitHub</span>
          <Download className="w-3.5 h-3.5 text-[#FDE68A]" />
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#451A03] text-white px-4 py-3 rounded-xl shadow-xl border border-[#78350F] flex items-center gap-2.5 text-xs font-medium animate-bounce">
          <ShoppingBag className="w-4 h-4 text-[#FDE68A]" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-[#FDE68A] font-bold cursor-pointer"
          >
            Buka Keranjang
          </button>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};
