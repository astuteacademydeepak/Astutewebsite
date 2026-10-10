import { useState } from "react";
import { useLang } from "../i18n";
import { Award, Compass, Briefcase, Heart, Linkedin, ChevronDown, Trophy } from "lucide-react";

const DEORAS_PHOTO = "https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/s2gttbql__RAJ39521.webp";

const AWARDS = [
  { img: "https://www.astuteacademy.com/uploads/awards_images/268870243_20191221173304.jpg", title: "India Ahead Media Award", body: "Presented by ACTE Chairman & Dr. Satasodabbo, New Delhi", year: "2019" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/771109250_20191221173238.jpg", title: "Educational Reforms Award", body: "For extraordinary contribution to educational reforms in India with social empowerment of rural children", year: "2019" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1697935466_20191221173221.jpg", title: "Best Career Counsellor of the World", body: "For 25 years of service to educational excellence", year: "2019" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1637870646_20191221173117.jpg", title: "Excellence in Leadership", body: "Vision, Innovation, Social Solutions & Business Growth — International Award", year: "2018" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1685191330_20191221173054.jpg", title: "Recognition by The Times of India", body: "The Times of India & Maharashtra Times", year: "2018" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1228915055_20191221173030.jpg", title: "Champions of Change Award", body: "For extraordinary contribution to educational reforms and social empowerment of rural children", year: "2018" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1100916894_20191221173018.jpg", title: "Pride of the Nation Award", body: "Awarded for career counselling services for more than 25 years", year: "2018" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/2124858250_20191221173005.jpg", title: "Uttar Maharashtra Ratna", body: "For extraordinary contribution to educational reforms and social empowerment of rural children", year: "2017" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/174155948_20191221172949.jpg", title: "CSR Journal Excellence Award", body: "Recognised as a prestigious social contributor in educational and social responsibility", year: "2017" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/779561664_20191221172610.jpg", title: "Maharashtra Gaurav Award", body: "Presented by Shri Nitin Gadkari, Union Minister — for outstanding contribution to education", year: "2017" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1089821153_20191221172559.jpg", title: "MEATHS Global Impact Award", body: "For empowering careers through modern educational development and rural upliftment", year: "2017" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/650366045_20191221172543.jpg", title: "Best Career Counsellor in India", body: "Inspirational Business Award — presented by Shri Amarjit Singh, Indian Politician", year: "2016" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/792223540_20191221172522.jpg", title: "MahaCM's Greatest Leaders Award", body: "Presented in Dubai for extraordinary work in educational reform and skill development", year: "2016" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/665610742_20191221172509.jpg", title: "Times Pune Visionary Award", body: "Presented by Shri Girish Bapat, then Minister for Civil Supplies and Consumer Protection", year: "2016" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/792747262_20191221172458.jpg", title: "Best Career Counsellor Award", body: "Best Career Counsellor in Pune — by API Media", year: "2016" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1793172288_20191221172443.jpg", title: "Best Career Counselling Academy in Maharashtra", body: "Certificate of Excellence Award by Times Cybermedia Group", year: "2016" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1952599751_20191221172431.jpg", title: "Swami Vivekananda Excellence Award", body: "Swami Vivekananda Excellence Award, Nashik", year: "2015" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/2066875654_20191221172417.jpg", title: "Pune's Most Powerful", body: "By Pinkline, Times of India Group", year: "2015" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1177659500_20191221172406.jpg", title: "Lokmat Professional Icon of Pune", body: "By Lokmat Media Group — presented with Adv. Ujjwal Nikam, Special Public Prosecutor", year: "2015" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/778237615_20191221172354.jpg", title: "Best Career Counsellor in India", body: "For excellence in career education and promotion of quality guidance globally", year: "2015" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/2133921467_20191221172335.jpg", title: "Educational Excellence Award", body: "For consistent contribution to career guidance and student mentorship", year: "2014" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1828288731_20191221172309.jpg", title: "Social Contribution Award", body: "For rural education initiatives and student empowerment programs", year: "2014" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/361619364_20191221172205.jpg", title: "Youth Icon Award", body: "For inspiring the next generation of Indian students towards global education", year: "2014" },
  { img: "https://www.astuteacademy.com/uploads/awards_images/1972636316_20191221172150.jpg", title: "Lifetime Achievement in Career Counselling", body: "For pioneering career counselling services across Maharashtra and India", year: "2013" },
];

function AwardsSection({ isMr }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-16 lg:py-20 bg-brand-light" data-testid="awards-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 flex items-center gap-5 hover:border-brand-orange transition-colors group"
          data-testid="awards-toggle"
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="text-left flex-1">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-1">{isMr ? "मान्यता" : "Recognition"}</div>
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-brand-navy tracking-tight">
              {isMr ? "पुरस्कार आणि सन्मान" : "Awards We Have Received"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isMr ? `${AWARDS.length} पुरस्कार — २०१३ ते २०१९ (क्लिक करा)` : `${AWARDS.length} awards received between 2013 – 2019 — click to view`}
            </p>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up" data-testid="awards-grid">
            {AWARDS.map((a, i) => (
              <div
                key={i}
                data-testid={`award-card-${i}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-orange transition-all shadow-sm hover:shadow-lg flex flex-col"
              >
                <button onClick={() => setLightbox(a)} className="aspect-[4/3] overflow-hidden bg-brand-light">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                  />
                </button>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">{a.year}</div>
                  <h3 className="font-display font-bold text-brand-navy text-base leading-snug mb-2">{a.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[80] bg-brand-navy/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)} data-testid="award-lightbox">
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl bg-white" />
            <div className="mt-4 text-center text-white">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">{lightbox.year}</div>
              <div className="font-display font-bold text-xl">{lightbox.title}</div>
              <div className="text-sm text-white/70 mt-1 max-w-xl mx-auto">{lightbox.body}</div>
            </div>
          </div>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}

export default function About() {
  const { lang } = useLang();
  const isMr = lang === "mr";
  return (
    <div className="pt-24 lg:pt-32">
      <section className="pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">
            {isMr ? "आमच्याविषयी" : "About Astute"}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-[1.05] tracking-tight text-balance">
            {isMr ? "आकांक्षा आणि वास्तव यांना जोडणारी संस्था." : "An academy that bridges ambition and reality."}
          </h1>
          <p className="mt-6 text-slate-600 text-base lg:text-lg leading-relaxed">
            {isMr
              ? "अ‍ॅस्ट्यूट अकादमी तीन दशकांच्या अनुभवावर उभी आहे — भारतीय विद्यार्थी, डॉक्टर आणि पालकांना ग्लोबल एज्युकेशन आणि करिअर निर्णयांमध्ये मार्गदर्शन देत."
              : "Astute Academy is built on three decades of experience — guiding Indian students, doctors and parents through global education and career decisions with clarity, honesty and structured mentorship."}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-10">{isMr ? "आमची मूल्ये" : "What We Stand For"}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award, t: isMr ? "अनुभव" : "Experience", d: isMr ? "तीन दशकांचा करिअर आणि ग्लोबल एज्युकेशन." : "Three decades of career and global education." },
              { icon: Compass, t: isMr ? "प्रामाणिकता" : "Honesty", d: isMr ? "अवास्तव आश्वासने नाहीत — फक्त खरे मार्ग." : "No inflated promises. Only what we can genuinely guide." },
              { icon: Briefcase, t: isMr ? "संरचना" : "Structure", d: isMr ? "टप्प्यांसह स्पष्ट रोडमॅप." : "Clear roadmaps with concrete milestones." },
              { icon: Heart, t: isMr ? "मानवीयता" : "Humanity", d: isMr ? "प्रत्येक विद्यार्थ्याला वेगळे समजून घेणे." : "Understanding every student as an individual." },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
                <v.icon className="w-6 h-6 text-brand-orange mb-4" />
                <div className="font-display font-bold text-brand-navy mb-1">{v.t}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24" data-testid="leadership-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">{isMr ? "नेतृत्व" : "Leadership"}</div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-10">{isMr ? "अ‍ॅस्ट्यूटच्या मागील मन" : "The Mind Behind Astute"}</h2>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden grid md:grid-cols-5 gap-0 items-stretch shadow-sm">
            <div className="md:col-span-2 relative bg-brand-light">
              <img
                src={DEORAS_PHOTO}
                alt="Dr. Tushar Vinod Deoras"
                className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
              />
            </div>
            <div className="md:col-span-3 p-6 lg:p-10 flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">{isMr ? "अध्यक्ष" : "Chairman"}</div>
              <h3 className="font-display font-extrabold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-3">Dr. Tushar Deoras</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {isMr
                  ? "अ‍ॅस्ट्यूट अकादमीचे अध्यक्ष. तीन दशकांहून अधिक अनुभव — करिअर समुपदेशन, ग्लोबल एज्युकेशन आणि मेडिकल करिअर मार्गदर्शनात. हजारो विद्यार्थ्यांना जागतिक विद्यापीठे आणि आरोग्य प्रणालींपर्यंत पोहोचण्यास मार्गदर्शन केले आहे."
                  : "Chairman of Astute Academy with over three decades of experience in career counselling, global education and medical career mentoring. Has guided thousands of students towards leading universities and healthcare systems worldwide."}
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                {isMr
                  ? "एक शिक्षणतज्ज्ञ, संशोधक आणि मार्गदर्शक — त्यांच्या नेतृत्वाखाली अ‍ॅस्ट्यूट अकादमीने भारतीय विद्यार्थ्यांसाठी आंतरराष्ट्रीय शिक्षण अधिक पारदर्शक आणि साध्य बनवले आहे."
                  : "An educationist, researcher and mentor — under his leadership Astute Academy has made international education more transparent and achievable for Indian students."}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-brand-blue text-brand-blue font-semibold text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-brand-navy text-brand-navy font-semibold text-sm">
                  {isMr ? "अधिक वाचा" : "Read more"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-16 lg:py-24 bg-brand-navy text-white relative overflow-hidden" data-testid="founders-note">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-4">{isMr ? "संस्थापकांचा संदेश" : "Founder's Note"}</div>
          <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight mb-10 max-w-3xl text-balance">
            {isMr ? "प्रत्येक विद्यार्थ्यामागे एक शांत, प्रामाणिक निर्णय असतो." : "Behind every student, there is a quiet, honest decision."}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <img
                src={DEORAS_PHOTO}
                alt="Dr. Tushar Vinod Deoras"
                className="w-full max-w-[240px] rounded-2xl object-cover aspect-[3/4] shadow-2xl"
              />
              <div className="mt-4">
                <div className="font-display font-bold text-lg">Dr. Tushar Deoras</div>
                <div className="text-sm text-white/70">{isMr ? "अध्यक्ष, अ‍ॅस्ट्यूट अकादमी" : "Chairman, Astute Academy"}</div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-5 text-white/85 text-base lg:text-lg leading-relaxed">
              {isMr ? (
                <>
                  <p>तीन दशकांहून अधिक काळ मी एका साध्या विश्वासाने काम करत आहे — <span className="text-white font-semibold">करिअर समुपदेशन म्हणजे विद्यार्थ्याला एखाद्या कोर्सकडे ढकलणे नव्हे. ते म्हणजे त्याच्या आकांक्षा, त्याचे कुटुंब आणि त्याचे वास्तव — या सर्वांचा शांतपणे विचार करून एक प्रामाणिक, संरचित मार्ग घडवणे.</span></p>
                  <p>जेव्हा अ‍ॅस्ट्यूट अकादमी सुरू झाली, तेव्हा भारतातून आंतरराष्ट्रीय शिक्षण घेणे हे एक भीतीदायक कोडे होते. आज ते अधिक सुलभ आहे — पण अधिक गुंतागुंतीचेही आहे. अधिक पर्याय, अधिक माहिती, आणि खूप गोंधळ. समुपदेशकाची भूमिका आजपर्यंत कधीच इतकी महत्त्वाची नव्हती.</p>
                  <p>प्रत्येक विद्यार्थी आणि पालकाला मी हे सांगू इच्छितो: <span className="text-white font-semibold">योग्य मार्गदर्शन ते नाही जे सर्व काही देण्याचे वचन देते. ते आहे जे तुम्हाला माहितीपूर्ण निर्णय घेण्यास मदत करते — एका वेळी एक टप्पा.</span></p>
                  <p className="pt-4">अ‍ॅस्ट्यूट अकादमीचा प्रत्येक टप्पा — प्रत्येक बैठक, प्रत्येक SOP, प्रत्येक व्हिसा — याच विश्वासाला जागृत ठेवण्याचा प्रयत्न आहे. आणि तो प्रवास आम्ही तुमच्यासोबत करू इच्छितो.</p>
                </>
              ) : (
                <>
                  <p>For over three decades, I have worked with a simple belief — <span className="text-white font-semibold">career counselling is not about pushing a student toward a course. It is about listening deeply to their ambitions, their families and their realities — and then building an honest, structured path.</span></p>
                  <p>When Astute Academy started, international education from India was an intimidating maze. Today, it is more accessible than ever — but also more complex, with more choices, more information and much more noise. The role of a counsellor has never been more important than it is now.</p>
                  <p>To every student and parent reading this, I want to say one thing: <span className="text-white font-semibold">the right guidance is not the one that promises everything. It is the one that helps you make informed decisions, one milestone at a time.</span></p>
                  <p className="pt-4">Every part of Astute Academy — every conversation, every SOP, every visa file — is an attempt to keep that belief alive. And it is a journey we would be honoured to walk with you.</p>
                </>
              )}
              <div className="pt-6 flex items-center gap-4">
                <div className="text-4xl text-white" style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}>
                  Tushar V. Deoras
                </div>
                <div className="h-px flex-1 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <AwardsSection isMr={isMr} />
    </div>
  );
}
