import React, { useState } from 'react';
import { Printer, Download, Mail, FileText } from 'lucide-react';

const InvoiceAppDemo: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2024-001');
  const [customerName, setCustomerName] = useState('John Doe');
  const [items, setItems] = useState([
    { desc: 'Premium T-Shirt (Black/L)', qty: 2, price: 25.00 },
    { desc: 'Shipping Protection', qty: 1, price: 2.50 }
  ]);

  const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Order Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Invoice #</label>
              <input 
                type="text" 
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Customer</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Actions</h4>
          <div className="grid grid-cols-2 gap-3">
             <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-600 text-sm gap-2">
                <Printer size={20} /> Print
             </button>
             <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-600 text-sm gap-2">
                <Download size={20} /> Download
             </button>
             <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-600 text-sm gap-2 col-span-2">
                <Mail size={20} /> Email to Customer
             </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-lg rounded-sm min-h-[500px] p-8 md:p-12 text-gray-800 font-mono text-sm border border-gray-200 relative">
          
          {/* Paper Watermark effect */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <FileText size={120} />
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-2">INVOICE</div>
              <div className="text-gray-500">#{invoiceNumber}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-brand-600">My Shopify Store</div>
              <div className="text-gray-500">123 Commerce Blvd</div>
              <div className="text-gray-500">New York, NY 10001</div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-12">
            <div className="text-xs font-bold uppercase text-gray-400 mb-2">Bill To</div>
            <div className="font-bold text-lg">{customerName}</div>
            <div className="text-gray-500">customer@example.com</div>
          </div>

          {/* Table */}
          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 font-bold text-gray-600">Item Description</th>
                <th className="text-right py-3 font-bold text-gray-600">Qty</th>
                <th className="text-right py-3 font-bold text-gray-600">Price</th>
                <th className="text-right py-3 font-bold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-4">{item.desc}</td>
                  <td className="py-4 text-right">{item.qty}</td>
                  <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-4 text-right">${(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
             <div className="w-1/2 space-y-3">
               <div className="flex justify-between text-gray-500">
                 <span>Subtotal</span>
                 <span>${total.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-500">
                 <span>Tax (0%)</span>
                 <span>$0.00</span>
               </div>
               <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-900 pt-3">
                 <span>Total Due</span>
                 <span>${total.toFixed(2)}</span>
               </div>
             </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
            Thank you for your business. Please pay within 30 days.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAppDemo;