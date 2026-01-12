'use client'
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
;
import { ContactSection } from '@/components/ContactSection';
import { useRouter } from 'next/navigation'

const Contact = () => {
  const { t, language } = useLanguage();
  const router = useRouter();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: { ar: 'تواصل معنا', en: 'Contact Us' } }]} />
        
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <ContactSection />
      </div>
    </div>
  );
};

export default Contact;






