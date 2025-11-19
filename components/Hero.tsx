import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/50 border border-brand-500/30 text-brand-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <Zap size={16} className="text-yellow-400" />
          <span>Limited Time Offer: Early Adopter Access</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
          Build Your Custom <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
            Shopify App for $1/Mo
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop paying thousands for development agencies. We build, maintain, and scale your custom Shopify application for a simple subscription. No hidden fees.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2"
          >
            Start Building Now
            <ArrowRight size={20} />
          </a>
          <a 
            href="#ideas" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            Get Inspiration
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;