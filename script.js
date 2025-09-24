/* script.js
   - Simple static quiz engine
   - 25 questions (5 per page)
   - Answer options map to interest categories
   - After completion, the top category becomes recommended stream/branch + career options
   - College suggestion shown only when level === "12"
*/

// --- Data: 25 questions (each option maps to a category id) ---
const QUESTIONS = [  { q: "Which activity sounds most appealing to you?",
    opts: [
      {t:"Designing a robot or circuitry", c:"STEM"},
      {t:"Running a small business or selling stuff", c:"COM"},
      {t:"Writing stories or performing", c:"ARTS"},
      {t:"Solving math puzzles", c:"STEM"}
    ]
  },
  { q: "Which school subject do you like most?",
    opts:[
      {t:"Mathematics", c:"STEM"},
      {t:"Economics/Accounts", c:"COM"},
      {t:"English/History", c:"ARTS"},
      {t:"Computer Science", c:"STEM"}
    ]
  },
  { q: "What kind of job appeals to you?",
    opts:[
      {t:"Software developer / Data work", c:"STEM"},
      {t:"Banking / Business", c:"COM"},
      {t:"Teacher / Writer / Designer", c:"ARTS"},
      {t:"Engineer / Researcher", c:"STEM"}
    ]
  },
  { q: "Pick a weekend activity",
    opts:[
      {t:"Tinkering with electronics", c:"STEM"},
      {t:"Managing a marketplace stall", c:"COM"},
      {t:"Attending drama/music class", c:"ARTS"},
      {t:"Building a small website", c:"STEM"}
    ]
  },
  { q: "How do you prefer learning?",
    opts:[
      {t:"Hands-on experiments", c:"STEM"},
      {t:"Case studies and numbers", c:"COM"},
      {t:"Reading & discussions", c:"ARTS"},
      {t:"Online project courses", c:"STEM"}
    ]
  },
  { q: "Which problem would you rather solve?",
    opts:[
      {t:"Improve app performance", c:"STEM"},
      {t:"Increase product sales", c:"COM"},
      {t:"Create a short film", c:"ARTS"},
      {t:"Design a functional gadget", c:"STEM"}
    ]
  },
  { q: "What appeals more in a career?",
    opts:[
      {t:"Continuous tech learning", c:"STEM"},
      {t:"Business growth & profits", c:"COM"},
      {t:"Creative freedom", c:"ARTS"},
      {t:"Structured engineering roles", c:"STEM"}
    ]
  },
  { q: "If you had to pick a club at school, you'd join:",
    opts:[
      {t:"Robotics / Coding club", c:"STEM"},
      {t:"Commerce & Entrepreneurship club", c:"COM"},
      {t:"Drama / Arts club", c:"ARTS"},
      {t:"Math club", c:"STEM"}
    ]
  },
  { q: "What kind of internship sounds fun?",
    opts:[
      {t:"Work at a tech startup", c:"STEM"},
      {t:"Intern in a retail company", c:"COM"},
      {t:"Assist in a creative studio", c:"ARTS"},
      {t:"Intern in an engineering firm", c:"STEM"}
    ]
  },
  { q: "Which tool would you rather master?",
    opts:[
      {t:"Python / Data tools", c:"STEM"},
      {t:"Excel & accounting tools", c:"COM"},
      {t:"Adobe Suite / Camera", c:"ARTS"},
      {t:"CAD / Simulation tools", c:"STEM"}
    ]
  },
  { q: "Do you prefer working:",
    opts:[
      {t:"With systems and algorithms", c:"STEM"},
      {t:"With customers and sales", c:"COM"},
      {t:"On stories and visuals", c:"ARTS"},
      {t:"On designing physical things", c:"STEM"}
    ]
  },
  { q: "Which statement fits you?",
    opts:[
      {t:"I enjoy logical challenges", c:"STEM"},
      {t:"I enjoy negotiating and planning", c:"COM"},
      {t:"I enjoy expressing ideas", c:"ARTS"},
      {t:"I enjoy building tangible products", c:"STEM"}
    ]
  },
  { q: "Pick a future workplace",
    opts:[
      {t:"A tech company", c:"STEM"},
      {t:"A bank or firm", c:"COM"},
      {t:"A creative agency", c:"ARTS"},
      {t:"A manufacturing plant", c:"STEM"}
    ]
  },
  { q: "Which project would excite you?",
    opts:[
      {t:"Make a mobile app", c:"STEM"},
      {t:"Start a mini online shop", c:"COM"},
      {t:"Shoot a short documentary", c:"ARTS"},
      {t:"Build a small robot", c:"STEM"}
    ]
  },
  { q: "How do you handle problems?",
    opts:[
      {t:"Break into steps and test", c:"STEM"},
      {t:"Analyze cost & benefit", c:"COM"},
      {t:"Use intuition and creativity", c:"ARTS"},
      {t:"Prototype a solution", c:"STEM"}
    ]
  },
  { q: "Which book would you pick?",
    opts:[
      {t:"A programming / algorithms book", c:"STEM"},
      {t:"A business case study", c:"COM"},
      {t:"A novel or memoir", c:"ARTS"},
      {t:"A DIY electronics guide", c:"STEM"}
    ]
  },
  { q: "In a team you usually:",
    opts:[
      {t:"Handle technical tasks", c:"STEM"},
      {t:"Manage the plan and resources", c:"COM"},
      {t:"Work on ideas and presentation", c:"ARTS"},
      {t:"Test and improve the prototype", c:"STEM"}
    ]
  },
  { q: "Which class activity energizes you?",
    opts:[
      {t:"Science lab experiments", c:"STEM"},
      {t:"Business simulations", c:"COM"},
      {t:"Group discussions and debates", c:"ARTS"},
      {t:"Coding challenges", c:"STEM"}
    ]
  },
  { q: "What kind of online course would you choose?",
    opts:[
      {t:"Machine learning / coding", c:"STEM"},
      {t:"Marketing / finance", c:"COM"},
      {t:"Creative writing / photography", c:"ARTS"},
      {t:"Electronics & prototyping", c:"STEM"}
    ]
  },
  { q: "Which description fits your thinking style?",
    opts:[
      {t:"Analytical and systematic", c:"STEM"},
      {t:"Practical and business-minded", c:"COM"},
      {t:"Imaginative and expressive", c:"ARTS"},
      {t:"Hands-on problem solver", c:"STEM"}
    ]
  },
  { q: "What would you rather present at a fair?",
    opts:[
      {t:"A working tech demo", c:"STEM"},
      {t:"A business idea/product", c:"COM"},
      {t:"An art installation or performance", c:"ARTS"},
      {t:"A mechanical prototype", c:"STEM"}
    ]
  },
  { q: "Which exam topic do you study first?",
    opts:[
      {t:"Data structures / formulas", c:"STEM"},
      {t:"Accounts / economics basics", c:"COM"},
      {t:"Literature & current affairs", c:"ARTS"},
      {t:"Design / drawing for tech", c:"STEM"}
    ]
  },
  { q: "How do you pick an online video to watch?",
    opts:[
      {t:"Tutorials & explanations", c:"STEM"},
      {t:"Business tips & hacks", c:"COM"},
      {t:"Short films or music", c:"ARTS"},
      {t:"Maker / DIY content", c:"STEM"}
    ]
  },
  { q: "If you had to pick a minor skill, you'd choose:",
    opts:[
      {t:"Programming or math tricks", c:"STEM"},
      {t:"Digital marketing / selling", c:"COM"},
      {t:"Sketching / writing", c:"ARTS"},
      {t:"3D printing / electronics", c:"STEM"}
    ]
  },
  { q: "Which of these would feel most satisfying?",
    opts:[
      {t:"Solving a tricky algorithm", c:"STEM"},
      {t:"Closing a good deal", c:"COM"},
      {t:"Receiving praise for a creative piece", c:"ARTS"},
      {t:"Seeing a device you built work", c:"STEM"}
    ]
  } ];

