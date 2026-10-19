import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, ChevronDown, Flag } from "lucide-react";
import { useLang, langPath } from "../i18n";

const WA_NUMBER = "918899117757";

export default function Header({ onOpenLead }) {
  const { lang, t, toggleLang } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mDestOpen, setMDestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDestOpen(false); setMDestOpen(false); }, [location.pathname]);

  const destinations = [
    {
      to: langPath(lang, "/usa"),
      label: lang === "mr" ? "USA शिक्षण" : "USA Education",
      desc: lang === "mr" ? "Bachelor's, Master's, Residency आणि USMLE" : "Bachelor's, Master's, Residency & USMLE",
      flag: "🇺🇸",
    },
    {
      to: langPath(lang, "/germany"),
      label: lang === "mr" ? "Germany शिक्षण" : "Germany Education",
      desc: lang === "mr" ? "शुल्कमुक्त विद्यापीठे, STEM आणि इंग्रजी-माध्यम" : "Tuition-free universities, STEM & English-medium",
      flag: "🇩🇪",
    },
  ];

  const links = [
    { to: langPath(lang, "/programs"), label: t.nav.programs, type: "link" },
    { label: t.nav.destinations, type: "dropdown", items: destinations },
    { to: langPath(lang, "/medical-careers"), label: t.nav.medical, type: "link" },
    { to: langPath(lang, "/career-counselling"), label: t.nav.counselling, type: "link" },
    { to: langPath(lang, "/blog"), label: t.nav.resources, type: "link" },
    { to: langPath(lang, "/about"), label: t.nav.about, type: "link" },
  ];

  const linkClass = "nav-glass-tab relative inline-flex items-center gap-1 whitespace-nowrap px-3 xl:px-3.5 py-2 rounded-full text-[14px] font-medium leading-none text-slate-700";
  const linkUnderline = "";

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/70" : "bg-white/80 backdrop-blur-md"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to={langPath(lang, "/")} className="flex items-center gap-2 shrink-0 mr-4" data-testid="header-logo">
              <img
                src="https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/ce2da6b5892696c3_Astute%20logo%20New_H.png"
                alt="Astute Academy"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap" data-testid="desktop-nav">
              {links.map((l) => {
                if (l.type === "dropdown") {
                  return (
                    <div
                      key={l.label}
                      className="relative"
                      onMouseEnter={() => setDestOpen(true)}
                      onMouseLeave={() => setDestOpen(false)}
                      data-testid="nav-destinations-dropdown"
                    >
                      <button
                        className={`${linkClass} ${linkUnderline} ${destOpen ? "is-open" : ""}`}
                        onClick={() => setDestOpen((v) => !v)}
                      >
                        {l.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${destOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[420px] transition-all origin-top ${destOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                          {l.items.map((it) => (
                            <Link
                              key={it.to}
                              to={it.to}
                              data-testid={`nav-dest-${it.label.toLowerCase().split(' ')[0]}`}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-light transition-colors group"
                            >
                              <div className="w-11 h-11 rounded-xl bg-brand-light group-hover:bg-white flex items-center justify-center text-2xl shrink-0 transition-colors">
                                {it.flag}
                              </div>
                              <div className="flex-1">
                                <div className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors">{it.label}</div>
                                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{it.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`${linkClass} ${linkUnderline}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 shrink-0 ml-3">
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
                className="hidden md:inline-flex lg:hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-brand-navy hover:text-brand-blue transition-colors"
                data-testid="header-whatsapp"
              >
                <MessageCircle className="w-4 h-4 text-brand-blue" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenLead}
                data-testid="header-book-cta"
                className="hidden md:inline-flex lg:hidden xl:inline-flex whitespace-nowrap btn-orange px-4 lg:px-5 py-2.5 rounded-full text-sm font-semibold items-center gap-1.5"
              >
                {t.nav.bookCta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
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
              {links.map((l) => {
                if (l.type === "dropdown") {
                  return (
                    <div key={l.label}>
                      <button onClick={() => setMDestOpen((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">
                        {l.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mDestOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mDestOpen && (
                        <div className="pl-4 space-y-1">
                          {l.items.map((it) => (
                            <Link key={it.to} to={it.to} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700">
                              <span>{it.flag}</span><span>{it.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link key={l.to} to={l.to} className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">
                    {l.label}
                  </Link>
                );
              })}
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
