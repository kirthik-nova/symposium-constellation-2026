import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { QRCodeCanvas } from 'qrcode.react';
import { toast, Toaster } from 'sonner';
import {
  Loader2, CheckCircle, Download, CreditCard, User, Building,
  Laptop, FileText, MessageCircle, Info, CalendarX, MapPin, Sparkles, Send, Upload, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton'; // Assume we have it! 

// --- CONFIGURATION ---
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzEyH3Zn0RItAMMoQmufFsK0bgboujjPGZSj93dgut4k3HL_Z-ESO11m-Oq39UU2ylq/exec"
const IS_REGISTRATION_OPEN = true; // Toggle for testing

// =======================
// VALIDATION SCHEMA
// =======================
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number too short").max(15, "Phone number too long").regex(/^[\d+\-\s]*$/, "Invalid characters in phone number"),
  teamSize: z.enum(["2", "3", "4"], { required_error: "Select team size" }),
  teamMembers: z.string().min(3, "At least one team member name is required"),
  college: z.string().min(2, "College Name is required"),
  department: z.string().min(1, "Department is required"),
  otherDepartment: z.string().optional(),
  year: z.string().min(1, "Year is required"),
  collegeIdLink: z.string().min(5, "A valid link (Drive/Cloud) is required"),
  email: z.string().email("Invalid email address"),
  techEvents: z.array(z.string()).refine((val) => val.length > 0, "Select at least one Technical Event"),
  nonTechEvents: z.array(z.string()).max(1, "Only 1 Non-Technical event allowed").optional(),

  pptTitle: z.string().optional(),
  pptLink: z.string().optional(),
  food: z.string().optional(),
  payerName: z.string().optional(),
  payerUPI: z.string().optional(),
  screenshotLink: z.string().optional(),

  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionId: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.department === "Others" && (!data.otherDepartment || data.otherDepartment.trim() === "")) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify your department", path: ["otherDepartment"] });
  }
  if (data.techEvents.includes("PPT")) {
    if (!data.pptTitle || data.pptTitle.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Paper Title is required for PPT", path: ["pptTitle"] });
    }
    if (!data.pptLink || data.pptLink.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Presentation Link is required", path: ["pptLink"] })
    }
  }

  if (data.paymentMode === "ONLINE") {
    if (!data.transactionId || data.transactionId.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Transaction ID is required", path: ["transactionId"] });
    } else if (!/^\d{12}$/.test(data.transactionId.trim()) && !/^[A-Z0-9]{10,20}$/i.test(data.transactionId.trim())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid ID. Enter valid 12-digit UTR/Ref Number.", path: ["transactionId"] })
    }
    if (!data.payerUPI || data.payerUPI.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Your UPI ID is required (e.g., name@oksbi)", path: ["payerUPI"] });
    } else if (!data.payerUPI.includes("@")) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid UPI ID. Must contain '@'", path: ["payerUPI"] });
    }
    if (!data.screenshotLink || data.screenshotLink.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Screenshot Link is required", path: ["screenshotLink"] });
    }
  }

  // Arunai-Only Restriction for Non-Tech
  if (data.nonTechEvents && data.nonTechEvents.length > 0) {
    if (!data.college || !data.college.toLowerCase().includes("arunai")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Non-Technical events are exclusive to Arunai Engineering College students.",
        path: ["nonTechEvents"]
      });
    }
  }
});

const TECH_EVENTS = ["PPT", "Myth Buster", "Brain Auction"];
const NON_TECH_EVENTS = ["Dumb Charades", "Meme It Up", "Cook with Friends"]; // Updated to match previous Events names!