// --- Streams / branches mapping for 10th and 12th results ---
const STREAM_MAP_10 = {
  STEM: { name: "Science (PCB/PCM)", desc: "Suitable if you like math, experiments, and tech-oriented topics.", icon:"🔬",
          careers:["Doctor","Engineer","Scientist","Software Developer"] },
  COM:  { name: "Commerce", desc: "Good if you like business, accounts, and entrepreneurship.", icon:"💼",
          careers:["Accountant","CA","Banker","Entrepreneur"] },
  ARTS: { name: "Arts / Humanities", desc: "Fit for creative, textual, and social-sciences interests.", icon:"🎨",
          careers:["Journalist","Designer","Teacher","Lawyer"] }
};

const STREAM_MAP_12 = {
  STEM: { name: "Engineering / Computer Science", desc: "Branches like CS, ECE, ME depending on interests.", icon:"💻",
          careers:["Software Engineer","Data Scientist","Civil Engineer","Mechanical Engineer"] },
  COM:  { name: "B.Com / Business", desc: "Commerce routes like B.Com, BBA, banking & finance.", icon:"📊",
          careers:["Chartered Accountant","Investment Banker","Business Analyst","Manager"] },
  ARTS: { name: "BA / Design / Media", desc: "Creative & humanities-focused degrees.", icon:"🎭",
          careers:["Writer","Graphic Designer","Psychologist","Media Professional"] }
};

// Sample college data keyed by stream id (used only for level 12)
const COLLEGES = {
  STEM: { name: "Government Engineering College, ExampleCity", location: "ExampleCity, State", highlights: "Known for engineering & placements; strong labs." },
  COM:  { name: "Government Commerce College, ExampleTown", location: "ExampleTown, State", highlights: "Offers B.Com & BBA programs with specialization." },
  ARTS: { name: "Government Arts College, SampleCity", location: "SampleCity, State", highlights: "Strong humanities & arts departments." }
};

// --- App state ---
let state = {
  level: "10",            
  page: 0,                
  answers: Array(QUESTIONS.length).fill(null)
};

// DOM
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const quizForm = document.getElementById('quizForm');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const levelBadge = document.getElementById('levelBadge');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultCard = document.getElementById('resultCard');
const collegeCard = document.getElementById('collegeCard');
const restartBtn = document.getElementById('restartBtn');
const collegeSection = document.getElementById('collegeSection');

