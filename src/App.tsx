import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense, lazy, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useAnimationControls } from 'motion/react';
import emailjs from '@emailjs/browser';
import profileImg from './assets/profile.png';
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
  Sparkles,
  ArrowUp,
  ChevronDown,
  Copy,
  Check,
  Settings,
  Star,
  Quote
} from 'lucide-react';
import { cn } from './lib/utils';
import { Language, translations, PROJECT_DATA, EXPERIENCE_DATA } from './translations';

const CV = lazy(() => import('./components/CV'));

// --- Components ---

const Navbar = React.memo(({ 
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
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ], [t]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
      isScrolled ? "bg-slate-950/40 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"
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
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10" role="group" aria-label="Language selector">
            {(['fr', 'en', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-full transition-all",
                  language === l ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
                )}
                aria-pressed={language === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            onClick={onShowCV}
            className="px-5 py-2 bg-white text-slate-950 hover:bg-brand-500 hover:text-white rounded-full text-xs font-bold transition-all shadow-lg shadow-white/5 whitespace-nowrap"
          >
            {t.nav.resume}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
});

const Hero = React.memo(({ language }: { language: Language }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const t = useMemo(() => translations[language], [language]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-brand-500/15 rounded-full blur-[40px] md:blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-[40px] md:blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-brand-300 mb-6"
          >
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-brand-500"></span>
            </span>
            {t.hero.status}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-bold tracking-tight mb-6 leading-[1.1] relative"
          >
            <span className="text-[0.65em] md:text-[0.6em] text-slate-400 font-medium block mb-2">
              {t.hero.title}
            </span>
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
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.5,
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
                className={cn(
                  "absolute -top-4 md:-top-8 text-brand-400 z-20",
                  language === 'ar' ? "-left-4 md:-left-8" : "-right-4 md:-right-8"
                )}
              >
                <Sparkles size={32} className="md:w-12 md:h-12" />
              </motion.div>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-start gap-4"
          >
            <a href="#contact" className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold transition-all shadow-lg shadow-brand-500/25 flex items-center gap-2 group/btn">
              {t.hero.contactMe} <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition-all">
              {t.hero.viewProjects}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        style={{ y, opacity: scrollOpacity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 z-20 pointer-events-none"
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1">{t.hero.scroll}</span>
        <div className="flex flex-col items-center">
          <div className="w-px h-8 md:h-12 bg-linear-to-b from-slate-500 to-transparent" />
          <ChevronDown size={14} className="-mt-1 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
});

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

const ProjectCard = React.memo(({ project, index, language }: { project: any; index: number; language: Language }) => {
  const t = useMemo(() => translations[language], [language]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-700"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 will-change-transform"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('picsum.photos')) {
                // Ensure a safe fallback if the main image fails
                target.src = `https://picsum.photos/seed/${encodeURIComponent(project.title)}/800/600`;
              }
            }}
          />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded-full border border-white/10 text-slate-400 group-hover:border-brand-500/20 group-hover:text-brand-300 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          <a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 hover:bg-brand-500 text-white rounded-full transition-all flex items-center gap-2 text-xs font-bold border border-white/10 hover:border-brand-500 active:scale-95"
          >
            {t.projects.liveDemo} <ExternalLink size={14} />
          </a>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all border border-white/10 active:scale-90"
              aria-label="View Source on GitHub"
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const SkillCategory = React.memo(({ title, skills, icon: Icon }: { title: string; skills: string[]; icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="glass p-5 sm:p-8 rounded-3xl border border-white/5 hover:border-brand-500/30 transition-all duration-500 group"
    style={{ contentVisibility: 'auto' }}
  >
    <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-4 group-hover:text-brand-400 transition-colors">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-slate-400 border border-white/5 group-hover:border-brand-500/20 group-hover:text-brand-300 transition-colors">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
));

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices that support hover
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;

    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a') || target.classList.contains('interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

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

const ContactForm = ({ language, t }: { language: Language, t: any }) => {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Simple rate limiting (client-side)
  const lastSubmitTime = useRef<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    // Rate limiting check (30 seconds between successful sends)
    const now = Date.now();
    if (now - lastSubmitTime.current < 30000 && lastSubmitTime.current !== 0) {
      setStatus('rate-limited');
      return;
    }

    // Honeypot check
    const formData = new FormData(formRef.current!);
    if (formData.get('bot_field')) {
      console.log('Bot detected');
      setStatus('success');
      return;
    }

    setIsSending(true);
    setStatus('idle');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if keys are missing or still placeholders
      const isConfigured = serviceId && templateId && publicKey && 
                          !serviceId.includes('YOUR_') && 
                          !templateId.includes('YOUR_') && 
                          !publicKey.includes('YOUR_');

      if (!isConfigured) {
        console.warn('EmailJS is not fully configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment variables (Settings > Secrets).');
        
        // Show error status instead of simulating success
        setStatus('error');
        setIsSending(false);
        return;
      }

      // Initialize with public key for better reliability in v4
      emailjs.init(publicKey);
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      if (result.text === 'OK') {
        setStatus('success');
        lastSubmitTime.current = Date.now();
        formRef.current?.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input type="text" name="bot_field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] block ml-8 border-l-4 border-brand-500/40 pl-4 mb-2">{t.contact.form.name}</label>
          <input 
            required
            name="user_name"
            type="text" 
            maxLength={100}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-all" 
            placeholder={t.contact.form.placeholderName} 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] block ml-8 border-l-4 border-brand-500/40 pl-4 mb-2">{t.contact.form.email}</label>
          <input 
            required
            name="user_email"
            type="email" 
            maxLength={100}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-all" 
            placeholder={t.contact.form.placeholderEmail} 
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] block ml-8 border-l-4 border-brand-500/40 pl-4 mb-2">{t.contact.form.message}</label>
        <textarea 
          required
          name="message"
          rows={4} 
          maxLength={2000}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-hidden focus:border-brand-500 transition-all resize-none" 
          placeholder={t.contact.form.placeholderMessage} 
        />
      </div>

      <button 
        type="submit" 
        disabled={isSending}
        className={cn(
          "w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
          isSending ? "bg-slate-700 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 text-white"
        )}
      >
        {isSending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : t.contact.form.send}
      </button>

      {status === 'success' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center space-y-2"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-white" size={24} />
          </div>
          <h4 className="text-white font-bold text-lg">
            {language === 'ar' ? 'تم الإرسال بنجاح!' : language === 'en' ? 'Message Sent Successfully!' : 'Message Envoyé avec Succès !'}
          </h4>
          <p className="text-slate-400 text-sm">
            {language === 'ar' 
              ? 'شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.' 
              : language === 'en' 
                ? 'Thank you for reaching out. I will get back to you as soon as possible.' 
                : 'Merci de m\'avoir contacté. Je vous répondrai dans les plus brefs délais.'}
          </p>
        </motion.div>
      )}
      {status === 'wrong-answer' && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-400 text-sm text-center font-medium bg-orange-400/10 p-4 rounded-xl border border-orange-400/20"
        >
          {language === 'ar' ? 'إجابة خاطئة. حاول مرة أخرى.' : language === 'en' ? 'Wrong answer. Try again.' : 'Mauvaise réponse. Réessayez.'}
        </motion.p>
      )}
      {status === 'rate-limited' && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-400 text-sm text-center font-medium bg-orange-400/10 p-4 rounded-xl border border-orange-400/20"
        >
          {language === 'ar' ? 'لقد أرسلت رسالة مؤخرًا. يرجى الانتظار قليلاً.' : language === 'en' ? 'You sent a message recently. Please wait a moment.' : 'Vous avez envoyé un message récemment. Veuillez patienter un instant.'}
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center font-medium bg-red-400/10 p-4 rounded-xl border border-red-400/20"
        >
          {language === 'ar' 
            ? 'حدث خطأ ما. يرجى التأكد من إعداد مفاتيح EmailJS في الإعدادات.' 
            : language === 'en' 
              ? 'Something went wrong. Please ensure EmailJS keys are configured in Settings.' 
              : 'Une erreur est survenue. Veuillez vérifier que les clés EmailJS sont configurées dans les paramètres.'}
        </motion.p>
      )}
    </form>
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [showCV, setShowCV] = useState(false);
  const t = useMemo(() => translations[language], [language]);
  const isRtl = language === 'ar';

  const scrollProgress = useSpring(useScroll().scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBottomArrowVisible, setIsBottomArrowVisible] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const footerArrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomArrowVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerArrowRef.current) {
      observer.observe(footerArrowRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleShowCV = useCallback(() => setShowCV(true), []);
  const handleHideCV = useCallback(() => setShowCV(false), []);
  const handleSetLanguage = useCallback((l: Language) => setLanguage(l), []);
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('johnnynkunku@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (showCV) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <CV 
          language={language as 'fr' | 'en' | 'ar'} 
          onBack={handleHideCV} 
        />
      </Suspense>
    );
  }

  return (
    <div className={cn("relative min-h-screen text-slate-100 selection:bg-brand-500/30", isRtl ? "font-sans" : "font-sans")} dir={isRtl ? 'rtl' : 'ltr'}>
      <CustomCursor />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[60] origin-left will-change-transform"
        style={{ scaleX: scrollProgress }}
      />

      <Navbar language={language} setLanguage={handleSetLanguage} onShowCV={handleShowCV} />
      
      <Hero language={language} />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && !isBottomArrowVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/40 hover:bg-brand-600 transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -ml-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] -mr-48 -mb-48" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <SectionTitle title={t.about.title} subtitle={t.about.subtitle} language={language} />
              <div className="space-y-6">
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                  {t.about.p1}
                </p>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                  {t.about.p2}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 mb-12">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors group">
                  <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-brand-400 transition-colors">{t.about.stats.projectsValue}</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.about.stats.projects}</div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors group">
                  <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-brand-400 transition-colors">{t.about.stats.experienceValue}</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.about.stats.experience}</div>
                </div>
              </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowCV}
                  className="px-10 py-5 bg-white text-slate-950 hover:bg-brand-500 hover:text-white rounded-full font-black uppercase tracking-widest text-sm transition-all flex items-center gap-3 shadow-xl shadow-white/5 active:scale-95"
                >
                <Download size={20} />
                {t.nav.resume}
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 md:order-2"
            >
              <div className="relative group">
                {/* Main Image Frame */}
                <div className="relative z-10 aspect-[4/5] rounded-[40px] overflow-hidden glass p-4 border border-white/10 shadow-2xl bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors duration-700">
                  <img 
                    src={profileImg} 
                    alt="Johnny Nkunku" 
                    className="w-full h-full object-cover rounded-[32px] transition-all duration-700 relative z-10 active:scale-[0.98] md:active:scale-100"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('picsum.photos')) {
                        target.src = "https://picsum.photos/seed/johnny/800/1000";
                      }
                    }}
                  />
                  {/* Background Glow inside the frame */}
                  <div className="absolute inset-0 bg-linear-to-tr from-brand-500/20 to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-700" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
                
                {/* Experience Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 z-20 glass px-6 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <div className="text-white font-black text-lg leading-none">2025</div>
                    <div className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">
                      {language === 'ar' ? 'دفعة' : language === 'en' ? 'Promotion' : 'Promotion'}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
          <SkillCategory title={t.skills.categories.frontend} skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']} icon={Globe} />
          <SkillCategory title={t.skills.categories.backend} skills={['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis']} icon={Server} />
          <SkillCategory title={t.skills.categories.infrastructure} skills={['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD']} icon={Cloud} />
          <SkillCategory title={t.skills.categories.systems} skills={['Git', 'Linux', 'Nginx', 'Grafana', 'Prometheus']} icon={Cpu} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-slate-900/30 relative overflow-hidden no-scrollbar">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle title={t.testimonials.title} subtitle={t.testimonials.subtitle} language={language} />
        </div>

        {/* Horizontal Marquee */}
        <div 
          className="relative mt-4 py-12 overflow-hidden no-scrollbar"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
          onTouchStart={() => setIsMarqueePaused(true)}
          onTouchEnd={() => setIsMarqueePaused(false)}
        >
          <div className={cn(
            "flex gap-6 px-6 w-max animate-marquee cursor-pointer transition-all duration-500",
            isMarqueePaused && "pause"
          )}>
            {/* Double the list for seamless loop */}
            {[...t.testimonials.list, ...t.testimonials.list].map((testimonial: any, i: number) => (
              <motion.div
                key={i}
                whileHover={{ 
                  scale: 1.05, 
                  y: -16,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                className="glass p-6 rounded-[32px] border border-white/10 relative group/card hover:border-brand-500/50 hover:bg-slate-900/90 hover:shadow-[0_10px_25px_-8px_rgba(51,84,255,0.4)] transition-all duration-500 flex flex-col w-[320px] sm:w-[450px] shrink-0 cursor-default z-10 hover:z-20"
              >
                <div className="absolute top-6 right-8 text-brand-500/5 group-hover/card:text-brand-500/20 group-hover/card:scale-110 transition-all duration-500">
                  <Quote size={48} fill="currentColor" />
                </div>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 group-hover/card:border-brand-500/50 transition-colors duration-500 shadow-inner bg-slate-800">
                      <img 
                        key={testimonial.image}
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('picsum.photos')) {
                            target.src = `https://picsum.photos/seed/${testimonial.name}/200/200`;
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-tight group-hover/card:text-brand-400 transition-colors">{testimonial.name}</div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 group-hover/card:text-brand-500 transition-colors">{testimonial.role}</div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed relative z-10 tracking-tight flex-1 mb-4 group-hover/card:text-white transition-colors">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  {/* 6-Star Rating System */}
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, index) => (
                      <Star 
                        key={index} 
                        size={12} 
                        className={cn(
                          "transition-all duration-500",
                          index < testimonial.rating 
                            ? "text-yellow-400 fill-yellow-400 scale-110" 
                            : "text-white/10 fill-transparent"
                        )} 
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover/card:text-brand-500 transition-colors">Verified Feedback</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fade Overlays */}
          <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />
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
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-500/10 rounded-full blur-[60px] md:blur-[80px] -mr-32 -mt-32 md:-mr-48 md:-mt-48" />
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div>
              <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} language={language} />
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10">
                {t.contact.description}
              </p>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 text-white group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t.contact.email}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm md:text-base font-semibold truncate max-w-[150px] sm:max-w-none">johnnynkunku@gmail.com</div>
                      <button 
                        onClick={copyEmail}
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                        title="Copy Email"
                        aria-label="Copy email address"
                      >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t.contact.phone}</div>
                    <div className="text-sm md:text-base font-semibold">{t.contact.phoneValue}</div>
                  </div>
                </div>
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

            <ContactForm language={language} t={t} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-slate-500 text-sm">
                {t.footer.rights}
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-slate-500 hover:text-white transition-colors text-xs">{t.footer.privacy}</a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors text-xs">{t.footer.terms}</a>
              </div>
            </div>
            
            <motion.button
              ref={footerArrowRef}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}
