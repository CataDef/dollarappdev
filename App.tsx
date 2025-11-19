import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import AppIdeaGenerator from './components/AppIdeaGenerator';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import { Terminal } from 'lucide-react';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <Terminal size={18} />
            </div>
            DollarAppDev
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#ideas" className="hover:text-white transition-colors">Ideas</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#contact" className="px-4 py-2 bg-white text-slate-950 rounded-lg hover:bg-slate-200 transition-colors font-bold">
              Join for $1
            </a>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      
      {/* The Gemini Powered Section */}
      <AppIdeaGenerator />
      
      <Portfolio />
      <Pricing />
      <Contact />

      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DollarAppDev. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default App;