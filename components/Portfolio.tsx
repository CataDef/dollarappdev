import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import InvoiceAppDemo from './demos/InvoiceAppDemo';
import { Play, X } from 'lucide-react';

const items: PortfolioItem[] = [
  {
    title: "Pro PDF Invoices & Docs",
    description: "Auto-generate professional PDF invoices, receipts, packing slips, and return forms. Fully customizable templates.",
    category: "Operations & Accounting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    title: "Return Wizard",
    description: "Automated returns portal that integrates with 3PL providers to restock instantly.",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    title: "Social Proof Pop",
    description: "Real-time purchase notifications that create FOMO and drive urgency.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

const Portfolio: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Recent Deliveries</h2>
            <p className="text-slate-400">Apps we've built and launched for our partners.</p>
          </div>
          <a href="#contact" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors flex items-center gap-1">
            Start your project &rarr;
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="group rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col">
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {idx === 0 && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 backdrop-blur-sm">
                     <button 
                       onClick={() => setShowDemo(true)}
                       className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all"
                     >
                       <Play size={16} fill="currentColor" />
                       Try Live Demo
                     </button>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold tracking-wider text-brand-500 uppercase mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Modal Overlay */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded uppercase tracking-wider">Demo</span>
                Pro PDF Invoices
              </h3>
              <button 
                onClick={() => setShowDemo(false)}
                className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
              <InvoiceAppDemo />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;