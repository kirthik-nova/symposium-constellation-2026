import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Loader2, Ticket, CheckCircle2, 
  AlertCircle, Download, ExternalLink, Calendar, MapPin 
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymXgM7zuLy0HSViU_X3inVHFJHKyl_Z0qrW7Pa0BIjC6Ny0WI8rvY9sagZYTg-4AoZnw/exec";

const TicketTracker = ({ isOpen, onClose }) => {
  const [regId, setRegId] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);
  const qrRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!regId.trim()) return;

    setLoading(true);
    setError(null);
    setTicketData(null);

    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?id=${regId.trim().toUpperCase()}`);
      const result = await response.json();

      if (result.status === "success") {
        setTicketData(result.data);
      } else {
        setError(result.message || "Entry not found in the manifest.");
      }
    } catch (err) {
      setError("Comms failure: Could not reach the central database.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `Constellation2k26_Ticket_${ticketData.regId}.png`;
      a.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#050510] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                  <Ticket size={24} />
                </div>
                <h2 className="text-xl font-black font-heading tracking-tight text-white uppercase italic">Pathfinder | <span className="text-fuchsia-400">Track Pass</span></h2>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {!ticketData ? (
                <div className="space-y-6">
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Lost your boarding pass? Enter your unique <strong className="text-white">Registration ID</strong> provided during checkout to retrieve your digital entry manifest.
                  </p>
                  
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        value={regId}
                        onChange={(e) => setRegId(e.target.value)}
                        placeholder="CON26-0001"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all font-mono uppercase tracking-widest"
                      />
                    </div>

                    <button 
                      disabled={loading || !regId.trim()}
                      className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-fuchsia-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Query Manifest"}
                    </button>
                  </form>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      <AlertCircle size={18} />
                      {error}
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  {/* TICKET UI */}
                  <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-3xl -mr-16 -mt-16" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 w-fit">
                          <CheckCircle2 size={12} className="text-fuchsia-400" />
                          <span className="text-[10px] font-black uppercase text-fuchsia-300 tracking-tighter italic">Status: {ticketData.status}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white">{ticketData.name}</h3>
                        <p className="text-xs text-gray-500 font-mono tracking-widest">{ticketData.regId}</p>
                      </div>
                      <div className="bg-white p-2 rounded-xl" ref={qrRef}>
                        <QRCodeCanvas value={`https://constellation2k26.com/ticket?id=${ticketData.regId}`} size={80} level="M" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 border-t border-white/5 pt-6 mt-2">
                        <div><span className="text-[10px] text-gray-500 uppercase font-bold block">Squad Size</span><span className="text-sm text-white font-medium">{ticketData.teamSize} Member(s)</span></div>
                        <div><span className="text-[10px] text-gray-500 uppercase font-bold block">College</span><span className="text-sm text-white font-medium truncate">{ticketData.college}</span></div>
                        <div><span className="text-[10px] text-gray-500 uppercase font-bold block">Date</span><span className="text-sm text-white font-medium">April 02, 2026</span></div>
                        <div><span className="text-[10px] text-gray-500 uppercase font-bold block">Loc</span><span className="text-sm text-white font-medium">Main Hub</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button onClick={downloadTicket} className="w-full py-4 bg-fuchsia-500 text-white font-bold rounded-2xl hover:bg-fuchsia-600 transition-all flex items-center justify-center gap-2">
                        <Download size={18} /> Save Manifest QR
                    </button>
                    <button onClick={() => setTicketData(null)} className="w-full py-4 text-gray-400 text-sm font-medium hover:text-white transition-colors">
                        Search Another Protocol
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer decoration */}
            <div className="p-4 bg-white/[0.03] text-center border-t border-white/5">
                <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">Sector 7-G | Data Core Access</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TicketTracker;
