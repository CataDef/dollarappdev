import React, { useState } from 'react';
import { Loader2, Search, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';
import { fetchExpensiveAppIdeas } from '../services/geminiService';
import { ShopifyAppIdea } from '../types';

const AppIdeaGenerator: React.FC = () => {
  const [ideas, setIdeas] = useState<ShopifyAppIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await fetchExpensiveAppIdeas();
      setIdeas(data);
    } catch (err) {
      console.error("Failed to fetch ideas", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ideas" className="py-20 bg-slate-900 relative border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Steal These Million Dollar Ideas
          </h2>
          <p className="text-slate-400 text-lg">
            Not sure what to build? We use AI to analyze the Shopify App Store for 
            high-ticket, popular apps. Clone their success or find a gap in their offering.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              {loading ? 'Analyzing Market Data...' : 'Reveal High-Value Apps'}
            </div>
          </button>
        </div>

        {hasSearched && !loading && ideas.length === 0 && (
             <div className="text-center text-slate-400">No ideas found. Please try again.</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <div 
              key={index} 
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-brand-500/50 transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-900 text-brand-300 text-xs font-medium rounded-full border border-slate-800">
                  {idea.category}
                </span>
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                  <DollarSign size={14} />
                  {idea.estimatedPrice}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {idea.name}
              </h3>
              
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {idea.description}
              </p>
              
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-2 mb-2 text-amber-400 text-sm font-semibold">
                  <TrendingUp size={16} />
                  Why it's expensive
                </div>
                <p className="text-xs text-slate-400 italic">
                  "{idea.reasonForSuccess}"
                </p>
              </div>

              <button className="w-full mt-6 py-3 rounded-lg border border-brand-500/30 text-brand-300 hover:bg-brand-500/10 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Lightbulb size={16} />
                Build a Competitor
              </button>
            </div>
          ))}
        </div>
        
        {!hasSearched && (
           <div className="text-center mt-8">
             <div className="inline-block p-8 rounded-2xl bg-slate-950 border border-dashed border-slate-800">
               <p className="text-slate-500">Click the button above to fetch live data about top-performing Shopify Apps.</p>
             </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default AppIdeaGenerator;