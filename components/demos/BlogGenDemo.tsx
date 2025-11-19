import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, LayoutDashboard, FileText, Settings, Rocket, 
  CheckCircle2, Bot, Image as ImageIcon, Globe, DollarSign,
  BarChart3, Database, Terminal, Play, Code, RefreshCw, Sparkles,
  Github, ExternalLink
} from 'lucide-react';

interface BlogGenDemoProps {
  onExit: () => void;
}

type Tab = 'dashboard' | 'preview' | 'pricing' | 'deploy';

const BlogGenDemo: React.FC<BlogGenDemoProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
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

  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans text-slate-50 overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium border-r border-slate-700 pr-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded text-white">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-bold tracking-tight text-lg leading-none">AI Blog Autopilot</h2>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Shopify App Edition</span>
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
                       START DEPLOYMENT
                     </button>
                  </div>
                  
                  <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-black/50 text-slate-300 space-y-1">
                     {deployLogs.length === 0 && (
                       <div className="text-slate-500 flex flex-col items-center justify-center h-full gap-4">
                          <Terminal size={48} className="opacity-20" />
                          <p>Ready to deploy from <span className="text-indigo-400">CataDef/dollarapp-blog</span></p>
                          <p>Click "START DEPLOYMENT" to push to Vercel.</p>
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

               <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl flex gap-4">
                  <Database className="text-blue-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Database Requirement</h4>
                    <p className="text-sm text-slate-400">
                      This app requires a PostgreSQL database (e.g., Railway or Supabase) to store user preferences and blog history. 
                      The deployment script above assumes a `DATABASE_URL` environment variable is set.
                    </p>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlogGenDemo;