import { useState, useEffect } from "react";
import { adminApi } from "../lib/api";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("astute-admin-token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([adminApi.listLeads(token).catch(() => []), adminApi.listContacts(token).catch(() => [])])
      .then(([l, c]) => { setLeads(l); setContacts(c); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.login(email, password);
      localStorage.setItem("astute-admin-token", res.token);
      setToken(res.token);
      toast.success("Logged in");
    } catch { toast.error("Invalid credentials"); }
  };

  const logout = () => { localStorage.removeItem("astute-admin-token"); setToken(""); };

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
        <form onSubmit={login} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg border border-slate-100" data-testid="admin-login-form">
          <h1 className="font-display font-extrabold text-2xl text-brand-navy mb-2">Astute Admin</h1>
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
          <div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-brand-navy">Astute Admin</h1>
            <p className="text-sm text-slate-500">Manage leads and messages.</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-brand-navy text-sm font-semibold" data-testid="admin-logout"><LogOut className="w-4 h-4" /> Logout</button>
        </div>

        <div className="flex gap-2 mb-6">
          {["leads", "contacts"].map((tb) => (
            <button key={tb} onClick={() => setTab(tb)} className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${tab === tb ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-700"}`} data-testid={`admin-tab-${tb}`}>
              {tb} ({tb === "leads" ? leads.length : contacts.length})
            </button>
          ))}
        </div>

        {loading ? <p className="text-slate-500">Loading…</p> : (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {tab === "leads" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="admin-leads-table">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                    <tr>{["Name","Phone","Email","Audience","Interest","Destination","Goal","Lang","Created"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-500">No leads yet.</td></tr> : leads.map((l) => (
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
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="admin-contacts-table">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                    <tr>{["Name","Email","Phone","Subject","Message","Created"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No messages yet.</td></tr> : contacts.map((c) => (
                      <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-brand-navy">{c.name}</td>
                        <td className="px-4 py-3">{c.email}</td>
                        <td className="px-4 py-3">{c.phone || "—"}</td>
                        <td className="px-4 py-3">{c.subject || "—"}</td>
                        <td className="px-4 py-3 text-slate-500 max-w-md truncate">{c.message}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
