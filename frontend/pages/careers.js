import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/pageshell';

const JOBS = [
  {
    id: '1',
    title: 'Full Stack Developer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Expertise in Next.js, Django, and scalable systems. Work on cutting-edge web applications and deliver pixel-perfect user experiences.',
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    location: 'Greater Noida / Hybrid',
    type: 'Full-time',
    description: 'Focus on generative models, computer vision, and intelligent automation. Build AI-powered features that delight users.',
  },
];

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

export default function CareersPage() {
  const fileInputRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

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
      const res = await fetch('http://127.0.0.1:8000/api/apply/', {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setTimeout(() => {
          setSelectedJob(null);
          setStatus(null);
        }, 3500);
      } else {
        const errorData = await res.json();
        setErrorMessage(`Error: ${JSON.stringify(errorData)}`);
        setStatus('error');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Application failed. Ensure the backend server is running and CORS is enabled.');
    }
  }

  /* ---- Shared input class ---- */
  const inputCls =
    'w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF]/30 transition-all placeholder:text-slate-500';

  return (
    <PageShell
      eyebrow="Careers"
      title="Join the mission"
      description="Building the next generation of digital infrastructure. Explore our open roles and apply today."
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
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

              {JOBS.map((job) => (
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
                        <span className="text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300">
                          📍 {job.location}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300">
                          🕐 {job.type}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{job.description}</p>
                    </div>
                    <span className="text-slate-500 text-xl group-hover:translate-x-1 group-hover:text-[#00E0FF] transition-all mt-1">
                      →
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* ========== APPLICATION FORM ========== */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <button
                onClick={() => { setSelectedJob(null); setStatus(null); setErrorMessage(''); }}
                className="text-xs text-slate-500 hover:text-white mb-6 transition-colors flex items-center gap-1"
              >
                ← Back to openings
              </button>

              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">{selectedJob.title}</span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-2">📍 {selectedJob.location} &bull; 🕐 {selectedJob.type}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Section: Personal Info */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Personal Information</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input required placeholder="Full Name *" className={inputCls} value={form.name} onChange={set('name')} />
                    <input required type="email" placeholder="Email *" className={inputCls} value={form.email} onChange={set('email')} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <input required placeholder="Phone Number *" className={inputCls} value={form.phone} onChange={set('phone')} />
                    <input required type="number" min="18" max="65" placeholder="Age *" className={inputCls} value={form.age} onChange={set('age')} />
                    <input required placeholder="Qualification *" className={inputCls} value={form.qualification} onChange={set('qualification')} />
                  </div>
                  <textarea
                    required
                    placeholder="Full Address *"
                    rows="2"
                    className={`${inputCls} resize-none`}
                    value={form.address}
                    onChange={set('address')}
                  />

                  {/* Section: Professional Details */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1 pt-2">Professional Details</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <input required placeholder="Experience * (e.g. 3 years)" className={inputCls} value={form.experience} onChange={set('experience')} />
                    <input required placeholder="Current CTC * (e.g. 5 LPA)" className={inputCls} value={form.current_ctc} onChange={set('current_ctc')} />
                    <input required placeholder="Expected CTC * (e.g. 8 LPA)" className={inputCls} value={form.expected_ctc} onChange={set('expected_ctc')} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input placeholder="LinkedIn URL (Optional)" className={inputCls} value={form.linkedin} onChange={set('linkedin')} />
                    <input placeholder="Portfolio URL (Optional)" className={inputCls} value={form.portfolio} onChange={set('portfolio')} />
                  </div>

                  <textarea
                    placeholder="Why do you want to join us? (Optional)"
                    rows="3"
                    className={`${inputCls} resize-none`}
                    value={form.message}
                    onChange={set('message')}
                  />

                  {/* Resume Upload */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1 pt-2">Resume</p>
                  <div className="group relative border-2 border-dashed border-slate-800 hover:border-[#00E0FF]/50 rounded-2xl p-8 text-center bg-slate-950/50 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div>
                      <p className="text-3xl mb-2">📄</p>
                      <p className="text-slate-300 font-medium">
                        {form.cv ? form.cv.name : 'Drop your PDF resume here or click to browse'}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">PDF Only • Max 5MB</p>
                    </div>
                  </div>

                  {/* Status Messages */}
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-400 text-sm bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20"
                    >
                      Application Sent Successfully! 🚀
                    </motion.p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF] hover:from-[#00C2FF] hover:to-[#6A4BEF] text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(0,224,255,0.15)] hover:shadow-[0_0_40px_rgba(0,224,255,0.3)]"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Submit Application →'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}