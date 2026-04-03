import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Download, ArrowLeft } from 'lucide-react';
import { Language, translations, EXPERIENCE_DATA } from '../translations';

export default function CV({ language, onBack }: { language: Language; onBack: () => void }) {
  const t = translations[language];
  const isRtl = language === 'ar';
  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-8 lg:p-12 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex justify-between items-center print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors text-sm md:text-base">
          <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} /> {t.cv.back}
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-brand-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-brand-700 transition-colors shadow-lg text-sm md:text-base">
          <Download size={18} /> {t.cv.download}
        </button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-100 print:shadow-none print:border-none">
        <div className="bg-slate-900 text-white p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-500/30">
            <img src="input_file_0.png" alt="Johnny Nkunku" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Johnny Nkunku</h1>
            <p className="text-brand-400 text-lg md:text-xl">{language === 'ar' ? 'مهندس صيانة وشبكات ومطور شامل' : 'Ingénieur en Maintenance et Réseau & Développeur Full-Stack'}</p>
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs md:text-sm text-slate-300">
              <span className="flex items-center gap-2"><Mail size={14} className="shrink-0"/> johnnynkunku@gmail.com</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="shrink-0"/> Kinshasa, RDC</span>
              <span className="flex items-center gap-2"><Linkedin size={14} className="shrink-0"/> johnny-nkunku</span>
              <span className="flex items-center gap-2"><Github size={14} className="shrink-0"/> Johnnynkunku</span>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-12 space-y-8 md:space-y-10">
          <section>
            <h2 className="text-lg md:text-xl font-bold border-b-2 border-brand-500 pb-2 mb-4 uppercase tracking-wider">{t.experience.subtitle}</h2>
            <div className="space-y-6">
              {EXPERIENCE_DATA[language].map((exp, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                    <h3 className="font-bold text-slate-800">{exp.role} @ {exp.company}</h3>
                    <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                    {exp.description.map((item, j) => (
                      <li key={j} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            <section>
              <h2 className="text-lg md:text-xl font-bold border-b-2 border-brand-500 pb-2 mb-4 uppercase tracking-wider">{t.skills.title}</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker', 'AWS'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-lg md:text-xl font-bold border-b-2 border-brand-500 pb-2 mb-4 uppercase tracking-wider">{language === 'ar' ? 'لغات' : 'Langues'}</h2>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between"><span>Français</span> <span className="font-bold text-brand-600">Natif</span></div>
                <div className="flex justify-between"><span>English</span> <span className="font-bold text-brand-600">Avancé</span></div>
                <div className="flex justify-between"><span>Arabe</span> <span className="font-bold text-brand-600">Basique</span></div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
