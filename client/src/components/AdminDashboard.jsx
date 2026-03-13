import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, XCircle, Search, 
  Download, Eye, Filter, Loader2, Link as LinkIcon,
  CreditCard, ShieldCheck, RefreshCw, LogOut, ExternalLink,
  ChevronDown, Phone, Mail, Building, Calendar, Clock,
  Laptop, FileText
} from 'lucide-react';
import { toast } from 'sonner';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzEyH3Zn0RItAMMoQmufFsK0bgboujjPGZSj93dgut4k3HL_Z-ESO11m-Oq39UU2ylq/exec";
const ADMIN_PASSKEY = "CONSTELLATION_ADMIN_2026"; // Must match Apps Script

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedReg, setSelectedReg] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSKEY) {
            setIsAuthenticated(true);
            fetchData();
        } else {
            toast.error("Invalid Admin Passkey");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${APPS_SCRIPT_URL}?action=adminFetch&key=${ADMIN_PASSKEY}`);
            const result = await response.json();
            if (result.status === "success") {
                setRegistrations(result.data);
            } else {
                toast.error(result.message || "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Connection failure to Data Core");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (regId, newStatus) => {
        setIsUpdating(true);
        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    action: "updateStatus",
                    key: ADMIN_PASSKEY,
                    regId,
                    newStatus
                })
            });
            const result = await response.json();
            if (result.status === "success") {
                toast.success(`ID ${regId} status updated to ${newStatus}`);
                fetchData(); // Refresh list
                if (selectedReg && selectedReg.registrationid === regId) {
                    setSelectedReg({ ...selectedReg, paymentstatus: newStatus });
                }
            } else {
                toast.error(result.message || "Update failed");
            }
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredData = registrations.filter(reg => {
        const matchesSearch = 
            reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            reg.registrationid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.transactionid?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = statusFilter === "ALL" || reg.paymentstatus === statusFilter;
        
        return matchesSearch && matchesFilter;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-black to-black">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-premium p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
                    <div className="flex flex-col items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(232,61,232,0.4)]">
                            <ShieldCheck size={32} className="text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-black font-heading italic">ADMIN <span className="text-fuchsia-500 underline underline-offset-4">DECK</span></h1>
                            <p className="text-gray-500 text-sm mt-2">Identity verification required for terminal access.</p>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Security Passkey</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white outline-none focus:border-fuchsia-500 transition-all font-mono"
                                placeholder="••••••••••••"
                            />
                        </div>
                        <button className="w-full py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-fuchsia-500/20">
                            Establish Link
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-fuchsia-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black uppercase tracking-tighter italic">Command <span className="text-fuchsia-500">Center</span></h1>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Live Connection Established</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={fetchData} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button onClick={() => setIsAuthenticated(false)} className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                        <LogOut size={14} /> Exit
                    </button>
                </div>
            </header>

            <main className="p-8 max-w-[1600px] mx-auto space-y-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Recruits", val: registrations.length, icon: Users, color: "fuchsia" },
                        { label: "Verified Crew", val: registrations.filter(r => r.paymentstatus?.includes("PAID (VERIFIED)") || r.paymentstatus === "VERIFIED").length, icon: CheckCircle2, color: "green" },
                        { label: "Unverified Pings", val: registrations.filter(r => r.paymentstatus?.includes("UNVERIFIED")).length, icon: RefreshCw, color: "orange" },
                        { label: "Offline Pending", val: registrations.filter(r => r.paymentstatus?.includes("OFFLINE") || r.paymentstatus?.includes("PAY AT COLLEGE")).length, icon: CreditCard, color: "blue" }
                    ].map((stat, i) => (
                        <div key={i} className="glass-premium p-6 rounded-3xl border-white/5 bg-white/[0.02] flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 shadow-sm shadow-${stat.color}-500/20`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-0.5">{stat.label}</p>
                                <p className="text-2xl font-black font-mono">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Table */}
                <div className="glass-premium rounded-[2.5rem] border-white/5 bg-white/[0.01] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by Name, Reg ID or Transac ID..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-fuchsia-500 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">
                                <Filter size={14} /> Filter:
                            </div>
                            {["ALL", "PAID (VERIFIED)", "PAID (UNVERIFIED)", "PENDING – PAY AT COLLEGE"].map(f => (
                                <button 
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-fuchsia-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                                >
                                    {f === "ALL" ? "Total" : f.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">
                                    <th className="px-8 py-5">Registrant</th>
                                    <th className="px-8 py-5">Sector (Dept)</th>
                                    <th className="px-8 py-5">Payment Manifest</th>
                                    <th className="px-8 py-5">Status Log</th>
                                    <th className="px-8 py-5 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-gray-500 italic font-light">No records found matching current query.</td>
                                    </tr>
                                ) : filteredData.map((reg) => (
                                    <tr key={reg.registrationid} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 flex items-center justify-center text-fuchsia-400 font-bold border border-fuchsia-500/20 uppercase tracking-tighter italic">
                                                    {reg.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-fuchsia-400 transition-colors uppercase italic tracking-tight">{reg.name}</p>
                                                    <p className="text-[10px] font-mono text-gray-500 uppercase">{reg.registrationid}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-gray-300 font-medium">{reg.department}</p>
                                            <p className="text-[10px] text-gray-500 uppercase truncate max-w-[150px]">{reg.college}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <p className="text-gray-300 font-mono text-xs">{reg.transactionid || "N/A"}</p>
                                                <p className="text-[10px] font-bold text-fuchsia-400 tracking-widest">{reg.paymentmode}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                reg.paymentstatus?.includes("VERIFIED") && !reg.paymentstatus?.includes("UNVERIFIED") ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                reg.paymentstatus?.includes("UNVERIFIED") ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                                {reg.paymentstatus}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setSelectedReg(reg)} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(reg.registrationid, "PAID (VERIFIED)")}
                                                    disabled={reg.paymentstatus === "PAID (VERIFIED)"}
                                                    className="p-2.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 disabled:opacity-30 transition-all" 
                                                    title="Verify Payment"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(reg.registrationid, "REJECTED")}
                                                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all" 
                                                    title="Reject/Flag"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Side Drawer for Details */}
            <AnimatePresence>
                {selectedReg && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReg(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                        <motion.div 
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-xl bg-[#050510] border-l border-white/10 h-full overflow-y-auto p-10 flex flex-col gap-10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter">AGENT <span className="text-fuchsia-500">DOSSIER</span></h2>
                                <button onClick={() => setSelectedReg(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-white transition-all">
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-4xl text-white font-black italic shadow-lg shadow-fuchsia-500/20">
                                        {selectedReg.name?.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{selectedReg.name}</h3>
                                        <p className="text-fuchsia-400 font-mono tracking-widest text-sm">{selectedReg.registrationid}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                                                selectedReg.paymentstatus?.includes("VERIFIED") && !selectedReg.paymentstatus?.includes("UNVERIFIED") ? 'bg-green-500/20 text-green-400' :
                                                selectedReg.paymentstatus?.includes("UNVERIFIED") ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-blue-500/20 text-gray-400'
                                            }`}>{selectedReg.paymentstatus}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Identity */}
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <DetailItem label="Comms (Phone)" val={selectedReg.phone} icon={Phone} />
                                    <DetailItem label="Email" val={selectedReg.email} isLink href={`mailto:${selectedReg.email}`} icon={Mail} />
                                    <DetailItem label="Sector (Dept)" val={selectedReg.department} icon={Building} />
                                    <DetailItem label="Academy" val={selectedReg.college} icon={ShieldCheck} />
                                    <DetailItem label="Clearance (Year)" val={selectedReg.year ? `${selectedReg.year} Year` : "N/A"} icon={Calendar} />
                                    <DetailItem label="Ration (Food)" val={selectedReg.food} icon={Clock} />
                                    <DetailItem label="Squad Size" val={`${selectedReg.teamsize} Person(s)`} icon={Users} />
                                    <DetailItem label="Squad Members" val={selectedReg.teammembers} icon={Users} />
                                </div>

                                {/* Operations Hub (Events) */}
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Laptop size={16} className="text-fuchsia-400" />
                                        <h4 className="text-xs font-black uppercase tracking-widest italic">Operations Hub</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedReg.techevents?.split(',').map(ev => (
                                            <span key={ev} className="px-2.5 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-[10px] font-bold rounded-lg uppercase tracking-tight">
                                                {ev.trim()}
                                            </span>
                                        ))}
                                        {selectedReg.nontechevents?.split(',').map(ev => (
                                            <span key={ev} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold rounded-lg uppercase tracking-tight">
                                                {ev.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {(selectedReg.ppttitle || selectedReg.pptlink) && (
                                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FileText size={14} className="text-cyan-400" />
                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-cyan-400/70">PPT Manifest</h5>
                                            </div>
                                            <DetailItem label="Presentation Title" val={selectedReg.ppttitle} />
                                            <DetailItem label="Manifest Link" val="View Presentation" isLink href={selectedReg.pptlink} icon={ExternalLink} />
                                        </div>
                                    )}
                                </div>

                                {/* Payment Log */}
                                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={18} className="text-fuchsia-400" />
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">Electronic Transaction Log</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <DetailItem label="Payment Route" val={selectedReg.paymentmode} />
                                        <DetailItem label="Transaction ID" val={selectedReg.transactionid} />
                                        <DetailItem label="Payer ID" val={selectedReg.payername} />
                                        <DetailItem label="Amount Due" val={`₹${selectedReg.totalamount}`} />
                                        <DetailItem label="College ID Copy" val="View ID Card" isLink href={selectedReg.collegeidlink} icon={LinkIcon} />
                                        <DetailItem label="Visual Proof" val="Open Screenshot" isLink href={selectedReg.screenshotlink} icon={ExternalLink} />
                                    </div>
                                    <div className="flex gap-4 pt-4 border-t border-white/5">
                                        <button 
                                            onClick={() => updateStatus(selectedReg.registrationid, "PAID (VERIFIED)")}
                                            disabled={isUpdating || selectedReg.paymentstatus === "PAID (VERIFIED)"}
                                            className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-50"
                                        >
                                            {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <><CheckCircle2 size={16} /> Confirm Verif</>}
                                        </button>
                                        <button 
                                            onClick={() => updateStatus(selectedReg.registrationid, "PENDING")}
                                            disabled={isUpdating}
                                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
                                        >
                                            Mark Pending
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DetailItem = ({ label, val, isLink, href, icon: Icon }) => (
    <div className="space-y-1 group">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
            {Icon && <Icon size={10} />} {label}
        </label>
        {isLink && val && val !== "N/A" ? (
            <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors flex items-center gap-1.5 underline underline-offset-4 decoration-fuchsia-500/30">
                {val} <ExternalLink size={12} />
            </a>
        ) : (
            <p className="text-sm font-medium text-white group-hover:text-fuchsia-100 transition-colors">{val || "N/A"}</p>
        )}
    </div>
);

export default AdminDashboard;
