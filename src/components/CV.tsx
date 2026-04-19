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
      
      // Use the simplest possible configuration for html2pdf
      const worker = html2pdf();
      await worker.set({
        margin: 5,
        filename: `Johnny_Nkunku_CV_${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      // Fallback to simple print
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const onPrint = () => {
    try {
      // Use a cleaner print approach that works better in iframes
      const isIframe = window.self !== window.top;
      if (isIframe) {
        window.print();
      } else {
        window.print();
      }
    } catch (e) {
      console.error("Print error:", e);
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a] p-4 md:p-8 lg:p-12 font-sans cv-page-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 5mm; size: A4 portrait; }
          body { 
            background: white !important; 
            font-size: 8pt !important; 
            line-height: 1.15 !important;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            color: #0f172a !important; 
          }
          .print\\:hidden { display: none !important; }
          .cv-page-wrapper { min-height: 0 !important; background: white !important; padding: 0 !important; }
          
          /* CRITICAL: Force a fixed layout width for print to prevent mobile responsive columns from breaking the A4 layout */
          .max-w-4xl { 
            max-width: 800px !important; 
            width: 800px !important; 
            margin: 0 auto !important;
            border: none !important; 
            box-shadow: none !important; 
            border-radius: 0 !important;
            overflow: visible !important;
          }
          
          /* Compact Elite Header */
          .cv-header {
            background-color: #020617 !important;
            color: white !important;
            padding: 15px 20px !important;
            margin-bottom: 10px !important;
            display: grid !important;
            grid-template-columns: 70px 1.2fr 1fr !important;
            align-items: center !important;
            gap: 15px !important;
            border-radius: 0 !important;
            height: auto !important;
          }
          .cv-profile-img { 
            width: 70px !important; 
            height: 70px !important; 
            border: 1px solid rgba(255,255,255,0.2) !important;
            border-radius: 10px !important;
          }
          .cv-header h1 { 
            font-size: 1.8rem !important; 
            line-height: 1 !important; 
            margin-bottom: 2px !important;
            text-align: left !important;
          }
          .cv-header p { 
            font-size: 0.85rem !important; 
            opacity: 0.8 !important;
            text-align: left !important;
          }
          /* Contact info in 2 columns in header to save height */
          .cv-header .grid { 
            display: grid !important; 
            grid-template-columns: 1fr 1fr !important;
            column-gap: 10px !important;
            row-gap: 2px !important; 
            margin: 0 !important;
          }
          .cv-header .flex { 
            justify-content: flex-start !important; 
            font-size: 7.2pt !important;
            gap: 4px !important;
          }
          .cv-header .w-8, .cv-header .h-8 { display: none !important; }
          
          /* Compact Content Layout */
          .cv-main-content { 
            display: flex !important; 
            flex-direction: row !important; 
            gap: 15px !important;
            padding: 0 20px !important;
            width: 100% !important;
          }
          .cv-left-col { 
            flex: 1 !important; 
            padding: 0 !important; 
            border: none !important; 
            background: transparent !important; 
          }
          .cv-right-col { 
            width: 220px !important; 
            padding: 0 15px 0 0 !important; 
            border: none !important; 
            background: transparent !important; 
            flex-shrink: 0 !important;
          }
          
          h2 { 
            font-size: 0.95rem !important; 
            border-bottom: 1px solid #f1f5f9 !important; 
            padding-bottom: 3px !important;
            margin-bottom: 8px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            color: #0f172a !important;
          }
          h3 { font-size: 0.85rem !important; margin-bottom: 1px !important; font-weight: 800 !important; }
          .font-bold { font-weight: 700 !important; font-size: 7.5pt !important; }
          
          section { margin-bottom: 10px !important; break-inside: avoid !important; }
          .space-y-12, .space-y-10, .space-y-8, .space-y-6, .space-y-4 { margin-top: 0 !important; }
          .space-y-12 > :not([hidden]) ~ :not([hidden]) { margin-top: 8px !important; }
          .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 5px !important; }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
          .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 2px !important; }
          
          /* Experience Items */
          .relative.pl-8 { padding-left: 10px !important; border-left: 2px solid #f1f5f9 !important; }
          .absolute.-left-\\[9px\\] { display: none !important; }
          .mb-4 { margin-bottom: 2px !important; }
          ul { margin-top: 2px !important; }
          ul li { margin-bottom: 1px !important; font-size: 7.5pt !important; line-height: 1.2 !important; }
          
          /* Sidebar Adjustments */
          .cv-right-col .p-4 { padding: 4px 8px !important; border-radius: 6px !important; margin-bottom: 5px !important; }
          .cv-right-col .w-12 { width: 24px !important; height: 24px !important; }
          .cv-right-col .mb-8 { margin-bottom: 6px !important; }
          
          /* RTL Fixes */
          ${isRtl ? `
            .cv-header { grid-template-columns: 1fr 1.2fr 70px !important; text-align: right !important; }
            .cv-header h1, .cv-header p { text-align: right !important; }
            .cv-main-content { flex-direction: row-reverse !important; }
            .cv-right-col { padding: 0 0 0 15px !important; }
            .relative.pl-8 { padding-left: 0 !important; padding-right: 10px !important; border-left: none !important; border-right: 2px solid #f1f5f9 !important; }
          ` : ''}
          
          /* Hide Footer & Dots */
          .pt-8.mt-8.border-t, .absolute.inset-0.opacity-10 { display: none !important; }
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
        <div className="bg-[#020617] text-white p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden cv-header print:p-6 print:flex-row print:gap-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none print:hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 blur-3xl print:hidden" style={{ backgroundColor: 'rgba(51, 84, 255, 0.1)' }} />
          
          <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl cv-profile-img print:w-32 print:h-32" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <img 
              src="profile.png" 
              alt="Johnny Nkunku" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/johnny/600/600";
              }}
            />
          </div>
          
          <div className="relative z-10 text-center md:text-left flex-1 w-full print:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-tighter leading-none print:text-4xl" style={{ color: '#ffffff' }}>Johnny Nkunku</h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl print:text-base" style={{ color: '#94a3b8' }}>
              {language === 'ar' ? 'مهندس تقنية معلومات ومبرمج شامل' : 
               language === 'en' ? 'IT Engineer & Full-Stack Programmer' : 
               'Ingénieur IT & Programmeur Full-Stack'}
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-400 print:mt-4 print:grid-cols-2 print:gap-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#5c84ff' }}>
                  <Mail size={14} />
                </div>
                <a href="mailto:johnnynkunku@gmail.com" className="break-all hover:text-white transition-colors" style={{ color: '#94a3b8' }}>johnnynkunku@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#5c84ff' }}>
                  <Phone size={14} />
                </div>
                <a href={`tel:${t.contact.phoneValue}`} className="hover:text-white transition-colors" style={{ color: '#94a3b8' }}>{t.contact.phoneValue}</a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#5c84ff' }}>
                  <MapPin size={14} />
                </div>
                <span style={{ color: '#94a3b8' }}>Kinshasa, RDC</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#5c84ff' }}>
                  <Linkedin size={14} />
                </div>
                <a href="https://linkedin.com/in/johnny-nkunku" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: '#94a3b8' }}>linkedin.com/in/johnny-nkunku</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex flex-col lg:flex-row cv-main-content">
          {/* Left Column: Profile & Experience */}
          <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 cv-left-col" style={{ borderColor: '#f1f5f9' }}>
            {/* Profile Summary */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-600" style={{ backgroundColor: '#f0f4ff', color: '#1a2eff' }}>
                  <Terminal size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900" style={{ color: '#0f172a' }}>
                  {language === 'ar' ? 'الملف الشخصي' : language === 'en' ? 'Profile' : 'Profil'}
                </h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4" style={{ color: '#475569' }}>
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-600" style={{ backgroundColor: '#f0f4ff', color: '#1a2eff' }}>
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900" style={{ color: '#0f172a' }}>{t.experience.subtitle}</h2>
              </div>
              
              <div className="space-y-12">
                {EXPERIENCE_DATA[language].map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 last:border-transparent" style={{ borderColor: '#f1f5f9' }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand-500" style={{ backgroundColor: '#ffffff', borderColor: '#3354ff' }} />
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-lg font-black text-slate-900" style={{ color: '#0f172a' }}>{exp.role}</h3>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                          {exp.period}
                        </span>
                      </div>
                      <div className="font-bold text-sm mb-4" style={{ color: '#1a2eff' }}>{exp.company}</div>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, j) => (
                        <li key={j} className="text-slate-600 text-sm leading-relaxed flex gap-3" style={{ color: '#475569' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#5c84ff' }} />
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
          <div className="w-full lg:w-[320px] p-8 md:p-12 space-y-12 cv-right-col" style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={18} style={{ color: '#1a2eff' }} />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900" style={{ color: '#0f172a' }}>{t.cv.education}</h2>
              </div>
              <div className="space-y-8">
                {(t.cv as any).educationList.map((edu: any, i: number) => (
                  <div key={i} className="relative">
                    <h3 className="text-sm font-black text-slate-900 mb-1 leading-tight" style={{ color: '#0f172a' }}>{edu.degree}</h3>
                    <p className="text-slate-500 text-xs font-medium mb-2" style={{ color: '#64748b' }}>{edu.institution}</p>
                    <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#3354ff' }}>{edu.period}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Award size={18} style={{ color: '#1a2eff' }} />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900" style={{ color: '#0f172a' }}>{t.skills.title}</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3" style={{ color: '#94a3b8' }}>{t.skills.categories.frontend}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion'].map(skill => (
                      <span key={skill} className="px-2 py-1 rounded border text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: '#ffffff', color: '#1a2eff', borderColor: '#e2e8f0' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#94a3b8' }}>{t.skills.categories.backend}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis'].map(skill => (
                      <span key={skill} className="px-2 py-1 rounded border text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: '#ffffff', color: '#475569', borderColor: '#e2e8f0' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#94a3b8' }}>{t.skills.categories.infrastructure}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'].map(skill => (
                      <span key={skill} className="px-2 py-1 rounded border text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: '#ffffff', color: '#64748b', borderColor: '#e2e8f0' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#94a3b8' }}>{language === 'ar' ? 'الميكانيكا' : 'Mécanique'}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Maintenance', 'Diagnostic', 'Ingénierie'].map(skill => (
                      <span key={skill} className="px-2 py-1 rounded border text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: '#ffffff', color: '#94a3b8', borderColor: '#e2e8f0' }}>
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
                <Languages size={18} style={{ color: '#1a2eff' }} />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900" style={{ color: '#0f172a' }}>{(t.cv as any).languages}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: (t.cv as any).languageList.french, level: (t.cv as any).languageList.frenchLevel, percentage: 100, color: '#1a2eff' },
                  { name: (t.cv as any).languageList.english, level: (t.cv as any).languageList.englishLevel, percentage: 45, color: '#3354ff' },
                  { name: (t.cv as any).languageList.arabic, level: (t.cv as any).languageList.arabicLevel, percentage: 70, color: '#5c84ff' }
                ].map((lang, i) => (
                  <div key={i} className="p-4 rounded-2xl border shadow-sm group transition-all duration-300" style={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9' }}>
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" style={{ stroke: '#f1f5f9' }} />
                          <circle 
                            cx="18" cy="18" r="16" fill="none" 
                            className="transition-all duration-1000" 
                            strokeWidth="3" 
                            strokeDasharray={`${lang.percentage}, 100`}
                            strokeLinecap="round"
                            style={{ stroke: '#3354ff' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black" style={{ color: '#0f172a' }}>
                          {lang.percentage}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-black transition-colors" style={{ color: '#0f172a' }}>{lang.name}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{lang.level}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Area */}
            <div className="pt-8 mt-8 border-t" style={{ borderColor: '#f1f5f9' }}>
              <div className="flex justify-between items-center opacity-40 grayscale">
                <div className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: '#94a3b8' }}>
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
