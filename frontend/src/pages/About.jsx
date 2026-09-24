import { useLang } from "../i18n";
import { Award, Compass, Briefcase, Heart, Linkedin } from "lucide-react";

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
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-navy tracking-tight mb-10">{isMr ? "नेतृत्व" : "Leadership"}</h2>
          <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-10 grid md:grid-cols-3 gap-8 items-start">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-navy flex items-center justify-center">
              <div className="text-white/40 font-display font-extrabold text-6xl">TD</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-2">Chairman</div>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-brand-navy mb-2">Dr. Tushar Vinod Deoras</h3>
              <p className="text-slate-600 leading-relaxed mb-5">
                {isMr
                  ? "अ‍ॅस्ट्यूट अकादमीचे अध्यक्ष. तीन दशकांहून अधिक अनुभव — करिअर समुपदेशन, ग्लोबल एज्युकेशन आणि मेडिकल करिअर मार्गदर्शनात. हजारो विद्यार्थ्यांना जागतिक विद्यापीठे आणि आरोग्य प्रणालींपर्यंत पोहोचण्यास मार्गदर्शन केले आहे."
                  : "Chairman of Astute Academy with over three decades of experience in career counselling, global education and medical career mentoring. Has guided thousands of students towards leading universities and healthcare systems worldwide."}
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:text-brand-navy"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
