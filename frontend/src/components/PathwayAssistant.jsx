import { useState } from "react";
import { X, Sparkles, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { useLang } from "../i18n";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function PathwayAssistant({ open, onClose, onOpenLead }) {
  const { lang, t } = useLang();
  const isMr = lang === "mr";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [data, setData] = useState({
    qualification: "", background: "", interested_course: "",
    preferred_country: "", budget: "", goal: "",
  });

  if (!open) return null;

  const L = {
    title: isMr ? "AI करिअर पथ सहाय्यक" : "AI Career Pathway Assistant",
    subtitle: isMr ? "काही मूलभूत तपशील द्या. मी संभाव्य मार्ग सुचवते." : "Answer a few basics — I'll suggest possible pathways.",
    q1: isMr ? "तुमची सध्याची पात्रता?" : "Your current qualification",
    q1ph: isMr ? "उदा. १२ वी, MBBS, Bachelor's, Master's" : "e.g. Class 12, MBBS, Bachelor's, Master's",
    q2: isMr ? "शैक्षणिक पार्श्वभूमी" : "Academic background",
    q2ph: isMr ? "उदा. PCM / PCB / वाणिज्य / अभियांत्रिकी" : "e.g. PCM / PCB / Commerce / Engineering",
    q3: isMr ? "आवडता कोर्स / क्षेत्र" : "Interested course / field",
    q3ph: isMr ? "उदा. Computer Science, Medicine, Mechanical" : "e.g. Computer Science, Medicine, Mechanical",
    q4: isMr ? "पसंतीचा देश" : "Preferred country",
    q4opts: ["USA", "Germany", isMr ? "दोन्ही" : "Both", isMr ? "अजून ठरवले नाही" : "Not decided"],
    q5: isMr ? "अंदाजे बजेट" : "Approximate budget",
    q5opts: [
      isMr ? "₹२० लाख पर्यंत" : "Under ₹20 L",
      isMr ? "₹२०-५० लाख" : "₹20–50 L",
      isMr ? "₹५० लाख पेक्षा जास्त" : "Above ₹50 L",
      isMr ? "अजून विचार केला नाही" : "Not decided",
    ],
    q6: isMr ? "करिअर ध्येय" : "Career goal",
    q6ph: isMr ? "उदा. कार्डिओलॉजिस्ट, सॉफ्टवेअर इंजिनिअर..." : "e.g. Cardiologist, Software Engineer...",
    next: isMr ? "पुढे" : "Next",
    back: isMr ? "मागे" : "Back",
    submit: isMr ? "पथ सुचवा" : "Suggest Pathways",
    reset: isMr ? "पुन्हा सुरू करा" : "Start over",
    book: isMr ? "मोफत समुपदेशन बुक करा" : "Book Free Counselling",
    disclaimerLabel: isMr ? "अस्वीकरण:" : "Important:",
  };

  const total = 6;
  const canNext = () => {
    if (step === 1) return data.qualification.trim().length > 1;
    if (step === 2) return data.background.trim().length > 1;
    if (step === 3) return data.interested_course.trim().length > 1;
    if (step === 4) return !!data.preferred_country;
    if (step === 5) return !!data.budget;
    if (step === 6) return data.goal.trim().length > 2;
    return false;
  };

  const submit = async () => {
    setLoading(true);
    setResponse("");
    try {
      const r = await api.post("/ai/pathway", { ...data, language: lang });
      setResponse(r.data.response);
      setDisclaimer(r.data.disclaimer || "");
    } catch (e) {
      toast.error(isMr ? "काही चुकले. कृपया पुन्हा प्रयत्न करा." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setResponse(""); setDisclaimer("");
    setData({ qualification: "", background: "", interested_course: "", preferred_country: "", budget: "", goal: "" });
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center p-0 sm:p-4" data-testid="pathway-assistant-modal">
      <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col animate-fade-up overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-brand-navy to-brand-blue text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <div>
              <h3 className="font-display font-bold text-xl">{L.title}</h3>
              <p className="text-sm text-white/75 mt-0.5">{L.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" data-testid="pathway-close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {response ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 text-sm sm:text-base leading-relaxed" data-testid="pathway-response">{response}</div>
              {disclaimer && (
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>{L.disclaimerLabel}</strong> {disclaimer}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 p-5 border-t border-slate-100">
              <button onClick={reset} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-blue" data-testid="pathway-reset">
                <RotateCcw className="w-4 h-4" /> {L.reset}
              </button>
              <button onClick={() => { onClose(); onOpenLead && onOpenLead(); }} className="btn-orange ml-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold" data-testid="pathway-book">
                {L.book} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <span>{isMr ? "पायरी" : "Step"} {step} / {total}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange transition-all" style={{ width: `${(step / total) * 100}%` }} />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {step === 1 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q1}</label>
                  <input value={data.qualification} onChange={(e) => setData({ ...data, qualification: e.target.value })} placeholder={L.q1ph} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="pathway-q1" />
                </div>
              )}
              {step === 2 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q2}</label>
                  <input value={data.background} onChange={(e) => setData({ ...data, background: e.target.value })} placeholder={L.q2ph} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="pathway-q2" />
                </div>
              )}
              {step === 3 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q3}</label>
                  <input value={data.interested_course} onChange={(e) => setData({ ...data, interested_course: e.target.value })} placeholder={L.q3ph} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="pathway-q3" />
                </div>
              )}
              {step === 4 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q4}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {L.q4opts.map((o) => (
                      <button key={o} onClick={() => setData({ ...data, preferred_country: o })} data-testid={`pathway-country-${o}`} className={`px-5 py-3 rounded-xl border-2 font-medium text-sm ${data.preferred_country === o ? "border-brand-orange bg-orange-50 text-brand-navy" : "border-slate-200 hover:border-brand-blue text-slate-700"}`}>{o}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 5 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q5}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {L.q5opts.map((o) => (
                      <button key={o} onClick={() => setData({ ...data, budget: o })} data-testid={`pathway-budget-${o}`} className={`px-5 py-3 rounded-xl border-2 font-medium text-sm ${data.budget === o ? "border-brand-orange bg-orange-50 text-brand-navy" : "border-slate-200 hover:border-brand-blue text-slate-700"}`}>{o}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 6 && (
                <div>
                  <label className="font-display font-semibold text-lg text-brand-navy block mb-3">{L.q6}</label>
                  <textarea value={data.goal} onChange={(e) => setData({ ...data, goal: e.target.value })} rows={3} placeholder={L.q6ph} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="pathway-q6" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 p-5 border-t border-slate-100">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-blue" data-testid="pathway-back">
                  {L.back}
                </button>
              )}
              {step < total ? (
                <button onClick={() => setStep(step + 1)} disabled={!canNext()} className="btn-orange ml-auto inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed" data-testid="pathway-next">
                  {L.next} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={!canNext() || loading} className="btn-orange ml-auto inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed" data-testid="pathway-submit">
                  {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> {isMr ? "विचार करत आहे..." : "Thinking..."}</>) : (<>{L.submit} <Sparkles className="w-4 h-4" /></>)}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
