import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bell, Settings, BarChart3, Layout, 
  CreditCard, Play, Square, MousePointer, MapPin, 
  ShoppingBag, X, Check
} from 'lucide-react';

interface SocialProofDemoProps {
  onExit: () => void;
}

interface MockSale {
  city: string;
  country: string;
  product: string;
  timeAgo: string;
  image: string;
}

const MOCK_SALES: MockSale[] = [
  { city: "Austin", country: "TX", product: "Premium Leather Wallet", timeAgo: "2 minutes ago", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=100&q=80" },
  { city: "London", country: "UK", product: "Minimalist Watch", timeAgo: "5 minutes ago", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=100&q=80" },
  { city: "Berlin", country: "Germany", product: "Canvas Backpack", timeAgo: "Just now", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80" },
  { city: "Tokyo", country: "Japan", product: "Ceramic Coffee Set", timeAgo: "1 minute ago", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=100&q=80" },
];

const SocialProofDemo: React.FC<SocialProofDemoProps> = ({ onExit }) => {
  // App Configuration State
  const [isActive, setIsActive] = useState(true);
  const [popupShape, setPopupShape] = useState<'rounded' | 'square'>('rounded');
  const [popupPosition, setPopupPosition] = useState<'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'>('bottom-left');
  const [showImage, setShowImage] = useState(true);
  const [delay, setDelay] = useState(3000);

  // Simulation State
  const [currentSale, setCurrentSale] = useState<MockSale | null>(null);
  const [visible, setVisible] = useState(false);

  // Animation Loop
  useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return;
    }

    const cycle = () => {
      // Show random sale
      const randomSale = MOCK_SALES[Math.floor(Math.random() * MOCK_SALES.length)];
      setCurrentSale(randomSale);
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    };

    // Start immediately
    cycle();

    // Repeat every (delay + 4000 + buffer)
    const interval = setInterval(cycle, delay + 5000);

    return () => clearInterval(interval);
  }, [isActive, delay]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium border-r border-slate-200 pr-4"
          >
            <ArrowLeft size={16} />
            Exit Demo
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-1.5 rounded text-white">
              <Bell size={20} />
            </div>
            <h2 className="font-bold tracking-tight text-lg">SocialProof Pop</h2>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Live</span>
          </div>
        </div>
        <div className="text-sm text-slate-400 hidden sm:block">
          Shopify App Store Preview
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: App Dashboard (Settings) */}
        <div className="w-[400px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10">
          <div className="p-6 space-y-8">
            
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg shadow-purple-900/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Revenue generated</p>
                  <h3 className="text-3xl font-bold">$1,240.50</h3>
                </div>
                <BarChart3 className="text-purple-200 opacity-50" />
              </div>
              <div className="flex gap-4 text-xs text-purple-100 border-t border-white/10 pt-4">
                <div>
                  <span className="font-bold block text-white">12,403</span> Impressions
                </div>
                <div>
                  <span className="font-bold block text-white">8.5%</span> CTR
                </div>
              </div>
            </div>

            {/* Main Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">Enable Notifications</div>
                <div className="text-xs text-slate-500">Show popups on your storefront</div>
              </div>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {/* Appearance Settings */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layout size={16} /> Appearance
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Popup Shape</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPopupShape('rounded')}
                      className={`flex-1 py-2 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${popupShape === 'rounded' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600'}`}
                    >
                      <div className="w-4 h-4 border border-current rounded-full"></div> Rounded
                    </button>
                    <button 
                       onClick={() => setPopupShape('square')}
                       className={`flex-1 py-2 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${popupShape === 'square' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600'}`}
                    >
                      <Square size={14} /> Square
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-2">Desktop Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['bottom-left', 'bottom-right', 'top-left', 'top-right'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPopupPosition(pos as any)}
                        className={`py-2 px-2 text-xs border rounded text-center capitalize ${popupPosition === pos ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                      >
                        {pos.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="showImage"
                    checked={showImage} 
                    onChange={(e) => setShowImage(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500" 
                  />
                  <label htmlFor="showImage" className="text-sm text-slate-700">Show Product Image</label>
                </div>
              </div>
            </div>

             {/* Timing Settings */}
             <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Settings size={16} /> Timing
              </h4>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="text-slate-600">Delay between popups</label>
                  <span className="font-bold text-purple-600">{delay / 1000}s</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="1000"
                  value={delay}
                  onChange={(e) => setDelay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: Live Preview (Mock Store) */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
          <div className="bg-white px-4 py-2 text-xs text-center border-b border-slate-200 text-slate-400 font-mono">
            PREVIEWING: STOREFRONT
          </div>

          {/* Mock Storefront Content */}
          <div className="flex-1 overflow-y-auto p-8">
             <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[1000px] rounded-t-xl border border-slate-200">
                {/* Fake Store Header */}
                <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 bg-white/90 backdrop-blur z-0">
                   <div className="font-serif font-bold text-xl tracking-widest">LUMINARY.</div>
                   <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <span>Shop</span>
                      <span>Collections</span>
                      <span>About</span>
                   </div>
                   <div className="flex gap-4 text-slate-400">
                      <ShoppingBag size={18} />
                   </div>
                </div>

                {/* Fake Hero */}
                <div className="h-[400px] bg-slate-100 relative mb-12 flex items-center justify-center">
                    <div className="text-center">
                       <h1 className="text-4xl font-serif mb-4 text-slate-800">Summer Collection '25</h1>
                       <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-800">Shop Now</button>
                    </div>
                </div>

                {/* Fake Products Grid */}
                <div className="px-8 grid grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-3">
                       <div className="aspect-[3/4] bg-slate-100 rounded-sm relative group overflow-hidden">
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                       </div>
                       <div>
                         <div className="h-4 w-3/4 bg-slate-100 rounded mb-1"></div>
                         <div className="h-3 w-1/4 bg-slate-100 rounded"></div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* THE ACTUAL POPUP (Absoulte positioned over preview) */}
          <div className={`absolute pointer-events-none p-6 w-full h-full top-0 left-0 flex flex-col ${
            popupPosition === 'bottom-left' ? 'justify-end items-start' :
            popupPosition === 'bottom-right' ? 'justify-end items-end' :
            popupPosition === 'top-left' ? 'justify-start items-start' :
            'justify-start items-end'
          }`}>
             
             <div className={`
                pointer-events-auto max-w-sm w-full bg-white shadow-xl border border-slate-100 p-4 flex items-center gap-4 transition-all duration-500 transform
                ${popupShape === 'rounded' ? 'rounded-full' : 'rounded-none'}
                ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
             `}>
                
                {/* Close Button */}
                <button 
                  onClick={() => setVisible(false)}
                  className="absolute -top-2 -right-2 bg-slate-200 text-slate-500 rounded-full p-1 hover:bg-slate-300 shadow-sm"
                >
                  <X size={10} />
                </button>

                {showImage && currentSale && (
                  <img 
                    src={currentSale.image} 
                    alt="Product" 
                    className={`w-12 h-12 object-cover ${popupShape === 'rounded' ? 'rounded-full' : 'rounded-sm'}`}
                  />
                )}

                {currentSale && (
                  <div className="text-sm">
                     <p className="leading-tight text-slate-800">
                       <span className="font-bold text-purple-700">Someone in {currentSale.city}, {currentSale.country}</span>
                       <br />
                       purchased <span className="font-medium">{currentSale.product}</span>
                     </p>
                     <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-slate-400">{currentSale.timeAgo}</span>
                        <span className="text-green-500 flex items-center text-[10px] font-bold uppercase gap-0.5">
                           <Check size={10} /> Verified
                        </span>
                     </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SocialProofDemo;