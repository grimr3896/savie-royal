
import React, { useState, useRef } from 'react';
import { Service, GalleryImage } from '../types';

interface AdminProps {
  services: Service[];
  setServices: (s: Service[]) => void;
  gallery: GalleryImage[];
  setGallery: (g: GalleryImage[]) => void;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

const Admin: React.FC<AdminProps> = ({ services, setServices, gallery, setGallery, webhookUrl, setWebhookUrl }) => {
  const [newSvc, setNewSvc] = useState({ title: '', desc: '', icon: '✨', image: '' });
  const [newImg, setNewImg] = useState({ url: '', title: '' });
  const [isUploading, setIsUploading] = useState(false);

  const svcFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSvcFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const base64 = await convertToBase64(file);
        setNewSvc({ ...newSvc, image: base64 });
      } catch (err) {
        alert("Failed to read file");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const base64 = await convertToBase64(file);
        setNewImg({ ...newImg, url: base64 });
      } catch (err) {
        alert("Failed to read file");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const addService = () => {
    if (!newSvc.title || !newSvc.image) {
      alert("Please provide both a title and an image.");
      return;
    }
    const service: Service = { 
      id: Date.now().toString(), 
      title: newSvc.title, 
      description: newSvc.desc, 
      icon: newSvc.icon,
      image: newSvc.image
    };
    setServices([...services, service]);
    setNewSvc({ title: '', desc: '', icon: '✨', image: '' });
    if (svcFileRef.current) svcFileRef.current.value = '';
  };

  const addImage = () => {
    if (!newImg.url) {
      alert("Please provide an image source.");
      return;
    }
    setGallery([{ id: Date.now().toString(), url: newImg.url, title: newImg.title }, ...gallery]);
    setNewImg({ url: '', title: '' });
    if (galleryFileRef.current) galleryFileRef.current.value = '';
  };

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto space-y-20 animate-in slide-in-from-bottom-10 duration-700">
      <div className="border-b border-gray-100 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-6xl font-serif mb-4 text-black uppercase tracking-tight">Site <span className="text-[#D4AF37]">Manager</span></h1>
          <p className="text-gray-400 font-light max-w-2xl">Manage your digital storefront. Changes are saved locally to this device.</p>
        </div>
        <div className="bg-peach/10 p-6 border border-peach/30 rounded-lg max-w-sm">
          <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2 block">Automation Backend (n8n Webhook)</label>
          <input 
            type="text"
            className="w-full bg-white border border-gray-100 p-2 text-xs outline-none focus:border-[#D4AF37]"
            placeholder="https://n8n.your-instance.com/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-[9px] text-gray-400 mt-2 italic">Bookings will be sent here for processing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Service Mgmt */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-[#D4AF37]">Service Catalog</h2>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{services.length} items</span>
          </div>
          
          <div className="bg-gray-50 p-8 space-y-6 rounded-lg border border-gray-100">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Service Title</label>
              <input 
                placeholder="e.g. Royal Dessert Gala" 
                className="w-full p-4 border rounded focus:ring-1 focus:ring-[#D4AF37] outline-none bg-white transition-all text-sm"
                value={newSvc.title}
                onChange={e => setNewSvc({...newSvc, title: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Visual Asset</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  ref={svcFileRef}
                  onChange={handleSvcFileUpload}
                />
                <button 
                  onClick={() => svcFileRef.current?.click()}
                  className="px-6 py-3 border border-gray-300 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-100 transition-all flex-1"
                >
                  Upload Image
                </button>
                {newSvc.image && (
                  <div className="w-12 h-12 rounded border border-[#D4AF37] overflow-hidden">
                    <img src={newSvc.image} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Description</label>
              <textarea 
                placeholder="Details..." 
                className="w-full p-4 border rounded focus:ring-1 focus:ring-[#D4AF37] outline-none h-24 resize-none bg-white transition-all text-sm"
                value={newSvc.desc}
                onChange={e => setNewSvc({...newSvc, desc: e.target.value})}
              />
            </div>

            <button 
              onClick={addService}
              disabled={isUploading}
              className="w-full bg-black text-white py-5 uppercase text-xs tracking-widest font-bold hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-50"
            >
              Add to Live Registry
            </button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {services.map(s => (
              <div key={s.id} className="group flex items-center gap-4 p-4 border border-gray-100 bg-white shadow-sm">
                <img src={s.image} className="w-16 h-16 object-cover rounded flex-shrink-0" alt="" />
                <div className="flex-grow">
                  <h4 className="font-serif font-bold text-black">{s.title}</h4>
                </div>
                <button 
                  onClick={() => setServices(services.filter(x => x.id !== s.id))}
                  className="text-red-400 text-[10px] uppercase font-bold hover:text-red-600 tracking-widest"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Mgmt */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-[#D4AF37]">Visual Archive</h2>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{gallery.length} items</span>
          </div>
          
          <div className="bg-gray-50 p-8 space-y-6 rounded-lg border border-gray-100">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Add to Portfolio</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  ref={galleryFileRef}
                  onChange={handleGalleryFileUpload}
                />
                <button 
                  onClick={() => galleryFileRef.current?.click()}
                  className="px-6 py-3 border border-gray-300 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-100 transition-all flex-1"
                >
                  Upload Asset
                </button>
                {newImg.url && (
                  <div className="w-12 h-12 rounded border border-[#D4AF37] overflow-hidden">
                    <img src={newImg.url} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Caption</label>
              <input 
                placeholder="e.g. Memorial Hall Setting" 
                className="w-full p-4 border rounded focus:ring-1 focus:ring-[#D4AF37] outline-none bg-white text-sm"
                value={newImg.title}
                onChange={e => setNewImg({...newImg, title: e.target.value})}
              />
            </div>
            <button 
              onClick={addImage}
              disabled={isUploading}
              className="w-full bg-[#D4AF37] text-black py-5 uppercase text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-all disabled:opacity-50"
            >
              Commit to Archive
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {gallery.map(img => (
              <div key={img.id} className="relative aspect-square group">
                <img src={img.url} className="w-full h-full object-cover rounded" />
                <button 
                  onClick={() => setGallery(gallery.filter(x => x.id !== img.id))}
                  className="absolute top-1 right-1 bg-red-600 text-white text-[8px] px-2 py-1 font-bold rounded uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Admin;
