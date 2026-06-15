/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronDown, 
  HelpCircle, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  CloudRain, 
  Waves, 
  Orbit, 
  ArrowRight, 
  Clock, 
  Heart, 
  Award, 
  Smartphone, 
  Feather, 
  Layers, 
  Volume2, 
  AlertCircle,
  Copy,
  Info
} from 'lucide-react';
import InteractiveSandbox from './components/InteractiveSandbox';
import { MOO_COLORS, MOO_BUNDLES, MOO_SPECS, MOO_FAQS, MOO_TESTIMONIALS } from './data';
import { BundleOption, FAQItem, LampColor } from './types';

// Import the beautifully generated product catalog photograph directly
// @ts-expect-error - Vite handles asset imports
import heroImage from './assets/images/moo_lamp_hero_1781522434519.jpg';

export default function App() {
  // Navigation active tab tracking (for visual indicators only)
  const [activeNav, setActiveNav] = useState('home');

  // Pre-order Ticker
  const [preorderCount, setPreorderCount] = useState(1482);
  useEffect(() => {
    const interval = setInterval(() => {
      setPreorderCount(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Time remaining countdown (Pre-order dynamic clock)
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 14, minutes: 35, seconds: 12 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // FAQ Expanded index state
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  // Interactive Live Preorder Card Selection States
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(MOO_BUNDLES[1]); // Duo is popular
  const [chosenColors, setChosenColors] = useState<string[]>(['sage-green', 'terracotta']); // Multi colors for duo
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [copiedCode, setCopiedCode] = useState(false);

  // Function to add/remove a lamp color to the pre-ordered pack
  const handleColorToggle = (colorId: string) => {
    const maxAllowed = selectedBundle.quantity;
    
    if (maxAllowed === 1) {
      setChosenColors([colorId]);
    } else {
      // Toggle or cycle colors for multi pack
      if (chosenColors.length < maxAllowed) {
        setChosenColors([...chosenColors, colorId]);
      } else {
        // Remove first and append new
        setChosenColors([...chosenColors.slice(1), colorId]);
      }
    }
  };

  // Change bundle from pricing list
  const handleBundleSelect = (bundle: BundleOption) => {
    setSelectedBundle(bundle);
    // Reset default color arrays based on pack size
    if (bundle.quantity === 1) {
      setChosenColors(['terracotta']);
    } else if (bundle.quantity === 2) {
      setChosenColors(['sage-green', 'terracotta']);
    } else {
      setChosenColors(['sage-green', 'terracotta', 'sand-beige']);
    }
    
    // Smooth scroll to checkout block
    document.getElementById('checkout-zone')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitPreorder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    setCheckoutStep('success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MOODEEP2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="moo-app" className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans antialiased selection:bg-stone-200">
      
      {/* ⚠️ Top Alert Banner */}
      <div className="bg-[#1C1A19] text-stone-300 py-2.5 px-4 text-center text-xs tracking-[0.12em] font-sans border-b border-white/5 flex items-center justify-center gap-4 flex-wrap">
        <span>【全球首創早鳥特惠】前 1,500 組贈專用高規天然植物精油 ✦ 目前已搶購 <strong>{preorderCount}</strong> 件</span>
        <div className="hidden md:flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[10px]">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>倒數計時：<strong>{timeLeft.days}</strong> 天 <strong>{timeLeft.hours}</strong> 小時 <strong>{timeLeft.minutes}</strong> 分 <strong>{timeLeft.seconds}</strong> 秒</span>
        </div>
      </div>

      {/* ✦ Header Navigation (Editorial Minimalist) */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-[0.35em] text-stone-900 font-serif">暮 MOO</span>
            <span className="h-4 w-[1px] bg-stone-300" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-mono hidden sm:inline">Sensory Oasis</span>
          </a>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { id: 'concept', label: '設計起源', target: '#concept' },
              { id: 'painpoints', label: '現代痛點', target: '#painpoints' },
              { id: 'features', label: '核心美學', target: '#features' },
              { id: 'sandbox', label: '美學體驗艙', target: '#sandbox' },
              { id: 'testimonials', label: '睡眠共鳴', target: '#testimonials' },
              { id: 'specs', label: '工藝材質', target: '#specs' },
              { id: 'faq', label: '舒心解答', target: '#faq' },
            ].map(item => (
              <a 
                key={item.id}
                href={item.target}
                onClick={() => setActiveNav(item.id)}
                className={`text-xs tracking-[0.16em] uppercase transition-colors ${
                  activeNav === item.id 
                    ? 'text-stone-950 font-semibold' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="#checkout-zone"
              className="bg-[#2B2927] hover:bg-stone-950 text-stone-50 px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.15em] transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>立即預購 63 折</span>
            </a>
          </div>

        </div>
      </nav>

      {/* ✦ Hero Section: "THE ELEGANCE OF SLUMBER" */}
      <header id="concept" className="section py-16 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 text-stone-500">
              <span className="w-8 h-[1px] bg-stone-400" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-sans">暮光睡眠美學 ｜ WABI-SABI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-serif text-stone-900 leading-[1.25] tracking-wide font-normal">
              THE ELEGANCE <br />
              <span className="italic block mt-1 text-stone-600">OF COZY SLUMBER.</span>
              <span className="text-3xl sm:text-4xl font-sans mt-3 block font-medium text-stone-800">
                暮 Moo ｜ 溫潤感官療癒燈
              </span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              告別藍光過載與床頭櫃的雜亂無章。我們將「琥珀低色溫暮光」、「極微溫擴香水霧」與「自然舒眠白噪音」融為一體，以天然陶封粗砂質感，為大腦搭建一方退潮的溫柔岸堤。
            </p>

            {/* Quick pre-order promotion badge */}
            <div className="p-5 rounded-2xl bg-[#EFEAE2] border border-stone-200/50 flex items-center justify-between gap-4 max-w-lg">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">特別早鳥限時促銷</p>
                <p className="text-sm font-semibold text-stone-800">免費附贈首發訂製精油（價值 NT$680）</p>
              </div>
              <div className="text-right">
                <span className="text-stone-400 text-xs line-through block">NT$4,500</span>
                <span className="text-[#C87A65] text-base font-mono font-bold">NT$2,980 起</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 items-center gap-y-3 pt-2">
              <a 
                href="#checkout-zone"
                className="bg-[#2B2927] hover:bg-stone-950 text-stone-550 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] transition-all hover:translate-x-1 flex items-center gap-3 shadow-md"
              >
                <span>立即選購預購方案</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#sandbox"
                className="border border-stone-300 hover:border-stone-900 text-stone-800 text-xs px-6 py-4 rounded-full font-medium tracking-[0.15em] transition-all"
              >
                親耳體驗 ASMR 白噪音
              </a>
            </div>

            {/* Small trust factor lines */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">1800K</p>
                <p className="text-[10px] text-stone-500 tracking-wider">助眠無藍光色溫</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">3.0 MHz</p>
                <p className="text-[10px] text-stone-500 tracking-wider">超音波極細香氛</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">15W Qi2</p>
                <p className="text-[10px] text-stone-500 tracking-wider">極速磁吸無線快充</p>
              </div>
            </div>

          </div>

          {/* Right Product Image (Perfect Catalog presentation matching Ref 2) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-stone-200 ring-8 ring-stone-100">
              <img 
                src={heroImage} 
                alt="暮 Moo 三色極簡美學美夜燈" 
                className="w-full h-auto object-cover transform hover:scale-[1.03] transition-transform duration-[2000ms]"
              />
              {/* Image signature decoration */}
              <div className="absolute bottom-6 right-6 bg-stone-950/80 backdrop-blur-md text-stone-100 px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase">
                MODEL: MOO-DUSK-01
              </div>
            </div>

            {/* Aesthetic overlapping circle behind the image like editorial page design */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#EFECE7]/60 -z-10 blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[#EFE9DF]/80 -z-10 blur-2xl" />
          </div>

        </div>
      </header>

      {/* ✦ Slide Section: Why We Need (痛點情境 - Asymmetrical Pills mimicking Image 1) */}
      <section id="painpoints" className="py-24 bg-[#FAF8F5] border-t border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 block mb-3 font-mono">Sensory Pain Points</span>
            <h2 className="text-3xl font-serif font-normal text-stone-900 sm:text-4xl tracking-tight leading-snug">
              你也是「床頭焦慮」的受害者嗎？
            </h2>
            <div className="w-12 h-[1px] bg-stone-400 mx-auto mt-4" />
          </div>

          {/* Asymmetrical elegant Column Cards (Inspired directly by the pill card containers in Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pill Card 1 */}
            <div className="bg-[#EFEAE2] rounded-[50px] p-8 pb-12 pt-16 text-center flex flex-col items-center justify-between min-h-[480px] shadow-sm hover:shadow-md transition-all duration-500 group border border-stone-200/40">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Flame className="w-5 h-5 text-[#C87A65]" />
              </div>
              <div className="space-y-4 my-8">
                <p className="text-[11px] font-mono tracking-widest text-[#C87A65] font-semibold uppercase">01 / 心神亢奮</p>
                <h3 className="text-lg font-serif text-stone-800 font-bold">深夜大腦，不停運轉開機</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  剛開完會、盯著程式碼到凌晨，大腦處於高度興奮狀態，儘管身體極度疲憊，躺下卻在無意義的思維泥淖中反覆掙扎，難以入眠。
                </p>
              </div>
              <div className="border-t border-stone-300 w-2/3 pt-4 text-[10px] text-stone-500 uppercase tracking-widest">
                大腦神經處於 beta 警覺波
              </div>
            </div>

            {/* Pill Card 2 */}
            <div className="bg-[#EFEAE2] rounded-[50px] p-8 pb-12 pt-16 text-center flex flex-col items-center justify-between min-h-[480px] shadow-sm hover:shadow-md transition-all duration-500 group border border-stone-200/40 transform md:-translate-y-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-4 my-8">
                <p className="text-[11px] font-mono tracking-widest text-amber-700 font-semibold uppercase">02 / 光線刺眼</p>
                <h3 className="text-lg font-serif text-stone-800 font-bold">手機藍光，干擾褪黑激素</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  市面常規小夜燈色溫過高，且由側面發光極其眩光刺眼。這會欺騙大腦「現在還是白天」，阻礙褪黑素自然分泌，縮短深度睡眠。
                </p>
              </div>
              <div className="border-t border-stone-300 w-2/3 pt-4 text-[10px] text-stone-500 uppercase tracking-widest">
                不當光源干擾晝夜節律
              </div>
            </div>

            {/* Pill Card 3 */}
            <div className="bg-[#EFEAE2] rounded-[50px] p-8 pb-12 pt-16 text-center flex flex-col items-center justify-between min-h-[480px] shadow-sm hover:shadow-md transition-all duration-500 group border border-stone-200/40">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Layers className="w-5 h-5 text-stone-600" />
              </div>
              <div className="space-y-4 my-8">
                <p className="text-[11px] font-mono tracking-widest text-stone-700 font-semibold uppercase">03 / 桌面雜亂</p>
                <h3 className="text-lg font-serif text-stone-800 font-bold">空間繁盛，加重心理負荷</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  床頭擺滿手機線、藍牙喇叭、起霧的水氧機、小書燈。視覺雜音容易引發大腦雜念。極簡主義認為，乾淨的床頭有助於大腦淨空。
                </p>
              </div>
              <div className="border-t border-stone-300 w-2/3 pt-4 text-[10px] text-stone-500 uppercase tracking-widest">
                物件過載引發隱形壓力
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ✦ Philosophy & Core features (核心功能亮點 - Mimicking clean horizontal tables / vertical dividers) */}
      <section id="features" className="py-24 bg-white text-stone-800 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-stone-400 block mb-2 font-mono">CRAFT & MINIMALISM</span>
              <h2 className="text-3xl font-serif text-stone-900 leading-tight">
                暮 Moo <br />
                五合一減法美學
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-stone-600 text-sm leading-relaxed">
                擺脫傳統電器的冰冷塑料與繁複。這是一盞將生活器具極致融合的生活藝術品——
                在簡約、自然的天然黏土陶質感中，巧妙納入五項感官舒緩科技，用減法帶給大腦真正和諧的舒眠氛圍。
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-stone-200 my-8" />

          {/* Classic 3 Column Highlight inspired by bottom part of Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
            
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-stone-400 tracking-widest mb-1">01 / MINIMAL SHADOW</div>
              <h3 className="text-lg font-serif tracking-wide text-stone-900 font-bold">向下無眩光，1800K 夕陽微光</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                發光面設計在頂部，柔和光線經由底座盆漫反射而出。完全阻斷直刺裸目，1800K 的特殊琥珀光譜實證幾乎 0 藍光，能加深心率平靜。
              </p>
              <div className="w-full h-40 bg-[#FAF8F5] rounded-2xl flex items-center justify-center p-4">
                <span className="text-xs text-stone-400 font-mono tracking-widest uppercase">1800K 夕陽眼晴保護阻燃</span>
              </div>
            </div>

            <div className="space-y-4 md:border-l md:border-stone-200 md:pl-12">
              <div className="text-xs font-mono font-bold text-stone-400 tracking-widest mb-1">02 / NATURAL RESONANCE</div>
              <h3 className="text-lg font-serif tracking-wide text-stone-900 font-bold">釹鐵硼 5W 雙被動重低音白噪音</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                全頻單元搭載於砂陶腔體內部，形成細微獨特的天然混響。內建精心優化的 4 種無損白噪音，不浮躁刺耳，猶如風穿溪林般安祥。
              </p>
              <div className="w-full h-40 bg-[#FAF8F5] rounded-2xl flex items-center justify-center p-4">
                <span className="text-xs text-stone-400 font-mono tracking-widest uppercase">4Ω 5W 腔體低音共鳴</span>
              </div>
            </div>

            <div className="space-y-4 md:border-l md:border-stone-200 md:pl-12">
              <div className="text-xs font-mono font-bold text-stone-400 tracking-widest mb-1">03 / ULTRASONIC DIFFUSER</div>
              <h3 className="text-lg font-serif tracking-wide text-stone-900 font-bold">3.0MHz 超音波高溫無感微擴香</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                專利壓電換能器能以極快高振，將精油水分子分裂成 1-3 微米超微乾霧，絕不打濕被子，缺水自動關閉，帶來漫漫整夜的水潤與芳馨。
              </p>
              <div className="w-full h-40 bg-[#FAF8F5] rounded-2xl flex items-center justify-center p-4">
                <span className="text-xs text-stone-400 font-mono tracking-widest uppercase">85ml 貯水 ｜ 6小時持續調香</span>
              </div>
            </div>

          </div>

          <div className="h-[1px] bg-stone-200 my-12" />

          {/* Secondary features group - Qi2 & Interaction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#C87A65]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase font-sans">無微不至的交互與收納</span>
              </div>
              <h3 className="text-2xl font-serif text-stone-900 font-normal">
                Qi2 磁吸快充底座 ｜ 微米手勢感應
              </h3>
              <div className="space-y-4 text-stone-600 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#EFEAE2] text-stone-800 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong>Qi2 15W 磁吸快充：</strong>
                    <span>陶座表層隱含廣域感應圈。睡前隨手一放即充，無須摸黑尋找充電孔。</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#EFEAE2] text-stone-800 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong>雷射微米手勢感應：</strong>
                    <span>半夜想起身？手在頂端揮一揮即開啟微光，停留超過 0.8s 鎖定調光，防誤觸演算法讓人安心。</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#EFEAE2] text-stone-800 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong>100% 天然粗陶燒製：</strong>
                    <span>與景德鎮古法砂陶大師合作，手感溫潤、不易沾灰，更是一件靜宜安寧的工藝雕塑。</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-[30px] border border-stone-200/60 text-stone-700 space-y-4">
              <h4 className="font-serif font-bold text-stone-800">匠心細節，極致呈現：</h4>
              <ul className="space-y-3.5 text-xs">
                <li className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-400">電源線規格</span>
                  <span className="font-serif text-stone-900">暮色專屬細紋 Woven 編織 Type-C線</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-400">觸控手勢</span>
                  <span className="font-serif text-stone-900">指尖邊緣微觸控滑條</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-400">安全雷達</span>
                  <span className="font-serif text-stone-900">一體成型微波缺水、過熱自動斷雷達</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-400">底部防滑</span>
                  <span className="font-serif text-stone-900">阻尼橡膠防震底墊</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ✦ Interactive Sandbox (美學體驗艙 Component) */}
      <InteractiveSandbox />

      {/* ✦ Testimonials Section (客戶評價 - Editorial Block format) */}
      <section id="testimonials" className="py-24 bg-white border-t border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 block mb-3 font-mono">Sensory Testimonials</span>
            <h2 className="text-3xl font-serif font-normal text-stone-900 sm:text-4xl">
              聽聽第一批「暮友」的深夜感言
            </h2>
            <div className="w-12 h-[1px] bg-stone-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOO_TESTIMONIALS.map(t => (
              <div 
                key={t.id}
                className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200/50 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
              >
                {/* Visual decoration top quote */}
                <span className="absolute top-6 right-8 text-6xl text-stone-250 font-serif select-none pointer-events-none group-hover:text-stone-300 transition-colors">“</span>
                
                <div className="space-y-4 relative z-10">
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-amber-500 text-sm">★</span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans italic">
                    {t.content}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-center gap-4">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover filter saturate-50"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                    <p className="text-[10px] text-stone-500">{t.role}</p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {t.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] bg-[#EFEAE2] text-stone-600 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ✦ Product Specifications Section (產品規格) */}
      <section id="specs" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 block mb-3 font-mono">SPECIFICATION DETAIL</span>
            <h2 className="text-3xl font-serif text-stone-900 font-normal">暮 Moo 產品規格表</h2>
            <div className="w-12 h-[1px] bg-stone-400 mx-auto mt-4" />
          </div>

          <div className="bg-white rounded-[32px] border border-stone-200/70 overflow-hidden shadow-sm">
            <div className="divide-y divide-stone-100">
              {MOO_SPECS.map((spec, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 transition-colors hover:bg-stone-50/50 gap-2 sm:gap-6">
                  <div className="text-xs font-mono font-bold text-[#C87A65] tracking-widest uppercase sm:pt-0.5">
                    {spec.label}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 sm:col-span-2 leading-relaxed">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental commitment badge */}
          <div className="mt-8 text-center text-stone-400 text-xs flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-stone-400" />
            <span>暮 Moo 堅持 100% 可折疊再生紙盒包裝，內含全天然植物調配香薰精油。</span>
          </div>

        </div>
      </section>

      {/* ✦ Conversion & Preorder Checkout Zone (轉換區 + Interactive Form) */}
      <section id="checkout-zone" className="py-24 bg-[#EFEAE2] border-t border-b border-stone-200/60 relative overflow-hidden">
        
        {/* Soft background blobs */}
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-white/30 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-white/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C87A65] block mb-3 font-mono font-bold">LIMITED PRE-ORDER</span>
            <h2 className="text-3xl font-serif text-stone-950 sm:text-4xl font-normal leading-tight">
              暮 Moo ｜ 早鳥首發特惠預購
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans">
              *首波限量 1,500 組，預售達標即停止折扣。全方案享 7 天無條件鑑賞期、1 年本地全機安心保固。
            </p>
            <div className="w-12 h-[1px] bg-stone-400 mx-auto mt-4" />
          </div>

          {/* Visual Bundle Option Cards (Direct Design trace from reference Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {MOO_BUNDLES.map(bundle => {
              const isSelected = selectedBundle.id === bundle.id;
              return (
                <div 
                  key={bundle.id}
                  className={`bg-white rounded-[45px] p-8 pb-12 pt-12 flex flex-col justify-between min-h-[560px] transition-all duration-500 relative border ${
                    isSelected 
                      ? 'ring-4 ring-stone-900 border-transparent shadow-xl transform scale-[1.02]' 
                      : 'border-stone-200/50 hover:border-stone-400 hover:shadow-md'
                  }`}
                >
                  {/* Popular tag overlay */}
                  {bundle.popular && (
                    <span className="absolute -top-3 right-8 bg-[#C87A65] text-stone-50 px-3.5 py-1 text-[9px] font-mono tracking-widest rounded-full font-bold shadow-md">
                      熱銷破 72% 推薦
                    </span>
                  )}

                  {/* Detail */}
                  <div className="space-y-6">
                    <span className="inline-block bg-[#EFEAE2] text-[#C87A65] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {bundle.tag}
                    </span>
                    
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        {bundle.title.split('|')[1]}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">
                        {bundle.subtitle}
                      </p>
                    </div>

                    <div className="h-[1px] bg-stone-100" />

                    {/* Features list */}
                    <ul className="space-y-4 text-xs font-sans text-stone-600">
                      {bundle.features.map((feat, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <Check className="w-3.5 h-3.5 text-[#C87A65] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action button */}
                  <div className="mt-8 space-y-6">
                    <div className="pb-4 border-b border-stone-100">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-stone-400 tracking-wider">原價 NT${bundle.marketPrice}</span>
                        <div className="text-right">
                          <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold mr-1.5 font-mono">
                            省 NT${bundle.marketPrice - bundle.price}
                          </span>
                          <span className="text-2xl font-serif font-bold text-stone-900 font-mono">NT${bundle.price}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBundleSelect(bundle)}
                      className={`w-full py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isSelected 
                          ? 'bg-[#2B2927] hover:bg-stone-950 text-stone-50' 
                          : 'bg-[#EFEAE2] hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      {isSelected ? '【已選擇此方案】' : '預購此方案'}
                    </button>
                    
                    <p className="text-[10px] text-center text-stone-400">
                      * 點選即可在下方客製化您的顏色與銘刻字眼 *
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✦ LIVE INTERACTIVE CHECKOUT CUSTOMIZER */}
          <div className="bg-white rounded-[40px] border border-stone-200/50 shadow-xl p-6 sm:p-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-serif font-bold text-stone-900 text-center mb-1">
              客製化專屬單單資訊
            </h3>
            <p className="text-center text-xs text-stone-500 mb-8 font-sans">
              您已選定：<span className="font-bold underline text-stone-800">{selectedBundle.title.split('|')[1]} (NT${selectedBundle.price})</span>
            </p>

            <AnimatePresence mode="wait">
              {checkoutStep === 'form' ? (
                <motion.form 
                  key="checkout-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submitPreorder} 
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* Color picker area depending on bundle quantity */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-400 tracking-widest uppercase mb-2">
                          1. 挑選燈座顏色組合 <span>(Color selection - {selectedBundle.quantity} 台)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 mb-3">
                          請點選以下圈圈，為您的方案挑選 {selectedBundle.quantity} 個機身顏色（可重複或混搭）。
                        </p>
                        
                        {/* Selector Container */}
                        <div className="flex flex-col gap-2.5">
                          {MOO_COLORS.map(color => {
                            // count how many of this color are selected
                            const count = chosenColors.filter(c => c === color.id).length;
                            return (
                              <button
                                type="button"
                                key={color.id}
                                onClick={() => handleColorToggle(color.id)}
                                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                                  count > 0 
                                    ? 'border-stone-800 bg-stone-50/50' 
                                    : 'border-stone-250 hover:border-stone-400'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-6 h-6 rounded-full ${color.bgClass} border border-black/10`} />
                                  <div>
                                    <span className="text-xs font-bold text-stone-800 block">{color.name.split(' ')[0]}</span>
                                    <span className="text-[10px] text-stone-400 font-mono uppercase">{color.englishName}</span>
                                  </div>
                                </div>
                                
                                {count > 0 ? (
                                  <span className="bg-stone-900 text-stone-50 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono">
                                    x{count}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-stone-400 font-sans">點選加入</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Laser engraving option simulated */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-mono font-bold text-stone-400 tracking-widest uppercase">
                            2. 匠人雷射文字銘刻 (加值服務)
                          </label>
                          <span className="text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold uppercase">
                            免費送
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mb-2">
                          將於機柱正後方，採用精密雷雕機烙印。限 15 字英文字母或數字，留下您的睡眠諾言。
                        </p>
                        <input
                          type="text"
                          maxLength={15}
                          value={customEngraving}
                          onChange={(e) => setCustomEngraving(e.target.value)}
                          placeholder="例如: Goodnight, Sleep, Breathe..."
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 font-sans font-medium uppercase"
                        />
                        {customEngraving && (
                          <div className="mt-1.5 p-2 bg-[#FAF8F5] rounded text-[10px] font-mono text-stone-500">
                            雷雕預覽: <strong className="text-[#C87A65]">「 {customEngraving.toUpperCase()} 」</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary list, billing, email, checkout */}
                    <div className="space-y-6 bg-[#FAF8F5] p-6 rounded-3xl border border-stone-200/60">
                      <div>
                        <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-stone-800 mb-3.5">
                          3. 確認訂購單細節
                        </h4>
                        
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-stone-400">方案</span>
                            <span className="text-stone-800 font-bold">{selectedBundle.title.split('|')[1]}</span>
                          </div>
                          
                          <div className="flex justify-between items-start">
                            <span className="text-stone-400">搭色</span>
                            <div className="text-right">
                              {chosenColors.length > 0 ? (
                                chosenColors.map((id, idx) => {
                                  const name = MOO_COLORS.find(c => c.id === id)?.name.split(' ')[0] || id;
                                  return (
                                    <span key={idx} className="inline-block bg-stone-200/60 text-stone-700 text-[10px] px-2 py-0.5 rounded mr-1 mb-1 font-sans">
                                      {name}
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-amber-600 font-semibold text-[10px]">⚠️ 請在左側先選取顏色組合</span>
                              )}
                            </div>
                          </div>

                          {customEngraving && (
                            <div className="flex justify-between">
                              <span className="text-stone-400">雷雕銘文</span>
                              <span className="font-mono text-[10px] text-[#C87A65] font-bold">"{customEngraving.toUpperCase()}"</span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-stone-400">免運加碼</span>
                            <span className="text-stone-600">全台本島宅配免運專案</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-stone-400">隨貨贈物</span>
                            <span className="text-stone-700 italic text-[11px]">{selectedBundle.gift}</span>
                          </div>

                          <div className="h-[1px] bg-stone-200 my-2" />

                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-stone-800">總結付款金額</span>
                            <span className="font-serif font-bold text-lg text-stone-900 font-mono">
                              NT${selectedBundle.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Promo Code area */}
                      <div className="bg-[#EFEAE2] p-3.5 rounded-2xl flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <Info className="w-3.5 h-3.5 text-stone-500" />
                          <span className="text-[10px] text-stone-600 font-sans">專屬優惠碼：<strong>MOODEEP2026</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="bg-white hover:bg-stone-100 text-stone-800 px-2.5 py-1 rounded text-[9px] font-mono border border-stone-300 flex items-center gap-1"
                        >
                          {copiedCode ? <Check className="w-2.5 h-2.5 text-green-600" /> : <Copy className="w-2.5 h-2.5" />}
                          {copiedCode ? '已整理' : '複製'}
                        </button>
                      </div>

                      {/* Email checkout bar */}
                      <div className="space-y-3">
                        <label className="block text-xs font-sans font-medium text-stone-600">
                          收件人通知電子信箱 (將即時發送訂購成功預報與收迄信件)
                        </label>
                        <input
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="例如: example@gmail.com"
                          className="w-full border border-stone-300 rounded-xl px-4 py-3.5 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
                        />
                      </div>

                      {/* Submit checkout CTA */}
                      <button
                        type="submit"
                        disabled={chosenColors.length < selectedBundle.quantity || !userEmail}
                        className={`w-full py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-md ${
                          chosenColors.length < selectedBundle.quantity || !userEmail
                            ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                            : 'bg-[#2B2927] hover:bg-stone-955 text-stone-50 text-white hover:scale-[1.01]'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>確認送出預購訂單 ✦ 享免運</span>
                      </button>

                    </div>

                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="checkout-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-105 border border-green-200 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif text-stone-900 font-bold">預購登記成功！期待與您的暮光相會</h4>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
                      我們已將首發早鳥預售證明書即時寄送至您留存的：<strong>{userEmail}</strong>。
                    </p>
                  </div>

                  {/* Summary output receipts */}
                  <div className="bg-[#FAF8F5] p-6 rounded-2xl max-w-md mx-auto text-left border border-stone-200 text-xs text-stone-700 space-y-3 font-sans">
                    <div className="flex justify-between">
                      <span className="text-stone-400">訂購方案:</span>
                      <strong className="text-stone-800">{selectedBundle.title.split('|')[1]}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">已選搭色:</span>
                      <div className="text-right">
                        {chosenColors.map((id, i) => (
                          <span key={i} className="inline-block bg-stone-200 px-1.5 py-0.5 rounded ml-1 text-[10px]">
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                    {customEngraving && (
                      <div className="flex justify-between">
                        <span className="text-stone-400">背雕銘印:</span>
                        <span className="font-mono text-stone-900 font-bold">"{customEngraving.toUpperCase()}"</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-stone-400">首發贈品:</span>
                      <span className="text-stone-600">{selectedBundle.gift}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-stone-400">免運加碼:</span>
                      <span className="text-green-600 font-medium">免費</span>
                    </div>
                    <div className="h-[1px] bg-stone-200" />
                    <div className="flex justify-between text-sm font-bold pt-1">
                      <span className="text-stone-800">首發預購應繳總額:</span>
                      <span className="font-serif price font-mono text-[#C87A65]">NT${selectedBundle.price}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-400 pt-2">
                    如有任何疑問，可來信到 <strong>service@moo-light.com.tw</strong> 或使用下方聯絡。
                  </p>

                  <button
                    onClick={() => {
                      setCheckoutStep('form');
                      setCustomEngraving('');
                      setUserEmail('');
                    }}
                    className="border border-stone-333 hover:border-stone-900 text-stone-700 text-xs px-5 py-2 rounded-full"
                  >
                    再預訂一組方案
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* ✦ FAQ Accordion (常見問題 - Delicate dropdown styles) */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 block mb-3 font-mono">COMMON ANSWERS</span>
            <h2 className="text-3xl font-serif text-stone-900 font-normal">常見問題解答 ｜ FAQ</h2>
            <div className="w-12 h-[1px] bg-stone-400 mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {MOO_FAQS.map(faq => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-[#FAF8F5] rounded-2xl border border-stone-200/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-stone-50/50"
                  >
                    <span className="text-xs sm:text-sm font-bold text-stone-800 font-sans flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#C87A65] shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-200/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ✦ Footer Section - Matches Footer signature exactly in both images */}
      <footer className="bg-[#FAF8F5] py-20 px-6 sm:px-8 border-t border-stone-250">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          
          <div className="space-y-4">
            <span className="text-base font-bold tracking-[0.3em] text-stone-900 font-serif lowercase">ēmpres ｜ 暮 moo</span>
            <p className="text-xs text-stone-500 font-sans max-w-sm">
              我們的願景是利用天然黏土藝術、暖調特製光頻與全頻白噪音，為每個人重建臥房的深度沉靜與安全感。
            </p>
            <div className="pt-2 text-[10px] text-stone-400 font-mono tracking-widest uppercase">
              Designed in Taipei ｜ Made in Earth
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            
            {/* Visual Social Handle matches second reference banner */}
            <div className="flex gap-4 text-xs font-sans tracking-wide text-stone-500">
              <a href="#" className="hover:text-stone-900">Instagram</a>
              <span className="text-stone-300">|</span>
              <a href="#" className="hover:text-stone-900">Facebook</a>
              <span className="text-stone-300">|</span>
              <a href="#" className="hover:text-stone-900">LinkedIn</a>
              <span className="text-stone-300">|</span>
              <a href="#" className="hover:text-stone-900">@suaempresa</a>
            </div>

            {/* Standard minimal URL trace from Ref 1 */}
            <div className="text-[10px] text-stone-400 font-mono tracking-widest">
              WWW . S I T E . C O M . B R
            </div>

            {/* Simulated QR Code helper text */}
            <div className="text-[9px] text-stone-500 bg-[#EFEAE2] py-1.5 px-3 rounded text-center">
              * 掃描網頁上方 QR Code 首發訂閱，隨時瀏覽最新感官產品目錄。
            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto h-[1px] bg-stone-200/80 my-8" />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest">
          <span>&copy; 2026暮 MOO 生活美学股份有限公司。保留所有權力。</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">隱私權保護政策</a>
            <a href="#" className="hover:underline">服務條款</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
