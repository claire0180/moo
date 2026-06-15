/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled 
          ? 'bg-[#FAF9F5]/80 backdrop-blur-md border-b border-stone-200/40 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-[#FAF9F5] text-sm font-semibold tracking-wider transition-transform group-hover:rotate-12 duration-300">
              暮
            </div>
            <span className="text-xl font-medium tracking-widest text-stone-900">
              暮 Moo
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('pain-points')} 
              className="text-stone-600 hover:text-stone-950 text-sm font-medium transition-colors cursor-pointer"
            >
              好眠阻礙
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-stone-600 hover:text-stone-950 text-sm font-medium transition-colors cursor-pointer"
            >
              核心功能
            </button>
            <button 
              onClick={() => scrollToSection('sandbox')} 
              className="text-stone-600 hover:text-stone-950 text-sm font-medium transition-colors cursor-pointer"
            >
              美學體驗舱
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-stone-600 hover:text-stone-950 text-sm font-medium transition-colors cursor-pointer"
            >
              實客口碑
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-stone-600 hover:text-stone-950 text-sm font-medium transition-colors cursor-pointer"
            >
              常見問題
            </button>
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium border border-stone-200/80 px-2.5 py-1 rounded bg-stone-50/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              1年本地保固 ｜ 免運
            </div>
            <button 
              onClick={() => scrollToSection('purchase')}
              className="bg-stone-900 border border-stone-900 hover:bg-stone-800 text-[#FAF9F5] text-xs font-medium px-5 py-2 rounded-full transition-all tracking-wider shadow-sm flex items-center gap-1 group cursor-pointer"
            >
              立即預購早鳥 
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-700 hover:text-stone-950 p-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <button 
            onClick={() => scrollToSection('pain-points')} 
            className="block w-full text-left py-2 px-3 text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-medium"
          >
            好眠阻礙
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="block w-full text-left py-2 px-3 text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-medium"
          >
            核心功能
          </button>
          <button 
            onClick={() => scrollToSection('sandbox')} 
            className="block w-full text-left py-2 px-3 text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-medium"
          >
            體驗艙
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="block w-full text-left py-2 px-3 text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-medium"
          >
            實客口碑
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="block w-full text-left py-2 px-3 text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-medium"
          >
            常見問題
          </button>
          <div className="pt-2 border-t border-stone-200">
            <button 
              onClick={() => scrollToSection('purchase')}
              className="w-full bg-stone-900 text-center text-[#FAF9F5] py-2.5 rounded-full text-sm font-medium tracking-wide shadow-sm"
            >
              立即預購早鳥 ｜ 免運
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
