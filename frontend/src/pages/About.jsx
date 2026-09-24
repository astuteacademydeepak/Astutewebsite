import { useState } from "react";
import { useLang } from "../i18n";
import { Award, Compass, Briefcase, Heart, Linkedin, ChevronDown, Trophy } from "lucide-react";

const DEORAS_PHOTO = "https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/s2gttbql__RAJ39521.webp";

const AWARD_IMAGES = [
  "https://www.astuteacademy.com/uploads/awards_images/268870243_20191221173304.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/771109250_20191221173238.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1697935466_20191221173221.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1637870646_20191221173117.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1685191330_20191221173054.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1228915055_20191221173030.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1100916894_20191221173018.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/2124858250_20191221173005.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/174155948_20191221172949.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/779561664_20191221172610.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1089821153_20191221172559.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/650366045_20191221172543.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/792223540_20191221172522.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/665610742_20191221172509.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/792747262_20191221172458.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1793172288_20191221172443.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1952599751_20191221172431.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/2066875654_20191221172417.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1177659500_20191221172406.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/778237615_20191221172354.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/2133921467_20191221172335.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1828288731_20191221172309.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/361619364_20191221172205.jpg",
  "https://www.astuteacademy.com/uploads/awards_images/1972636316_20191221172150.jpg",
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
              {isMr ? `${AWARD_IMAGES.length} पुरस्कार आणि सन्मान — पाहण्यासाठी क्लिक करा` : `${AWARD_IMAGES.length} awards and recognitions — click to view`}
            </p>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-fade-up" data-testid="awards-grid">
            {AWARD_IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(src)}
                data-testid={`award-thumb-${i}`}
                className="group aspect-square rounded-xl overflow-hidden bg-white border border-slate-100 hover:border-brand-orange transition-all shadow-sm hover:shadow-md"
              >
                <img
                  src={src}
                  alt={`Astute Academy award ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[80] bg-brand-navy/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)} data-testid="award-lightbox">
          <img src={lightbox} alt="Award" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
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
              <h3 className="font-display font-extrabold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-3">Dr. Tushar Vinod Deoras</h3>
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

      {/* Awards */}
      <AwardsSection isMr={isMr} />
    </div>
  );
}
