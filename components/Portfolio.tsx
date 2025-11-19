import React from 'react';
import { PortfolioItem } from '../types';
import { Play } from 'lucide-react';

const items: PortfolioItem[] = [
  {
    id: 'invoice-app',
    title: "Pro PDF Invoices & Docs",
    description: "Auto-generate professional PDF invoices, receipts, packing slips, and return forms. Fully customizable templates.",
    category: "Operations & Accounting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 'social-proof',
    title: "Social Proof Pop",
    description: "Real-time purchase notifications that create FOMO and drive urgency. Increase conversion rates by 15%.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 'return-wizard',
    title: "Return Wizard",
    description: "Automated returns portal that integrates with 3PL providers to restock instantly.",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

interface PortfolioProps {
  onOpenApp: (appId: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOpenApp }) => {
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
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 backdrop-blur-sm">
                    {item.id !== 'return-wizard' ? (
                      <button 
                        onClick={() => onOpenApp(item.id)}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg shadow-brand-600/50"
                      >
                        <Play size={16} fill="currentColor" />
                        Launch App
                      </button>
                    ) : (
                      <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium border border-slate-700">Coming Soon</span>
                    )}
                </div>
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
    </section>
  );
};

export default Portfolio;