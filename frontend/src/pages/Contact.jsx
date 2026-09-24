import { useState } from "react";
import { useLang } from "../i18n";
import { publicApi } from "../lib/api";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Contact({ onOpenLead }) {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await publicApi.createContact({ ...form, language: lang });
      toast.success(t.contact.sent);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch { toast.error("Please try again."); }
    finally { setSending(false); }
  };

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Contact</div>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-brand-navy leading-[1.1] tracking-tight text-balance">{t.contact.title}</h1>
            <p className="mt-4 text-slate-600 text-lg">{t.contact.subtitle}</p>
            <button onClick={onOpenLead} className="mt-6 btn-orange px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2" data-testid="contact-book-cta">
              {t.contact.cta}
            </button>
            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{t.contact.phoneLabel}</div>
                  <a href="tel:+918899117757" className="font-display font-bold text-brand-navy hover:text-brand-blue">8899117757 / 8899117767</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{t.contact.emailLabel}</div>
                  <a href="mailto:info@astuteacademy.com" className="font-display font-bold text-brand-navy hover:text-brand-blue">info@astuteacademy.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{t.contact.officeLabel}</div>
                  <div className="font-display font-bold text-brand-navy">{t.contact.officeValue}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center"><MessageCircle className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">WhatsApp</div>
                  <a href="https://wa.me/918899117757" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-brand-navy hover:text-emerald-600">Chat with us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submit} className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-10 shadow-sm" data-testid="contact-form">
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-6">{t.contact.formTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.name} className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="contact-name" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.email} className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="contact-email" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t.contact.phone} className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="contact-phone" />
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder={t.contact.subject} className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="contact-subject" />
              </div>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.message} className="mt-4 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" data-testid="contact-message" />
              <button type="submit" disabled={sending} className="mt-5 btn-orange px-6 py-3 rounded-full font-semibold text-sm disabled:opacity-50" data-testid="contact-send">
                {sending ? "..." : t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
