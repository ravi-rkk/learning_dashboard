import notesStore from './data/notes-store.json';
import { DEFAULT_NOTES_V2 } from './data/notesDefaults.js';

export const USERS = { admin: 'admin123', dev: 'dev123' };

/** Live notebook — loaded from src/data/notes-store.json (admin saves update this file in dev) */
export const NOTES_V2 = notesStore;
export { DEFAULT_NOTES_V2 };

export const DOMAINS = [
  {
    id: 'fs', key: 'notes-fs', slug: 'full-stack', label: 'Full Stack', icon: '🌐', color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)', subtitle: 'React, Node.js, APIs & more',
    tag: 'Full Stack', topics: ['React','Node.js','REST APIs','MongoDB','Auth','Deployment'],
    done: 18, total: 30, pct: 60,
  },
  {
    id: 'fe', key: 'notes-fe', slug: 'frontend', label: 'Frontend', icon: '🎨', color: '#00ffb3',
    bg: 'rgba(0,255,179,0.08)', subtitle: 'HTML, CSS, JS & React',
    tag: 'Frontend', topics: ['HTML5','CSS3','JavaScript','React','TypeScript','Testing'],
    done: 8, total: 10, pct: 80,
  },
  {
    id: 'be', key: 'notes-be', slug: 'backend', label: 'Backend', icon: '⚙️', color: '#ffcc00',
    bg: 'rgba(255,204,0,0.08)', subtitle: 'Servers, DBs & Auth',
    tag: 'Backend', topics: ['Express.js','PostgreSQL','Authentication','Caching'],
    done: 4, total: 9, pct: 45,
  },
  {
    id: 'do', key: 'notes-do', slug: 'devops', label: 'DevOps', icon: '🚀', color: '#ff4d9e',
    bg: 'rgba(255,77,158,0.08)', subtitle: 'Docker, K8s, CI/CD & Cloud',
    tag: 'DevOps', topics: ['Docker','Kubernetes','CI/CD','AWS','Monitoring'],
    done: 2, total: 8, pct: 30,
  },
  {
    id: 'sd', key: 'notes-sd', slug: 'system-design', label: 'System Design', icon: '📐', color: '#ff7675',
    bg: 'rgba(255,118,117,0.08)', subtitle: 'Architecture, scalability & design patterns',
    tag: 'System Design', topics: ['Scalability', 'Load Balancers', 'Caching', 'Database Sharding', 'Microservices', 'System Design Interview'],
    done: 1, total: 2, pct: 50,
  },
  {
    id: 'dsa', key: 'notes-dsa', slug: 'dsa', label: 'DSA', icon: '🧮', color: '#74b9ff',
    bg: 'rgba(116,185,255,0.08)', subtitle: 'Data structures & algorithms basics',
    tag: 'DSA', topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Recursion & Dynamic Programming'],
    done: 1, total: 2, pct: 50,
  },
  {
    id: 'java', key: 'notes-java', slug: 'java', label: 'Java', icon: '☕', color: '#e17055',
    bg: 'rgba(225,112,85,0.08)', subtitle: 'OOP, Collections, Multithreading & JVM',
    tag: 'Java', topics: ['OOP Concepts', 'Java Collections', 'Multithreading', 'JVM Architecture', 'Java 8+ Features'],
    done: 1, total: 2, pct: 50,
  },
  {
    id: 'sb', key: 'notes-sb', slug: 'spring-boot', label: 'Spring Boot', icon: '🍃', color: '#2ecc71',
    bg: 'rgba(46,204,113,0.08)', subtitle: 'Spring Framework, MVC, Data JPA & Security',
    tag: 'Spring Boot', topics: ['Dependency Injection', 'Spring Boot MVC', 'Spring Data JPA', 'Spring Security', 'Microservices'],
    done: 1, total: 2, pct: 50,
  },
  {
    id: 'ai', key: 'notes-ai', slug: 'generative-ai', label: 'Generative AI', icon: '🤖', color: '#a29bfe',
    bg: 'rgba(162,155,254,0.08)', subtitle: 'LLMs, Prompt Engineering, RAG & Agents',
    tag: 'Generative AI', topics: ['LLMs & Transformers', 'Prompt Engineering', 'RAG (Retrieval-Augmented)', 'Vector Databases', 'LangChain & Agents'],
    done: 1, total: 2, pct: 50,
  },
];

