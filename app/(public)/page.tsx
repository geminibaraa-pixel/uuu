'use client'
import { useEffect, useState } from 'react'
import { Users, GraduationCap, Calendar, Building2, Handshake, Sparkles, FolderOpen, Tag, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { StatsSection } from '@/components/StatsSection'
import { BookOpen, Award } from 'lucide-react'
import { CollegesSection } from '@/components/CollegesSection'
import { NewsSection } from '@/components/NewsSection'
import { ContactSection } from '@/components/ContactSection'
import { EventsSection } from '@/components/EventsSection'
import { CampusLifeSection } from '@/components/CampusLifeSection'
import { ScrollToTop } from '@/components/ScrollToTop'
import SmartChat from '@/components/SmartChat'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { teamService } from '@/services/data/team.service.mock'
import { facultyService } from '@/services/data/faculty.service.mock'
import { eventsService } from '@/services/data/events.service.mock'
import { centersService } from '@/services/data/centers.service.mock'
import { partnersService } from '@/services/data/partners.service.mock'
import { campusLifeService } from '@/services/data/campuslife.service.mock'
import { projectsService } from '@/services/data/projects.service.mock'
import { faqService } from '@/services/data/faq.service.mock'
import { offersService } from '@/services/data/offers.service.mock'
import type { TeamMember, FacultyMember, EventItem, CenterItem, PartnerItem, CampusLifeItem, ProjectItem, FAQItem, OfferItem } from '@/types'

export default function HomePage() {
    const { t, language } = useLanguage()
    const [events, setEvents] = useState<EventItem[]>([])
    const [campusLife, setCampusLife] = useState<CampusLifeItem[]>([])
    const [projects, setProjects] = useState<ProjectItem[]>([])
    const [faqs, setFaqs] = useState<FAQItem[]>([])
    const [offers, setOffers] = useState<OfferItem[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventsData, campusData, projectsData, faqData, offersData] = await Promise.all([
                    eventsService.getAllEvents(),
                    campusLifeService.getAllItems(),
                    projectsService.getAll(),
                    faqService.getAll(),
                    offersService.getAll(),
                ])

                setEvents(eventsData.slice(0, 4))
                setCampusLife(campusData.slice(0, 6))
                setProjects(projectsData.slice(0, 6))
                setFaqs(faqData.slice(0, 6))
                setOffers(offersData.slice(0, 4))
            } catch (error) {
                console.error('Error loading data:', error)
            }
        }

        loadData()
    }, [])

    return (
        <div className="scroll-smooth overflow-x-hidden">
            <main>
                <HeroSection />

                <StatsSection />

                <AboutSection />

                <CollegesSection />

                <NewsSection />

                <EventsSection />

                <CampusLifeSection />

                {/* FAQ Section */}
                <section id="faq" className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">
                                {t('الأسئلة المتكررة', 'Frequently Asked Questions')}
                            </h2>
                            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                {t('إجابات للأسئلة الشائعة', 'Answers to common questions')}
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
                </section>

                <ContactSection />
                <SmartChat />
            </main>
            <ScrollToTop />
        </div>
    )
}


