import { useEffect, useState } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";

const WA_NUMBER = "918899117757";
const WA_MSG_EN = "Hello Astute Academy, I would like to know more about your programs.";
const WA_MSG_MR = "नमस्कार अ‍ॅस्ट्यूट अकादमी, मला तुमच्या कार्यक्रमांविषयी अधिक माहिती हवी आहे.";
const SHOW_AFTER = 600;
const DISMISS_KEY = "astute_sticky_bar_dismissed";

function useStickyBar() {
  const [past, setPast] = useState(false);
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISS_KEY) === "1");
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > SHOW_AFTER);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.stickyBar = past && !dismissed ? "on" : "off";
  }, [past, dismissed]);
  const dismiss = () => { sessionStorage.setItem(DISMISS_KEY, "1"); setDismissed(true); };
  return { visible: past && !dismissed, dismiss };
}

function StickyBar({ visible, onDismiss, onOpenLead, waLink, t }) {
  return (
    <div
      data-testid="sticky-counselling-bar"
      aria-hidden={!visible}
      className={`fixed bottom-0 inset-x-0 z-40 transition-[transform,opacity] duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center gap-3">
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-brand-orange animate-pulse shrink-0" />
          <p className="flex-1 min-w-0 line-clamp-2 md:truncate text-xs sm:text-sm leading-tight font-medium text-brand-navy" data-testid="sticky-bar-text">
            <span className="hidden md:inline">{t.stickyBar.text}</span>
            <span className="md:hidden">{t.stickyBar.short}</span>
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0"
            data-testid="sticky-bar-whatsapp"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenLead}
            className="btn-orange whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 shrink-0"
            data-testid="sticky-bar-book-cta"
          >
            {t.nav.bookCta}
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
            data-testid="sticky-bar-dismiss"
            aria-label={t.stickyBar.dismiss}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Overlays({ onOpenLead }) {
  const { lang, t } = useLang();
  const { visible, dismiss } = useStickyBar();
  const msg = encodeURIComponent(lang === "mr" ? WA_MSG_MR : WA_MSG_EN);
  const link = `https://wa.me/${WA_NUMBER}?text=${msg}`;

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:flex fixed right-6 z-40 items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 float-lift bottom-6 group animate-pulse-ring`}
        data-testid="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-semibold text-sm">{t.nav.whatsapp}</span>
      </a>

      <StickyBar visible={visible} onDismiss={dismiss} onOpenLead={onOpenLead} waLink={link} t={t} />
    </>
  );
}
