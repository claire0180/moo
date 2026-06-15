/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LampColor {
  id: string;
  name: string;
  englishName: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  lightHex: string;
  description: string;
}

export interface SoundEffect {
  id: string;
  name: string;
  iconName: string;
  volume: number;
  description: string;
  synthType: 'rain' | 'fire' | 'waves' | 'cosmic';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  tags: string[];
  date: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'product' | 'aroma' | 'charging' | 'shipping';
}

export interface BundleOption {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  price: number;
  marketPrice: number;
  discountRate: number;
  features: string[];
  gift: string;
  quantity: number;
  popular?: boolean;
}
