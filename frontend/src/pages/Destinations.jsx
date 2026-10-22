import { useLang } from "../i18n";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function DestinationPage({ onOpenLead, config }) {
  const { lang, t } = useLang();
  const c = config[lang];
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">{c.eyebrow}</div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-[1.05] tracking-tight text-balance">{c.title}</h1>
              <p className="mt-5 text-slate-600 text-base lg:text-lg leading-relaxed max-w-xl">{c.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={onOpenLead} className="btn-orange px-6 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2" data-testid="destination-book-cta">
                  {t.finalCta.primary} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500">
                {c.stats.map((s, i) => (
                  <div key={i}>
                    <div className="font-display font-extrabold text-2xl text-brand-navy">{s.n}</div>
                    <div>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight">{c.programsTitle}</h2>
            <p className="mt-3 text-slate-600">{c.programsSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.programs.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
                <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{p.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight">{c.processTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.process.map((s, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl p-5 border border-slate-100">
                <div className="w-9 h-9 shrink-0 rounded-full bg-brand-orange/10 text-brand-orange font-display font-bold flex items-center justify-center">{i + 1}</div>
                <div>
                  <div className="font-display font-bold text-brand-navy mb-1">{s.t}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 lg:py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight max-w-2xl">{c.whyTitle}</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {c.why.map((w, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                <div>
                  <div className="font-display font-bold mb-1">{w.t}</div>
                  <div className="text-sm text-white/70 leading-relaxed">{w.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button onClick={onOpenLead} className="btn-orange px-7 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
              {t.finalCta.primary} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function USAPage({ onOpenLead }) {
  const config = {
    en: {
      eyebrow: "USA Education", title: "Study in the USA — Where Ambition Meets Opportunity.",
      subtitle: "Personalised guidance for Bachelor's, Master's, Medical Residency and USMLE — with structured mentoring through every step.",
      img: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=85",
      stats: [{ n: "12–14", l: "months typical prep" }, { n: "3000+", l: "US universities" }, { n: "OPT+STEM", l: "post-study work" }],
      programsTitle: "Programs We Guide",
      programsSub: "From undergraduate to specialised medical fellowships.",
      programs: [
        { t: "Bachelor's", d: "Undergraduate applications, SATs, extracurriculars and financial aid strategy." },
        { t: "Master's / MS", d: "GRE / GMAT strategy, SOPs, LORs and university shortlisting." },
        { t: "Medical Residency", d: "USMLE preparation, USCE, application via ERAS and interview readiness." },
        { t: "USMLE", d: "Step 1, Step 2 CK and Step 3 preparation for Indian medical graduates." },
        { t: "Research Programs", d: "Observership, publications and research fellowship guidance." },
        { t: "Professional Programs", d: "MBA and specialised master's programs across top US business schools." },
      ],
      processTitle: "Your Application Roadmap",
      process: [
        { t: "Discovery", d: "Understand your background, goals and constraints." },
        { t: "Testing Plan", d: "GRE / GMAT / SAT / USMLE strategy and timeline." },
        { t: "University Shortlist", d: "Data-informed shortlisting across aspirational, target and safe schools." },
        { t: "SOP & LOR", d: "Storytelling, drafting and editorial support." },
        { t: "Applications", d: "Submissions, financial documentation and interview prep." },
        { t: "Visa & Onboarding", d: "Visa strategy, pre-departure and on-ground orientation." },
      ],
      whyTitle: "Why Astute for USA",
      why: [
        { t: "Structured mentoring", d: "One mentor, one plan — with clear weekly milestones." },
        { t: "STEM & Medical depth", d: "Specialised expertise in STEM Master's and US medical pathways." },
        { t: "Honest counselling", d: "No inflated promises. Only pathways we can genuinely guide." },
        { t: "End-to-end support", d: "From testing to visa to your first semester in the USA." },
      ],
    },
    mr: {
      eyebrow: "USA शिक्षण", title: "अमेरिकेत शिक्षण — जिथे आकांक्षा संधीशी भेटते.",
      subtitle: "Bachelor's, Master's, Medical Residency आणि USMLE साठी वैयक्तिक मार्गदर्शन — प्रत्येक पायरीवर संरचित मेंटरिंग.",
      img: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=85",
      stats: [{ n: "१२-१४", l: "महिने तयारी" }, { n: "३०००+", l: "US विद्यापीठे" }, { n: "OPT+STEM", l: "अभ्यासोत्तर काम" }],
      programsTitle: "आम्ही मार्गदर्शन करतो असे कार्यक्रम",
      programsSub: "पदवीपासून विशेष मेडिकल fellowships पर्यंत.",
      programs: [
        { t: "Bachelor's", d: "पदवी अर्ज, SAT, सहशालेय आणि आर्थिक सहाय्य धोरण." },
        { t: "Master's / MS", d: "GRE / GMAT धोरण, SOP, LOR आणि विद्यापीठ शॉर्टलिस्ट." },
        { t: "Medical Residency", d: "USMLE तयारी, USCE, ERAS द्वारे अर्ज आणि मुलाखत तयारी." },
        { t: "USMLE", d: "भारतीय वैद्यकीय पदवीधरांसाठी Step 1, Step 2 CK आणि Step 3." },
        { t: "Research Programs", d: "Observership, प्रकाशने आणि संशोधन fellowship मार्गदर्शन." },
        { t: "Professional Programs", d: "MBA आणि विशेष master's कार्यक्रम — top US business schools." },
      ],
      processTitle: "तुमचा अर्ज रोडमॅप",
      process: [
        { t: "शोध", d: "पार्श्वभूमी, ध्येये आणि मर्यादा समजून घेणे." },
        { t: "चाचणी नियोजन", d: "GRE / GMAT / SAT / USMLE धोरण आणि वेळापत्रक." },
        { t: "विद्यापीठ शॉर्टलिस्ट", d: "माहितीवर आधारित शॉर्टलिस्ट." },
        { t: "SOP आणि LOR", d: "कथन, लेखन आणि संपादकीय सहाय्य." },
        { t: "अर्ज", d: "सादरीकरण, आर्थिक कागदपत्रे आणि मुलाखत तयारी." },
        { t: "व्हिसा", d: "व्हिसा धोरण, प्रवासपूर्व मार्गदर्शन." },
      ],
      whyTitle: "USA साठी अ‍ॅस्ट्यूट का",
      why: [
        { t: "संरचित मेंटरिंग", d: "एक मेंटर, एक योजना — स्पष्ट साप्ताहिक टप्पे." },
        { t: "STEM आणि मेडिकल खोली", d: "STEM Master's आणि US मेडिकल मार्गात विशेष कौशल्य." },
        { t: "प्रामाणिक समुपदेशन", d: "अवास्तव आश्वासने नाहीत. फक्त प्रामाणिक मार्ग." },
        { t: "संपूर्ण सहाय्य", d: "चाचणीपासून व्हिसापर्यंत आणि पहिल्या सत्रापर्यंत." },
      ],
    },
  };
  return <DestinationPage onOpenLead={onOpenLead} config={config} />;
}

export function GermanyPage({ onOpenLead }) {
  const config = {
    en: {
      eyebrow: "Germany Education", title: "Germany: Global Education. Smart Investment.",
      subtitle: "Tuition-free public universities, strong engineering and English-medium programs — with clear pathways from Studienkolleg to STEM careers.",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=85",
      stats: [{ n: "€0", l: "public tuition" }, { n: "18 mo", l: "post-study visa" }, { n: "English", l: "medium options" }],
      programsTitle: "Programs We Guide",
      programsSub: "Structured pathways for undergraduate and graduate study in Germany.",
      programs: [
        { t: "Bachelor's", d: "German-medium and pathway programs including Studienkolleg." },
        { t: "Master's", d: "English-medium engineering, sciences and management programs." },
        { t: "Engineering", d: "Mechanical, electrical, automotive and computer science at TU9 universities." },
        { t: "English-Medium", d: "Curated list of English-taught Master's programs across public universities." },
        { t: "Pathway Programs", d: "Foundation programs and language pathways for Indian students." },
        { t: "German Language", d: "A1 to B2 preparation aligned with academic and visa requirements." },
      ],
      processTitle: "Your Germany Roadmap",
      process: [
        { t: "Explore", d: "Understand German university landscape and program options." },
        { t: "Evaluate", d: "Academic fit, language requirements and APS assessment." },
        { t: "Prepare", d: "Language, documentation and Studienkolleg readiness (if needed)." },
        { t: "Apply", d: "Applications via Uni-Assist or direct portals; documentation." },
        { t: "Admit", d: "Admission letter, blocked account (~€11,208 for 2026) and visa." },
        { t: "Progress", d: "Accommodation, city registration and post-study work planning." },
      ],
      whyTitle: "Why Astute for Germany",
      why: [
        { t: "Public university focus", d: "Prioritising quality public universities and cost-effective pathways." },
        { t: "APS + Uni-Assist mastery", d: "Deep familiarity with documentation and evaluation processes." },
        { t: "Language + academics", d: "Integrated German-language and academic preparation." },
        { t: "Post-study clarity", d: "Guidance on 18-month job-seeker visa and Blue Card pathways." },
      ],
    },
    mr: {
      eyebrow: "Germany शिक्षण", title: "जर्मनी: ग्लोबल एज्युकेशन. स्मार्ट गुंतवणूक.",
      subtitle: "शुल्कमुक्त सार्वजनिक विद्यापीठे, मजबूत अभियांत्रिकी आणि इंग्रजी-माध्यम कार्यक्रम — Studienkolleg पासून STEM करिअरपर्यंत स्पष्ट मार्ग.",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=85",
      stats: [{ n: "€०", l: "सार्वजनिक शुल्क" }, { n: "१८ महिने", l: "अभ्यासोत्तर व्हिसा" }, { n: "English", l: "माध्यम पर्याय" }],
      programsTitle: "आम्ही मार्गदर्शन करतो असे कार्यक्रम",
      programsSub: "जर्मनीत पदवी आणि पदव्युत्तर अभ्यासासाठी संरचित मार्ग.",
      programs: [
        { t: "Bachelor's", d: "जर्मन-माध्यम आणि Studienkolleg सह पथ कार्यक्रम." },
        { t: "Master's", d: "इंग्रजी-माध्यम अभियांत्रिकी, विज्ञान आणि व्यवस्थापन कार्यक्रम." },
        { t: "Engineering", d: "TU9 विद्यापीठांमध्ये यांत्रिक, विद्युत, ऑटोमोटिव्ह, संगणक विज्ञान." },
        { t: "English-Medium", d: "सार्वजनिक विद्यापीठांतील इंग्रजी-शिकवले जाणारे Master's कार्यक्रम." },
        { t: "Pathway Programs", d: "भारतीय विद्यार्थ्यांसाठी पायाभूत कार्यक्रम आणि भाषा मार्ग." },
        { t: "German Language", d: "A1 ते B2 तयारी — शैक्षणिक आणि व्हिसा गरजांशी सुसंगत." },
      ],
      processTitle: "तुमचा Germany रोडमॅप",
      process: [
        { t: "शोध", d: "जर्मन विद्यापीठ लँडस्केप आणि पर्याय समजून घ्या." },
        { t: "मूल्यमापन", d: "शैक्षणिक फिट, भाषा आणि APS मूल्यमापन." },
        { t: "तयारी", d: "भाषा, कागदपत्रे आणि Studienkolleg तयारी." },
        { t: "अर्ज", d: "Uni-Assist किंवा थेट पोर्टलद्वारे अर्ज." },
        { t: "प्रवेश", d: "प्रवेशपत्र, blocked account आणि व्हिसा." },
        { t: "प्रगती", d: "निवासस्थान, शहर नोंदणी आणि अभ्यासोत्तर काम." },
      ],
      whyTitle: "Germany साठी अ‍ॅस्ट्यूट का",
      why: [
        { t: "सार्वजनिक विद्यापीठ लक्ष", d: "दर्जेदार सार्वजनिक विद्यापीठे आणि कमी खर्चाचे मार्ग." },
        { t: "APS + Uni-Assist", d: "कागदपत्रे आणि मूल्यमापन प्रक्रियेत सखोल अनुभव." },
        { t: "भाषा + शैक्षणिक", d: "एकत्रित जर्मन-भाषा आणि शैक्षणिक तयारी." },
        { t: "अभ्यासोत्तर स्पष्टता", d: "१८-महिन्यांचा job-seeker व्हिसा आणि Blue Card मार्ग." },
      ],
    },
  };
  return <DestinationPage onOpenLead={onOpenLead} config={config} />;
}

export function MedicalPage({ onOpenLead }) {
  const config = {
    en: {
      eyebrow: "Medical Careers", title: "Build Your Medical Career Beyond Borders.",
      subtitle: "From MBBS to residency, fellowships and research — structured mentoring for Indian medical graduates aiming for international medical careers.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85",
      stats: [{ n: "USMLE", l: "Step 1 · 2CK · 3" }, { n: "USCE", l: "clinical experience" }, { n: "ERAS", l: "residency match" }],
      programsTitle: "Medical Pathways",
      programsSub: "Every stage of your international medical career.",
      programs: [
        { t: "USMLE Preparation", d: "Structured Step 1, 2 CK and 3 preparation plans with resource curation." },
        { t: "USA Residency", d: "ERAS applications, personal statements, USCE and interview preparation." },
        { t: "Residency Mentoring", d: "One-on-one mentoring with physicians who have matched successfully." },
        { t: "Fellowships", d: "Post-residency subspecialty pathways in the USA and other destinations." },
        { t: "Research", d: "Publication strategy, observership and research fellowships." },
        { t: "Clinical Experience", d: "USCE options — externships, observerships and hands-on rotations." },
      ],
      processTitle: "Your Medical Career Roadmap",
      process: [
        { t: "Assessment", d: "Understand your MBBS profile and international readiness." },
        { t: "Timeline", d: "Multi-year plan integrating exams, USCE and research." },
        { t: "Exams", d: "USMLE Step 1, 2 CK, 3 — structured preparation and mock testing." },
        { t: "Profile", d: "USCE, research publications and letters of recommendation." },
        { t: "Applications", d: "ERAS applications, personal statement, MyERAS optimisation." },
        { t: "Match", d: "Interview preparation, ranking strategy and post-match onboarding." },
      ],
      whyTitle: "Why Astute for Medical Careers",
      why: [
        { t: "Physician mentors", d: "Guidance from doctors who have completed the journey themselves." },
        { t: "Structured plans", d: "Multi-year plans that respect the reality of MBBS demands." },
        { t: "Ethical guidance", d: "No fake claims about match rates or guaranteed residencies." },
        { t: "Research depth", d: "Real research mentorship — not just observership placement." },
      ],
    },
    mr: {
      eyebrow: "मेडिकल करिअर", title: "सीमांच्या पलीकडे तुमची मेडिकल करिअर घडवा.",
      subtitle: "MBBS पासून residency, fellowships आणि research पर्यंत — भारतीय वैद्यकीय पदवीधरांसाठी संरचित मेंटरिंग.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85",
      stats: [{ n: "USMLE", l: "Step 1 · 2CK · 3" }, { n: "USCE", l: "क्लिनिकल अनुभव" }, { n: "ERAS", l: "residency match" }],
      programsTitle: "मेडिकल मार्ग",
      programsSub: "तुमच्या आंतरराष्ट्रीय मेडिकल करिअरचा प्रत्येक टप्पा.",
      programs: [
        { t: "USMLE तयारी", d: "Step 1, 2 CK आणि 3 साठी संरचित योजना आणि संसाधने." },
        { t: "USA Residency", d: "ERAS अर्ज, personal statements, USCE आणि मुलाखत तयारी." },
        { t: "Residency मेंटरिंग", d: "यशस्वी मॅच झालेल्या डॉक्टरांकडून एक-एक मार्गदर्शन." },
        { t: "Fellowships", d: "USA आणि इतर देशांतील post-residency उपविशेषज्ञता." },
        { t: "Research", d: "प्रकाशन धोरण, observership आणि संशोधन fellowships." },
        { t: "क्लिनिकल अनुभव", d: "USCE पर्याय — externships, observerships आणि rotations." },
      ],
      processTitle: "तुमचा मेडिकल करिअर रोडमॅप",
      process: [
        { t: "मूल्यमापन", d: "तुमचे MBBS प्रोफाइल आणि आंतरराष्ट्रीय तयारी." },
        { t: "वेळापत्रक", d: "परीक्षा, USCE आणि संशोधन एकत्रित करणारी बहुवर्षीय योजना." },
        { t: "परीक्षा", d: "USMLE Step 1, 2 CK, 3 — संरचित तयारी आणि mock testing." },
        { t: "प्रोफाइल", d: "USCE, संशोधन प्रकाशने आणि शिफारसपत्रे." },
        { t: "अर्ज", d: "ERAS अर्ज, personal statement, MyERAS." },
        { t: "मॅच", d: "मुलाखत तयारी, ranking धोरण आणि पोस्ट-मॅच." },
      ],
      whyTitle: "मेडिकलसाठी अ‍ॅस्ट्यूट का",
      why: [
        { t: "फिजिशियन मेंटर", d: "स्वतः प्रवास पूर्ण केलेल्या डॉक्टरांचे मार्गदर्शन." },
        { t: "संरचित योजना", d: "MBBS च्या वास्तवाचा आदर करणाऱ्या बहुवर्षीय योजना." },
        { t: "प्रामाणिक मार्गदर्शन", d: "मॅच रेट किंवा हमी residency बद्दल खोटे दावे नाहीत." },
        { t: "संशोधन खोली", d: "फक्त observership नाही — खरे संशोधन मेंटरिंग." },
      ],
    },
  };
  return <DestinationPage onOpenLead={onOpenLead} config={config} />;
}

export function CounsellingPage({ onOpenLead }) {
  const config = {
    en: {
      eyebrow: "Career Counselling", title: "Career Guidance Built Around You.",
      subtitle: "Structured, honest career counselling that respects your background, interests and long-term goals — not just course selection.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85",
      stats: [{ n: "6", l: "structured steps" }, { n: "1:1", l: "mentoring" }, { n: "3+ hrs", l: "typical engagement" }],
      programsTitle: "How We Counsel",
      programsSub: "A calm framework that separates signal from noise.",
      programs: [
        { t: "Psychometric assessment", d: "Aptitude, interest and personality profiling using validated instruments." },
        { t: "Career interviews", d: "In-depth conversations to understand context, family and constraints." },
        { t: "Market intelligence", d: "Real-world information on courses, universities and career markets." },
        { t: "Roadmap", d: "A personalised roadmap covering 12 to 36 months of concrete next steps." },
        { t: "Family alignment", d: "Dedicated parent sessions to address concerns and financial planning." },
        { t: "Ongoing mentorship", d: "Continued mentoring as decisions unfold and circumstances change." },
      ],
      processTitle: "Our 6-Step Framework",
      process: [
        { t: "Understand", d: "Deep listening to your story and constraints." },
        { t: "Evaluate", d: "Assessments, interviews and profile review." },
        { t: "Identify Options", d: "Curated pathway options aligned to reality." },
        { t: "Build Strategy", d: "Written roadmap with milestones." },
        { t: "Take Action", d: "Execution support on tests, applications and decisions." },
        { t: "Track Progress", d: "Ongoing accountability and adjustments." },
      ],
      whyTitle: "Why Astute for Counselling",
      why: [
        { t: "Honest first", d: "We tell you what we can genuinely guide — and what we cannot." },
        { t: "Family-inclusive", d: "Dedicated sessions to align students and parents." },
        { t: "Beyond course selection", d: "We look at career markets, personality fit and long-term direction." },
        { t: "Three decades of context", d: "Perspective from thousands of counselling conversations." },
      ],
    },
    mr: {
      eyebrow: "करिअर समुपदेशन", title: "तुमच्याभोवती घडवलेले करिअर मार्गदर्शन.",
      subtitle: "तुमची पार्श्वभूमी, आवडी आणि दीर्घकालीन ध्येयांचा आदर करणारे संरचित, प्रामाणिक करिअर समुपदेशन.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85",
      stats: [{ n: "६", l: "संरचित पायऱ्या" }, { n: "१:१", l: "मेंटरिंग" }, { n: "३+ तास", l: "सामान्य सत्र" }],
      programsTitle: "आम्ही कसे समुपदेशन करतो",
      programsSub: "आवाजातून सिग्नल वेगळे करणारी शांत चौकट.",
      programs: [
        { t: "Psychometric मूल्यमापन", d: "अभिरुची, आवड आणि व्यक्तिमत्त्व प्रोफाइलिंग." },
        { t: "करिअर मुलाखत", d: "संदर्भ, कुटुंब आणि मर्यादा समजून घेणारी सखोल संभाषणे." },
        { t: "बाजार माहिती", d: "कोर्स, विद्यापीठे आणि करिअर बाजारावर वास्तविक माहिती." },
        { t: "रोडमॅप", d: "१२ ते ३६ महिन्यांचा वैयक्तिक रोडमॅप." },
        { t: "कुटुंब सहभाग", d: "पालकांच्या शंकांसाठी आणि आर्थिक नियोजनासाठी सत्रे." },
        { t: "सतत मेंटरिंग", d: "निर्णय आणि परिस्थिती बदलत असताना सतत मार्गदर्शन." },
      ],
      processTitle: "आमची ६-पायरी चौकट",
      process: [
        { t: "समजून घेणे", d: "तुमची कथा आणि मर्यादा शांतपणे ऐकणे." },
        { t: "मूल्यमापन", d: "मूल्यमापन, मुलाखत आणि प्रोफाइल पुनरावलोकन." },
        { t: "पर्याय ओळख", d: "वास्तवाशी जुळणारे तयार मार्ग." },
        { t: "धोरण", d: "टप्प्यांसह लिखित रोडमॅप." },
        { t: "कृती", d: "परीक्षा, अर्ज आणि निर्णयांसाठी सहाय्य." },
        { t: "प्रगती", d: "सतत जबाबदारी आणि समायोजन." },
      ],
      whyTitle: "समुपदेशनासाठी अ‍ॅस्ट्यूट का",
      why: [
        { t: "प्रामाणिक", d: "कशामध्ये आम्ही खरोखर मार्गदर्शन करू शकतो — आणि कशामध्ये नाही — सांगतो." },
        { t: "कुटुंब सहभाग", d: "विद्यार्थी आणि पालकांना एकत्र आणणारी सत्रे." },
        { t: "कोर्स निवडीच्या पलीकडे", d: "बाजार, व्यक्तिमत्त्व फिट आणि दिशा." },
        { t: "तीन दशकांचा संदर्भ", d: "हजारो समुपदेशन संभाषणांचा दृष्टिकोन." },
      ],
    },
  };
  return <DestinationPage onOpenLead={onOpenLead} config={config} />;
}
