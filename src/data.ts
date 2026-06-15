/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LampColor, SoundEffect, Testimonial, FAQItem, BundleOption, SpecItem } from './types';

export const MOO_COLORS: LampColor[] = [
  {
    id: 'sage-green',
    name: '山嵐暮綠 (Sage Green)',
    englishName: 'Sage Green',
    hex: '#7A8C75',
    bgClass: 'bg-[#7A8C75]',
    borderClass: 'border-[#7A8C75]',
    lightHex: '#FFEAA7',
    description: '漫入青翠森林的暮色，帶有大自然的泥土芬芳，適合深層放鬆與釋放緊繃。'
  },
  {
    id: 'terracotta',
    name: '落日陶橘 (Terracotta Rose)',
    englishName: 'Terracotta Rose',
    hex: '#C87A65',
    bgClass: 'bg-[#C87A65]',
    borderClass: 'border-[#C87A65]',
    lightHex: '#FFD2A0',
    description: '如同夕陽餘暉灑在燒製陶土上的暖橘，給予最純粹的心理安全感與溫存。'
  },
  {
    id: 'sand-beige',
    name: '微光沙丘 (Sand Dune)',
    englishName: 'Sand Dune',
    hex: '#D7C2A3',
    bgClass: 'bg-[#D7C2A3]',
    borderClass: 'border-[#D7C2A3]',
    lightHex: '#FFF3CD',
    description: '晨霧或日暮中的細砂微光，極簡天然的溫潤奶油色，與任何家居陳設皆能完美融和。'
  }
];

export const MOO_SOUNDS: SoundEffect[] = [
  {
    id: 'rain',
    name: '春雨敲窗 (Forest Rain)',
    iconName: 'CloudRain',
    volume: 60,
    description: '輕柔的白噪音，撫平大腦的碎碎念',
    synthType: 'rain'
  },
  {
    id: 'fire',
    name: '營火柴燒 (Wood Fire)',
    iconName: 'Flame',
    volume: 50,
    description: '劈啪作響的溫潤能量，安全感爆棚',
    synthType: 'fire'
  },
  {
    id: 'waves',
    name: '潮汐漫步 (Ocean Waves)',
    iconName: 'Waves',
    volume: 40,
    description: '規律起伏的浪潮，同步大腦 Delta 波',
    synthType: 'waves'
  },
  {
    id: 'cosmic',
    name: '宇宙粉紅噪 (Deep Space)',
    iconName: 'Orbit',
    volume: 30,
    description: '極致深沉的低頻共振，進入深眠太空中',
    synthType: 'cosmic'
  }
];

export const MOO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    name: '林依璇 (Esther)',
    role: '全職瑜伽與正念導師',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '「暮 Moo」現在是我的課後冥想與睡前儀式不可或缺的一部分。我特別愛用陶土紅這色，微弱低色溫的暮光搭配 4-7-8 呼吸模式，真的能讓我在 5 分鐘內大腦自動歸零。香氛超微霧非常細緻，不會像一般水氧機弄得床頭潮濕。',
    tags: ['4-7-8 呼吸導引', '極致沈浸感', '精油超微霧'],
    date: '2026-05-18'
  },
  {
    id: 'review-2',
    name: '張敬宇 (Ethan)',
    role: '資深軟體工程師、重度失眠者',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '以前熬夜打完程式，在凌晨 3 點大腦仍然像失控火車無法關閉。用了暮 Moo 的「營火柴燒」白噪音與森林綠光，大腦的神經真的被安撫了。最爽的一點是，它將喇叭、香氛、無線快充全整合了，我混亂的床頭櫃直接清空，超有成就感。',
    tags: ['白噪音安睡', '床頭減法減物', '無線快充'],
    date: '2026-06-02'
  },
  {
    id: 'review-3',
    name: '陳雅婷 (Mavis)',
    role: '極簡主義生活家居主理人',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '作為設計細節控，我對家用品極度挑剔。暮 Moo 的磨砂陶土質感與無開關的手勢搖晃控制，展現了極高的工藝水平。燈光是向下投射在陶土底座盆內反射出柔光，就算半夜突然轉身，眼睛也不會被刺眼燈光閃到。強強強推！',
    tags: ['工藝細節控', '手勢感應觸控', '無眩光漫反射'],
    date: '2026-06-11'
  }
];

