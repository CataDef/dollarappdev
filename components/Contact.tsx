import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Disrupt the Market?</h2>
          <p className="text-slate-400">Fill out the form below. We'll review your idea and send you a payment link to get started.</p>
        </div>

        <form className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white transition-all"
                placeholder="Elon Musk"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white transition-all"
                placeholder="elon@spacex.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">App Name / Concept</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white transition-all"
              placeholder="e.g. 'Inventory AI Predictor'"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Details</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white transition-all resize-none"
              placeholder="Describe your app functionality in a few sentences..."
            ></textarea>
          </div>

          <button className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;