"""Iteration 2 backend tests: AI Pathway + Admin CMS (events/blog/testimonials)."""
import os
import re
import pytest
import requests

from pathlib import Path
try:
    for line in (Path(__file__).resolve().parents[2] / 'frontend' / '.env').read_text().splitlines():
        if line.startswith('REACT_APP_BACKEND_URL='):
            os.environ.setdefault('REACT_APP_BACKEND_URL', line.split('=', 1)[1].strip())
except Exception:
    pass
BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@astuteacademy.com"
ADMIN_PASSWORD = "astute@2026"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


@pytest.fixture(scope="module")
def token(s):
    r = s.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- AI Pathway ----------
def test_ai_pathway_en(s):
    payload = {
        "qualification": "MBBS",
        "background": "Indian medical graduate, 2024 pass-out",
        "interested_course": "USMLE + Internal Medicine Residency",
        "preferred_country": "USA",
        "budget": "50-70 lakh INR",
        "goal": "Residency in USA",
        "language": "en",
    }
    r = s.post(f"{API}/ai/pathway", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    d = r.json()
    assert "response" in d and "disclaimer" in d
    assert isinstance(d["response"], str) and len(d["response"]) > 50
    assert isinstance(d["disclaimer"], str) and len(d["disclaimer"]) > 10
    # No admission/visa guarantees
    low = d["response"].lower()
    assert "guarantee" not in low or "no guarantee" in low or "not guarantee" in low


def test_ai_pathway_mr(s):
    payload = {
        "qualification": "12th Science",
        "background": "PCM, 85%",
        "interested_course": "Bachelor's in Engineering",
        "preferred_country": "Germany",
        "budget": "20 lakh INR",
        "goal": "Study in Germany",
        "language": "mr",
    }
    r = s.post(f"{API}/ai/pathway", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    d = r.json()
    assert "response" in d
    # Should contain Devanagari characters
    assert re.search(r"[\u0900-\u097F]", d["response"]), "No Devanagari script in Marathi response"


# ---------- Admin list endpoints ----------
def test_admin_events_unauth(s):
    r = s.get(f"{API}/admin/events")
    assert r.status_code == 401


def test_admin_events_ok(s, auth):
    r = s.get(f"{API}/admin/events", headers=auth)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_admin_blog_unauth(s):
    r = s.get(f"{API}/admin/blog")
    assert r.status_code == 401


def test_admin_blog_ok(s, auth):
    r = s.get(f"{API}/admin/blog", headers=auth)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_admin_testimonials_unauth(s):
    r = s.get(f"{API}/admin/testimonials")
    assert r.status_code == 401


def test_admin_testimonials_ok(s, auth):
    r = s.get(f"{API}/admin/testimonials", headers=auth)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Events CRUD ----------
def test_events_create_and_delete(s, auth):
    payload = {
        "title_en": "TEST_Event EN",
        "title_mr": "TEST_Event MR",
        "description_en": "Testing event description in English",
        "description_mr": "चाचणी वर्णन",
        "date": "2026-06-15",
        "time": "7:00 PM IST",
        "speaker": "TEST Speaker",
        "mode": "Online Webinar",
        "category": "webinar",
        "status": "upcoming",
    }
    r = s.post(f"{API}/admin/events", json=payload, headers=auth)
    assert r.status_code == 200, r.text
    created = r.json()
    eid = created["id"]
    assert created["title_en"] == "TEST_Event EN"

    # Verify visible in public listing
    r2 = s.get(f"{API}/events")
    assert r2.status_code == 200
    assert any(e["id"] == eid for e in r2.json())

    # Delete
    r3 = s.delete(f"{API}/admin/events/{eid}", headers=auth)
    assert r3.status_code == 200
    assert r3.json().get("ok") is True

    # Verify removed
    r4 = s.get(f"{API}/events")
    assert not any(e["id"] == eid for e in r4.json())


# ---------- Blog CRUD ----------
def test_blog_create_and_delete(s, auth):
    payload = {
        "slug": "test-iter2-post",
        "title_en": "TEST_Post EN",
        "title_mr": "TEST_Post MR",
        "excerpt_en": "excerpt en",
        "excerpt_mr": "excerpt mr",
        "content_en": "content en body",
        "content_mr": "content mr body",
        "category": "TEST",
    }
    r = s.post(f"{API}/admin/blog", json=payload, headers=auth)
    assert r.status_code == 200, r.text
    created = r.json()
    pid = created["id"]
    assert created["slug"] == "test-iter2-post"

    # Public reflects
    r2 = s.get(f"{API}/blog")
    assert any(p["id"] == pid for p in r2.json())

    # Fetch by slug
    r_slug = s.get(f"{API}/blog/test-iter2-post")
    assert r_slug.status_code == 200

    # Delete
    r3 = s.delete(f"{API}/admin/blog/{pid}", headers=auth)
    assert r3.status_code == 200
    assert r3.json().get("ok") is True

    r4 = s.get(f"{API}/blog/test-iter2-post")
    assert r4.status_code == 404


# ---------- Testimonials CRUD ----------
def test_testimonial_create_and_delete(s, auth):
    payload = {
        "name": "TEST_Testimonial",
        "role": "student",
        "program": "MS CS",
        "country": "USA",
        "quote_en": "Great support",
        "quote_mr": "उत्तम मार्गदर्शन",
    }
    r = s.post(f"{API}/admin/testimonials", json=payload, headers=auth)
    assert r.status_code == 200, r.text
    created = r.json()
    tid = created["id"]

    r2 = s.get(f"{API}/testimonials")
    assert any(t["id"] == tid for t in r2.json())

    r3 = s.delete(f"{API}/admin/testimonials/{tid}", headers=auth)
    assert r3.status_code == 200
    assert r3.json().get("ok") is True

    r4 = s.get(f"{API}/testimonials")
    assert not any(t["id"] == tid for t in r4.json())
