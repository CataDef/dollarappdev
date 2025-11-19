import { type ElementType } from 'react';

export interface ShopifyAppIdea {
  name: string;
  estimatedPrice: string;
  description: string;
  category: string;
  reasonForSuccess: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ElementType;
}