export const MOO_SPECS: SpecItem[] = [
  { label: '品牌與名稱', value: '暮 Moo | 極簡美學感官療癒燈' },
  { label: '產品外殼材質', value: '高規天然黏土磨砂工藝、耐高熱航空鋁合金支架、環保低阻燃抗 UV 護殼' },
  { label: '燈光光源', value: '專益低藍光眼晴防護 COB LED 盤、1800K - 4000K 無級可調色溫' },
  { label: '香氛擴香系統', value: '3.0MHz 超音波高溫無感霧化系統 (冷霧擴香)、抗腐蝕精油底腔' },
  { label: '擴香精油容量', value: '85ml (滿水位可持續冷霧香氛 6-8 小時，附缺水自動斷電雷達)' },
  { label: '無線充電規格', value: 'Qi2 聯盟認證 15W 磁吸快充相容底座、支援智慧異物偵測 (FOD)' },
  { label: '音效喇叭規格', value: '4Ω 5W 釹鐵硼全頻共振聲頻揚聲器、搭載雙被動輻射重低音板' },
  { label: '互動控制模式', value: '雷射智慧手勢懸停感應、指尖觸控滑條 (調節亮度與色溫)、手機 APP/藍牙' },
  { label: '電源輸入接頭', value: 'Type-C USB 連接埠 (建議使用附帶的 QC3.0/PD 30W 以上適配器輸出)' },
  { label: '產品總重量', value: '約 860g (穩重扎實，底部有阻尼矽膠防滑墊)' },
  { label: '商品尺寸', value: '寬 160 mm x 深 160 mm x 高 285 mm (黃金比例床頭空間設計)' }
];

export const MOO_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '「暮 Moo」的超音波香氛擴香需不需要添加水？',
    answer: '是的，暮 Moo 採用的是先進的超高頻超音波水冷霧化技術（3.0MHz 震盪）。您只需灌入一般常溫自來水或純淨水至內置 85ml 的貯水盆中，並滴入 3-5 滴天然植物精油即可。在缺水時，底部的微波雷達會自動關閉香氛功能以保證安全。',
    category: 'aroma'
  },
  {
    id: 'faq-2',
    question: '那個手勢感應（Gesture Control）好用嗎？半夜會不會誤觸？',
    answer: '手勢感應安裝在燈柱頂部的微米雷達上，只有當手部在其正上方 3-8 公分處「停留超過 0.8 秒」或「左右快速揮動」時才會觸發開關，這經過了上千次防半夜翻身誤觸演算法的優化。您也可以通過燈座邊緣的隱藏式實體輕觸條完全鎖定或調節。',
    category: 'product'
  },
  {
    id: 'faq-3',
    question: '1800K 的色溫與普通小夜燈有什麼不同？',
    answer: '普遍的小夜燈色溫在 2700K 左右，仍含有部分刺激大腦的藍光波段。暮 Moo 所搭載的夕陽暮光源能深探至 1800K 琥珀金暖光，幾乎完全不含干擾褪黑激素（Melatonin）生成的藍光，是科學實證最有利於開啟大腦「預備睡眠訊號」的特定光譜。',
    category: 'product'
  },
  {
    id: 'faq-4',
    question: '無線充電盤可以同時給手機和耳機充電嗎？',
    answer: '暮 Moo 的內部底盤採用的是廣域雙感應線圈，能完美適配 Qi2 / MagSafe 的 15W 無線快速充電。由於底座直徑為 160mm，可擺放一個主流智慧型手機，或者一個無線藍牙耳機盒。我們特別加強了抗金屬干擾與超低熱傳導設計，讓您的手機充電不發燙，不折損手機電池壽命。',
    category: 'charging'
  },
  {
    id: 'faq-5',
    question: '隨機贈送的「暮光特調精油」是什麼成分？孕婦、毛孩家庭能用嗎？',
    answer: '隨機贈送的是我們與法式芳療實驗室精研的「暮光餘暉」天然植物調和精油（10ml）。主要成分包含：高山真正薰衣草、維吉尼亞雪松、以及有機羅馬洋甘菊，無化學定香劑與人工香精。配方非常親和自然，但在有懷孕 3 個月內孕婦，或對精油敏感的貓咪與狗狗的小空間內，建議降低滴數或單純啟動細水霧加濕。',
    category: 'aroma'
  },
  {
    id: 'faq-6',
    question: '預購後的發貨時間？有保固服務嗎？',
    answer: '此專案目前為早鳥超前預購。我們將於七月開始進行首批小規模精工生產，預計於 2026 年 8 月初陸續按訂單順序宅配出貨。所有在官方 Landing Page 預訂的客戶均享有 7 天免費鑑賞期、以及全機 1 年非人為損壞本地安心保固服務。',
    category: 'shipping'
  }
];

