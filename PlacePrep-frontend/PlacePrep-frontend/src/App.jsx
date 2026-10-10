import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, BrainCircuit, ChartNoAxesColumn, Building2, BriefcaseBusiness,
  UserRound, LogOut, Bell, Search, ChevronRight, ArrowRight, CalendarDays, RefreshCw,
  Plus, Trash2, Pencil, ExternalLink, Target, CheckCircle2, Circle, Clock3, Sparkles,
  Menu, X, GraduationCap, BookOpen, TrendingUp, Send, RotateCcw, LoaderCircle
} from "lucide-react";
import { DEMO_MODE, ENDPOINTS, apiGet, apiPost, apiPut, apiDelete } from "./api.js";

const demoSeed = {
  profile: { name: "Rashi Verma", phone: "", college: "VIT Bhopal University", branch: "Information Technology", cgpa: "8.8", graduationYear: "2027", github: "https://github.com/RashiVerma14", linkedin: "", leetcode: "", resumeUrl: "", skills: "Java, Spring Boot, MongoDB, React, DSA", bio: "" },
  resumes: [{ id: "resume-1", title: "My Resume", url: "", fileType: "PDF", fileSize: "64", updatedAt: "7/27/2026, 9:24:20 PM" }],
  dsa: [],
  placements: [],
  interviews: [],
  reports: {},
  companies: [
    { name: "Google", focus: "DSA, problem solving, system design", category: "Product" },
    { name: "Microsoft", focus: "DSA, OOP, problem solving", category: "Product" },
    { name: "Amazon", focus: "DSA, leadership principles", category: "Product" },
    { name: "ServiceNow", focus: "Java, OOP, databases", category: "Product" },
    { name: "Adobe", focus: "DSA, core CS, projects", category: "Product" },
    { name: "Accenture", focus: "Aptitude, communication, coding", category: "Consulting" }
  ]
};
function readStore(key, fallback) {
  try { const value = localStorage.getItem(`placeprep_${key}`); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}
function writeStore(key, value) { localStorage.setItem(`placeprep_${key}`, JSON.stringify(value)); }
function useStore(key, initial) {
  const [value, setValue] = useState(() => readStore(key, initial));
  useEffect(() => { writeStore(key, value); }, [key, value]);
  return [value, setValue];
}
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/interview", label: "Interview", icon: BrainCircuit },
  { to: "/dsa", label: "DSA Tracker", icon: ChartNoAxesColumn },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/placement", label: "Placement", icon: BriefcaseBusiness },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/roadmap", label: "Study Roadmap", icon: BookOpen }
];
const pageTitles = {
  "/": "Placement Prep", "/resume": "Resume", "/interview": "AI Interview Practice",
  "/dsa": "DSA Tracker", "/companies": "Companies", "/placement": "Placement Tracker",
  "/profile": "Profile", "/roadmap": "Personalized Study Roadmap", "/report": "AI Report"
};

function AppShell({ children, profile, onLogout }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = pageTitles[location.pathname] || "Placement Prep";
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand-row"><div className="brand-mark">P</div><span>PlacePrep</span><button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <nav className="side-nav">
        {navItems.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setMobileOpen(false)} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><Icon size={18}/><span>{label}</span></NavLink>)}
      </nav>
      <button className="logout-link" onClick={onLogout}><LogOut size={18}/><span>Logout</span></button>
    </aside>
    {mobileOpen && <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button>
        <div><div className="eyebrow">STUDENT DASHBOARD</div><div className="topbar-title">{title === "Placement Prep" ? "Placement Prep" : "Placement Prep"}</div></div>
        <div className="topbar-spacer"/>
        <button className="top-icon" title="Notifications"><Bell size={18}/></button>
        <div className="user-chip"><span className="avatar"><UserRound size={17}/></span><span>{profile?.name || "Student"}</span></div>
      </header>
      <div className="page-content">{children}</div>
      <footer className="footer-note">PlacePrep <span>•</span> Your placement journey, organized.</footer>
    </main>
  </div>;
}

function PageHeading({title, subtitle, action}) {
  return <div className="page-heading"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}
