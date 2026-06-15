/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, Sun, Thermometer, Wind, Volume2, CloudRain, Flame, Waves, Orbit, Sparkles, Radio } from 'lucide-react';
import { MOO_COLORS, MOO_SOUNDS } from '../data';
import { LampColor, SoundEffect } from '../types';

export default function InteractiveSandbox() {
  // State: Color Selection
  const [selectedColor, setSelectedColor] = useState<LampColor>(MOO_COLORS[1]); // terracotta is default
  
  // State: Light Config
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(75); // 10% - 100%
  const [colorTemp, setColorTemp] = useState<number>(2000); // 1800K - 4000K
  
  // State: Aroma Mist
  const [isMistOn, setIsMistOn] = useState<boolean>(true);
  
  // State: Audio Synthetic Sound
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(50);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // State: 4-7-8 Breathing Pattern
  const [isBreathingMode, setIsBreathingMode] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathingTimer, setBreathingTimer] = useState<number>(0);

  // Web Audio Sandbox Engine Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const noiseSourceRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const audioIntervalRef = useRef<number | null>(null);
  const breathingIntervalRef = useRef<number | null>(null);

  // Synchronize 4-7-8 Breathing Guide
  useEffect(() => {
    if (!isBreathingMode) {
      setBreathingPhase('idle');
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
      return;
    }

    // Force Light ON and enter 4-7-8 Breathing
    setIsLightOn(true);
    let currentPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let countdown = 4;
    setBreathingPhase('inhale');
    setBreathingTimer(4);

    // Initial phase values
    setBrightness(20);
    setColorTemp(1800); // beautiful evening candle glow

    breathingIntervalRef.current = window.setInterval(() => {
      countdown--;
      
      if (countdown <= 0) {
        if (currentPhase === 'inhale') {
          currentPhase = 'hold';
          countdown = 7;
          setBreathingPhase('hold');
          setBrightness(100); // Fully brightened during hold
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale';
          countdown = 8;
          setBreathingPhase('exhale');
          setBrightness(100); // Begin dimming
        } else {
          currentPhase = 'inhale';
          countdown = 4;
          setBreathingPhase('inhale');
          setBrightness(20); // Dimmest state
        }
      }
      
      // Continuous brightness interpolation within interval ticks
      if (currentPhase === 'inhale') {
        const progress = (4 - countdown) / 4;
        setBrightness(Math.round(20 + progress * 80));
      } else if (currentPhase === 'hold') {
        setBrightness(100);
      } else if (currentPhase === 'exhale') {
        const progress = (8 - countdown) / 8;
        setBrightness(Math.round(100 - progress * 80));
      }

      setBreathingTimer(countdown);
    }, 1000);

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isBreathingMode]);

  // Handle color temperature hex dynamic styling
  const getColorTempRGB = (kelvin: number) => {
    // Return CSS color representation of color temperature 1800K - 4000K
    if (kelvin < 2200) return 'rgba(255, 140, 0, '; // glowing amber sunset
    if (kelvin < 2800) return 'rgba(255, 180, 70, '; // warm glow
    if (kelvin < 3500) return 'rgba(255, 215, 120, '; // soft warm-white
    return 'rgba(255, 240, 200, '; // clean warm light
  };

  const getTemperatureLabel = (kelvin: number) => {
    if (kelvin <= 2000) return '1800K 餘暉燭光';
    if (kelvin <= 2500) return '2400K 暮色微黃';
    if (kelvin <= 3200) return '3000K 暖調閱讀';
    return '4000K 微潤晨光';
  };

  // WEB AUDIO GENERATION ENGINE
  // Safe, modern procedural white-noise/sea waves synthesizer
  const stopAudioSynth = () => {
    if (audioIntervalRef.current) {
      window.clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.disconnect();
      } catch (e) {}
      noiseSourceRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend();
    }
    setIsPlayingAudio(false);
  };

  const startAudioSynth = (soundType: 'rain' | 'fire' | 'waves' | 'cosmic') => {
    stopAudioSynth();

    try {
      // Create or resume AudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create master gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume / 100;
      mainGainRef.current = masterGain;

      // Create main lowpass filter
      const filterNode = ctx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 800; // default soft cutoff
      filterNodeRef.current = filterNode;

      // Connect nodes: Source -> Filter -> MasterGain -> Destination
      filterNode.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Generate White Noise Buffer natively via ScriptProcessor (simplest, widest support)
      const bufferSize = 4 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        // Generate Pink-ish/Brown noise for smoother sleep sounds
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // compensation gain
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;
      
      // Let's customize synthesis by type
      if (soundType === 'rain') {
        // Rain is smooth, high density. Low bandpass filtering.
        filterNode.type = 'bandpass';
        filterNode.frequency.value = 1100;
        filterNode.Q.value = 0.8;
        
        // Add random droplet transients to simulate rain hits
        let tick = 0;
        audioIntervalRef.current = window.setInterval(() => {
          if (!isPlayingAudio) return;
          if (Math.random() < 0.6) {
            // Sizzle/Droplet
            const dropOsc = ctx.createOscillator();
            const dropGain = ctx.createGain();
            dropOsc.type = 'sine';
            dropOsc.frequency.setValueAtTime(1500 + Math.random() * 800, ctx.currentTime);
            dropGain.gain.setValueAtTime(0.015 * (volume / 100), ctx.currentTime);
            dropGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
            dropOsc.connect(dropGain);
            dropGain.connect(ctx.destination);
            dropOsc.start();
            dropOsc.stop(ctx.currentTime + 0.06);
          }
        }, 120);

      } else if (soundType === 'fire') {
        // Fireplace: Low frequency rumbles + sharp, occasional firewood pops
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 350;

        // Fire crackling scheduler
        audioIntervalRef.current = window.setInterval(() => {
          if (!isPlayingAudio) return;
          if (Math.random() < 0.25) {
            // sharp popping transient crackle
            const crackleOsc = ctx.createOscillator();
            const crackleGain = ctx.createGain();
            crackleOsc.type = 'triangle';
            crackleOsc.frequency.setValueAtTime(300 + Math.random() * 1500, ctx.currentTime);
            crackleGain.gain.setValueAtTime(0.08 * (volume / 100), ctx.currentTime);
            crackleGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);
            crackleOsc.connect(crackleGain);
            crackleGain.connect(ctx.destination);
            crackleOsc.start();
            crackleOsc.stop(ctx.currentTime + 0.02);
          }
          // low rumble modulation
          if (filterNodeRef.current) {
            filterNodeRef.current.frequency.setValueAtTime(260 + Math.sin(Date.now() / 300) * 80, ctx.currentTime);
          }
        }, 80);

      } else if (soundType === 'waves') {
        // Ocean waves: LFO modulates filter frequency periodically every 4-5s to simulate tide
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 500;
        filterNode.Q.value = 1;

        let angle = 0;
        audioIntervalRef.current = window.setInterval(() => {
          if (!isPlayingAudio) return;
          angle += 0.05;
          const lfoValue = Math.sin(angle); // -1 to 1
          const normMax = 800;
          const normMin = 180;
          const cutoff = normMin + ((lfoValue + 1) / 2) * (normMax - normMin);
          
          if (filterNodeRef.current) {
            filterNodeRef.current.frequency.setTargetAtTime(cutoff, ctx.currentTime, 0.4);
          }
        }, 100);

      } else if (soundType === 'cosmic') {
        // Space Void - Deep 80Hz humming with resonant drones, low noise
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 180;
        
        // Deep Drone Oscillators
        const droneOsc1 = ctx.createOscillator();
        const droneOsc2 = ctx.createOscillator();
        const droneGain = ctx.createGain();

        droneOsc1.type = 'sine';
        droneOsc1.frequency.value = 85; 
        droneOsc2.type = 'triangle';
        droneOsc2.frequency.value = 127.5; // perfect 5th harmonic ratio

        droneGain.gain.setValueAtTime(0.06 * (volume / 100), ctx.currentTime);

        droneOsc1.connect(droneGain);
        droneOsc2.connect(droneGain);
        droneGain.connect(ctx.destination);

        droneOsc1.start();
        droneOsc2.start();

        // Save reference to stop them together
        noiseSourceRef.current = {
          disconnect: () => {
            droneOsc1.stop();
            droneOsc2.stop();
            droneOsc1.disconnect();
            droneOsc2.disconnect();
            droneGain.disconnect();
            noiseNode.stop();
            noiseNode.disconnect();
          }
        } as any;

        // Skip buffer mounting so drone is clean
        noiseNode.connect(filterNode);
        noiseNode.start();
        setIsPlayingAudio(true);
        return;
      }

      // Start main noise buffer node (for non-cosmic)
      noiseNode.connect(filterNode);
      noiseNode.start();
      
      // Store reference to disconnect on stop
      if ((soundType as string) !== 'cosmic') {
        noiseSourceRef.current = noiseNode;
      }

      setIsPlayingAudio(true);
    } catch (err) {
      console.warn("Web Audio API not supported or user interaction required:", err);
      // Fallback: visual feedback only
      setIsPlayingAudio(true);
    }
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      mainGainRef.current.gain.setValueAtTime(volume / 100, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean-up Audio on unmount
  useEffect(() => {
    return () => {
      stopAudioSynth();
    };
  }, []);

  const handleSoundCardClick = (sound: SoundEffect) => {
    if (activeSoundId === sound.id) {
      // Toggle off
      stopAudioSynth();
      setActiveSoundId(null);
    } else {
      // Set playing state, trigger generation
      setActiveSoundId(sound.id);
      startAudioSynth(sound.synthType);
    }
  };

  return (
    <section id="sandbox" className="py-24 bg-[#FAF9F5] text-stone-800 relative overflow-hidden">
      {/* Dynamic room lighting backdrop glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-[1000ms]"
        style={{
          background: isLightOn 
            ? `radial-gradient(circle at 50% 40%, ${getColorTempRGB(colorTemp)}${Math.max(0.02, (brightness / 1200))}0) 0%, rgba(250,249,245,1) 70%)`
            : 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0%, rgba(250,249,245,1) 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE8E2] text-stone-600 text-xs font-medium uppercase tracking-widest mb-4">
            <Radio className="w-3.5 h-3.5" />
            暮・美學體驗艙
          </div>
          <h2 className="text-4xl font-sans font-medium tracking-tight text-stone-900 sm:text-5xl">
            在螢幕前，感受它的治癒溫度
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            我們打造了這款「虛擬感官沙盒」。隨心調整顏色、燈光色溫與超音波擴香，甚至能點選自然聲音，探索最適合你今夜好夢的專屬場景。
          </p>
        </div>

        {/* Dynamic Sandbox Main Content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Visual Showcase Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-sm relative min-h-[500px]">
            
            {/* Ambient Aura Background */}
            <div 
              className="absolute w-72 h-72 rounded-full blur-[80px] transition-all duration-700 pointer-events-none"
              style={{
                background: isLightOn 
                  ? getColorTempRGB(colorTemp) + (brightness / 400) + ')' 
                  : 'rgba(0,0,0,0)',
                transform: 'translateY(-100px)'
              }}
            />

            {/* Breathing Phase Label Overlay */}
            {isBreathingMode && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-6 px-4 py-2 rounded-full bg-stone-900 text-stone-100 text-sm font-medium tracking-wide shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span>
                  {breathingPhase === 'inhale' && `吸氣中... 慢調引導 (${breathingTimer}s)`}
                  {breathingPhase === 'hold' && `留住氣... 自我沈澱 (${breathingTimer}s)`}
                  {breathingPhase === 'exhale' && `吐氣中... 釋放壓力 (${breathingTimer}s)`}
                </span>
              </motion.div>
            )}

            {/* 4-7-8 Breathing Pulse Ripple */}
            {isBreathingMode && breathingPhase === 'inhale' && (
              <div className="absolute w-[360px] h-[360px] rounded-full border border-yellow-400/20 animate-[ping_4s_infinite] pointer-events-none" />
            )}

            {/* Simulated Ultrasonic Mist (Aroma Stream) */}
            <AnimatePresence>
              {isMistOn && (
                <div className="absolute top-[210px] left-[calc(50%-45px)] w-[90px] h-[100px] pointer-events-none z-10 flex justify-center">
                  {/* Mist steam trails */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.3, 0],
                      y: [-10, -50, -80, -110],
                      x: [0, 10, -10, 5],
                      scale: [0.8, 1.2, 1.6, 2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeOut"
                    }}
                    className="absolute w-5 h-20 bg-gradient-to-t from-white/60 to-white/0 rounded-full blur-[6px]"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: [0.15, 0.45, 0.2, 0],
                      y: [-10, -45, -75, -100],
                      x: [0, -8, 12, -5],
                      scale: [0.9, 1.3, 1.5, 1.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      delay: 1.2,
                      ease: "easeOut"
                    }}
                    className="absolute w-4 h-16 bg-gradient-to-t from-white/50 to-white/0 rounded-full blur-[7px]"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: [0.1, 0.35, 0.25, 0],
                      y: [-10, -55, -90, -120],
                      x: [0, 5, -5, 10],
                      scale: [0.7, 1.1, 1.4, 2.2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      delay: 2.2,
                      ease: "easeOut"
                    }}
                    className="absolute w-6 h-24 bg-gradient-to-t from-white/40 to-white/0 rounded-full blur-[8px]"
                  />
                </div>
              )}
            </AnimatePresence>

            {/* HIGH FIDELITY INTERACTIVE SVG LAMP DRAWING */}
            <div className="relative w-80 h-96 flex items-center justify-center">
              
              {/* Dynamic Light Cone Beam (Underneath the Head, shining on Base Cup) */}
              <AnimatePresence>
                {isLightOn && (
                  <motion.svg 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (brightness / 120) }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 320 380"
                  >
                    <defs>
                      <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={selectedColor.lightHex} stopOpacity="0.9" />
                        <stop offset="30%" stopColor={selectedColor.lightHex} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={selectedColor.lightHex} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Beam Polygon from lamp head (X: 110-210, Y: 120) to base (X: 100-220, Y: 240) */}
                    <polygon 
                      points="115,125 205,125 225,240 95,240" 
                      fill="url(#beamGradient)" 
                    />
                  </motion.svg>
                )}
              </AnimatePresence>

              {/* Vector Lamp Component */}
              <svg className="w-full h-full z-10" viewBox="0 0 320 380">
                <defs>
                  {/* Shadow Filters for realistic 3D potter look */}
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="12" stdDeviation="15" floodOpacity="0.15" />
                  </filter>
                  <linearGradient id="poleGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2A2A2A" />
                    <stop offset="60%" stopColor="#4A4A4A" />
                    <stop offset="100%" stopColor="#1A1A1A" />
                  </linearGradient>
                  {/* Custom body gradient which reflects lamp state */}
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={selectedColor.hex} />
                    <stop offset="30%" stopColor={selectedColor.hex} />
                    {/* Highlight when light shines down */}
                    <stop offset="70%" stopColor={isLightOn ? '#FFEB9C' : selectedColor.hex} stopOpacity={isLightOn ? 0.15 : 0} />
                    <stop offset="100%" stopColor={selectedColor.hex} />
                  </linearGradient>
                </defs>

                {/* Base platform shadow */}
                <ellipse cx="160" cy="335" rx="75" ry="12" fill="rgba(33, 31, 28, 0.12)" />

                <g filter="url(#shadow)">
                  {/* 1. Fabric woven premium power cord trailing from bottom column (right-side) */}
                  <path 
                    d="M 230,310 C 235,325 250,335 290,325" 
                    fill="none" 
                    stroke={selectedColor.hex} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="1,1" // textured woven look
                  />

                  {/* 2. Sleek Vertical Column Metal Rod on Right side */}
                  <rect x="220" y="110" width="14" height="200" rx="7" fill="url(#poleGrad)" />

                  {/* 3. Base Cup (Ceramic Container / Basin / Wireless charger) */}
                  <path 
                    d="M 100,240 C 100,295 120,328 160,328 C 200,328 220,295 220,240 Z" 
                    fill="url(#bodyGrad)" 
                  />
                  {/* Rim of the base cup */}
                  <ellipse cx="160" cy="240" rx="60" ry="12" fill="#E8DCD1" opacity="0.3" />
                  {/* Glow circle inside cup representing moisture or wireless charging ring */}
                  <ellipse 
                    cx="160" 
                    cy="242" 
                    rx="52" 
                    ry="8" 
                    fill={isLightOn ? selectedColor.lightHex : '#72675C'} 
                    opacity={isLightOn ? (brightness / 120) * 0.8 : 0.15} 
                    className="transition-all duration-300"
                  />

                  {/* 4. Sliding Bracket / Pivot joint on column */}
                  <rect x="212" y="120" width="30" height="22" rx="4" fill="#333333" />
                  {/* Slider tightener screw knob */}
                  <rect x="238" y="125" width="12" height="12" rx="2" fill="#555555" />

                  {/* 5. Horizontal arm bracket connecting joint to lamp head */}
                  <rect x="156" y="128" width="60" height="6" fill="#444444" />

                  {/* 6. Glowing Circular Lamp Head (top-mounted ring lamp) */}
                  {/* The outer casing of the top ring */}
                  <path 
                    d="M 110,120 L 210,120 L 205,108 L 115,108 Z" 
                    fill={selectedColor.hex} 
                  />
                  <ellipse cx="160" cy="118" rx="50" ry="12" fill={selectedColor.hex} />
                  
                  {/* Lamp Head Top Cap (Aesthetics) */}
                  <ellipse cx="160" cy="108" rx="45" ry="10" fill="#333" opacity="0.1" />

                  {/* The glowing under-diffuser plate representing LED disc */}
                  <ellipse 
                    cx="160" 
                    cy="122" 
                    rx="46" 
                    ry="10" 
                    fill={isLightOn ? selectedColor.lightHex : '#FFFFFF'} 
                    className="transition-all duration-300"
                  />
                  
                  {/* High Glow Overlay disc on the bottom to simulate light emission source */}
                  {isLightOn && (
                    <ellipse 
                      cx="160" 
                      cy="122" 
                      rx="43" 
                      ry="8" 
                      fill="#FFF" 
                      style={{ filter: 'blur(1px)' }} 
                      opacity={brightness / 100}
                    />
                  )}
                </g>
              </svg>
            </div>

            {/* Quick status description below visualizer */}
            <div className="mt-4 text-center text-stone-500 text-xs font-mono">
              色溫 {getTemperatureLabel(colorTemp)} ｜ 亮度 {brightness}% ｜ 
              香氛系統 {isMistOn ? '【極密低溫冷蒸運作中】' : '【暫停運作】'}
            </div>
          </div>

          {/* RIGHT: Sensory Control Dashboard */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Body Color Selector */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm relative overflow-hidden">
              <span className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#FAF9F5] z-0 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-sm font-sans font-medium text-stone-500 uppercase tracking-wider mb-3">
                  1. 美學配色選擇 <span>(Body Color Texture)</span>
                </h3>
                <div className="flex gap-4 mb-3">
                  {MOO_COLORS.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full ${color.bgClass} relative flex items-center justify-center transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 ${
                        selectedColor.id === color.id 
                          ? 'scale-110 ring-4 ring-stone-900/10' 
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      aria-label={color.name}
                    >
                      {selectedColor.id === color.id && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-stone-800 font-sans font-medium">{selectedColor.name}</p>
                <p className="text-stone-500 text-sm font-sans mt-1">{selectedColor.description}</p>
              </div>
            </div>

            {/* 2. Dusk Light Settings */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-sans font-medium text-stone-500 uppercase tracking-wider">
                  2. 暮光調控系統 <span>(Dusk Light Controller)</span>
                </h3>
                <button
                  onClick={() => setIsLightOn(!isLightOn)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-1.5 transition-colors ${
                    isLightOn 
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  <Sun className={`w-3.5 h-3.5 ${isLightOn ? 'stroke-amber-700 font-bold' : ''}`} />
                  {isLightOn ? '關閉主光源' : '開啟主光源'}
                </button>
              </div>

              <div className="space-y-5 disabled:opacity-40">
                {/* Brightness Adjustment Slider */}
                <div>
                  <div className="flex justify-between text-xs text-stone-600 font-sans mb-1.5">
                    <span className="flex items-center gap-1">暮光強度 (Brightness)</span>
                    <span className="font-mono">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    disabled={!isLightOn || isBreathingMode}
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-stone-700 bg-stone-200 h-1.5 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Color Temp Adjustment Slider */}
                <div>
                  <div className="flex justify-between text-xs text-stone-600 font-sans mb-1.5">
                    <span className="flex items-center gap-1">舒壓色溫 (Color Temperature)</span>
                    <span className="font-mono">{colorTemp}K</span>
                  </div>
                  <input
                    type="range"
                    min="1800"
                    max="4000"
                    disabled={!isLightOn || isBreathingMode}
                    value={colorTemp}
                    onChange={(e) => setColorTemp(parseInt(e.target.value))}
                    className="w-full accent-stone-700 bg-gradient-to-r from-orange-400 via-amber-200 to-yellow-105 h-1.5 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  {/* Quick Scale points */}
                  <div className="flex justify-between text-[10px] text-stone-400 font-sans mt-1">
                    <span>1800K (琥珀夕陽)</span>
                    <span>3000K (和煦暖黃)</span>
                    <span>4000K (冷潤白色)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Aroma Mist System */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-sm font-sans font-medium text-stone-500 uppercase tracking-wider mb-1">
                  3. 極靜超音波香氛 <span>(Ultrasonic Aroma)</span>
                </h3>
                <p className="text-stone-500 text-xs font-sans">
                  以 3.0MHz 高頻將精油微霧化，保證不濕床單、完全零高熱。
                </p>
              </div>
              <button
                onClick={() => setIsMistOn(!isMistOn)}
                className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                  isMistOn ? 'bg-stone-800 justify-end' : 'bg-stone-200 justify-start'
                }`}
                aria-label="Toggle Diffuser Mist"
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* 4. Natural Sound Therapy Pre-set */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm relative">
              <h3 className="text-sm font-sans font-medium text-stone-500 uppercase tracking-wider mb-3">
                4. ASMR 自然白噪音安睡音 <span>(Sensory White Noise)</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {MOO_SOUNDS.map(sound => {
                  const isActive = activeSoundId === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => handleSoundCardClick(sound)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                        isActive 
                          ? 'bg-stone-900 border-stone-900 text-stone-50 shadow-md transform -translate-y-0.5' 
                          : 'bg-stone-50 border-stone-200/60 hover:bg-stone-100 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-sans font-semibold tracking-wide">
                          {sound.name.split(' ')[0]}
                        </span>
                        {sound.id === 'rain' && <CloudRain className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-stone-500'}`} />}
                        {sound.id === 'fire' && <Flame className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-stone-500'}`} />}
                        {sound.id === 'waves' && <Waves className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-stone-500'}`} />}
                        {sound.id === 'cosmic' && <Orbit className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-stone-500'}`} />}
                      </div>
                      <span className={`text-[10px] font-sans ${isActive ? 'text-stone-400' : 'text-stone-400'}`}>
                        {sound.description.slice(0, 15)}...
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider - Interactive when audio is playing */}
              <div className={activeSoundId ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                <div className="flex justify-between text-xs text-stone-600 font-sans mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    療癒音效音量 (White Noise Volume)
                  </span>
                  <span className="font-mono">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full accent-stone-700 bg-stone-200 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Safe trigger notice */}
              <div className="mt-2 text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                <span>* 本功能採瀏覽器原聲合成，點選即可親耳體驗安神低頻噪音。</span>
              </div>
            </div>

            {/* 5. 4-7-8 Breathing Mode Calibrator */}
            <div className={`p-6 rounded-2xl border transition-all duration-500 ${
              isBreathingMode 
                ? 'bg-yellow-50/50 border-yellow-300/60 shadow-inner' 
                : 'bg-white border-stone-200/60 shadow-sm'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-sm font-sans font-bold tracking-wider ${isBreathingMode ? 'text-amber-800' : 'text-stone-800'}`}>
                      5. 4-7-8 古印度深層呼吸引導
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-yellow-200 text-yellow-800 text-[10px] font-bold">
                      極致睡眠推薦
                    </span>
                  </div>
                  <p className="text-stone-500 text-xs font-sans leading-relaxed">
                    哈佛醫學專家推薦「神經安神法」：吸氣4秒 ➡️ 憋氣7秒 ➡️ 呼氣8秒。由暮 Moo 智能呼吸燈帶動大腦韻律，迅速減緩交感神經亢奮。
                  </p>
                </div>
                <button
                  onClick={() => setIsBreathingMode(!isBreathingMode)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium font-sans flex items-center gap-1.5 transition-all w-32 justify-center shadow-sm ${
                    isBreathingMode 
                      ? 'bg-amber-700 text-stone-50 hover:bg-amber-800' 
                      : 'bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800'
                  }`}
                >
                  {isBreathingMode ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      停止呼吸導引
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      開啟舒壓呼吸
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
}
