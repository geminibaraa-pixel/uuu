'use client'
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Target, Eye, Heart, Flag, Quote, Sparkles } from 'lucide-react';
;
import { Card, CardContent } from '@/components/ui/card';
import aboutImage from '@/assets/about-university.jpg';
import { useRouter } from 'next/navigation'

const About = () => {
  const { t, language } = useLanguage();
  const router = useRouter();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  const values = [
    {
      icon: Eye,
      title: { ar: 'الرؤية', en: 'Vision' },
      description: {
        ar: 'مؤسسة تعليميه رائدة وطنياومتميزة اقليميا فعالة في بناء مجتمع المعرفة',
        en: 'A leading educational institution nationally, distinguished regionally, and effective in building a knowledge society.'
      },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: { ar: 'الرسالة', en: 'Mission' },
      description: {
        ar: 'إعداد خريجين يتمتعون بالكفاءة العلمية والمهنية والتعلم مدى الحياة، من خلال تقديم خبرة تعليمية رائدة ترتكز على بيئة علمية وتعليمية داعمة، وبرامج أكاديمية نوعية مبتكرة تسهم في مواكبة المتغيرات الراهنة والاحتياجات التنموية وتلبي متطلبات سوق العمل، وتسهم في خدمة المجتمع وتعزيز التنمية المستدامة',
        en: 'Preparing graduates who possess scientific and professional competence and lifelong learning skills, through providing a pioneering educational experience based on a supportive scientific and educational environment, and innovative, high-quality academic programs that contribute to keeping pace with contemporary changes and developmental needs, meet labor market requirements, serve the community, and enhance sustainable development.'
      },
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Flag,
      title: { ar: 'الأهداف', en: 'Goals' },
      description: {
        ar: 'تحقيق التميز الأكاديمي والبحثي، وتعزيز الشراكة المجتمعية، وتوفير بيئة تعليمية محفزة، وتنمية الموارد البشرية والمادية للجامعة.',
        en: 'Achieving academic and research excellence, enhancing community partnership, providing a stimulating educational environment, and developing human and material resources.'
      },
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: Heart,
      title: { ar: 'القيم', en: 'Values' },
      description: {
        ar: 'الريادة والتعلم المستمر , الابتكار والإبداع ,المسؤولية والشفافية , العمل بروح الفريق',
        en: 'Leadership and Continuous Learning , Innovation and Creativity , Responsibility and Transparency , Teamwork Spirit'
      },
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div data-breadcrumb="local">
          <Breadcrumb items={[{ label: { ar: 'عن الجامعة', en: 'About' } }]} />
        </div>

        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="mb-16 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('عن جامعة الجيل الجديد', 'About AJ JEEL ALJADEED UNIVERSITY')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(
                'جامعة الجيل الجديد تأسست سنة 2022م.وتقع وسط العاصمة صنعاء في شارع الرقاص من جهة الدائري ويمكن الوصول اليهاء ايضا من شارع الستين. وتضم الجامعة حاليا اربع كليات هي كلية الطب البشري وكلية العلوم الطبية والصحيه وكليه الهندسة وتكنولوجيا المعلومات وكلية العلوم الاداريه والانسانية ',
                'Al Jeel Al Jadeed University was established in 2022 and is located in the center of the capital, Sana’a, on Al-Raqqas Street near the Ring Road. It can also be accessed from Sixty Street. The university branch is also located on Al-Maqaleh Street. The university currently includes four colleges: the College of Human Medicine, the College of Medical and Health Sciences, the College of Engineering and Information Technology, and the College of Administrative and Human Sciences.'
              )}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <img
              src={(aboutImage as any).src || aboutImage}

              alt={t('جامعة الجيل الجديد', 'Al Jeel Al Jadeed University')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Top Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`} />

              <CardContent className="pt-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-center mb-3">
                  {t(value.title.ar, value.title.en)}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed text-sm">
                  {t(value.description.ar, value.description.en)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            {t('كلمة رئيس الجامعة', "President's Message")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
            {t(
              'بسم الله الرحمن الرحيم. الحمد لله رب العالمين، والصلاة والسلام على خاتم الأنبياء والمرسلين، محمد بن عبدالله الصادق الأمين، وعلى آله وصحبه أجمعين. يسرني أن أرحب بأبنائنا الطلاب والطالبات الذين يتطلعون للانضمام إلى أسرة الجامعة والالتحاق بأحد برامجها الأكاديمية للعام الجامعي 2023 – 2024م، وأن أقدم هذا الدليل الذي يعطي لمحة موجزة عن التخصصات الأكاديمية المتاحة في الجامعة.',
              'In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of the Worlds, and prayers and peace be upon the Seal of the Prophets and Messengers... I am pleased to welcome our male and female students who are looking forward to joining the university family...'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;






