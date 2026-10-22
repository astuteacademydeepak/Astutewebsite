import { DestinationPage } from "./Destinations";

const UK_IMG = "https://images.unsplash.com/photo-1681407979872-0a4cbde28391?w=1200&q=85";
const CA_IMG = "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=85";
const AU_IMG = "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=1200&q=85";

const UK = {
  en: {
    eyebrow: "UK Education", title: "Study in the UK — Historic Universities. Faster Degrees.",
    subtitle: "One-year Master's, globally respected universities and a clear post-study work route — with honest, structured guidance from shortlist to visa.",
    img: UK_IMG,
    stats: [{ n: "1 yr", l: "typical Master's" }, { n: "160+", l: "universities" }, { n: "Graduate", l: "Route work visa" }],
    programsTitle: "Programs We Guide",
    programsSub: "Undergraduate, postgraduate and research pathways across UK universities.",
    programs: [
      { t: "Bachelor's", d: "UCAS applications, personal statements and A-level / Class 12 entry strategy." },
      { t: "Master's (MSc / MA)", d: "One-year taught Master's in STEM, business, data and public health." },
      { t: "MBA & Management", d: "Business school shortlisting, essays and interview preparation." },
      { t: "Research & PhD", d: "Supervisor outreach, research proposals and funding applications." },
      { t: "Foundation Year", d: "Pathway programs for students who need an extra year before a degree." },
      { t: "English Tests", d: "IELTS / PTE / UKVI-approved test planning aligned with visa rules." },
    ],
    processTitle: "Your UK Roadmap",
    process: [
      { t: "Discovery", d: "Understand your profile, budget and career goals." },
      { t: "Shortlist", d: "Russell Group and other quality universities matched to your profile." },
      { t: "Applications", d: "UCAS or direct applications, SOPs and references." },
      { t: "Offers & CAS", d: "Conditional / unconditional offers, deposits and CAS letter." },
      { t: "Visa", d: "Student visa, financial documents and IHS payment." },
      { t: "Pre-departure", d: "Accommodation, travel and arrival orientation." },
    ],
    whyTitle: "Why Astute for the UK",
    why: [
      { t: "Faster ROI", d: "Guidance on one-year programs that fit your budget and timeline." },
      { t: "Quality over volume", d: "Shortlists built on outcomes, not commissions." },
      { t: "Visa clarity", d: "Up-to-date guidance on student and Graduate Route rules." },
      { t: "End-to-end support", d: "From your first counselling call to your first week in the UK." },
    ],
  },
  mr: {
    eyebrow: "UK शिक्षण", title: "UK मध्ये शिक्षण — ऐतिहासिक विद्यापीठे. वेगवान पदवी.",
    subtitle: "एक वर्षाचे Master's, जगभर मान्यताप्राप्त विद्यापीठे आणि स्पष्ट अभ्यासोत्तर काम मार्ग — शॉर्टलिस्टपासून व्हिसापर्यंत प्रामाणिक मार्गदर्शन.",
    img: UK_IMG,
    stats: [{ n: "१ वर्ष", l: "Master's कालावधी" }, { n: "१६०+", l: "विद्यापीठे" }, { n: "Graduate", l: "Route वर्क व्हिसा" }],
    programsTitle: "आम्ही मार्गदर्शन करतो असे कार्यक्रम",
    programsSub: "UK विद्यापीठांमध्ये पदवी, पदव्युत्तर आणि संशोधन मार्ग.",
    programs: [
      { t: "Bachelor's", d: "UCAS अर्ज, personal statement आणि १२वी नंतर प्रवेश धोरण." },
      { t: "Master's (MSc / MA)", d: "STEM, business, data आणि public health मध्ये एक वर्षाचे Master's." },
      { t: "MBA & Management", d: "Business school शॉर्टलिस्ट, निबंध आणि मुलाखत तयारी." },
      { t: "Research & PhD", d: "Supervisor संपर्क, research proposal आणि शिष्यवृत्ती अर्ज." },
      { t: "Foundation Year", d: "पदवीपूर्वी अतिरिक्त वर्ष हवे असलेल्या विद्यार्थ्यांसाठी पथ कार्यक्रम." },
      { t: "English Tests", d: "व्हिसा नियमांशी सुसंगत IELTS / PTE नियोजन." },
    ],
    processTitle: "तुमचा UK रोडमॅप",
    process: [
      { t: "शोध", d: "प्रोफाइल, बजेट आणि करिअर ध्येये समजून घेणे." },
      { t: "शॉर्टलिस्ट", d: "तुमच्या प्रोफाइलनुसार दर्जेदार विद्यापीठे." },
      { t: "अर्ज", d: "UCAS किंवा थेट अर्ज, SOP आणि references." },
      { t: "ऑफर आणि CAS", d: "ऑफर, deposit आणि CAS पत्र." },
      { t: "व्हिसा", d: "Student visa, आर्थिक कागदपत्रे आणि IHS." },
      { t: "प्रवासपूर्व", d: "निवास, प्रवास आणि आगमन मार्गदर्शन." },
    ],
    whyTitle: "UK साठी अ‍ॅस्ट्यूट का",
    why: [
      { t: "जलद परतावा", d: "बजेट आणि वेळेनुसार एक वर्षाचे कार्यक्रम." },
      { t: "दर्जा महत्त्वाचा", d: "परिणामांवर आधारित शॉर्टलिस्ट, कमिशनवर नाही." },
      { t: "व्हिसा स्पष्टता", d: "Student आणि Graduate Route नियमांवर अद्ययावत मार्गदर्शन." },
      { t: "संपूर्ण सहाय्य", d: "पहिल्या कॉलपासून UK मधील पहिल्या आठवड्यापर्यंत." },
    ],
  },
};

