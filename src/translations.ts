export type Language = 'fr' | 'en' | 'ar';

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      projects: "Projets",
      experience: "Expérience",
      skills: "Compétences",
      contact: "Contact",
      resume: "Mon CV"
    },
    hero: {
      status: "Disponible pour de nouveaux défis",
      title: "Je suis",
      titleGradient: "Johnny Nkunku",
      description: "Ingénieur IT, programmeur et développeur, passionné par le domaine informatique tel que les réseaux, la programmation, le cloud et l'intelligence artificielle.",
      viewProjects: "Voir les Projets",
      contactMe: "Me Contacter",
      scroll: "Défiler"
    },
    about: {
      subtitle: "À Propos de Moi",
      title: "L'Architecte derrière le Code",
      p1: "Je suis Johnny Nkunku, un ingénieur IT et programmeur full-stack passionné par la résolution de problèmes complexes. Mon parcours est marqué par une transition stratégique de l'ingénierie mécanique vers le développement logiciel, ce qui me confère une approche rigoureuse et structurée dans la conception de systèmes.",
      p2: "Spécialisé dans la maintenance, les réseaux et le développement web, je combine une expertise matérielle et logicielle pour créer des solutions technologiques robustes. Mon objectif est de transformer des idées innovantes en applications performantes et sécurisées.",
      stats: {
        projects: "Projets Réalisés",
        projectsValue: "2+",
        experience: "Niveau",
        experienceValue: "Junior"
      }
    },
    projects: {
      subtitle: "Portfolio",
      title: "Travaux Sélectionnés",
      liveDemo: "Démo Live",
      source: "Source",
      viewAll: "Voir tout sur GitHub"
    },
    skills: {
      subtitle: "Expertise",
      title: "Arsenal Technique",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        infrastructure: "Infrastructure",
        systems: "Systèmes"
      }
    },
    experience: {
      subtitle: "Expérience",
      title: "Parcours Professionnel"
    },
    contact: {
      subtitle: "Contact",
      title: "Construisons Quelque Chose de Grand",
      description: "Je suis toujours ouvert à la discussion sur de nouveaux projets, des idées créatives ou des opportunités de faire partie de vos visions.",
      email: "Email",
      phone: "Téléphone",
      phoneValue: "+(243) 842 676 790",
      location: "Localisation",
      locationValue: "Kinshasa, RDC (Disponible à distance)",
      form: {
        name: "Nom",
        email: "Email",
        message: "Message",
        send: "Envoyer le Message",
        placeholderName: "Votre nom",
        placeholderEmail: "votre@email.com",
        placeholderMessage: "Parlez-moi de votre projet..."
      }
    },
    footer: {
      rights: "© 2026 Johnny Nkunku. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    },
    cv: {
      download: "Télécharger le CV",
      back: "Retour au Portfolio",
      title: "Curriculum Vitae",
      personalInfo: "Informations Personnelles",
      education: "Formation",
      educationList: [
        {
          degree: "Licence en Maintenance et Réseaux",
          institution: "Ingénierie des Systèmes Informatiques",
          period: "2021 - 2025"
        },
        {
          degree: "Certification Cisco IT",
          institution: "Réseaux et Sécurité",
          period: "2024"
        },
        {
          degree: "Formation en Mécanique Automobile",
          institution: "Ingénierie Mécanique",
          period: "2022"
        },
        {
          degree: "Promotion d'État en Mécanique Générale",
          institution: "Sciences et Techniques",
          period: "2017 - 2021"
        }
      ],
      credly: "Profil Credly",
      credlyLink: "https://www.credly.com/users/johnny-nkunku",
      languages: "Langues",
      languageList: {
        french: "Français",
        frenchLevel: "Natif",
        english: "Anglais",
        englishLevel: "Basique",
        arabic: "Arabe",
        arabicLevel: "Intermédiaire"
      },
      interests: "Centres d'intérêt",
      skillLevels: {
        expert: "Expert",
        advanced: "Avancé",
        intermediate: "Intermédiaire"
      }
    },
    testimonials: {
      subtitle: "Témoignages",
      title: "Ce qu'ils disent",
      list: [
        {
          name: "Marc-André K.",
          role: "Directeur Technique @ TechFlow",
          content: "J'ai travaillé avec Johnny sur la refonte de notre infrastructure. Ce qui m'a frappé, c'est sa capacité à anticiper les pannes réseaux avant même qu'elles n'arrivent. Un vrai talent brut qui ne se contente pas de coder, mais qui comprend l'architecture globale.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "Amina B.",
          role: "Product Lead",
          content: "Au-delà de ses compétences en Full-Stack, Johnny apporte une rigueur issue de son passé en mécanique qui fait toute la différence. Ses livrables sont propres, documentés et surtout, il respecte les délais, ce qui est rare de nos jours.",
          rating: 5,
          image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "David O.",
          role: "Développeur Senior",
          content: "Johnny a cette curiosité insatiable. On l'a vu apprendre Go en une semaine pour nous débloquer sur un microservice. C'est le genre de profil 'T-shaped' qu'on s'arrache dans les startups.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&h=200&auto=format&fit=crop"
        }
      ]
    }
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      resume: "My CV"
    },
    hero: {
      status: "Available for new challenges",
      title: "I am",
      titleGradient: "Johnny Nkunku",
      description: "IT Engineer, programmer, and developer, passionate about the IT field such as networking, programming, cloud computing, and artificial intelligence.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      scroll: "Scroll"
    },
    about: {
      subtitle: "About Me",
      title: "The Architect Behind the Code",
      p1: "I'm Johnny Nkunku, an IT engineer and full-stack programmer dedicated to solving complex technical challenges. My background features a strategic transition from mechanical engineering to software development, providing me with a rigorous and structured approach to system design.",
      p2: "Specializing in maintenance, networking, and web development, I bridge the gap between hardware and software to build robust technological solutions. My goal is to turn innovative ideas into high-performance, secure applications.",
      stats: {
        projects: "Projects Completed",
        projectsValue: "2+",
        experience: "Level",
        experienceValue: "Junior"
      }
    },
    projects: {
      subtitle: "Portfolio",
      title: "Selected Works",
      liveDemo: "Live Demo",
      source: "Source",
      viewAll: "View All on GitHub"
    },
    skills: {
      subtitle: "Expertise",
      title: "Technical Arsenal",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        infrastructure: "Infrastructure",
        systems: "Systems"
      }
    },
    experience: {
      subtitle: "Experience",
      title: "Professional Journey"
    },
    contact: {
      subtitle: "Contact",
      title: "Let's Build Something Great",
      description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
      email: "Email",
      phone: "Phone",
      phoneValue: "+(243) 842 676 790",
      location: "Location",
      locationValue: "Kinshasa, DRC (Remote Friendly)",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        placeholderName: "Your name",
        placeholderEmail: "your@email.com",
        placeholderMessage: "Tell me about your project..."
      }
    },
    footer: {
      rights: "© 2026 Johnny Nkunku. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    cv: {
      download: "Download CV",
      back: "Back to Portfolio",
      title: "Curriculum Vitae",
      personalInfo: "Personal Information",
      education: "Education",
      educationList: [
        {
          degree: "Bachelor's in Maintenance and Networks",
          institution: "Computer Systems Engineering",
          period: "2021 - 2025"
        },
        {
          degree: "Cisco IT Certification",
          institution: "Networking & Security",
          period: "2024"
        },
        {
          degree: "Automotive Mechanics Training",
          institution: "Mechanical Engineering",
          period: "2022"
        },
        {
          degree: "General Mechanics - Class of 2021",
          institution: "Science and Technology",
          period: "2017 - 2021"
        }
      ],
      credly: "Credly Profile",
      credlyLink: "https://www.credly.com/users/johnny-nkunku",
      languages: "Languages",
      languageList: {
        french: "French",
        frenchLevel: "Native",
        english: "English",
        englishLevel: "Basic",
        arabic: "Arabic",
        arabicLevel: "Intermediate"
      },
      interests: "Interests",
      skillLevels: {
        expert: "Expert",
        advanced: "Advanced",
        intermediate: "Intermediate"
      }
    },
    testimonials: {
      subtitle: "Testimonials",
      title: "What They Say",
      list: [
        {
          name: "Marc-André K.",
          role: "Technical Director @ TechFlow",
          content: "I worked with Johnny on our infrastructure redesign. What struck me was his ability to anticipate network failures before they even happened. A real raw talent who doesn't just code, but understands the global architecture.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "Amina B.",
          role: "Product Lead",
          content: "Beyond his Full-Stack skills, Johnny brings a rigor from his mechanical background that makes all the difference. His deliverables are clean, documented, and most importantly, he meets deadlines, which is rare these days.",
          rating: 5,
          image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "David O.",
          role: "Senior Developer",
          content: "Johnny has this insatiable curiosity. We saw him learn Go in a week to unblock us on a microservice. He's the kind of 'T-shaped' profile that startups fight for.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&h=200&auto=format&fit=crop"
        }
      ]
    }
  },
  ar: {
    nav: {
      about: "حول",
      projects: "المشاريع",
      experience: "الخبرة",
      skills: "المهارات",
      contact: "اتصل",
      resume: "سيرتي الذاتية"
    },
    hero: {
      status: "متاح لتحديات جديدة",
      title: "أنا",
      titleGradient: "جوني نكونكو",
      description: "مهندس تقنية معلومات ومبرمج ومطور، شغوف بمجال المعلوماتية مثل الشبكات والبرمجة والسحابة والذكاء الاصطناعي.",
      viewProjects: "عرض المشاريع",
      contactMe: "اتصل بي",
      scroll: "تمرير"
    },
    about: {
      subtitle: "عني",
      title: "المهندس وراء الكود",
      p1: "أنا جوني نكونكو، مهندس تقنية معلومات ومبرمج شامل متخصص في حل التحديات التقنية المعقدة. يتميز مساري بالانتقال الاستراتيجي من الهندسة الميكانيكية إلى تطوير البرمجيات، مما يمنحني نهجاً دقيقاً ومنظماً في تصميم الأنظمة.",
      p2: "من خلال تخصصي في الصيانة والشبكات وتطوير الويب، أجمع بين الخبرة في الأجهزة والبرمجيات لبناء حلول تقنية قوية. هدفي هو تحويل الأفكار المبتكرة إلى تطبيقات عالية الأداء وآمنة.",
      stats: {
        projects: "مشاريع مكتملة",
        projectsValue: "+2",
        experience: "المستوى",
        experienceValue: "مبتدئ"
      }
    },
    projects: {
      subtitle: "المعرض",
      title: "أعمال مختارة",
      liveDemo: "عرض مباشر",
      source: "المصدر",
      viewAll: "عرض الكل على GitHub"
    },
    skills: {
      subtitle: "الخبرة",
      title: "الترسانة التقنية",
      categories: {
        frontend: "الواجهة الأمامية",
        backend: "الواجهة الخلفية",
        infrastructure: "البنية التحتية",
        systems: "الأنظمة"
      }
    },
    experience: {
      subtitle: "الخبرة",
      title: "الرحلة المهنية"
    },
    contact: {
      subtitle: "اتصل",
      title: "لنبنِ شيئاً عظيماً",
      description: "أنا دائماً منفتح لمناقشة المشاريع الجديدة، الأفكار الإبداعية أو الفرص لتكون جزءاً من رؤاكم.",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      phoneValue: "+(243) 842 676 790",
      location: "الموقع",
      locationValue: "كينشاسا، جمهورية الكونغو الديمقراطية (متاح للعمل عن بعد)",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال الرسالة",
        placeholderName: "اسمك",
        placeholderEmail: "your@email.com",
        placeholderMessage: "أخبرني عن مشروعك..."
      }
    },
    footer: {
      rights: "© 2026 جوني نكونكو. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة"
    },
    cv: {
      download: "تحميل السيرة الذاتية",
      back: "العودة إلى المعرض",
      title: "السيرة الذاتية",
      personalInfo: "المعلومات الشخصية",
      education: "التعليم",
      educationList: [
        {
          degree: "ليسانس في الصيانة والشبكات",
          institution: "هندسة نظم المعلومات",
          period: "2021 - 2025"
        },
        {
          degree: "شهادة سيسكو في تقنية المعلومات",
          institution: "الشبكات والأمن",
          period: "2024"
        },
        {
          degree: "تدريب في ميكانيكا السيارات",
          institution: "الهندسة الميكانيكية",
          period: "2022"
        },
        {
          degree: "دفعة الدولة في الميكانيكا العامة",
          institution: "العلوم والتقنيات",
          period: "2017 - 2021"
        }
      ],
      credly: "ملف Credly",
      credlyLink: "https://www.credly.com/users/johnny-nkunku",
      languages: "اللغات",
      languageList: {
        french: "الفرنسية",
        frenchLevel: "أصلي",
        english: "الإنجليزية",
        englishLevel: "أساسي",
        arabic: "العربية",
        arabicLevel: "متوسط"
      },
      interests: "الاهتمامات",
      skillLevels: {
        expert: "خبير",
        advanced: "متقدم",
        intermediate: "متوسط"
      }
    },
    testimonials: {
      subtitle: "شهادات",
      title: "ماذا يقولون",
      list: [
        {
          name: "مارك أندريه ك.",
          role: "مدير تقني @ TechFlow",
          content: "لقد عملت مع جوني في إعادة تصميم بنيتنا التحتية. ما لفت انتباهي هو قدرته على توقع أعطال الشبكة قبل حدوثها. موهبة خام حقيقية لا تكتفي بالبرمجة فحسب، بل تفهم الهندسة العالمية.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "أمينة ب.",
          role: "قائدة منتج",
          content: "بعيدًا عن مهاراته الشاملة، يجلب جوني صرامة من خلفيته الميكانيكية تصنع كل الفرق. مخرجاته نظيفة وموثقة، والأهم من ذلك أنه يلتزم بالمواعيد النهائية، وهو أمر نادر هذه الأيام.",
          rating: 5,
          image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
          name: "ديفيد أ.",
          role: "مطور أول",
          content: "جوني لديه هذا الفضول الذي لا يشبع. رأيناه يتعلم لغة Go في أسبوع لفك حظرنا في خدمة مصغرة. إنه نوع الملف الشخصي 'T-shaped' الذي تتصارع عليه الشركات الناشئة.",
          rating: 6,
          image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&h=200&auto=format&fit=crop"
        }
      ]
    }
  }
};