function Button({children, variant = "primary", ...props}) {
  return <button className={`btn ${variant}`} {...props}>{children}</button>;
}
function Field({label, children, ...props}) {
  return <label className="field"><span>{label}</span>{children || <input {...props}/>}</label>;
}
function Input({label, ...props}) { return <Field label={label}><input {...props}/></Field>; }
function SelectField({label, options, ...props}) { return <Field label={label}><select {...props}>{options.map(o => typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}</select></Field>; }
function Notice({message, onClose}) { return message ? <div className="notice"><span>{message}</span><button onClick={onClose} aria-label="Dismiss"><X size={16}/></button></div> : null; }
function EmptyState({title, subtitle}) { return <div className="empty-state"><div className="empty-icon"><FileText size={22}/></div><strong>{title}</strong><p>{subtitle}</p></div>; }

function Dashboard({profile, resumes, dsa, placements, interviews, navigate}) {
  const solved = dsa.reduce((n, item) => n + Number(item.solved || 0), 0);
  const total = dsa.reduce((n, item) => n + Number(item.total || 0), 0);
  const activePlacements = placements.filter(p => !["REJECTED", "OFFER_RECEIVED", "WITHDRAWN"].includes(p.status)).length;
  const readiness = Math.min(100, Math.round((Math.min(resumes.length, 2) / 2 * 25) + (total ? solved / total * 25 : 0) + (interviews.length ? 25 : 0) + (placements.length ? 25 : 0)));
  const tasks = [
    { label: "Upload or update resume", sub: `${resumes.length} saved`, to: "/resume", tag: "Resume", done: resumes.length > 0 },
    { label: "Review active placement records", sub: `${activePlacements} active`, to: "/placement", tag: "Placement", done: activePlacements > 0 },
    { label: "Complete one AI interview", sub: interviews.length ? `${interviews.length} interview session(s)` : "Backend report", to: "/interview", tag: "Interview", done: interviews.length > 0 }
  ];
  return <div className="dashboard-page">
    <section className="hero-card">
      <div className="hero-copy">
        <div className="badge-row"><span className="pill blue"><CalendarDays size={13}/> Placement Dashboard</span><span className={`pill ${DEMO_MODE ? "amber" : "green"}`}>{DEMO_MODE ? "Demo data" : "Live API data"}</span></div>
        <h1>Welcome back, {profile?.name?.split(" ")[0] || "Student"} {profile?.name?.split(" ").slice(1).join(" ")}</h1>
        <p>Your dashboard brings together placement, resume, interview, and preparation progress. Use each module to manage current data.</p>
        <div className="hero-actions"><Button onClick={() => navigate("/resume")}>Manage Resume <ArrowRight size={16}/></Button><Button variant="secondary" onClick={() => navigate("/interview")}>Start Interview</Button></div>
      </div>
      <div className="readiness-panel">
        <div className="illustration"><div className="illustration-window"><span/><span/><span/></div><div className="illustration-person"><div className="person-head"/><div className="person-body"/></div><div className="illustration-code">&lt;/&gt;</div></div>
        <div className="readiness-label">Overall Readiness</div><div className="readiness-score">{readiness}<span>/ 100</span></div>
        <div className="progress-track"><div style={{width: `${readiness}%`}}/></div>
        <div className="readiness-caption"><TrendingUp size={14}/> Calculated from resume and preparation records</div>
      </div>
    </section>
    <section className="stats-grid">
      <StatCard icon={FileText} tone="blue" tag="Backend" label="Resumes" value={resumes.length} description="Resume records loaded" onClick={() => navigate("/resume")}/>
      <StatCard icon={ChartNoAxesColumn} tone="green" tag="Manual" label="DSA Progress" value={total ? `${solved}/${total}` : "Open"} description="Track practice in the DSA module" onClick={() => navigate("/dsa")}/>
      <StatCard icon={BrainCircuit} tone="purple" tag="API" label="AI Interview" value="Start" description="Questions and reports" onClick={() => navigate("/interview")}/>
      <StatCard icon={Building2} tone="orange" tag={`${activePlacements} active`} label="Applications" value={placements.length} description={`${activePlacements} active placement records`} onClick={() => navigate("/placement")}/>
    </section>
    <section className="dashboard-lower">
      <div className="panel today-panel">
        <div className="panel-heading"><div><h2>Today Plan</h2><p>Small tasks that keep placement prep consistent.</p></div><Target className="panel-accent" size={22}/></div>
        <div className="task-list">{tasks.map(task => <button className="task-row" key={task.label} onClick={() => navigate(task.to)}><span className={`task-check ${task.done ? "done" : ""}`}>{task.done ? <CheckCircle2 size={18}/> : <Circle size={18}/>}</span><span className="task-main"><strong>{task.label}</strong><small><Clock3 size={12}/> {task.sub}</small></span><span className="task-tag">{task.tag}</span></button>)}</div>
      </div>
      <div className="panel status-panel">
        <div className="panel-heading"><div><h2>Preparation Status</h2><p>Module-wise readiness summary.</p></div><CheckCircle2 className="panel-accent green-text" size={22}/></div>
        <ProgressRow label="Resume Records" value={resumes.length ? 100 : 0} hint={resumes.length ? "Available" : "No resume record yet"}/>
        <ProgressRow label="Active Placements" value={placements.length ? Math.round(activePlacements / placements.length * 100) : 0} hint={placements.length ? `${activePlacements} active records` : "No active records"}/>
        <ProgressRow label="Interview Report" value={interviews.length ? 100 : 0} hint={interviews.length ? "Interview data available" : "Start an interview to generate report"}/>
      </div>
    </section>
  </div>;
}
function StatCard({icon:Icon,tone,tag,label,value,description,onClick}) {
  return <button className="stat-card" onClick={onClick}><div className="stat-top"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><span className="stat-tag">{tag}</span></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-description">{description}</div><span className="stat-link">Open <ArrowRight size={14}/></span></button>;
}
function ProgressRow({label,value,hint}) { return <div className="progress-row"><div className="progress-meta"><span>{label}</span><span>{value}%</span></div><div className="thin-progress"><div style={{width: `${value}%`}}/></div><small>{hint}</small></div>; }

function ResumePage({resumes,setResumes,showMessage,request}) {
  const [form,setForm] = useState({title:"",url:"",fileType:"PDF",fileSize:""});
  const [editing,setEditing] = useState(null);
  const [selected,setSelected] = useState(resumes[0]?.id || null);
  const [loading,setLoading] = useState(false);
  const load = async () => {
    if (DEMO_MODE) return;
    setLoading(true);
    try { const data = await apiGet(ENDPOINTS.resumes); setResumes(Array.isArray(data) ? data.map(normalizeResume) : data?.content?.map(normalizeResume) || []); }
    catch(e) { showMessage(errorText(e)); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const save = async (e) => {
    e.preventDefault();
    const item = { id: editing || crypto.randomUUID(), title: form.title.trim(), url: form.url.trim(), fileType: form.fileType, fileSize: form.fileSize, updatedAt: new Date().toLocaleString() };
    if (!item.title) return showMessage("Please enter a resume title.");
    try {
      if (!DEMO_MODE) {
        const body = { title: item.title, resumeUrl: item.url, fileType: item.fileType, fileSize: item.fileSize };
        const result = editing ? await apiPut(`${ENDPOINTS.resumes}/${editing}`, body) : await apiPost(ENDPOINTS.resumes, body);
        const saved = normalizeResume(result || item);
        setResumes(prev => editing ? prev.map(x => x.id === editing ? saved : x) : [saved, ...prev]);
      } else setResumes(prev => editing ? prev.map(x => x.id === editing ? item : x) : [item, ...prev]);
      setSelected(item.id); setForm({title:"",url:"",fileType:"PDF",fileSize:""}); setEditing(null); showMessage(editing ? "Resume updated." : "Resume added.");
    } catch(e) { showMessage(errorText(e)); }
  };
  const edit = (r) => { setEditing(r.id); setForm({title:r.title||"",url:r.url||"",fileType:r.fileType||"PDF",fileSize:r.fileSize||""}); };
  const remove = async (r) => {
    if (!confirm(`Delete "${r.title}"?`)) return;
    try { if (!DEMO_MODE) await apiDelete(`${ENDPOINTS.resumes}/${r.id}`); setResumes(prev => prev.filter(x=>x.id!==r.id)); if(selected===r.id)setSelected(null); showMessage("Resume deleted."); }
    catch(e) { showMessage(errorText(e)); }
  };
  const active = resumes.find(r => r.id === selected) || resumes[0];
  return <div>
    <PageHeading title="Resume Module" subtitle="Create, view, update, and delete resume records through backend APIs." action={<Button variant="secondary" onClick={load}><RefreshCw size={15}/> Refresh</Button>}/>
    <form className="panel resume-form" onSubmit={save}>
      <div className="form-grid resume-fields">
        <Input label="Resume Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="My Resume" required/>
        <Input label="Resume URL" value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://..." />
        <SelectField label="File Type" value={form.fileType} onChange={e=>setForm({...form,fileType:e.target.value})} options={["PDF","DOCX","DOC","Other"]}/>
        <Input label="File Size" value={form.fileSize} onChange={e=>setForm({...form,fileSize:e.target.value})} placeholder="e.g. 64 KB"/>
        <Button type="submit"><Plus size={16}/>{editing ? "Save" : "Add"}</Button>
      </div>
    </form>
    <div className="two-column resume-columns">
      <section className="panel"><h2>Saved Resumes</h2>{loading ? <Loading/> : resumes.length ? <div className="record-list">{resumes.map(r=><div className={`resume-record ${selected===r.id?"selected":""}`} key={r.id} onClick={()=>setSelected(r.id)}><span className="file-icon"><FileText size={19}/></span><div className="record-info"><strong>{r.title}</strong><small>Updated: {r.updatedAt || "Date unavailable"}</small></div><button className="small-btn" onClick={e=>{e.stopPropagation();edit(r)}}><Pencil size={14}/> Edit</button><button className="icon-btn danger" onClick={e=>{e.stopPropagation();remove(r)}} title="Delete"><Trash2 size={16}/></button></div>)}</div> : <EmptyState title="No resumes saved" subtitle="Add a resume record above to get started."/>}</section>
      <section className="panel"><h2>Resume Details</h2>{active ? <div className="detail-list"><p><b>Title:</b> {active.title}</p><p><b>File Type:</b> {active.fileType || "—"}</p><p><b>File Size:</b> {active.fileSize || "—"}</p><p><b>Updated:</b> {active.updatedAt || "—"}</p>{active.url && <a className="text-link" href={active.url} target="_blank" rel="noreferrer">Open Resume <ExternalLink size={14}/></a>}</div> : <EmptyState title="Select a resume" subtitle="Resume details will appear here."/>}</section>
    </div>
  </div>;
}
function normalizeResume(r) { return { ...r, id: String(r.id ?? r._id ?? crypto.randomUUID()), title: r.title ?? r.name ?? "Untitled resume", url: r.url ?? r.resumeUrl ?? "", fileType: r.fileType ?? "PDF", fileSize: r.fileSize ?? "", updatedAt: r.updatedAt ?? r.updatedAtString ?? r.createdAt ?? "" }; }

function InterviewPage({interviews,setInterviews,reports,setReports,showMessage,navigate}) {
  const [config,setConfig] = useState({role:"Software Developer",difficulty:"MEDIUM",experienceLevel:"FRESHER",totalQuestions:3});
  const [session,setSession] = useState(null);
  const [answer,setAnswer] = useState("");
  const [feedback,setFeedback] = useState(null);
  const [busy,setBusy] = useState(false);
  const [questionIndex,setQuestionIndex] = useState(0);
  const [questionList,setQuestionList] = useState([]);
  const start = async (e) => {
    e.preventDefault(); setBusy(true); setFeedback(null); setAnswer("");
    try {
      let data;
      if (!DEMO_MODE) data = await apiPost(ENDPOINTS.interviewStart, config);
      else data = { id: crypto.randomUUID(), interviewId: crypto.randomUUID(), ...config, status:"IN_PROGRESS", questions: [
        "What is a null pointer in programming and how would you prevent its occurrence in your code?",
        "Explain the difference between an interface and an abstract class in Java.",
        "How would you approach debugging a slow API endpoint?"
      ].slice(0, Math.max(1, Number(config.totalQuestions))) };
      const id = String(data.id ?? data.interviewId ?? data.sessionId ?? crypto.randomUUID());
      const qs = data.questions || data.generatedQuestions || (data.question ? [data.question] : []);
      setSession({...data,id}); setQuestionList(qs); setQuestionIndex(0);
      if (!qs.length && data.questionText) setQuestionList([data.questionText]);
      setInterviews(prev => [{...data,id,startedAt:new Date().toISOString()},...prev.filter(i=>i.id!==id)]);
      if (!DEMO_MODE && !qs.length) showMessage("Interview started. Check the response shape or configure the question endpoint in src/api.js if no question was returned.");
    } catch(e) { showMessage(errorText(e)); }
    finally { setBusy(false); }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return showMessage("Write an answer before submitting.");
    setBusy(true);
    try {
      let result;
      const q = currentQuestion;
      if (!DEMO_MODE) result = await apiPost(ENDPOINTS.interviewAnswer(session.id), { question: q, answer, questionIndex });
      else result = { score: Math.max(1, Math.min(10, Math.round(answer.trim().split(/\s+/).length / 8))), feedback: answer.trim().length < 40 ? "Your answer needs more detail. Define the concept, explain why it matters, and add a practical example." : "Good start. Make the answer stronger by explaining the underlying concept, giving a concise example, and mentioning edge cases.", question: q };
      const normalized = normalizeFeedback(result);
      setFeedback(normalized);
      setReports(prev=>({...prev,[session.id]:[...(prev[session.id]||[]),{question:q,answer, ...normalized}]}));
      setAnswer("");
    } catch(e) { showMessage(errorText(e)); }
    finally { setBusy(false); }
  };
  const currentQuestion = questionList[questionIndex] || session?.question || session?.questionText || "The backend started the session but did not return a question. Verify the interview-start response and endpoint mapping.";
  const next = () => {
    setFeedback(null); setAnswer("");
    if (questionIndex + 1 < Math.min(Number(config.totalQuestions), questionList.length)) setQuestionIndex(i=>i+1);
    else {
      const answerItems = reports[session.id] || [];
      const report = buildReport(answerItems);
      setReports(prev=>({...prev,[session.id]:report}));
      setInterviews(prev=>prev.map(i=>i.id===session.id?{...i,status:"COMPLETED",completedAt:new Date().toISOString()}:i));
      navigate(`/report/${session.id}`);
    }
  };
  const restart = () => { setSession(null); setFeedback(null); setAnswer(""); setQuestionList([]); setQuestionIndex(0); };
  if (session) return <div>
    <div className="panel interview-panel">
      <div className="interview-meta"><div><a className="session-id">Interview ID: {session.id}</a><small>Question {questionIndex+1} of {Math.min(Number(config.totalQuestions),questionList.length || Number(config.totalQuestions))}</small></div><Button variant="secondary" onClick={restart}><RotateCcw size={15}/> Restart</Button></div>
      {feedback && <div className="feedback-box"><strong>AI Feedback | Current Score: {feedback.score}</strong><p>{feedback.feedback}</p></div>}
      <h2 className="question-title">{currentQuestion}</h2>
      <form onSubmit={submit}>
        <textarea className="answer-area" placeholder="Type your answer here..." value={answer} onChange={e=>setAnswer(e.target.value)} disabled={!!feedback || busy}/>
        <div className="interview-actions">{feedback ? <Button type="button" onClick={next}>{questionIndex + 1 < Math.min(Number(config.totalQuestions),questionList.length) ? "Next Question" : "View Report"} <ArrowRight size={16}/></Button> : <Button type="submit" disabled={busy}>{busy ? <LoaderCircle className="spin" size={16}/> : <Send size={15}/>} Submit Answer <ArrowRight size={15}/></Button>}</div>
      </form>
    </div>
  </div>;
  return <div>
    <section className="panel interview-setup">
      <div className="brain-heading"><BrainCircuit size={29}/><div><h1>AI Interview Practice</h1><p>Start an interview and answer questions returned by the backend.</p></div></div>
      <form onSubmit={start}>
        <div className="form-grid interview-fields">
          <Input label="Role" value={config.role} onChange={e=>setConfig({...config,role:e.target.value})} required/>
          <SelectField label="Difficulty" value={config.difficulty} onChange={e=>setConfig({...config,difficulty:e.target.value})} options={["EASY","MEDIUM","HARD"]}/>
          <SelectField label="Experience Level" value={config.experienceLevel} onChange={e=>setConfig({...config,experienceLevel:e.target.value})} options={["FRESHER","INTERMEDIATE","EXPERIENCED"]}/>
          <Input label="Total Questions" type="number" min="1" max="20" value={config.totalQuestions} onChange={e=>setConfig({...config,totalQuestions:e.target.value})} required/>
        </div>
        <Button type="submit" disabled={busy}>{busy ? <LoaderCircle className="spin" size={16}/> : null} Start Interview</Button>
      </form>
    </section>
    <div className="hint-card"><Sparkles size={18}/><div><strong>How it works</strong><p>Answer in text. The assessment and report depend on your configured AI backend. Demo mode uses illustrative sample feedback.</p></div></div>
    {interviews.length > 0 && <section className="panel previous-interviews"><h2>Recent Interviews</h2>{interviews.slice(0,5).map(i=><div className="simple-row" key={i.id}><div><strong>{i.role || "Software Developer"}</strong><small>{i.difficulty || "MEDIUM"} · {i.status || "IN_PROGRESS"}</small></div><span className="status-chip">{i.status || "IN_PROGRESS"}</span></div>)}</section>}
  </div>;
}
function normalizeFeedback(data) {
  return { score: data.score ?? data.currentScore ?? data.rating ?? data.marks ?? 0, feedback: data.feedback ?? data.aiFeedback ?? data.message ?? data.evaluation ?? "Assessment received.", ...data };
}
function buildReport(items=[]) {
  const valid = items.filter(i=>Number.isFinite(Number(i.score)));
  const avg = valid.length ? Math.round(valid.reduce((s,i)=>s+Number(i.score),0)/valid.length*10) : 0;
  return { overallScore: avg, technicalScore: avg, communicationScore: avg, confidenceScore: avg, problemSolvingScore: avg, strengths: ["Completed a structured interview practice session"], weaknesses: ["Review the feedback attached to each answer"], suggestions: ["Practise explaining concepts with examples", "Review fundamentals relevant to your target role"], overallFeedback: "Use this report as a guide to review your answers and plan further practice.", answerItems: items };
}

function ReportPage({reports,interviews,navigate}) {
  const location = useLocation();
  const id = decodeURIComponent(location.pathname.split("/").pop());
  const report = reports[id];
  const interview = interviews.find(i=>i.id===id);
  const normalized = report || buildReport([]);
  const scores = [
    ["Overall Score", normalized.overallScore ?? normalized.overall ?? 0],
    ["Technical Score", normalized.technicalScore ?? normalized.technical ?? 0],
    ["Communication Score", normalized.communicationScore ?? normalized.communication ?? 0],
    ["Confidence Score", normalized.confidenceScore ?? normalized.confidence ?? 0],
    ["Problem Solving Score", normalized.problemSolvingScore ?? normalized.problemSolving ?? 0]
  ];
  const list = (value, fallback) => Array.isArray(value) ? value : value ? [value] : fallback;
  return <div>
    <div className="page-heading"><div><h1>AI Report</h1><p>Report loaded for interview {id}.</p></div><Button variant="secondary" onClick={()=>navigate("/interview")}><RotateCcw size={15}/> Restart</Button></div>
    {!report && <div className="notice info">No saved report was found in this browser session. In backend mode, connect the report endpoint to load persisted data.</div>}
    <div className="score-grid">{scores.map(([label,value])=><div className="score-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    <div className="report-columns">
      <ReportList title="Strengths" items={list(normalized.strengths,["Review your strongest answers after each session."])}/>
      <ReportList title="Weaknesses" items={list(normalized.weaknesses,["Identify concepts that need revision."])}/>
      <ReportList title="Suggestions" items={list(normalized.suggestions,["Practise explaining technical ideas clearly.","Review fundamentals before your next interview."])}/>
    </div>
    <section className="panel overall-feedback"><h2>Overall Feedback</h2><p>{normalized.overallFeedback || normalized.feedback || "Complete an interview to generate your report."}</p></section>
    {normalized.answerItems?.length > 0 && <section className="panel"><h2>Answer-by-answer review</h2>{normalized.answerItems.map((a,i)=><div className="answer-review" key={i}><strong>Q{i+1}. {a.question}</strong><p><b>Your answer:</b> {a.answer}</p><p><b>Score:</b> {a.score} — {a.feedback}</p></div>)}</section>}
  </div>;
}
function ReportList({title,items}) { return <section className="panel report-list"><h2>{title}</h2><ul>{items.map((x,i)=><li key={i}>{typeof x === "string" ? x : x.text || x.description || JSON.stringify(x)}</li>)}</ul></section>; }

function DsaPage({dsa,setDsa,showMessage}) {
  const [form,setForm] = useState({topic:"",difficulty:"Easy",total:"",solved:""});
  const [filter,setFilter] = useState("All");
  const [editing,setEditing] = useState(null);
  const save = async (e) => {
    e.preventDefault();
    if (!form.topic.trim()) return showMessage("Enter a DSA topic.");
    const total = Number(form.total), solved = Number(form.solved);
    if (total < 0 || solved < 0 || solved > total) return showMessage("Solved count must be between 0 and total.");
    const item = {id:editing || crypto.randomUUID(),topic:form.topic.trim(),difficulty:form.difficulty,total,solved};
    try { if(!DEMO_MODE) { const data = editing ? await apiPut(`${ENDPOINTS.dsa}/${editing}`,item) : await apiPost(ENDPOINTS.dsa,item); setDsa(prev=>editing?prev.map(x=>x.id===editing?{...item,...data}:x):[{...item,...data},...prev]); } else setDsa(prev=>editing?prev.map(x=>x.id===editing?item:x):[item,...prev]); setForm({topic:"",difficulty:"Easy",total:"",solved:""});setEditing(null);showMessage("DSA topic saved."); }
    catch(e){showMessage(errorText(e));}
  };
  const total = dsa.reduce((s,x)=>s+Number(x.total||0),0), solved=dsa.reduce((s,x)=>s+Number(x.solved||0),0);
  const visible = dsa.filter(x=>filter==="All"||x.difficulty===filter);
  return <div>
    <PageHeading title="DSA Tracker" subtitle="Track solved problems topic-wise."/>
    <section className="panel">
      <div className="filter-row"><span/><SelectField label="" value={filter} onChange={e=>setFilter(e.target.value)} options={["All","Easy","Medium","Hard"]}/></div>
      <form onSubmit={save} className="form-grid dsa-fields">
        <Input label="Topic" value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})} placeholder="e.g. Arrays and Strings" required/>
        <SelectField label="Difficulty" value={form.difficulty} onChange={e=>setForm({...form,difficulty:e.target.value})} options={["Easy","Medium","Hard"]}/>
        <Input label="Total" type="number" min="0" value={form.total} onChange={e=>setForm({...form,total:e.target.value})} required/>
        <Input label="Solved" type="number" min="0" value={form.solved} onChange={e=>setForm({...form,solved:e.target.value})} required/>
        <Button type="submit"><Plus size={15}/>{editing?"Save":"Add"}</Button>
      </form>
      <div className="overall-progress"><span>Overall Progress</span><strong>{solved}/{total} solved</strong><div className="thin-progress"><div style={{width:`${total?Math.min(100,solved/total*100):0}%`}}/></div></div>
    </section>
    <section className="dsa-list">{visible.length ? visible.map(x=><div className="panel dsa-item" key={x.id}><div className="dsa-item-icon"><ChartNoAxesColumn size={18}/></div><div className="dsa-item-main"><strong>{x.topic}</strong><small>{x.difficulty} · {x.solved}/{x.total} solved</small><div className="thin-progress"><div style={{width:`${x.total?Math.min(100,x.solved/x.total*100):0}%`}}/></div></div><button className="small-btn" onClick={()=>{setEditing(x.id);setForm({topic:x.topic,difficulty:x.difficulty,total:String(x.total),solved:String(x.solved)});}}><Pencil size={14}/> Edit</button><button className="icon-btn danger" onClick={async()=>{try{if(!DEMO_MODE)await apiDelete(`${ENDPOINTS.dsa}/${x.id}`);setDsa(prev=>prev.filter(y=>y.id!==x.id));showMessage("Topic removed.");}catch(e){showMessage(errorText(e));}}}><Trash2 size={15}/></button></div>) : <EmptyState title="No DSA topics added" subtitle="Add topics above to start tracking your practice."/>}</section>
  </div>;
}

function PlacementPage({placements,setPlacements,showMessage}) {
  const empty = {companyName:"",role:"",packageOffered:"",location:"",applicationDate:"",status:"APPLIED",nextInterviewDate:"",notes:""};
  const [form,setForm] = useState(empty), [filter,setFilter] = useState("All"), [editing,setEditing] = useState(null);
  const save = async (e) => {
    e.preventDefault();
    if(!form.companyName.trim()||!form.role.trim()) return showMessage("Company and role are required.");
    const item = {id:editing||crypto.randomUUID(),...form};
    try { if(!DEMO_MODE){const data=editing?await apiPut(`${ENDPOINTS.placements}/${editing}`,item):await apiPost(ENDPOINTS.placements,item);setPlacements(prev=>editing?prev.map(x=>x.id===editing?{...item,...data}:x):[item,...prev]);}else setPlacements(prev=>editing?prev.map(x=>x.id===editing?item:x):[item,...prev]);setForm(empty);setEditing(null);showMessage("Placement record saved.");}
    catch(e){showMessage(errorText(e));}
  };
  const visible = placements.filter(p=>filter==="All"||p.status===filter);
  const edit = p => {setEditing(p.id);setForm({...empty,...p});};
  return <div>
    <PageHeading title="Placement Tracker" subtitle="Track application status through backend placement APIs." action={<Button variant="secondary" onClick={async()=>{if(DEMO_MODE)return;try{const d=await apiGet(ENDPOINTS.placements);setPlacements(Array.isArray(d)?d:[]);}catch(e){showMessage(errorText(e));}}}><RefreshCw size={15}/> Refresh</Button>}/>
    <section className="panel">
      <form onSubmit={save} className="form-grid placement-fields">
        <Input label="Company Name" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} required/>
        <Input label="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} required/>
        <Input label="Package Offered" value={form.packageOffered} onChange={e=>setForm({...form,packageOffered:e.target.value})} placeholder="e.g. 10 LPA"/>
        <Input label="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <Input label="Application Date" type="date" value={form.applicationDate} onChange={e=>setForm({...form,applicationDate:e.target.value})}/>
        <SelectField label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})} options={["APPLIED","OA","INTERVIEW","OFFER_RECEIVED","REJECTED","WITHDRAWN"]}/>
        <Input label="Next Interview Date" type="date" value={form.nextInterviewDate} onChange={e=>setForm({...form,nextInterviewDate:e.target.value})}/>
        <Input label="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        <Button type="submit"><Plus size={15}/>{editing?"Save":"Add"}</Button>
      </form>
    </section>
    <section className="panel placement-results">
      <div className="results-filter"><Field label="Filter by Status"><select value={filter} onChange={e=>setFilter(e.target.value)}>{["All","APPLIED","OA","INTERVIEW","OFFER_RECEIVED","REJECTED","WITHDRAWN"].map(x=><option key={x}>{x}</option>)}</select></Field><Button variant="secondary"><Search size={15}/> Apply</Button></div>
      {visible.length ? <div className="table-wrap"><table><thead><tr><th>Company / Role</th><th>Package</th><th>Applied</th><th>Status</th><th>Next interview</th><th>Actions</th></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><strong>{p.companyName}</strong><small>{p.role}</small></td><td>{p.packageOffered||"—"}</td><td>{p.applicationDate||"—"}</td><td><span className={`status-chip ${p.status==="OFFER_RECEIVED"?"success":""}`}>{p.status}</span></td><td>{p.nextInterviewDate||"—"}</td><td><button className="icon-btn" onClick={()=>edit(p)}><Pencil size={15}/></button><button className="icon-btn danger" onClick={async()=>{try{if(!DEMO_MODE)await apiDelete(`${ENDPOINTS.placements}/${p.id}`);setPlacements(prev=>prev.filter(x=>x.id!==p.id));showMessage("Record deleted.");}catch(e){showMessage(errorText(e));}}}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div> : <div className="muted-empty">No placements found.</div>}
    </section>
  </div>;
}

