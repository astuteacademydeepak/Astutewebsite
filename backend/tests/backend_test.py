"""Backend API tests for Astute Academy."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://astute-rebuild.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@astuteacademy.com"
ADMIN_PASSWORD = "astute@2026"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def token(s):
    r = s.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["token"]


# ---------- Health ----------
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# ---------- Events ----------
def test_events_all(s):
    r = s.get(f"{API}/events")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 4


def test_events_upcoming(s):
    r = s.get(f"{API}/events", params={"status": "upcoming"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 3
    for e in data:
        assert e["status"] == "upcoming"


# ---------- Blog ----------
def test_blog_list(s):
    r = s.get(f"{API}/blog")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 4
    for p in data:
        for k in ("title_en", "title_mr", "content_en", "content_mr", "slug", "category"):
            assert k in p and p[k]


def test_blog_slug(s):
    r = s.get(f"{API}/blog/usa-fall-2026-timeline")
    assert r.status_code == 200
    assert r.json()["slug"] == "usa-fall-2026-timeline"


def test_blog_slug_404(s):
    r = s.get(f"{API}/blog/does-not-exist-xyz")
    assert r.status_code == 404


# ---------- Testimonials ----------
def test_testimonials_all(s):
    r = s.get(f"{API}/testimonials")
    assert r.status_code == 200
    assert len(r.json()) == 5


def test_testimonials_doctor(s):
    r = s.get(f"{API}/testimonials", params={"role": "doctor"})
    assert r.status_code == 200
    data = r.json()
    assert all(t["role"] == "doctor" for t in data)
    assert len(data) == 2


# ---------- FAQs ----------
def test_faqs_all(s):
    r = s.get(f"{API}/faqs")
    assert r.status_code == 200
    assert len(r.json()) == 8


def test_faqs_usa(s):
    r = s.get(f"{API}/faqs", params={"category": "USA"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 2
    assert all(f["category"] == "USA" for f in data)


# ---------- Leads ----------
def test_create_lead(s):
    payload = {
        "audience": "student",
        "interest": "MS",
        "destination": "USA",
        "name": "TEST_LeadUser",
        "phone": "+919999999991",
        "goal": "Fall 2026",
    }
    r = s.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["id"] and d["created_at"]
    assert d["name"] == "TEST_LeadUser"
    assert d["audience"] == "student"
    assert d["destination"] == "USA"


def test_lead_missing_required(s):
    r = s.post(f"{API}/leads", json={"audience": "student"})
    assert r.status_code == 422


# ---------- Contact ----------
def test_create_contact(s):
    r = s.post(f"{API}/contact", json={
        "name": "TEST_Contact",
        "email": "test_contact@example.com",
        "message": "Hello from tests",
    })
    assert r.status_code == 200
    d = r.json()
    assert d["id"] and d["name"] == "TEST_Contact"


def test_contact_missing(s):
    r = s.post(f"{API}/contact", json={"name": "x"})
    assert r.status_code == 422


# ---------- Admin ----------
def test_admin_login_wrong(s):
    r = s.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
    assert r.status_code == 401


def test_admin_login_ok(token):
    assert token and isinstance(token, str)


def test_admin_leads_unauth(s):
    r = s.get(f"{API}/admin/leads")
    assert r.status_code == 401


def test_admin_leads_ok(s, token):
    r = s.get(f"{API}/admin/leads", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert any(l["name"] == "TEST_LeadUser" for l in data)


def test_admin_contacts_ok(s, token):
    r = s.get(f"{API}/admin/contacts", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Seed idempotency ----------
def test_seed_idempotent(s):
    r1 = s.post(f"{API}/seed")
    assert r1.status_code == 200
    ev = s.get(f"{API}/events").json()
    bl = s.get(f"{API}/blog").json()
    assert len(ev) == 4
    assert len(bl) == 4
