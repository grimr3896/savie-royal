
import React from 'react';
import { AppTab } from '../types';

interface HeroProps {
  onStartBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  return (
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/elegance/1920/1080" 
          alt="Elysian Atmosphere" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-[#D4AF37] text-lg uppercase tracking-[0.4em] mb-4">Timeless Grace & Sophistication</h2>
        <h1 className="text-5xl md:text-8xl text-white mb-8 leading-tight">
          Crafting Moments <br />
          <span className="italic">That Last Forever</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          From dignified memorials to celebration of life, we bring meticulous planning 
          and exquisite catering to your most significant milestones.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={onStartBooking}
            className="bg-[#D4AF37] text-black px-10 py-4 uppercase tracking-widest font-semibold hover:bg-white transition-all duration-500"
          >
            Inquire Now
          </button>
          <button className="border border-white/30 text-white px-10 py-4 uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all duration-500">
            View Our Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-[#D4AF37]" />
      </div>
    </div>
  );
};

export default Hero;
