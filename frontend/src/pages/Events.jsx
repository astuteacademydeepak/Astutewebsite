import { useState, useEffect } from "react";
import { useLang } from "../i18n";
import { publicApi } from "../lib/api";
import { Calendar, Clock, User as UserIcon } from "lucide-react";

export default function Events() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState("upcoming");
  const [items, setItems] = useState([]);
  useEffect(() => { publicApi.listEvents(status).then(setItems).catch(() => setItems([])); }, [status]);

  const tabs = [
    { k: "upcoming", label: t.events.upcoming },
    { k: "past", label: t.events.past },
  ];

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Live Sessions</div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-brand-navy tracking-tight">{t.events.title}</h1>
          <p className="mt-4 text-slate-600 text-lg">{t.events.subtitle}</p>
        </div>
        <div className="flex gap-2 mb-8">
          {tabs.map((tb) => (
            <button key={tb.k} onClick={() => setStatus(tb.k)} data-testid={`events-tab-${tb.k}`} className={`px-4 py-2 rounded-full text-sm font-semibold ${status === tb.k ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-brand-blue"}`}>
              {tb.label}
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="text-slate-500">{t.events.empty}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="events-grid">
            {items.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover" data-testid={`event-list-card-${e.id}`}>
                {e.image && <div className="aspect-[16/10] overflow-hidden"><img src={e.image} alt={e.title_en} className="w-full h-full object-cover" /></div>}
                <div className="p-5">
                  <div className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-2">{e.mode}</div>
                  <h3 className="font-display font-bold text-brand-navy mb-3 text-base leading-snug">{lang === "mr" ? e.title_mr : e.title_en}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{lang === "mr" ? e.description_mr : e.description_en}</p>
                  <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {e.date}</div>
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {e.time}</div>
                    <div className="flex items-center gap-2"><UserIcon className="w-3.5 h-3.5" /> {e.speaker}</div>
                  </div>
                  {status === "upcoming" && <button className="btn-blue w-full py-2.5 rounded-full text-xs font-semibold">{t.events.register}</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
