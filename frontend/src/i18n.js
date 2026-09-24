import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const translations = {
  en: {
    nav: {
      home: "Home",
      programs: "Programs",
      destinations: "Destinations",
      medical: "Medical Careers",
      counselling: "Career Counselling",
      resources: "Resources",
      about: "About",
      blog: "Blog",
      events: "Events",
      contact: "Contact",
      bookCta: "Book Free Counselling",
      whatsapp: "WhatsApp Us",
      usa: "USA",
      germany: "Germany",
    },
    hero: {
      eyebrow: "Global Education & Career Counselling",
      title: "Your Global Career Starts With The Right Guidance.",
      subtitle:
        "Personalised education and career pathways for students, graduates and doctors — from India to leading universities and healthcare systems around the world.",
      primary: "Book Free Counselling",
      secondary: "Explore Programs",
      trust: "30+ Years of Career & Global Education Experience",
    },
    audience: {
      title: "What are you planning next?",
      subtitle: "Choose your pathway and we'll tailor the guidance to you.",
      student: { title: "I'm a Student", desc: "Explore education pathways, universities and career opportunities." },
      doctor: { title: "I'm a Doctor", desc: "USMLE, Residency, Fellowships, Research and international medical pathways." },
      parent: { title: "I'm a Parent", desc: "Understand suitable international education and career options for your child." },
      professional: { title: "I'm a Professional", desc: "Explore higher education and international career pathways." },
      cta: "Get personalised guidance →",
    },
    destinations: {
      title: "Choose Your Global Destination",
      subtitle: "Curated pathways to the destinations we know best.",
      exploreUsa: "Explore USA",
      exploreGermany: "Explore Germany",
      usaDesc: "World-class universities, cutting-edge research and unmatched career opportunities across Bachelor's, Master's, Medical Residency and USMLE.",
      germanyDesc: "Tuition-free public universities, strong engineering programs, English-medium options and clear pathways from Studienkolleg to STEM careers.",
    },
    medical: {
      title: "Build Your Medical Career Beyond Borders",
      subtitle:
        "From medical education to residency, fellowships and research, get structured guidance for your international medical journey.",
      cta: "Explore Medical Careers",
      pathway: ["MBBS", "Profile Building", "Exams", "Clinical Experience", "Research", "Applications", "Residency", "Medical Career"],
      programs: [
        { t: "USMLE", d: "Step 1, Step 2 CK and Step 3 preparation strategy for Indian medical graduates." },
        { t: "USA Residency", d: "End-to-end residency application strategy, USCE and interview preparation." },
        { t: "Fellowships", d: "Post-residency subspecialty pathways in the USA and other destinations." },
        { t: "Research", d: "Structured research mentorship, publications and observership guidance." },
      ],
    },
    counselling: {
      title: "Career Guidance Built Around You",
      subtitle: "Six structured steps that turn ambition into a plan.",
      steps: [
        { t: "Understand", d: "We listen carefully to your background, goals and constraints." },
        { t: "Evaluate", d: "Academic profile, aptitude, interests and market realities." },
        { t: "Identify Options", d: "Suitable courses, universities, destinations and timelines." },
        { t: "Build Strategy", d: "A personalised roadmap with milestones and accountability." },
        { t: "Take Action", d: "Applications, documentation, testing and interview readiness." },
        { t: "Track Progress", d: "Ongoing mentorship until admission and beyond." },
      ],
    },
    why: {
      title: "Why Students Choose Astute",
      pillars: [
        { t: "Personalised Guidance", d: "One-to-one mentorship tailored to your goals." },
        { t: "Global Exposure", d: "Insights from mentors familiar with USA and Germany." },
        { t: "Strategic Planning", d: "Structured timelines and evidence-based decisions." },
        { t: "Profile Building", d: "Research, publications and extracurricular strategy." },
        { t: "End-to-End Support", d: "From counselling to visa to on-ground support." },
        { t: "Experienced Mentoring", d: "Three decades of career and global education experience." },
      ],
    },
    journey: {
      title: "The Astute Journey",
      subtitle: "A calm, structured process from ambition to admission.",
      steps: [
        { t: "Understand", d: "We map your story, goals and constraints." },
        { t: "Analyse", d: "Assessment of profile, aptitude and market fit." },
        { t: "Plan", d: "A personalised strategy with clear milestones." },
        { t: "Prepare", d: "Testing, documentation and profile building." },
        { t: "Apply", d: "Strategic applications, SOPs and interviews." },
        { t: "Progress", d: "Post-admission mentorship and ongoing support." },
      ],
    },
    testimonials: {
      title: "Stories From Our Students & Doctors",
      subtitle: "Real journeys. Real outcomes. Real people.",
      all: "All",
      students: "Students",
      doctors: "Doctors",
      parents: "Parents",
    },
    partners: {
      title: "Our Global Education Network",
      subtitle: "Universities where our students have secured admission.",
    },
    assessments: {
      title: "Start With A Free Assessment",
      subtitle: "Understand where you stand — and where you can go.",
      items: [
        { t: "Free Career Counselling", d: "One-on-one discovery session to map your goals and options." },
        { t: "Profile Evaluation", d: "Comprehensive review of your academic and personal profile." },
        { t: "USMLE / Medical Assessment", d: "Diagnostic evaluation for medical career pathways." },
      ],
      cta: "Start Assessment",
    },
    events: {
      title: "Webinars & Events",
      subtitle: "Learn from mentors, alumni and admissions experts.",
      upcoming: "Upcoming",
      past: "Past Events",
      webinars: "Webinars",
      register: "Register",
      viewAll: "View all events",
      empty: "No events in this category yet. Please check back soon.",
    },
    blog: {
      title: "Knowledge Hub",
      subtitle: "In-depth guides, timelines and playbooks.",
      readMore: "Read article",
      viewAll: "View all articles",
      minRead: "min read",
      empty: "New articles are being prepared. Please check back soon.",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Clear answers to the questions we hear most often.",
      categories: { USA: "USA", Germany: "Germany", Medical: "Medical", Counselling: "Counselling" },
    },
    finalCta: {
      title: "Not Sure Which Path Is Right For You?",
      subtitle: "Talk to an Astute counsellor and understand your options.",
      primary: "Book Free Counselling",
      secondary: "WhatsApp Us",
    },
    footer: {
      programs: "Programs",
      resources: "Resources",
      company: "Company",
      legal: "Legal",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      disclaimer: "Disclaimer",
      about: "About Us",
      leadership: "Leadership",
      partners: "Partners",
      testimonials: "Testimonials",
      tagline: "Global education and career counselling that respects your ambition — and your reality.",
      rights: "All rights reserved.",
    },
    form: {
      title: "Book Your Free Counselling",
      subtitle: "It takes less than 60 seconds.",
      step: "Step",
      of: "of",
      back: "Back",
      next: "Next",
      submit: "Get My Personalised Guidance",
      success: "Thank you. Our team will contact you shortly.",
      successSub: "You'll hear from an Astute counsellor within one working day.",
      close: "Close",
      s1: { q: "Who are you?", opts: ["Student", "Doctor", "Parent", "Working Professional"] },
      s2: { q: "What are you interested in?", opts: ["USA Education", "Germany Education", "Medical Careers", "Career Counselling", "Other"] },
      s3: { q: "Your current education", opts: ["Class 12", "Bachelor's", "Master's", "MBBS / MD", "Working Professional"] },
      s4: { q: "Preferred destination", opts: ["USA", "Germany", "Other", "Not sure yet"] },
      s5: { q: "Your career goal", ph: "In one line — what do you want to achieve?" },
      s6: {
        q: "How should we reach you?",
        name: "Full name", namePh: "Your name",
        phone: "Phone", phonePh: "10-digit mobile",
        wa: "WhatsApp (optional)", waPh: "If different from phone",
        email: "Email (optional)", emailPh: "you@example.com",
        consent: "I agree to be contacted by Astute Academy about my enquiry.",
      },
    },
    contact: {
      title: "Not Sure Which Path Is Right For You?",
      subtitle: "Speak with an Astute counsellor and understand your options.",
      cta: "Book Free Counselling",
      formTitle: "Send us a message",
      name: "Your name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "How can we help?",
      send: "Send message",
      sent: "Message sent. We will reply within one working day.",
      phoneLabel: "Phone",
      emailLabel: "Email",
      officeLabel: "Office",
      officeValue: "Astute Academy — Pune, Maharashtra, India",
    },
    common: {
      learnMore: "Learn more",
      bookNow: "Book now",
      whoFor: "Who is this for",
      why: "Why this pathway",
      eligibility: "Eligibility",
      process: "Process",
      timeline: "Timeline",
    },
    lang: { en: "English", mr: "मराठी" },
    aiDisclaimer:
      "Guidance shown on this website is informational. Eligibility, admissions and university policies should be verified with Astute counsellors and the relevant institution.",
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      programs: "कार्यक्रम",
      destinations: "देश",
      medical: "मेडिकल करिअर",
      counselling: "करिअर समुपदेशन",
      resources: "संसाधने",
      about: "आमच्याविषयी",
      blog: "ब्लॉग",
      events: "इव्हेंट्स",
      contact: "संपर्क",
      bookCta: "मोफत समुपदेशन",
      whatsapp: "WhatsApp",
      usa: "USA",
      germany: "Germany",
    },
    hero: {
      eyebrow: "ग्लोबल एज्युकेशन आणि करिअर समुपदेशन",
      title: "तुमच्या जागतिक करिअरची सुरुवात योग्य मार्गदर्शनापासून करा.",
      subtitle:
        "विद्यार्थी, पदवीधर आणि डॉक्टरांसाठी वैयक्तिक शिक्षण आणि करिअर मार्ग — भारतापासून जगातील आघाडीच्या विद्यापीठे आणि आरोग्य प्रणालींपर्यंत.",
      primary: "मोफत समुपदेशन घ्या",
      secondary: "कार्यक्रम पहा",
      trust: "३०+ वर्षांचा करिअर आणि ग्लोबल एज्युकेशनचा अनुभव",
    },
    audience: {
      title: "तुम्ही पुढे काय ठरवत आहात?",
      subtitle: "तुमचा मार्ग निवडा आणि आम्ही मार्गदर्शन तुमच्यासाठी तयार करू.",
      student: { title: "मी विद्यार्थी आहे", desc: "शिक्षणाचे मार्ग, विद्यापीठे आणि करिअर संधी शोधा." },
      doctor: { title: "मी डॉक्टर आहे", desc: "USMLE, Residency, Fellowships, Research आणि आंतरराष्ट्रीय मेडिकल मार्ग." },
      parent: { title: "मी पालक आहे", desc: "तुमच्या मुलासाठी योग्य आंतरराष्ट्रीय शिक्षण आणि करिअर पर्याय समजून घ्या." },
      professional: { title: "मी व्यावसायिक आहे", desc: "उच्च शिक्षण आणि आंतरराष्ट्रीय करिअर मार्ग शोधा." },
      cta: "वैयक्तिक मार्गदर्शन मिळवा →",
    },
    destinations: {
      title: "तुमचे जागतिक ठिकाण निवडा",
      subtitle: "आम्हाला सर्वात चांगले माहीत असलेल्या ठिकाणांचे तयार मार्ग.",
      exploreUsa: "USA पहा",
      exploreGermany: "Germany पहा",
      usaDesc: "जागतिक दर्जाची विद्यापीठे, प्रगत संशोधन आणि अतुलनीय करिअर संधी — Bachelor's, Master's, Medical Residency आणि USMLE.",
      germanyDesc: "शुल्कमुक्त सार्वजनिक विद्यापीठे, मजबूत अभियांत्रिकी कार्यक्रम, इंग्रजी-माध्यम पर्याय आणि Studienkolleg पासून STEM करिअरपर्यंत स्पष्ट मार्ग.",
    },
    medical: {
      title: "सीमांच्या पलीकडे तुमची मेडिकल करिअर घडवा",
      subtitle:
        "वैद्यकीय शिक्षणापासून ते residency, fellowships आणि research पर्यंत — तुमच्या आंतरराष्ट्रीय मेडिकल प्रवासासाठी टप्प्याटप्प्याने मार्गदर्शन.",
      cta: "मेडिकल करिअर पहा",
      pathway: ["MBBS", "Profile Building", "Exams", "Clinical Experience", "Research", "Applications", "Residency", "Medical Career"],
      programs: [
        { t: "USMLE", d: "भारतीय वैद्यकीय पदवीधरांसाठी Step 1, Step 2 CK आणि Step 3 तयारीचे धोरण." },
        { t: "USA Residency", d: "संपूर्ण residency अर्ज धोरण, USCE आणि मुलाखत तयारी." },
        { t: "Fellowships", d: "USA आणि इतर देशांतील post-residency उपविशेषज्ञता मार्ग." },
        { t: "Research", d: "टप्प्याटप्प्याने संशोधन मार्गदर्शन, प्रकाशने आणि observership." },
      ],
    },
    counselling: {
      title: "तुमच्याभोवती घडवलेले करिअर मार्गदर्शन",
      subtitle: "आकांक्षेला योजना बनवणाऱ्या सहा संरचित पायऱ्या.",
      steps: [
        { t: "समजून घेणे", d: "आम्ही तुमची पार्श्वभूमी, ध्येये आणि मर्यादा शांतपणे ऐकतो." },
        { t: "मूल्यमापन", d: "शैक्षणिक प्रोफाइल, अभिरुची, आवडी आणि बाजार वास्तव." },
        { t: "पर्याय ओळखणे", d: "योग्य कोर्स, विद्यापीठे, देश आणि वेळापत्रक." },
        { t: "धोरण आखणे", d: "टप्प्यांसह वैयक्तिक रोडमॅप." },
        { t: "कृती", d: "अर्ज, कागदपत्रे, चाचणी आणि मुलाखत तयारी." },
        { t: "प्रगती", d: "प्रवेश आणि नंतरही सतत मार्गदर्शन." },
      ],
    },
    why: {
      title: "विद्यार्थी अ‍ॅस्ट्यूट का निवडतात",
      pillars: [
        { t: "वैयक्तिक मार्गदर्शन", d: "तुमच्या ध्येयांसाठी वैयक्तिक मेंटरशिप." },
        { t: "जागतिक अनुभव", d: "USA आणि Germany परिचित मेंटरचा अनुभव." },
        { t: "धोरणात्मक नियोजन", d: "संरचित वेळापत्रक आणि माहितीवर आधारित निर्णय." },
        { t: "प्रोफाइल बिल्डिंग", d: "संशोधन, प्रकाशने आणि सहशालेय धोरण." },
        { t: "संपूर्ण सहाय्य", d: "समुपदेशनापासून व्हिसापर्यंत आणि पुढेही." },
        { t: "अनुभवी मेंटरिंग", d: "तीन दशकांचा करिअर आणि ग्लोबल एज्युकेशनचा अनुभव." },
      ],
    },
    journey: {
      title: "अ‍ॅस्ट्यूट प्रवास",
      subtitle: "आकांक्षेपासून प्रवेशापर्यंत शांत, संरचित प्रक्रिया.",
      steps: [
        { t: "समजून घेणे", d: "आम्ही तुमची कथा, ध्येये आणि मर्यादा समजून घेतो." },
        { t: "विश्लेषण", d: "प्रोफाइल, अभिरुची आणि बाजार अनुरूपतेचे मूल्यमापन." },
        { t: "नियोजन", d: "स्पष्ट टप्प्यांसह वैयक्तिक धोरण." },
        { t: "तयारी", d: "चाचणी, कागदपत्रे आणि प्रोफाइल बिल्डिंग." },
        { t: "अर्ज", d: "धोरणात्मक अर्ज, SOP आणि मुलाखती." },
        { t: "प्रगती", d: "प्रवेशोत्तर मार्गदर्शन आणि सतत सहाय्य." },
      ],
    },
    testimonials: {
      title: "आमच्या विद्यार्थ्यांच्या आणि डॉक्टरांच्या यशोगाथा",
      subtitle: "खरे प्रवास. खरे परिणाम. खरे लोक.",
      all: "सर्व",
      students: "विद्यार्थी",
      doctors: "डॉक्टर",
      parents: "पालक",
    },
    partners: {
      title: "आमचे ग्लोबल एज्युकेशन नेटवर्क",
      subtitle: "जिथे आमच्या विद्यार्थ्यांना प्रवेश मिळाला अशी विद्यापीठे.",
    },
    assessments: {
      title: "मोफत मूल्यमापनाने सुरुवात करा",
      subtitle: "तुम्ही कुठे आहात — आणि कुठे जाऊ शकता — हे समजून घ्या.",
      items: [
        { t: "मोफत करिअर समुपदेशन", d: "तुमची ध्येये आणि पर्याय समजून घेण्यासाठी एक-एक सत्र." },
        { t: "प्रोफाइल मूल्यमापन", d: "तुमच्या शैक्षणिक आणि वैयक्तिक प्रोफाइलचे सखोल मूल्यांकन." },
        { t: "USMLE / मेडिकल मूल्यमापन", d: "मेडिकल करिअर मार्गासाठी निदान मूल्यांकन." },
      ],
      cta: "मूल्यमापन सुरू करा",
    },
    events: {
      title: "वेबिनार आणि इव्हेंट्स",
      subtitle: "मेंटर, माजी विद्यार्थी आणि प्रवेश तज्ज्ञांकडून शिका.",
      upcoming: "आगामी",
      past: "मागील इव्हेंट्स",
      webinars: "वेबिनार",
      register: "नोंदणी करा",
      viewAll: "सर्व इव्हेंट्स पहा",
      empty: "या श्रेणीत सध्या इव्हेंट्स नाहीत. कृपया लवकरच पुन्हा पहा.",
    },
    blog: {
      title: "नॉलेज हब",
      subtitle: "सखोल मार्गदर्शक, वेळापत्रके आणि प्लेबुक्स.",
      readMore: "लेख वाचा",
      viewAll: "सर्व लेख पहा",
      minRead: "मिनिटे वाचन",
      empty: "नवीन लेख तयार होत आहेत. कृपया लवकरच पुन्हा पहा.",
    },
    faq: {
      title: "वारंवार विचारले जाणारे प्रश्न",
      subtitle: "सर्वाधिक विचारल्या जाणाऱ्या प्रश्नांची स्पष्ट उत्तरे.",
      categories: { USA: "USA", Germany: "Germany", Medical: "मेडिकल", Counselling: "समुपदेशन" },
    },
    finalCta: {
      title: "तुमच्यासाठी योग्य मार्ग कोणता — हे ठरवायचे आहे का?",
      subtitle: "अ‍ॅस्ट्यूट समुपदेशकाशी बोला आणि तुमचे पर्याय समजून घ्या.",
      primary: "मोफत समुपदेशन घ्या",
      secondary: "WhatsApp करा",
    },
    footer: {
      programs: "कार्यक्रम",
      resources: "संसाधने",
      company: "कंपनी",
      legal: "कायदेशीर",
      contact: "संपर्क",
      privacy: "गोपनीयता धोरण",
      terms: "अटी व शर्ती",
      disclaimer: "अस्वीकरण",
      about: "आमच्याविषयी",
      leadership: "नेतृत्व",
      partners: "भागीदार",
      testimonials: "प्रशंसापत्रे",
      tagline: "तुमच्या आकांक्षेचा आणि वास्तवाचा आदर करणारे ग्लोबल एज्युकेशन आणि करिअर समुपदेशन.",
      rights: "सर्व हक्क राखीव.",
    },
    form: {
      title: "मोफत समुपदेशन बुक करा",
      subtitle: "६० सेकंदांपेक्षा कमी वेळ लागेल.",
      step: "पायरी",
      of: "पैकी",
      back: "मागे",
      next: "पुढे",
      submit: "माझे वैयक्तिक मार्गदर्शन मिळवा",
      success: "धन्यवाद. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.",
      successSub: "एका कामकाजी दिवसात अ‍ॅस्ट्यूट समुपदेशक तुमच्याशी संपर्क साधेल.",
      close: "बंद करा",
      s1: { q: "तुम्ही कोण आहात?", opts: ["विद्यार्थी", "डॉक्टर", "पालक", "व्यावसायिक"] },
      s2: { q: "तुम्हाला कशात रस आहे?", opts: ["USA शिक्षण", "Germany शिक्षण", "मेडिकल करिअर", "करिअर समुपदेशन", "इतर"] },
      s3: { q: "तुमचे सध्याचे शिक्षण", opts: ["इयत्ता १२वी", "Bachelor's", "Master's", "MBBS / MD", "व्यावसायिक"] },
      s4: { q: "पसंतीचे ठिकाण", opts: ["USA", "Germany", "इतर", "अजून ठरवले नाही"] },
      s5: { q: "तुमचे करिअर ध्येय", ph: "एका ओळीत — तुम्हाला काय साध्य करायचे आहे?" },
      s6: {
        q: "आम्ही तुमच्याशी कसे संपर्क साधू?",
        name: "पूर्ण नाव", namePh: "तुमचे नाव",
        phone: "फोन", phonePh: "१०-अंकी मोबाईल",
        wa: "WhatsApp (ऐच्छिक)", waPh: "फोनपेक्षा वेगळा असल्यास",
        email: "ईमेल (ऐच्छिक)", emailPh: "you@example.com",
        consent: "मी अ‍ॅस्ट्यूट अकादमीकडून माझ्या चौकशीबद्दल संपर्क करण्यास सहमती देतो/देते.",
      },
    },
    contact: {
      title: "तुमच्यासाठी योग्य मार्ग कोणता — हे ठरवायचे आहे का?",
      subtitle: "अ‍ॅस्ट्यूट समुपदेशकाशी बोला आणि तुमचे पर्याय समजून घ्या.",
      cta: "मोफत समुपदेशन घ्या",
      formTitle: "आम्हाला संदेश पाठवा",
      name: "तुमचे नाव",
      email: "ईमेल",
      phone: "फोन",
      subject: "विषय",
      message: "आम्ही कशी मदत करू शकतो?",
      send: "संदेश पाठवा",
      sent: "संदेश पाठवला गेला. आम्ही एका कामकाजी दिवसात उत्तर देऊ.",
      phoneLabel: "फोन",
      emailLabel: "ईमेल",
      officeLabel: "कार्यालय",
      officeValue: "अ‍ॅस्ट्यूट अकादमी — पुणे, महाराष्ट्र, भारत",
    },
    common: {
      learnMore: "अधिक जाणून घ्या",
      bookNow: "आत्ता बुक करा",
      whoFor: "हे कोणासाठी आहे",
      why: "हा मार्ग का",
      eligibility: "पात्रता",
      process: "प्रक्रिया",
      timeline: "वेळापत्रक",
    },
    lang: { en: "English", mr: "मराठी" },
    aiDisclaimer:
      "या वेबसाइटवरील मार्गदर्शन माहितीसाठी आहे. पात्रता, प्रवेश आणि विद्यापीठ धोरणे अ‍ॅस्ट्यूट समुपदेशक आणि संबंधित संस्थेकडून पडताळून पहावीत.",
  },
};

