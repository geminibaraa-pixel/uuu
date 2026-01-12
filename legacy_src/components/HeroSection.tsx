import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, GraduationCap, Users, Award, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroCampus from '@/assets/ngu-building.jpg';

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };



  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <img
          src={heroCampus}
          alt={t('الحرم الجامعي', 'University Campus')}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 pt-20 text-center text-white"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20"
            variants={itemVariants}
          >
            <GraduationCap className="w-4 h-4 text-secondary" />
            {t('مرحباً بكم في جامعة الجيل الجديد', 'Welcome to AJ JEEL ALJADEED UNIVERSITY')}
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">
              {t('جامعة الجيل الجديد', 'AJ JEEL ALJADEED')}
            </span>
            <br />
            <span className="text-secondary">{t('الجامعة', 'UNIVERSITY')}</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-2xl text-white/80 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {t(
              'مؤسسة تعليمية رائدة تهدف إلى إعداد خريجين متخصصين ومؤهلين علميًا وتقنيًا لخدمة المجتمع',
              'A leading educational institution aiming to prepare specialized and scientifically qualified graduates to serve the community'
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/admission')}
                className="bg-secondary text-primary hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-xl shadow-secondary/30 group w-full sm:w-auto"
              >
                {t('التقديم الآن', 'Apply Now')}
                {language === 'ar' ? (
                  <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/colleges')}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                {t('استكشف الكليات', 'Explore Colleges')}
              </Button>
            </motion.div>
          </motion.div>


        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-secondary transition-colors group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs sm:text-sm font-medium">{t('اكتشف المزيد', 'Discover More')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </div>
      </motion.button>
    </section>
  );
};
