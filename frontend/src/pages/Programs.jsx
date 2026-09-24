import { useLang } from "../i18n";
import { ArrowRight, CheckCircle2, Calendar, Clock, Book } from "lucide-react";
import { useParams, Link, Navigate } from "react-router-dom";

const PROGRAMS = {
  usmle: {
    en: {
      eyebrow: "Medical · USMLE",
      title: "USMLE — A Structured Path to US Medical Practice.",
      subtitle: "Step 1, Step 2 CK and Step 3 preparation aligned with your MBBS timeline, clinical experience and long-term residency goals.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85",
      whoFor: [
        "MBBS students from 2nd year onwards planning international careers",
        "Medical interns preparing for residency in the USA",
        "Practising doctors considering a US medical career transition",
      ],
      why: [
        { t: "Strong career trajectory", d: "USMLE opens the door to residency, fellowships and long-term medical practice in the USA." },
        { t: "Global validation", d: "USMLE is recognised beyond the USA and adds credibility for research and fellowships." },
        { t: "Merit-based system", d: "Residency selection is transparent and merit-driven — the right preparation makes a real difference." },
      ],
      eligibility: [
        "MBBS from an ECFMG-recognised medical school",
        "Adequate command of English (spoken and written)",
        "Clean academic and disciplinary record",
      ],
      timeline: [
        { t: "12–18 months out", d: "Foundational preparation, resource curation, layered study plan." },
        { t: "6–9 months out", d: "Full-length practice tests, weak-area drills, USCE planning." },
        { t: "3–6 months out", d: "Step 1 exam; begin Step 2 CK preparation and applications." },
        { t: "0–3 months out", d: "Step 2 CK, ECFMG certification and ERAS documentation." },
      ],
      faqs: [
        { q: "When should MBBS students start USMLE preparation?", a: "Foundational preparation can begin in 2nd or 3rd year MBBS, integrating Step 1 topics with academic coursework. Serious dedicated preparation typically starts in 4th year or internship." },
        { q: "Is Step 1 still important after becoming pass/fail?", a: "Step 1 is now pass/fail, but a strong pass with clean transcript, strong Step 2 CK, USCE and research remain highly influential in residency selection." },
        { q: "What resources are recommended?", a: "First Aid, UWorld, Pathoma, Sketchy and NBME practice tests form the core. Your specific plan depends on your baseline and available study time." },
      ],
    },
    mr: {
      eyebrow: "मेडिकल · USMLE",
      title: "USMLE — अमेरिकन मेडिकल प्रॅक्टिससाठी संरचित मार्ग.",
      subtitle: "तुमच्या MBBS वेळापत्रक, क्लिनिकल अनुभव आणि दीर्घकालीन residency ध्येयांशी सुसंगत Step 1, Step 2 CK आणि Step 3 तयारी.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85",
      whoFor: [
        "आंतरराष्ट्रीय करिअर करू इच्छिणारे MBBS द्वितीय वर्षापासूनचे विद्यार्थी",
        "USA मध्ये residency ची तयारी करणारे इंटर्न",
        "US मेडिकल करिअरचा विचार करणारे प्रॅक्टिसिंग डॉक्टर",
      ],
      why: [
        { t: "मजबूत करिअर मार्ग", d: "USMLE residency, fellowships आणि दीर्घकालीन प्रॅक्टिसचे दार उघडते." },
        { t: "जागतिक मान्यता", d: "USMLE केवळ USA पुरतेच मर्यादित नाही — संशोधन आणि fellowships साठीही उपयुक्त." },
        { t: "गुणवत्ता-आधारित प्रणाली", d: "Residency निवड पारदर्शक आणि गुणवत्ताकेंद्रित असते." },
      ],
      eligibility: [
        "ECFMG-मान्यताप्राप्त मेडिकल स्कूलमधून MBBS",
        "इंग्रजीवर पुरेसे प्रभुत्व",
        "स्वच्छ शैक्षणिक आणि शिस्तपालन रेकॉर्ड",
      ],
      timeline: [
        { t: "१२-१८ महिने आधी", d: "पायाभूत तयारी, संसाधने आणि स्तरीय अभ्यास योजना." },
        { t: "६-९ महिने आधी", d: "पूर्ण-लांबीच्या मॉक चाचण्या, कमकुवत क्षेत्र, USCE नियोजन." },
        { t: "३-६ महिने आधी", d: "Step 1 परीक्षा; Step 2 CK तयारी आणि अर्ज सुरू." },
        { t: "०-३ महिने आधी", d: "Step 2 CK, ECFMG प्रमाणपत्र आणि ERAS कागदपत्रे." },
      ],
      faqs: [
        { q: "MBBS विद्यार्थ्यांनी USMLE तयारी कधी सुरू करावी?", a: "पायाभूत तयारी द्वितीय किंवा तृतीय वर्षापासून सुरू करता येते. गंभीर एकाग्र तयारी सामान्यतः चौथ्या वर्षापासून किंवा इंटर्नशिपमध्ये सुरू होते." },
        { q: "Step 1 pass/fail झाल्यानंतर तितकाच महत्त्वाचा आहे का?", a: "Step 1 आता pass/fail असला तरी मजबूत pass, स्वच्छ transcript, मजबूत Step 2 CK, USCE आणि संशोधन residency साठी महत्त्वाचे राहतात." },
        { q: "कोणती संसाधने शिफारसीय आहेत?", a: "First Aid, UWorld, Pathoma, Sketchy आणि NBME चाचण्या मुख्य आधार आहेत. योजना तुमच्या पातळीवर अवलंबून असते." },
      ],
    },
  },
  residency: {
    en: {
      eyebrow: "Medical · Residency",
      title: "US Residency — Match With Strategy, Not Luck.",
      subtitle: "End-to-end guidance on ERAS applications, personal statements, USCE, LORs, interviews and ranking strategy for International Medical Graduates.",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=85",
      whoFor: [
        "MBBS graduates with USMLE Step 1 and Step 2 CK scores",
        "International Medical Graduates seeking residency in the USA",
        "Physicians restarting their US medical career after a career break",
      ],
      why: [
        { t: "Structured application", d: "ERAS is a complex process — a tightly managed timeline avoids expensive mistakes." },
        { t: "Personal statement matters", d: "Your personal statement is the one place your voice truly shows through the application." },
        { t: "Interview readiness", d: "Interview performance is where match rank order is largely decided." },
      ],
      eligibility: [
        "ECFMG certification (Steps 1, 2 CK + OET / Step 2 CS depending on year)",
        "US Clinical Experience (USCE) — externships, observerships or research rotations",
        "3+ Letters of Recommendation from US-based physicians preferred",
      ],
      timeline: [
        { t: "12 months out", d: "USCE, research and LOR strategy; select specialty and target programs." },
        { t: "6 months out", d: "ERAS registration; draft personal statement; polish CV." },
        { t: "3 months out", d: "Applications open in September; MyERAS finalisation; program signalling." },
        { t: "1–2 months out", d: "Interview season (Oct–Jan); mock interviews; ranking strategy." },
        { t: "Match Day", d: "Rank Order List submission and Match Day in March." },
      ],
      faqs: [
        { q: "How many programs should I apply to?", a: "Depends on specialty competitiveness and your profile. For IMGs, 60–100+ programs is common in competitive specialties; family medicine and internal medicine may need fewer." },
        { q: "Is USCE mandatory?", a: "Not technically mandatory but strongly advantageous. Programs value hands-on clinical exposure to the US healthcare system." },
        { q: "Do research publications help?", a: "Yes — especially for competitive specialties and research-heavy programs. Quality of research matters more than quantity." },
      ],
    },
    mr: {
      eyebrow: "मेडिकल · Residency",
      title: "US Residency — नशिबावर नव्हे, धोरणावर मॅच.",
      subtitle: "IMG साठी ERAS अर्ज, personal statement, USCE, LOR, मुलाखत आणि ranking धोरणावर संपूर्ण मार्गदर्शन.",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=85",
      whoFor: [
        "USMLE Step 1 आणि Step 2 CK उत्तीर्ण MBBS पदवीधर",
        "USA मध्ये residency शोधणारे IMG",
        "करिअर विश्रांतीनंतर US करिअर पुन्हा सुरू करणारे डॉक्टर",
      ],
      why: [
        { t: "संरचित अर्ज", d: "ERAS ही जटिल प्रक्रिया आहे — योग्य वेळापत्रकाने महागड्या चुका टाळता येतात." },
        { t: "Personal statement महत्त्वाचा", d: "अर्जामध्ये तुमचा आवाज ऐकू येण्याचे एकच ठिकाण." },
        { t: "मुलाखत तयारी", d: "मॅच rank ठरवण्यात मुलाखतीचा मोठा वाटा असतो." },
      ],
      eligibility: [
        "ECFMG प्रमाणपत्र (Steps 1, 2 CK + OET/Step 2 CS)",
        "US Clinical Experience — externships, observerships किंवा rotations",
        "US-आधारित डॉक्टरांची ३+ LOR",
      ],
      timeline: [
        { t: "१२ महिने आधी", d: "USCE, संशोधन आणि LOR धोरण; specialty निवड." },
        { t: "६ महिने आधी", d: "ERAS नोंदणी; personal statement; CV सुधारणा." },
        { t: "३ महिने आधी", d: "सप्टेंबरमध्ये अर्ज सुरू; MyERAS अंतिम; program signalling." },
        { t: "१-२ महिने आधी", d: "मुलाखत हंगाम; mock मुलाखती; ranking धोरण." },
        { t: "Match Day", d: "मार्चमध्ये Rank Order List आणि मॅच." },
      ],
      faqs: [
        { q: "किती programs ना अर्ज करावा?", a: "specialty स्पर्धा आणि तुमचे प्रोफाइल यावर अवलंबून. IMG साठी स्पर्धात्मक specialties मध्ये ६०-१००+ सामान्य आहे." },
        { q: "USCE अनिवार्य आहे का?", a: "तांत्रिकदृष्ट्या अनिवार्य नाही पण खूप उपयुक्त. Programs US आरोग्य प्रणालीशी हाताने अनुभव पसंत करतात." },
        { q: "संशोधन प्रकाशने मदत करतात का?", a: "होय — विशेषतः स्पर्धात्मक specialties साठी. गुणवत्ता प्रमाणापेक्षा अधिक महत्त्वाची." },
      ],
    },
  },
  bachelors: {
    en: {
      eyebrow: "Undergraduate · Bachelor's",
      title: "Bachelor's Abroad — Build A Global Foundation.",
      subtitle: "Undergraduate pathways for Indian students to the USA and Germany — from testing strategy to university shortlisting, applications, financial aid and visa.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=85",
      whoFor: [
        "Class 11 and 12 students planning undergraduate education abroad",
        "Recent Class 12 graduates preparing for the next intake",
        "Parents seeking clarity on international UG options and costs",
      ],
      why: [
        { t: "Global learning environment", d: "Exposure to diverse peers, research-led teaching and interdisciplinary options." },
        { t: "Long-term career optionality", d: "Post-study work visas, internships and graduate school pathways." },
        { t: "Merit and need-aware aid", d: "Some universities offer generous need-aware and merit scholarships for international students." },
      ],
      eligibility: [
        "Strong Class 10 and 12 academic record",
        "SAT / ACT for USA (test-optional at many universities); English language proficiency (TOEFL / IELTS / Duolingo)",
        "Language / APS requirements for Germany depending on program",
      ],
      timeline: [
        { t: "18 months out", d: "Career discovery, extracurriculars, SAT/ACT preparation start." },
        { t: "12 months out", d: "University shortlist; essay themes; recommender selection." },
        { t: "6–9 months out", d: "Applications drafted; financial documentation; test scores finalised." },
        { t: "3–6 months out", d: "Submissions (Early Action / Early Decision / Regular); interviews." },
        { t: "0–3 months out", d: "Admissions, financial aid decisions, visa and pre-departure." },
      ],
      faqs: [
        { q: "Is the SAT still required?", a: "Many US universities are test-optional post-COVID, but a strong SAT still helps competitive applications and scholarships. Requirements vary by university and program." },
        { q: "Can I study Bachelor's in English in Germany?", a: "Yes — a growing number of German public universities offer English-medium Bachelor's programs, though selection is smaller than at Master's level." },
        { q: "How much scholarship is realistic?", a: "Varies widely — some liberal arts colleges offer 50–80% aid, whereas public research universities offer less. We calibrate expectations based on your profile." },
      ],
    },
    mr: {
      eyebrow: "पदवी · Bachelor's",
      title: "परदेशी Bachelor's — जागतिक पाया घडवा.",
      subtitle: "USA आणि Germany साठी भारतीय विद्यार्थ्यांचे पदवी मार्ग — चाचणी धोरण, विद्यापीठ शॉर्टलिस्ट, अर्ज, आर्थिक सहाय्य आणि व्हिसा.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=85",
      whoFor: [
        "इयत्ता ११ व १२ वीचे विद्यार्थी",
        "पुढील प्रवेशासाठी तयारी करणारे अलीकडील १२ वी पदवीधर",
        "आंतरराष्ट्रीय UG पर्याय आणि खर्चाबद्दल स्पष्टता शोधणारे पालक",
      ],
      why: [
        { t: "जागतिक शिक्षण वातावरण", d: "विविध सहकारी, संशोधन-आधारित शिक्षण आणि आंतरशाखीय पर्याय." },
        { t: "दीर्घकालीन करिअर पर्याय", d: "अभ्यासोत्तर काम व्हिसा, internships आणि पदव्युत्तर मार्ग." },
        { t: "गुणवत्ता आणि गरज-आधारित सहाय्य", d: "काही विद्यापीठे उदार आर्थिक सहाय्य देतात." },
      ],
      eligibility: [
        "मजबूत १० वी आणि १२ वी शैक्षणिक रेकॉर्ड",
        "USA साठी SAT/ACT; इंग्रजी प्रवीणता (TOEFL/IELTS)",
        "Germany साठी भाषा/APS गरजा",
      ],
      timeline: [
        { t: "१८ महिने आधी", d: "करिअर शोध, सहशालेय, SAT/ACT तयारी." },
        { t: "१२ महिने आधी", d: "विद्यापीठ शॉर्टलिस्ट; निबंध; शिफारसदार." },
        { t: "६-९ महिने आधी", d: "अर्ज मसुदे; आर्थिक कागदपत्रे; चाचणी स्कोअर." },
        { t: "३-६ महिने आधी", d: "सादरीकरण; मुलाखती." },
        { t: "०-३ महिने आधी", d: "प्रवेश, आर्थिक निर्णय, व्हिसा." },
      ],
      faqs: [
        { q: "SAT अजूनही आवश्यक आहे का?", a: "अनेक US विद्यापीठे test-optional आहेत, पण उच्च SAT अजूनही मदत करतो." },
        { q: "Germany मध्ये इंग्रजीत Bachelor's शक्य आहे का?", a: "होय — वाढत्या संख्येने जर्मन सार्वजनिक विद्यापीठे इंग्रजी-माध्यम Bachelor's देत आहेत." },
        { q: "किती शिष्यवृत्ती वास्तववादी आहे?", a: "मोठ्या प्रमाणात बदलते — काही liberal arts colleges ५०-८०% सहाय्य देतात." },
      ],
    },
  },
  masters: {
    en: {
      eyebrow: "Graduate · Master's",
      title: "Master's Abroad — Turn Ambition Into Career Momentum.",
      subtitle: "Graduate pathways for engineers, scientists, managers and researchers targeting the USA and Germany — with a focus on funding, career outcomes and long-term settlement options.",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=85",
      whoFor: [
        "Bachelor's graduates or final-year students aiming for Master's abroad",
        "Working professionals with 1–4 years of experience seeking career growth",
        "Researchers targeting funded Master's or thesis-based programs",
      ],
      why: [
        { t: "Career leverage", d: "A well-chosen Master's opens doors to global roles, higher-value work and long-term visa pathways." },
        { t: "STEM tailwinds", d: "STEM Master's in the USA extends OPT, while Germany's Blue Card is a strong path for STEM graduates." },
        { t: "Funding opportunities", d: "Assistantships, fellowships and tuition-free public universities in Germany can materially reduce cost." },
      ],
      eligibility: [
        "Bachelor's degree with strong academic performance (typically 70%+ or 3.0+ GPA equivalent)",
        "GRE / GMAT for many US programs (increasingly optional); English proficiency for both",
        "APS certificate for Germany; sometimes German-language proficiency depending on program",
      ],
      timeline: [
        { t: "12–14 months out", d: "Testing strategy (GRE/GMAT), university research, profile audit." },
        { t: "8–10 months out", d: "SOP drafting, LOR requests, GRE completion." },
        { t: "5–7 months out", d: "University shortlist finalised; applications drafted; financial docs prepared." },
        { t: "3–5 months out", d: "Submissions and interviews; scholarship applications." },
        { t: "0–3 months out", d: "Admits, financial planning, visa and pre-departure." },
      ],
      faqs: [
        { q: "Do I really need GRE for a US Master's?", a: "Increasingly optional, but a strong GRE still helps funded programs and competitive schools. We assess this on a program-by-program basis." },
        { q: "How competitive is a Master's in Germany?", a: "Public universities have specific eligibility gates but limited seats — early preparation of APS, transcripts and language matters." },
        { q: "How much funding can I realistically expect?", a: "Assistantships and fellowships in the USA can offset 40–100% of costs at some programs. In Germany, public universities are near-zero tuition; living costs still apply." },
      ],
    },
    mr: {
      eyebrow: "पदव्युत्तर · Master's",
      title: "परदेशी Master's — आकांक्षेला करिअर गती द्या.",
      subtitle: "USA आणि Germany साठी अभियंते, संशोधक, व्यवस्थापक यांच्यासाठी पदव्युत्तर मार्ग — funding, करिअर परिणाम आणि दीर्घकालीन स्थैर्यावर भर.",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=85",
      whoFor: [
        "परदेशी Master's करू इच्छिणारे Bachelor's पदवीधर",
        "१-४ वर्ष अनुभवी व्यावसायिक",
        "Funded Master's किंवा thesis-based programs लक्षात असणारे संशोधक",
      ],
      why: [
        { t: "करिअर लाभ", d: "योग्य Master's जागतिक भूमिका, उच्च-मूल्य काम आणि व्हिसा मार्ग उघडते." },
        { t: "STEM सोयी", d: "USA मध्ये STEM Master's OPT वाढवते; Germany Blue Card मजबूत मार्ग." },
        { t: "Funding संधी", d: "Assistantships आणि जर्मन सार्वजनिक विद्यापीठे खर्च कमी करू शकतात." },
      ],
      eligibility: [
        "मजबूत शैक्षणिक कामगिरीसह Bachelor's",
        "अनेक US programs साठी GRE/GMAT; इंग्रजी प्रवीणता",
        "Germany साठी APS प्रमाणपत्र; कधी जर्मन भाषा",
      ],
      timeline: [
        { t: "१२-१४ महिने आधी", d: "GRE/GMAT धोरण, विद्यापीठ संशोधन, प्रोफाइल." },
        { t: "८-१० महिने आधी", d: "SOP लेखन, LOR विनंत्या, GRE पूर्ण." },
        { t: "५-७ महिने आधी", d: "शॉर्टलिस्ट; अर्ज मसुदे; आर्थिक कागदपत्रे." },
        { t: "३-५ महिने आधी", d: "सादरीकरण, मुलाखती; शिष्यवृत्ती अर्ज." },
        { t: "०-३ महिने आधी", d: "प्रवेश, आर्थिक नियोजन, व्हिसा." },
      ],
      faqs: [
        { q: "US Master's साठी GRE खरोखर लागते का?", a: "वाढत्या प्रमाणात ऐच्छिक, पण उच्च GRE अजूनही funded programs साठी मदत करतो." },
        { q: "Germany मध्ये Master's किती स्पर्धात्मक आहे?", a: "सार्वजनिक विद्यापीठांमध्ये मर्यादित जागा — लवकर APS आणि भाषा तयारी महत्त्वाची." },
        { q: "किती funding वास्तववादी अपेक्षित?", a: "USA मध्ये assistantships ४०-१००% खर्च भरून काढू शकतात. Germany मध्ये शुल्क शून्य असते पण राहणीमान खर्च राहतो." },
      ],
    },
  },
};

