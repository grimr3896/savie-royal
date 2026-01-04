
import React, { useState } from 'react';
import { generateEventInsights, sendToN8N } from '../services/geminiService';

const BookingForm: React.FC<{ onSuccess: () => void, webhookUrl?: string }> = ({ onSuccess, webhookUrl }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Funeral Service',
    date: '',
    location: '',
    guests: 50,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // 1. Generate AI Assessment
    const aiInsights = await generateEventInsights(formData);

    // 2. Prepare Payload
    const payload = {
      ...formData,
      aiInsights,
      submittedAt: new Date().toISOString()
    };

    // 3. Send to n8n (if URL exists)
    if (webhookUrl) {
      await sendToN8N(webhookUrl, payload);
    }

    // 4. Fallback/Standard Action: Mailto
    const recipient = "savieroyal1@gmail.com";
    const subject = `Catering Inquiry: ${formData.type} - ${formData.name}`;
    const body = `
New Inquiry Received:
---------------------
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Event: ${formData.type}
Date: ${formData.date}
Guests: ${formData.guests}
Message: ${formData.message}

AI Strategy Insight:
${aiInsights}
    `.trim();

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    alert("Inquiry successfully processed by our AI systems. Opening email client for your final confirmation.");
    setIsProcessing(false);
    onSuccess();
  };

  const eventCategories = [
    "Funeral Service", "Memorial Reception", "Wake / Visitation", 
    "Life Celebration", "Wedding Reception", "Corporate Gala"
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border-t-8 border-[#D4AF37] relative overflow-hidden">
      {isProcessing && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
          <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-8" />
          <h3 className="text-2xl font-serif text-black mb-4">Dignified Assessment in Progress</h3>
          <p className="text-gray-400 font-light max-w-xs uppercase tracking-widest text-[10px]">Our AI strategist is analyzing your requirements to ensure peak service excellence.</p>
        </div>
      )}

      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-4">Consultation Inquiry</h2>
        <p className="text-gray-400 italic font-light">Precision planning for your most important moments.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Full Name</label>
            <input required className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Phone Number</label>
            <input required className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Email Address</label>
            <input required type="email" className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Event Category</label>
            <select className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none bg-white cursor-pointer" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              {eventCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Event Date</label>
            <input required type="date" className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Location</label>
            <input required className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Guests</label>
            <input type="number" className="w-full border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 0})}/>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Special Considerations</label>
          <textarea rows={4} className="w-full border border-gray-100 p-4 focus:border-[#D4AF37] outline-none text-sm" placeholder="Tell us about the atmosphere..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-black text-white py-5 uppercase tracking-widest font-bold hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg active:scale-95">
          Process Request
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
