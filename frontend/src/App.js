import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { LanguageProvider } from "./i18n";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Overlays from "./components/Overlays";
import LeadFormModal from "./components/LeadFormModal";
import { publicApi } from "./lib/api";

import Home from "./pages/Home";
import { USAPage, GermanyPage, MedicalPage, CounsellingPage } from "./pages/Destinations";
import About from "./pages/About";
import { BlogList, BlogDetail } from "./pages/Blog";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ProgramDetail, { ProgramsIndex } from "./pages/Programs";
import PathwayAssistant from "./components/PathwayAssistant";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const TITLES = {
  "/": "Astute Academy — Global Education & Career Counselling",
  "/usa": "Study in USA — Astute Academy",
  "/germany": "Study in Germany — Astute Academy",
  "/medical-careers": "Medical Careers — USMLE, Residency & Research — Astute Academy",
  "/career-counselling": "Career Counselling — Astute Academy",
  "/about": "About — Astute Academy",
  "/blog": "Knowledge Hub — Astute Academy",
  "/events": "Webinars & Events — Astute Academy",
  "/contact": "Contact — Astute Academy",
  "/admin": "Admin — Astute Academy",
};

function TitleUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    const cleaned = pathname.replace(/^\/mr/, "") || "/";
    const key = Object.keys(TITLES).find((k) => cleaned === k || cleaned.startsWith(k + "/")) || "/";
    document.title = TITLES[key];
  }, [pathname]);
  return null;
}

function Shell() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [pathwayOpen, setPathwayOpen] = useState(false);
  const openLead = () => setLeadOpen(true);
  const openPathway = () => setPathwayOpen(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => { publicApi.seed().catch(() => {}); }, []);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  }

  return (
    <>
      <Header onOpenLead={openLead} onOpenPathway={openPathway} />
      <main>
        <Routes>
          {["/", "/mr"].map((p) => <Route key={p} path={p} element={<Home onOpenLead={openLead} onOpenPathway={openPathway} />} />)}
          {["/usa", "/mr/usa"].map((p) => <Route key={p} path={p} element={<USAPage onOpenLead={openLead} />} />)}
          {["/germany", "/mr/germany"].map((p) => <Route key={p} path={p} element={<GermanyPage onOpenLead={openLead} />} />)}
          {["/medical-careers", "/mr/medical-careers"].map((p) => <Route key={p} path={p} element={<MedicalPage onOpenLead={openLead} />} />)}
          {["/career-counselling", "/mr/career-counselling"].map((p) => <Route key={p} path={p} element={<CounsellingPage onOpenLead={openLead} />} />)}
          {["/programs", "/mr/programs"].map((p) => <Route key={p} path={p} element={<ProgramsIndex onOpenLead={openLead} />} />)}
          {["/programs/:slug", "/mr/programs/:slug"].map((p) => <Route key={p} path={p} element={<ProgramDetail onOpenLead={openLead} />} />)}
          {["/about", "/mr/about"].map((p) => <Route key={p} path={p} element={<About />} />)}
          {["/blog", "/mr/blog"].map((p) => <Route key={p} path={p} element={<BlogList />} />)}
          {["/blog/:slug", "/mr/blog/:slug"].map((p) => <Route key={p} path={p} element={<BlogDetail />} />)}
          {["/events", "/mr/events"].map((p) => <Route key={p} path={p} element={<Events />} />)}
          {["/contact", "/mr/contact"].map((p) => <Route key={p} path={p} element={<Contact onOpenLead={openLead} />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Overlays onOpenLead={openLead} onOpenPathway={openPathway} />
      <LeadFormModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      <PathwayAssistant open={pathwayOpen} onClose={() => setPathwayOpen(false)} onOpenLead={openLead} />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTop />
          <TitleUpdater />
          <Shell />
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
