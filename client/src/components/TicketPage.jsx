import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Ticket, CheckCircle2, Loader2, AlertCircle, 
  Download, Home, MapPin, Calendar, Clock, User, Building, Laptop
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import NetworkBackground from './NetworkBackground';
import ParticleBackground from './ParticleBackground';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzEyH3Zn0RItAMMoQmufFsK0bgboujjPGZSj93dgut4k3HL_Z-ESO11m-Oq39UU2ylq/exec";

const TicketPage = () => {
    const [searchParams] = useSearchParams();
    const regId = searchParams.get('id');
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState(null);
    const qrRef = useRef(null);

    useEffect(() => {
        if (regId) {
            fetchTicket(regId);
        } else {
            setError("No Registration ID provided. Please check your email link.");
        }
    }, [regId]);

    const fetchTicket = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${APPS_SCRIPT_URL}?id=${id.trim().toUpperCase()}`);
            const result = await response.json();
            if (result.status === "success") {
                setTicketData(result.data);
            } else {
                setError(result.message || "Ticket not found in the central database.");
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
        <div className="min-h-screen bg-[#000000] text-white selection:bg-fuchsia-500/30 font-sans p-4 sm:p-8 flex items-center justify-center relative overflow-hidden">
            <NetworkBackground />
            <ParticleBackground />

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl">
                {/* Header Logo */}
                <div className="flex justify-center mb-8">
                    <Link to="/home" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-600 flex items-center justify-center text-black font-bold font-mono text-lg shadow-[0_0_20px_rgba(232,61,232,0.3)]">
                            {'>_'}
                        </div>
                        <span className="text-white font-heading text-2xl font-bold tracking-tight">Constellation<span className="text-fuchsia-400">2K26</span></span>
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-premium rounded-[2.5rem] border-white/10 overflow-hidden shadow-2xl"
                >
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-fuchsia-400" size={40} />
                            <p className="text-gray-400 font-mono tracking-widest uppercase text-sm">Querying Data Core...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 flex flex-col items-center text-center gap-6">
                            <div className="p-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                <AlertCircle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-white">Access Denied</h2>
                                <p className="text-gray-400 font-light">{error}</p>
                            </div>
                            <Link to="/home" className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                                <Home size={18} /> Return to Home
                            </Link>
                        </div>
                    ) : ticketData && (
                        <div className="flex flex-col">
                            {/* Blue Info Header */}
                            <div className="bg-fuchsia-500/10 border-b border-white/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="space-y-1 text-center sm:text-left">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-fuchsia-500/20 border border-fuchsia-500/30 w-fit mx-auto sm:mx-0">
                                        <CheckCircle2 size={12} className="text-fuchsia-400" />
                                        <span className="text-[10px] font-black uppercase text-fuchsia-300 tracking-[0.2em] italic">MANIFEST VERIFIED</span>
                                    </div>
                                    <h1 className="text-3xl font-black text-white tracking-tight leading-tight">{ticketData.name}</h1>
                                    <p className="text-xs text-gray-400 font-mono tracking-[0.4em] uppercase">{ticketData.regId}</p>
                                </div>
                                <div className="bg-white p-3 rounded-[1.5rem] shadow-2xl" ref={qrRef}>
                                    <QRCodeCanvas value={window.location.href} size={120} level="M" />
                                </div>
                            </div>

                            <div className="p-8 sm:p-12">
                                {/* Ticket Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                                    {[
                                        { icon: User, label: "Squad Size", val: `${ticketData.teamSize} Member(s)` },
                                        { icon: Building, label: "Department", val: ticketData.department },
                                        { icon: Building, label: "College", val: ticketData.college },
                                        { icon: Clock, label: "Event Status", val: ticketData.status },
                                        { icon: Calendar, label: "Date", val: "April 02, 2026" },
                                        { icon: MapPin, label: "Location", val: "Arunai Engineering College" }
                                    ].map((detail, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <detail.icon size={14} className="text-fuchsia-400/50" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest">{detail.label}</span>
                                            </div>
                                            <p className="text-white font-medium pl-6">{detail.val}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Events List */}
                                <div className="space-y-4 mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Laptop size={16} className="text-fuchsia-400" />
                                        <span className="text-xs uppercase font-bold tracking-widest text-white">Registered Operations</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {ticketData.techEvents.split(',').map(ev => (
                                            <span key={ev} className="px-3 py-1 bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-[10px] font-bold rounded-lg">{ev.trim()}</span>
                                        ))}
                                        {ticketData.nonTechEvents && ticketData.nonTechEvents.split(',').map(ev => (
                                            <span key={ev} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold rounded-lg">{ev.trim()}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={downloadTicket}
                                        className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-fuchsia-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Download size={18} /> Download Pass
                                    </button>
                                    <Link 
                                        to="/home" 
                                        className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Home size={18} /> To Hub
                                    </Link>
                                </div>
                            </div>

                            {/* Ticket Footer */}
                            <div className="bg-white/[0.03] border-t border-white/5 px-8 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Entry Authorization Valid</span>
                                </div>
                                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Sector 7-G | AEC Manifest</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TicketPage;
