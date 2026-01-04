
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppTab, Service, GalleryImage } from './types';
import { INITIAL_SERVICES, INITIAL_GALLERY } from './constants';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.LANDING);
  
  // Persistence Initialization
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('savie_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('savie_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('savie_webhook') || '';
  });

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinBuffer, setPinBuffer] = useState('');
  const [newsletterInput, setNewsletterInput] = useState('');
  
  const SECRET_KEY = '739482615904';
  const ADMIN_PIN = '1994';

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('savie_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('savie_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('savie_webhook', webhookUrl);
  }, [webhookUrl]);

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewsletterInput(val);
    if (val === SECRET_KEY) {
      setNewsletterInput('');
      setShowPinPrompt(true);
    }
  };

  useEffect(() => {
    if (activeTab !== AppTab.ADMIN && isAdminUnlocked) {
      setIsAdminUnlocked(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    if (selectedImage || showPinPrompt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, showPinPrompt]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinBuffer === ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setShowPinPrompt(false);
      setPinBuffer('');
      setActiveTab(AppTab.ADMIN);
    } else {
      alert("Invalid Access Code.");
      setPinBuffer('');
      setShowPinPrompt(false);
    }
  };

  const renderLanding = () => (
    <div className="animate-in fade-in duration-1000">
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h2 className="text-[#D4AF37] tracking-[0.6em] uppercase text-sm mb-6 font-semibold">Excellence in Service</h2>
          <h1 className="text-white text-6xl md:text-9xl mb-8 leading-none font-serif">Savie <span className="italic text-[#FFDAB9]">Royal</span></h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">Sophisticated culinary experiences and meticulous event management for your most significant life milestones.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setActiveTab(AppTab.BOOKING)} className="px-12 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">Book a Consultation</button>
            <button onClick={() => setActiveTab(AppTab.GALLERY)} className="px-12 py-5 border border-white/40 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">View Gallery</button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#fdfaf6] border-y border-[#FFDAB9]/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800" className="w-full h-[600px] object-cover shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]" alt="" />
          </div>
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Our Heritage</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-black">Catering to the Soul.</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light">Since 1994, Savie Royal has been the premier choice for families and corporations seeking more than just a menu. We believe that during times of mourning or celebration, the nourishment provided should reflect the dignity of the occasion.</p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-4">What We Do</h4>
            <h2 className="text-5xl font-serif text-black">Bespoke Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((s) => (
              <div key={s.id} className="flex flex-col bg-white border border-gray-100 group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-64 overflow-hidden relative">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-serif mb-4 text-black group-hover:text-[#D4AF37]">{s.title}</h3>
                  <p className="text-gray-500 text-sm font-light mb-8">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#FFDAB9]">
      <Navbar currentTab={activeTab} setTab={setActiveTab} isAdminUnlocked={isAdminUnlocked} />
      
      <main>
        {activeTab === AppTab.LANDING && renderLanding()}
        {activeTab === AppTab.GALLERY && (
          <section className="py-32 px-6 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {gallery.map(img => (
                  <div key={img.id} className="relative break-inside-avoid overflow-hidden group cursor-zoom-in bg-gray-900 border border-white/5" onClick={() => setSelectedImage(img)}>
                    <img src={img.url} alt={img.title} className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-1000" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all">
                      <h4 className="text-white font-serif text-2xl">{img.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedImage && (
              <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
                <img src={selectedImage.url} className="max-w-full max-h-full object-contain shadow-2xl" alt="" />
              </div>
            )}
          </section>
        )}
        {activeTab === AppTab.BOOKING && (
          <section className="py-32 px-6 bg-gray-50 min-h-screen">
            <BookingForm onSuccess={() => setActiveTab(AppTab.LANDING)} webhookUrl={webhookUrl} />
          </section>
        )}
        {activeTab === AppTab.ADMIN && isAdminUnlocked && (
          <Admin 
            services={services} setServices={setServices} 
            gallery={gallery} setGallery={setGallery} 
            webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl}
          />
        )}
      </main>

      {showPinPrompt && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white p-12 max-w-md w-full border-t-8 border-[#D4AF37] shadow-2xl text-center">
            <h2 className="text-2xl font-serif mb-2 text-black">Verification</h2>
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <input autoFocus type="password" maxLength={4} className="w-full text-center text-4xl tracking-[1em] py-4 border-b-2 border-gray-100 focus:border-[#D4AF37] outline-none" placeholder="****" value={pinBuffer} onChange={e => setPinBuffer(e.target.value)} />
              <button type="submit" className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Unlock System</button>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div><h2 className="text-3xl font-serif tracking-[0.2em] mb-8 uppercase">SAVIE <span className="text-[#D4AF37]">ROYAL</span></h2></div>
          <div>
            <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab(AppTab.LANDING)}>Experience</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab(AppTab.GALLERY)}>Archive</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab(AppTab.BOOKING)}>Inquiry</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-8">System Access</h4>
            <div className="flex border-b border-[#D4AF37]/30 pb-2 mt-8">
              <input type="text" placeholder="Access Code" className="bg-transparent outline-none flex-1 text-sm text-white placeholder:text-gray-700" value={newsletterInput} onChange={handleNewsletterChange} />
              <button className="text-[#D4AF37] text-xs uppercase font-bold tracking-widest">Entry</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
