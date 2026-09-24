from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal, Annotated
import uuid
import jwt
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get('JWT_SECRET', 'astute-academy-secret-key-change-me')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@astuteacademy.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'astute@2026')

app = FastAPI(title="Astute Academy API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Utility ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def new_id() -> str:
    return str(uuid.uuid4())


def make_token(email: str) -> str:
    payload = {"sub": email, "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def verify_admin(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class LeadCreate(BaseModel):
    audience: Optional[str] = None
    interest: Optional[str] = None
    education: Optional[str] = None
    destination: Optional[str] = None
    goal: Optional[str] = None
    name: str
    phone: str
    whatsapp: Optional[str] = None
    email: Optional[str] = None
    language: Optional[str] = "en"
    source: Optional[str] = "website"


class Lead(BaseModel):
    id: str = Field(default_factory=new_id)
    audience: Optional[str] = None
    interest: Optional[str] = None
    education: Optional[str] = None
    destination: Optional[str] = None
    goal: Optional[str] = None
    name: str
    phone: str
    whatsapp: Optional[str] = None
    email: Optional[str] = None
    language: str = "en"
    source: str = "website"
    status: str = "new"
    created_at: str = Field(default_factory=now_iso)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=new_id)
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    language: str = "en"
    created_at: str = Field(default_factory=now_iso)


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    language: Optional[str] = "en"


class EventItem(BaseModel):
    id: str = Field(default_factory=new_id)
    title_en: str
    title_mr: str
    description_en: str
    description_mr: str
    date: str  # ISO date
    time: str
    speaker: str
    mode: str  # online/offline
    image: Optional[str] = None
    category: str = "webinar"
    register_url: Optional[str] = None
    status: str = "upcoming"  # upcoming | past
    created_at: str = Field(default_factory=now_iso)


class BlogPost(BaseModel):
    id: str = Field(default_factory=new_id)
    slug: str
    title_en: str
    title_mr: str
    excerpt_en: str
    excerpt_mr: str
    content_en: str
    content_mr: str
    category: str
    author: str = "Astute Academy"
    image: Optional[str] = None
    read_time: int = 5
    published: bool = True
    created_at: str = Field(default_factory=now_iso)


class Testimonial(BaseModel):
    id: str = Field(default_factory=new_id)
    name: str
    role: str  # student | doctor | parent
    program: str
    country: str
    university: Optional[str] = None
    quote_en: str
    quote_mr: str
    photo: Optional[str] = None
    rating: int = 5
    created_at: str = Field(default_factory=now_iso)


class Faq(BaseModel):
    id: str = Field(default_factory=new_id)
    category: str
    question_en: str
    question_mr: str
    answer_en: str
    answer_mr: str
    order: int = 0


class LoginBody(BaseModel):
    email: str
    password: str


# ---------- Public Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Astute Academy API", "status": "ok"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info(f"New lead: {lead.name} ({lead.phone})")
    return lead


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contacts.insert_one(msg.model_dump())
    return msg


@api_router.get("/events", response_model=List[EventItem])
async def list_events(status: Optional[str] = None):
    q = {"status": status} if status else {}
    items = await db.events.find(q, {"_id": 0}).sort("date", -1).to_list(200)
    return items


@api_router.get("/blog", response_model=List[BlogPost])
async def list_blog(category: Optional[str] = None):
    q = {"published": True}
    if category:
        q["category"] = category
    items = await db.blog.find(q, {"_id": 0}).sort("created_at", -1).to_list(200)
    return items


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    doc = await db.blog.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return doc


@api_router.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials(role: Optional[str] = None):
    q = {"role": role} if role else {}
    items = await db.testimonials.find(q, {"_id": 0}).to_list(200)
    return items


@api_router.get("/faqs", response_model=List[Faq])
async def list_faqs(category: Optional[str] = None):
    q = {"category": category} if category else {}
    items = await db.faqs.find(q, {"_id": 0}).sort("order", 1).to_list(500)
    return items


# ---------- Admin Routes ----------
@api_router.post("/admin/login")
async def admin_login(body: LoginBody):
    if body.email == ADMIN_EMAIL and body.password == ADMIN_PASSWORD:
        return {"token": make_token(body.email), "email": body.email}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@api_router.get("/admin/leads", response_model=List[Lead])
async def admin_list_leads(_: str = Depends(verify_admin)):
    items = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.get("/admin/contacts", response_model=List[ContactMessage])
async def admin_list_contacts(_: str = Depends(verify_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.post("/admin/events", response_model=EventItem)
async def admin_create_event(payload: EventItem, _: str = Depends(verify_admin)):
    await db.events.insert_one(payload.model_dump())
    return payload


@api_router.delete("/admin/events/{event_id}")
async def admin_delete_event(event_id: str, _: str = Depends(verify_admin)):
    await db.events.delete_one({"id": event_id})
    return {"ok": True}


@api_router.post("/admin/blog", response_model=BlogPost)
async def admin_create_blog(payload: BlogPost, _: str = Depends(verify_admin)):
    await db.blog.insert_one(payload.model_dump())
    return payload


@api_router.delete("/admin/blog/{post_id}")
async def admin_delete_blog(post_id: str, _: str = Depends(verify_admin)):
    await db.blog.delete_one({"id": post_id})
    return {"ok": True}


@api_router.post("/admin/testimonials", response_model=Testimonial)
async def admin_create_testimonial(payload: Testimonial, _: str = Depends(verify_admin)):
    await db.testimonials.insert_one(payload.model_dump())
    return payload


# ---------- Seed ----------
@api_router.post("/seed")
async def seed_data():
    """Idempotent seed. Only inserts if collection is empty."""
    inserted = {"testimonials": 0, "events": 0, "blog": 0, "faqs": 0}

    if await db.testimonials.count_documents({}) == 0:
        testimonials = [
            Testimonial(name="Priya Sharma", role="student", program="MS Computer Science",
                        country="USA", university="Carnegie Mellon",
                        quote_en="Astute helped me navigate the entire US application process with clarity. Their mentorship on SOPs and university selection was invaluable.",
                        quote_mr="अ‍ॅस्ट्यूटने माझी संपूर्ण अमेरिका अर्ज प्रक्रिया अत्यंत स्पष्टपणे समजावली. SOP आणि विद्यापीठ निवडीसाठी त्यांचे मार्गदर्शन खूप उपयुक्त होते.",
                        photo="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"),
            Testimonial(name="Dr. Rohan Kulkarni", role="doctor", program="USMLE + Residency",
                        country="USA", university="Johns Hopkins",
                        quote_en="From Step 1 preparation to matching in Internal Medicine, Astute's structured mentoring made every stage manageable and strategic.",
                        quote_mr="Step 1 च्या तयारीपासून ते Internal Medicine मध्ये मॅच होण्यापर्यंत, अ‍ॅस्ट्यूटच्या टप्प्याटप्प्याने केलेल्या मार्गदर्शनामुळे प्रत्येक टप्पा नियोजनबद्ध वाटला.",
                        photo="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80"),
            Testimonial(name="Anjali Patil", role="parent", program="Bachelor's in Germany",
                        country="Germany", university="TU Munich",
                        quote_en="As parents, we were worried about sending our daughter to Germany. Astute's counsellors walked us through every step — from visa to accommodation.",
                        quote_mr="पालक म्हणून जर्मनीला मुलगी पाठवताना आम्ही खूप काळजीत होतो. अ‍ॅस्ट्यूटच्या समुपदेशकांनी व्हिसापासून राहण्याच्या व्यवस्थेपर्यंत प्रत्येक पायरी समजावून सांगितली.",
                        photo="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80"),
            Testimonial(name="Aditya Deshmukh", role="student", program="MS Mechanical",
                        country="Germany", university="RWTH Aachen",
                        quote_en="The Germany pathway is complex — Studienkolleg, blocked accounts, APS. Astute simplified it and I secured admission at RWTH Aachen.",
                        quote_mr="जर्मनीचा मार्ग जटिल आहे — Studienkolleg, blocked account, APS. अ‍ॅस्ट्यूटने तो सोपा केला आणि मला RWTH Aachen मध्ये प्रवेश मिळाला.",
                        photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"),
            Testimonial(name="Dr. Sneha Joshi", role="doctor", program="Fellowship Research",
                        country="USA", university="Cleveland Clinic",
                        quote_en="Astute's research mentorship helped me publish two papers before applying. That made all the difference in my fellowship application.",
                        quote_mr="अ‍ॅस्ट्यूटच्या संशोधन मार्गदर्शनामुळे अर्ज करण्यापूर्वी मी दोन शोधनिबंध प्रकाशित करू शकले. त्यामुळेच माझ्या फेलोशिप अर्जामध्ये मोठा फरक पडला.",
                        photo="https://images.unsplash.com/photo-1594824388853-2c5899d0e7f3?w=200&q=80"),
        ]
        await db.testimonials.insert_many([t.model_dump() for t in testimonials])
        inserted["testimonials"] = len(testimonials)

    if await db.events.count_documents({}) == 0:
        events = [
            EventItem(title_en="Study in USA — Fall 2026 Roadmap",
                      title_mr="अमेरिकेत शिक्षण — Fall 2026 चा रोडमॅप",
                      description_en="A structured webinar covering university selection, SOPs, funding, and application timelines for Fall 2026 intake.",
                      description_mr="Fall 2026 प्रवेशासाठी विद्यापीठ निवड, SOP, आर्थिक नियोजन आणि अर्जाची कालमर्यादा यावर सविस्तर वेबिनार.",
                      date="2026-03-15", time="6:00 PM IST", speaker="Dr. Tushar Deoras",
                      mode="Online Webinar", category="webinar", status="upcoming",
                      image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"),
            EventItem(title_en="USMLE Step 1 Strategy Masterclass",
                      title_mr="USMLE Step 1 धोरण मास्टरक्लास",
                      description_en="Deep-dive session on Step 1 preparation, resources, timeline and scoring strategy for Indian medical graduates.",
                      description_mr="भारतीय वैद्यकीय पदवीधरांसाठी Step 1 तयारी, संसाधने, वेळापत्रक आणि स्कोअरिंग धोरणावर सखोल सत्र.",
                      date="2026-03-22", time="7:00 PM IST", speaker="Dr. Priya Menon",
                      mode="Online Webinar", category="webinar", status="upcoming",
                      image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"),
            EventItem(title_en="Germany Engineering — Bachelor's & Master's Guide",
                      title_mr="जर्मनी अभियांत्रिकी — Bachelor's आणि Master's मार्गदर्शक",
                      description_en="Learn about English-medium engineering programs in Germany, Studienkolleg, APS, and post-study work options.",
                      description_mr="जर्मनीतील इंग्रजी-माध्यम अभियांत्रिकी अभ्यासक्रम, Studienkolleg, APS आणि अभ्यासोत्तर काम याविषयी जाणून घ्या.",
                      date="2026-04-05", time="6:30 PM IST", speaker="Astute Germany Team",
                      mode="Online Webinar", category="webinar", status="upcoming",
                      image="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80"),
            EventItem(title_en="Career Counselling Bootcamp — Class 12 Students",
                      title_mr="करिअर समुपदेशन बूटकॅम्प — इयत्ता १२ वी विद्यार्थ्यांसाठी",
                      description_en="Two-day intensive counselling for Class 12 students to identify strengths, interests and career pathways.",
                      description_mr="बारावीच्या विद्यार्थ्यांसाठी दोन दिवसीय सखोल समुपदेशन — बलस्थाने, आवडी आणि करिअर मार्ग ओळखण्यासाठी.",
                      date="2026-02-10", time="10:00 AM IST", speaker="Astute Counselling Team",
                      mode="Offline — Astute Center", category="event", status="past",
                      image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"),
        ]
        await db.events.insert_many([e.model_dump() for e in events])
        inserted["events"] = len(events)

    if await db.blog.count_documents({}) == 0:
        posts = [
            BlogPost(slug="usa-fall-2026-timeline",
                     title_en="USA Fall 2026 Application Timeline — Complete Guide",
                     title_mr="अमेरिका Fall 2026 अर्ज कालमर्यादा — संपूर्ण मार्गदर्शक",
                     excerpt_en="A month-by-month breakdown of what Indian students should do to secure admission for Fall 2026 in the USA.",
                     excerpt_mr="Fall 2026 साठी अमेरिकेत प्रवेश मिळवण्यासाठी भारतीय विद्यार्थ्यांनी महिन्यानुसार काय करावे याचा तपशील.",
                     content_en="Applying to US universities requires 12–14 months of structured preparation. In this guide we cover GRE / GMAT timing, university shortlisting, SOP drafting, LOR strategy, financial documentation and visa preparation. Start early and follow a disciplined timeline.",
                     content_mr="अमेरिकेतील विद्यापीठांना अर्ज करण्यासाठी १२-१४ महिन्यांची शिस्तबद्ध तयारी लागते. या मार्गदर्शकात GRE/GMAT वेळ, विद्यापीठ शॉर्टलिस्ट, SOP लेखन, LOR धोरण, आर्थिक कागदपत्रे आणि व्हिसा तयारीचा समावेश आहे. लवकर सुरुवात करा आणि शिस्तबद्ध वेळापत्रकाचे पालन करा.",
                     category="USA Education", read_time=7,
                     image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"),
            BlogPost(slug="usmle-step-1-preparation",
                     title_en="USMLE Step 1: A Strategic Preparation Framework",
                     title_mr="USMLE Step 1: धोरणात्मक तयारीची चौकट",
                     excerpt_en="How to structure your Step 1 preparation while balancing MBBS coursework or internship duties.",
                     excerpt_mr="MBBS अभ्यास किंवा इंटर्नशिपसह Step 1 ची तयारी कशी करावी.",
                     content_en="Step 1 has transitioned to pass/fail, but strong performance still shapes downstream residency competitiveness. Recommended timeline: 12–18 months of layered preparation using First Aid, UWorld, Pathoma and Sketchy. Focus on active recall and spaced repetition.",
                     content_mr="Step 1 आता pass/fail झाले असले तरी चांगली तयारी residency साठी निर्णायक ठरते. शिफारस: १२-१८ महिन्यांची स्तरीय तयारी — First Aid, UWorld, Pathoma आणि Sketchy वापरून. Active recall आणि spaced repetition वर लक्ष द्या.",
                     category="USMLE", read_time=9,
                     image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80"),
            BlogPost(slug="germany-english-programs",
                     title_en="Germany's English-Taught Master's Programs — What Indians Should Know",
                     title_mr="जर्मनीचे इंग्रजी-माध्यम Master's कार्यक्रम — भारतीयांनी काय जाणून घ्यावे",
                     excerpt_en="English-medium programs in Germany open doors to low-tuition, high-quality education. Here's a practical overview.",
                     excerpt_mr="जर्मनीतील इंग्रजी-माध्यम कार्यक्रमांमुळे कमी शुल्कात दर्जेदार शिक्षण मिळू शकते. एक व्यावहारिक आढावा.",
                     content_en="Public universities like TU Munich, RWTH Aachen and Heidelberg offer English Master's programs with minimal or zero tuition. Focus on APS certificate, blocked account (~€11,208 for 2026), health insurance and student visa steps.",
                     content_mr="TU Munich, RWTH Aachen आणि Heidelberg सारखी सार्वजनिक विद्यापीठे इंग्रजी Master's कार्यक्रम अत्यल्प किंवा शून्य शुल्कात देतात. APS प्रमाणपत्र, blocked account (~€11,208), आरोग्य विमा आणि विद्यार्थी व्हिसा या पायऱ्यांवर लक्ष द्या.",
                     category="Germany Education", read_time=6,
                     image="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80"),
            BlogPost(slug="career-counselling-class-12",
                     title_en="Career Counselling After Class 12 — A Framework Beyond 'What Course?'",
                     title_mr="इयत्ता १२ वी नंतर करिअर समुपदेशन — 'कोणता कोर्स?' पलीकडची चौकट",
                     excerpt_en="Modern career counselling looks at aptitude, interest, personality, market realities and long-term goals — not just course selection.",
                     excerpt_mr="आधुनिक करिअर समुपदेशन केवळ कोर्स निवडीपुरते मर्यादित नाही — अभिरुची, कल, व्यक्तिमत्त्व, बाजार वास्तव आणि दीर्घकालीन ध्येयांचा विचार करते.",
                     content_en="A robust framework combines psychometric assessments, career interviews, market intelligence and family alignment. Ask: What am I naturally good at? What does the world need? Where can I be paid? What matters to me?",
                     content_mr="ठोस चौकट म्हणजे psychometric चाचण्या, करिअर मुलाखत, बाजार माहिती आणि कुटुंब सहभाग यांचा समन्वय. स्वतःला विचारा: मी कशात नैसर्गिकरित्या चांगला आहे? जगाला काय हवे आहे? मला काय मिळू शकेल? माझ्यासाठी काय महत्त्वाचे आहे?",
                     category="Career Guidance", read_time=8,
                     image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"),
        ]
        await db.blog.insert_many([p.model_dump() for p in posts])
        inserted["blog"] = len(posts)

    if await db.faqs.count_documents({}) == 0:
        faqs = [
            Faq(category="USA", order=1,
                question_en="What is the ideal timeline to apply to US universities?",
                question_mr="अमेरिकेतील विद्यापीठांना अर्ज करण्यासाठी योग्य कालमर्यादा कोणती?",
                answer_en="Ideally start 12–14 months before your intended intake. This gives time for GRE/GMAT, university research, SOP drafting, LOR collection and financial documentation.",
                answer_mr="आदर्शतः तुमच्या इच्छित प्रवेशाच्या १२-१४ महिने आधी सुरुवात करावी. यामुळे GRE/GMAT, विद्यापीठ संशोधन, SOP लेखन, LOR संकलन आणि आर्थिक कागदपत्रांसाठी वेळ मिळतो."),
            Faq(category="USA", order=2,
                question_en="Do I need GRE for all US universities?",
                question_mr="सर्व अमेरिकन विद्यापीठांसाठी GRE आवश्यक आहे का?",
                answer_en="Many universities have made GRE optional, but a strong GRE score still strengthens funding opportunities and competitive programs. Requirements vary by university and program.",
                answer_mr="अनेक विद्यापीठांनी GRE ऐच्छिक केले आहे, परंतु उच्च GRE स्कोअर आर्थिक सहाय्य आणि स्पर्धात्मक कार्यक्रमांसाठी अजूनही उपयोगी ठरतो. विद्यापीठ आणि कार्यक्रमानुसार अटी बदलतात."),
            Faq(category="Germany", order=1,
                question_en="Is Germany really tuition-free?",
                question_mr="जर्मनी खरोखरच शुल्कमुक्त आहे का?",
                answer_en="Most public universities charge no tuition for Bachelor's and many Master's programs. Students pay a nominal semester fee (~€150–350) that includes public transport.",
                answer_mr="बहुतांश सार्वजनिक विद्यापीठांमध्ये Bachelor's आणि अनेक Master's कार्यक्रमांसाठी शुल्क आकारले जात नाही. विद्यार्थी नाममात्र सत्र शुल्क (~€१५०-३५०) भरतात ज्यात सार्वजनिक वाहतुकीचा समावेश असतो."),
            Faq(category="Germany", order=2,
                question_en="What is APS certificate?",
                question_mr="APS प्रमाणपत्र म्हणजे काय?",
                answer_en="APS is a mandatory academic evaluation for Indian students applying to German universities. It verifies your academic credentials and is required for the student visa.",
                answer_mr="जर्मन विद्यापीठांना अर्ज करणाऱ्या भारतीय विद्यार्थ्यांसाठी APS ही अनिवार्य शैक्षणिक पडताळणी आहे. ती तुमची शैक्षणिक कागदपत्रे पडताळते आणि विद्यार्थी व्हिसासाठी आवश्यक असते."),
            Faq(category="Medical", order=1,
                question_en="Can I start USMLE preparation during MBBS?",
                question_mr="MBBS दरम्यान USMLE ची तयारी सुरू करू शकतो का?",
                answer_en="Yes, and it's recommended. Many successful matches begin foundational preparation in 2nd or 3rd year MBBS, integrating Step 1 topics with academic coursework.",
                answer_mr="होय, आणि हे शिफारसीय आहे. अनेक यशस्वी मॅचेस MBBS च्या दुसऱ्या किंवा तिसऱ्या वर्षापासून पायाभूत तयारी सुरू करतात आणि Step 1 विषय अभ्यासक्रमासोबत जोडतात."),
            Faq(category="Medical", order=2,
                question_en="What is US Clinical Experience (USCE) and why is it important?",
                question_mr="US Clinical Experience (USCE) म्हणजे काय आणि ती महत्त्वाची का आहे?",
                answer_en="USCE refers to clinical rotations, observerships or externships in US hospitals. It strengthens residency applications by demonstrating familiarity with the US healthcare system.",
                answer_mr="USCE म्हणजे अमेरिकन रुग्णालयांतील clinical rotations, observership किंवा externship. हे residency अर्जांना बळकटी देते कारण ते अमेरिकन आरोग्य प्रणालीशी परिचय दर्शवते."),
            Faq(category="Counselling", order=1,
                question_en="Is the initial counselling really free?",
                question_mr="प्रारंभिक समुपदेशन खरोखरच मोफत आहे का?",
                answer_en="Yes. The first counselling session is complimentary and helps us understand your goals so we can outline suitable pathways. There is no obligation to proceed.",
                answer_mr="होय. पहिले समुपदेशन सत्र मोफत आहे आणि तुमची ध्येये समजून योग्य मार्ग सुचवण्यासाठी आम्हाला मदत करते. पुढे जाण्याचे कोणतेही बंधन नाही."),
            Faq(category="Counselling", order=2,
                question_en="Do you counsel parents separately?",
                question_mr="तुम्ही पालकांचे स्वतंत्र समुपदेशन करता का?",
                answer_en="Yes. Family alignment is critical to a successful international education journey. We offer dedicated parent sessions to address concerns and financial planning.",
                answer_mr="होय. यशस्वी आंतरराष्ट्रीय शिक्षणासाठी कुटुंब सहभाग महत्त्वाचा असतो. आम्ही पालकांच्या शंकांसाठी आणि आर्थिक नियोजनासाठी विशेष सत्रे देतो."),
        ]
        await db.faqs.insert_many([f.model_dump() for f in faqs])
        inserted["faqs"] = len(faqs)

    return {"seeded": inserted}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
