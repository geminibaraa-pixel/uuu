import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { campusLifeService } from '@/services/data/campuslife.service.mock';
import { CampusLifeItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LoadingState } from '@/components/common/LoadingState';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampusLifeDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [item, setItem] = useState<CampusLifeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const isRTL = language === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const fetchItem = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await campusLifeService.getItemBySlug(slug);
        setItem(data || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  if (loading) {
    return <LoadingState message={t('جاري التحميل...', 'Loading...')} />;
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t('لم يتم العثور على عنصر من الحياة الجامعية', 'Campus life item not found')}
          </h1>
          <Button onClick={() => navigate('/campus-life')}>
            {t('العودة إلى الحياة الجامعية', 'Back to Campus Life')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-secondary/10 via-background to-primary/10 overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb
            items={[
              { label: { ar: 'الحياة الجامعية', en: 'Campus Life' }, href: '/campus-life' },
              { label: { ar: item.titleAr, en: item.titleEn } }
            ]}
          />

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/campus-life')}
            className="mb-6 font-bold gap-2 hover:scale-105 transition-transform"
          >
            <BackArrow className="w-4 h-4" />
            {t('العودة إلى الحياة الجامعية', 'Back to Campus Life')}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-secondary/90 text-secondary-foreground">
                {item.category}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {t(item.titleAr, item.titleEn)}
            </h1>

            <p className="text-muted-foreground text-lg max-w-3xl">
              {t(item.descriptionAr, item.descriptionEn)}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              {item.image ? (
                <img
                  src={item.image}
                  alt={t(item.titleAr, item.titleEn)}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[300px] md:h-[400px] bg-secondary/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-secondary">{item.id}</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <Card className="border-secondary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  {t('عن هذه التجربة', 'About this experience')}
                </h2>
                <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                  {t(item.contentAr, item.contentEn)}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-1 space-y-6 lg:sticky lg:top-24"
          >
            {/* Enhanced Visual Section instead of generic links */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="bg-white rounded-t-[calc(var(--radius)-1px)] p-6">
                    <h3 className="text-xl font-bold font-display mb-4 text-primary">
                      {t('صور من الحياة الجامعية', 'Campus Life Gallery')}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                        <img
                          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400"
                          alt="Campus Life 1"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                        <img
                          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
                          alt="Campus Life 2"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                        <img
                          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400"
                          alt="Campus Life 3"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          +12
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary p-4 text-white text-center">
                    <p className="font-medium text-sm">
                      {t('عش التجربة الجامعية المتكاملة', 'Live the complete university experience')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-secondary/10 border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {t('شاركنا تجربتك', 'Share Your Story')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('هل لديك صور أو قصص ملهمة من حياتك الجامعية؟ نود أن نسمع منك!', 'Do you have inspiring photos or stories from your campus life? We would love to hear from you!')}
                  </p>
                  <Button variant="outline" className="w-full bg-white hover:bg-primary hover:text-white transition-colors">
                    {t('تواصل معنا', 'Contact Us')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