// --- Helpers ---
function show(el){ el.classList.remove('hidden') }
function hide(el){ el.classList.add('hidden') }

// --- Attach level buttons ---
document.querySelectorAll('.level-buttons .btn').forEach(btn=>{
  btn.addEventListener('click', () => {
    state.level = btn.dataset.level;
    levelBadge.textContent = `Level: ${state.level}`;
    startQuiz();
  });
});

// Start quiz
function startQuiz(){
  hide(startScreen);
  hide(resultScreen);
  show(quizScreen);
  state.page = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  renderPage();
  updateNav();
}

// Render 5 questions for current page
function renderPage(){
  quizForm.innerHTML = '';
  const perPage = 5;
  const startIdx = state.page * perPage;
  const endIdx = Math.min(QUESTIONS.length, startIdx + perPage);
  for(let i=startIdx;i<endIdx;i++){
    const q = QUESTIONS[i];
    const qEl = document.createElement('div');
    qEl.className = 'question';
    qEl.dataset.qIdx = i;
    qEl.innerHTML = `
      <div class="q-title">Q${i+1}. ${q.q}</div>
      <div class="options"></div>
    `;
    const optsWrap = qEl.querySelector('.options');
    q.opts.forEach(opt => {
      const optEl = document.createElement('div');
      optEl.className = 'option';
      optEl.tabIndex = 0;
      optEl.textContent = opt.t;
      optEl.dataset.cat = opt.c;
      optEl.addEventListener('click', ()=> selectOption(i,opt.c,optEl));
      optEl.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') selectOption(i,opt.c,optEl) });
      if(state.answers[i] && state.answers[i] === opt.c) optEl.classList.add('selected');
      optsWrap.appendChild(optEl);
    });
    quizForm.appendChild(qEl);
  }

  const totalPages = Math.ceil(QUESTIONS.length / 5);
  progressText.textContent = `Page ${state.page+1} of ${totalPages}`;
  const pct = Math.round(((state.page) / (totalPages - 1)) * 100);
  progressBar.style.width = `${pct}%`;
}

// select option
function selectOption(qIdx, category, element){
  state.answers[qIdx] = category;
  const card = element.closest('.question');
  card.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  element.classList.add('selected');
}

// Nav
prevBtn.addEventListener('click', ()=>{
  if(state.page > 0){
    state.page--;
    renderPage();
    updateNav();
  } else {
    show(startScreen);
    hide(quizScreen);
  }
});

nextBtn.addEventListener('click', ()=>{
  const totalPages = Math.ceil(QUESTIONS.length / 5);
  if(state.page < totalPages - 1){
    state.page++;
    renderPage();
    updateNav();
  } else {
    evaluateAnswers();
  }
});

function updateNav(){
  const totalPages = Math.ceil(QUESTIONS.length / 5);
  prevBtn.disabled = state.page === 0;
  nextBtn.textContent = (state.page < totalPages - 1) ? 'Next' : 'See Recommendation';
}

// Evaluate
function evaluateAnswers(){
  const tally = {STEM:0, COM:0, ARTS:0};
  state.answers.forEach(cat => { if(cat && tally.hasOwnProperty(cat)) tally[cat]++; });

  let top = 'STEM';
  if(!(tally.STEM || tally.COM || tally.ARTS)) {
    top = 'STEM';
  } else {
    const order = ['STEM','COM','ARTS'];
    top = order.reduce((best,cur)=> tally[cur]>tally[best]?cur:best, 'STEM');
  }

  const map = state.level === '10' ? STREAM_MAP_10 : STREAM_MAP_12;
  const chosen = map[top];

  resultCard.innerHTML = `
    <div class="result-icon">${chosen.icon}</div>
    <div class="result-content">
      <div class="result-title">${chosen.name}</div>
      <div class="result-desc">${chosen.desc}</div>
      <div class="small" style="margin-top:8px">Score — STEM: ${tally.STEM} · Commerce: ${tally.COM} · Arts: ${tally.ARTS}</div>
      <div class="careers" style="margin-top:12px">
        <strong>Pursuable Careers:</strong>
        <ul>${chosen.careers.map(c=>`<li>${c}</li>`).join('')}</ul>
      </div>
    </div>
  `;

  if(state.level === '12'){
    collegeSection.classList.remove('hidden');
    const college = COLLEGES[top];
    collegeCard.innerHTML = `
      <div class="colge-left">${top}</div>
      <div class="college-content">
        <div style="font-weight:800">${college.name}</div>
        <div class="small">${college.location}</div>
        <div class="small" style="margin-top:6px">${college.highlights}</div>
      </div>
    `;
  } else {
    collegeSection.classList.add('hidden');
    collegeCard.innerHTML = '';
  }

  hide(quizScreen);
  show(resultScreen);
}

// Restart
restartBtn.addEventListener('click', () => {
  hide(resultScreen);
  show(startScreen);
  state = { level: "10", page:0, answers: Array(QUESTIONS.length).fill(null) };
  collegeSection.classList.remove('hidden');
});
