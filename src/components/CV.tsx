import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Download, ArrowLeft, Phone, ExternalLink, GraduationCap, Loader2, Award, Printer, Terminal, Languages } from 'lucide-react';
import { Language, translations, EXPERIENCE_DATA } from '../translations';
import { cn } from '../lib/utils';
// @ts-ignore
import html2pdf from 'html2pdf.js';

export default function CV({ language, onBack }: { language: Language; onBack: () => void }) {
  const t = translations[language];
  const isRtl = language === 'ar';
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const onDownload = async () => {
    if (!componentRef.current || isDownloading) return;
    
    setIsDownloading(true);
    try {
      const element = componentRef.current;
      const opt = {
        margin: 10,
        filename: `Johnny_Nkunku_CV_${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a] p-4 md:p-8 lg:p-12 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; size: A4 portrait; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .min-h-screen { min-height: 0 !important; padding: 0 !important; background: white !important; }
          .max-w-4xl { 
            max-width: 100% !important; 
            width: 100% !important; 
            margin: 0 !important; 
            border: none !important; 
            box-shadow: none !important; 
            border-radius: 0 !important;
            transform: scale(0.88);
            transform-origin: top center;
          }
          .shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] { box-shadow: none !important; }
          .rounded-3xl { border-radius: 0 !important; }
          .p-4, .md\\:p-8, .lg\\:p-12 { padding: 0 !important; }
          .p-8, .md\\:p-16 { padding: 30px !important; }
          .space-y-12, .md\\:space-y-16 { space-y: 20px !important; }
          section { margin-bottom: 25px !important; }
          h1 { font-size: 3.5rem !important; }
        }
      `}} />
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-wrap justify-between items-center gap-4 print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-[#475569] hover:text-[#1a2eff] transition-colors text-xs sm:text-sm md:text-base font-medium">
          <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} /> {t.cv.back}
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onPrint}
            className="flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-3 sm:px-5 md:px-6 py-2 rounded-full hover:bg-[#e2e8f0] active:scale-95 transition-all shadow-sm text-[10px] sm:text-xs md:text-sm font-bold relative z-20"
            aria-label="Print CV"
          >
            <Printer size={16} />
            {language === 'ar' ? 'طباعة' : language === 'en' ? 'Print' : 'Imprimer'}
          </button>
          <button 
            onClick={onDownload} 
            disabled={isDownloading}
            className="flex items-center gap-2 bg-[#1a2eff] text-white px-3 sm:px-5 md:px-6 py-2 rounded-full hover:bg-[#0011ff] active:scale-95 transition-all shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] text-[10px] sm:text-xs md:text-sm font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Download CV as PDF"
          >
            {isDownloading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isDownloading ? (language === 'ar' ? 'جاري التحميل...' : 'Downloading...') : t.cv.download}
          </button>
        </div>
      </div>
      <motion.div 
        ref={componentRef}
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto bg-[#ffffff] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden border border-[#f1f5f9] print:shadow-none print:border-none relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2eff]" />
        
        {/* Header Section */}
        <div className="bg-[#020617] text-white p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none print:hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full -mr-48 -mt-48 blur-3xl print:hidden" />
          
          <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl">
            <img 
              src="profile.png" 
              alt="Johnny Nkunku" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/johnny/600/600";
              }}
            />
          </div>
          
          <div className="relative z-10 text-center md:text-left flex-1 w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-tighter leading-none">Johnny Nkunku</h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl">
              {language === 'ar' ? 'مهندس تقنية معلومات ومبرمج شامل' : 
               language === 'en' ? 'IT Engineer & Full-Stack Programmer' : 
               'Ingénieur IT & Programmeur Full-Stack'}
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-400">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-400 shrink-0">
                  <Mail size={14} />
                </div>
                <span className="break-all">johnnynkunku@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-400 shrink-0">
                  <Phone size={14} />
                </div>
                <span>{t.contact.phoneValue}</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-400 shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Kinshasa, RDC</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-400 shrink-0">
                  <Linkedin size={14} />
                </div>
                <span>linkedin.com/in/johnny-nkunku</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Profile & Experience */}
          <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
            {/* Profile Summary */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Terminal size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                  {language === 'ar' ? 'الملف الشخصي' : language === 'en' ? 'Profile' : 'Profil'}
                </h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">{t.experience.subtitle}</h2>
              </div>
              
              <div className="space-y-12">
                {EXPERIENCE_DATA[language].map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-slate-100 last:border-transparent">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand-500" />
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-lg font-black text-slate-900">{exp.role}</h3>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-brand-600 font-bold text-sm mb-4">{exp.company}</div>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, j) => (
                        <li key={j} className="text-slate-600 text-sm leading-relaxed flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Education, Skills, Languages */}
          <div className="w-full lg:w-[320px] bg-slate-50/50 p-8 md:p-12 space-y-12">
            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={18} className="text-brand-600" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{t.cv.education}</h2>
              </div>
              <div className="space-y-8">
                {(t.cv as any).educationList.map((edu: any, i: number) => (
                  <div key={i} className="relative">
                    <h3 className="text-sm font-black text-slate-900 mb-1 leading-tight">{edu.degree}</h3>
                    <p className="text-slate-500 text-xs font-medium mb-2">{edu.institution}</p>
                    <div className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{edu.period}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Award size={18} className="text-brand-600" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{t.skills.title}</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{t.skills.categories.frontend}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white text-brand-600 rounded border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{t.skills.categories.backend}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white text-slate-600 rounded border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{t.skills.categories.infrastructure}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white text-slate-500 rounded border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{language === 'ar' ? 'الميكانيكا' : 'Mécanique'}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Maintenance', 'Diagnostic', 'Ingénierie'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white text-slate-400 rounded border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Languages size={18} className="text-brand-600" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{(t.cv as any).languages}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: (t.cv as any).languageList.french, level: (t.cv as any).languageList.frenchLevel, percentage: 100, color: '#1a2eff' },
                  { name: (t.cv as any).languageList.english, level: (t.cv as any).languageList.englishLevel, percentage: 45, color: '#3354ff' },
                  { name: (t.cv as any).languageList.arabic, level: (t.cv as any).languageList.arabicLevel, percentage: 70, color: '#5c84ff' }
                ].map((lang, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-brand-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="3" />
                          <circle 
                            cx="18" cy="18" r="16" fill="none" 
                            className="stroke-brand-500 transition-all duration-1000" 
                            strokeWidth="3" 
                            strokeDasharray={`${lang.percentage}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-slate-900">
                          {lang.percentage}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors">{lang.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang.level}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Area */}
            <div className="pt-8 mt-8 border-t border-slate-100">
              <div className="flex justify-between items-center opacity-40 grayscale">
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
                  CV - {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