function ProfilePage({profile,setProfile,showMessage}) {
  const [form,setForm] = useState(profile);
  useEffect(()=>setForm(profile),[profile]);
  const load = async()=>{if(DEMO_MODE)return;try{const data=await apiGet(ENDPOINTS.profile);const next={...profile,...data};setProfile(next);setForm(next);}catch(e){showMessage(errorText(e));}};
  const save = async(e)=>{e.preventDefault();try{if(!DEMO_MODE){const data=await apiPut(ENDPOINTS.profile,form);setProfile({...form,...data});}else setProfile(form);showMessage("Profile saved.");}catch(e){showMessage(errorText(e));}};
  return <div>
    <PageHeading title="Profile" subtitle={form.name || "Student profile"} action={<Button variant="secondary" onClick={load}><RefreshCw size={15}/> Refresh</Button>}/>
    <section className="panel"><form onSubmit={save}>
      <div className="form-grid profile-fields">
        <Input label="Phone" value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <Input label="College" value={form.college||""} onChange={e=>setForm({...form,college:e.target.value})}/>
        <Input label="Branch" value={form.branch||""} onChange={e=>setForm({...form,branch:e.target.value})}/>
        <Input label="CGPA" type="number" step="0.01" value={form.cgpa||""} onChange={e=>setForm({...form,cgpa:e.target.value})}/>
        <Input label="Graduation Year" type="number" value={form.graduationYear||""} onChange={e=>setForm({...form,graduationYear:e.target.value})}/>
        <Input label="Profile Image URL" value={form.profileImageUrl||""} onChange={e=>setForm({...form,profileImageUrl:e.target.value})}/>
        <Input label="GitHub" value={form.github||""} onChange={e=>setForm({...form,github:e.target.value})}/>
        <Input label="LinkedIn" value={form.linkedin||""} onChange={e=>setForm({...form,linkedin:e.target.value})}/>
        <Input label="LeetCode" value={form.leetcode||""} onChange={e=>setForm({...form,leetcode:e.target.value})}/>
        <Input label="Resume URL" value={form.resumeUrl||""} onChange={e=>setForm({...form,resumeUrl:e.target.value})}/>
        <Input label="Skills" value={form.skills||""} onChange={e=>setForm({...form,skills:e.target.value})}/>
      </div>
      <Field label="Bio"><textarea className="bio-area" value={form.bio||""} onChange={e=>setForm({...form,bio:e.target.value})}/></Field>
      <Button type="submit"><CheckCircle2 size={16}/> Save Profile</Button>
    </form></section>
  </div>;
}

