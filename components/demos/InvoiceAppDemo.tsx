import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, Download, Mail, FileText, Package, 
  RefreshCw, Settings, CheckCircle2, Truck, 
  ShoppingBag, Zap, XCircle, Palette, Upload, ArrowLeft, ExternalLink,
  Link, Lock, AlertTriangle, Code, Server, Copy, Terminal, Play, Check, HelpCircle
} from 'lucide-react';

// --- Mock Data Types ---
interface OrderItem {
  id: number;
  desc: string;
  sku: string;
  qty: number;
  price: number;
  weight: number; // in kg
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  status: 'paid' | 'pending' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'fulfilled' | 'returned';
  items: OrderItem[];
}

interface ReturnRequest {
  id: string;
  orderNumber: string;
  customer: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

// --- Mock Data ---
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '1024',
    date: 'Oct 24, 2024',
    customer: {
      name: 'Elena Popescu',
      email: 'elena.p@example.com',
      address: 'Str. Victoriei 12, Bl. 4',
      city: 'Bucharest',
      country: 'RO'
    },
    status: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { id: 101, desc: 'Premium Cotton Hoodie (Black/M)', sku: 'HD-BLK-M', qty: 1, price: 45.00, weight: 0.5 },
      { id: 102, desc: 'Canvas Tote Bag', sku: 'BG-CNV', qty: 2, price: 12.50, weight: 0.2 }
    ]
  },
  {
    id: '2',
    orderNumber: '1025',
    date: 'Oct 25, 2024',
    customer: {
      name: 'James Wilson',
      email: 'j.wilson@example.com',
      address: '452 Broadway Ave',
      city: 'New York',
      country: 'US'
    },
    status: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { id: 201, desc: 'Wireless Noise Cancelling Headphones', sku: 'AUD-WNC', qty: 1, price: 299.00, weight: 0.8 }
    ]
  },
  {
    id: '3',
    orderNumber: '1023',
    date: 'Oct 22, 2024',
    customer: {
      name: 'Andrei Ionescu',
      email: 'andrei@example.com',
      address: 'Bulevardul Unirii 22',
      city: 'Cluj-Napoca',
      country: 'RO'
    },
    status: 'refunded',
    fulfillmentStatus: 'returned',
    items: [
      { id: 301, desc: 'Smart Watch Gen 4', sku: 'WTC-S4', qty: 1, price: 199.00, weight: 0.3 }
    ]
  }
];

const MOCK_RETURNS: ReturnRequest[] = [
  { id: 'r1', orderNumber: '1023', customer: 'Andrei Ionescu', reason: 'Item defective', status: 'approved', date: 'Oct 23' },
  { id: 'r2', orderNumber: '1020', customer: 'Sarah Smith', reason: 'Wrong size', status: 'pending', date: 'Oct 26' },
];

type DocumentType = 'invoice' | 'packing_slip' | 'shipping_label' | 'return_form';
type Tab = 'orders' | 'returns' | 'automation' | 'settings';
type DeployStep = 'keys' | 'hosting' | 'cli';

interface InvoiceAppDemoProps {
  onExit?: () => void;
}