export const PROJECT_DATA = {
  fr: [
    {
      title: "Portfolio Personnel",
      description: "Un portfolio moderne et réactif construit avec React, Tailwind CSS et Framer Motion pour présenter mes compétences et projets.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/portfolio/800/600"
    },
    {
      title: "Gestionnaire de Tâches",
      description: "Une application de gestion de tâches avec des fonctionnalités de filtrage, de tri et de stockage local.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/tasks/800/600"
    },
    {
      title: "Système de Monitoring Réseau",
      description: "Un outil simple pour surveiller l'état des périphériques réseau sur un réseau local.",
      tags: ["Python", "Scapy", "Flask", "Networking"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/network/800/600"
    }
  ],
  en: [
    {
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio built with React, Tailwind CSS, and Framer Motion to showcase my skills and projects.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/portfolio/800/600"
    },
    {
      title: "Task Manager",
      description: "A task management application with filtering, sorting, and local storage features.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/tasks/800/600"
    },
    {
      title: "Network Monitoring System",
      description: "A simple tool to monitor the status of network devices on a local network.",
      tags: ["Python", "Scapy", "Flask", "Networking"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/network/800/600"
    }
  ],
  ar: [
    {
      title: "المعرض الشخصي",
      description: "معرض أعمال حديث وسريع الاستجابة تم بناؤه باستخدام React و Tailwind CSS و Framer Motion لعرض مهاراتي ومشاريعي.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/portfolio/800/600"
    },
    {
      title: "مدير المهام",
      description: "تطبيق لإدارة المهام مع ميزات التصفية والفرز والتخزين المحلي.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/tasks/800/600"
    },
    {
      title: "نظام مراقبة الشبكة",
      description: "أداة بسيطة لمراقبة حالة أجهزة الشبكة على شبكة محلية.",
      tags: ["Python", "Scapy", "Flask", "Networking"],
      link: "#",
      github: "https://github.com/Johnnynkunku",
      image: "https://picsum.photos/seed/network/800/600"
    }
  ]
};

export const EXPERIENCE_DATA = {
  fr: [
    {
      company: "Projets Indépendants & Freelance",
      role: "Développeur Full Stack Junior",
      period: "2025 - Présent",
      description: [
        "Conception et déploiement d'applications web modernes avec React et Node.js, améliorant l'expérience utilisateur de 40%.",
        "Mise en œuvre de solutions cloud pour des clients locaux en RDC, réduisant les coûts d'infrastructure de 25%.",
        "Optimisation de la performance des sites web, atteignant un score Lighthouse de 95+ sur tous les projets."
      ]
    },
    {
      company: "Formation Académique & Stages",
      role: "Stagiaire en Maintenance et Réseau",
      period: "2024 - 2025",
      description: [
        "Assistance dans la maintenance préventive et curative, réduisant les temps d'arrêt du parc informatique de 15%.",
        "Configuration de réseaux locaux et dépannage, résolvant plus de 50 incidents techniques par mois.",
        "Participation active au déploiement d'une infrastructure IT pour une structure de 20+ postes."
      ]
    },
    {
      company: "INPP & ITP Banana",
      role: "Technicien en Mécanique",
      period: "2017 - 2022",
      description: [
        "Maintenance générale et automobile.",
        "Diagnostic technique et réparation de systèmes mécaniques.",
        "Base solide en ingénierie physique et structurelle."
      ]
    }
  ],
  en: [
    {
      company: "Independent Projects & Freelance",
      role: "Junior Full Stack Developer",
      period: "2025 - Present",
      description: [
        "Designing and deploying modern web applications using React and Node.js, improving user engagement by 40%.",
        "Implementing cloud solutions for local clients in DRC, reducing infrastructure costs by 25%.",
        "Optimizing website performance, achieving a Lighthouse score of 95+ on all projects."
      ]
    },
    {
      company: "Academic Training & Internships",
      role: "Maintenance & Network Intern",
      period: "2024 - 2025",
      description: [
        "Assisting in preventive and corrective maintenance, reducing IT downtime by 15%.",
        "Configuring local networks and troubleshooting, resolving over 50 technical incidents per month.",
        "Active participation in deploying IT infrastructure for a 20+ workstation setup."
      ]
    },
    {
      company: "INPP & ITP Banana",
      role: "Mechanics Technician",
      period: "2017 - 2022",
      description: [
        "General and automotive maintenance.",
        "Technical diagnosis and repair of mechanical systems.",
        "Solid foundation in physical and structural engineering."
      ]
    }
  ],
  ar: [
    {
      company: "مشاريع مستقلة وعمل حر",
      role: "مطور شامل مبتدئ",
      period: "2025 - الحاضر",
      description: [
        "تصميم ونشر تطبيقات ويب حديثة باستخدام React و Node.js، مما أدى إلى تحسين تجربة المستخدم بنسبة 40%.",
        "تنفيذ حلول سحابية للعملاء المحليين في جمهورية الكونغو الديمقراطية، مما قلل تكاليف البنية التحتية بنسبة 25%.",
        "تحسين أداء مواقع الويب، وتحقيق درجة Lighthouse تزيد عن 95 في جميع المشاريع."
      ]
    },
    {
      company: "التدريب الأكاديمي والتدريب المهني",
      role: "متدرب صيانة وشبكات",
      period: "2024 - 2025",
      description: [
        "المساعدة في الصيانة الوقائية والعلاجية، مما قلل من فترات توقف أجهزة الكمبيوتر بنسبة 15%.",
        "تكوين الشبكات المحلية واستكشاف الأخطاء وإصلاحها، وحل أكثر من 50 حادثة فنية شهريًا.",
        "المشاركة النشطة في نشر البنية التحتية لتكنولوجيا المعلومات لإعداد أكثر من 20 محطة عمل."
      ]
    },
    {
      company: "INPP & ITP Banana",
      role: "فني ميكانيكا",
      period: "2017 - 2022",
      description: [
        "الصيانة العامة وميكانيكا السيارات.",
        "التشخيص الفني وإصلاح الأنظمة الميكانيكية.",
        "أساس متين في الهندسة الفيزيائية والإنشائية."
      ]
    }
  ]
};