function CompaniesPage() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const companies = demoSeed.companies.filter(c=>(category==="All"||c.category===category)&&`${c.name} ${c.focus}`.toLowerCase().includes(query.toLowerCase()));
  return <div><PageHeading title="Company Preparation" subtitle="Explore common preparation focus areas by company."/><section className="panel"><div className="search-tools"><div className="search-input"><Search size={16}/><input placeholder="Search companies or topics..." value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option><option>Product</option><option>Consulting</option></select></div><div className="company-grid">{companies.map(c=><div className="company-card" key={c.name}><div className="company-logo">{c.name.slice(0,1)}</div><span className="status-chip">{c.category}</span><h3>{c.name}</h3><p>Suggested preparation focus</p><div className="focus-tags">{c.focus.split(", ").map(t=><span key={t}>{t}</span>)}</div><button className="text-link" onClick={()=>alert(`Preparation topics for ${c.name}: ${c.focus}`)}>View focus areas <ArrowRight size={14}/></button></div>)}</div></section><p className="disclaimer">Company focus areas are starter guidance, not official or live hiring information.</p></div>;
}

function RoadmapPage({dsa,interviews,navigate}) {
  const topics = [
    {title:"Core programming & OOP",desc:"Revise classes, interfaces, inheritance, exceptions and collections.",tag:"Java",priority:"High",time:"3 sessions"},
    {title:"Arrays, strings & hashing",desc:"Practise common patterns and explain time/space complexity.",tag:"DSA",priority:"High",time:"5 sessions"},
    {title:"SQL & database fundamentals",desc:"Review joins, indexes, normalization and query reasoning.",tag:"Database",priority:"Medium",time:"2 sessions"},
    {title:"Mock interview practice",desc:"Answer aloud or in writing using a clear structure and examples.",tag:"Interview",priority:"High",time:"2 sessions"},
    {title:"Resume and project storytelling",desc:"Prepare concise explanations of architecture, trade-offs and impact.",tag:"Career",priority:"Medium",time:"1 session"}
  ];
  const solved=dsa.reduce((s,x)=>s+Number(x.solved||0),0), total=dsa.reduce((s,x)=>s+Number(x.total||0),0);
  return <div><PageHeading title="Personalized Study Roadmap" subtitle="A practical plan based on the modules and progress available in PlacePrep."/><div className="roadmap-summary"><div><span>Interview sessions</span><strong>{interviews.length}</strong></div><div><span>DSA problems solved</span><strong>{solved}/{total}</strong></div><div><span>Recommended focus</span><strong>{total && solved/Math.max(1,total)<.5?"DSA fundamentals":"Interview readiness"}</strong></div></div><div className="roadmap-list">{topics.map((t,i)=><div className="panel roadmap-item" key={t.title}><div className="roadmap-step">{String(i+1).padStart(2,"0")}</div><div className="roadmap-body"><div className="roadmap-title-row"><h3>{t.title}</h3><span className={`priority ${t.priority.toLowerCase()}`}>{t.priority} priority</span></div><p>{t.desc}</p><div className="roadmap-meta"><span>{t.tag}</span><span><Clock3 size={13}/>{t.time}</span></div></div><button className="icon-btn" onClick={()=>navigate(t.tag==="Interview"?"/interview":t.tag==="DSA"?"/dsa":"/profile")} title="Open module"><ChevronRight size={18}/></button></div>)}</div><p className="disclaimer">This starter roadmap uses transparent rule-based suggestions. Connect a backend recommendation endpoint to make it data-driven across saved reports and profile history.</p></div>;
}