export const MOO_BUNDLES: BundleOption[] = [
  {
    id: 'bundle-single',
    title: '方案 A | 獨處晨昏 【單品自療組】',
    subtitle: '個人的床頭靜謐綠洲，開啟香馨好眠',
    tag: '限時早鳥 66 折',
    price: 2980,
    marketPrice: 4500,
    discountRate: 66,
    features: [
      '暮 Moo 極簡美學療癒燈 x 1 (顏色任選)',
      '預購贈：暮光限定防震編織 Type-C 線 x 1',
      '附贈：首發特調「暮光餘暉」精油 10ml x 1 瓶 ($680)',
      '全台免運費 ｜ 享有 1 年全機保固'
    ],
    gift: '贈送特調精油 10ml（薰衣草與雪松木質調）',
    quantity: 1
  },
  {
    id: 'bundle-double',
    title: '方案 B | 雙重暮光 【同棲共享雙入組】',
    subtitle: '分贈摯愛或分擺客廳與臥房，共享舒心時光',
    tag: '揪團超狂 63 折',
    price: 5680,
    marketPrice: 9000,
    discountRate: 63,
    features: [
      '暮 Moo 極簡美學療癒燈 x 2 (顏色任挑選)',
      '預購贈：暮光限定防震編織 Type-C 線 x 2',
      '附贈：首發特調「暮光餘暉」精油 10ml x 2 瓶 ($1,360)',
      '加碼限量贈：精油木質密封玻璃滴管收納盒 x 1',
      '全台免運 ｜ 享雙機獨立 1 年本地保固'
    ],
    gift: '雙倍精油 + 曜黑實木精油滴管收納盒 (價值 $780)',
    quantity: 2,
    popular: true
  },
  {
    id: 'bundle-trio',
    title: '方案 C | 三色暮境 【滿室餘暉三入極致組】',
    subtitle: '大露台、書房與主臥，構築侘寂美感空間',
    tag: '骨折優惠 59 折',
    price: 7980,
    marketPrice: 13500,
    discountRate: 59,
    features: [
      '暮 Moo 極簡美學療癒燈 x 3 (三色各一或任選)',
      '預購贈：暮光限定防震編織 Type-C 線 x 3',
      '附贈：首發特調「暮光餘暉」精油 10ml x 3 瓶 ($2,040)',
      '特別大方贈：北歐實木多孔精油展示陳列架 x 1 ($1,200)',
      '全台免運 ｜ 享全方位 1 年保固與免費專人客服諮詢'
    ],
    gift: '三入全色彩 + 北歐實木多功能精油展示架',
    quantity: 3
  }
];
