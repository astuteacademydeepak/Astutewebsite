import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLang, langPath } from "../i18n";

const WA_NUMBER = "918899117757";

export default function Header({ onOpenLead }) {
  const { lang, t, toggleLang } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: langPath(lang, "/usa"), label: t.nav.usa },
    { to: langPath(lang, "/germany"), label: t.nav.germany },
    { to: langPath(lang, "/medical-careers"), label: t.nav.medical },
    { to: langPath(lang, "/career-counselling"), label: t.nav.counselling },
    { to: langPath(lang, "/blog"), label: t.nav.blog },
    { to: langPath(lang, "/events"), label: t.nav.events },
    { to: langPath(lang, "/about"), label: t.nav.about },
  ];

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/70" : "bg-white/80 backdrop-blur-md"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to={langPath(lang, "/")} className="flex items-center gap-2" data-testid="header-logo">
              <img
                src="https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/wyk1m34k_Astute%20logo%201.png"
                alt="Astute Academy"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors rounded-lg hover:bg-slate-50"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                data-testid="header-language-switcher"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-brand-blue text-xs font-semibold text-slate-700 transition-colors"
                aria-label="Switch language"
              >
                <span className={lang === "en" ? "text-brand-blue" : "text-slate-400"}>EN</span>
                <span className="text-slate-300">|</span>
                <span className={lang === "mr" ? "text-brand-blue" : "text-slate-400"} style={{fontFamily: "'Noto Sans Devanagari', sans-serif"}}>मराठी</span>
              </button>

              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                data-testid="header-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden lg:inline">{t.nav.whatsapp}</span>
              </a>

              <button
                onClick={onOpenLead}
                data-testid="header-book-cta"
                className="hidden md:inline-flex btn-orange px-4 lg:px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                {t.nav.bookCta}
              </button>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700"
                aria-label="Open menu"
                data-testid="header-mobile-menu-toggle"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" data-testid="mobile-menu">
          <div className="absolute inset-0 bg-brand-navy/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-display font-bold text-brand-navy">Menu</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">
                  {l.label}
                </Link>
              ))}
              <Link to={langPath(lang, "/contact")} className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">
                {t.nav.contact}
              </Link>
              <button
                onClick={toggleLang}
                className="w-full mt-4 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold flex items-center justify-between"
                data-testid="mobile-language-switcher"
              >
                <span>{t.lang.en} | {t.lang.mr}</span>
                <span className="text-brand-blue">{lang === "en" ? "EN" : "मराठी"}</span>
              </button>
            </nav>
            <div className="p-4 border-t border-slate-100 space-y-2">
              <button onClick={() => { setOpen(false); onOpenLead(); }} className="w-full btn-orange py-3 rounded-full text-sm font-semibold">
                {t.nav.bookCta}
              </button>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-emerald-500 text-emerald-700 text-sm font-semibold">
                <MessageCircle className="w-4 h-4" /> {t.nav.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
