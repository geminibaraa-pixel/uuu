import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { collegesService } from '@/services/data/colleges.service.mock';
import { facultyService } from '@/services/data/faculty.service.mock';
import { College, FacultyMember } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Target, Eye, BookOpen, CheckCircle2, GraduationCap, Users, Award, Calendar, Flag } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { DisplayName } from '@/lib/transliterateArabicName';



const ENABLE_COLLEGE_ADMIN_CARD = true;

const DUMMY_ADMIN = {
  dean: '\u062f. \u0623\u062d\u0645\u062f \u0645\u062d\u0645\u062f',
  head: '\u062f. \u062e\u0627\u0644\u062f \u0639\u0644\u064a',
};

export default function CollegeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [college, setCollege] = useState<College | null>(null);
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const collegeData = await collegesService.getCollegeById(id);
        if (collegeData) {
          setCollege(collegeData);
          const allFaculty = await facultyService.getAllMembers();
          const collegeFaculty = allFaculty.filter(
            member => member.collegeAr === collegeData.nameAr || member.collegeEn === collegeData.nameEn
          );
          setFacultyMembers(collegeFaculty);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error || !college) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: college.image
              ? `url(${college.image})`
              : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="mb-6 space-y-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
              className="font-bold gap-2 hover:scale-105 transition-transform"
            >
              <ArrowIcon className="w-4 h-4" />
              {t('رجوع', 'Back')}
            </Button>
            <Breadcrumb
              items={[
                { label: { ar: 'الكليات', en: 'Colleges' }, href: '/colleges' },
                { label: { ar: college.nameAr, en: college.nameEn } }
              ]}
            />
          </div>

          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
              {t('كلية معتمدة', 'Accredited College')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">
              {t(college.nameAr, college.nameEn)}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              {t(college.descriptionAr, college.descriptionEn)}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-20 relative z-20">
          {[
            { icon: BookOpen, label: t('البرامج', 'Programs'), value: college.programs.length },
            { icon: Award, label: t('الأقسام', 'Departments'), value: new Set(college.programs.map(p => p.departmentAr).filter(Boolean)).size || college.programs.length },
            { icon: Users, label: t('أعضاء الهيئة', 'Faculty'), value: facultyMembers.length || '10+' },
            { icon: Calendar, label: t('سنوات الخبرة', 'Years'), value: '15+' },
          ].map((stat, index) => (
            <Card key={index} className="college-stat-card border-0 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <stat.icon className="college-stat-icon w-8 h-8 mx-auto mb-3" />
                <div className="college-stat-value text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="college-stat-label text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision & Mission & Goals */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t('الرؤية', 'Vision')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(college.visionAr, college.visionEn)}
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up border-l-4 border-l-secondary" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">{t('الرسالة', 'Mission')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(college.missionAr, college.missionEn)}
              </p>
            </CardContent>
          </Card>

          {college.goalsAr && (
            <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up border-l-4 border-l-green-500" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <Flag className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">{t('الأهداف', 'Goals')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t(college.goalsAr, college.goalsEn)}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Programs */}
        <Card className="mb-12 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t('البرامج الأكاديمية', 'Academic Programs')}</CardTitle>
                <p className="text-muted-foreground mt-1">{t('برامج متنوعة تلبي احتياجات سوق العمل', 'Diverse programs meeting market needs')}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-start p-3 font-semibold">{t('م', '#')}</th>
                    <th className="text-start p-3 font-semibold">{t('القسم العلمي', 'Department')}</th>
                    <th className="text-start p-3 font-semibold">{t('البرنامج الأكاديمي', 'Program')}</th>
                    <th className="text-start p-3 font-semibold">{t('نسبة القبول', 'Admission Rate')}</th>
                    <th className="text-start p-3 font-semibold">{t('نوع الثانوية', 'High School Type')}</th>
                    <th className="text-start p-3 font-semibold">{t('سنوات الدراسة', 'Study Years')}</th>
                  </tr>
                </thead>
                <tbody>
                  {college.programs.map((program, index) => (
                    <tr
                      key={program.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="p-3 text-muted-foreground">{index + 1}</td>
                      <td className="p-3">
                        {t(program.departmentAr, program.departmentEn) || '-'}
                      </td>
                      <td className="p-3 font-medium">
                        <Link
                          to={`/colleges/${college.id}/programs/${program.id}`}
                          className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        >
                          {t(program.nameAr, program.nameEn)}
                          <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="font-bold">
                          {program.admissionRate}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary">
                          {t(program.highSchoolType, program.highSchoolTypeEn)}
                        </Badge>
                      </td>
                      <td className="p-3 text-center font-medium">
                        {program.studyYears}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Admission Requirements / College Management */}
        {ENABLE_COLLEGE_ADMIN_CARD ? (
          <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in-up border border-[rgba(245,200,60,0.18)] shadow-[0_10px_22px_rgba(0,0,0,0.10)]" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-2xl">{t('\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0643\u0644\u064a\u0629', 'College Management')}</CardTitle>
            </CardHeader>
            <CardContent className={`space-y-5 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t('\u0639\u0645\u064a\u062f \u0627\u0644\u0643\u0644\u064a\u0629', 'College Dean')}</p>
                <p className="text-sm text-muted-foreground">
                  <span dir="rtl">{DUMMY_ADMIN.dean}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t('\u0631\u0626\u064a\u0633 \u0627\u0644\u0642\u0633\u0645', 'Head of Department')}</p>
                <p className="text-sm text-muted-foreground">
                  <span dir="rtl">{DUMMY_ADMIN.head}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{t('شروط القبول', 'Admission Requirements')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(college.admissionRequirementsAr, college.admissionRequirementsEn)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Faculty Members */}
        {/* Faculty Members */}
        {/* Faculty Members */}

        {facultyMembers.length > 0 && (
          <Card className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t('الكادر التدريسي', 'Faculty Members')}</CardTitle>
                  <p className="text-muted-foreground mt-1">{t('نخبة من الأساتذة المتميزين', 'A distinguished group of professors')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facultyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                        {member.image ? (
                          <img src={member.image} alt={t(member.nameAr, member.nameEn)} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          t(member.nameAr, member.nameEn).charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          <DisplayName nameAr={member.nameAr} nameEn={member.nameEn} />
                        </h4>
                        <p className="text-primary text-sm">{t(member.degreeAr, member.degreeEn)}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {t(member.specializationAr, member.specializationEn)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-foreground">
            {t('انضم إلينا اليوم', 'Join Us Today')}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              'ابدأ رحلتك الأكاديمية معنا واحصل على تعليم متميز يؤهلك للمستقبل',
              'Start your academic journey with us and receive outstanding education that prepares you for the future'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/admission">
                {t('التقديم الآن', 'Apply Now')}
                <ArrowIcon className="w-5 h-5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                {t('تواصل معنا', 'Contact Us')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
