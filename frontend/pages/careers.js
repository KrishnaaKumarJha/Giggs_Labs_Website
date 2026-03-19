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
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* ─── LIFE AT GIGGS ─── */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4 whitespace-nowrap">Life at Giggs</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
            At Giggs, we believe great engineering happens when brilliant minds are given the freedom to innovate, the tools to excel, and a culture that values impact over process.
          </p>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            {[
              {
                icon: <Rocket className="w-6 h-6 text-[#00E0FF]" />,
                title: 'Engineering-First Culture',
                desc: 'Work on cutting-edge AI, cybersecurity, and cloud-native systems with a team that values deep technical craft.',
              },
              {
                icon: <Globe className="w-6 h-6 text-[#00E0FF]" />,
                title: 'Remote-First, Global Team',
                desc: 'Collaborate with engineers across India, Saudi Arabia, Singapore, UAE, and the USA — work from anywhere.',
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-[#00E0FF]" />,
                title: 'Growth & Learning',
                desc: 'Continuous learning through mentorship, conference sponsorship, internal tech talks, and hands-on R&D projects.',
              },
              {
                icon: <Handshake className="w-6 h-6 text-[#00E0FF]" />,
                title: 'Impact That Matters',
                desc: 'Ship solutions that power enterprises at scale — your work directly transforms how global businesses operate.',
              },
            ].map((perk) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-[#00E0FF]/30 hover:bg-slate-900/60"
              >
                <div className="mb-3">{perk.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
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
      </div>
    </PageShell>
  );
}