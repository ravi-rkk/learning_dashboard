import { REACT_NOTES } from './data/reactNotes.js';

export const USERS = { admin: 'admin123', dev: 'dev123' };

export const DOMAINS = [
  {
    id: 'fs', key: 'notes-fs', label: 'Full Stack', icon: '🌐', color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)', subtitle: 'React, Node.js, APIs & more',
    tag: 'Full Stack', topics: ['React','Node.js','REST APIs','MongoDB','Auth','Deployment'],
    done: 18, total: 30, pct: 60,
  },
  {
    id: 'fe', key: 'notes-fe', label: 'Frontend', icon: '🎨', color: '#00ffb3',
    bg: 'rgba(0,255,179,0.08)', subtitle: 'HTML, CSS, JS & React',
    tag: 'Frontend', topics: ['HTML5','CSS3','JavaScript','React','TypeScript','Testing'],
    done: 8, total: 10, pct: 80,
  },
  {
    id: 'be', key: 'notes-be', label: 'Backend', icon: '⚙️', color: '#ffcc00',
    bg: 'rgba(255,204,0,0.08)', subtitle: 'Servers, DBs & Auth',
    tag: 'Backend', topics: ['Express.js','PostgreSQL','Authentication','Caching'],
    done: 4, total: 9, pct: 45,
  },
  {
    id: 'do', key: 'notes-do', label: 'DevOps', icon: '🚀', color: '#ff4d9e',
    bg: 'rgba(255,77,158,0.08)', subtitle: 'Docker, K8s, CI/CD & Cloud',
    tag: 'DevOps', topics: ['Docker','Kubernetes','CI/CD','AWS','Monitoring'],
    done: 2, total: 8, pct: 30,
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

export const NOTES_V2 = {
  'full-stack': [
    ...REACT_NOTES,
    /* JavaScript */
    { id:'fs-js1', stack:'javascript', topic:'Variables & Data Types', tags:['let','const','types'], status:'Complete', preview:'let, const, primitives and typeof.', content:'var is function-scoped; let/const are block-scoped. Primitives: string, number, boolean, null, undefined, symbol, bigint. Objects are reference types.', updatedAt:'2 days ago' },
    { id:'fs-js2', stack:'javascript', topic:'Functions & Closures', tags:['closures','scope'], status:'Complete', preview:'Functions as first-class values and closure scope.', content:'Functions can be assigned, passed, returned. Closures retain outer lexical scope after the outer function returns — used for data privacy and factories.', updatedAt:'4 days ago' },
    { id:'fs-js3', stack:'javascript', topic:'Promises & async/await', tags:['async','Promise'], status:'In Progress', preview:'Async flow with Promises and async/await syntax.', content:'Promise states: pending, fulfilled, rejected. async functions return Promises. await pauses until resolution. Use try/catch for errors.', updatedAt:'1 week ago' },
    { id:'fs-js4', stack:'javascript', topic:'DOM Manipulation', tags:['DOM','events'], status:'Pending', preview:'querySelector, events, and dynamic updates.', content:'Select nodes with querySelector. addEventListener for events. classList, textContent, createElement for updates. Event delegation on parent elements.', updatedAt:'2 weeks ago' },
    /* Node.js */
    { id:'fs-n1', stack:'nodejs', topic:'What is Node.js?', tags:['runtime','V8'], status:'Complete', preview:'JS on the server with V8 and non-blocking I/O.', content:'Node.js runs JavaScript outside the browser using Chrome V8. Event loop handles async I/O. Great for APIs, real-time apps, and tooling.', updatedAt:'3 days ago' },
    { id:'fs-n2', stack:'nodejs', topic:'Express.js Basics', tags:['Express','middleware'], status:'Complete', preview:'Routes, middleware, and JSON APIs.', content:'Express is a minimal web framework. app.get/post for routes. Middleware runs in order. express.json() parses bodies. Error middleware has 4 args.', updatedAt:'5 days ago' },
    { id:'fs-n3', stack:'nodejs', topic:'REST API Design', tags:['REST','HTTP'], status:'In Progress', preview:'Resources, verbs, status codes, and versioning.', content:'Use nouns for resources (/users/:id). GET read, POST create, PUT/PATCH update, DELETE remove. Return proper status codes and consistent JSON shapes.', updatedAt:'1 week ago' },
    { id:'fs-n4', stack:'nodejs', topic:'npm & package.json', tags:['npm','modules'], status:'Pending', preview:'Dependencies, scripts, and semver.', content:'package.json lists name, version, scripts, dependencies. npm install saves packages. devDependencies for build tools. Semantic versioning: major.minor.patch.', updatedAt:'2 weeks ago' },
    /* MySQL */
    { id:'fs-m1', stack:'mysql', topic:'SQL Fundamentals', tags:['SELECT','WHERE'], status:'Complete', preview:'SELECT, WHERE, ORDER BY, and LIMIT.', content:'SELECT columns FROM table WHERE condition ORDER BY col LIMIT n. Use AND/OR for filters. DISTINCT removes duplicates. Aliases with AS.', updatedAt:'4 days ago' },
    { id:'fs-m2', stack:'mysql', topic:'JOINs & Relationships', tags:['JOIN','FK'], status:'In Progress', preview:'INNER, LEFT JOIN and foreign keys.', content:'INNER JOIN returns matching rows. LEFT JOIN keeps all left rows. Foreign keys enforce referential integrity. One-to-many: FK on child table.', updatedAt:'1 week ago' },
    { id:'fs-m3', stack:'mysql', topic:'Indexes & Performance', tags:['INDEX','EXPLAIN'], status:'Pending', preview:'When to index and reading EXPLAIN plans.', content:'Indexes speed reads but slow writes. Index columns in WHERE/JOIN. EXPLAIN shows query plan. Avoid SELECT * on large tables.', updatedAt:'2 weeks ago' },
    /* Django */
    { id:'fs-d1', stack:'django', topic:'Django MVT Pattern', tags:['MVT','architecture'], status:'Complete', preview:'Models, Views, Templates and URL routing.', content:'Model = data layer (ORM). View = business logic (functions or class-based). Template = HTML presentation. urls.py maps paths to views.', updatedAt:'5 days ago' },
    { id:'fs-d2', stack:'django', topic:'Models & Migrations', tags:['ORM','migrations'], status:'In Progress', preview:'Defining models and makemigrations/migrate.', content:'Models subclass models.Model. Fields: CharField, IntegerField, ForeignKey, etc. makemigrations creates migration files; migrate applies them to the DB.', updatedAt:'1 week ago' },
    { id:'fs-d3', stack:'django', topic:'Django REST Framework', tags:['DRF','API'], status:'Pending', preview:'Serializers, ViewSets, and routers.', content:'Serializers convert models ↔ JSON. ModelViewSet provides CRUD. Routers auto-generate URLs. Permissions and authentication classes secure endpoints.', updatedAt:'2 weeks ago' },
    /* FastAPI */
    { id:'fs-f1', stack:'fastapi', topic:'FastAPI Introduction', tags:['Python','async'], status:'Complete', preview:'Modern Python API framework with type hints.', content:'FastAPI uses Python type hints for validation and OpenAPI docs. Automatic /docs (Swagger) and /redoc. Built on Starlette and Pydantic.', updatedAt:'3 days ago' },
    { id:'fs-f2', stack:'fastapi', topic:'Path & Query Parameters', tags:['params','validation'], status:'Complete', preview:'Typed params with automatic validation.', content:'Path params in route decorators. Query params as function args with defaults. Pydantic validates types and returns 422 on errors.', updatedAt:'6 days ago' },
    { id:'fs-f3', stack:'fastapi', topic:'Request Bodies & Pydantic', tags:['Pydantic','schemas'], status:'In Progress', preview:'BaseModel schemas for request/response bodies.', content:'Define Pydantic models for JSON bodies. response_model controls output shape. Optional fields with Optional[T] = None.', updatedAt:'1 week ago' },
    { id:'fs-f4', stack:'fastapi', topic:'Dependency Injection', tags:['Depends','DB'], status:'Pending', preview:'Depends() for shared logic and DB sessions.', content:'Depends() injects callables into routes — DB sessions, auth, pagination. Yields pattern for cleanup. Testable and reusable across endpoints.', updatedAt:'2 weeks ago' },
  ],
  'frontend': [
    { id:'fe1',  topic:'CSS Grid & Flexbox',        tags:['CSS','Layout'],               status:'Complete',    preview:'Mastered modern CSS layout techniques.',              content:'CSS Grid is a two-dimensional layout system. Flexbox is one-dimensional. Use Grid for page layout, Flexbox for component alignment. Key: grid-template-columns, flex, gap, align-items, justify-content.',  updatedAt:'3 days ago' },
    { id:'fe2',  topic:'TypeScript Basics',          tags:['TypeScript','Types'],          status:'Complete',    preview:'Static typing, interfaces and generics.',             content:'TypeScript adds static types to JavaScript. Key concepts: type annotations, interfaces, generics, enums, type narrowing, utility types (Partial, Pick, Omit). Compile with tsc or use ts-node.',              updatedAt:'1 week ago' },
    { id:'fe3',  topic:'React Performance',          tags:['React','Optimization'],        status:'In Progress', preview:'memo, useMemo, useCallback and lazy loading.',        content:'Optimize React apps with: React.memo (skip re-renders), useMemo (memoize values), useCallback (memoize functions), lazy() + Suspense (code splitting), virtualization (react-window) for large lists.',   updatedAt:'4 days ago' },
    { id:'fe4',  topic:'CSS Animations',             tags:['CSS','Animation'],             status:'Complete',    preview:'Keyframes, transitions and the Animation API.',       content:'CSS animations: @keyframes defines animation steps. transition for hover effects. animation shorthand: name duration timing-function delay iteration-count direction. Web Animations API for JS control.',     updatedAt:'2 weeks ago' },
    { id:'fe5',  topic:'Accessibility (a11y)',        tags:['a11y','HTML'],                 status:'Pending',     preview:'ARIA roles, keyboard nav and screen readers.',        content:'Accessibility: semantic HTML (header, nav, main, footer), ARIA roles and labels, keyboard navigation (tabIndex, focus management), color contrast (WCAG AA), skip links, live regions for dynamic content.',    updatedAt:'3 weeks ago' },
    { id:'fe6',  topic:'Web Components',             tags:['HTML','Custom Elements'],      status:'Pending',     preview:'Shadow DOM, templates and custom elements.',          content:'Web Components = Custom Elements + Shadow DOM + HTML Templates. Define with customElements.define(). Shadow DOM encapsulates styles. <template> holds reusable HTML. Framework-agnostic reuse.',              updatedAt:'2 weeks ago' },
    { id:'fe7',  topic:'Webpack & Vite',             tags:['Build Tools','Bundler'],       status:'Complete',    preview:'Module bundling, HMR and build optimizations.',       content:'Webpack: configuration-heavy bundler with loaders and plugins. Vite: fast dev server (native ESM), Rollup-based production build. HMR (Hot Module Replacement) updates modules without full reload.',         updatedAt:'1 week ago' },
    { id:'fe8',  topic:'Testing with Vitest',        tags:['Testing','Vitest'],            status:'Complete',    preview:'Unit and integration tests for React components.',    content:'Vitest: fast unit testing powered by Vite. Use describe/it/expect. React Testing Library: test components by behavior not implementation. Mock functions with vi.fn(), vi.spyOn(). Coverage with --coverage.',  updatedAt:'5 days ago' },
    { id:'fe9',  topic:'Responsive Design',          tags:['CSS','Mobile'],                status:'Complete',    preview:'Media queries, fluid typography and container queries.',content:'Responsive design: mobile-first with min-width breakpoints. Fluid typography with clamp(). Container queries for component-level responsiveness. CSS variables for theme tokens. Viewport units: vw, vh, svh.',     updatedAt:'1 week ago' },
    { id:'fe10', topic:'State Management (Zustand)', tags:['State','Zustand'],             status:'In Progress', preview:'Lightweight global state with Zustand.',              content:'Zustand: minimal API global state. Create store with create(). Access with useStore(). No providers needed. Supports devtools, persist middleware. Preferred over Redux for small-medium apps.',               updatedAt:'3 days ago' },
  ],
  'backend': [
    { id:'be1', topic:'Express.js Deep Dive',       tags:['Express','Node'],              status:'Complete',    preview:'Routing, middleware and error handling.',             content:'Express.js: minimal Node.js web framework. Router: app.get/post/put/delete. Middleware chain: req→res→next. Error handling: 4-param middleware (err,req,res,next). use() mounts middleware globally or per-route.', updatedAt:'1 week ago' },
    { id:'be2', topic:'PostgreSQL Fundamentals',    tags:['SQL','PostgreSQL'],             status:'Complete',    preview:'Complex queries, indexes and transactions.',          content:'PostgreSQL: relational DB with ACID compliance. Key: JOINs (INNER/LEFT/RIGHT), indexes (B-tree default), transactions (BEGIN/COMMIT/ROLLBACK), CTEs, window functions, JSONB columns for semi-structured data.',   updatedAt:'5 days ago' },
    { id:'be3', topic:'Authentication Strategies',  tags:['Auth','JWT'],                  status:'In Progress', preview:'JWT, sessions, OAuth2 and Passport.js.',             content:'Auth approaches: Session-based (server stores state, cookie has session ID), JWT (stateless, client stores token), OAuth2 (delegated auth via providers), Passport.js (strategy-based middleware for Node).',       updatedAt:'3 days ago' },
    { id:'be4', topic:'Redis & Caching',            tags:['Redis','Cache'],                status:'Complete',    preview:'Caching patterns, pub/sub and queues.',               content:'Redis: in-memory key-value store. Caching patterns: cache-aside, write-through, write-behind. Data types: String, Hash, List, Set, Sorted Set. Pub/Sub for messaging. BullMQ uses Redis for job queues.',          updatedAt:'2 weeks ago' },
    { id:'be5', topic:'GraphQL API Design',         tags:['GraphQL','Schema'],             status:'Pending',     preview:'Type-safe APIs with resolvers and dataloaders.',      content:'GraphQL: query language for APIs. Schema-first: define types, queries, mutations, subscriptions. Resolvers fetch data. DataLoader solves N+1 with batching. Apollo Server or Yoga for Node. Introspection built-in.', updatedAt:'3 weeks ago' },
    { id:'be6', topic:'WebSocket Servers',          tags:['WebSocket','Realtime'],         status:'Pending',     preview:'Building realtime chat and notification systems.',    content:'WebSocket: full-duplex TCP connection. ws library for Node. Socket.io adds rooms, namespaces, reconnection. Events: connection, message, disconnect. Scale with Redis adapter for multi-server deployments.',        updatedAt:'2 weeks ago' },
    { id:'be7', topic:'REST API Best Practices',    tags:['REST','API Design'],            status:'Complete',    preview:'Versioning, pagination and error standards.',         content:'REST best practices: version URLs (/api/v1/), use proper HTTP methods and status codes, paginate with limit/offset or cursor, consistent error shape {status,message,errors}, use HTTPS, validate inputs.',          updatedAt:'1 week ago' },
    { id:'be8', topic:'File Uploads & Storage',     tags:['S3','Multer'],                  status:'Pending',     preview:'Handling multipart uploads and S3 integration.',      content:'File uploads: Multer middleware parses multipart/form-data. Store files in AWS S3 using aws-sdk v3. Generate pre-signed URLs for direct client uploads. Validate MIME types and size on server. Use CDN for delivery.', updatedAt:'3 weeks ago' },
    { id:'be9', topic:'Rate Limiting & Security',   tags:['Security','Helmet'],            status:'Pending',     preview:'Helmet, CORS, rate limiting and input validation.',   content:'Security essentials: Helmet sets HTTP headers, cors() configures cross-origin, express-rate-limit throttles requests, express-validator sanitizes inputs. SQL injection prevention: parameterized queries. OWASP Top 10.', updatedAt:'4 weeks ago' },
  ],
  'devops': [
    { id:'do1', topic:'Docker Fundamentals',        tags:['Docker','Containers'],          status:'Complete',    preview:'Images, containers, volumes and networking.',         content:'Docker: containerization platform. Dockerfile: FROM, COPY, RUN, CMD. docker-compose for multi-service apps. Volumes for persistent data. Networks: bridge (default), host, overlay. docker build -t name .', updatedAt:'1 week ago' },
    { id:'do2', topic:'Kubernetes Basics',          tags:['K8s','Orchestration'],          status:'In Progress', preview:'Pods, services, deployments and scaling.',            content:'Kubernetes orchestrates containers. Pod: smallest unit. Deployment: manages ReplicaSets. Service: stable network endpoint (ClusterIP, NodePort, LoadBalancer). ConfigMap/Secret for config. HPA for autoscaling.',  updatedAt:'3 days ago' },
    { id:'do3', topic:'CI/CD with GitHub Actions',  tags:['CI/CD','Actions'],              status:'Pending',     preview:'Automated pipelines for test, build and deploy.',     content:'GitHub Actions: .github/workflows/*.yml. Triggers: push, pull_request, schedule. Jobs run on runners. Steps use actions (actions/checkout, actions/setup-node). Secrets stored in repo settings. Matrix builds.',  updatedAt:'2 weeks ago' },
    { id:'do4', topic:'AWS Core Services',          tags:['AWS','Cloud'],                  status:'Pending',     preview:'EC2, S3, RDS, Lambda and IAM fundamentals.',          content:'AWS: EC2 (virtual servers), S3 (object storage), RDS (managed databases), Lambda (serverless functions), IAM (identity and access), VPC (virtual network), CloudFront (CDN), Route 53 (DNS).',                    updatedAt:'3 weeks ago' },
    { id:'do5', topic:'Infrastructure as Code',     tags:['Terraform','IaC'],              status:'Pending',     preview:'Provisioning infra with Terraform and Pulumi.',       content:'IaC: declare infra in code. Terraform HCL: providers, resources, variables, outputs. State file tracks real infra. Plan/Apply workflow. Modules for reuse. Pulumi uses real languages (TS, Python).',               updatedAt:'4 weeks ago' },
    { id:'do6', topic:'Monitoring with Prometheus', tags:['Monitoring','Grafana'],         status:'Pending',     preview:'Metrics, alerting and Grafana dashboards.',           content:'Prometheus: time-series metrics scraper. Exporters expose /metrics endpoints. PromQL for queries. Alertmanager for alerts. Grafana: visualization dashboards. Loki for logs, Tempo for traces (observability stack).', updatedAt:'3 weeks ago' },
    { id:'do7', topic:'Nginx & Load Balancing',     tags:['Nginx','Proxy'],                status:'Pending',     preview:'Reverse proxy, SSL termination and load balancing.',  content:'Nginx: high-performance web server and reverse proxy. Config: server blocks, location blocks, upstream groups. SSL: Let\"s Encrypt with Certbot. Load balancing: round-robin, least_conn, ip_hash strategies.',     updatedAt:'4 weeks ago' },
    { id:'do8', topic:'Linux for DevOps',           tags:['Linux','Shell'],                status:'Complete',    preview:'Shell scripting, process management and cron jobs.',  content:'Linux essentials: file system (/etc, /var, /usr), permissions (chmod, chown), processes (ps, top, kill), package managers (apt, yum), cron for scheduling, bash scripting (variables, loops, functions, pipes).',    updatedAt:'2 weeks ago' },
  ],
};

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
  interview: { title: 'Interview Q&A',    sub: 'Practice questions by domain and difficulty.' },
  profile:   { title: 'My Progress',      sub: 'Track your study progress across all domains.' },
};