export default function ProgramDetail({ onOpenLead }) {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const prog = PROGRAMS[slug];
  if (!prog) return <Navigate to="/" replace />;
  const c = prog[lang] || prog.en;
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative pb-14 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">{c.eyebrow}</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-[1.05] tracking-tight text-balance">{c.title}</h1>
            <p className="mt-5 text-slate-600 text-base lg:text-lg leading-relaxed max-w-xl">{c.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onOpenLead} className="btn-orange px-6 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2" data-testid="program-book-cta">
                {t.finalCta.primary} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"><img src={c.img} alt={c.title} className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </section>

      {/* Who is this for + Why */}
      <section className="py-14 lg:py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">{t.common.whoFor}</div>
            <h2 className="font-display font-bold text-2xl text-brand-navy mb-5">{lang === "mr" ? "हे कोणासाठी आहे" : "Who is this for"}</h2>
            <ul className="space-y-3">
              {c.whoFor.map((w, i) => (
                <li key={i} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /><span className="text-slate-700 text-sm leading-relaxed">{w}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">{t.common.why}</div>
            <h2 className="font-display font-bold text-2xl text-brand-navy mb-5">{lang === "mr" ? "हा मार्ग का" : "Why this pathway"}</h2>
            <div className="space-y-4">
              {c.why.map((w, i) => (
                <div key={i}>
                  <div className="font-display font-bold text-brand-navy mb-1">{w.t}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{w.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">{t.common.eligibility}</div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-6">{lang === "mr" ? "पात्रता" : "Eligibility"}</h2>
          <ul className="space-y-3 bg-white rounded-2xl p-6 border border-slate-100">
            {c.eligibility.map((e, i) => (
              <li key={i} className="flex gap-3"><Book className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /><span className="text-slate-700 leading-relaxed">{e}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 lg:py-20 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">{t.common.timeline}</div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-10">{lang === "mr" ? "सामान्य वेळापत्रक" : "Typical Timeline"}</h2>
          <div className="space-y-4">
            {c.timeline.map((s, i) => (
              <div key={i} className="flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0"><Calendar className="w-5 h-5" /></div>
                <div>
                  <div className="font-display font-bold text-lg">{s.t}</div>
                  <div className="text-white/70 text-sm leading-relaxed mt-1">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">FAQ</div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-8">{lang === "mr" ? "वारंवार विचारले जाणारे प्रश्न" : "Frequently Asked"}</h2>
          <div className="space-y-3">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-slate-100 p-5 group" data-testid={`program-faq-${i}`}>
                <summary className="font-display font-semibold text-brand-navy cursor-pointer flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight text-balance">{t.finalCta.title}</h2>
          <p className="mt-4 text-slate-600 text-lg">{t.finalCta.subtitle}</p>
          <button onClick={onOpenLead} className="mt-6 btn-orange px-7 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2" data-testid="program-cta-book">
            {t.finalCta.primary} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export function ProgramsIndex({ onOpenLead }) {
  const { lang } = useLang();
  const isMr = lang === "mr";
  const items = [
    { slug: "usmle", title: PROGRAMS.usmle[lang]?.title || PROGRAMS.usmle.en.title, desc: PROGRAMS.usmle[lang]?.subtitle || PROGRAMS.usmle.en.subtitle, img: PROGRAMS.usmle.en.img },
    { slug: "residency", title: PROGRAMS.residency[lang]?.title || PROGRAMS.residency.en.title, desc: PROGRAMS.residency[lang]?.subtitle || PROGRAMS.residency.en.subtitle, img: PROGRAMS.residency.en.img },
    { slug: "bachelors", title: PROGRAMS.bachelors[lang]?.title || PROGRAMS.bachelors.en.title, desc: PROGRAMS.bachelors[lang]?.subtitle || PROGRAMS.bachelors.en.subtitle, img: PROGRAMS.bachelors.en.img },
    { slug: "masters", title: PROGRAMS.masters[lang]?.title || PROGRAMS.masters.en.title, desc: PROGRAMS.masters[lang]?.subtitle || PROGRAMS.masters.en.subtitle, img: PROGRAMS.masters.en.img },
  ];
  const prefix = lang === "mr" ? "/mr" : "";
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Programs</div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-brand-navy tracking-tight">{isMr ? "आमचे कार्यक्रम" : "Our Programs"}</h1>
          <p className="mt-4 text-slate-600 text-lg">{isMr ? "प्रत्येक टप्प्यासाठी संरचित मार्ग." : "Structured pathways for every stage of your journey."}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((p) => (
            <Link key={p.slug} to={`${prefix}/programs/${p.slug}`} data-testid={`program-index-${p.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover">
              <div className="aspect-[16/9] overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-brand-navy mb-2 group-hover:text-brand-blue">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{p.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-brand-orange font-semibold text-sm group-hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