export const RECENT_ACTIVITY = [
  { topic: 'React Hooks Deep Dive',  domain: '🌐 Full Stack', status: 'Complete',     updated: '2 days ago' },
  { topic: 'CSS Grid & Flexbox',     domain: '🎨 Frontend',   status: 'Complete',     updated: '3 days ago' },
  { topic: 'Node.js REST API',       domain: '⚙️ Backend',    status: 'In Progress',  updated: '5 days ago' },
  { topic: 'Docker Fundamentals',    domain: '🚀 DevOps',     status: 'Pending',      updated: '1 week ago' },
  { topic: 'TypeScript Basics',      domain: '🎨 Frontend',   status: 'Complete',     updated: '1 week ago' },
];

export const NOTES = {
  fs: [
    { topic:'React Hooks Deep Dive',       tags:['useState','useEffect'],       status:'Complete',    notes:'Covered all hooks in depth including custom hooks.',  updated:'2 days ago' },
    { topic:'Node.js REST API',            tags:['Express','Middleware'],        status:'In Progress', notes:'Building CRUD APIs with Express middleware.',          updated:'5 days ago' },
    { topic:'MongoDB & Mongoose',          tags:['Database','ODM'],              status:'Complete',    notes:'Schema design, relationships and indexing.',           updated:'1 week ago' },
    { topic:'JWT Authentication',          tags:['Auth','Security'],             status:'Pending',     notes:'Token-based auth with refresh tokens.',                updated:'2 weeks ago' },
    { topic:'React Context API',           tags:['State','Context'],             status:'Complete',    notes:'Global state management without Redux.',               updated:'3 days ago' },
    { topic:'GraphQL Basics',              tags:['GraphQL','API'],               status:'Pending',     notes:'Queries, mutations and schema definition.',            updated:'2 weeks ago' },
    { topic:'WebSockets & Socket.io',      tags:['Realtime','WS'],              status:'In Progress', notes:'Bidirectional communication for live apps.',           updated:'1 week ago' },
    { topic:'Redis Caching',               tags:['Cache','Performance'],         status:'Complete',    notes:'Session storage and response caching strategies.',    updated:'4 days ago' },
    { topic:'Docker for Full Stack',       tags:['Docker','Containers'],         status:'Complete',    notes:'Containerizing React and Node apps together.',         updated:'1 week ago' },
    { topic:'CI/CD with GitHub Actions',   tags:['CI/CD','Automation'],          status:'Complete',    notes:'Automated testing and deployment pipelines.',          updated:'5 days ago' },
    { topic:'Microservices Architecture',  tags:['Architecture','Services'],     status:'Pending',     notes:'Breaking monoliths into independent services.',        updated:'3 weeks ago' },
    { topic:'tRPC Full Stack Types',       tags:['TypeScript','tRPC'],           status:'Pending',     notes:'End-to-end type safety with tRPC.',                   updated:'3 weeks ago' },
  ],
  fe: [
    { topic:'CSS Grid & Flexbox',          tags:['CSS','Layout'],               status:'Complete',    notes:'Mastered modern CSS layout techniques.',              updated:'3 days ago' },
    { topic:'TypeScript Basics',           tags:['TypeScript','Types'],          status:'Complete',    notes:'Static typing, interfaces and generics.',             updated:'1 week ago' },
    { topic:'React Performance',           tags:['React','Optimization'],        status:'In Progress', notes:'memo, useMemo, useCallback and lazy loading.',        updated:'4 days ago' },
    { topic:'CSS Animations',              tags:['CSS','Animation'],             status:'Complete',    notes:'Keyframes, transitions and the Animation API.',       updated:'2 weeks ago' },
    { topic:'Accessibility (a11y)',        tags:['a11y','HTML'],                 status:'Pending',     notes:'ARIA roles, keyboard nav and screen readers.',        updated:'3 weeks ago' },
    { topic:'Web Components',              tags:['HTML','Custom Elements'],      status:'Pending',     notes:'Shadow DOM, templates and custom elements.',          updated:'2 weeks ago' },
    { topic:'Webpack & Vite',             tags:['Build Tools','Bundler'],       status:'Complete',    notes:'Module bundling, HMR and build optimizations.',       updated:'1 week ago' },
    { topic:'Testing with Vitest',         tags:['Testing','Vitest'],            status:'Complete',    notes:'Unit and integration tests for React components.',    updated:'5 days ago' },
    { topic:'Responsive Design',           tags:['CSS','Mobile'],                status:'Complete',    notes:'Media queries, fluid typography and container queries.',updated:'1 week ago' },
    { topic:'State Management (Zustand)',   tags:['State','Zustand'],            status:'In Progress', notes:'Lightweight global state with Zustand.',              updated:'3 days ago' },
  ],
  be: [
    { topic:'Express.js Deep Dive',        tags:['Express','Node'],             status:'Complete',    notes:'Routing, middleware and error handling.',             updated:'1 week ago' },
    { topic:'PostgreSQL Fundamentals',     tags:['SQL','PostgreSQL'],            status:'Complete',    notes:'Complex queries, indexes and transactions.',          updated:'5 days ago' },
    { topic:'Authentication Strategies',   tags:['Auth','JWT'],                  status:'In Progress', notes:'JWT, sessions, OAuth2 and Passport.js.',             updated:'3 days ago' },
    { topic:'Redis & Caching',             tags:['Redis','Cache'],               status:'Complete',    notes:'Caching patterns, pub/sub and queues.',               updated:'2 weeks ago' },
    { topic:'GraphQL API Design',          tags:['GraphQL','Schema'],            status:'Pending',     notes:'Type-safe APIs with resolvers and dataloaders.',      updated:'3 weeks ago' },
    { topic:'WebSocket Servers',           tags:['WebSocket','Realtime'],        status:'Pending',     notes:'Building realtime chat and notification systems.',    updated:'2 weeks ago' },
    { topic:'REST API Best Practices',     tags:['REST','API Design'],           status:'Complete',    notes:'Versioning, pagination and error standards.',         updated:'1 week ago' },
    { topic:'File Uploads & Storage',      tags:['S3','Multer'],                 status:'Pending',     notes:'Handling multipart uploads and S3 integration.',      updated:'3 weeks ago' },
    { topic:'Rate Limiting & Security',    tags:['Security','Helmet'],           status:'Pending',     notes:'Helmet, CORS, rate limiting and input validation.',   updated:'4 weeks ago' },
  ],
  do: [
    { topic:'Docker Fundamentals',         tags:['Docker','Containers'],        status:'Complete',    notes:'Images, containers, volumes and networking.',         updated:'1 week ago' },
    { topic:'Kubernetes Basics',           tags:['K8s','Orchestration'],         status:'In Progress', notes:'Pods, services, deployments and scaling.',           updated:'3 days ago' },
    { topic:'CI/CD with GitHub Actions',   tags:['CI/CD','Actions'],             status:'Pending',     notes:'Automated pipelines for test, build and deploy.',    updated:'2 weeks ago' },
    { topic:'AWS Core Services',           tags:['AWS','Cloud'],                 status:'Pending',     notes:'EC2, S3, RDS, Lambda and IAM fundamentals.',          updated:'3 weeks ago' },
    { topic:'Infrastructure as Code',      tags:['Terraform','IaC'],             status:'Pending',     notes:'Provisioning infra with Terraform and Pulumi.',       updated:'4 weeks ago' },
    { topic:'Monitoring with Prometheus',  tags:['Monitoring','Grafana'],        status:'Pending',     notes:'Metrics, alerting and Grafana dashboards.',           updated:'3 weeks ago' },
    { topic:'Nginx & Load Balancing',      tags:['Nginx','Proxy'],               status:'Pending',     notes:'Reverse proxy, SSL termination and load balancing.',  updated:'4 weeks ago' },
    { topic:'Linux for DevOps',            tags:['Linux','Shell'],               status:'Complete',    notes:'Shell scripting, process management and cron jobs.',  updated:'2 weeks ago' },
  ],
};

