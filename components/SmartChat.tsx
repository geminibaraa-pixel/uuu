'use client'
import { useEffect, useRef, useState } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

export const SmartChat = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem('smartchat_messages');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'doctor' | 'guest' | 'editor' | 'admin'>('guest');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-detect role from localStorage (set by Login mock)
    const stored = localStorage.getItem('userRole');
    if (stored) {
      if (stored === 'student') setRole('student');
      else if (stored === 'teacher') setRole('doctor');
      else if (stored === 'editor') setRole('editor');
      else if (stored === 'admin') setRole('admin');
      else setRole('guest');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smartchat_messages', JSON.stringify(messages));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    // infer role from message text
    const inferred = inferRoleFromText(input.trim());
    if (inferred && inferred !== role) {
      setRole(inferred);
      const sysMsg: Message = { id: String(Date.now() + 1), role: 'system', text: language === 'ar' ? `تم التعرف عليك كـ ${roleLabel(inferred)}` : `Detected as ${roleLabel(inferred)}` };
      setMessages(prev => [...prev, sysMsg]);
    }

    const userMsg: Message = { id: String(Date.now()), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Placeholder: replace this block with actual AIP/API call
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text:
          (language === 'ar'
            ? 'شكراً لسؤالك — هذا رد تجريبي. سيتم ربط الدردشة بخدمة AIP لاحقاً لتقديم إجابات ذكية.'
            : 'Thanks — this is a demo reply. The chat will be connected to AIP later for smart responses.' )
      };
      setMessages(prev => [...prev, reply]);
      setLoading(false);
    }, 900);
  };

  // Simple heuristic to infer role from user's question text
  const inferRoleFromText = (text: string): 'student' | 'doctor' | 'editor' | 'admin' | 'guest' => {
    const tLower = text.toLowerCase();
    // Arabic keywords
    if (/\b(طالب|طالبة|الطالب|الطالبة|دراسة|مقرر|مشروع|تسجيل)\b/.test(tLower) || tLower.includes('طالب')) return 'student';
    if (/\b(دكتور|دكتورة|أستاذ|أستاذة|أستاذ")/.test(tLower) || tLower.includes('دكتور') || tLower.includes('أستاذ')) return 'doctor';
    if (/\b(محرر|تحرير|نشر|محتوى)\b/.test(tLower) || tLower.includes('محرر')) return 'editor';
    if (/\b(ادمن|مسؤول|admin|administrator|مدير)\b/.test(tLower) || tLower.includes('ادمن') || tLower.includes('مسؤول')) return 'admin';
    // English keywords
    if (tLower.match(/\b(student|homework|course|enroll|degree)\b/)) return 'student';
    if (tLower.match(/\b(professor|doctor|faculty|lecturer)\b/)) return 'doctor';
    if (tLower.match(/\b(editor|content|publish)\b/)) return 'editor';
    if (tLower.match(/\b(admin|administrator|manager)\b/)) return 'admin';
    return 'guest';
  };

  const roleLabel = (r: string) => {
    if (r === 'student') return language === 'ar' ? 'طالب' : 'Student';
    if (r === 'doctor') return language === 'ar' ? 'دكتور' : 'Doctor';
    if (r === 'editor') return language === 'ar' ? 'محرر محتوى' : 'Editor';
    if (r === 'admin') return language === 'ar' ? 'ادمن' : 'Admin';
    return language === 'ar' ? 'زائر' : 'Guest';
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('smartchat_messages');
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed z-50 bottom-[calc(16px+env(safe-area-inset-bottom))] right-6">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-14 h-14 rounded-full bg-secondary text-primary shadow-lg hover:shadow-xl ring-1 ring-black/5 flex items-center justify-center transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen(o => !o)}
          aria-label={t('الدردشة الذكية', 'Smart Chat')}
          title={t('\u0627\u0644\u0645\u0633\u0627\u0639\u062f \u0627\u0644\u0630\u0643\u064a', 'Smart Assistant')}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-0 left-0 right-0 z-50 h-[100dvh] bg-card/95 backdrop-blur-lg rounded-none shadow-2xl border border-border/50 overflow-hidden flex flex-col sm:bottom-24 sm:left-auto sm:right-6 sm:h-[520px] sm:w-[340px] md:w-[420px] sm:rounded-2xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/60">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <div>
                <div className="text-sm font-bold">{t('\u0627\u0644\u0645\u0633\u0627\u0639\u062f \u0627\u0644\u0630\u0643\u064a', 'Smart Assistant')}</div>
                <div className="text-xs text-muted-foreground">{t('\u0646\u0633\u0639\u062f \u0628\u0645\u0633\u0627\u0639\u062f\u062a\u0643', 'Happy to help')}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{role === 'guest' ? t('زائر', 'Guest') : role === 'student' ? t('طالب', 'Student') : role === 'doctor' ? t('دكتور', 'Doctor') : role === 'editor' ? t('محرر محتوى', 'Editor') : t('ادمن', 'Admin')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="text-xs text-muted-foreground hover:text-secondary">
                {t('مسح', 'Clear')}
              </button>
              <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-muted transition-colors duration-150">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={listRef} className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 [-webkit-overflow-scrolling:touch]">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground mt-12">
                {t('ابدأ المحادثة بطرح سؤال...', 'Start the conversation by asking a question...')}
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${isRtl ? 'text-right' : 'text-left'} ${m.role === 'user' ? 'ml-auto bg-secondary/20 text-foreground' : 'mr-auto bg-card/80 text-foreground'}`}>
                <div>{m.text}</div>
                <div className={`text-[10px] text-muted-foreground mt-1 ${isRtl ? 'text-right' : 'text-left'}`}>{m.role === 'user' ? (language === 'ar' ? '\u0623\u0646\u062a' : 'You') : (language === 'ar' ? '\u0627\u0644\u0645\u0633\u0627\u0639\u062f' : 'Assistant')}</div>
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] mr-auto bg-card/80 p-3 rounded-2xl text-sm text-muted-foreground flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />{t('O?OOUS OU,O?O-OUSO?...', 'Preparing response...')}</div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border/50 bg-background pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder={t('اكتب سؤالك هنا واضغط Enter...', 'Type your question and press Enter...')}
                className="flex-1 resize-none bg-transparent border border-border/30 rounded-lg px-3 py-2 text-sm outline-none max-h-24 overflow-y-auto"
              />
              <Button size="sm" onClick={sendMessage} disabled={loading || !input.trim()} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t('إرسال', 'Send')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SmartChat;

/*
Usage / Integration notes:
- This component is a front-end chat UI only. Replace the placeholder timeout in `sendMessage`
  with a real call to your AIP backend (pass `role` and message history for context).
- It's included in `Index.tsx` so it appears on the homepage. You can move it to `PublicLayout` to show globally.
*/



