import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import { LogOut, Plus, Trash2, Users, Mail, CalendarDays, FileText, Star } from "lucide-react";
import { toast } from "sonner";

const LOGO = "https://customer-assets-4nw71qhi.emergentagent.net/job_astute-rebuild/artifacts/wyk1m34k_Astute%20logo%201.png";

function useAuthApi(token) {
  return useCallback((cfg) => api({ ...cfg, headers: { ...(cfg.headers || {}), Authorization: `Bearer ${token}` } }), [token]);
}

const TABS = [
  { k: "leads", label: "Leads", icon: Users },
  { k: "contacts", label: "Messages", icon: Mail },
  { k: "events", label: "Events", icon: CalendarDays },
  { k: "blog", label: "Blog", icon: FileText },
  { k: "testimonials", label: "Testimonials", icon: Star },
];

/* ============ EVENT FORM ============ */
function EventForm({ authApi, onSaved }) {
  const [f, setF] = useState({ title_en: "", title_mr: "", description_en: "", description_mr: "", date: "", time: "", speaker: "", mode: "Online Webinar", image: "", status: "upcoming", category: "webinar" });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authApi({ method: "POST", url: "/admin/events", data: f });
      toast.success("Event created");
      onSaved();
      setF({ title_en: "", title_mr: "", description_en: "", description_mr: "", date: "", time: "", speaker: "", mode: "Online Webinar", image: "", status: "upcoming", category: "webinar" });
    } catch { toast.error("Failed"); }
    finally { setSaving(false); }
  };
  const Input = ({ k, ph, type = "text" }) => (
    <input required={["title_en","title_mr","date","time","speaker"].includes(k)} type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} placeholder={ph} className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm w-full" />
  );
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-5 border border-slate-100 mb-4">
      <h3 className="font-display font-bold text-brand-navy mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> New Event</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <Input k="title_en" ph="Title (English)" />
        <Input k="title_mr" ph="शीर्षक (Marathi)" />
        <textarea required rows={2} value={f.description_en} onChange={(e) => setF({ ...f, description_en: e.target.value })} placeholder="Description (English)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm md:col-span-2" />
        <textarea required rows={2} value={f.description_mr} onChange={(e) => setF({ ...f, description_mr: e.target.value })} placeholder="वर्णन (Marathi)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm md:col-span-2" />
        <Input k="date" ph="YYYY-MM-DD" />
        <Input k="time" ph="6:00 PM IST" />
        <Input k="speaker" ph="Speaker name" />
        <Input k="mode" ph="Online / Offline" />
        <select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm">
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <Input k="image" ph="Image URL (optional)" />
      </div>
      <button disabled={saving} className="mt-4 btn-blue px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50">{saving ? "..." : "Publish Event"}</button>
    </form>
  );
}

/* ============ BLOG FORM ============ */
function BlogForm({ authApi, onSaved }) {
  const [f, setF] = useState({ slug: "", title_en: "", title_mr: "", excerpt_en: "", excerpt_mr: "", content_en: "", content_mr: "", category: "USA Education", image: "", read_time: 5, author: "Astute Academy", published: true });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authApi({ method: "POST", url: "/admin/blog", data: f });
      toast.success("Post published");
      onSaved();
      setF({ slug: "", title_en: "", title_mr: "", excerpt_en: "", excerpt_mr: "", content_en: "", content_mr: "", category: "USA Education", image: "", read_time: 5, author: "Astute Academy", published: true });
    } catch { toast.error("Failed"); }
    finally { setSaving(false); }
  };
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-5 border border-slate-100 mb-4">
      <h3 className="font-display font-bold text-brand-navy mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> New Blog Post</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input required value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value.replace(/\s+/g, "-").toLowerCase() })} placeholder="url-slug" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm">
          {["USA Education","Germany Education","Medical Careers","USMLE","Residency","Scholarships","Admissions","Career Guidance"].map(c => <option key={c}>{c}</option>)}
        </select>
        <input required value={f.title_en} onChange={(e) => setF({ ...f, title_en: e.target.value })} placeholder="Title (English)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input required value={f.title_mr} onChange={(e) => setF({ ...f, title_mr: e.target.value })} placeholder="शीर्षक (Marathi)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={2} value={f.excerpt_en} onChange={(e) => setF({ ...f, excerpt_en: e.target.value })} placeholder="Excerpt (English)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={2} value={f.excerpt_mr} onChange={(e) => setF({ ...f, excerpt_mr: e.target.value })} placeholder="सारांश (Marathi)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={5} value={f.content_en} onChange={(e) => setF({ ...f, content_en: e.target.value })} placeholder="Content (English)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={5} value={f.content_mr} onChange={(e) => setF({ ...f, content_mr: e.target.value })} placeholder="मजकूर (Marathi)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input value={f.image} onChange={(e) => setF({ ...f, image: e.target.value })} placeholder="Image URL" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input type="number" min={1} max={30} value={f.read_time} onChange={(e) => setF({ ...f, read_time: Number(e.target.value) })} placeholder="Read time (minutes)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
      </div>
      <button disabled={saving} className="mt-4 btn-blue px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50">{saving ? "..." : "Publish Post"}</button>
    </form>
  );
}