const InvoiceAppDemo: React.FC<InvoiceAppDemoProps> = ({ onExit }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(MOCK_ORDERS[0].id);
  const [docType, setDocType] = useState<DocumentType>('invoice');
  const [notification, setNotification] = useState<string | null>(null);
  const [brandColor, setBrandColor] = useState('#4f46e5');
  
  // Connect Modal State
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [deployStep, setDeployStep] = useState<DeployStep>('keys');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  
  // CLI Automation State
  const [cliToken, setCliToken] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Automation Settings State
  const [autoEmail, setAutoEmail] = useState(true);
  const [autoPrint, setAutoPrint] = useState(false);
  
  const selectedOrder = MOCK_ORDERS.find(o => o.id === selectedOrderId) || MOCK_ORDERS[0];

  // Calculate totals
  const subtotal = selectedOrder.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.19; // 19% VAT example
  const total = subtotal + tax;

  // Simulate fetching data from Shopify
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliLogs]);

  const handleAction = (action: string) => {
    setNotification(`${action} successfully!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    handleAction('Copied to clipboard');
  };

  const simulateDeployment = () => {
    if (!cliToken) return;
    setIsDeploying(true);
    setCliLogs(['$ Initializing Shopify CLI environment...']);
    
    const steps = [
      { msg: `$ shopify auth --token=${cliToken.substring(0, 8)}...`, delay: 800 },
      { msg: '✔ Authenticated with Shopify Partners', delay: 1600 },
      { msg: '$ shopify app config link', delay: 2400 },
      { msg: '✔ App configuration linked to "DollarAppDev Invoice"', delay: 3200 },
      { msg: '$ shopify app build', delay: 4000 },
      { msg: '  • Compiling React frontend (Vite)...', delay: 4800 },
      { msg: '  • Building Node.js backend...', delay: 5800 },
      { msg: '✔ Build complete', delay: 6500 },
      { msg: '$ shopify app deploy', delay: 7200 },
      { msg: '  • Pushing to Shopify Partners Dashboard...', delay: 8200 },
      { msg: '  • Updating extension versions...', delay: 9200 },
      { msg: '✔ Deployed successfully to https://invoice-app-demo.shopify.app', delay: 10000 },
    ];

    let maxDelay = 0;

    steps.forEach(({ msg, delay }) => {
      maxDelay = Math.max(maxDelay, delay);
      setTimeout(() => {
        setCliLogs(prev => [...prev, msg]);
      }, delay);
    });

    setTimeout(() => {
      setIsDeploying(false);
      handleAction('App Deployed Successfully');
    }, maxDelay + 500);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
        <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-bold text-gray-800">Connecting to Shopify Store...</h3>
        <p className="text-gray-500 text-sm">Syncing Orders, Customers, and Returns</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
      
      {/* Deployment Modal (Connect Store) */}
      {showConnectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gray-900 p-6 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Server className="text-emerald-400" size={24} /> 
                  Production Launchpad
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Deploy this app to your Vercel account & connect to Shopify.
                </p>
              </div>
              <button onClick={() => setShowConnectModal(false)} className="text-gray-400 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto">
              <button 
                onClick={() => setDeployStep('keys')}
                className={`flex-1 p-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${deployStep === 'keys' ? 'border-brand-600 text-brand-600 bg-brand-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                1. Credentials
              </button>
              <button 
                onClick={() => setDeployStep('hosting')}
                className={`flex-1 p-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${deployStep === 'hosting' ? 'border-brand-600 text-brand-600 bg-brand-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                2. Hosting (Vercel)
              </button>
              <button 
                onClick={() => setDeployStep('cli')}
                className={`flex-1 p-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${deployStep === 'cli' ? 'border-brand-600 text-brand-600 bg-brand-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                3. CLI Automation
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
               {deployStep === 'keys' && (
                 <div className="space-y-6 animate-in slide-in-from-left-4 fade-in">
                    {/* Guide Box */}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                       <div className="flex items-start gap-3">
                          <HelpCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                          <div>
                            <h4 className="text-sm font-bold text-blue-900 mb-1">Where do I find these keys?</h4>
                            <ol className="list-decimal list-inside text-xs text-blue-800 space-y-1">
                               <li>Go to your <a href="https://partners.shopify.com" target="_blank" className="underline font-bold hover:text-blue-600">Shopify Partners Dashboard</a>.</li>
                               <li>Click <strong>Apps</strong> → <strong>Create App</strong> → Select <strong>Start from Dev Dashboard</strong> (on the right).</li>
                               <li>Name your app and click <strong>Create</strong>.</li>
                               <li>You will see the keys in the <strong>Client credentials</strong> box.</li>
                            </ol>
                          </div>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Client ID (API Key)</label>
                         <input 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type="text" 
                            placeholder="e.g. 721893719283..." 
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                          />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Client Secret</label>
                         <input 
                            value={apiSecret}
                            onChange={(e) => setApiSecret(e.target.value)}
                            type="password" 
                            placeholder="••••••••••••••••" 
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                          />
                       </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button 
                        onClick={() => setDeployStep('hosting')}
                        disabled={!apiKey || !apiSecret}
                        className="px-6 py-3 bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-brand-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
                      >
                        Next Step: Configure Vercel <Server size={18} />
                      </button>
                    </div>
                 </div>
               )}

               {deployStep === 'hosting' && (
                 <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="flex items-center justify-between p-4 bg-black text-white rounded-lg border border-gray-800">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                             <svg width="20" height="20" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="black"/></svg>
                          </div>
                          <div>
                            <div className="font-bold">Deploy to Vercel</div>
                            <div className="text-xs text-gray-400">Recommended for React + Node apps</div>
                          </div>
                       </div>
                       <button onClick={() => window.open('https://vercel.com/new', '_blank')} className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 transition-colors">
                         Open Vercel Dashboard
                       </button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Environment Variables</h4>
                      <p className="text-sm text-gray-500">Copy these values into your Vercel Project Settings under "Environment Variables".</p>
                      
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-emerald-400 space-y-2 relative group">
                        <button 
                          onClick={() => copyToClipboard(`SHOPIFY_API_KEY=${apiKey}\nSHOPIFY_API_SECRET=${apiSecret}\nSCOPES=write_products,read_orders`)}
                          className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 hover:text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy size={14} />
                        </button>
                        <div>SHOPIFY_API_KEY={apiKey || '...'}</div>
                        <div>SHOPIFY_API_SECRET={apiSecret ? '••••••••' : '...'}</div>
                        <div>SCOPES=write_products,read_orders</div>
                        <div>HOST=https://your-vercel-app.vercel.app</div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => setDeployStep('keys')}
                        className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setDeployStep('cli')}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
                      >
                        Advanced: CLI Automation <Terminal size={18} />
                      </button>
                    </div>
                 </div>
               )}

               {deployStep === 'cli' && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
                       <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                          <div className="flex gap-1.5">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs font-mono text-slate-400 ml-2">shopify-cli — node</span>
                       </div>
                       
                       <div className="p-4 font-mono text-xs h-64 overflow-y-auto bg-black text-green-400 space-y-1">
                          {cliLogs.length === 0 && (
                            <div className="text-slate-500 italic">Waiting for command input...</div>
                          )}
                          {cliLogs.map((log, i) => (
                            <div key={i} className={`${log.startsWith('$') ? 'text-white font-bold mt-2' : 'opacity-90'}`}>
                               {log}
                            </div>
                          ))}
                          <div ref={logsEndRef} />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                            Shopify CLI Token <span className="text-xs font-normal text-gray-400 lowercase">(Securely handled)</span>
                         </label>
                         <div className="relative">
                            <input 
                              value={cliToken}
                              onChange={(e) => setCliToken(e.target.value)}
                              type="password" 
                              placeholder="atkn_..." 
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                            />
                            <Terminal className="absolute left-3 top-3.5 text-gray-400" size={16} />
                         </div>
                         <p className="text-xs text-gray-400">
                           Paste your token (starts with atkn_) to automate the build & deploy process.
                         </p>
                       </div>

                       <div className="flex justify-between items-center pt-4">
                          <button 
                            onClick={() => setDeployStep('hosting')}
                            className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                          >
                            Back
                          </button>
                          <button 
                            onClick={simulateDeployment}
                            disabled={isDeploying || !cliToken}
                            className="px-6 py-3 bg-gray-900 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-black text-emerald-400 font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg"
                          >
                             {isDeploying ? (
                               <>Processing...</>
                             ) : (
                               <>Run Auto-Deploy <Play size={16} fill="currentColor" /></>
                             )}
                          </button>
                       </div>
                    </div>
                  </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Top Bar (App Shell Header) */}
      <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shrink-0 shadow-md z-20">
        <div className="flex items-center gap-4">
          {onExit && (
            <button 
              onClick={onExit}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium border-r border-gray-700 pr-4"
            >
              <ArrowLeft size={16} />
              Back to Site
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded text-white">
              <FileText size={20} />
            </div>
            <h2 className="font-bold tracking-tight hidden sm:block">Order Printer Pro & Returns</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1 bg-gray-800 p-1 rounded-lg">
            {[
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
                { id: 'returns', label: 'Returns', icon: RefreshCw },
                { id: 'automation', label: 'Automation', icon: Zap },
                { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
                <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                >
                <tab.icon size={14} /> {tab.label}
                </button>
            ))}
            </div>

            <button 
              onClick={() => setShowConnectModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-md text-xs font-bold uppercase tracking-wide text-emerald-400 transition-all"
            >
              <Code size={14} /> Connect Store
            </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {notification}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- TAB: AUTOMATION --- */}
        {activeTab === 'automation' && (
          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <Zap className="text-amber-500" /> Automation Rules
               </h3>
               <p className="text-gray-500 mb-8">Configure how the app behaves when new orders are created in your Shopify store.</p>

               <div className="space-y-6">
                 <div className="flex items-start gap-4 p-4 border rounded-lg hover:border-brand-500 transition-colors cursor-pointer" onClick={() => setAutoEmail(!autoEmail)}>
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors ${autoEmail ? 'bg-brand-600 border-brand-600' : 'border-gray-300'}`}>
                      {autoEmail && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Auto-Send Invoice Email</h4>
                      <p className="text-sm text-gray-500">Automatically email a PDF invoice to the customer when an order is marked as Paid.</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 p-4 border rounded-lg hover:border-brand-500 transition-colors cursor-pointer" onClick={() => setAutoPrint(!autoPrint)}>
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors ${autoPrint ? 'bg-brand-600 border-brand-600' : 'border-gray-300'}`}>
                      {autoPrint && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Auto-Print Packing Slips</h4>
                      <p className="text-sm text-gray-500">Send packing slips directly to your warehouse printer when an order is created.</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <Palette className="text-purple-500" /> Branding Settings
               </h3>
               
               <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-50 transition-colors">
                           <Upload className="text-gray-400 group-hover:text-brand-500" />
                        </div>
                        <span className="text-sm text-brand-600 font-medium">Click to Upload Logo</span>
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
                     <div className="flex gap-3">
                        {['#4f46e5', '#059669', '#dc2626', '#2563eb', '#d97706'].map(c => (
                          <button 
                            key={c}
                            onClick={() => setBrandColor(c)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform ${brandColor === c ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
                    <textarea className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none" rows={3} defaultValue="Thank you for your business! If you have any questions, please contact support."></textarea>
                  </div>
                  
                  <button onClick={() => handleAction('Settings saved')} className="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                    Save Changes
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* --- TAB: RETURNS --- */}
        {activeTab === 'returns' && (
           <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
             <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-end mb-6">
                   <div>
                     <h3 className="text-2xl font-bold text-gray-900">Return Requests</h3>
                     <p className="text-gray-500">Manage and approve customer returns.</p>
                   </div>
                   <div className="flex gap-2">
                     <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold shadow-sm">
                       Pending: <span className="text-amber-600">1</span>
                     </div>
                   </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Reason</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_RETURNS.map((ret) => (
                        <tr key={ret.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-600">#{ret.orderNumber}</td>
                          <td className="px-6 py-4 font-medium">{ret.customer}</td>
                          <td className="px-6 py-4 text-gray-600">{ret.reason}</td>
                          <td className="px-6 py-4 text-gray-500">{ret.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${ret.status === 'approved' ? 'bg-green-100 text-green-700' : ret.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                              {ret.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             {ret.status === 'pending' && (
                               <div className="flex justify-end gap-2">
                                  <button onClick={() => handleAction('Return Approved')} className="p-2 text-green-600 hover:bg-green-50 rounded border border-transparent hover:border-green-200 transition-all"><CheckCircle2 size={18}/></button>
                                  <button onClick={() => handleAction('Return Rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-all"><XCircle size={18}/></button>
                               </div>
                             )}
                             {ret.status !== 'pending' && <span className="text-gray-400">-</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
           </div>
        )}

        {/* --- TAB: ORDERS (DEFAULT) --- */}
        {activeTab === 'orders' && (
          <>
            {/* Left Sidebar: Order List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden md:flex">
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <ShoppingBag size={16} />
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {MOCK_ORDERS.map(order => (
                  <div 
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 ${selectedOrderId === order.id ? 'bg-brand-50/50 border-l-4 border-l-brand-600' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-900">Order #{order.orderNumber}</span>
                      <span className="text-xs text-gray-500">{order.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{order.customer.name}</div>
                    <div className="flex gap-2">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.status === 'paid' ? 'bg-gray-200 text-gray-700' : 'bg-yellow-100 text-yellow-700'}`}>
                         {order.status}
                       </span>
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.fulfillmentStatus === 'fulfilled' ? 'bg-green-100 text-green-700' : order.fulfillmentStatus === 'unfulfilled' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                         {order.fulfillmentStatus}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Preview & Actions */}
            <div className="flex-1 flex flex-col bg-gray-100 h-full overflow-hidden">
              
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 p-4 flex flex-col xl:flex-row justify-between items-center gap-4 shadow-sm z-10">
                 {/* Document Selector */}
                 <div className="flex bg-gray-100 p-1 rounded-lg shrink-0 overflow-x-auto max-w-full">
                    {[
                      { id: 'invoice', label: 'Invoice', icon: FileText },
                      { id: 'packing_slip', label: 'Packing Slip', icon: ShoppingBag },
                      { id: 'shipping_label', label: 'Shipping Label', icon: Truck },
                      { id: 'return_form', label: 'Return Form', icon: RefreshCw }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setDocType(type.id as DocumentType)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${docType === type.id ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <type.icon size={16} /> {type.label}
                      </button>
                    ))}
                 </div>

                 {/* Actions */}
                 <div className="flex gap-2 shrink-0">
                   <button onClick={() => handleAction('Printed')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      <Printer size={16} /> Print
                   </button>
                   <button onClick={() => handleAction('Email Sent')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      <Mail size={16} /> Email
                   </button>
                   <button onClick={() => handleAction('Downloaded')} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                      <Download size={16} /> Download PDF
                   </button>
                 </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-100/50">
                
                {/* --- DOCUMENT: SHIPPING LABEL --- */}
                {docType === 'shipping_label' && (
                  <div className="w-full max-w-[400px] h-[600px] bg-white shadow-xl rounded-sm p-6 border border-gray-300 flex flex-col relative animate-in zoom-in-95 duration-300">
                    <div className="border-b-4 border-black pb-4 mb-4">
                       <div className="text-5xl font-black uppercase">F</div>
                       <div className="text-xs font-bold">US POSTAGE PAID</div>
                    </div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-xs uppercase">
                        <div className="font-bold">FROM:</div>
                        <div>DollarAppDev Store</div>
                        <div>123 Commerce Blvd</div>
                        <div>Silicon Valley, CA 94025</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl">1.5 LBS</div>
                        <div className="text-xs">Zone 4</div>
                      </div>
                    </div>
                    
                    <div className="mb-8 pl-8">
                       <div className="text-sm font-bold uppercase text-gray-500">SHIP TO:</div>
                       <div className="text-xl font-mono uppercase">
                         {selectedOrder.customer.name}<br/>
                         {selectedOrder.customer.address}<br/>
                         {selectedOrder.customer.city}, {selectedOrder.customer.country}
                       </div>
                    </div>

                    <div className="mt-auto border-t-4 border-black pt-4 text-center">
                       <div className="font-bold text-sm mb-2 tracking-[0.5em]">{selectedOrder.orderNumber}</div>
                       {/* Fake Barcode */}
                       <div className="h-24 bg-black w-full flex items-center justify-center text-white overflow-hidden relative">
                          <div className="w-full h-full flex justify-between px-2">
                             {Array.from({ length: 40 }).map((_, i) => (
                               <div key={i} className="bg-white h-full" style={{ width: Math.random() * 6 + 1 + 'px'}}></div>
                             ))}
                          </div>
                       </div>
                       <div className="text-xs font-mono mt-1 tracking-widest">9400 1000 0000 0000 0000 00</div>
                    </div>
                  </div>
                )}

                {/* --- DOCUMENT: INVOICE / PACKING SLIP / RETURN --- */}
                {docType !== 'shipping_label' && (
                  <div className="w-full max-w-[600px] min-h-[800px] bg-white shadow-xl rounded-sm p-10 text-sm text-gray-800 relative border border-gray-200 animate-in zoom-in-95 duration-300">
                    {/* Watermark for Return Form */}
                    {docType === 'return_form' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 -rotate-45 font-black text-6xl pointer-events-none select-none whitespace-nowrap">
                        RETURN AUTHORIZATION
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-1/2">
                        <div className="font-bold text-2xl mb-1 uppercase tracking-tight" style={{ color: brandColor }}>
                          {docType === 'packing_slip' ? 'Packing Slip' : docType === 'return_form' ? 'Return Form' : 'Invoice'}
                        </div>
                        <div className="text-gray-500">#{selectedOrder.orderNumber}</div>
                      </div>
                      <div className="w-1/2 text-right">
                        <div className="font-bold text-gray-900 text-lg">DollarAppDev Store</div>
                        <div className="text-gray-500 text-xs">123 Commerce Blvd, CA, USA</div>
                        <div className="text-gray-500 text-xs">contact@store.com</div>
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="flex gap-8 mb-10 bg-gray-50 p-4 rounded-md border border-gray-100">
                      <div className="w-1/2">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Bill To</div>
                        <div className="font-semibold">{selectedOrder.customer.name}</div>
                        <div className="text-gray-600">{selectedOrder.customer.email}</div>
                      </div>
                      <div className="w-1/2">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Ship To</div>
                        <div className="font-semibold">{selectedOrder.customer.name}</div>
                        <div className="text-gray-600">{selectedOrder.customer.address}</div>
                        <div className="text-gray-600">{selectedOrder.customer.city}, {selectedOrder.customer.country}</div>
                      </div>
                    </div>

                    {/* Table */}
                    <table className="w-full mb-8">
                      <thead>
                        <tr className="border-b-2 border-gray-800">
                          <th className="text-left py-2 uppercase text-xs font-bold">Item</th>
                          <th className="text-left py-2 uppercase text-xs font-bold">SKU</th>
                          <th className="text-right py-2 uppercase text-xs font-bold">Qty</th>
                          {docType === 'invoice' && <th className="text-right py-2 uppercase text-xs font-bold">Price</th>}
                          {docType === 'invoice' && <th className="text-right py-2 uppercase text-xs font-bold">Total</th>}
                          {docType === 'return_form' && <th className="text-right py-2 uppercase text-xs font-bold">Return Reason</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-4 font-medium">{item.desc}</td>
                            <td className="py-4 text-gray-500 font-mono text-xs">{item.sku}</td>
                            <td className="py-4 text-right">{item.qty}</td>
                            {docType === 'invoice' && <td className="py-4 text-right text-gray-600">${item.price.toFixed(2)}</td>}
                            {docType === 'invoice' && <td className="py-4 text-right font-bold">${(item.price * item.qty).toFixed(2)}</td>}
                            {docType === 'return_form' && (
                              <td className="py-4 text-right">
                                <div className="inline-block w-24 border-b border-gray-300 h-4"></div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Footer / Totals */}
                    {docType === 'invoice' && (
                      <div className="flex justify-end">
                        <div className="w-1/2 border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Tax (19%)</span>
                            <span>${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-xl text-gray-900 pt-2">
                            <span>Total</span>
                            <span style={{ color: brandColor }}>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {docType === 'return_form' && (
                       <div className="mt-12 border border-dashed border-gray-300 p-4 bg-gray-50 rounded text-center text-xs text-gray-500">
                          Please ensure items are unworn and in original packaging. Place this form inside the package.
                       </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceAppDemo;