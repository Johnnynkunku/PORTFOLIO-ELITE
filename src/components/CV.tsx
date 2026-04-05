import { useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Download, ArrowLeft, Phone, ExternalLink, GraduationCap } from 'lucide-react';
import { Language, translations, EXPERIENCE_DATA } from '../translations';
import { useReactToPrint } from 'react-to-print';

export default function CV({ language, onBack }: { language: Language; onBack: () => void }) {
  const t = translations[language];
  const isRtl = language === 'ar';
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Johnny_Nkunku_CV_${language.toUpperCase()}`,
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-8 lg:p-12 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex justify-between items-center print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors text-sm md:text-base">
          <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} /> {t.cv.back}
        </button>
        <button onClick={() => handlePrint()} className="flex items-center gap-2 bg-brand-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-brand-700 transition-colors shadow-lg text-sm md:text-base">
          <Download size={18} /> {t.cv.download}
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
        <div className="bg-slate-950 text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="w-40 h-40 rounded-3xl overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl relative z-10">
            <img 
              src="input_file_0.png" 
              alt="Johnny Nkunku" 
              className="w-full h-full object-cover brightness-110 contrast-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/johnny/400/400";
              }}
            />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tighter">Johnny Nkunku</h1>
            <p className="text-brand-400 text-xl md:text-2xl font-bold uppercase tracking-widest">
              {language === 'ar' ? 'مهندس تقنية معلومات ومبرمج شامل' : 
               language === 'en' ? 'IT Engineer & Full-Stack Programmer' : 
               'Ingénieur IT & Programmeur Full-Stack'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-8 text-sm md:text-base text-slate-400 font-medium">
              <span className="flex items-center gap-3"><Mail size={18} className="text-brand-500 shrink-0"/> johnnynkunku@gmail.com</span>
              <span className="flex items-center gap-3"><Phone size={18} className="text-brand-500 shrink-0"/> {t.contact.phoneValue}</span>
              <a href="https://github.com/Johnnynkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-500 transition-colors">
                <Github size={18} className="text-brand-500 shrink-0"/> github.com/Johnnynkunku
              </a>
              <a href="https://linkedin.com/in/johnny-nkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-500 transition-colors">
                <Linkedin size={18} className="text-brand-500 shrink-0"/> linkedin.com/in/johnny-nkunku
              </a>
              <span className="flex items-center gap-3"><MapPin size={18} className="text-brand-500 shrink-0"/> Kinshasa, RDC</span>
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">{exp.role} @ {exp.company}</h3>
                    <span className="text-xs font-black font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">{exp.period}</span>
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
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-brand-500 transition-colors">
                  <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{edu.degree}</h3>
                  <p className="text-slate-500 text-sm font-bold mb-2">{edu.institution}</p>
                  <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest">{edu.period}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a 
                href={(t.cv as any).credlyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/10"
              >
                <ExternalLink size={16} className="text-brand-400" />
                {(t.cv as any).credly}
              </a>
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
                  <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100">
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
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.french}</span> <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.frenchLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.english}</span> <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.englishLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.arabic}</span> <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.arabicLevel}</span></div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