/* ============ TESTIMONIAL FORM ============ */
function TestimonialForm({ authApi, onSaved }) {
  const [f, setF] = useState({ name: "", role: "student", program: "", country: "USA", university: "", quote_en: "", quote_mr: "", photo: "", rating: 5 });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authApi({ method: "POST", url: "/admin/testimonials", data: f });
      toast.success("Testimonial added");
      onSaved();
      setF({ name: "", role: "student", program: "", country: "USA", university: "", quote_en: "", quote_mr: "", photo: "", rating: 5 });
    } catch { toast.error("Failed"); }
    finally { setSaving(false); }
  };
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-5 border border-slate-100 mb-4">
      <h3 className="font-display font-bold text-brand-navy mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> New Testimonial</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm">
          <option value="student">Student</option><option value="doctor">Doctor</option><option value="parent">Parent</option>
        </select>
        <input required value={f.program} onChange={(e) => setF({ ...f, program: e.target.value })} placeholder="Program (e.g. MS CS)" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input value={f.university} onChange={(e) => setF({ ...f, university: e.target.value })} placeholder="University" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input required value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} placeholder="Country" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <input value={f.photo} onChange={(e) => setF({ ...f, photo: e.target.value })} placeholder="Photo URL" className="px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={3} value={f.quote_en} onChange={(e) => setF({ ...f, quote_en: e.target.value })} placeholder="Quote (English)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
        <textarea required rows={3} value={f.quote_mr} onChange={(e) => setF({ ...f, quote_mr: e.target.value })} placeholder="अवतरण (Marathi)" className="md:col-span-2 px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm" />
      </div>
      <button disabled={saving} className="mt-4 btn-blue px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50">{saving ? "..." : "Add Testimonial"}</button>
    </form>
  );
}

