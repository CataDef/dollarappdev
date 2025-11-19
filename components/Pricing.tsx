import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-900/20 ring-1 ring-white/10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-brand-300 mb-2">The "Just Build It" Plan</h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-7xl font-bold text-white">$1</span>
              <span className="text-slate-400 text-xl">/month</span>
            </div>
            <p className="text-slate-400 mt-4">Cancel anytime. Seriously.</p>
          </div>

          <ul className="space-y-4 mb-10">
            {[
              "Unlimited Code Updates",
              "Custom Dashboard Design",
              "Shopify API Integration",
              "App Store Submission Support",
              "24/7 Server Monitoring",
              "Priority Bug Fixes"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check size={14} />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <a href="#contact" className="block w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-center transition-all shadow-lg shadow-brand-600/20 hover:scale-[1.02]">
            Get Started for $1
          </a>
          
          <p className="text-center text-xs text-slate-500 mt-6">
            *Server costs for high-traffic apps (>10k users) may be billed separately.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;