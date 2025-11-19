import React from 'react';
import { Code2, Rocket, ShieldCheck, Clock, Server, CreditCard } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Full Stack Development",
    description: "We handle everything: React frontend, Node.js backend, database, and Shopify API integration.",
    icon: Code2
  },
  {
    title: "App Store Approval",
    description: "We guide your app through Shopify's rigorous review process to ensure it gets published.",
    icon: Rocket
  },
  {
    title: "Secure & Scalable",
    description: "Built on enterprise-grade infrastructure capable of handling thousands of requests per second.",
    icon: ShieldCheck
  },
  {
    title: "Rapid Prototyping",
    description: "Get your MVP up and running in days, not months. Validate your idea fast.",
    icon: Clock
  },
  {
    title: "Server Maintenance",
    description: "Don't worry about uptime. We manage the servers, updates, and security patches.",
    icon: Server
  },
  {
    title: "$1 Flat Rate",
    description: "No equity taken. No huge upfront costs. Just a simple subscription to keep building.",
    icon: CreditCard
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything You Need</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We provide a complete technical co-founder experience without the equity split.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-brand-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-brand-900/50 flex items-center justify-center text-brand-400 mb-6 border border-brand-500/20">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;