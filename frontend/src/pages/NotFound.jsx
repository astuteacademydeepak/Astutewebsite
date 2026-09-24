import { Link } from "react-router-dom";
import { useLang, langPath } from "../i18n";

export default function NotFound() {
  const { lang, t } = useLang();
  const isMr = lang === "mr";
  return (
    <div className="pt-32 pb-24 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="text-8xl lg:text-9xl font-display font-extrabold text-brand-navy/10">404</div>
        <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-brand-navy tracking-tight mt-4">
          {isMr ? "आम्हाला हे पृष्ठ सापडले नाही." : "We couldn't find that page."}
        </h1>
        <p className="mt-4 text-slate-600">{isMr ? "कदाचित लिंक चुकीची असावी. मुख्यपृष्ठावर जाऊया." : "The link may be broken. Let's get you back on track."}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={langPath(lang, "/")} className="btn-orange px-6 py-3 rounded-full font-semibold text-sm">{isMr ? "मुख्यपृष्ठ" : "Go Home"}</Link>
          <Link to={langPath(lang, "/medical-careers")} className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors">{isMr ? "कार्यक्रम पहा" : "Explore Programs"}</Link>
          <Link to={langPath(lang, "/contact")} className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-slate-200 text-slate-700 hover:border-brand-blue">{isMr ? "संपर्क" : "Contact Astute"}</Link>
        </div>
      </div>
    </div>
  );
}
