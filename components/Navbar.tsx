
import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';

interface NavbarProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  isAdminUnlocked: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab, isAdminUnlocked }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const menuItems = [
    { id: AppTab.LANDING, label: 'The Experience' },
    { id: AppTab.GALLERY, label: 'Archive' },
    { id: AppTab.BOOKING, label: 'Inquire' },
    ...(isAdminUnlocked ? [{ id: AppTab.ADMIN, label: 'Portal' }] : [])
  ];

  const handleLinkClick = (id: AppTab) => {
    setTab(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 px-6 md:px-12 ${
        isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="text-white text-2xl font-serif tracking-[0.3em] cursor-pointer uppercase z-[70]"
            onClick={() => handleLinkClick(AppTab.LANDING)}
          >
            SAVIE <span className="text-[#D4AF37]">ROYAL</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all hover:text-[#D4AF37] ${
                  currentTab === item.id ? 'text-[#D4AF37] font-bold' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setTab(AppTab.BOOKING)}
              className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Reservation
            </button>
          </div>

          <button 
            className="md:hidden text-[#D4AF37] z-[70] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
              <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-4' : ''}`}></span>
              <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-black z-[50] transition-all duration-700 ease-in-out md:hidden ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
          <div className="w-24 h-[1px] bg-[#D4AF37]/30 mb-8" />
          
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`text-4xl font-serif tracking-widest transition-all duration-500 delay-[${index * 100}ms] ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${currentTab === item.id ? 'text-[#D4AF37]' : 'text-white'}`}
            >
              {item.label}
            </button>
          ))}

          <div className={`mt-12 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <button 
              onClick={() => handleLinkClick(AppTab.BOOKING)}
              className="px-12 py-5 border border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Start Reservation
            </button>
          </div>

          <div className="absolute bottom-12 text-[10px] text-gray-500 uppercase tracking-[0.4em]">
            Savie Royal &copy; 2024
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
