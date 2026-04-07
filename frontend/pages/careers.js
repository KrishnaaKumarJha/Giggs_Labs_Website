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

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    
    // Server-side fetch requires absolute URL
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.startsWith('http') 
      ? process.env.NEXT_PUBLIC_API_URL 
      : `${protocol}://${host}/api`;

    const res = await fetch(`${apiBase}/jobs`);
    const data = await res.json();
    return { props: { jobs: Array.isArray(data) ? data : [] } };
  } catch (err) {
    console.error("Careers SSR Fetch Error:", err);
    return { props: { jobs: [] } };
  }
}

export default function CareersPage({ jobs = [] }) {
  const fileInputRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedJobs, setExpandedJobs] = useState({}); // Tracking read-more state per job

  const toggleJobDescription = (jobId, e) => {
    e.stopPropagation();
    setExpandedJobs(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

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
    Object.keys(form).forEach(key => {
      if (key === 'cv') fd.append('cv', form.cv);
      else fd.append(key, form[key] || '');
    });
    fd.append('jobId', selectedJob.id);
    fd.append('job_title', selectedJob.title);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/apply`, {
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
        }, 3000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMessage(errorData.error || 'Submission failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Application submit error:', err);
      setStatus('error');
      setErrorMessage('Failed to submit application. Please check your connection.');
    }
  }

  const inputCls = 'w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF]/30 transition-all placeholder:text-slate-500';

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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              <p className="text-slate-400 text-lg leading-relaxed mb-8 mx-auto max-w-2xl">
                Giggs is a premier technology partner for the world&rsquo;s most ambitious enterprises. From our hubs in the USA, India, Saudi Arabia, and the UAE, we build digital infrastructure that powers global commerce, cybersecurity, and AI-driven automation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                 <div className="px-6 py-4 rounded-3xl bg-slate-900/40 border border-slate-800 text-left">
                    <p className="text-white font-bold text-sm">Multi-National Presence</p>
                    <p className="text-slate-500 text-xs">USA • MENA • SE Asia</p>
                 </div>
                 <div className="px-6 py-4 rounded-3xl bg-slate-900/40 border border-slate-800 text-left">
                    <p className="text-white font-bold text-sm">Enterprise Partners</p>
                    <p className="text-slate-500 text-xs">Fortune 500 Clients</p>
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── JOB LISTINGS ─── */}
        <section id="openings" className="mb-20">
          <AnimatePresence mode="wait">
            {!selectedJob ? (
              <motion.div
                key="listings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">Current Openings</h3>
                  <span className="text-xs text-slate-500 font-medium px-3 py-1 rounded-full border border-slate-800">{Array.isArray(jobs) ? jobs.length : 0} Positions</span>
                </div>

                {(!Array.isArray(jobs) || jobs.length === 0) ? (
                  <div className="text-slate-400 text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
                    No open positions at the moment. Check back soon!
                  </div>
                ) : jobs.map((job) => {
                  const isExpanded = expandedJobs[job.id];
                  const description = job.description || '';
                  const lines = description.split('\n');
                  const isLong = lines.length > 3 || description.length > 200;

                  return (
                    <motion.div
                      key={job.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedJob(job)}
                      className="group p-8 rounded-3xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/60 hover:border-[#00E0FF]/30 transition-all cursor-pointer shadow-xl relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start relative z-10">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-white group-hover:text-[#00E0FF] transition-colors mb-3">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                              <MapPin className="w-3 h-3 text-[#00E0FF]" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                              <Clock className="w-3 h-3 text-[#00E0FF]" /> {job.type}
                            </span>
                          </div>
                          
                          <div className="relative">
                            <p className={`text-slate-400 text-sm leading-relaxed whitespace-pre-wrap ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>
                              {description}
                            </p>
                            {isLong && (
                              <button
                                onClick={(e) => toggleJobDescription(job.id, e)}
                                className="mt-3 text-xs font-bold text-[#00E0FF] hover:text-white transition-colors flex items-center gap-1"
                              >
                                {isExpanded ? 'Show Less ↑' : 'Read Full Description ↓'}
                              </button>
                            )}
                          </div>
                        </div>
                        <span className="ml-6 flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-[#00E0FF] group-hover:border-[#00E0FF]/40 transition-all group-hover:translate-x-1">
                          <ArrowRight className="w-6 h-6" />
                        </span>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00E0FF]/5 to-transparent blur-2xl -z-0 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* ========== SIMPLIFIED APPLICATION FORM ========== */
              <motion.div
                key="application"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-3xl mx-auto"
              >
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-xs text-slate-500 hover:text-white mb-8 transition-colors flex items-center gap-1.5 group font-bold tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO LISTINGS
                </button>

                <div className="bg-slate-900/60 border border-white/5 p-10 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E0FF]/5 blur-[100px] -z-10" />
                  
                  <div className="mb-10 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">Apply for Position</h2>
                    <p className="text-[#00E0FF] font-bold text-lg">{selectedJob.title}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest justify-center md:justify-start">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {selectedJob.location}</span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedJob.type}</span>
                    </div>
                  </div>

                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                        <Check className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                      <p className="text-slate-400">Thank you for your interest. Our team will review your application soon.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name *</label>
                          <input required className={inputCls} value={form.name} onChange={set('name')} placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address *</label>
                          <input required type="email" className={inputCls} value={form.email} onChange={set('email')} placeholder="john@example.com" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number *</label>
                          <input required className={inputCls} value={form.phone} onChange={set('phone')} placeholder="+1 234..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Qualification *</label>
                          <input required className={inputCls} value={form.qualification} onChange={set('qualification')} placeholder="B.Tech" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Experience *</label>
                          <input required className={inputCls} value={form.experience} onChange={set('experience')} placeholder="3 Years" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current CTC *</label>
                          <input required className={inputCls} value={form.current_ctc} onChange={set('current_ctc')} placeholder="e.g. 12 LPA" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Expected CTC *</label>
                          <input required className={inputCls} value={form.expected_ctc} onChange={set('expected_ctc')} placeholder="e.g. 18 LPA" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">LinkedIn URL</label>
                          <input className={inputCls} value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Github / Portfolio</label>
                          <input className={inputCls} value={form.portfolio} onChange={set('portfolio')} placeholder="github.com/..." />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Attach Resume (PDF) *</label>
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${form.cv ? 'border-[#00E0FF]/50 bg-[#00E0FF]/5' : 'border-slate-800 bg-slate-950 hover:border-[#00E0FF]/30'}`}
                        >
                          <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                          <div className="flex items-center justify-center gap-3">
                            <FileText className={`w-5 h-5 ${form.cv ? 'text-[#00E0FF]' : 'text-slate-500'}`} />
                            <span className={`text-sm font-bold ${form.cv ? 'text-white' : 'text-slate-400'}`}>
                              {form.cv ? form.cv.name : 'Upload PDF Resume'}
                            </span>
                            {form.cv && <Check className="w-4 h-4 text-emerald-400" />}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">A brief about yourself</label>
                        <textarea rows="3" className={`${inputCls} resize-none`} value={form.message} onChange={set('message')} placeholder="Tell us what excites you about this role..." />
                      </div>

                      {errorMessage && (
                        <div className="text-xs font-bold text-rose-400 bg-rose-400/10 p-4 rounded-xl border border-rose-400/20">
                          {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-white text-black hover:bg-[#00E0FF] font-black py-4 rounded-xl transition-all disabled:opacity-50 shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest text-sm"
                      >
                        {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </PageShell>
  );
}
