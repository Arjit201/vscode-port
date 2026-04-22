const express = require("express");
const cors    = require("cors");
const app     = express();
const PORT    = 5000;

app.use(cors());
app.use(express.json());

const data = {
  profile: {
    name:     "Arjit Sharma",
    role:     "Mathematics & Computing · DTU",
    location: "Delhi, India",
    cgpa:     8.69,
    expected: "May 2027",
    focus: [
      "Low-latency systems & trading engines",
      "Machine learning & RAG pipelines",
      "Financial engineering & quant models",
      "Building things that are fast & correct",
    ],
    learning: {
      reading:   "Designing Data-Intensive Applications",
      exploring: "Stochastic calculus & options pricing",
      building:  "Distributed systems from scratch",
    },
    social: {
      github:   { label: "github.com/Arjit201",       url: "https://github.com/Arjit201",                desc: "View source code and repositories" },
      linkedin: { label: "linkedin.com/in/arjit-sharma", url: "https://linkedin.com/in/arjit-sharma",    desc: "Professional profile & experience" },
      email:    { label: "arjitsharma201@gmail.com",  url: "mailto:arjitsharma201@gmail.com",            desc: "arjitsharma201@gmail.com" },
      leetcode: { label: "leetcode.com/Arjit201",     url: "https://leetcode.com/Arjit201",              desc: "Competitive programming profile" },
    },
  },

  skills: [
    { category: "languages",  color: "blue",   items: ["Python","C++","Java","JavaScript","SQL","MATLAB","Kotlin"] },
    { category: "frameworks", color: "green",  items: ["Spring Boot","FastAPI","React","Node.js","Streamlit","MongoDB","PyTorch","scikit-learn"] },
    { category: "tools",      color: "purple", items: ["Git","MySQL","BigQuery","Power BI","WebSockets","FAISS"] },
    { category: "domain",     color: "orange", items: ["Machine Learning","Financial Engineering","Stochastic Processes","Probability & Stats","ETL/ELT"] },
  ],

  proficiency: [
    { lang: "Python",     fill: 8 },
    { lang: "Java",       fill: 7 },
    { lang: "C++",        fill: 6 },
    { lang: "JavaScript", fill: 5 },
    { lang: "SQL",        fill: 6 },
  ],

  projects: [
    { id:"p1", title:"Real-Time Limit Order Book",      stack:["Java","Spring Boot","WebSockets","TypeScript","Material UI"], desc:"Full-stack trading system with price-time priority matching engine, bid/ask depth across 50+ price levels, live candlestick charts across 4 timeframes.", metric:"1000+ orders/min · O(log N) · <100ms latency",              github:"https://github.com/Arjit201/orderbook" },
    { id:"p2", title:"Grounded RAG — Insurance",        stack:["Python","FAISS","SentenceTransformers","FastAPI","Llama.cpp"], desc:"RAG system over insurance policy PDFs with citation-backed answers. Indexed 1.4K+ chunks, runs fully locally with no external API dependencies.", metric:"159.98 QPS · 6.3ms latency · 90% grounding score",          github:"https://github.com/Arjit201/Text-Support-System" },
    { id:"p3", title:"MILLION Portfolio Optimizer",     stack:["Python","PyTorch","CVXPY","FastAPI","Streamlit","yfinance"], desc:"PVLDB 2024 framework implementation. LSTM + Spatial Attention with controllable risk. Supports DOW30, NASDAQ100, and custom tickers.", metric:"Sharpe / MinDrawdown optimized · DOW30 · NASDAQ100",         github:"https://github.com/Arjit201/million-Portfolio-optimization" },
    { id:"p4", title:"AllerGuard Chrome Extension",     stack:["JavaScript","HTML","CSS","Chrome Extension API"], desc:"Auto-detects EU Big 14 food & cosmetic allergens on Amazon, BigBasket, Blinkit, Sephora, Nykaa. Personalizable per user.", metric:"EU Big 14 covered · 5 major e-commerce sites",                github:"https://github.com/Arjit201/allergen-extension" },
    { id:"p5", title:"Movie Recommender System",        stack:["Python","scikit-learn","Streamlit","Pandas","NumPy"], desc:"Content-based engine on TMDB 5000. TF-IDF vectorization + cosine similarity for top-5 recommendations.", metric:"75.92% precision · 5000 movies",                              github:"https://github.com/Arjit201/movie-recommender" },
    { id:"p6", title:"Money Tracker (MERN)",            stack:["MongoDB","Express","React","Node.js"], desc:"Full-stack expense tracker — log, categorise and visualise monthly spending.", metric:"Full CRUD · MERN stack",                                     github:"https://github.com/Arjit201/money-tracker" },
    { id:"p7", title:"Calories Prediction",             stack:["Python","XGBoost","HTML"], desc:"Predicts calories burnt using XGBRegressor from 6 workout inputs: gender, age, HR, duration, height, weight.", metric:"XGBRegressor · 6 input features",                              github:"https://github.com/Arjit201/Calories-Prediction" },
  ],

  experience: [
    {
      role:   "Avionics Technician",
      org:    "Unmanned Aerial Systems (UAS), DTU",
      period: "Aug 2023 – Oct 2023",
      points: [
        "Assembled, configured, and calibrated UAVs including hardware interfacing and sensor integration.",
        "Deployed ArduPilot scripts to automate UAV functions and enhance flight behaviour.",
      ],
    },
  ],

  education: [
    { degree: "B.Tech — Mathematics and Computing", inst: "Delhi Technological University", period: "Aug 2023 – May 2027", score: "8.69" },
    { degree: "Class XII · CBSE",                  inst: "Kendriya Vidyalaya",             period: "2022",               score: "94.6%" },
  ],

  courses: [
    { title: "Financial Engineering & Risk Management", platform: "Coursera — Columbia University", year: "2024" },
    { title: "Machine Learning Specialization",         platform: "Coursera — DeepLearning.AI",    year: "2024" },
    { title: "NPTEL: Data Structures & Algorithms",    platform: "IIT Madras",                    year: "2023" },
  ],

  terminal: [
    { type: "prompt",  cmd:  "git log --oneline -5" },
    { type: "out",     text: "a1f3d92 feat: WebSocket order book streaming" },
    { type: "out",     text: "b9c2e11 feat: grounded RAG · FAISS 159.98 QPS" },
    { type: "out",     text: "3d8a771 feat: MILLION portfolio optimizer" },
    { type: "out",     text: "f12bc40 feat: allergen extension · EU Big 14" },
    { type: "out",     text: "99e2d01 init: MERN money tracker" },
    { type: "blank" },
    { type: "prompt",  cmd:  "node -v && java --version" },
    { type: "success", text: "v20.11.0" },
    { type: "success", text: "openjdk 21.0.2 2024-01-16" },
    { type: "blank" },
    { type: "prompt",  cmd:  'echo "Open to internships & opportunities 🚀"' },
    { type: "success", text: "Open to internships & opportunities 🚀" },
    { type: "blank" },
    { type: "cursor" },
  ],
};

app.get("/api/all",         (req, res) => res.json(data));
app.get("/api/profile",     (req, res) => res.json(data.profile));
app.get("/api/skills",      (req, res) => res.json(data.skills));
app.get("/api/proficiency", (req, res) => res.json(data.proficiency));
app.get("/api/projects",    (req, res) => res.json(data.projects));
app.get("/api/experience",  (req, res) => res.json(data.experience));
app.get("/api/education",   (req, res) => res.json(data.education));
app.get("/api/courses",     (req, res) => res.json(data.courses));
app.get("/api/terminal",    (req, res) => res.json(data.terminal));

app.listen(PORT, () => console.log(`Server → http://localhost:${PORT}`));
