import React from 'react';
import { X, Printer, Download, Check, Coffee, Sparkles } from 'lucide-react';
import { SaleTransaction, StoreSettings } from '../../types';

interface ReceiptModalProps {
  transaction: SaleTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  isOpen,
  onClose,
  settings,
}) => {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    let txt = `========================================\n`;
    txt += `          ${settings.storeName}\n`;
    txt += `       ${settings.tagline}\n`;
    txt += `========================================\n`;
    txt += `Alamat : ${settings.address}\n`;
    txt += `Telp   : ${settings.phone}\n`;
    txt += `No. Struk : ${transaction.invoiceNumber}\n`;
    txt += `Tanggal   : ${transaction.timestamp}\n`;
    txt += `Kasir     : ${transaction.cashierStaffName}\n`;
    txt += `Pelanggan : ${transaction.customerName}\n`;
    txt += `Tipe      : ${transaction.orderType.toUpperCase()} ${transaction.tableNumber ? `(${transaction.tableNumber})` : ''}\n`;
    txt += `----------------------------------------\n`;
    transaction.items.forEach((item) => {
      txt += `${item.name}\n`;
      txt += `  ${item.quantity} x Rp ${item.unitPrice.toLocaleString('id-ID')} = Rp ${item.totalPrice.toLocaleString('id-ID')}\n`;
      if (item.customizationSummary) {
        txt += `  (${item.customizationSummary})\n`;
      }
    });
    txt += `----------------------------------------\n`;
    txt += `Subtotal  : Rp ${transaction.subtotal.toLocaleString('id-ID')}\n`;
    if (transaction.discount > 0) {
      txt += `Diskon    : -Rp ${transaction.discount.toLocaleString('id-ID')}\n`;
    }
    txt += `Pajak     : Rp ${transaction.tax.toLocaleString('id-ID')}\n`;
    txt += `TOTAL     : Rp ${transaction.totalAmount.toLocaleString('id-ID')}\n`;
    txt += `Metode    : ${transaction.paymentMethod.toUpperCase()}\n`;
    if (transaction.cashGiven) {
      txt += `Bayar Tunai : Rp ${transaction.cashGiven.toLocaleString('id-ID')}\n`;
      txt += `Kembalian   : Rp ${(transaction.cashChange || 0).toLocaleString('id-ID')}\n`;
    }
    txt += `========================================\n`;
    txt += `${settings.receiptFooter}\n`;
    txt += `========================================\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Struk-${transaction.invoiceNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#D7C4B7] overflow-hidden my-6">
        
        {/* Top Action Bar */}
        <div className="p-3 bg-[#451A03] text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-[#FDE68A]" />
            <span className="text-xs font-bold">Struk Pembelian Kasir</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div id="thermal-receipt" className="p-5 font-mono text-[11px] text-[#1C1917] leading-tight space-y-3 bg-[#FCFBF8] border-b border-dashed border-[#A8A29E]">
          
          {/* Header */}
          <div className="text-center space-y-1 pb-3 border-b border-dashed border-[#A8A29E]">
            <div className="w-8 h-8 rounded-full bg-[#451A03] text-[#FAF7F2] flex items-center justify-center mx-auto mb-1">
              <Coffee className="w-4 h-4" />
            </div>
            <h2 className="font-serif font-bold text-sm tracking-tight text-[#292524]">
              {settings.storeName}
            </h2>
            <p className="text-[10px] text-[#57534E]">{settings.tagline}</p>
            <p className="text-[9px] text-[#78716C]">{settings.address}</p>
            <p className="text-[9px] text-[#78716C]">Telp: {settings.phone}</p>
          </div>

          {/* Meta Info */}
          <div className="space-y-0.5 text-[10px] text-[#44403C] pb-2 border-b border-dashed border-[#A8A29E]">
            <div className="flex justify-between">
              <span>No. Struk:</span>
              <span className="font-bold">{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Waktu:</span>
              <span>{transaction.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir:</span>
              <span>{transaction.cashierStaffName}</span>
            </div>
            <div className="flex justify-between">
              <span>Pelanggan:</span>
              <span>{transaction.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Tipe:</span>
              <span className="font-bold uppercase">
                {transaction.orderType} {transaction.tableNumber ? `(${transaction.tableNumber})` : ''}
              </span>
            </div>
          </div>

          {/* Itemized List */}
          <div className="space-y-2 py-1 border-b border-dashed border-[#A8A29E]">
            {transaction.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-bold text-[11px] text-[#1C1917]">
                  {item.name}
                </div>
                <div className="flex justify-between text-[10px] text-[#57534E]">
                  <span>
                    {item.quantity} x Rp {item.unitPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="font-bold text-[#1C1917]">
                    Rp {item.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                {item.customizationSummary && (
                  <div className="text-[9px] text-[#78716C] italic">
                    ↳ {item.customizationSummary}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Totals Calculation */}
          <div className="space-y-1 text-[11px] pt-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rp {transaction.subtotal.toLocaleString('id-ID')}</span>
            </div>
            {transaction.discount > 0 && (
              <div className="flex justify-between text-[#16A34A]">
                <span>Diskon:</span>
                <span>-Rp {transaction.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-[10px] text-[#78716C]">
              <span>PB1 (Pajak Restoran):</span>
              <span>Termasuk (0%)</span>
            </div>
            <div className="flex justify-between text-xs font-bold pt-1 border-t border-dashed border-[#A8A29E] text-[#1C1917]">
              <span>TOTAL BAYAR:</span>
              <span>Rp {transaction.totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-[10px] text-[#44403C]">
              <span>Metode Bayar:</span>
              <span className="font-bold uppercase">{transaction.paymentMethod}</span>
            </div>
            {transaction.cashGiven !== undefined && (
              <>
                <div className="flex justify-between text-[10px]">
                  <span>Uang Diterima:</span>
                  <span>Rp {transaction.cashGiven.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Kembalian:</span>
                  <span>Rp {(transaction.cashChange || 0).toLocaleString('id-ID')}</span>
                </div>
              </>
            )}
          </div>

          {/* Footer & Barcode simulation */}
          <div className="text-center pt-3 space-y-1.5 text-[9px] text-[#78716C] border-t border-dashed border-[#A8A29E]">
            <p className="whitespace-pre-line leading-snug">
              {settings.receiptFooter}
            </p>
            {/* Simulated barcode */}
            <div className="h-7 w-48 mx-auto bg-repeat-x flex items-center justify-center tracking-widest text-[8px] font-mono select-none">
              ||||| | |||| || ||||| ||| |||| |
            </div>
            <p className="text-[8px] text-[#A8A29E]">Powered by Salam Kopi POS & Warehouse System</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-white flex items-center gap-2 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#451A03] hover:bg-[#2A0E02] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#FDE68A]" />
            <span>Cetak Struk (Print)</span>
          </button>
          
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="p-2.5 rounded-xl border border-[#D7C4B7] hover:border-[#C2410C] text-[#44403C] hover:text-[#C2410C] text-xs font-semibold transition-all cursor-pointer"
            title="Download Struk .txt"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
