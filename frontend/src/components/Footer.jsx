import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";
import { useLang, langPath } from "../i18n";

export default function Footer() {
  const { lang, t, toggleLang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-24" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14">
          <div className="lg:col-span-2 max-w-md">
            <img
              src="https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/ce2da6b5892696c3_Astute%20logo%20New_H.png"
              alt="Astute Academy"
              className="h-14 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="space-y-2 text-sm text-white/80">
              <a href="tel:+918899117757" className="flex items-center gap-2 hover:text-brand-orange transition-colors"><Phone className="w-4 h-4" /> 8899117757 / 8899117767</a>
              <a href="mailto:info@astuteacademy.com" className="flex items-center gap-2 hover:text-brand-orange transition-colors"><Mail className="w-4 h-4" /> info@astuteacademy.com</a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 hover:border-brand-orange hover:bg-brand-orange/10 flex items-center justify-center transition-colors" aria-label="Social link">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.programs}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to={langPath(lang, "/usa")} className="hover:text-brand-orange">USA</Link></li>
              <li><Link to={langPath(lang, "/germany")} className="hover:text-brand-orange">Germany</Link></li>
              <li><Link to={langPath(lang, "/uk")} className="hover:text-brand-orange">UK</Link></li>
              <li><Link to={langPath(lang, "/canada")} className="hover:text-brand-orange">Canada</Link></li>
              <li><Link to={langPath(lang, "/australia")} className="hover:text-brand-orange">Australia</Link></li>
              <li><Link to={langPath(lang, "/medical-careers")} className="hover:text-brand-orange">{t.nav.medical}</Link></li>
              <li><Link to={langPath(lang, "/career-counselling")} className="hover:text-brand-orange">{t.nav.counselling}</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.resources}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to={langPath(lang, "/blog")} className="hover:text-brand-orange">{t.nav.blog}</Link></li>
              <li><Link to={langPath(lang, "/events")} className="hover:text-brand-orange">{t.nav.events}</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.company}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to={langPath(lang, "/about")} className="hover:text-brand-orange">{t.footer.about}</Link></li>
              <li><Link to={langPath(lang, "/contact")} className="hover:text-brand-orange">{t.footer.contact}</Link></li>
              <li><button onClick={toggleLang} className="hover:text-brand-orange" data-testid="footer-language-switcher">English | मराठी</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>© {year} Astute Academy. {t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-orange">{t.footer.privacy}</a>
            <a href="#" className="hover:text-brand-orange">{t.footer.terms}</a>
            <a href="#" className="hover:text-brand-orange">{t.footer.disclaimer}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
