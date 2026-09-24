import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang, langPath } from "../i18n";
import { publicApi } from "../lib/api";
import { ArrowLeft } from "lucide-react";

export function BlogList() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  useEffect(() => { publicApi.listBlog().then(setItems).catch(() => setItems([])); }, []);
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">Knowledge Hub</div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-brand-navy tracking-tight">{t.blog.title}</h1>
          <p className="mt-4 text-slate-600 text-lg">{t.blog.subtitle}</p>
        </div>
        {items.length === 0 ? (
          <p className="text-slate-500">{t.blog.empty}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="blog-grid">
            {items.map((p) => (
              <Link key={p.id} to={langPath(lang, `/blog/${p.slug}`)} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover" data-testid={`blog-list-card-${p.slug}`}>
                {p.image && <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-brand-orange">{p.category}</span>
                    <span>·</span>
                    <span>{p.read_time} {t.blog.minRead}</span>
                  </div>
                  <h3 className="font-display font-bold text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-blue">{lang === "mr" ? p.title_mr : p.title_en}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{lang === "mr" ? p.excerpt_mr : p.excerpt_en}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const [post, setPost] = useState(null);
  useEffect(() => { publicApi.getBlog(slug).then(setPost).catch(() => setPost(null)); }, [slug]);
  if (!post) return <div className="pt-32 max-w-4xl mx-auto px-6 text-slate-500">Loading…</div>;
  return (
    <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={langPath(lang, "/blog")} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-blue mb-6"><ArrowLeft className="w-4 h-4" /> {t.blog.viewAll}</Link>
        <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">{post.category} · {post.read_time} {t.blog.minRead}</div>
        <h1 className="font-display font-extrabold text-3xl lg:text-5xl text-brand-navy leading-tight tracking-tight text-balance">{lang === "mr" ? post.title_mr : post.title_en}</h1>
        {post.image && <img src={post.image} alt="" className="mt-8 rounded-3xl w-full aspect-video object-cover shadow-lg" />}
        <div className="mt-10 prose prose-slate max-w-none text-slate-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">
          {lang === "mr" ? post.content_mr : post.content_en}
        </div>
      </div>
    </article>
  );
}
