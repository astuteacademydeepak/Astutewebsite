import { MessageCircle } from "lucide-react";
import { useLang } from "../i18n";

const WA_NUMBER = "918899117757";
const WA_MSG_EN = "Hello Astute Academy, I would like to know more about your programs.";
const WA_MSG_MR = "नमस्कार अ‍ॅस्ट्यूट अकादमी, मला तुमच्या कार्यक्रमांविषयी अधिक माहिती हवी आहे.";

export default function Overlays({ onOpenLead }) {
  const { lang, t } = useLang();
  const msg = encodeURIComponent(lang === "mr" ? WA_MSG_MR : WA_MSG_EN);
  const link = `https://wa.me/${WA_NUMBER}?text=${msg}`;

  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors group animate-pulse-ring"
        data-testid="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-semibold text-sm">{t.nav.whatsapp}</span>
      </a>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl" data-testid="mobile-bottom-bar">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-500 text-white font-semibold text-sm"
          data-testid="mobile-whatsapp-cta"
        >
          <MessageCircle className="w-4 h-4" /> {t.nav.whatsapp}
        </a>
        <button
          onClick={onOpenLead}
          className="btn-orange py-3 rounded-full font-semibold text-sm"
          data-testid="mobile-book-cta"
        >
          {t.nav.bookCta}
        </button>
      </div>
    </>
  );
}
