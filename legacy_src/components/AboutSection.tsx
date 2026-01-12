import { Target, Eye, Heart, Sparkles, Flag, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import studentsStudying from '@/assets/students-studying.jpg';

export const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Eye,
      title: { ar: 'الرؤية', en: 'Vision' },
      content: {
        ar: 'مؤسسة تعليميه رائدة وطنياومتميزة اقليميا فعالة في بناء مجتمع المعرفة',
        en: 'A leading educational institution nationally, distinguished regionally, and effective in building a knowledge society.'
      },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: { ar: 'الرسالة', en: 'Mission' },
      content: {
        ar: 'إعداد خريجين يتمتعون بالكفاءة العلمية والمهنية والتعلم مدى الحياة، من خلال تقديم خبرة تعليمية رائدة ترتكز على بيئة علمية وتعليمية داعمة، وبرامج أكاديمية نوعية مبتكرة تسهم في مواكبة المتغيرات الراهنة والاحتياجات التنموية وتلبي متطلبات سوق العمل، وتسهم في خدمة المجتمع وتعزيز التنمية المستدامة',
        en: 'Preparing graduates who possess scientific and professional competence and lifelong learning skills, through providing a pioneering educational experience based on a supportive scientific and educational environment, and innovative, high-quality academic programs that contribute to keeping pace with contemporary changes and developmental needs, meet labor market requirements, serve the community, and enhance sustainable development.'
      },
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Flag,
      title: { ar: 'الأهداف', en: 'Goals' },
      content: {
        ar: 'تحقيق التميز الأكاديمي والبحثي، وتعزيز الشراكة المجتمعية، وتوفير بيئة تعليمية محفزة، وتنمية الموارد البشرية والمادية للجامعة.',
        en: 'Achieving academic and research excellence, enhancing community partnership, providing a stimulating educational environment, and developing human and material resources.'
      },
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: Heart,
      title: { ar: 'القيم', en: 'Values' },
      content: {
        ar: 'الريادة والتعلم المستمر , الابتكار والإبداع ,المسؤولية والشفافية , العمل بروح الفريق',
        en: 'Leadership and Continuous Learning , Innovation and Creativity , Responsibility and Transparency , Teamwork Spirit'
      },
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4 + i * 0.15,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="about" className="py-16 md:py-20 bg-card relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('تعرف علينا', 'About Us')}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('عن الجامعة', 'About the University')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'جامعة الجيل الجديد تأسست سنة 2022م.وتقع وسط العاصمة صنعاء في شارع الرقاص من جهة الدائري ويمكن الوصول اليهاء ايضا من شارع الستين. وتضم الجامعة حاليا اربع كليات هي كلية الطب البشري وكلية العلوم الطبية والصحيه وكليه الهندسة وتكنولوجيا المعلومات وكلية العلوم الاداريه والانسانية ',
              'Al Jeel Al Jadeed University was established in 2022 and is located in the center of the capital, Sana’a, on Al-Raqqas Street near the Ring Road. It can also be accessed from Sixty Street. The university branch is also located on Al-Maqaleh Street. The university currently includes four colleges: the College of Human Medicine, the College of Medical and Health Sciences, the College of Engineering and Information Technology, and the College of Administrative and Human Sciences.'
            )}
          </p>
        </motion.div>

        {/* Vision, Mission, Values, Goals */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 md:mb-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="group relative bg-background rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-border/50 overflow-hidden"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Top Bar */}
              <motion.div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
              />

              {/* Icon */}
              <motion.div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ duration: 0.3 }}
              >
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4">
                {t(value.title.ar, value.title.en)}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t(value.content.ar, value.content.en)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image */}
          <motion.div
            className="relative group"
            variants={itemVariants}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src={studentsStudying}
                alt={t('الطلاب يدرسون', 'Students Studying')}
                className="w-full h-auto max-h-72 sm:max-h-96 lg:max-h-[720px] object-contain object-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {t('د. همدان الشامي', 'Distinguished Learning Environment')}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {t(
                    'نوفر بيئة تعليمية حديثة بمختبرات متطورة',
                    'We provide a modern educational environment with state-of-the-art laboratories'
                  )}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className="relative bg-background/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-border/50 overflow-hidden group"
              whileHover={{
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-primary/50 opacity-100" />
              <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10 rotate-180" />
              <Quote className="absolute bottom-6 left-6 w-16 h-16 text-secondary/10" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {t('كلمة رئيس الجامعة', "President's Message")}
                  </h3>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg text-justify font-medium">
                  <p className="italic text-foreground/80">
                    "{t(
                      'بسم الله الرحمن الرحيم. الحمد لله رب العالمين، والصلاة والسلام على خاتم الأنبياء والمرسلين، محمد بن عبدالله الصادق الأمين، وعلى آله وصحبه أجمعين.',
                      'In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of the Worlds, and prayers and peace be upon the Seal of the Prophets and Messengers, Muhammad bin Abdullah, the Truthful and Trustworthy, and upon all his family and companions.'
                    )}"
                  </p>
                  <p>
                    {t(
                      'يسرني أن أرحب بأبنائنا الطلاب والطالبات الذين يتطلعون للانضمام إلى أسرة الجامعة والالتحاق بأحد برامجها الأكاديمية للعام الجامعي 2023 – 2024م، وأن أقدم هذا الدليل الذي يعطي لمحة موجزة عن التخصصات الأكاديمية المتاحة في الجامعة.',
                      'I am pleased to welcome our male and female students who are looking forward to joining the university family and enrolling in one of its academic programs for the academic year 2023-2024, and to present this guide which gives a brief overview of the academic specializations available at the university.'
                    )}
                  </p>
                  <p>
                    {t(
                      'أبنائي الطلاب والطالبات... سعت الجامعة منذ تأسيسها بكل جد أن تكون شريكاً فاعلاً في تحسين نوعية التعليم الجامعي، وتوفير بيئة جامعية تشجع على الإبداع والريادة والتميز وتنمية قدراتهم ومواهبهم.',
                      'My students... Since its establishment, the university has strived earnestly to be an effective partner in improving the quality of university education, and providing a university environment that encourages creativity, leadership, excellence, and the development of their capabilities and talents.'
                    )}
                  </p>
                  <p>
                    {t(
                      'وهي حريصة على تحديث برامجها باستمرار، واستقطاب الكوادر الأكاديمية المتميزة، وتوظيف التقنيات الحديثة. كما تسعى لتعزيز شراكاتها المجتمعية والأكاديمية، وترسيخ قيم الجودة لضمان أفضل المخرجات.',
                      'It is keen to constantly update its programs, attract distinguished academic staff, and employ modern technologies. It also seeks to strengthen its community and academic partnerships, and consolidate quality values to ensure the best outputs.'
                    )}
                  </p>
                  <p>
                    {t(
                      'ختاماً، نثق بأنكم ستكونون على قدر المسؤولية في تمثيل الجامعة وتحقيق رؤيتها، وبناء مستقبل مشرق لكم ولوطنكم. والله ولي التوفيق.',
                      'In conclusion, we trust that you will be up to the responsibility of representing the university and achieving its vision, and building a bright future for you and your country. And Allah is the Guardian of success.'
                    )}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/50 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-primary mb-1">
                      {t('أ.د/ همدان الشامي', 'Prof. Dr. Hamdan Al-Shami')}
                    </h4>
                    <p className="text-sm text-secondary font-medium">
                      {t('رئيس الجامعة', 'University President')}
                    </p>
                  </div>
                  {/* Signature Placeholder */}
                  <div className="hidden sm:block opacity-50 font-handwriting text-2xl text-primary -rotate-6">
                    {t('حمدان الشامي', 'Hamdan Al-Shami')}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section >
  );
};