/* ── UI HELPERS ────────────────────── */
const InputField = React.forwardRef(({ label, error, required, icon: Icon, ...props }, ref) => (
  <div className="space-y-1.5 w-full">
    <label className="flex items-center text-sm font-semibold text-gray-300">
      {Icon && <Icon size={14} className="mr-2 text-fuchsia-400" />}
      {label} {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <div className="relative group">
      <input
        ref={ref}
        {...props}
        className={`w-full bg-white/5 border backdrop-blur-md rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 transition-all duration-300 outline-none
          ${error ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400' : 'border-white/10 focus:border-fuchsia-500 hover:bg-white/10 focus:bg-white/10 focus:ring-1 focus:ring-fuchsia-500 group-hover:border-white/20'}`}
      />
    </div>
    {error && <p className="text-xs text-red-400 mt-1 pl-1 flex items-center gap-1"><Info size={10} /> {error}</p>}
  </div>
));
InputField.displayName = "InputField";

const SelectField = ({ label, value, onChange, options, error, icon: Icon, required, placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-1.5 w-full relative" ref={containerRef}>
      <label className="flex items-center text-sm font-semibold text-gray-300">
        {Icon && <Icon size={14} className="mr-2 text-fuchsia-400" />}
        {label} {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border backdrop-blur-md rounded-xl px-4 py-3.5 text-white flex items-center justify-between cursor-pointer transition-all duration-300
          ${isOpen ? 'border-fuchsia-500 ring-1 ring-fuchsia-500 bg-white/10' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}
          ${error ? 'border-red-500/50' : ''}`}
      >
        <span className={selectedOption ? "text-white" : "text-white/20"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <Info size={14} className="text-gray-500" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[120] w-full mt-2 bg-black/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between
                    ${value === opt.value ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="font-medium">{opt.label}</span>
                  {value === opt.value && <CheckCircle size={14} />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="text-xs text-red-400 mt-1 pl-1 flex items-center gap-1"><Info size={10} /> {error}</p>}
    </div>
  );
};

const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-1">
      <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(232,61,232,0.2)]">
        <Icon size={20} />
      </div>
      <h3 className="text-2xl font-black text-white font-heading tracking-tight">{title}</h3>
    </div>
    {subtitle && <p className="text-sm font-light text-gray-400 ml-11">{subtitle}</p>}
  </div>
);

/* ────────────────────────────────── */

const RegistrationContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regData, setRegData] = useState(null);
  const [showDomainInfo, setShowDomainInfo] = useState(false);
  const qrRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techEvents: [], nonTechEvents: [], paymentMode: "OFFLINE",
      pptTitle: "", pptLink: "", transactionId: "", name: "", email: "",
      phone: "+91 ", teamSize: "2", teamMembers: "", college: "",
      department: "", otherDepartment: "", year: "I", collegeIdLink: "", food: "Veg"
    },
  });

  const { watch, setValue, register, formState: { errors }, handleSubmit, getValues } = form;
  const techEvents = watch("techEvents");
  const nonTechEvents = watch("nonTechEvents");
  const paymentMode = watch("paymentMode");
  const isPPT = techEvents.includes("PPT");
  const teamSize = watch("teamSize");

  const totalHead = parseInt(teamSize || "1");
  const basePrice = totalHead * 100;
  const totalPrice = paymentMode === "OFFLINE" ? basePrice + 50 : basePrice;

  useEffect(() => { if (isPPT) setShowDomainInfo(true); }, [isPPT]);

  const toggleTech = (event) => {
    const current = getValues("techEvents");
    if (current.includes(event)) {
      setValue("techEvents", current.filter(e => e !== event), { shouldValidate: true });
    } else {
      if (current.length >= 2) return toast.error("Only 2 technical events allowed");
      setValue("techEvents", [...current, event], { shouldValidate: true });
    }
  };

  const toggleNonTech = (event) => {
    const college = getValues("college");
    if (!college || !college.toLowerCase().includes("arunai")) {
      return toast.error("Non-Technical events are exclusive to Arunai Engineering College participants.", {
        description: "Only internal students from our base can participate in these battlefronts.",
        duration: 4000
      });
    }

    const current = getValues("nonTechEvents") || [];
    if (current.includes(event)) {
      setValue("nonTechEvents", current.filter(e => e !== event), { shouldValidate: true });
    } else {
      if (current.length >= 1) return toast.error("Only 1 non-technical event allowed");
      setValue("nonTechEvents", [...current, event], { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    if (!APPS_SCRIPT_URL) return toast.error("Configuration Error: Backend URL missing.");
    setIsSubmitting(true);
    try {
      const payload = {
        regId: "PENDING", name: data.name, email: data.email, phone: data.phone,
        teamSize: data.teamSize, teamMembers: data.teamMembers,
        department: data.department === "Others" ? data.otherDepartment : data.department,
        college: data.college, year: data.year, collegeIdLink: data.collegeIdLink, food: data.food,
        techEvents: data.techEvents, nonTechEvents: data.nonTechEvents || [],
        pptTitle: isPPT ? data.pptTitle : "", pptLink: isPPT ? data.pptLink : "",
        paymentMode: data.paymentMode,
        payerName: data.paymentMode === "ONLINE" ? data.payerName : "",
        payerUPI: data.paymentMode === "ONLINE" ? data.payerUPI : "",
        screenshotLink: data.paymentMode === "ONLINE" ? data.screenshotLink : "",
        totalAmount: totalPrice, transactionId: data.paymentMode === "ONLINE" ? data.transactionId : "",
      };

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.status === "success") {
        setRegData({ ...payload, regId: result.regId, qrContent: result.qrContent });
        setIsSuccess(true);
        toast.success("Registration Successful! Check your email.");
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url; a.download = `Constellation2k26_QR_${regData?.regId}.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  /* ────────────────────────────────── */
  /* SUCCESS SCREEN                     */
  /* ────────────────────────────────── */
  if (isSuccess && regData) {
    return (
      <section className="py-12 sm:py-16 relative z-10 flex items-center justify-center min-h-[60vh]">
        <Toaster theme="dark" position="top-center" richColors />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md px-4">
          <div className="glass-premium rounded-[2rem] p-8 sm:p-10 border-fuchsia-500/30 overflow-hidden relative shadow-[0_0_50px_rgba(232,61,232,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500" />

            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="p-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-black font-heading text-white tracking-tight">Mission Confirmed!</h2>
                <p className="text-gray-400 font-light mt-1">Welcome to Constellation 2K26</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl mx-auto w-fit shadow-[0_0_30px_rgba(255,255,255,0.1)]" ref={qrRef}>
              <QRCodeCanvas value={`https://constellation2k26.com/ticket?id=${regData.regId}`} size={180} level="H" includeMargin />
            </div>

            <div className="text-center space-y-1 mt-6 mb-8">
              <p className="font-mono text-2xl font-black tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,61,232,0.5)]">{regData.regId}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Registration Tag</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-8 bg-black/40 rounded-xl p-4 border border-white/5">
              <div><span className="text-gray-500 text-xs uppercase font-bold block mb-0.5">Name</span><span className="text-white font-medium">{regData.name}</span></div>
              <div><span className="text-gray-500 text-xs uppercase font-bold block mb-0.5">Team Size</span><span className="text-white font-medium">{regData.teamSize} Squad</span></div>
              <div><span className="text-gray-500 text-xs uppercase font-bold block mb-0.5">Payment</span><span className={`font-mono font-bold ${regData.paymentMode === 'ONLINE' ? 'text-green-400' : 'text-yellow-400'}`}>{regData.paymentMode}</span></div>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => window.open('https://chat.whatsapp.com/BUvc9J9f2oc5cI5kyAz3NQ', '_blank')} className="w-full h-12 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <MessageCircle size={18} /> Join Briefing Comm Link
              </button>
              <button onClick={downloadQR} className="w-full h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-bold flex items-center justify-center gap-2 hover:bg-fuchsia-500/20 transition-colors">
                <Download size={18} /> Save Boarding Pass
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ────────────────────────────────── */
  /* CLOSED SCREEN                      */
  /* ────────────────────────────────── */
  if (!IS_REGISTRATION_OPEN) {
    return (
      <section className="py-12 sm:py-16 relative z-10 flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg px-4">
          <div className="glass-premium rounded-[2rem] p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />

            <div className="mx-auto bg-red-500/10 p-5 rounded-full w-fit mb-6 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
              <CalendarX className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-4xl font-black font-heading tracking-tight text-white mb-4">Registration <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Offline</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Online boarding for Constellation 2K26 has officially closed. But the mission isn't over.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 relative group">
              <div className="absolute inset-0 bg-fuchsia-500/5 group-hover:bg-fuchsia-500/10 transition-colors duration-500 rounded-2xl pointer-events-none" />
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-fuchsia-400" /> Final Chance!
              </h3>
              <p className="text-gray-400 mb-5">You can still secure your spot by registering directly at the venue baseline.</p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-fuchsia-500/20 rounded-full border border-fuchsia-500/30 text-fuchsia-300 font-semibold shadow-[0_0_15px_rgba(232,61,232,0.15)]">
                <MapPin className="w-4 h-4" /> On-Spot Registration Available
              </div>
            </div>

            <button onClick={() => window.open('https://chat.whatsapp.com/BUvc9J9f2oc5cI5kyAz3NQ', '_blank')} className="w-full h-14 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <MessageCircle size={20} /> Override via WhatsApp Community
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ────────────────────────────────── */
  /* FORM SCREEN                        */
  /* ────────────────────────────────── */
  return (
    <section id="register" className="py-8 sm:py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">

        {/* Header - Hidden in Modal to save space on mobile */}
        {!isMobile && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 hidden md:block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-fuchsia-400 mb-6">
              <Upload size={12} /> Secure Your Spot
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-heading tracking-tighter mb-4">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-400">Registration</span>
            </h2>
            <p className="text-gray-400 text-lg font-light">Join the ultimate technical symposium.</p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <form onSubmit={handleSubmit(onSubmit, (err) => { toast.error("Please fill in all required fields correctly."); })} className="glass-premium rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 md:p-14 border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 sm:p-5 rounded-2xl flex items-start gap-4 mb-12 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <div className="p-3 bg-blue-500/20 rounded-xl shrink-0"><User className="text-blue-400" size={20} /></div>
              <p className="text-sm sm:text-base text-blue-200 leading-relaxed font-light mt-0.5">
                <strong className="font-bold text-white mr-2 tracking-wide">SQUAD PROTOCOL:</strong>
                Registration is closed to seniors. This event is <span className="text-fuchsia-400 font-bold uppercase tracking-wider">exclusively for First Year Students</span>. Any <span className="italic">ONE member (Team Leader)</span> can register for the entire squad.
              </p>
            </div>

            <div className="space-y-16">
              {/* SECTION: Personal */}
              <section>
                <SectionHeading icon={User} title="Agent Profile" subtitle="Primary contact & squad details." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                  <InputField label="Full Name / Team Leader" required {...register("name")} placeholder="Cmdr. John Doe" error={errors.name?.message} />
                  <InputField label="Email Address" required {...register("email")} placeholder="john@example.com" error={errors.email?.message} />

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-semibold text-gray-300">Squad Size <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { val: "2", label: "Duo" },
                        { val: "3", label: "Trio" },
                        { val: "4", label: "Squad" }
                      ].map((type) => (
                        <div
                          key={type.val}
                          onClick={() => setValue("teamSize", type.val)}
                          className={`cursor-pointer border px-4 py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 
                            ${teamSize === type.val ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-100 shadow-[0_0_15px_rgba(232,61,232,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                          <span className="font-bold">{type.label}</span>
                          <span className={`text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-black/50 ${teamSize === type.val ? 'text-fuchsia-400' : 'text-gray-500'}`}>₹{parseInt(type.val) * 100}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <InputField label="Team Members Names" required {...register("teamMembers")} placeholder="Operative 1, Operative 2, ..." error={errors.teamMembers?.message} />
                  </div>

                  <InputField label="Comms Line (Phone)" required {...register("phone")} placeholder="+91 98765 43210" error={errors.phone?.message} />

                  <SelectField
                    label="Ration Preference"
                    required
                    value={watch("food")}
                    onChange={(val) => setValue("food", val, { shouldValidate: true })}
                    options={[
                      { value: "Veg", label: "Vegetarian" },
                      { value: "Non-Veg", label: "Non-Vegetarian" }
                    ]}
                  />
                </div>
              </section>

              {/* SECTION: Academic */}
              <section>
                <SectionHeading icon={Building} title="Affiliation" subtitle="Academic origins." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                  <InputField label="Origin Base (College Name)" required {...register("college")} placeholder="Institute of Technology..." error={errors.college?.message} />
                  <SelectField
                    label="Division (Department)"
                    required
                    value={watch("department")}
                    onChange={(val) => setValue("department", val, { shouldValidate: true })}
                    error={errors.department?.message}
                    options={[
                      { value: "CSE", label: "CSE" },
                      { value: "IT", label: "IT" },
                      { value: "AIDS", label: "AIDS" },
                      { value: "AIML", label: "AIML" },
                      { value: "CYBER", label: "CYBER" },
                      { value: "EEE", label: "EEE" },
                      { value: "ECE", label: "ECE" },
                      { value: "MECH", label: "MECH" },
                      { value: "CIVIL", label: "CIVIL" },
                      { value: "BIO TECH", label: "BIO TECH" },
                      { value: "B.Tech Agriculture", label: "B.Tech Agriculture" },
                      { value: "BTech Chemical", label: "BTech Chemical" },
                      { value: "Others", label: "Others (Specify)" }
                    ]}
                  />

                  {watch("department") === "Others" && (
                    <InputField
                      label="Specify Department"
                      required
                      {...register("otherDepartment")}
                      placeholder="e.g. Biomedical"
                      error={errors.otherDepartment?.message}
                    />
                  )}

                  <SelectField
                    label="Clearance Level (Year)"
                    required
                    value={watch("year")}
                    onChange={(val) => setValue("year", val, { shouldValidate: true })}
                    error={errors.year?.message}
                    options={[
                      { value: "I", label: "Freshman (I) - Exclusive Access" }
                    ]}
                  />

                  <InputField label="ID Card Link (Google Drive)" required {...register("collegeIdLink")} placeholder="https://drive.google.com/..." error={errors.collegeIdLink?.message} />
                </div>
              </section>

              {/* SECTION: Events */}
              <section>
                <SectionHeading icon={Laptop} title="Event Parameters" subtitle="Select your battlegrounds." />

                {/* Tech Events */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-semibold text-gray-300">Technical Directives (Max 2) <span className="text-red-400">*</span></label>
                    <span className="text-xs font-mono text-fuchsia-400 px-2 py-0.5 rounded bg-fuchsia-500/10">{techEvents.length}/2</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TECH_EVENTS.map((event) => {
                      const active = techEvents.includes(event);
                      return (
                        <div key={event} onClick={() => toggleTech(event)} className={`cursor-pointer px-4 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group 
                          ${active ? 'bg-fuchsia-500/20 border-fuchsia-400 shadow-[0_0_15px_rgba(232,61,232,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                          <span className={`${active ? 'text-white font-bold' : 'text-gray-400'}`}>{event}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${active ? 'border-fuchsia-400 bg-fuchsia-400' : 'border-gray-600'}`}>
                            {active && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {errors.techEvents && <p className="text-xs text-red-400 mt-2 pl-1 flex items-center gap-1"><Info size={10} /> {errors.techEvents.message}</p>}
                </div>

                {/* PPT Conditonal */}
                <AnimatePresence>
                  {isPPT && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
                      <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-md relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-2xl" />
                        <div className="flex justify-between items-center mb-5">
                          <h4 className="text-cyan-400 font-bold flex items-center gap-2"><FileText size={18} /> PPT Loadout</h4>
                          <button type="button" onClick={() => setShowDomainInfo(!showDomainInfo)} className="text-xs text-cyan-500 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1">
                            <Info size={12} /> Allowed Domains
                          </button>
                        </div>

                        {/* Domain info toggle */}
                        <AnimatePresence>
                          {showDomainInfo && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="mb-5 p-4 rounded-xl bg-cyan-500/10 text-cyan-100 text-sm font-light border border-cyan-500/20 leading-relaxed shadow-inner">
                              <strong className="text-cyan-300 block mb-1">Approved Research Areas:</strong>
                              AI, ML & DL, Cyber Security, Cloud Computing, Data Science & Big Data, IoT, Blockchain, Generative AI, or highly creative technical equivalents.
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InputField label="Research Designation (Title)" required {...register("pptTitle")} placeholder="Project Title..." error={errors.pptTitle?.message} />
                          <InputField label="Data Core Link (Google Drive)" required {...register("pptLink")} placeholder="https://drive.google.com/..." error={errors.pptLink?.message} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Non-Tech Events */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-semibold text-gray-300">Non-Technical Directives (Max 1)</label>
                    <span className="text-xs font-mono text-gray-500 px-2 py-0.5 rounded bg-white/5">{(nonTechEvents || []).length}/1</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {NON_TECH_EVENTS.map((event) => {
                      const active = (nonTechEvents || []).includes(event);
                      return (
                        <div key={event} onClick={() => toggleNonTech(event)} className={`cursor-pointer px-4 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group 
                          ${active ? 'bg-white/20 border-white font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>
                          <span>{event}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${active ? 'border-white bg-white' : 'border-gray-600'}`}>
                            {active && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {errors.nonTechEvents && <p className="text-xs text-red-400 mt-2 pl-1 flex items-center gap-1"><Info size={10} /> {errors.nonTechEvents.message}</p>}
                </div>
              </section>

              {/* SECTION: Payment */}
              <section className="bg-gradient-to-br from-black/50 to-white/[0.02] -mx-6 sm:-mx-10 md:-mx-14 px-6 sm:px-10 md:px-14 py-12 border-t border-white/5">
                <SectionHeading icon={CreditCard} title="Clearance Funds" subtitle="Payment processing." />

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Total Fee Assessment</h4>
                    <p className="text-green-300/80 font-mono text-sm">{totalHead} Operators Configured</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">₹{totalPrice}</div>
                    <p className="text-green-400/60 font-mono text-xs mt-1">₹100 Base Rate x {totalHead}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="text-sm font-semibold text-gray-300">Transaction Gateway <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div onClick={() => setValue("paymentMode", "ONLINE")} className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center
                      ${paymentMode === "ONLINE" ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02]' : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60'}`}>
                      <div className={`p-4 rounded-full ${paymentMode === "ONLINE" ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}><CreditCard size={28} /></div>
                      <span className={`font-bold tracking-wide ${paymentMode === "ONLINE" ? 'text-blue-200' : 'text-gray-300'}`}>Digital Link (UPI)</span>
                    </div>

                    <div onClick={() => setValue("paymentMode", "OFFLINE")} className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center
                      ${paymentMode === "OFFLINE" ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.15)] scale-[1.02]' : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60'}`}>
                      <div className={`p-4 rounded-full ${paymentMode === "OFFLINE" ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400'}`}><Building size={28} /></div>
                      <div>
                        <span className={`font-bold tracking-wide block ${paymentMode === "OFFLINE" ? 'text-yellow-200' : 'text-gray-300'}`}>On-Grid (Venue)</span>
                        <span className="inline-block mt-2 text-[10px] font-bold tracking-widest uppercase text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-500/20">+ ₹50 Handing Fee</span>
                      </div>
                    </div>
                  </div>
                  {errors.paymentMode && <p className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1"><Info size={10} /> {errors.paymentMode.message}</p>}
                </div>

                {/* Secure Online Form */}
                <AnimatePresence>
                  {paymentMode === "ONLINE" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="bg-blue-950/20 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">

                        <div className="flex flex-col md:flex-row gap-8 items-center mb-8 bg-black/40 p-6 rounded-2xl border border-white/5">
                          <div className="bg-white p-3 rounded-2xl w-fit">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=puviyarasisarathi63@okaxis&pn=Puviyarasi%20Sarathi&am=${totalPrice}&cu=INR`} alt="Payment QR" className="w-32 h-32 object-contain" />
                          </div>
                          <div className="text-center md:text-left">
                            <h4 className="text-blue-300 font-bold tracking-widest uppercase text-sm mb-1">Scan to Authenticate</h4>
                            <p className="text-2xl font-mono text-white tracking-widest mb-1">₹{totalPrice}</p>
                            <div className="inline-block px-3 py-1 bg-white/10 rounded-md font-mono text-sm text-gray-300 mt-2">puviyarasisarathi63@okaxis</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Operator Alias (UPI Name)" required {...register("payerName")} placeholder="John Doe" error={errors.payerName?.message} />
                          <InputField label="Source UPI ID" required {...register("payerUPI")} placeholder="name@oksbi" error={errors.payerUPI?.message} />
                          <div className="md:col-span-2">
                            <InputField label="Transaction ID / UTR" required {...register("transactionId")} placeholder="12-digit exact match" maxLength={20} error={errors.transactionId?.message} />
                          </div>
                          <div className="md:col-span-2">
                            <InputField label="Visual Proof (GDrive Link)" required {...register("screenshotLink")} placeholder="Screenshot link (public access)..." error={errors.screenshotLink?.message} />
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Submit CTA */}
              <div className="pt-8 flex justify-center border-t border-white/5 relative z-20">
                <MagneticButton className="w-full sm:w-auto">
                  <button type="submit" disabled={isSubmitting} className="group relative w-full sm:min-w-[280px] justify-center px-8 py-3.5 sm:py-5 bg-white text-black font-black text-base sm:text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center gap-3 disabled:opacity-50 disabled:pointer-events-none disabled:scale-100">
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> Verifying...</>
                    ) : (
                      <>
                        <span className="relative z-10">Confirm Registration</span>
                        <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </button>
                </MagneticButton>
              </div>

            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Registration = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[2.5rem] bg-[#030014] border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)] flex flex-col"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
              <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />

              {/* Subtle mesh lines */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
            </div>

            <div className="sticky top-0 right-0 w-full flex justify-between items-center p-6 z-[110] bg-[#030014]/80 backdrop-blur-md border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <Sparkles className="text-white w-full h-full" />
                </div>
                <h2 className="text-lg font-black font-heading text-white tracking-tight uppercase flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-fuchsia-400">Constellation</span>
                  <span className="hidden sm:inline text-white/30">|</span>
                  <span className="text-white">Registration Desk</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all active:scale-95 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sticky WhatsApp Help for Registration */}
            <motion.a
              href="https://chat.whatsapp.com/JJyxCwedZTnHCSFVvGxYGg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[120] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.5)] group"
              title="Need help with registration?"
            >
              <MessageCircle size={30} className="text-white" />
              <span className="absolute right-full mr-4 px-3 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                Need Help?
              </span>
            </motion.a>

            <div className="w-full relative z-10 px-4 sm:px-6 md:px-0 pb-12 mt-20 lg:mt-0">
              <RegistrationContent />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Registration;