/* Full Stack → technology stacks (React, Node, etc.) */
export const FULL_STACK_STACKS = [
  {
    id: 'react',
    label: 'React.js',
    icon: '⚛️',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)',
    description: 'Components, Hooks, JSX & React Router',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: '🟨',
    color: '#ffcc00',
    bg: 'rgba(255,204,0,0.08)',
    description: 'Core JS, ES6+, async/await & the DOM',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    icon: '🟢',
    color: '#00ffb3',
    bg: 'rgba(0,255,179,0.08)',
    description: 'Runtime, npm, Express & REST APIs',
  },
  {
    id: 'mysql',
    label: 'MySQL',
    icon: '🐬',
    color: '#ff8c42',
    bg: 'rgba(255,140,66,0.08)',
    description: 'SQL, schemas, joins & indexing',
  },
  {
    id: 'django',
    label: 'Django',
    icon: '🐍',
    color: '#00ffb3',
    bg: 'rgba(0,255,179,0.08)',
    description: 'Models, views, ORM & admin',
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    icon: '⚡',
    color: '#9b72ff',
    bg: 'rgba(155,114,255,0.08)',
    description: 'Python APIs, Pydantic & async routes',
  },
];

/** Interview topic filters (technology / stack) */
export const IQ_TOPIC_FILTERS = [
  { id: 'all',      label: 'All Topics', emoji: '📋', color: '#e8edf8' },
  { id: 'JavaScript', label: 'JavaScript', emoji: '🟨', color: '#ffcc00' },
  { id: 'React',    label: 'React',      emoji: '⚛️', color: '#00d4ff' },
  { id: 'Node.js',  label: 'Node.js',    emoji: '🟢', color: '#00ffb3' },
  { id: 'CSS',      label: 'CSS',        emoji: '🎨', color: '#ff8c42' },
  { id: 'Database', label: 'Database',   emoji: '🗄️', color: '#9b72ff' },
  { id: 'APIs',     label: 'APIs',       emoji: '🔌', color: '#00d4ff' },
  { id: 'Auth',     label: 'Auth',       emoji: '🔐', color: '#ff4d9e' },
  { id: 'Docker',   label: 'Docker',     emoji: '🐳', color: '#00d4ff' },
  { id: 'Kubernetes', label: 'Kubernetes', emoji: '☸️', color: '#9b72ff' },
  { id: 'CI/CD',    label: 'CI/CD',      emoji: '🔄', color: '#00ffb3' },
];