const CANADA = {
  en: {
    eyebrow: "Canada Education", title: "Study in Canada — Quality Education. Welcoming Future.",
    subtitle: "Respected universities and colleges, co-op programs and post-graduation work options — with careful guidance through study-permit requirements.",
    img: CA_IMG,
    stats: [{ n: "Co-op", l: "paid work terms" }, { n: "Up to 3 yrs", l: "PGWP eligibility" }, { n: "PAL", l: "guidance included" }],
    programsTitle: "Programs We Guide",
    programsSub: "University degrees, college diplomas and career-focused postgraduate programs.",
    programs: [
      { t: "Bachelor's", d: "Undergraduate applications to Canadian universities with scholarship strategy." },
      { t: "Master's", d: "Thesis and course-based Master's in engineering, CS, data and health." },
      { t: "PG Diplomas", d: "Career-focused college programs in fields eligible for post-graduation work." },
      { t: "Co-op Programs", d: "Programs with built-in paid work terms for real Canadian experience." },
      { t: "MBA", d: "Canadian business school shortlisting, essays and interview prep." },
      { t: "English Tests", d: "IELTS / CELPIP / PTE planning aligned with admission and permit rules." },
    ],
    processTitle: "Your Canada Roadmap",
    process: [
      { t: "Discovery", d: "Profile, budget and long-term goal assessment." },
      { t: "Shortlist", d: "DLI-listed universities and colleges matched to your profile." },
      { t: "Applications", d: "SOPs, transcripts and references." },
      { t: "Offer & PAL", d: "Letter of acceptance and provincial attestation letter." },
      { t: "Study Permit", d: "Financial proof, GIC and permit application." },
      { t: "Arrival", d: "Housing, SIN, banking and campus orientation." },
    ],
    whyTitle: "Why Astute for Canada",
    why: [
      { t: "Policy-aware advice", d: "Guidance that tracks the latest study-permit and PGWP rules." },
      { t: "Career-first choices", d: "Programs chosen for employability, not just admission." },
      { t: "Honest counselling", d: "Realistic options for your profile and budget." },
      { t: "End-to-end support", d: "From shortlist to settling in on campus." },
    ],
  },
  mr: {
    eyebrow: "Canada शिक्षण", title: "कॅनडामध्ये शिक्षण — दर्जेदार शिक्षण. स्वागतार्ह भविष्य.",
    subtitle: "मान्यताप्राप्त विद्यापीठे आणि कॉलेजेस, co-op कार्यक्रम आणि पदवीनंतर काम करण्याचे पर्याय — study permit आवश्यकतांसाठी काळजीपूर्वक मार्गदर्शन.",
    img: CA_IMG,
    stats: [{ n: "Co-op", l: "पगारी कामाचे सत्र" }, { n: "३ वर्षांपर्यंत", l: "PGWP पात्रता" }, { n: "PAL", l: "मार्गदर्शन समाविष्ट" }],
    programsTitle: "आम्ही मार्गदर्शन करतो असे कार्यक्रम",
    programsSub: "विद्यापीठ पदवी, कॉलेज डिप्लोमा आणि करिअर-केंद्रित पदव्युत्तर कार्यक्रम.",
    programs: [
      { t: "Bachelor's", d: "शिष्यवृत्ती धोरणासह कॅनेडियन विद्यापीठांमध्ये पदवी अर्ज." },
      { t: "Master's", d: "Engineering, CS, data आणि health मध्ये thesis / course-based Master's." },
      { t: "PG Diplomas", d: "पदवीनंतर कामासाठी पात्र क्षेत्रांतील करिअर-केंद्रित कार्यक्रम." },
      { t: "Co-op Programs", d: "प्रत्यक्ष कॅनेडियन अनुभवासाठी पगारी कामाचे सत्र." },
      { t: "MBA", d: "Business school शॉर्टलिस्ट, निबंध आणि मुलाखत तयारी." },
      { t: "English Tests", d: "प्रवेश आणि permit नियमांनुसार IELTS / CELPIP / PTE नियोजन." },
    ],
    processTitle: "तुमचा Canada रोडमॅप",
    process: [
      { t: "शोध", d: "प्रोफाइल, बजेट आणि दीर्घकालीन ध्येय मूल्यमापन." },
      { t: "शॉर्टलिस्ट", d: "DLI-मान्य विद्यापीठे आणि कॉलेजेस." },
      { t: "अर्ज", d: "SOP, गुणपत्रिका आणि references." },
      { t: "ऑफर आणि PAL", d: "प्रवेशपत्र आणि provincial attestation letter." },
      { t: "Study Permit", d: "आर्थिक पुरावा, GIC आणि permit अर्ज." },
      { t: "आगमन", d: "निवास, SIN, बँकिंग आणि कॅम्पस ओळख." },
    ],
    whyTitle: "Canada साठी अ‍ॅस्ट्यूट का",
    why: [
      { t: "धोरणांची जाण", d: "नवीनतम study-permit आणि PGWP नियमांनुसार मार्गदर्शन." },
      { t: "करिअर-प्रथम निवड", d: "फक्त प्रवेशासाठी नव्हे, रोजगारक्षमतेसाठी कार्यक्रम." },
      { t: "प्रामाणिक समुपदेशन", d: "प्रोफाइल आणि बजेटनुसार वास्तववादी पर्याय." },
      { t: "संपूर्ण सहाय्य", d: "शॉर्टलिस्टपासून कॅम्पसवर स्थिरावण्यापर्यंत." },
    ],
  },
};

