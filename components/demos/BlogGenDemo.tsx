
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, LayoutDashboard, FileText, Settings, Rocket, 
  CheckCircle2, Bot, Image as ImageIcon, Globe, DollarSign,
  BarChart3, Database, Terminal, Play, Code, RefreshCw, Sparkles,
  Github, ExternalLink, Copy, MonitorPlay, AlertTriangle, Trash2,
  ShoppingBag, ArrowRight, Zap, Search, TrendingUp, Menu, User, ChevronRight
} from 'lucide-react';

interface BlogGenDemoProps {
  onExit: () => void;
}

type Tab = 'home' | 'dashboard' | 'preview' | 'pricing' | 'deploy';
type DemoView = 'store_home' | 'product' | 'blog';

const BlogGenDemo: React.FC<BlogGenDemoProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home'); 
  const [demoView, setDemoView] = useState<DemoView>('store_home');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [guideMode, setGuideMode] = useState<'sim' | 'real'>('real'); 
  
  // Deploy Sim State
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Start Generation Simulation
  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // Start Deploy Simulation
  const handleDeploy = () => {
    setDeployLogs([]);
    const steps = [
      { msg: '$ git clone https://github.com/CataDef/dollarapp-blog.git', delay: 500 },
      { msg: 'Cloning into \'dollarapp-blog\'...', delay: 1200 },
      { msg: 'Remote: Enumerating objects: 42, done.', delay: 1600 },
      { msg: 'Remote: Total 42 (delta 12), reused 38 (delta 8)', delay: 1900 },
      { msg: '$ cd dollarapp-blog', delay: 2400 },
      { msg: '$ npm install', delay: 3000 },
      { msg: 'added 842 packages in 3s', delay: 4200 },
      { msg: '$ vercel link --yes', delay: 5000 },
      { msg: 'Linked to project cata-def/dollarapp-blog (Scope: cata-def)', delay: 5800 },
      { msg: '$ vercel deploy --prod', delay: 6500 },
      { msg: 'Vercel CLI 33.1.0', delay: 7200 },
      { msg: 'Building site...', delay: 8000 },
      { msg: 'Running "build" command...', delay: 8800 },
      { msg: 'PostgreSQL connected: fly.io/dollarapp-db', delay: 9500 },
      { msg: '✔ Production: https://dollarapp-blog.vercel.app', delay: 10500 }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        setDeployLogs(prev => [...prev, step.msg]);
      }, step.delay);
    });
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [deployLogs]);

  const getUrl = () => {
    switch(demoView) {
      case 'store_home': return 'mystore.com';
      case 'blog': return 'mystore.com/blog/eco-friendly-brewing';
      case 'product': return 'mystore.com/products/ceramic-coffee-set';
    }
  };

  // --- MERCHANT LANDING PAGE VIEW ---
  if (activeTab === 'home') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans overflow-y-auto">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                  <Bot size={24} />
               </div>
               BlogGen AI
            </div>
            <div className="flex items-center gap-6">
               <button onClick={onExit} className="text-slate-500 hover:text-slate-900 font-medium text-sm flex items-center gap-2">
                 <ArrowLeft size={16} /> Back to DollarApp
               </button>
               <button 
                 onClick={() => setActiveTab('dashboard')}
                 className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-sm transition-all shadow-lg"
               >
                 Go to App Dashboard
               </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="pt-20 pb-32 px-6">
           <div className="container mx-auto text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100">
                 <Sparkles size={16} />
                 <span>New: GPT-4o Integration Available</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-slate-900 leading-[1.1]">
                 Turn Your Store Into An <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">SEO Traffic Machine</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                 Stop spending hours writing blogs. Our AI analyzes your products, finds high-traffic keywords, and writes SEO-optimized articles that rank on Google automatically.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button onClick={() => setActiveTab('dashboard')} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
                    Start Free Trial <ArrowRight size={20} />
                 </button>
                 <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                    View Sample Store
                 </button>
              </div>
           </div>
        </header>

        {/* Visual Demo Section */}
        <section className="bg-slate-50 py-24 border-y border-slate-200 overflow-hidden">
           <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold mb-4">See The Customer Journey</h2>
                 <p className="text-slate-500">Interact with the demo below to see how our AI blogs drive sales.</p>
              </div>

              {/* Interactive Window */}
              <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[800px] md:h-[750px]">
                 {/* Browser Chrome */}
                 <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                       <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-xs text-slate-500 flex items-center gap-3 shadow-sm">
                       <div className="flex items-center gap-1 text-slate-400">
                          <Globe size={12} />
                          <span className="font-mono">https://</span>
                       </div>
                       <span className="text-slate-900 font-medium">{getUrl()}</span>
                    </div>
                    
                    {/* Navigation Helper for Demo */}
                    <div className="flex gap-2">
                       <button 
                         onClick={() => setDemoView('store_home')}
                         className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
                         title="Back to Home"
                       >
                          <LayoutDashboard size={14} />
                       </button>
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="flex-1 overflow-y-auto relative scroll-smooth">
                    
                    {/* --- VIEW 1: STORE HOME --- */}
                    {demoView === 'store_home' && (
                      <div className="animate-in fade-in duration-500">
                         {/* Store Nav */}
                         <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
                            <div className="font-serif text-2xl font-black tracking-tighter">Lumina.</div>
                            <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
                              <span className="text-slate-900">Shop</span>
                              <span>About</span>
                              <span>Journal</span>
                            </div>
                            <div className="flex gap-4 text-slate-900">
                               <Search size={20} />
                               <ShoppingBag size={20} />
                            </div>
                         </div>

                         {/* Hero */}
                         <div className="relative h-[500px] bg-slate-900 flex items-center justify-center overflow-hidden">
                            <img 
                               src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000" 
                               alt="Coffee Shop" 
                               className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                            <div className="relative z-10 text-center text-white px-6">
                               <div className="uppercase tracking-[0.3em] text-xs font-bold mb-4 text-amber-400">Est. 2024</div>
                               <h2 className="text-5xl md:text-7xl font-serif mb-6">Roasting with <br/> Conscience.</h2>
                               <button className="px-8 py-4 bg-white text-slate-900 font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors">
                                  Shop Collection
                               </button>
                            </div>
                         </div>

                         {/* Blog Teaser Section */}
                         <div className="py-20 px-8 max-w-6xl mx-auto">
                            <div className="flex justify-between items-end mb-12">
                               <div>
                                  <h3 className="text-3xl font-serif font-bold mb-2">From The Journal</h3>
                                  <p className="text-slate-500">Stories about sustainable living and brewing.</p>
                               </div>
                               <button className="text-sm font-bold underline decoration-2 decoration-amber-400 underline-offset-4">View All Stories</button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                               {/* Main Blog Card - Clickable */}
                               <div 
                                 onClick={() => setDemoView('blog')}
                                 className="group cursor-pointer"
                               >
                                  <div className="overflow-hidden rounded-xl mb-6 relative">
                                     <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider z-10">
                                        Freshly Brewed
                                     </div>
                                     <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors z-10"></div>
                                     <img 
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" 
                                        alt="Coffee Brewing"
                                        className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                     />
                                     
                                     {/* AI Badge */}
                                     <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 z-20">
                                       <Bot size={14} /> AI Generated
                                     </div>
                                  </div>
                                  <div>
                                     <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Sustainability</div>
                                     <h4 className="text-2xl font-serif font-bold mb-3 group-hover:text-indigo-700 transition-colors">
                                        The Ultimate Guide to Eco-Friendly Coffee Brewing
                                     </h4>
                                     <p className="text-slate-500 leading-relaxed mb-4">
                                        Discover how to brew your morning cup without harming the planet. We explore ceramic filters, fair trade beans, and zero-waste methods...
                                     </p>
                                     <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-4 transition-all">
                                        Read Article <ArrowRight size={16} />
                                     </div>
                                  </div>
                               </div>

                               {/* Secondary Card */}
                               <div className="space-y-8 opacity-50 pointer-events-none grayscale">
                                  <div className="flex gap-6">
                                     <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=200&q=80" className="w-24 h-24 object-cover rounded-lg" />
                                     <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Culture</div>
                                        <h5 className="font-serif font-bold text-lg mb-2">The History of Arabica Beans</h5>
                                        <span className="text-xs font-bold underline">Read More</span>
                                     </div>
                                  </div>
                                  <div className="flex gap-6">
                                     <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" className="w-24 h-24 object-cover rounded-lg" />
                                     <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Recipes</div>
                                        <h5 className="font-serif font-bold text-lg mb-2">5 Summer Cold Brew Recipes</h5>
                                        <span className="text-xs font-bold underline">Read More</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    )}

                    {/* --- VIEW 2: BLOG POST --- */}
                    {demoView === 'blog' && (
                       <div className="max-w-3xl mx-auto p-12 animate-in fade-in">
                          {/* Breadcrumb */}
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 cursor-pointer hover:text-indigo-600" onClick={() => setDemoView('store_home')}>
                             <ArrowLeft size={12} /> Back to Journal
                          </div>

                          <div className="text-center mb-12">
                             <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Sustainable Living</div>
                             <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                                The Ultimate Guide to Eco-Friendly Coffee Brewing
                             </h1>
                             <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                   <Bot size={16} />
                                </div>
                                <span>Written by AI Editor • 5 min read</span>
                             </div>
                          </div>

                          <img 
                             src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                             className="w-full h-64 md:h-[400px] object-cover rounded-2xl mb-12 shadow-lg"
                             alt="Coffee Brewing"
                          />

                          <div className="prose prose-lg prose-slate mx-auto">
                             <p className="lead text-xl text-slate-600 mb-8">
                                Coffee is more than just a morning ritual; it's a global industry that impacts millions of lives and ecosystems. 
                                As consumers become more conscious of their environmental footprint, the demand for <span className="bg-yellow-100 px-1">sustainable coffee brewing</span> methods has skyrocketed.
                             </p>
                             
                             <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Choose Ceramic Filters?</h3>
                             <p className="mb-6 text-slate-600">
                                Unlike paper filters which are single-use and contribute to waste, or metal filters which can alter the taste, 
                                ceramic filters offer a perfect balance. They are reusable, easy to clean, and provide a clean cup without stripping away the essential oils.
                             </p>

                             {/* Embedded Product CTA */}
                             <div className="my-12 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-6 transform hover:-translate-y-1 transition-transform cursor-pointer group" onClick={() => setDemoView('product')}>
                                <div className="relative">
                                  <img 
                                    src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=200&q=80" 
                                    className="w-24 h-24 object-cover rounded-lg shadow-sm bg-white group-hover:scale-105 transition-transform"
                                    alt="Thumbnail"
                                  />
                                  <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full p-1.5 shadow-md">
                                     <ShoppingBag size={14} />
                                  </div>
                                </div>
                                <div>
                                   <div className="text-xs font-bold text-indigo-600 uppercase mb-1">Featured Product</div>
                                   <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">Artisan Ceramic Coffee Set</h4>
                                   <p className="text-sm text-slate-500 mb-3">The sustainable choice for your morning brew.</p>
                                   <span className="text-sm font-bold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4">Shop Now - $85.00</span>
                                </div>
                             </div>

                             <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Impact of Your Beans</h3>
                             <p className="text-slate-600">
                                Choosing the right equipment is only half the battle. Sourcing fair-trade, shade-grown beans ensures that your daily cup supports biodiversity...
                             </p>
                          </div>
                       </div>
                    )}

                    {/* --- VIEW 3: PRODUCT PAGE --- */}
                    {demoView === 'product' && (
                       <div className="flex flex-col md:flex-row h-full animate-in fade-in">
                          <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-12 relative">
                             <button 
                               onClick={() => setDemoView('blog')}
                               className="absolute top-6 left-6 text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 z-10"
                             >
                                <ArrowLeft size={16} /> Back to Article
                             </button>
                             <img 
                               src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80" 
                               alt="Product" 
                               className="max-w-full max-h-[400px] object-contain drop-shadow-xl rounded-xl"
                             />
                          </div>
                          <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white">
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kitchen & Dining</div>
                             <h1 className="text-4xl font-serif font-medium text-slate-900 mb-4">Artisan Ceramic Coffee Set</h1>
                             <div className="text-2xl font-bold text-slate-900 mb-6">$85.00</div>
                             <div className="flex items-center gap-2 mb-8 text-sm text-emerald-600 font-bold">
                                <CheckCircle2 size={16} /> In Stock, Ready to Ship
                             </div>
                             <p className="text-slate-600 mb-8 leading-relaxed">
                                Handcrafted from sustainable clay, this set includes a pour-over dripper and serving carafe. Perfect for the morning ritual.
                             </p>
                             <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-black transition-colors uppercase tracking-wider text-sm">
                                   Add to Cart
                                </button>
                                <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
                                   <Zap size={20} fill="currentColor" />
                                </button>
                             </div>
                             
                             <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-sm">
                                <span className="font-bold text-indigo-900">Seen in our blog:</span>
                                <p className="text-indigo-700 mt-1">"The Ultimate Guide to Eco-Friendly Coffee Brewing"</p>
                             </div>
                          </div>
                       </div>
                    )}

                 </div>
              </div>
           </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                 <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                       <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Smart Keyword Research</h3>
                    <p className="text-slate-500 leading-relaxed">
                       We scan your niche to find low-competition, high-volume keywords that your competitors are missing.
                    </p>
                 </div>
                 <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                       <Zap size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">One-Click Publishing</h3>
                    <p className="text-slate-500 leading-relaxed">
                       Connect your store once. We handle the formatting, images, internal linking, and publishing.
                    </p>
                 </div>
                 <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                       <TrendingUp size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Commercial Intent</h3>
                    <p className="text-slate-500 leading-relaxed">
                       Every article is designed to sell. We intelligently weave your products into the content to drive conversions.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center">
           <p className="text-slate-500 mb-4">Ready to automate your content marketing?</p>
           <button onClick={() => setActiveTab('dashboard')} className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-black transition-colors">
              Install App Now
           </button>
        </footer>
      </div>
    );
  }

  // --- ADMIN / DEVELOPER VIEW (Original Implementation) ---
  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans text-slate-50 overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium border-r border-slate-700 pr-4"
          >
            <ArrowLeft size={16} />
            Landing Page
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded text-white">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-bold tracking-tight text-lg leading-none">AI Blog Autopilot</h2>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Shopify App Dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             System Online
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto shrink-0 hidden md:flex">
          <div className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'preview', label: 'Content Preview', icon: FileText },
              { id: 'pricing', label: 'Pricing Model', icon: DollarSign },
              { id: 'deploy', label: 'Deploy App', icon: Rocket },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto p-6 border-t border-slate-800">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
               <div className="text-xs text-slate-400 mb-2 uppercase font-bold">Your Monthly Profit</div>
               <div className="text-2xl font-bold text-emerald-400 mb-1">$2,450.00</div>
               <div className="text-xs text-slate-500 flex items-center gap-1">
                 <BarChart3 size={12} /> +12% vs last month
               </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-8 relative">
          
          {/* --- TAB: DASHBOARD --- */}
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
               
               {/* Architecture Diagram */}
               <div className="grid md:grid-cols-4 gap-4 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2 hidden md:block"></div>
                  
                  {[
                    { title: "Crawler", desc: "Scrapes Product Info", icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10" },
                    { title: "Claude 3.5", desc: "Writes 1200w Article", icon: Bot, color: "text-indigo-400", bg: "bg-indigo-400/10" },
                    { title: "DALL-E 3", desc: "Generates Header Img", icon: ImageIcon, color: "text-pink-400", bg: "bg-pink-400/10" },
                    { title: "Shopify API", desc: "Publishes + Schema", icon: Database, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                  ].map((step, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-slate-600 transition-colors z-10">
                       <div className={`w-12 h-12 ${step.bg} ${step.color} rounded-lg flex items-center justify-center mb-3`}>
                          <step.icon size={24} />
                       </div>
                       <h3 className="font-bold text-white">{step.title}</h3>
                       <p className="text-xs text-slate-400">{step.desc}</p>
                    </div>
                  ))}
               </div>

               {/* Action Card */}
               <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Manual Override</h3>
                    <p className="text-slate-400 max-w-md">
                      The cron job runs automatically every night. You can force a generation run for specific keywords here.
                    </p>
                  </div>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles />} 
                    {isGenerating ? 'Generating...' : 'Run AI Pipeline'}
                  </button>
               </div>

               {isGenerating && (
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                       <span>Analyzing store products...</span>
                       <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                    </div>
                 </div>
               )}

               {/* Recent Generations */}
               <div>
                 <h3 className="text-xl font-bold text-white mb-4">Recent Auto-Blog Posts</h3>
                 <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                       <thead className="bg-slate-950 text-slate-500 text-xs uppercase font-bold">
                          <tr>
                             <th className="p-4">Blog Title</th>
                             <th className="p-4">Target Keyword</th>
                             <th className="p-4">Schema.org</th>
                             <th className="p-4 text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800 text-sm">
                          {[
                            { title: "10 Eco-Friendly Coffee Habits", kw: "sustainable coffee", status: "Published" },
                            { title: "Why Ceramic Filters Taste Better", kw: "ceramic vs paper filter", status: "Published" },
                            { title: "The History of Arabica Beans", kw: "arabica history", status: "Scheduled" },
                          ].map((row, i) => (
                             <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-medium text-slate-200">{row.title}</td>
                                <td className="p-4 text-slate-400">{row.kw}</td>
                                <td className="p-4 text-emerald-400 flex items-center gap-1">
                                   <CheckCircle2 size={14} /> Valid
                                </td>
                                <td className="p-4 text-right">
                                   <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                      {row.status}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               </div>
            </div>
          )}

          {/* --- TAB: PREVIEW --- */}
          {activeTab === 'preview' && (
            <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               {/* Shopify Mock Header */}
               <div className="border-b px-8 py-4 flex justify-between items-center">
                  <div className="font-serif text-xl font-bold">MyStore.</div>
                  <div className="flex gap-4 text-sm font-medium text-slate-500">
                     <span>Home</span>
                     <span>Catalog</span>
                     <span className="text-slate-900 border-b-2 border-black">Blog</span>
                  </div>
               </div>

               <div className="p-8 md:p-12">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                     <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Sustainable Living</span>
                     <h1 className="text-4xl font-serif font-bold mb-4 text-slate-900">The Ultimate Guide to Eco-Friendly Coffee Brewing</h1>
                     <p className="text-slate-500 italic">By AI Editor • October 24, 2024</p>
                  </div>

                  <div className="w-full h-64 md:h-96 bg-slate-200 rounded-xl mb-10 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                        alt="Coffee brewing" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                        Generated by DALL-E 3
                      </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-slate-600">
                     <p>
                       Coffee is more than just a morning ritual; it's a global industry that impacts millions of lives and ecosystems. 
                       As consumers become more conscious of their environmental footprint, the demand for sustainable coffee brewing methods has skyrocketed.
                     </p>
                     <h3 className="text-slate-900 font-bold text-2xl mt-8 mb-4">Why Choose Ceramic Filters?</h3>
                     <p>
                       Unlike paper filters which are single-use and contribute to waste, or metal filters which can alter the taste, 
                       ceramic filters offer a perfect balance. They are reusable, easy to clean, and provide a clean cup without stripping away the essential oils.
                     </p>
                     
                     {/* Product Embed Simulation */}
                     <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-6 not-prose">
                        <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0"></div>
                        <div>
                           <h4 className="font-bold text-slate-900">Ceramic Pour-Over Set V2</h4>
                           <p className="text-sm text-slate-500 mb-2">The best way to brew sustainable coffee.</p>
                           <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded hover:bg-slate-800">Buy Now - $45.00</button>
                        </div>
                     </div>
                  </div>
                  
                  {/* Schema Markup Visualization */}
                  <div className="mt-12 border-t pt-8">
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase mb-4">
                        <Code size={14} /> SEO: Schema.org/BlogPosting
                     </div>
                     <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs font-mono text-emerald-400">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "The Ultimate Guide to Eco-Friendly Coffee Brewing",
  "image": "https://mystore.com/cdn/shop/articles/coffee.jpg",
  "author": {
    "@type": "Organization",
    "name": "MyStore"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MyStore",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mystore.com/logo.png"
    }
  },
  "datePublished": "2024-10-24",
  "description": "Discover how to brew coffee sustainably..."
}`}
                        </pre>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* --- TAB: PRICING --- */}
          {activeTab === 'pricing' && (
            <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Monetization Model</h2>
                  <p className="text-slate-400">How you earn passive income with this app.</p>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {/* Plan 1 */}
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors">
                     <div className="text-lg font-medium text-indigo-400 mb-2">Starter Plan</div>
                     <div className="text-4xl font-bold text-white mb-1">$10<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                     <div className="text-sm text-slate-400 mb-6">For small stores</div>
                     
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> 10 Blogs / Month</li>
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> Basic SEO</li>
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> Stock Images</li>
                     </ul>
                     
                     <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/50">
                        <div className="flex justify-between text-sm mb-1">
                           <span className="text-slate-500">Your API Cost:</span>
                           <span className="text-rose-400">$1.00</span>
                        </div>
                        <div className="flex justify-between font-bold">
                           <span className="text-emerald-400">Net Profit:</span>
                           <span className="text-white">$9.00 / user</span>
                        </div>
                     </div>
                  </div>

                  {/* Plan 2 */}
                  <div className="bg-slate-900 border-2 border-indigo-600 p-8 rounded-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
                     <div className="text-lg font-medium text-indigo-400 mb-2">Growth Plan</div>
                     <div className="text-4xl font-bold text-white mb-1">$50<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                     <div className="text-sm text-slate-400 mb-6">For serious brands</div>
                     
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> 50 Blogs / Month</li>
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> Advanced Schema.org</li>
                        <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> DALL-E 3 Images</li>
                     </ul>
                     
                     <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/30">
                        <div className="flex justify-between text-sm mb-1">
                           <span className="text-slate-500">Your API Cost:</span>
                           <span className="text-rose-400">$5.00</span>
                        </div>
                        <div className="flex justify-between font-bold">
                           <span className="text-emerald-400">Net Profit:</span>
                           <span className="text-white">$45.00 / user</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* --- TAB: DEPLOY --- */}
          {activeTab === 'deploy' && (
            <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4">
               
               {/* Repo Connection Status */}
               <div className="mb-6 bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                     <div className="text-xs text-slate-500 font-bold uppercase mb-1">Connected Repository</div>
                     <div className="flex items-center gap-2 text-sm text-white font-mono">
                        <Github size={16} />
                        CataDef/dollarapp-blog
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <a 
                        href="https://github.com/CataDef/dollarapp-blog" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                     >
                        View Code <ExternalLink size={12} />
                     </a>
                     <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={14} /> Linked
                     </div>
                  </div>
               </div>

               {/* Mode Toggle */}
               <div className="flex justify-center mb-6">
                  <div className="bg-slate-900 p-1 rounded-lg flex border border-slate-800">
                    <button 
                      onClick={() => setGuideMode('sim')}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${guideMode === 'sim' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                      Animation Demo
                    </button>
                    <button 
                      onClick={() => setGuideMode('real')}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${guideMode === 'real' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                      <Code size={16} /> Real Implementation Guide
                    </button>
                  </div>
               </div>

               {/* --- MODE: SIMULATION --- */}
               {guideMode === 'sim' && (
                <>
                 <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl h-[500px]">
                    <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs font-mono text-slate-400 ml-2">terminal — deploy</span>
                      </div>
                      <button 
                        onClick={handleDeploy} 
                        className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded transition-colors"
                      >
                        START SIMULATION
                      </button>
                    </div>
                    
                    <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-black/50 text-slate-300 space-y-1">
                      {deployLogs.length === 0 && (
                        <div className="text-slate-500 flex flex-col items-center justify-center h-full gap-4">
                            <Terminal size={48} className="opacity-20" />
                            <p>Simulating deployment for <span className="text-indigo-400">CataDef/dollarapp-blog</span></p>
                        </div>
                      )}
                      {deployLogs.map((log, i) => (
                        <div key={i} className={`${log.startsWith('$') ? 'text-white font-bold mt-4' : 'text-emerald-500/80'}`}>
                            {log}
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                 </div>
                 <div className="mt-6 text-center text-slate-500 text-xs italic">
                    *This simulates what happens when you push code to Vercel.
                 </div>
                </>
               )}

               {/* --- MODE: REAL GUIDE --- */}
               {guideMode === 'real' && (
                 <div className="space-y-6 animate-in slide-in-from-right-4 pb-20">
                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg flex gap-3">
                       <AlertTriangle className="text-amber-400 shrink-0" size={24} />
                       <div>
                          <h3 className="font-bold text-white">Required: Use Your Local Terminal</h3>
                          <p className="text-sm text-slate-300 mt-1">
                             I cannot run commands on your computer. Open <span className="font-bold text-white">VS Code</span> or your <span className="font-bold text-white">Terminal</span>, navigate to your projects folder, and run these commands exactly as written below.
                          </p>
                       </div>
                    </div>

                    {/* STEP 1 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                             <span className="font-bold text-sm text-slate-200">Step 1: Clone your repository</span>
                             <span className="text-xs text-slate-500 uppercase font-mono">Terminal</span>
                          </div>
                          <div className="p-4 bg-black font-mono text-sm text-slate-300 relative group space-y-2">
                             <button 
                               onClick={() => navigator.clipboard.writeText('git clone https://github.com/CataDef/dollarapp-blog.git && cd dollarapp-blog')}
                               className="absolute top-4 right-4 p-2 bg-slate-800 rounded hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                             ><Copy size={14}/></button>
                             
                             <div className="flex gap-2">
                                <span className="text-indigo-400 select-none">$</span>
                                <span>git clone https://github.com/CataDef/dollarapp-blog.git</span>
                             </div>
                             <div className="flex gap-2">
                                <span className="text-indigo-400 select-none">$</span>
                                <span>cd dollarapp-blog</span>
                             </div>
                          </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                             <span className="font-bold text-sm text-slate-200">Step 2: Create the Shopify App Code</span>
                             <span className="text-xs text-slate-500 uppercase font-mono">Terminal</span>
                          </div>
                          <div className="p-4 bg-black font-mono text-sm text-slate-300 relative group space-y-4">
                             <div className="text-slate-500 italic text-xs border-l-2 border-slate-700 pl-2">
                                We use the 'Remix' template which is the industry standard for Shopify Apps in 2024.
                             </div>

                             <div className="flex gap-2">
                                <span className="text-indigo-400 select-none">$</span>
                                <span>npm init @shopify/app@latest -- --template remix</span>
                             </div>

                             <div className="p-3 bg-indigo-900/20 border border-indigo-500/20 rounded text-xs text-indigo-200">
                                <strong>Prompt Answers:</strong><br/>
                                - App Name: <span className="text-white font-bold">dollarapp-blog</span><br/>
                                - Type of App: <span className="text-white font-bold">Public App</span> (or Custom)
                             </div>
                          </div>
                    </div>

                    {/* STEP 3: EMERGENCY GIT FIX */}
                    <div className="bg-red-950/30 border border-red-500/50 p-4 rounded-lg animate-in fade-in">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                        <div className="w-full">
                            <h4 className="text-sm font-bold text-red-400">GIT EMERGENCY FIX: Code not showing on GitHub?</h4>
                            <p className="text-xs text-slate-300 mt-1 mb-3 leading-relaxed">
                              If you see <strong>"does not have a commit checked out"</strong> or if your folder is empty on GitHub, it's because of a nested git conflict. 
                              <br/><br/>
                              <strong>RUN THIS EXACT COMMAND BLOCK ONE BY ONE:</strong>
                            </p>
                            <div className="bg-black p-4 rounded border border-red-500/30 font-mono text-xs space-y-4 relative group">
                              
                              <div>
                                <div className="text-slate-500 mb-1"># 1. Remove the nested .git folder (Fixes conflict)</div>
                                <div className="flex gap-2">
                                    <span className="text-red-500">$</span>
                                    <span className="text-white">rm -rf dollarapp-blog/.git</span>
                                </div>
                              </div>

                              <div>
                                <div className="text-slate-500 mb-1"># 2. CRITICAL: Untrack the subfolder reference</div>
                                <div className="flex gap-2">
                                    <span className="text-red-500">$</span>
                                    <span className="text-white">git rm --cached dollarapp-blog</span>
                                </div>
                              </div>

                              <div>
                                <div className="text-slate-500 mb-1"># 3. Re-add everything correctly</div>
                                <div className="flex gap-2">
                                    <span className="text-red-500">$</span>
                                    <span className="text-white">git add .</span>
                                </div>
                              </div>

                              <div>
                                <div className="text-slate-500 mb-1"># 4. Commit and Push</div>
                                <div className="flex gap-2">
                                    <span className="text-red-500">$</span>
                                    <span className="text-white">git commit -m "Fix nested git issue"</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-red-500">$</span>
                                    <span className="text-white">git push origin main</span>
                                </div>
                              </div>

                            </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 4 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                             <span className="font-bold text-sm text-slate-200">Step 4: Connect to Vercel</span>
                             <span className="text-xs text-slate-500 uppercase font-mono">Browser</span>
                          </div>
                          <div className="p-6 text-sm text-slate-300 space-y-4">
                             <ol className="list-decimal list-inside space-y-3">
                                <li>
                                   Go to <a href="https://vercel.com/new" target="_blank" className="text-indigo-400 hover:text-white underline font-bold">vercel.com/new</a>
                                </li>
                                <li>
                                   Search for <strong>dollarapp-blog</strong> under "Import Git Repository".
                                </li>
                                <li>
                                   Click <span className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold uppercase">Import</span>.
                                </li>
                                <li>
                                   Framework Preset: Choose <span className="font-bold text-white">Remix</span>.
                                </li>
                                <li>
                                   Click <span className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold uppercase">Deploy</span>.
                                </li>
                             </ol>
                             <div className="text-xs text-emerald-400 flex items-center gap-2 mt-4">
                                <CheckCircle2 size={14} /> After this, your app will be live on the web!
                             </div>
                          </div>
                    </div>
                 </div>
               )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlogGenDemo;
