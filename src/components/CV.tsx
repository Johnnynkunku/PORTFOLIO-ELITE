import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Download, ArrowLeft, Phone, ExternalLink, GraduationCap, Loader2, Award, Printer } from 'lucide-react';
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
      
      // Clone the element to modify it for PDF without affecting the UI
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.boxShadow = 'none';
      clone.style.border = 'none';
      clone.style.borderRadius = '0';
      clone.style.width = '210mm'; // A4 width
      
      const opt = {
        margin: 0,
        filename: `Johnny_Nkunku_CV_${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          windowWidth: 1200,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(clone).save();
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(language === 'ar' ? 'حدث خطأ أثناء إنشاء ملف PDF. سيتم فتح نافذة الطباعة بدلاً من ذلك.' : 
            language === 'en' ? 'An error occurred while generating the PDF. Opening print dialog instead.' : 
            'Une erreur est survenue lors de la génération du PDF. Ouverture de la fenêtre d\'impression à la place.');
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
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-wrap justify-between items-center gap-4 print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-[#475569] hover:text-[#1a2eff] transition-colors text-sm md:text-base">
          <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} /> {t.cv.back}
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={onPrint}
            className="flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 md:px-6 py-2 rounded-full hover:bg-[#e2e8f0] active:scale-95 transition-all shadow-sm text-sm md:text-base font-bold"
          >
            <Printer size={18} />
            {language === 'ar' ? 'طباعة' : language === 'en' ? 'Print' : 'Imprimer'}
          </button>
          <button 
            onClick={onDownload} 
            disabled={isDownloading}
            className="flex items-center gap-2 bg-[#1a2eff] text-white px-4 md:px-6 py-2 rounded-full hover:bg-[#0011ff] active:scale-95 transition-all shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] text-sm md:text-base font-bold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
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
        <div className="absolute top-0 left-0 w-full h-2 bg-[#3354ff]" />
        <div className="bg-[#020617] text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(51,84,255,0.1)] rounded-full -mr-32 -mt-32 print:hidden" />
          
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shrink-0 border-4 border-[rgba(255,255,255,0.1)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative z-10">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tighter break-words">Johnny Nkunku</h1>
            <p className="text-[#5c84ff] text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest leading-tight">
              {language === 'ar' ? 'مهندس تقنية معلومات ومبرمج شامل' : 
               language === 'en' ? 'IT Engineer & Full-Stack Programmer' : 
               'Ingénieur IT & Programmeur Full-Stack'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-y-4 gap-x-6 sm:gap-x-8 text-sm md:text-base text-[#94a3b8] font-medium">
              <span className="flex items-center gap-3 justify-center md:justify-start"><Mail size={18} className="text-[#3354ff] shrink-0"/> <span className="break-all">johnnynkunku@gmail.com</span></span>
              <span className="flex items-center gap-3 justify-center md:justify-start"><Phone size={18} className="text-[#3354ff] shrink-0"/> {t.contact.phoneValue}</span>
              <a href="https://github.com/Johnnynkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-[#3354ff] transition-colors">
                <Github size={18} className="text-[#3354ff] shrink-0"/> github.com/Johnnynkunku
              </a>
              <a href="https://linkedin.com/in/johnny-nkunku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-[#3354ff] transition-colors">
                <Linkedin size={18} className="text-[#3354ff] shrink-0"/> linkedin.com/in/johnny-nkunku
              </a>
              <a href={(t.cv as any).credlyLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center md:justify-start hover:text-[#3354ff] transition-colors">
                <Award size={18} className="text-[#3354ff] shrink-0"/> credly.com/users/johnny-nkunku
              </a>
              <span className="flex items-center gap-3 justify-center md:justify-start"><MapPin size={18} className="text-[#3354ff] shrink-0"/> Kinshasa, RDC</span>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-16 space-y-12 md:space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.experience.subtitle}</h2>
              <div className="h-px flex-1 bg-[#f1f5f9]" />
            </div>
            <div className="space-y-10">
              {EXPERIENCE_DATA[language].map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-[#0f172a] group-hover:text-[#1a2eff] transition-colors">{exp.role} @ {exp.company}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-0.5 bg-[rgba(51,84,255,0.2)] rounded-full" />
                      <span className="text-[10px] font-black font-mono text-[#1a2eff] uppercase tracking-widest">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-[#475569]">
                    {exp.description.map((item, j) => (
                      <li key={j} className="leading-relaxed flex gap-3 text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3354ff] mt-2.5 shrink-0" />
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
              <div className="h-px flex-1 bg-[#f1f5f9]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {(t.cv as any).educationList.map((edu: any, i: number) => (
                <div key={i} className="bg-[#f8fafc] p-6 rounded-2xl border border-[#f1f5f9] group hover:border-[#3354ff] transition-colors">
                  <div className="w-10 h-10 bg-[rgba(51,84,255,0.1)] rounded-xl flex items-center justify-center text-[#1a2eff] mb-4 group-hover:bg-[#3354ff] group-hover:text-white transition-colors">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-lg font-black text-[#0f172a] mb-1">{edu.degree}</h3>
                  <p className="text-[#64748b] text-sm font-bold mb-2">{edu.institution}</p>
                  <span className="text-[10px] font-black font-mono text-[#94a3b8] uppercase tracking-widest">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-12 md:gap-20">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.skills.title}</h2>
                <div className="h-px flex-1 bg-[#f1f5f9]" />
              </div>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker', 'AWS'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-[#f8fafc] text-[#334155] rounded-xl text-xs font-black uppercase tracking-widest border border-[#f1f5f9]">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{(t.cv as any).languages}</h2>
                <div className="h-px flex-1 bg-[#f1f5f9]" />
              </div>
              <div className="space-y-4 text-sm md:text-base text-[#475569] font-bold">
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.french}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-[#1a2eff] rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.frenchLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.english}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-[#1a2eff] rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.englishLevel}</span></div>
                <div className="flex justify-between items-center"><span>{(t.cv as any).languageList.arabic}</span> <span className="px-3 py-1 bg-[#f0f4ff] text-[#1a2eff] rounded-lg text-xs uppercase tracking-widest">{(t.cv as any).languageList.arabicLevel}</span></div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