const AUSTRALIA = {
  en: {
    eyebrow: "Australia Education", title: "Study in Australia — World-Class Learning. Outstanding Lifestyle.",
    subtitle: "Globally ranked universities, practical programs and post-study work rights — with step-by-step guidance from shortlist to student visa.",
    img: AU_IMG,
    stats: [{ n: "Go8", l: "research universities" }, { n: "2–3 yrs", l: "post-study work" }, { n: "Feb / Jul", l: "main intakes" }],
    programsTitle: "Programs We Guide",
    programsSub: "Undergraduate, postgraduate and research pathways across Australian universities.",
    programs: [
      { t: "Bachelor's", d: "Undergraduate applications, scholarships and Class 12 entry planning." },
      { t: "Master's", d: "Coursework Master's in IT, engineering, data, business and health." },
      { t: "Research & PhD", d: "Research proposals, supervisor outreach and scholarship applications." },
      { t: "Health Sciences", d: "Nursing, public health and allied health program guidance." },
      { t: "MBA", d: "Business school shortlisting, essays and interview readiness." },
      { t: "English Tests", d: "IELTS / PTE / TOEFL planning aligned with visa requirements." },
    ],
    processTitle: "Your Australia Roadmap",
    process: [
      { t: "Discovery", d: "Profile, budget and career goal assessment." },
      { t: "Shortlist", d: "CRICOS-registered universities matched to your profile." },
      { t: "Applications", d: "SOPs, GS statement and documentation." },
      { t: "Offer & CoE", d: "Offer acceptance, tuition deposit and Confirmation of Enrolment." },
      { t: "Student Visa", d: "Financial capacity, OSHC health cover and visa lodgement." },
      { t: "Arrival", d: "Accommodation, travel and campus orientation." },
    ],
    whyTitle: "Why Astute for Australia",
    why: [
      { t: "Genuine Student ready", d: "Clear, honest documentation that reflects your real goals." },
      { t: "Outcome-focused", d: "Programs chosen for skills demand and career outcomes." },
      { t: "Visa clarity", d: "Up-to-date guidance on student and post-study work visas." },
      { t: "End-to-end support", d: "From first call to your first semester in Australia." },
    ],
  },
  mr: {
    eyebrow: "Australia शिक्षण", title: "ऑस्ट्रेलियात शिक्षण — जागतिक दर्जाचे शिक्षण. उत्कृष्ट जीवनशैली.",
    subtitle: "जागतिक क्रमवारीतील विद्यापीठे, व्यावहारिक कार्यक्रम आणि अभ्यासोत्तर काम हक्क — शॉर्टलिस्टपासून student visa पर्यंत टप्प्याटप्प्याने मार्गदर्शन.",
    img: AU_IMG,
    stats: [{ n: "Go8", l: "संशोधन विद्यापीठे" }, { n: "२-३ वर्षे", l: "अभ्यासोत्तर काम" }, { n: "Feb / Jul", l: "मुख्य प्रवेश" }],
    programsTitle: "आम्ही मार्गदर्शन करतो असे कार्यक्रम",
    programsSub: "ऑस्ट्रेलियन विद्यापीठांमध्ये पदवी, पदव्युत्तर आणि संशोधन मार्ग.",
    programs: [
      { t: "Bachelor's", d: "पदवी अर्ज, शिष्यवृत्ती आणि १२वी नंतर प्रवेश नियोजन." },
      { t: "Master's", d: "IT, engineering, data, business आणि health मध्ये coursework Master's." },
      { t: "Research & PhD", d: "Research proposal, supervisor संपर्क आणि शिष्यवृत्ती अर्ज." },
      { t: "Health Sciences", d: "Nursing, public health आणि allied health कार्यक्रम मार्गदर्शन." },
      { t: "MBA", d: "Business school शॉर्टलिस्ट, निबंध आणि मुलाखत तयारी." },
      { t: "English Tests", d: "व्हिसा आवश्यकतांनुसार IELTS / PTE / TOEFL नियोजन." },
    ],
    processTitle: "तुमचा Australia रोडमॅप",
    process: [
      { t: "शोध", d: "प्रोफाइल, बजेट आणि करिअर ध्येय मूल्यमापन." },
      { t: "शॉर्टलिस्ट", d: "CRICOS-नोंदणीकृत विद्यापीठे." },
      { t: "अर्ज", d: "SOP, GS statement आणि कागदपत्रे." },
      { t: "ऑफर आणि CoE", d: "ऑफर स्वीकार, शुल्क deposit आणि Confirmation of Enrolment." },
      { t: "Student Visa", d: "आर्थिक क्षमता, OSHC आरोग्य विमा आणि व्हिसा अर्ज." },
      { t: "आगमन", d: "निवास, प्रवास आणि कॅम्पस ओळख." },
    ],
    whyTitle: "Australia साठी अ‍ॅस्ट्यूट का",
    why: [
      { t: "Genuine Student तयारी", d: "तुमची खरी ध्येये दर्शवणारी स्पष्ट, प्रामाणिक कागदपत्रे." },
      { t: "परिणाम-केंद्रित", d: "कौशल्य मागणी आणि करिअर परिणामांनुसार कार्यक्रम." },
      { t: "व्हिसा स्पष्टता", d: "Student आणि अभ्यासोत्तर वर्क व्हिसावर अद्ययावत मार्गदर्शन." },
      { t: "संपूर्ण सहाय्य", d: "पहिल्या कॉलपासून ऑस्ट्रेलियातील पहिल्या सत्रापर्यंत." },
    ],
  },
};

export const UKPage = ({ onOpenLead }) => <DestinationPage onOpenLead={onOpenLead} config={UK} />;
export const CanadaPage = ({ onOpenLead }) => <DestinationPage onOpenLead={onOpenLead} config={CANADA} />;
export const AustraliaPage = ({ onOpenLead }) => <DestinationPage onOpenLead={onOpenLead} config={AUSTRALIA} />;
