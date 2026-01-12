'use client'
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
;
import { AdmissionSection } from '@/components/AdmissionSection';
import { useRouter } from 'next/navigation'

const Admission = () => {
  const { t, language } = useLanguage();
  const router = useRouter();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div data-breadcrumb="local">
          <Breadcrumb items={[{ label: { ar: 'القبول والتسجيل', en: 'Admission' } }]} />
        </div>
        
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <AdmissionSection />
      </div>
    </div>
  );
};

export default Admission;