const LanguageContext = createContext({ lang: "en", t: translations.en, setLang: () => {}, toggleLang: () => {} });

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState(() => {
    if (location.pathname.startsWith("/mr")) return "mr";
    return localStorage.getItem("astute-lang") || "en";
  });

  useEffect(() => {
    const pathIsMr = location.pathname === "/mr" || location.pathname.startsWith("/mr/");
    const newLang = pathIsMr ? "mr" : "en";
    if (newLang !== lang) setLangState(newLang);
    document.documentElement.lang = newLang === "mr" ? "mr-IN" : "en-IN";
    localStorage.setItem("astute-lang", newLang);
  }, [location.pathname, lang]);

  const toggleLang = useCallback(() => {
    const currentPath = location.pathname;
    const isMr = currentPath === "/mr" || currentPath.startsWith("/mr/");
    let target;
    if (isMr) {
      target = currentPath.replace(/^\/mr/, "") || "/";
    } else {
      target = currentPath === "/" ? "/mr" : `/mr${currentPath}`;
    }
    navigate(target);
  }, [location.pathname, navigate]);

  const setLang = useCallback((l) => {
    if (l === lang) return;
    toggleLang();
  }, [lang, toggleLang]);

  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// Helper: build a language-aware path
export function langPath(lang, path) {
  if (lang === "mr") {
    if (path === "/") return "/mr";
    return `/mr${path.startsWith("/") ? path : `/${path}`}`;
  }
  return path;
}
