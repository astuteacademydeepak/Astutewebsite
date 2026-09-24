import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, GraduationCap, Stethoscope, Users, Briefcase,
  Award, Compass, Map, Layers, LifeBuoy, MessageCircle, ChevronDown,
  ArrowUpRight, Star, Calendar, Clock, User as UserIcon,
} from "lucide-react";
import { useLang, langPath } from "../i18n";
import { publicApi } from "../lib/api";

const HERO_IMG = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=85";
const USA_IMG = "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900&q=80";
const GERMANY_IMG = "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=80";
const MED_IMG = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80";

/* ---------- HERO ---------- */
export function Hero({ onOpenLead }) {
  const { lang, t } = useLang();
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden hero-glow" data-testid="hero-section">
      <div className="absolute inset-0 grid-noise opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-blue mb-6 shadow-sm animate-fade-up">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              {t.hero.eyebrow}
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-navy leading-[1.05] tracking-tight text-balance animate-fade-up">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed animate-fade-up" style={{animationDelay: "0.1s"}}>
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up" style={{animationDelay: "0.2s"}}>
              <button onClick={onOpenLead} className="btn-orange inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/20" data-testid="hero-book-cta">
                {t.hero.primary} <ArrowRight className="w-4 h-4" />
              </button>
              <Link to={langPath(lang, "/medical-careers")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors" data-testid="hero-explore-programs">
                {t.hero.secondary}
              </Link>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 max-w-md animate-fade-up" style={{animationDelay: "0.3s"}}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy border-2 border-white" />)}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-brand-navy text-sm">{t.hero.trust}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/20 aspect-[4/5] animate-fade-in">
              <img src={HERO_IMG} alt="Astute Academy students" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center text-white"><Award className="w-5 h-5" /></div>
                  <div>
                    <div className="font-display font-bold text-brand-navy text-sm">Personalised Strategy</div>
                    <div className="text-xs text-slate-500">One mentor. One plan. One admission.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:block absolute -top-4 -left-8 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 w-52">
              <div className="text-xs text-brand-orange font-semibold uppercase tracking-widest mb-1">USA · Germany</div>
              <div className="font-display font-bold text-brand-navy text-base leading-tight">End-to-end mentoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- AUDIENCE ---------- */