export const IQ = [
  {
    domain: 'Full Stack',
    questions: [
      { topic:'JavaScript', q:'What is the difference between == and === in JavaScript?', diff:'Easy',
        a:'<strong style="color:#00d4ff">==</strong> checks value only (type coercion). <strong style="color:#00d4ff">===</strong> checks value AND type (strict equality). Always prefer === to avoid subtle bugs. Examples: <strong style="color:#ffcc00">0 == false → true</strong> but <strong style="color:#00ffb3">0 === false → false</strong>; null == undefined → true but null === undefined → false.' },
      { topic:'JavaScript', q:'Explain the concept of closures in JavaScript.', diff:'Medium',
        a:'A <strong style="color:#00d4ff">closure</strong> is a function that retains access to its outer scope even after the outer function has returned. Use cases: data privacy, factory functions, event handlers, memoization. Example: <strong style="color:#ffcc00">const counter = (() => { let n=0; return () => ++n; })();</strong>' },
      { topic:'JavaScript', q:'What is the difference between var, let, and const?', diff:'Easy',
        a:'<strong style="color:#ffcc00">var</strong> is function-scoped and hoisted. <strong style="color:#00d4ff">let</strong> and <strong style="color:#00ffb3">const</strong> are block-scoped. const cannot be reassigned (but object properties can change). Prefer const by default, let when reassigning.' },
      { topic:'JavaScript', q:'Explain promises and async/await in JavaScript.', diff:'Medium',
        a:'A <strong style="color:#00d4ff">Promise</strong> represents async work (pending → fulfilled/rejected). <strong style="color:#00ffb3">async/await</strong> is syntactic sugar: async functions return promises; await pauses until resolution. Use try/catch for errors.' },
      { topic:'React', q:'What is JSX and why does React use it?', diff:'Easy',
        a:'<strong style="color:#00d4ff">JSX</strong> is syntax that looks like HTML inside JavaScript. Babel compiles it to <strong style="color:#ffcc00">React.createElement()</strong> calls. It keeps UI structure readable and co-located with component logic.' },
      { topic:'Node.js', q:'What is the event loop in Node.js?', diff:'Hard',
        a:'Node.js is single-threaded but handles async via the <strong style="color:#9b72ff">event loop</strong>: Call Stack → Node APIs → Callback Queue → back to stack. Phases: <strong style="color:#00d4ff">timers</strong> → I/O callbacks → idle → poll → <strong style="color:#00ffb3">check (setImmediate)</strong> → close callbacks.' },
      { topic:'APIs', q:'What is RESTful API design?', diff:'Medium',
        a:'<strong style="color:#00d4ff">REST</strong> = Representational State Transfer. Principles: stateless, client-server, cacheable, uniform interface. HTTP methods: <strong style="color:#00ffb3">GET</strong> (read), <strong style="color:#ffcc00">POST</strong> (create), PUT/PATCH (update), <strong style="color:#ff4d9e">DELETE</strong> (remove). Use proper status codes.' },
      { topic:'Database', q:'What is the difference between SQL and NoSQL databases?', diff:'Easy',
        a:'<strong style="color:#00d4ff">SQL</strong>: structured, relational, ACID, fixed schema (MySQL, PostgreSQL). Great for complex queries. <strong style="color:#00ffb3">NoSQL</strong>: flexible schema, horizontal scaling, eventual consistency (MongoDB, Redis). Great for unstructured or rapidly evolving data.' },
    ],
  },
  {
    domain: 'Frontend',
    questions: [
      { topic:'React', q:'What is the Virtual DOM in React and how does it work?', diff:'Medium',
        a:'The <strong style="color:#00d4ff">Virtual DOM</strong> is a lightweight JS representation of the real DOM. React compares (diffs) the new VDOM with the previous one (<strong style="color:#ffcc00">reconciliation</strong>) and only patches changed parts in the real DOM, making updates efficient and fast.' },
      { topic:'React', q:'What are React hooks and why were they introduced?', diff:'Easy',
        a:'Hooks let you use <strong style="color:#00d4ff">state and lifecycle features</strong> in functional components. Introduced in React 16.8 to eliminate class components. Key hooks: <strong style="color:#00ffb3">useState</strong>, useEffect, useContext, useReducer, useMemo, useCallback, useRef.' },
      { topic:'React', q:'What is the difference between useState and useEffect?', diff:'Easy',
        a:'<strong style="color:#00d4ff">useState</strong> stores and updates component state. <strong style="color:#00ffb3">useEffect</strong> runs side effects after render (fetch data, subscriptions, DOM sync). useEffect accepts a dependency array to control when it re-runs.' },
      { topic:'React', q:'What is code splitting and lazy loading in React?', diff:'Hard',
        a:'<strong style="color:#00d4ff">Code splitting</strong> divides your bundle into smaller chunks loaded on demand. Use <strong style="color:#ffcc00">React.lazy()</strong> + Suspense to lazily load components. This reduces initial bundle size and improves Time-to-Interactive.' },
      { topic:'React', q:'What is the difference between controlled and uncontrolled components?', diff:'Easy',
        a:'<strong style="color:#00d4ff">Controlled</strong>: form input value managed by React state (value + onChange). <strong style="color:#00ffb3">Uncontrolled</strong>: DOM manages its own state, accessed via refs. Controlled is preferred for validation and predictable behavior.' },
      { topic:'CSS', q:'Explain CSS specificity and the cascade.', diff:'Medium',
        a:'<strong style="color:#00d4ff">Specificity</strong> determines which CSS rule wins when multiple rules match. Order: inline styles (1000) > IDs (100) > classes/attrs (10) > elements (1). The <strong style="color:#9b72ff">cascade</strong> also considers source order and !important.' },
      { topic:'JavaScript', q:'What is the event loop in the browser?', diff:'Hard',
        a:'The browser <strong style="color:#00d4ff">event loop</strong> runs JS on a single thread. Call stack executes sync code; async tasks (timers, fetch) go to Web APIs, then callbacks queue to the microtask queue (promises) or macrotask queue (setTimeout).' },
    ],
  },
  {
    domain: 'Backend',
    questions: [
      { topic:'Node.js', q:'What is middleware in Express.js?', diff:'Easy',
        a:'<strong style="color:#00d4ff">Middleware</strong> are functions with access to req, res, and next(). They execute in sequence and can modify the request/response, end the cycle, or call next(). Uses: logging, auth, parsing, error handling.' },
      { topic:'Database', q:'Explain database indexing and when to use it.', diff:'Medium',
        a:'An <strong style="color:#00d4ff">index</strong> is a data structure (B-tree, hash) that speeds up reads. Use indexes on columns used in <strong style="color:#ffcc00">WHERE, JOIN, ORDER BY</strong>. Trade-off: faster reads, slower writes and more storage.' },
      { topic:'Database', q:'What is the N+1 query problem?', diff:'Hard',
        a:'The <strong style="color:#ff4d9e">N+1 problem</strong> occurs when fetching N records triggers N additional queries for related data. Solutions: <strong style="color:#00d4ff">eager loading</strong> (JOINs/includes), <strong style="color:#00ffb3">DataLoader</strong> (batching for GraphQL), or select with JOIN.' },
      { topic:'Auth', q:'What is JWT and how does authentication work?', diff:'Medium',
        a:'<strong style="color:#00d4ff">JWT</strong> (JSON Web Token) has 3 parts: header.payload.signature. Server signs token with a secret; client stores it (localStorage/cookie) and sends in Authorization header. Server verifies signature on each request — <strong style="color:#9b72ff">stateless auth</strong>.' },
      { topic:'APIs', q:'What is horizontal vs vertical scaling?', diff:'Easy',
        a:'<strong style="color:#00d4ff">Vertical scaling</strong> = adding more CPU/RAM to one server (limited ceiling). <strong style="color:#00ffb3">Horizontal scaling</strong> = adding more servers and distributing load. Horizontal is preferred for high-availability, cloud-native systems.' },
    ],
  },
  {
    domain: 'DevOps',
    questions: [
      { topic:'Docker', q:'What is Docker and how do containers differ from VMs?', diff:'Easy',
        a:'<strong style="color:#00d4ff">Docker</strong> packages apps + dependencies into containers. Unlike VMs, containers share the host OS kernel — they are <strong style="color:#00ffb3">lighter, faster to start</strong> and more portable. VMs include a full guest OS.' },
      { topic:'Kubernetes', q:'Explain Kubernetes pods, services, and deployments.', diff:'Medium',
        a:'<strong style="color:#00d4ff">Pod</strong>: smallest deployable unit, holds 1+ containers. <strong style="color:#ffcc00">Service</strong>: stable network endpoint for a set of pods (ClusterIP, NodePort, LoadBalancer). <strong style="color:#9b72ff">Deployment</strong>: declarative way to manage pod replicas and rolling updates.' },
      { topic:'CI/CD', q:'What is Infrastructure as Code (IaC)?', diff:'Medium',
        a:'<strong style="color:#00d4ff">IaC</strong> means managing infrastructure via code (not manual clicks). Tools: <strong style="color:#00ffb3">Terraform</strong> (declarative, cloud-agnostic), Pulumi (imperative), AWS CloudFormation. Benefits: version control, reproducibility, automation.' },
      { topic:'CI/CD', q:'What are the stages of a CI/CD pipeline?', diff:'Easy',
        a:'Typical stages: <strong style="color:#00d4ff">Source</strong> (commit triggers) → <strong style="color:#00ffb3">Build</strong> (compile/bundle) → <strong style="color:#ffcc00">Test</strong> (unit, integration, e2e) → <strong style="color:#9b72ff">Release</strong> (artifact) → <strong style="color:#ff4d9e">Deploy</strong> (staging → production).' },
      { topic:'CI/CD', q:'What is the difference between blue-green and canary deployments?', diff:'Hard',
        a:'<strong style="color:#00d4ff">Blue-green</strong>: maintain two identical environments; switch traffic all-at-once; instant rollback. <strong style="color:#00ffb3">Canary</strong>: gradually route a small % of traffic to new version, monitor, then increase. Canary reduces risk for large user bases.' },
    ],
  },
];

