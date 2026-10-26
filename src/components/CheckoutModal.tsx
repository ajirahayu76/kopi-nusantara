import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, QrCode, Building2, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderType, PaymentMethod, CustomerDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  bringTumbler: boolean;
  onOrderSuccess: (details: CustomerDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  tableNumber,
  bringTumbler,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const tumblerDiscount = bringTumbler ? 3000 : 0;
  const finalTotal = Math.max(0, rawSubtotal - tumblerDiscount);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [table, setTable] = useState(tableNumber || '');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('15 menit lagi');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [notes, setNotes] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const generateWhatsAppMessage = () => {
    let msg = `*PESANAN SALAM KOPI* ☕\n`;
    msg += `-------------------------------\n`;
    msg += `*Tipe Pesanan:* ${
      orderType === 'dine-in'
        ? `Dine-In (${table ? `Meja ${table}` : 'Belum isi meja'})`
        : orderType === 'pickup'
        ? `Pick-Up (${pickupTime})`
        : `Delivery ke alamat: ${address || '-'}`
    }\n`;
    msg += `*Nama:* ${name || 'Pelanggan Salam Kopi'}\n`;
    msg += `*No. WA:* ${phone || '-'}\n\n`;
    msg += `*DETAIL MENU:*\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.menuItem.name}* (x${item.quantity}) - Rp ${item.totalPrice.toLocaleString('id-ID')}\n`;
      const tags = [];
      if (item.customization.size) tags.push(item.customization.size);
      if (item.customization.temperature) tags.push(item.customization.temperature === 'iced' ? 'Es' : 'Hangat');
      if (item.customization.sugarLevel) tags.push(`Gula: ${item.customization.sugarLevel}`);
      if (item.customization.milkChoice && item.customization.milkChoice !== 'fresh-milk') tags.push(`Susu: ${item.customization.milkChoice}`);
      if (item.customization.grindSize) tags.push(`Giling: ${item.customization.grindSize}`);
      if (item.customization.addons.length > 0) tags.push(`Topping: ${item.customization.addons.join(', ')}`);
      if (tags.length > 0) {
        msg += `   └ [${tags.join(' | ')}]\n`;
      }
      if (item.customization.notes) {
        msg += `   └ Catatan: "${item.customization.notes}"\n`;
      }
    });

    msg += `\n-------------------------------\n`;
    msg += `*Subtotal:* Rp ${rawSubtotal.toLocaleString('id-ID')}\n`;
    if (bringTumbler) {
      msg += `*Diskon Bawa Tumbler:* -Rp 3.000\n`;
    }
    msg += `*TOTAL BAYAR:* Rp ${finalTotal.toLocaleString('id-ID')}\n`;
    msg += `*Metode Bayar:* ${
      paymentMethod === 'qris' ? 'QRIS Dinamis' : paymentMethod === 'bca' ? 'Transfer BCA' : 'Tunai / Cash'
    }\n`;
    if (notes) {
      msg += `*Catatan Tambahan:* ${notes}\n`;
    }
    msg += `\nTerima kasih Salam Kopi! Mohon konfirmasi pesanan saya. 🙏`;

    return encodeURIComponent(msg);
  };

  const handleCopyBankAccount = () => {
    navigator.clipboard.writeText('80011223344');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCompleteOrder = () => {
    if (!name.trim()) {
      alert('Mohon isi nama pemesan terlebih dahulu.');
      return;
    }

    const code = `SK-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(code);
    setOrderPlaced(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C2410C', '#451A03', '#FDE68A', '#16A34A'],
      });
    } catch (e) {
      // safe fallback
    }

    onOrderSuccess({
      name,
      phone,
      tableNumber: table,
      deliveryAddress: address,
      pickupTime,
      orderType,
      paymentMethod,
      notes,
    });
  };

  const handleOpenWhatsApp = () => {
    if (!name.trim()) {
      alert('Mohon isi nama pemesan terlebih dahulu.');
      return;
    }
    const waUrl = `https://wa.me/6281288227711?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    handleCompleteOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E7DFD5] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E7DFD5] flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
              Kasir Salam Kopi
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#292524]">
              {orderPlaced ? 'Pesanan Berhasil Dibuat!' : 'Konfirmasi & Pembayaran'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78716C] hover:bg-[#EFE8DD] transition-colors cursor-pointer"
            aria-label="Tutup kasir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {orderPlaced ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#C2410C] bg-[#FFEDD5] px-3 py-1 rounded-full">
                KODE PESANAN: #{orderCode}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#292524] mt-3">
                Terima Kasih, Kak {name}!
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] max-w-sm mx-auto mt-1">
                Pesananmu telah tercatat di sistem kasir Salam Kopi dan sedang disiapkan dengan sepenuh hati oleh barista.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white p-4 rounded-2xl border border-[#E7DFD5] text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between text-[#78716C]">
                <span>Tipe Pesanan:</span>
                <span className="font-bold text-[#292524] uppercase">
                  {orderType === 'dine-in' ? `Dine-in (${table || 'Meja Kasir'})` : orderType}
                </span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Total Item:</span>
                <span className="font-semibold text-[#292524]">{cartItems.length} Minuman/Makanan</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Metode Pembayaran:</span>
                <span className="font-semibold text-[#292524] uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#451A03] pt-2 border-t border-[#EFE8DD]">
                <span>Total Bayar:</span>
                <span className="font-mono">Rp {finalTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={`https://wa.me/6281288227711?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#16A34A] text-white text-xs font-semibold hover:bg-[#15803D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Kirim Bukti ke WhatsApp Kasir
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#451A03] text-white text-xs font-semibold hover:bg-[#2A0E02]"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#292524]">
            
            {/* Customer Information Form */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#78716C]">
                Data Pemesan
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                    Nama Pemesan *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Aji Rahayu"
                    className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* Order type specific fields */}
              {orderType === 'dine-in' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                    Nomor Meja Kedai
                  </label>
                  <input
                    type="text"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    placeholder="Contoh: Meja 04 (Lantai 1)"
                    className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                    Alamat Lengkap Pengantaran *
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Tuliskan nama jalan, nomor rumah/kantor, patokan..."
                    className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                  />
                </div>
              )}

              {orderType === 'pickup' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                    Waktu Pengambilan
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                  >
                    <option value="10 menit lagi">10 Menit Lagi</option>
                    <option value="20 menit lagi">20 Menit Lagi</option>
                    <option value="30 menit lagi">30 Menit Lagi</option>
                    <option value="1 jam lagi">1 Jam Lagi</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                  Catatan Tambahan untuk Kasir / Barista
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: tolong jangan dipisah plastiknya..."
                  className="w-full p-2.5 rounded-xl border border-[#D7C4B7] bg-white text-xs focus:outline-hidden focus:border-[#C2410C]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-[#EFE8DD]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#78716C]">
                Metode Pembayaran
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'qris'
                      ? 'border-[#C2410C] bg-[#FFEDD5]/50 text-[#292524] font-bold shadow-xs'
                      : 'border-[#E7DFD5] bg-white text-[#57534E]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#C2410C]" />
                  <span>QRIS Dinamis</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bca'
                      ? 'border-[#C2410C] bg-[#FFEDD5]/50 text-[#292524] font-bold shadow-xs'
                      : 'border-[#E7DFD5] bg-white text-[#57534E]'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-[#0284C7]" />
                  <span>Transfer Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-[#C2410C] bg-[#FFEDD5]/50 text-[#292524] font-bold shadow-xs'
                      : 'border-[#E7DFD5] bg-white text-[#57534E]'
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto mb-1 text-[#16A34A]" />
                  <span>Tunai di Kasir</span>
                </button>
              </div>

              {/* Dynamic QRIS Simulation Screen */}
              {paymentMethod === 'qris' && (
                <div className="p-4 bg-white rounded-2xl border border-[#E7DFD5] text-center space-y-2">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">
                    Scan via GoPay, OVO, Dana, BCA, ShopeePay
                  </div>
                  
                  {/* QR Box */}
                  <div className="w-40 h-40 mx-auto p-2 border-2 border-[#292524] rounded-xl bg-white shadow-xs flex flex-col items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Stylized authentic QR matrix */}
                      <rect width="100" height="100" fill="#ffffff" />
                      <path d="M10 10h24v24h-24zM66 10h24v24h-24zM10 66h24v24h-24z" fill="#000" />
                      <path d="M16 16h12v12h-12zM72 16h12v12h-12zM16 72h12v12h-12z" fill="#fff" />
                      <path d="M19 19h6v6h-6zM75 19h6v6h-6zM19 75h6v6h-6z" fill="#000" />
                      {/* Random dot clusters */}
                      <circle cx="45" cy="20" r="3" fill="#000" />
                      <circle cx="55" cy="25" r="3" fill="#000" />
                      <circle cx="45" cy="40" r="4" fill="#C2410C" />
                      <circle cx="55" cy="50" r="3" fill="#000" />
                      <circle cx="20" cy="45" r="3" fill="#000" />
                      <circle cx="35" cy="55" r="3" fill="#000" />
                      <circle cx="70" cy="45" r="3" fill="#000" />
                      <circle cx="80" cy="55" r="3" fill="#000" />
                      <circle cx="45" cy="70" r="3" fill="#000" />
                      <circle cx="55" cy="80" r="3" fill="#000" />
                      <circle cx="75" cy="75" r="4" fill="#000" />
                      <circle cx="85" cy="85" r="4" fill="#C2410C" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-[#451A03] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        SALAM KOPI
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-base font-bold text-[#451A03]">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[10px] text-[#A8A29E]">
                    NMID: ID102008892182 · QRIS Standar Bank Indonesia
                  </p>
                </div>
              )}

              {/* Bank Transfer Details */}
              {paymentMethod === 'bca' && (
                <div className="p-4 bg-white rounded-2xl border border-[#E7DFD5] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase">Bank Central Asia (BCA)</span>
                      <div className="font-mono text-base font-bold text-[#292524]">800-1122-3344</div>
                      <div className="text-[11px] text-[#78716C]">a/n PT Salam Kopi Indonesia</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyBankAccount}
                      className="px-3 py-1.5 rounded-lg border border-[#D7C4B7] bg-[#FAF7F2] text-xs font-semibold hover:border-[#C2410C] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank ? 'Tersalin' : 'Salin Rek'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#78716C] italic pt-1 border-t border-[#F5EFE6]">
                    *Cantumkan nama pemesan pada berita transfer dan kirim bukti via WhatsApp.
                  </p>
                </div>
              )}

              {/* Cash note */}
              {paymentMethod === 'cash' && (
                <div className="p-3 bg-white rounded-xl border border-[#E7DFD5] text-[11px] text-[#57534E]">
                  💵 Silakan siapkan uang pas sebesar <strong className="text-[#292524] font-mono">Rp {finalTotal.toLocaleString('id-ID')}</strong> saat membayar di kasir kedai atau kepada kurir pengantaran.
                </div>
              )}

            </div>

            {/* Total Summary */}
            <div className="pt-3 border-t border-[#EFE8DD] flex items-center justify-between text-sm">
              <span className="font-bold text-[#57534E]">Total Bayar:</span>
              <span className="font-mono text-lg font-bold text-[#451A03]">
                Rp {finalTotal.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-[#451A03] hover:bg-[#2A0E02] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#FDE68A]" />
                <span>Konfirmasi Pesanan Sekarang</span>
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan & Kirim Rincian via WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
