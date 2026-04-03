import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Menu,
  X,
  Server,
  Cloud,
  Languages,
  Download,
  Sparkles
} from 'lucide-react';
import { cn } from './lib/utils';
import { Language, translations, PROJECT_DATA, EXPERIENCE_DATA } from './translations';
import CV from './components/CV';

// --- Components ---

const Navbar = ({ 
  language, 
  setLanguage, 
  onShowCV 
}: { 
  language: Language; 
  setLanguage: (l: Language) => void;
  onShowCV: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-slate-950/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
    )} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          <span className="text-gradient uppercase tracking-widest">Portfolio</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {(['fr', 'en', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-full transition-all",
                  language === l ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {(['fr', 'en', 'ar'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLanguage(l); setIsMobileMenuOpen(false); }}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-bold",
                      language === l ? "bg-brand-500 text-white" : "bg-white/5 text-slate-400"
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => { onShowCV(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-white text-slate-950 rounded-xl font-bold"
              >
                {t.nav.resume}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ language }: { language: Language }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const t = translations[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-300 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            {t.hero.status}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1] relative"
          >
            {t.hero.title}{" "}
            <span className="relative inline-block">
              <span className="text-gradient relative z-10">{t.hero.titleGradient}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-1 md:h-2 bg-brand-500/30 blur-[2px] rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={cn(
                  "absolute -top-4 md:-top-8 text-brand-400 z-20",
                  language === 'ar' ? "-left-4 md:-left-8" : "-right-4 md:-right-8"
                )}
              >
                <Sparkles size={32} className="md:w-12 md:h-12 animate-pulse" />
              </motion.div>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
        </div>
      </div>

      <motion.div 
        style={{ y }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-linear-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
};

const SectionTitle = ({ title, subtitle, id, language }: { title: string, subtitle: string, id?: string, language: Language }) => (
  <div className="mb-16" id={id}>
    <motion.span 
      initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-brand-500 font-mono text-sm tracking-widest uppercase mb-2 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const ProjectCard = ({ project, index, language }: { project: any; index: number; language: Language; key?: string | number }) => {
  const t = translations[language];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass rounded-3xl overflow-hidden"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-slate-400">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          <a href={project.link} className="text-white hover:text-brand-400 transition-colors flex items-center gap-1 text-sm font-semibold">
            {t.projects.liveDemo} <ExternalLink size={14} />
          </a>
          {project.github && (
            <a href={project.github} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-semibold">
              {t.projects.source} <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, icon: Icon }: { title: string; skills: string[]; icon: any; key?: string | number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl"
  >
    <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 text-brand-400">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 border border-white/5">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-500 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(51, 84, 255, 0.1)' : 'rgba(51, 84, 255, 0)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [showCV, setShowCV] = useState(false);
  const t = translations[language];
  const isRtl = language === 'ar';

  const scrollProgress = useSpring(useScroll().scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (showCV) {
    return <CV language={language} onBack={() => setShowCV(false)} />;
  }

  return (
    <div className={cn("relative", isRtl ? "font-sans" : "font-sans")} dir={isRtl ? 'rtl' : 'ltr'}>
      <CustomCursor />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <Navbar language={language} setLanguage={setLanguage} onShowCV={() => setShowCV(true)} />
      
      <Hero language={language} />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <SectionTitle title={t.about.title} subtitle={t.about.subtitle} language={language} />
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6">
              {t.about.p1}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
              {t.about.p2}
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-[10px] md:text-sm text-slate-500 uppercase tracking-wider">{t.about.stats.projects}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">6+</div>
                <div className="text-[10px] md:text-sm text-slate-500 uppercase tracking-wider">{t.about.stats.experience}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowCV(true)}
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold transition-all flex items-center gap-2"
            >
              <Download size={18} />
              {t.nav.resume}
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-3 md:p-4 max-w-md mx-auto">
              <img 
                src="input_file_0.png" 
                alt="Johnny Nkunku" 
                className="w-full h-full object-cover rounded-2xl brightness-110 contrast-110 shadow-[0_0_50px_rgba(51,84,255,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-brand-500 rounded-3xl -z-10 blur-2xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} language={language} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PROJECT_DATA[language].map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} language={language} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <a 
              href="https://github.com/Johnnynkunku" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all inline-block"
            >
              {t.projects.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 container mx-auto px-6">
        <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} language={language} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCategory title={t.skills.categories.frontend} skills={translations[language].skills.categories.frontend === 'Frontend' ? ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] : ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']} icon={Globe} />
          <SkillCategory title={t.skills.categories.backend} skills={['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis']} icon={Server} />
          <SkillCategory title={t.skills.categories.infrastructure} skills={['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD']} icon={Cloud} />
          <SkillCategory title={t.skills.categories.systems} skills={['Git', 'Linux', 'Nginx', 'Grafana', 'Prometheus']} icon={Cpu} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} language={language} />
          <div className="max-w-4xl space-y-8 md:space-y-12">
            {EXPERIENCE_DATA[language].map((exp, i) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn("relative pl-6 md:pl-8 border-l border-white/10", isRtl && "pl-0 pr-6 md:pr-8 border-l-0 border-r border-white/10")}
              >
                <div className={cn("absolute top-0 w-2 h-2 rounded-full bg-brand-500", isRtl ? "right-[-5px]" : "left-[-5px]")} />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-brand-400 font-medium text-sm md:text-base">{exp.company}</p>
                  </div>
                  <span className="text-[10px] md:text-sm font-mono text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-slate-400 flex gap-3 text-xs md:text-sm leading-relaxed">
                      <span className="text-brand-500 mt-1.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 container mx-auto px-6">
        <div className="glass rounded-[30px] md:rounded-[40px] p-8 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-500/10 rounded-full blur-[80px] md:blur-[100px] -mr-32 -mt-32 md:-mr-48 md:-mt-48" />
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div>
              <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} language={language} />
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10">
                {t.contact.description}
              </p>
              
              <div className="space-y-4 md:space-y-6">
                <a href="mailto:johnnynkunku@gmail.com" className="flex items-center gap-4 text-white hover:text-brand-400 transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t.contact.email}</div>
                    <div className="text-sm md:text-base font-semibold truncate max-w-[200px] sm:max-w-none">johnnynkunku@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-white group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Globe size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t.contact.location}</div>
                    <div className="text-sm md:text-base font-semibold">{t.contact.locationValue}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <a href="https://github.com/Johnnynkunku" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 border border-white/10 transition-all">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/johnny-nkunku" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 border border-white/10 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.contact.form.name}</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-colors" placeholder={t.contact.form.placeholderName} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.contact.form.email}</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-colors" placeholder={t.contact.form.placeholderEmail} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.contact.form.message}</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-colors resize-none" placeholder={t.contact.form.placeholderMessage} />
              </div>
              <button type="button" className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold transition-all">
                {t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm">
            {t.footer.rights}
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">{t.footer.privacy}</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