export const VIEW_META = {
  home:      { title: 'Overview',         sub: "Welcome back! Here's your study summary." },
  domains:   { title: 'Domains',          sub: 'All learning domains and their topics.' },
  'notes-fs':{ title: 'Full Stack Notes', sub: 'React, JavaScript, Node.js, MySQL, Django, FastAPI & more.' },
  'notes-fe':{ title: 'Frontend Notes',   sub: 'HTML, CSS, JavaScript and React.' },
  'notes-be':{ title: 'Backend Notes',    sub: 'Servers, databases and authentication.' },
  'notes-do':{ title: 'DevOps Notes',     sub: 'Docker, Kubernetes, CI/CD and Cloud.' },
  'notes-sd':{ title: 'System Design Notes', sub: 'Architecture, scalability, load balancers, caching & microservices.' },
  'notes-dsa':{ title: 'DSA Notes',       sub: 'Data structures, algorithms, space & time complexity.' },
  'notes-java':{ title: 'Java Notes',     sub: 'Java language fundamentals, OOP, Collections, Multithreading & JVM.' },
  'notes-sb':{ title: 'Spring Boot Notes', sub: 'Spring Framework core, MVC, Data JPA & Security.' },
  'notes-ai':{ title: 'Generative AI Notes', sub: 'LLMs, Prompt Engineering, RAG & Vector Databases.' },
  interview: { title: 'Interview Q&A',    sub: 'Practice questions by domain and difficulty.' },
  profile:   { title: 'My Progress',      sub: 'Track your study progress across all domains.' },
};