/* ============ MAIN ============ */
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("astute-admin-token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("leads");
  const [data, setData] = useState({ leads: [], contacts: [], events: [], blog: [], testimonials: [] });
  const [loading, setLoading] = useState(false);

  const authApi = useAuthApi(token);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [leads, contacts, events, blog, testimonials] = await Promise.all([
        authApi({ url: "/admin/leads" }).then((r) => r.data).catch(() => []),
        authApi({ url: "/admin/contacts" }).then((r) => r.data).catch(() => []),
        authApi({ url: "/admin/events" }).then((r) => r.data).catch(() => []),
        authApi({ url: "/admin/blog" }).then((r) => r.data).catch(() => []),
        authApi({ url: "/admin/testimonials" }).then((r) => r.data).catch(() => []),
      ]);
      setData({ leads, contacts, events, blog, testimonials });
    } finally { setLoading(false); }
  }, [token, authApi]);

  useEffect(() => { load(); }, [load]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post("/admin/login", { email, password });
      localStorage.setItem("astute-admin-token", r.data.token);
      setToken(r.data.token);
      toast.success("Logged in");
    } catch { toast.error("Invalid credentials"); }
  };

  const logout = () => { localStorage.removeItem("astute-admin-token"); setToken(""); };

  const remove = async (kind, id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await authApi({ method: "DELETE", url: `/admin/${kind}/${id}` });
      toast.success("Deleted");
      load();
    } catch { toast.error("Failed"); }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
        <form onSubmit={login} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg border border-slate-100" data-testid="admin-login-form">
          <img src={LOGO} alt="Astute Academy" className="h-12 w-auto mb-6" />
          <h1 className="font-display font-extrabold text-2xl text-brand-navy mb-2">Admin</h1>
          <p className="text-sm text-slate-500 mb-6">Manage leads, contacts, events and content.</p>
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none mb-3" data-testid="admin-email" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none mb-4" data-testid="admin-password" />
          <button className="w-full btn-blue py-3 rounded-full font-semibold text-sm" data-testid="admin-login-submit">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Astute" className="h-10 w-auto" />
            <div>
              <h1 className="font-display font-extrabold text-xl lg:text-2xl text-brand-navy">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Publish content and track enquiries.</p>
            </div>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-brand-navy text-sm font-semibold" data-testid="admin-logout"><LogOut className="w-4 h-4" /> Logout</button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {TABS.map((tb) => {
            const count = data[tb.k]?.length ?? 0;
            const Icon = tb.icon;
            return (
              <button key={tb.k} onClick={() => setTab(tb.k)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${tab === tb.k ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-brand-blue"}`} data-testid={`admin-tab-${tb.k}`}>
                <Icon className="w-4 h-4" /> {tb.label} <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {loading ? <p className="text-slate-500">Loading…</p> : (
          <>
            {tab === "events" && <EventForm authApi={authApi} onSaved={load} />}
            {tab === "blog" && <BlogForm authApi={authApi} onSaved={load} />}
            {tab === "testimonials" && <TestimonialForm authApi={authApi} onSaved={load} />}

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {tab === "leads" && (
                <div className="overflow-x-auto"><table className="w-full text-sm" data-testid="admin-leads-table"><thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>{["Name","Phone","Email","Audience","Interest","Destination","Goal","Lang","Created"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>
                  {data.leads.length === 0 ? <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-500">No leads yet.</td></tr> : data.leads.map((l) => (
                    <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-navy">{l.name}</td>
                      <td className="px-4 py-3">{l.phone}</td>
                      <td className="px-4 py-3 text-slate-500">{l.email || "—"}</td>
                      <td className="px-4 py-3">{l.audience || "—"}</td>
                      <td className="px-4 py-3">{l.interest || "—"}</td>
                      <td className="px-4 py-3">{l.destination || "—"}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{l.goal || "—"}</td>
                      <td className="px-4 py-3 uppercase">{l.language}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody></table></div>
              )}
              {tab === "contacts" && (
                <div className="overflow-x-auto"><table className="w-full text-sm" data-testid="admin-contacts-table"><thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>{["Name","Email","Phone","Subject","Message","Created"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>
                  {data.contacts.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No messages yet.</td></tr> : data.contacts.map((c) => (
                    <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-navy">{c.name}</td>
                      <td className="px-4 py-3">{c.email}</td>
                      <td className="px-4 py-3">{c.phone || "—"}</td>
                      <td className="px-4 py-3">{c.subject || "—"}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-md truncate">{c.message}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody></table></div>
              )}
              {tab === "events" && (
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>{["Title","Date","Speaker","Mode","Status","Action"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>
                  {data.events.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No events yet.</td></tr> : data.events.map((e) => (
                    <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-navy max-w-xs truncate">{e.title_en}</td>
                      <td className="px-4 py-3">{e.date}</td>
                      <td className="px-4 py-3">{e.speaker}</td>
                      <td className="px-4 py-3 text-slate-500">{e.mode}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${e.status === "upcoming" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{e.status}</span></td>
                      <td className="px-4 py-3"><button onClick={() => remove("events", e.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody></table></div>
              )}
              {tab === "blog" && (
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>{["Title","Slug","Category","Read","Action"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>
                  {data.blog.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No posts yet.</td></tr> : data.blog.map((p) => (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-navy max-w-md truncate">{p.title_en}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{p.slug}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-blue/10 text-brand-blue">{p.category}</span></td>
                      <td className="px-4 py-3 text-slate-500">{p.read_time}m</td>
                      <td className="px-4 py-3"><button onClick={() => remove("blog", p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody></table></div>
              )}
              {tab === "testimonials" && (
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>{["Name","Role","Program","University","Country","Action"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>
                  {data.testimonials.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No testimonials yet.</td></tr> : data.testimonials.map((t) => (
                    <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-navy">{t.name}</td>
                      <td className="px-4 py-3 capitalize">{t.role}</td>
                      <td className="px-4 py-3">{t.program}</td>
                      <td className="px-4 py-3 text-slate-500">{t.university || "—"}</td>
                      <td className="px-4 py-3">{t.country}</td>
                      <td className="px-4 py-3"><button onClick={() => remove("testimonials", t.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody></table></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
