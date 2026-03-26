import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Globe, TrendingUp, Handshake, MapPin, Clock, ArrowRight, FileText, Check, Sparkles, Pencil, Loader2, ArrowLeft } from 'lucide-react';
import PageShell from '../components/pageshell';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  age: '',
  qualification: '',
  experience: '',
  address: '',
  current_ctc: '',
  expected_ctc: '',
  linkedin: '',
  portfolio: '',
  message: '',
  cv: null,
};

// Which fields can be auto-filled from the resume parser
const AUTOFILL_KEYS = ['name', 'email', 'phone', 'linkedin', 'qualification', 'experience'];

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const res = await fetch(`${apiUrl}/jobs/`);
    const jobs = await res.json();
    return { props: { jobs } };
  } catch {
    return { props: { jobs: [] } };
  }
}

export default function CareersPage({ jobs = [] }) {
  const fileInputRef = useRef(null);

  // Core state
  const [selectedJob, setSelectedJob] = useState(null);
  const [step, setStep] = useState('upload');        // 'upload' | 'choose' | 'form'
  const [form, setForm] = useState(INITIAL_FORM);
  const [autoFilledKeys, setAutoFilledKeys] = useState([]); // which fields were auto-filled

  // UI state
  const [status, setStatus] = useState(null);         // null | 'loading' | 'parsing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  /* ---------- File handling ---------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file only.');
      setForm((f) => ({ ...f, cv: null }));
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setErrorMessage('');
      setForm((f) => ({ ...f, cv: file }));
    }
  };

  const handleContinueWithResume = () => {
    if (!form.cv) return setErrorMessage('Please upload a PDF resume first.');
    setErrorMessage('');
    setStep('choose');
  };

  /* ---------- Auto-fill from resume ---------- */
  const handleAutoFill = async () => {
    setStatus('parsing');
    setErrorMessage('');

    const fd = new FormData();
    fd.append('cv', form.cv);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/parse-resume/`, {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        const parsed = await res.json();
        const filled = [];
        setForm((f) => {
          const updated = { ...f };
          for (const key of AUTOFILL_KEYS) {
            if (parsed[key]) {
              updated[key] = parsed[key];
              filled.push(key);
            }
          }
          return updated;
        });
        setAutoFilledKeys(filled);
        setStatus(null);
        setStep('form');
      } else {
        let detail = `HTTP ${res.status}`;
        try {
          const err = await res.json();
          detail = err.error || JSON.stringify(err);
        } catch { /* not json */ }
        setErrorMessage(`Resume parsing failed: ${detail}`);
        setStatus(null);
      }
    } catch (err) {
      console.error('Parse resume error:', err);
      setErrorMessage(`Failed to parse resume: ${err.message}`);
      setStatus(null);
    }
  };

  const handleFillManually = () => {
    setAutoFilledKeys([]);
    setStep('form');
  };

  /* ---------- Submit application ---------- */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.cv) return setErrorMessage('Resume (PDF) is required.');

    setStatus('loading');
    setErrorMessage('');

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('age', form.age);
    fd.append('qualification', form.qualification);
    fd.append('experience', form.experience);
    fd.append('address', form.address);
    fd.append('current_ctc', form.current_ctc);
    fd.append('expected_ctc', form.expected_ctc);
    fd.append('linkedin', form.linkedin || '');
    fd.append('portfolio', form.portfolio || '');
    fd.append('message', form.message || '');
    fd.append('job_title', selectedJob.title);
    fd.append('cv', form.cv);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/apply/`, {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setAutoFilledKeys([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setTimeout(() => {
          setSelectedJob(null);
          setStep('upload');
          setStatus(null);
        }, 3500);
      } else {
        let detail = `HTTP ${res.status}`;
        try {
          const errorData = await res.json();
          detail = JSON.stringify(errorData);
        } catch {
          // response wasn't JSON
        }
        setErrorMessage(`Error: ${detail}`);
        setStatus('error');
      }
    } catch (err) {
      console.error('Application submit error:', err);
      setStatus('error');
      setErrorMessage(
        `Application failed: ${err.message}. Ensure the backend server is running on http://127.0.0.1:8000 and CORS is enabled.`
      );
    }
  }

  /* ---------- Reset helpers ---------- */
  const resetToListings = () => {
    setSelectedJob(null);
    setStep('upload');
    setStatus(null);
    setErrorMessage('');
    setForm(INITIAL_FORM);
    setAutoFilledKeys([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const goBackToUpload = () => {
    setStep('upload');
    setStatus(null);
    setErrorMessage('');
    setAutoFilledKeys([]);
    // keep the cv file attached
  };

  const goBackToChoose = () => {
    setStep('choose');
    setStatus(null);
    setErrorMessage('');
    // reset form fields but keep cv
    setForm((f) => ({ ...INITIAL_FORM, cv: f.cv }));
    setAutoFilledKeys([]);
  };

  /* ---------- Shared classes ---------- */
  const inputCls =
    'w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF]/30 transition-all placeholder:text-slate-500';

  const autoFillCls =
    'w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF]/30 transition-all placeholder:text-slate-500 shadow-[0_0_12px_rgba(0,224,255,0.08)]';

  const inputClass = (key) => (autoFilledKeys.includes(key) ? autoFillCls : inputCls);

  /* ---------- Shared sub-components ---------- */
  const Spinner = () => (
    <Loader2 className="animate-spin w-5 h-5" />
  );

  const ErrorBanner = () =>
    errorMessage ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
      >
        {errorMessage}
      </motion.p>
    ) : null;

  const SuccessBanner = () =>
    status === 'success' ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-emerald-400 text-sm bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20"
      >
        Application Sent Successfully! 🚀
      </motion.p>
    ) : null;

  /* ---------- Step indicator ---------- */
  const StepIndicator = () => {
    const steps = [
      { key: 'upload', label: 'Upload Resume' },
      { key: 'choose', label: 'Fill Mode' },
      { key: 'form', label: 'Application' },
    ];
    const currentIdx = steps.findIndex((s) => s.key === step);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${i <= currentIdx
                  ? 'bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                ${i < currentIdx
                  ? 'bg-[#00E0FF] text-black'
                  : i === currentIdx
                    ? 'bg-[#00E0FF]/20 text-[#00E0FF]'
                    : 'bg-slate-800 text-slate-500'}`}
              >
                {i < currentIdx ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 h-px ${i < currentIdx ? 'bg-[#00E0FF]/40' : 'bg-slate-800'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <PageShell
      eyebrow="Join the Team"
      title="Build the Future with Giggs"
      description="We're building the next generation of intelligent digital systems. Join a team of engineers, data scientists, and innovators shaping the future of enterprise technology."
      videoSrc="/hero/performance.mp4"
      videoOpacity={0.5}
      align="center"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* ─── WHO WE ARE ─── */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <span className="text-[#00E0FF] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#00E0FF]/20 bg-[#00E0FF]/5">
                  About the Firm
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-8 leading-[1.1]">
                Engineering <span className="text-[#00E0FF]">Global Solutions</span> at Scale.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Giggs is a premier technology partner for the world&rsquo;s most ambitious enterprises. From our hubs in the USA, India, Saudi Arabia, and the UAE, we build digital infrastructure that powers global commerce, cybersecurity, and AI-driven automation.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-4 rounded-3xl bg-slate-900/40 border border-slate-800">
                    <p className="text-white font-bold text-sm">Multi-National Presence</p>
                    <p className="text-slate-500 text-xs">USA • MENA • SE Asia</p>
                 </div>
                 <div className="px-6 py-4 rounded-3xl bg-slate-900/40 border border-slate-800">
                    <p className="text-white font-bold text-sm">Enterprise Partners</p>
                    <p className="text-slate-500 text-xs">Fortune 500 Clients</p>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3.5rem] overflow-hidden border border-[#00E0FF]/10 shadow-[0_0_50px_rgba(0,224,255,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/20 to-[#00E0FF]/5 z-10" />
              <div className="absolute inset-0 bg-[url('/hero/grid.png')] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                 <div className="w-full h-full rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-[#00E0FF]/5 blur-[80px] rounded-full group-hover:opacity-100 opacity-60 transition-opacity" />
                    <div className="text-center relative z-10 px-6">
                       <div className="w-16 h-1 bg-[#00E0FF] mx-auto mb-8 rounded-full" />
                       <h3 className="text-2xl font-bold text-white mb-4">Innovation First</h3>
                       <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">We architect systems that define the next decade of enterprise intelligence.</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── WHY WORK WITH US ─── */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Join Giggs?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00E0FF] to-transparent mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We provide the environment for you to do the best work of your career, with the autonomy to innovate and the support to grow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-8 h-8 text-[#00E0FF]" />,
                title: 'High-Impact Work',
                desc: 'Deploy solutions for global enterprises that handle millions of transactions and protect critical infrastructure.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#00E0FF]" />,
                title: 'Growth Trajectory',
                desc: 'Access learning budgets, mentorship from industry veterans, and clear leadership pathways within a fast-scaling firm.'
              },
              {
                icon: <Globe className="w-8 h-8 text-[#00E0FF]" />,
                title: 'Global Flexibility',
                desc: 'We value results over office hours. Work with a distributed team across some of the most vibrant tech hubs in the world.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-slate-900/30 border border-slate-800 hover:border-[#00E0FF]/30 hover:bg-slate-900/60 transition-all group"
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-[#00E0FF]/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00E0FF]/10 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── OUR CULTURE ─── */}
        <section className="mb-40">
          <div className="p-16 rounded-[4rem] bg-slate-950/40 border border-white/5 backdrop-blur-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00E0FF]/5 to-transparent -z-10" />
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Built on <span className="text-[#00E0FF]">Excellence.</span></h2>
                <div className="space-y-8">
                  {[
                    { t: 'Radical Transparency', d: 'We share everything—from technical roadmaps to company financials—with the entire team.' },
                    { t: 'Code as Craft', d: 'We prioritize elegant architecture, robust testing, and clean design patterns in everything we ship.' },
                    { t: 'Diverse Perspectives', d: 'Our strength comes from our global footprint, blending cultural insights with technical mastery.' }
                  ].map((culture, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#00E0FF] flex-shrink-0 shadow-[0_0_10px_#00E0FF]" />
                      <div>
                        <h4 className="text-white font-bold text-lg mb-2">{culture.t}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{culture.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-16">
                  <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                     <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                    <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                     <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CURRENT OPENINGS ─── */}
        <section id="openings" className="mb-20">
        <AnimatePresence mode="wait">
          {!selectedJob ? (
            /* ========== JOB LISTINGS ========== */
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">Current Openings</h3>

              {jobs.length === 0 ? (
                <div className="text-slate-400 text-center py-10">No open positions at the moment. Check back soon!</div>
              ) : jobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ scale: 1.015 }}
                  onClick={() => setSelectedJob(job)}
                  className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-[#00E0FF] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-[#00E0FF] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{job.description}</p>
                    </div>
                    <span className="text-slate-500 group-hover:translate-x-1 group-hover:text-[#00E0FF] transition-all mt-1 flex items-center">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* ========== APPLICATION FLOW ========== */
            <motion.div
              key="application"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <button
                onClick={resetToListings}
                className="text-xs text-slate-500 hover:text-white mb-6 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to openings
              </button>

              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">{selectedJob.title}</span>
                  </h2>
                  <p className="flex items-center gap-1.5 text-slate-400 text-sm mt-2">
                    <MapPin className="w-3.5 h-3.5" /> {selectedJob.location} <span className="mx-1">&bull;</span> <Clock className="w-3.5 h-3.5" /> {selectedJob.type}
                  </p>
                </div>

                {/* Step indicator */}
                <StepIndicator />

                <AnimatePresence mode="wait">
                  {/* ──────── STEP 1: Upload Resume ──────── */}
                  {step === 'upload' && (
                    <motion.div
                      key="step-upload"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-2">
                        <p className="text-slate-300 text-sm">Start by uploading your resume. We&rsquo;ll use it to speed up your application.</p>
                      </div>

                      <div className="group relative border-2 border-dashed border-slate-800 hover:border-[#00E0FF]/50 rounded-2xl p-12 text-center bg-slate-950/50 transition-colors">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div>
                          <FileText className="w-10 h-10 mx-auto mb-3 text-slate-400 group-hover:text-[#00E0FF] transition-colors" />
                          <p className="text-slate-300 font-medium text-lg">
                            {form.cv ? form.cv.name : 'Drop your PDF resume here or click to browse'}
                          </p>
                          <p className="text-slate-500 text-xs mt-2">PDF Only • Max 5MB</p>
                        </div>
                      </div>

                      {form.cv && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <Check className="text-emerald-400 w-5 h-5" />
                          <span className="text-emerald-300 text-sm font-medium">{form.cv.name}</span>
                          <span className="text-emerald-500/60 text-xs ml-auto">{(form.cv.size / 1024).toFixed(0)} KB</span>
                        </motion.div>
                      )}

                      <ErrorBanner />

                      <button
                        type="button"
                        onClick={handleContinueWithResume}
                        disabled={!form.cv}
                        className="w-full bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF] hover:from-[#00C2FF] hover:to-[#6A4BEF] text-black font-bold py-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,224,255,0.15)] hover:shadow-[0_0_40px_rgba(0,224,255,0.3)]"
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {/* ──────── STEP 2: Choose Fill Mode ──────── */}
                  {step === 'choose' && (
                    <motion.div
                      key="step-choose"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-2">
                        <p className="text-slate-300 text-sm">How would you like to fill in your application details?</p>
                      </div>

                      {/* Resume file badge */}
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-300 text-sm font-medium truncate">{form.cv?.name}</span>
                        <button
                          type="button"
                          onClick={goBackToUpload}
                          className="ml-auto text-xs text-slate-500 hover:text-white transition-colors"
                        >
                          Change
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Auto-fill option */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAutoFill}
                          disabled={status === 'parsing'}
                          className="group p-6 rounded-2xl border-2 border-[#00E0FF]/30 bg-[#00E0FF]/5 hover:bg-[#00E0FF]/10 hover:border-[#00E0FF]/60 transition-all text-left disabled:opacity-50"
                        >
                          <Sparkles className="w-8 h-8 mb-3 text-[#00E0FF]" />
                          <h4 className="text-white font-bold text-lg mb-1">Auto-fill from Resume</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            We&rsquo;ll extract your details from the resume. You can still edit everything before submitting.
                          </p>
                          {status === 'parsing' && (
                            <div className="flex items-center gap-2 mt-3 text-[#00E0FF] text-sm">
                              <Spinner /> Parsing resume...
                            </div>
                          )}
                        </motion.button>

                        {/* Manual option */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleFillManually}
                          disabled={status === 'parsing'}
                          className="group p-6 rounded-2xl border-2 border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 transition-all text-left disabled:opacity-50"
                        >
                          <Pencil className="w-8 h-8 mb-3 text-slate-400 group-hover:text-white transition-colors" />
                          <h4 className="text-white font-bold text-lg mb-1">Fill Manually</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Type in your details yourself. Your resume will still be attached to the application.
                          </p>
                        </motion.button>
                      </div>

                      <ErrorBanner />
                    </motion.div>
                  )}

                  {/* ──────── STEP 3: Application Form ──────── */}
                  {step === 'form' && (
                    <motion.div
                      key="step-form"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Back to choose step */}
                      <button
                        type="button"
                        onClick={goBackToChoose}
                        className="text-xs text-slate-500 hover:text-white mb-4 transition-colors flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Change fill mode
                      </button>



                      {/* Resume badge */}
                      <div className="flex items-center gap-3 p-3 mb-5 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-300 text-sm font-medium truncate">{form.cv?.name}</span>
                        <span className="text-slate-500/60 text-xs ml-auto">{form.cv ? `${(form.cv.size / 1024).toFixed(0)} KB` : ''}</span>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Section: Personal Info */}
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Personal Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input required placeholder="Full Name *" className={inputClass('name')} value={form.name} onChange={set('name')} />
                          <input required type="email" placeholder="Email *" className={inputClass('email')} value={form.email} onChange={set('email')} />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <input required placeholder="Phone Number *" className={inputClass('phone')} value={form.phone} onChange={set('phone')} />
                          <input required type="number" min="18" max="65" placeholder="Age *" className={inputCls} value={form.age} onChange={set('age')} />
                          <input required placeholder="Qualification *" className={inputClass('qualification')} value={form.qualification} onChange={set('qualification')} />
                        </div>
                        <textarea
                          required
                          placeholder="Full Address *"
                          rows="2"
                          className={`${inputClass('address')} resize-none`}
                          value={form.address}
                          onChange={set('address')}
                        />

                        {/* Section: Professional Details */}
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1 pt-2">Professional Details</p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <input required placeholder="Experience * (e.g. 3 years)" className={inputClass('experience')} value={form.experience} onChange={set('experience')} />
                          <input required placeholder="Current CTC * (e.g. 5 LPA)" className={inputCls} value={form.current_ctc} onChange={set('current_ctc')} />
                          <input required placeholder="Expected CTC * (e.g. 8 LPA)" className={inputCls} value={form.expected_ctc} onChange={set('expected_ctc')} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input placeholder="LinkedIn URL (Optional)" className={inputClass('linkedin')} value={form.linkedin} onChange={set('linkedin')} />
                          <input placeholder="Portfolio URL (Optional)" className={inputCls} value={form.portfolio} onChange={set('portfolio')} />
                        </div>

                        <textarea
                          placeholder="Why do you want to join us? (Optional)"
                          rows="3"
                          className={`${inputCls} resize-none`}
                          value={form.message}
                          onChange={set('message')}
                        />

                        {/* Status Messages */}
                        <ErrorBanner />
                        <SuccessBanner />

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF] hover:from-[#00C2FF] hover:to-[#6A4BEF] text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(0,224,255,0.15)] hover:shadow-[0_0_40px_rgba(0,224,255,0.3)]"
                        >
                          {status === 'loading' ? (
                            <span className="flex items-center justify-center gap-2">
                              <Spinner />
                              Processing...
                            </span>
                          ) : (
                            'Submit Application →'
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </section>
      </div>
    </PageShell>
  );
}