export function AudiencePathway({ onOpenLead }) {
  const { t } = useLang();
  const items = [
    { icon: GraduationCap, ...t.audience.student, color: "from-brand-blue to-blue-700" },
    { icon: Stethoscope, ...t.audience.doctor, color: "from-brand-orange to-red-500" },
    { icon: Users, ...t.audience.parent, color: "from-brand-navy to-blue-900" },
    { icon: Briefcase, ...t.audience.professional, color: "from-emerald-600 to-teal-700" },
  ];
  return (
    <section className="py-16 lg:py-24 bg-brand-light" data-testid="audience-pathway">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Pathway Selector</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.audience.title}</h2>
          <p className="mt-4 text-slate-600 text-base lg:text-lg">{t.audience.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <button key={i} onClick={onOpenLead} data-testid={`audience-card-${i}`} className="text-left bg-white rounded-2xl p-6 border border-slate-100 card-hover group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${it.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <it.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{it.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{it.desc}</p>
              <div className="text-sm font-semibold text-brand-orange inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                {t.audience.cta}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DESTINATIONS ---------- */
export function Destinations() {
  const { lang, t } = useLang();
  const cards = [
    { title: "USA", desc: t.destinations.usaDesc, img: USA_IMG, link: langPath(lang, "/usa"), cta: t.destinations.exploreUsa, tag: "Bachelor's · Master's · Medical" },
    { title: "Germany", desc: t.destinations.germanyDesc, img: GERMANY_IMG, link: langPath(lang, "/germany"), cta: t.destinations.exploreGermany, tag: "Engineering · English-medium · STEM" },
  ];
  return (
    <section className="py-16 lg:py-24" data-testid="destinations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Destinations</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.destinations.title}</h2>
          <p className="mt-4 text-slate-600 text-base lg:text-lg">{t.destinations.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <Link key={i} to={c.link} data-testid={`destination-card-${c.title.toLowerCase()}`} className="group relative rounded-3xl overflow-hidden shadow-lg card-hover aspect-[5/4]">
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-7 lg:p-10 text-white">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">{c.tag}</div>
                <h3 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight mb-3">{c.title}</h3>
                <p className="text-white/85 max-w-md text-sm lg:text-base leading-relaxed mb-5">{c.desc}</p>
                <div className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all">
                  {c.cta} <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MEDICAL PATHWAY ---------- */
export function MedicalPathway() {
  const { lang, t } = useLang();
  return (
    <section className="py-16 lg:py-24 bg-brand-navy text-white relative overflow-hidden" data-testid="medical-pathway-section">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(235,95,34,0.4), transparent 40%)" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Medical Careers</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5">{t.medical.title}</h2>
            <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-7">{t.medical.subtitle}</p>
            <Link to={langPath(lang, "/medical-careers")} className="btn-orange inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm" data-testid="medical-cta">
              {t.medical.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {t.medical.programs.map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="font-display font-bold text-white mb-1">{p.t}</div>
                  <div className="text-xs text-white/60 leading-relaxed">{p.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl mb-6">
              <img src={MED_IMG} alt="Medical career" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/70 to-transparent" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {t.medical.pathway.map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`h-1.5 rounded-full mb-2 ${i === 0 ? "bg-brand-orange" : i < 4 ? "bg-white/40" : "bg-white/20"}`} />
                  <div className="text-[10px] sm:text-xs text-white/70 font-medium leading-tight">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ASTUTE ---------- */
export function WhyAstute() {
  const { t } = useLang();
  const icons = [Award, Compass, Map, Layers, LifeBuoy, Star];
  return (
    <section className="py-16 lg:py-24 bg-brand-light" data-testid="why-astute-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Why Astute</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.why.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-white rounded-2xl p-7 border border-slate-100 card-hover" data-testid={`why-pillar-${i}`}>
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{p.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- JOURNEY TIMELINE ---------- */
export function JourneyTimeline() {
  const { t } = useLang();
  return (
    <section className="py-16 lg:py-24" data-testid="journey-timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">The Journey</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.journey.title}</h2>
          <p className="mt-4 text-slate-600">{t.journey.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {t.journey.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 card-hover h-full">
                <div className="text-4xl font-display font-extrabold text-brand-orange/20 mb-2">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display font-bold text-brand-navy mb-1">{s.t}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{s.d}</div>
              </div>
              {i < t.journey.steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function TestimonialsSection() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");
  useEffect(() => { publicApi.listTestimonials(role || undefined).then(setItems).catch(() => setItems([])); }, [role]);
  const tabs = [
    { k: "", label: t.testimonials.all }, { k: "student", label: t.testimonials.students },
    { k: "doctor", label: t.testimonials.doctors }, { k: "parent", label: t.testimonials.parents },
  ];
  return (
    <section className="py-16 lg:py-24 bg-brand-light" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Stories</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.testimonials.title}</h2>
            <p className="mt-4 text-slate-600">{t.testimonials.subtitle}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tb) => (
              <button key={tb.k} onClick={() => setRole(tb.k)} data-testid={`testimonial-tab-${tb.k || "all"}`} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${role === tb.k ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-brand-blue"}`}>
                {tb.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 6).map((it) => (
            <div key={it.id} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover" data-testid={`testimonial-card-${it.id}`}>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: it.rating || 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-5">"{lang === "mr" ? it.quote_mr : it.quote_en}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {it.photo ? <img src={it.photo} alt={it.name} className="w-11 h-11 rounded-full object-cover" /> : <div className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold">{it.name[0]}</div>}
                <div>
                  <div className="font-display font-bold text-brand-navy text-sm">{it.name}</div>
                  <div className="text-xs text-slate-500">{it.program} · {it.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PARTNER LOGOS ---------- */
export function Partners() {
  const { t } = useLang();
  const logos = ["HARVARD", "STANFORD", "JOHNS HOPKINS", "TU MÜNCHEN", "HEIDELBERG", "CHARITÉ BERLIN", "LMU MUNICH", "RWTH AACHEN"];
  return (
    <section className="py-14 border-y border-slate-200 bg-white" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">Network</div>
          <h3 className="font-display font-bold text-xl lg:text-2xl text-brand-navy">{t.partners.title}</h3>
          <p className="text-sm text-slate-500 mt-2">{t.partners.subtitle}</p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="text-slate-400 font-display font-bold text-lg tracking-wider hover:text-brand-navy transition-colors">{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FREE ASSESSMENTS ---------- */
export function FreeAssessments({ onOpenLead }) {
  const { t } = useLang();
  return (
    <section className="py-16 lg:py-24" data-testid="free-assessments-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Free Assessments</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.assessments.title}</h2>
          <p className="mt-4 text-slate-600 text-base lg:text-lg">{t.assessments.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.assessments.items.map((it, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border-2 border-slate-100 hover:border-brand-orange card-hover" data-testid={`assessment-card-${i}`}>
              <div className="text-5xl font-display font-extrabold text-brand-orange/15 mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{it.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{it.d}</p>
              <button onClick={onOpenLead} className="inline-flex items-center gap-1.5 text-brand-orange font-semibold text-sm hover:gap-2 transition-all" data-testid={`assessment-start-${i}`}>
                {t.assessments.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EVENTS ---------- */
export function EventsSection() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  useEffect(() => { publicApi.listEvents("upcoming").then((d) => setItems(d.slice(0, 3))).catch(() => setItems([])); }, []);
  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-24 bg-brand-light" data-testid="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Live Sessions</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.events.title}</h2>
            <p className="mt-4 text-slate-600">{t.events.subtitle}</p>
          </div>
          <Link to={langPath(lang, "/events")} className="text-sm font-semibold text-brand-blue hover:text-brand-navy inline-flex items-center gap-1">
            {t.events.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover" data-testid={`event-card-${e.id}`}>
              {e.image && <div className="aspect-[16/10] overflow-hidden"><img src={e.image} alt={e.title_en} className="w-full h-full object-cover" /></div>}
              <div className="p-5">
                <div className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-2">{e.mode}</div>
                <h3 className="font-display font-bold text-brand-navy mb-3 text-base leading-snug">{lang === "mr" ? e.title_mr : e.title_en}</h3>
                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {e.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {e.time}</div>
                  <div className="flex items-center gap-2"><UserIcon className="w-3.5 h-3.5" /> {e.speaker}</div>
                </div>
                <button className="btn-blue w-full py-2.5 rounded-full text-xs font-semibold">{t.events.register}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BLOG ---------- */
export function BlogSection() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  useEffect(() => { publicApi.listBlog().then((d) => setItems(d.slice(0, 3))).catch(() => setItems([])); }, []);
  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-24" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Knowledge Hub</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.blog.title}</h2>
            <p className="mt-4 text-slate-600">{t.blog.subtitle}</p>
          </div>
          <Link to={langPath(lang, "/blog")} className="text-sm font-semibold text-brand-blue hover:text-brand-navy inline-flex items-center gap-1">
            {t.blog.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((p) => (
            <Link key={p.id} to={langPath(lang, `/blog/${p.slug}`)} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover" data-testid={`blog-card-${p.slug}`}>
              {p.image && <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-brand-orange">{p.category}</span>
                  <span>·</span>
                  <span>{p.read_time} {t.blog.minRead}</span>
                </div>
                <h3 className="font-display font-bold text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-blue transition-colors">{lang === "mr" ? p.title_mr : p.title_en}</h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{lang === "mr" ? p.excerpt_mr : p.excerpt_en}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqSection() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("USA");
  const [openIdx, setOpenIdx] = useState(0);
  useEffect(() => { publicApi.listFaqs(cat).then(setItems).catch(() => setItems([])); }, [cat]);
  const cats = Object.keys(t.faq.categories);
  return (
    <section className="py-16 lg:py-24 bg-brand-light" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Answers</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-navy tracking-tight">{t.faq.title}</h2>
          <p className="mt-4 text-slate-600">{t.faq.subtitle}</p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button key={c} onClick={() => { setCat(c); setOpenIdx(0); }} data-testid={`faq-tab-${c}`} className={`px-4 py-2 rounded-full text-sm font-semibold ${cat === c ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-brand-blue"}`}>
              {t.faq.categories[c]}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((f, i) => (
            <div key={f.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden" data-testid={`faq-item-${i}`}>
              <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                <span className="font-display font-semibold text-brand-navy">{lang === "mr" ? f.question_mr : f.question_en}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{lang === "mr" ? f.answer_mr : f.answer_en}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
export function FinalCta({ onOpenLead }) {
  const { t } = useLang();
  return (
    <section className="py-16 lg:py-24" data-testid="final-cta-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-navy p-10 lg:p-16 text-center text-white">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(235,95,34,0.6), transparent 40%), radial-gradient(circle at 70% 70%, rgba(0,89,169,0.6), transparent 40%)" }} />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight max-w-3xl mx-auto text-balance">{t.finalCta.title}</h2>
            <p className="mt-5 text-white/75 max-w-xl mx-auto text-base lg:text-lg">{t.finalCta.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button onClick={onOpenLead} className="btn-orange px-7 py-3.5 rounded-full font-semibold text-sm" data-testid="final-cta-book">{t.finalCta.primary}</button>
              <a href="https://wa.me/918899117757" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 border-white/30 hover:border-white text-white" data-testid="final-cta-whatsapp">
                <MessageCircle className="w-4 h-4" /> {t.finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
