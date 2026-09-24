import { useState } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "../i18n";
import { publicApi } from "../lib/api";
import { toast } from "sonner";

const AUDIENCE_MAP = { 0: "Student", 1: "Doctor", 2: "Parent", 3: "Working Professional" };
const INTEREST_MAP = { 0: "USA", 1: "Germany", 2: "Medical Careers", 3: "Career Counselling", 4: "Other" };
const EDU_MAP = { 0: "Class 12", 1: "Bachelor's", 2: "Master's", 3: "MBBS/MD", 4: "Working Professional" };
const DEST_MAP = { 0: "USA", 1: "Germany", 2: "Other", 3: "Not sure" };

export default function LeadFormModal({ open, onClose }) {
  const { lang, t } = useLang();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    audience: null, interest: null, education: null, destination: null, goal: "",
    name: "", phone: "", whatsapp: "", email: "", consent: false,
  });

  if (!open) return null;

  const total = 6;
  const canNext = () => {
    if (step === 1) return data.audience !== null;
    if (step === 2) return data.interest !== null;
    if (step === 3) return data.education !== null;
    if (step === 4) return data.destination !== null;
    if (step === 5) return data.goal.trim().length > 2;
    if (step === 6) return data.name.trim().length > 1 && /^\d{10}$/.test(data.phone) && data.consent;
    return false;
  };

  const reset = () => { setStep(1); setDone(false); setData({ audience: null, interest: null, education: null, destination: null, goal: "", name: "", phone: "", whatsapp: "", email: "", consent: false }); };

  const submit = async () => {
    setSubmitting(true);
    try {
      await publicApi.createLead({
        audience: AUDIENCE_MAP[data.audience],
        interest: INTEREST_MAP[data.interest],
        education: EDU_MAP[data.education],
        destination: DEST_MAP[data.destination],
        goal: data.goal,
        name: data.name,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        email: data.email || null,
        language: lang,
      });
      setDone(true);
      toast.success(t.form.success);
    } catch (e) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  const OptionGrid = ({ options, value, onSelect, testid }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          data-testid={`${testid}-option-${i}`}
          className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${value === i ? "border-brand-orange bg-orange-50 text-brand-navy" : "border-slate-200 hover:border-brand-blue bg-white text-slate-700"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4" data-testid="lead-form-modal">
      <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col animate-fade-up">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-display font-bold text-xl text-brand-navy">{t.form.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{t.form.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100" data-testid="lead-form-close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!done ? (
          <>
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <span>{t.form.step} {step} {t.form.of} {total}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange transition-all" style={{ width: `${(step / total) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {step === 1 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s1.q}</h4>
                  <OptionGrid options={t.form.s1.opts} value={data.audience} onSelect={(i) => setData({ ...data, audience: i })} testid="step1" />
                </div>
              )}
              {step === 2 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s2.q}</h4>
                  <OptionGrid options={t.form.s2.opts} value={data.interest} onSelect={(i) => setData({ ...data, interest: i })} testid="step2" />
                </div>
              )}
              {step === 3 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s3.q}</h4>
                  <OptionGrid options={t.form.s3.opts} value={data.education} onSelect={(i) => setData({ ...data, education: i })} testid="step3" />
                </div>
              )}
              {step === 4 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s4.q}</h4>
                  <OptionGrid options={t.form.s4.opts} value={data.destination} onSelect={(i) => setData({ ...data, destination: i })} testid="step4" />
                </div>
              )}
              {step === 5 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s5.q}</h4>
                  <textarea
                    value={data.goal}
                    onChange={(e) => setData({ ...data, goal: e.target.value })}
                    placeholder={t.form.s5.ph}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-slate-800"
                    data-testid="step5-goal"
                  />
                </div>
              )}
              {step === 6 && (
                <div>
                  <h4 className="font-display font-semibold text-lg text-brand-navy mb-4">{t.form.s6.q}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600">{t.form.s6.name} *</label>
                      <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder={t.form.s6.namePh} className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="step6-name" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">{t.form.s6.phone} *</label>
                      <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder={t.form.s6.phonePh} className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="step6-phone" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">{t.form.s6.wa}</label>
                        <input type="tel" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder={t.form.s6.waPh} className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="step6-whatsapp" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">{t.form.s6.email}</label>
                        <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder={t.form.s6.emailPh} className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="step6-email" />
                      </div>
                    </div>
                    <label className="flex items-start gap-3 pt-2 text-xs text-slate-600 cursor-pointer">
                      <input type="checkbox" checked={data.consent} onChange={(e) => setData({ ...data, consent: e.target.checked })} className="mt-0.5 w-4 h-4 accent-brand-orange" data-testid="step6-consent" />
                      <span>{t.form.s6.consent}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 p-6 pt-4 border-t border-slate-100">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-blue" data-testid="lead-form-back">
                  <ArrowLeft className="w-4 h-4" /> {t.form.back}
                </button>
              )}
              {step < total ? (
                <button onClick={() => setStep(step + 1)} disabled={!canNext()} className="btn-orange ml-auto inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed" data-testid="lead-form-next">
                  {t.form.next} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={!canNext() || submitting} className="btn-orange ml-auto inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed" data-testid="lead-form-submit">
                  {submitting ? "..." : t.form.submit}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="p-10 text-center flex flex-col items-center" data-testid="lead-form-success">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h4 className="font-display font-bold text-2xl text-brand-navy mb-2">{t.form.success}</h4>
            <p className="text-slate-600 mb-6 max-w-sm">{t.form.successSub}</p>
            <button onClick={() => { reset(); onClose(); }} className="btn-blue px-6 py-2.5 rounded-full text-sm font-semibold">
              {t.form.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
