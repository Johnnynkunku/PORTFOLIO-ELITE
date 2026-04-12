import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Download, ArrowLeft, Phone, ExternalLink, GraduationCap, Loader2, Award } from 'lucide-react';
import { Language, translations, EXPERIENCE_DATA } from '../translations';
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
    console.log('Generating PDF for download...');

    try {
      const element = componentRef.current;
      const opt = {
        margin: [0.2, 0.2] as [number, number],
        filename: `Johnny_Nkunku_CV_${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          windowWidth: 1200
        },
        jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Temporarily remove some classes for better PDF generation if needed
      // but here we just run it
      await html2pdf().set(opt).from(element).save();
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      // Fallback to standard print if PDF generation fails
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-8 lg:p-12 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex justify-between items-center print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors text-sm md:text-base">
          <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} /> {t.cv.back}
        </button>
        <button 
          onClick={onDownload} 
          disabled={isDownloading}
          className="flex items-center gap-2 bg-brand-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-brand-700 active:scale-95 transition-all shadow-lg text-sm md:text-base font-bold disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          {isDownloading ? (language === 'ar' ? 'جاري التحميل...' : 'Downloading...') : t.cv.download}
        </button>
      </div>
      <motion.div 
        ref={componentRef}
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden border border-slate-100 print:shadow-none print:border-none relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-500" />
        <div className="bg-[#020617] text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3354ff1a] rounded-full -mr-32 -mt-32 print:hidden" />
          
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl relative z-10">
            <img 
              src="profile.png" 
              alt="Johnny Nkunku" 
              className="w-full h-full object-cover brightness-110 contrast-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/johnny/600/600";
              }}
            />
          </div>
          <div className="relative z-10 text-center md:text-left flex-1 w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tighter break-words">Johnny Nkunku</h1>
            <p className="text-brand-400 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest leading-tight">
              {language === 'ar' ? 'مهندس تقنية معلومات ومبرمج شامل' : 
               language === 'en' ? 'IT Engineer & Full-Stack Programmer' : 
               'Ingénieur IT & Programmeur Full-Stack'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-y-4 gap-x-6 sm:gap-x-8 text-sm md:text-base text-slate-400 font-medium">
              <span className="flex items-center gap-3 justify-center md:justify-start"><Mail size={18} className="text-brand-500 shrink-0"/> <span className="break-all">johnnynkunku@gmail.com</span></span>
              <span className="flex items-center gap-3 justify-center md:justify-start"><Phone size={18} className="text-brand-500 shrink-0"/> {t.contact.phoneValue}</span>
              <a href="https://github.com/Johnnynkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-brand-500 transition-colors">
                <Github size={18} className="text-brand-500 shrink-0"/> github.com/Johnnynkunku
              </a>
              <a href="https://linkedin.com/in/johnny-nkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-brand-500 transition-colors">
                <Linkedin size={18} className="text-brand-500 shrink-0"/> linkedin.com/in/johnny-nkunku
              </a>
              <a href={(t.cv as any).credlyLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-brand-500 transition-colors">
                <Award size={18} className="text-brand-500 shrink-0"/> credly.com/users/johnny-nkunku
              </a>
              <span className="flex items-center gap-3 justify-center md:justify-start"><MapPin size={18} className="text-brand-500 shrink-0"/> Kinshasa, RDC</span>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-16 space-y-12 md:space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.experience.subtitle}</h2>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="space-y-10">
              {EXPERIENCE_DATA[language].map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">{exp.role} @ {exp.company}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-0.5 bg-brand-500/20 rounded-full" />
                      <span className="text-[10px] font-black font-mono text-brand-600 uppercase tracking-widest">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-slate-600">
                    {exp.description.map((item, j) => (
                      <li key={j} className="leading-relaxed flex gap-3 text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.cv.education}</h2>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {(t.cv as any).educationList.map((edu: any, i: number) => (
                <div key={i} className="bg-[#f8fafc] p-6 rounded-2xl border border-[#f1f5f9] group hover:border-brand-500 transition-colors">
                  <div className="w-10 h-10 bg-[#3354ff1a] rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{edu.degree}</h3>
                  <p className="text-slate-500 text-sm font-bold mb-2">{edu.institution}</p>
                  <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-12 md:gap-20">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.skills.title}</h2>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker', 'AWS'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-[#f8fafc] text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest border border-[#f1f5f9]">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{(t.cv as any).languages}</h2>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="space-y-4 text-sm md:text-base text-slate-600 font-bold">
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.french}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.frenchLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.english}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.englishLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.arabic}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.arabicLevel}</span></div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
