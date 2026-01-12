import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { offersService } from '@/services/data/offers.service.mock';
import { Offer } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function OfferDetails() {
  const { t, language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOffer = async () => {
      setIsLoading(true);
      const data = await offersService.getById(id || '');
      setOffer(data || null);
      setIsLoading(false);
    };

    loadOffer();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/offers');
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareTitle = getText(offer?.titleAr, offer?.titleEn);
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url,
        });
      } catch {
        // Ignore share cancellation
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Ignore clipboard failures
    }
  };

  const BreadcrumbArrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const getText = (ar?: string, en?: string) => {
    const arText = (ar || '').trim();
    const enText = (en || '').trim();
    if (arText && enText) return t(arText, enText);
    return arText || enText;
  };

  const categoryLabel = (category?: Offer['category']) => {
    if (!category) return '';
    switch (category) {
      case 'scholarship':
        return t('منحة', 'Scholarship');
      case 'training':
        return t('تدريب', 'Training');
      case 'academic':
        return t('عرض أكاديمي', 'Academic');
      case 'other':
        return t('عرض', 'Offer');
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="p-0">
                  <Skeleton className="h-64 w-full rounded-md" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <Card>
            <CardContent className="p-6 space-y-4 text-center">
              <p className="text-lg font-semibold">{t('العرض غير موجود', 'Offer not found')}</p>
              <Button variant="outline" onClick={() => navigate('/offers')}>
                {t('رجوع', 'Back')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const title = getText(offer.titleAr, offer.titleEn);
  const shortDescription = getText(offer.descAr, offer.descEn);
  const fullDescription = getText(offer.detailsAr || offer.descAr, offer.detailsEn || offer.descEn);
  const category = categoryLabel(offer.category);

  const infoItems = [
    {
      label: t('الفئة المستهدفة', 'Target Audience'),
      value: getText(offer.targetAudienceAr, offer.targetAudienceEn),
    },
    {
      label: t('المزايا', 'Benefits'),
      value: getText(offer.benefitsAr, offer.benefitsEn),
    },
    {
      label: t('مدة العرض', 'Duration'),
      value: getText(offer.durationAr, offer.durationEn),
    },
    {
      label: t('مكان التنفيد', 'Location'),
      value: getText(offer.locationAr, offer.locationEn),
    },
    {
      label: t('شروط القبول', 'Eligibility'),
      value: getText(offer.requirementsAr, offer.requirementsEn),
    },
  ].filter((item) => item.value.trim().length > 0);

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBack}
                className="w-fit font-bold gap-2 hover:scale-105 transition-transform"
              >
                {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t('رجوع', 'Back')}
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                  {t('الرئيسية', 'Home')}
                </Link>
                <BreadcrumbArrow className="h-4 w-4" aria-hidden="true" />
                <Link to="/offers" className="hover:text-foreground transition-colors">
                  {t('العروض', 'Offers')}
                </Link>
              </div>
            </div>
            {title && (
              <h1 className="text-3xl md:text-4xl font-display font-bold truncate sm:whitespace-normal">
                {title}
              </h1>
            )}
            {/* Category Badge Removed as per user request */}
            {offer.validUntil && (
              <span className="text-sm text-muted-foreground">
                {t('ساري حتى', 'Valid until')}: {offer.validUntil}
              </span>
            )}
          </div>
          {shortDescription && (
            <p className="text-muted-foreground max-w-2xl">{shortDescription}</p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced CTA Section instead of generic actions */}
            <Card className="overflow-hidden border-0 shadow-lg ring-1 ring-black/5">
              <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
                <h3 className="text-xl font-bold font-display mb-2">
                  {t('هل أنت مهتم بهذا العرض؟', 'Interested in this Offer?')}
                </h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  {t(
                    'لا تفوت الفرصة! قدم الآن أو تواصل معنا لمزيد من التفاصيل.',
                    'Don\'t miss out! Apply now or contact us for more details.'
                  )}
                </p>

                <div className="flex flex-col gap-3">
                  {offer.applyLink && (
                    <Button
                      asChild
                      className="w-full bg-white text-primary hover:bg-white/90 hover:scale-[1.02] transition-all font-bold shadow-sm"
                      size="lg"
                    >
                      <a href={offer.applyLink} target="_blank" rel="noreferrer">
                        {t('التقديم الآن', 'Apply Now')}
                      </a>
                    </Button>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 transition-all bg-transparent"
                  >
                    <Link to="/contact">
                      {t('تواصل للاستفسار', 'Contact for Inquiry')}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {infoItems.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-lg font-semibold">{t('معلومات العرض', 'Offer Info')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoItems.map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {offer.image && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={offer.image}
                    alt={title || t('عرض', 'Offer')}
                    className="w-full h-auto rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {fullDescription && (
          <>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold">
                {t('وصف كامل', 'Full Description')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{fullDescription}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}