function AuthPage({onLogin}) {
  const [mode,setMode] = useState("login"), [email,setEmail] = useState("rashi@example.com"), [password,setPassword] = useState(""), [name,setName] = useState("Rashi Verma"), [busy,setBusy] = useState(false), [error,setError] = useState("");
  const submit = async(e) => {e.preventDefault();setBusy(true);setError("");try{if(DEMO_MODE){onLogin({name:name||email.split("@")[0],email},"demo-token");return;}const path=mode==="login"?ENDPOINTS.login:ENDPOINTS.register;const data=await apiPost(path,mode==="login"?{email,password}:{name,email,password});const token=data.token||data.accessToken;if(token)localStorage.setItem("placeprep_token",token);onLogin(data.user||data,token);}catch(e){setError(errorText(e));}finally{setBusy(false);}};
  return <div className="auth-screen"><div className="auth-art"><div className="auth-logo">P</div><h1>Prepare with clarity.</h1><p>One workspace for interviews, practice progress, and your placement journey.</p><div className="auth-art-card"><Sparkles size={22}/><span>Small steps. Better interviews.</span></div></div><div className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><div className="eyebrow">WELCOME TO PLACEPREP</div><h2>{mode==="login"?"Sign in to your account":"Create your account"}</h2><p>Keep your preparation organized in one place.</p>{mode==="register"&&<Input label="Full name" value={name} onChange={e=>setName(e.target.value)} required/>}<Input label="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" required/><Notice message={error} onClose={()=>setError("")}/><Button type="submit" disabled={busy}>{busy?"Please wait":mode==="login"?"Sign in":"Create account"} <ArrowRight size={16}/></Button><div className="auth-switch">{mode==="login"?"New to PlacePrep?":"Already have an account?"} <button type="button" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create account":"Sign in"}</button></div>{DEMO_MODE&&<small className="demo-note">Demo mode: any email/password opens the sample dashboard.</small>}</form></div></div>;
}

