import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqService } from '@/services/data/faq.service.mock';
import { FAQItem } from '@/types';
import { LoadingState } from '@/components/common/LoadingState';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export default function FAQ() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadFAQs = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await faqService.getAll();
        setFaqs(data);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadFAQs();
  }, []);

  if (isLoading) {
    return <LoadingState messageAr="جاري التحميل..." messageEn="Loading..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4">
          <ErrorState onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <Breadcrumb items={[{ label: { ar: 'الأسئلة الشائعة', en: 'FAQ' } }]} />

        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-secondary hover:text-secondary/80 hover:bg-secondary/10"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t('الأسئلة الشائعة', 'Frequently Asked Questions')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'إجابات على الأسئلة الأكثر شيوعاً حول الجامعة والدراسة',
              'Answers to the most common questions about the university and studies'
            )}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline" aria-label={t(faq.questionAr, faq.questionEn)}>
                  {t(faq.questionAr, faq.questionEn)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4">
                  {t(faq.answerAr, faq.answerEn)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