function normalizeProfile(p) { return { ...demoSeed.profile, ...p, name: p?.name || p?.fullName || "Rashi Verma" }; }
function errorText(e) { return e?.response?.data?.message || e?.response?.data?.error || e?.message || "Something went wrong."; }
function Loading() { return <div className="loading"><LoaderCircle className="spin"/> Loading...</div>; }

export default function App() {
  const [loggedIn,setLoggedIn] = useState(()=>Boolean(localStorage.getItem("placeprep_demo_session")||localStorage.getItem("placeprep_token")));
  const [profile,setProfile] = useStore("profile",demoSeed.profile);
  const [resumes,setResumes] = useStore("resumes",demoSeed.resumes);
  const [dsa,setDsa] = useStore("dsa",demoSeed.dsa);
  const [placements,setPlacements] = useStore("placements",demoSeed.placements);
  const [interviews,setInterviews] = useStore("interviews",demoSeed.interviews);
  const [reports,setReports] = useStore("reports",demoSeed.reports);
  const [message,setMessage] = useState("");
  const location = useLocation(), navigate = useNavigate();
  useEffect(()=>{if(message){const timer=setTimeout(()=>setMessage(""),4200);return()=>clearTimeout(timer);}},[message]);
  useEffect(()=>{if(loggedIn&&!DEMO_MODE){apiGet(ENDPOINTS.profile).then(d=>setProfile(normalizeProfile(d))).catch(()=>{});}},[loggedIn]);
  const onLogin = (user,token) => {if(token) localStorage.setItem("placeprep_token",token);localStorage.setItem("placeprep_demo_session","true");setProfile(prev=>normalizeProfile({...prev,...user}));setLoggedIn(true);navigate("/");};
  const logout = () => {localStorage.removeItem("placeprep_token");localStorage.removeItem("placeprep_demo_session");setLoggedIn(false);navigate("/");};
  if(!loggedIn) return <AuthPage onLogin={onLogin}/>;
  return <AppShell profile={profile} onLogout={logout}>
    {message && <Notice message={message} onClose={()=>setMessage("")}/>}
    <Routes>
      <Route path="/" element={<Dashboard profile={profile} resumes={resumes} dsa={dsa} placements={placements} interviews={interviews} navigate={navigate}/>}/>
      <Route path="/resume" element={<ResumePage resumes={resumes} setResumes={setResumes} showMessage={setMessage}/>}/>
      <Route path="/interview" element={<InterviewPage interviews={interviews} setInterviews={setInterviews} reports={reports} setReports={setReports} showMessage={setMessage} navigate={navigate}/>}/>
      <Route path="/report/:id" element={<ReportPage reports={reports} interviews={interviews} navigate={navigate}/>}/>
      <Route path="/dsa" element={<DsaPage dsa={dsa} setDsa={setDsa} showMessage={setMessage}/>}/>
      <Route path="/placement" element={<PlacementPage placements={placements} setPlacements={setPlacements} showMessage={setMessage}/>}/>
      <Route path="/profile" element={<ProfilePage profile={profile} setProfile={setProfile} showMessage={setMessage}/>}/>
      <Route path="/companies" element={<CompaniesPage/>}/>
      <Route path="/roadmap" element={<RoadmapPage dsa={dsa} interviews={interviews} navigate={navigate}/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  </AppShell>;
}
