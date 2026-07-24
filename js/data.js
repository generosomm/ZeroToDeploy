/**
 * Universal Project Structure Guide - Data Store
 */

const GUIDE_DATA = {
  phase0: [
    {
      id: "step1",
      stepNumber: 1,
      title: "Understand What The Client Actually Needs",
      icon: "users",
      summary: "Before anyone touches code, sit down with the client to define real problems, user roles, and MVP features.",
      whyItMatters: "If you skip this and start coding based on assumptions, you'll build the wrong thing beautifully. No amount of clean code fixes a system that solves the wrong problem.",
      whereItEndsUp: "context/PRD.md",
      tasks: [
        { id: "p0_s1_t1", text: "Ask the client what problem they're trying to solve and current workarounds (paper forms, Excel, walk-ins, etc.)" },
        { id: "p0_s1_t2", text: "Identify who will use the system and list all user roles (e.g., Admin, Staff, Citizen, Client)" },
        { id: "p0_s1_t3", text: "Separate 'Must-Have for Launch' (MVP) from 'Nice-to-Have Later' features" }
      ],
      formFields: [
        { label: "App / Website Name", id: "sync-wiz-app-name", placeholder: "e.g. Citizen Portal" },
        { label: "Core Problem to Solve", id: "sync-wiz-problem", placeholder: "e.g. Manual paper record tracking" },
        { label: "User Roles (Comma separated)", id: "sync-wiz-roles", placeholder: "e.g. Admin, Staff, Customer" },
        { label: "MVP Features for Launch", id: "sync-wiz-features", placeholder: "e.g. User Login, Submit Form, Dashboard" }
      ]
    },
    {
      id: "step2",
      stepNumber: 2,
      title: "Sketch The Pages Before Designing Them",
      icon: "layout",
      summary: "Roughly draw page layouts on paper, whiteboard, or Figma before choosing colors and typography.",
      whyItMatters: "It's much cheaper to erase a box on paper than to rewrite a finished component. Catching missing elements like search bars early saves hours of rework.",
      whereItEndsUp: "context/DESIGN.md",
      tasks: [
        { id: "p0_s2_t1", text: "Sketch a rough visual layout for every major page/screen" },
        { id: "p0_s2_t2", text: "Present rough sketches to client and obtain explicit sign-off before making design decisions" }
      ]
    },
    {
      id: "step3",
      stepNumber: 3,
      title: "Set Up How The Team Will Work Together",
      icon: "git-branch",
      summary: "Establish team roles, Git branching strategy, and task management boards.",
      whyItMatters: "Even with AI writing code fast, someone must organize task distribution. Without clear git flow & roles, you'll suffer merge conflicts and duplicate work.",
      whereItEndsUp: "Team Workflow & Repo Rules",
      tasks: [
        { id: "p0_s3_t1", text: "Assign clear team roles (Frontend, Backend, Database, Testing & QA Lead)" },
        { id: "p0_s3_t2", text: "Agree on Git branching strategy (e.g. main=stable, dev=staging, feature/task-name=dev)" },
        { id: "p0_s3_t3", text: "Set up a shared project board (Trello, Notion, or GitHub Projects) to track active tasks" }
      ]
    },
    {
      id: "step4",
      stepNumber: 4,
      title: "Set Up The Tools And Environment",
      icon: "server",
      summary: "Standardize Node/PHP/MySQL runtime versions, setup instructions, and deployment targets.",
      whyItMatters: "Picking hosting late can force code refactoring if host limits runtime versions or storage. Standardizing environments prevents 'works on my machine' errors.",
      whereItEndsUp: "docs/README.md & DEPLOYMENT.md",
      tasks: [
        { id: "p0_s4_t1", text: "Agree on exact runtime versions (Node.js, PHP, MySQL/PostgreSQL) across the whole team" },
        { id: "p0_s4_t2", text: "Document step-by-step setup instructions for fresh clones in docs/README.md" },
        { id: "p0_s4_t3", text: "Decide hosting platform early (Railway, Vercel, VPS, Hostinger, Shared Hosting) to verify limits" }
      ],
      formFields: [
        { label: "Target Tech Stack & Hosting", id: "sync-wiz-stack", placeholder: "e.g. React, Node, Vercel" }
      ]
    },
    {
      id: "step5",
      stepNumber: 5,
      title: "Fill Out The Context Docs (The AI Briefing Kit)",
      icon: "file-text",
      summary: "Populate the 5 essential markdown files in context/ with verified project requirements.",
      whyItMatters: "This is the essence of structured 'vibe coding'. Giving AI full project context eliminates random guessing and inconsistent generated code.",
      whereItEndsUp: "context/ (PRD, ARCHITECTURE, SCHEMA, DESIGN, RULES)",
      tasks: [
        { id: "p0_s5_t1", text: "Complete PRD.md, ARCHITECTURE.md, SCHEMA.md, DESIGN.md, and RULES.md using steps 1-4 data" },
        { id: "p0_s5_t2", text: "Reference this context folder whenever prompting AI tools (Claude, Cursor, Antigravity)" }
      ]
    },
    {
      id: "step6",
      stepNumber: 6,
      title: "Agree On How Work Gets Approved & Data Security",
      icon: "shield-check",
      summary: "Define milestone review cadence, client approval protocols, and security access controls.",
      whyItMatters: "For systems handling sensitive citizen or enterprise data, security and milestone approval must be baked in from Day 1 to avoid compliance failures.",
      whereItEndsUp: "context/RULES.md & Client SLA",
      tasks: [
        { id: "p0_s6_t1", text: "Set up milestone review gates with client before building subsequent feature layers" },
        { id: "p0_s6_t2", text: "Define Role-Based Access Control (RBAC) and privacy standards for sensitive records" }
      ]
    }
  ],

  folderStructure: {
    name: "project-root",
    type: "folder",
    desc: "Root directory of your full-stack project",
    children: [
      {
        name: "client",
        type: "folder",
        desc: "Frontend application (React / Vue / Vanilla JS, or Blade views if PHP)",
        children: [
          {
            name: "public",
            type: "folder",
            desc: "Static uncompiled assets (favicon, robots.txt, manifest.json)"
          },
          {
            name: "src",
            type: "folder",
            desc: "Frontend source code directory",
            children: [
              { name: "assets", type: "folder", desc: "Images, SVG icons, static fonts, vector graphics" },
              {
                name: "components",
                type: "folder",
                desc: "Reusable UI components (Button, Modal, Table, Navbar, Card)",
                children: [
                  { name: "ui", type: "folder", desc: "Smallest atomic elements (Input, Badge, Spinner, Toast)" }
                ]
              },
              { name: "layouts", type: "folder", desc: "Page shells & containers (AdminLayout, ClientLayout, AuthLayout)" },
              { name: "pages", type: "folder", desc: "Page views composed of components (Dashboard, Settings, Login)" },
              { name: "hooks", type: "folder", desc: "Reusable UI logic & hooks (useAuth, useFetch, useForm)" },
              { name: "services", type: "folder", desc: "Isolated API requests & HTTP calls (api.js, authService.js)" },
              { name: "context", type: "folder", desc: "Global state management (authContext, themeContext, store)" },
              { name: "utils", type: "folder", desc: "Helper functions, formatters, validators, date utils" },
              { name: "constants", type: "folder", desc: "Enums, roles, status labels - NEVER hardcode inline!" },
              { name: "config", type: "folder", desc: "Environment-based configuration (API base URL, feature flags)" },
              { name: "App.jsx / main.js", type: "file", desc: "Application entry point & routing configuration" }
            ]
          },
          { name: "package.json", type: "file", desc: "Frontend dependencies and script commands" }
        ]
      },
      {
        name: "server",
        type: "folder",
        desc: "Backend application server (Node/Express, Laravel, or Native PHP)",
        children: [
          {
            name: "src",
            type: "folder",
            desc: "Backend source code directory",
            children: [
              { name: "controllers", type: "folder", desc: "HTTP request handlers, input processing, service invocation" },
              { name: "services", type: "folder", desc: "Core business logic, decoupled from HTTP routing" },
              { name: "models", type: "folder", desc: "Database schemas, ORM models, data entity definitions" },
              { name: "routes", type: "folder", desc: "API route definitions grouped by domain module (auth.js, user.js)" },
              { name: "middlewares", type: "folder", desc: "Auth verification, rate limiters, error handlers, validation" },
              { name: "config", type: "folder", desc: "Database connection parameters, env loaders, service clients" },
              { name: "utils", type: "folder", desc: "Backend utilities (password hashing, JWT signers, response wrappers)" },
              { name: "validators", type: "folder", desc: "Input sanitization & request payload validation schemas" }
            ]
          },
          { name: "uploads", type: "folder", desc: "User-uploaded files directory (GITIGNORED)" },
          { name: "package.json / composer.json", type: "file", desc: "Backend runtime dependencies & scripts" }
        ]
      },
      {
        name: "database",
        type: "folder",
        desc: "Database schema files, migrations, and seed scripts",
        children: [
          { name: "migrations", type: "folder", desc: "Version-controlled database schema change logs" },
          { name: "seeders", type: "folder", desc: "Initial & test data insertion scripts" },
          { name: "schema.sql", type: "file", desc: "Complete importable SQL snapshot for zero-config deployment" },
          { name: "ERD.png", type: "file", desc: "Visual Entity Relationship Diagram for client & dev reference" }
        ]
      },
      {
        name: "docs",
        type: "folder",
        desc: "Human-readable documentation for developers & client IT",
        children: [
          { name: "README.md", type: "file", desc: "Project setup guide, prerequisites, and startup commands" },
          { name: "API.md", type: "file", desc: "Complete endpoint list with request/response JSON payloads" },
          { name: "DEPLOYMENT.md", type: "file", desc: "Server deployment checklist, environment variables, Nginx configs" },
          { name: "CHANGELOG.md", type: "file", desc: "Version update history and patch notes" }
        ]
      },
      {
        name: "context",
        type: "folder",
        desc: "AI Briefing Kit folder - referenced during AI prompting (Cursor, Claude, Antigravity)",
        children: [
          { name: "PRD.md", type: "file", desc: "Product Requirements Document (Goals, MVP, Roadmap)" },
          { name: "ARCHITECTURE.md", type: "file", desc: "System Architecture (Diagrams, Pipeline, Layers, RBAC)" },
          { name: "SCHEMA.md", type: "file", desc: "Database Tables, Column Specs, API Route contracts" },
          { name: "DESIGN.md", type: "file", desc: "Design System (Colors, Typography, UI Tokens, Micro-interactions)" },
          { name: "RULES.md", type: "file", desc: "Coding Standards (SOLID, Naming, Error Handling, Types)" }
        ]
      },
      { name: "tests", type: "folder", desc: "Unit & integration test suites" },
      { name: ".env.example", type: "file", desc: "Environment variable template (No actual secret keys!)" },
      { name: ".gitignore", type: "file", desc: "Git exclusion definitions (node_modules, .env, uploads)" },
      { name: "docker-compose.yml", type: "file", desc: "Optional containerized environment configuration" },
      { name: "README.md", type: "file", desc: "Main project repository readme file" }
    ]
  },

  principles: [
    {
      id: "p1",
      number: "01",
      title: "Component-First sa Frontend",
      tag: "UI Architecture",
      desc: "Kung may 2+ pages na gumagamit ng parehong UI piece (button, card, table, modal), gawin mo agad na component sa components/. Reusable = i-props mo yung laman, huwag i-hardcode yung text/data.",
      doThis: "Export a reusable <Modal title={title} isOpen={isOpen} onClose={onClose}>{children}</Modal>",
      dontDoThis: "Duplicate 50 lines of HTML modal layout inside 4 separate page components."
    },
    {
      id: "p2",
      number: "02",
      title: "Service Layer, Hindi Direct Fetch sa Page",
      tag: "API Integration",
      desc: "Lahat ng API call dumadaan sa services/. Kapag nagbago yung endpoint o may error handling na kailangan i-update, isang file lang babaguhin mo, hindi buong app.",
      doThis: "Call userService.getUsers() in component, where userService handles baseURL, headers, and error toasts.",
      dontDoThis: "Call fetch('http://localhost:5000/api/users', { headers: ... }) directly inside page useEffect hooks."
    },
    {
      id: "p3",
      number: "03",
      title: "Constants File para sa Magic Values",
      tag: "Code Quality",
      desc: "Roles (admin, staff, client), status labels (pending, approved, rejected), fixed dropdown options - dito lahat dapat sa constants/, hindi nakasulat straight sa code. Ito ang dahilan kung bakit nagiging magulo ang AI-coded projects.",
      doThis: "USER_ROLES.ADMIN, STATUS_CODES.PENDING referenced from src/constants/index.js",
      dontDoThis: "Hardcode strings like if (user.role === 'admin_user') or status === 'Pending Approval' scattered in 10 files."
    },
    {
      id: "p4",
      number: "04",
      title: "Config Driven by .env",
      tag: "Security & Ops",
      desc: "DB credentials, API URLs, mail settings - lahat sa .env, may .env.example para may reference paano i-setup ulit sa bagong machine or sa server ng client.",
      doThis: "const API_URL = process.env.VITE_API_BASE_URL; always commit .env.example with placeholders.",
      dontDoThis: "Commit real database passwords or hardcode http://192.168.1.5:8000 inside source code."
    },
    {
      id: "p5",
      number: "05",
      title: "Isang schema.sql na Laging Updated",
      tag: "Database Integrity",
      desc: "Para pag mag-de-deploy ka sa bagong hosting o mag-o-onboard ng bagong client, import mo lang agad yung buong DB, di ka na mag-re-recreate ng tables manually.",
      doThis: "Keep database/schema.sql synced with every migration so a clean import builds the entire DB instantly.",
      dontDoThis: "Rely on memory or manual phpMyAdmin edits without exporting a master SQL snapshot."
    },
    {
      id: "p6",
      number: "06",
      title: "Consistent Naming Across Projects",
      tag: "Developer Velocity",
      desc: "Laging controllers, services, routes kahit ano pang project - kasi pag ganito, kahit anong client system gawin mo, alam mo na agad saan hahanapin ang piece na gusto mo baguhin, at mas madali ring i-brief sa AI tool.",
      doThis: "Maintain uniform folder conventions across all company repositories.",
      dontDoThis: "Name folders 'handlers' in Project A, 'api_endpoints' in Project B, and 'backend_logic' in Project C."
    }
  ],

  contextDocs: [
    {
      id: "prd",
      filename: "PRD.md",
      title: "Product Requirements Document",
      subtitle: "The 'Why & What' of the System",
      sections: [
        "Executive Summary",
        "Core Goals & Objectives",
        "Target Users & Audience Roles",
        "Problem Statement & Current Workarounds",
        "MVP Features (Phase 1 Launch)",
        "Full Feature Backlog & Prioritization",
        "Success Metrics & KPIs",
        "Tech Stack Choices",
        "Deployment Strategy",
        "Phase Roadmap"
      ],
      templateContent: `# PRD: [Project Name]

## 1. Executive Summary
Brief high-level overview of [Project Name] built for [Client Name].

## 2. Problem Statement
Describe current manual/paper/spreadsheet workarounds and main pain points.

## 3. Target User Roles
- **Admin**: Full system management, user management, analytics.
- **Staff**: Operational data entry and approval workflows.
- **Client / Public**: Self-service submission and status tracking.

## 4. MVP Core Features (Phase 1)
- [ ] User Authentication & Role-Based Access Control (RBAC)
- [ ] Core Data Entry & CRUD Management
- [ ] Automated Report Generation / Export (PDF/Excel)
- [ ] Dashboard Analytics Overview

## 5. Success Metrics
- 50% reduction in processing time for client requests.
- Zero manual paper records required post-launch.

## 6. Tech Stack & Infrastructure
- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Node.js / Express OR PHP / Laravel
- **Database**: MySQL / PostgreSQL
- **Hosting**: Vercel (Frontend) + Railway / VPS (Backend + DB)`
    },
    {
      id: "arch",
      filename: "ARCHITECTURE.md",
      title: "System Architecture",
      subtitle: "The 'How It Connects' Blueprint",
      sections: [
        "System Overview & High-Level Diagram",
        "Layered Architecture & Folder Conventions",
        "Directory & Domain Structure",
        "Middleware & Request Pipeline",
        "Client-Side Architecture (State & Router)",
        "Data Layer & Database Strategy",
        "Authentication & Authorization Flow",
        "Key Data Flows & Sequence Diagrams",
        "Domain Business Logic Highlights",
        "Cross-Cutting Concerns (Security, Logs, Validation)"
      ],
      templateContent: `# ARCHITECTURE: [Project Name]

## 1. System Overview
Layered Monolith / Separated API Architecture:
[Client App (React/Blade)] <---> [API Gateway / Express Routes] <---> [Services Layer] <---> [Database Layer (MySQL)]

## 2. Layered Architecture Rules
- **Controllers**: Handle HTTP input/output only. No SQL or direct business logic.
- **Services**: Pure business logic & validation routines. Reusable.
- **Models**: Database schemas and entity mappings.

## 3. Request Pipeline & Middleware
1. Cors & Rate Limiting Middleware
2. Authentication Token Verification (JWT/Session)
3. Role Authorization Checker (RBAC)
4. Input Payload Validator (Zod/Joi)
5. Controller Execution -> Service Layer -> Database
6. Unified JSON Error Response Handler

## 4. Auth & Security Strategy
- JWT with HTTP-only Refresh Cookies OR Encrypted Session Cookies.
- Password Hashing using Argon2id / bcrypt (cost factor >= 12).`
    },
    {
      id: "schema",
      filename: "SCHEMA.md",
      title: "Database & API Schema",
      subtitle: "Data Blueprint & Endpoint Contracts",
      sections: [
        "Database Tables & Relationships (ER Diagram)",
        "Table Schemas & Column Data Types",
        "Row Level Security (RLS) & Foreign Key Constraints",
        "API Routes Grouped by Domain",
        "Request & Response Payload JSON Examples",
        "Phase-Based Endpoint Priority List"
      ],
      templateContent: `# SCHEMA: [Project Name]

## 1. Database Entity Overview
- \`users\` (id, name, email, password_hash, role_id, created_at)
- \`roles\` (id, role_name, permissions)
- \`records\` (id, user_id, title, status, metadata, created_at)

## 2. Core API Endpoints

### Auth Domain
- \`POST /api/v1/auth/login\`
  - Request: \`{ "email": "admin@domain.com", "password": "***" }\`
  - Response: \`{ "success": true, "token": "...", "user": { ... } }\`

### Records Domain
- \`GET /api/v1/records\` (Filters: status, page, limit)
- \`POST /api/v1/records\` (Create new entry)
- \`PUT /api/v1/records/:id\` (Update entry)
- \`DELETE /api/v1/records/:id\` (Soft delete entry)`
    },
    {
      id: "design",
      filename: "DESIGN.md",
      title: "Design System & UI Specs",
      subtitle: "Visual Rules & Interaction Consistency",
      sections: [
        "Brand Identity & Art Direction",
        "Color Palette & Semantic Design Tokens",
        "Theme Variants (Dark / Light Mode Tokens)",
        "Typography Scale & Font Family Stack",
        "Spacing, Grid & Responsive Layout System",
        "Border Radius, Elevation & Shadows",
        "Micro-animations & Transition Timings",
        "Accessibility Guidelines (WCAG AA)",
        "Component Style Rules (Buttons, Cards, Tables)",
        "Interaction Patterns & User Guidance"
      ],
      templateContent: `# DESIGN SYSTEM: [Project Name]

## 1. Color Palette (Semantic Tokens)
- **Primary Accent**: Slate Teal (\`#0f766e\`, Hover: \`#0d9488\`)
- **Background Dark**: Deep Charcoal (\`#0f172a\`)
- **Background Light**: Pure White (\`#f8fafc\`)
- **Surface Elevation**: Glass Obsidian (\`rgba(30, 41, 59, 0.7)\`)
- **Text Primary**: Crisp White (\`#f8fafc\`) / Dark Slate (\`#0f172a\`)
- **Status Indicators**:
  - Success: Emerald (\`#10b981\`)
  - Warning: Amber (\`#f59e0b\`)
  - Danger: Rose (\`#f43f5e\`)

## 2. Typography Stack
- **Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Code Stack**: 'Fira Code', monospace
- **Scale**:
  - H1: 2.25rem (36px), font-weight: 700
  - H2: 1.5rem (24px), font-weight: 600
  - Body: 1rem (16px), line-height: 1.5`
    },
    {
      id: "rules",
      filename: "RULES.md",
      title: "Coding Standards & Rules",
      subtitle: "Team House Rules for AI & Humans",
      sections: [
        "Naming Conventions (Files, Variables, DB)",
        "SOLID Principles Application Guidelines",
        "DRY & KISS Enforcement Rules",
        "Code Organization & File Structure Rules",
        "Input Validation & Sanitization Rules",
        "TypeScript Standards (if applicable)",
        "State Management Guidelines",
        "Error Handling & Security Guardrails"
      ],
      templateContent: `# CODING RULES: [Project Name]

## 1. Naming Conventions
- **Folders & Files**: kebab-case (\`auth-service.js\`, \`user-card.jsx\`)
- **Variables & Functions**: camelCase (\`getUserById\`, \`isSubmitted\`)
- **Database Tables & Columns**: snake_case (\`user_profiles\`, \`created_at\`)
- **Constants**: UPPER_SNAKE_CASE (\`MAX_RETRY_ATTEMPTS\`)

## 2. Code Rules
- **No Hardcoded Magic Strings**: Move all roles, statuses, and config parameters to \`constants/\` or \`.env\`.
- **Error Handling**: Every API route MUST be wrapped in a try/catch block or async handler returning unified JSON errors.
- **Sanitization**: Never trust client payloads. Validate all body parameters using a validator schema before passing to service layer.`
    }
  ],

  uiLibraries: [
    {
      id: "shadcn",
      name: "shadcn/ui",
      badge: "Team Default Recommended",
      type: "Copy-Paste Component System",
      description: "Not a traditional npm package. You copy component source code directly into your project.",
      pros: ["100% full code ownership & control", "Zero dependency bloat", "Stunning modern baseline design", "Highly customizable with Tailwind"],
      cons: ["Components installed individually", "Requires initial setup with Tailwind"],
      bestFor: "Standard client web applications, custom brand design systems, full-stack apps.",
      tags: ["Recommended", "Tailwind", "React", "Customizable"]
    },
    {
      id: "daisyui",
      name: "daisyUI",
      badge: "Fastest Prototyping",
      type: "Tailwind CSS Plugin",
      description: "Component class library for Tailwind CSS with over 35+ built-in instant themes.",
      pros: ["Super fast prototyping", "35+ instant theme switchers", "Pure CSS (No JS bundle overhead)", "Zero JS dependencies"],
      cons: ["Less markup control than copy-paste", "Deep custom overrides can be trickier"],
      bestFor: "Rapid MVP builds, hackathons, projects requiring instant multi-theme support.",
      tags: ["Fast", "Tailwind", "Themes", "No-JS"]
    },
    {
      id: "radix",
      name: "Radix UI",
      badge: "Accessibility Engine",
      type: "Unstyled Headless Primitives",
      description: "The underlying accessible behavior engine powering many shadcn components.",
      pros: ["Industry gold-standard accessibility (WAI-ARIA)", "Zero styled opinion - design 100% your way", "Solid keyboard & screen reader nav"],
      cons: ["No default styling included - you write all CSS", "Slower development pace recently"],
      bestFor: "Enterprise apps needing strict custom design systems with 100% WCAG accessibility.",
      tags: ["Headless", "Accessibility", "React"]
    },
    {
      id: "baseui",
      name: "Base UI",
      badge: "Modern Headless Alternative",
      type: "Unstyled Headless Primitives by MUI",
      description: "Next-generation unstyled component primitives created by the team behind MUI.",
      pros: ["Clean TypeScript definitions", "Active ongoing development", "Seamless integration with shadcn"],
      cons: ["Newer ecosystem, smaller community tutorials"],
      bestFor: "Developers wanting modern active unstyled primitives alongside shadcn.",
      tags: ["Headless", "TypeScript", "MUI Team"]
    },
    {
      id: "antdesign",
      name: "Ant Design (antd)",
      badge: "Data-Heavy Admin Specialist",
      type: "Complete UI Component Library",
      description: "Enterprise-grade React UI framework with rich data tables, forms, and charts out of the box.",
      pros: ["Massive set of ready components (100+)", "Built for complex data tables & filters", "Extremely battle-tested for enterprise"],
      cons: ["Heavy bundle size for small apps", "Corporate aesthetic, hard to make unique"],
      bestFor: "Data-dense back-office dashboards, government admin portals, enterprise ERPs.",
      tags: ["Admin Panels", "Dashboards", "Data Tables", "Enterprise"]
    },
    {
      id: "mantine",
      name: "Mantine",
      badge: "Feature-Packed System",
      type: "Pre-styled Design System + Hooks",
      description: "Full-featured React component library with 100+ components and 30+ custom hooks.",
      pros: ["Huge component collection", "Includes essential hooks (useForm, useDisclosure)", "Zero setup required to look good"],
      cons: ["Larger bundle size", "Harder to deeply re-style outside Mantine ecosystem"],
      bestFor: "All-in-one React apps where you want pre-styled components without Tailwind.",
      tags: ["Pre-styled", "Form Hooks", "Rich UI"]
    },
    {
      id: "chakra",
      name: "Chakra UI",
      badge: "Prop-Based Styling",
      type: "Modular Component Library",
      description: "Simple, modular React UI library using prop-based styling like <Box p={4} bg='teal.500'>.",
      pros: ["Easy to learn for beginners", "Great built-in accessibility", "Fast inline style tweaks via props"],
      cons: ["Workflow differs from Tailwind CSS", "Larger runtime CSS-in-JS overhead"],
      bestFor: "Teams comfortable with React props styling over utility classes.",
      tags: ["Props-Based", "Accessible", "Beginner-Friendly"]
    },
    {
      id: "magicui",
      name: "Aceternity UI / Magic UI",
      badge: "Visual Enhancers",
      type: "Animation & Flair Components",
      description: "Drop-in animated components (bento grids, glow effects, text effects) for shadcn projects.",
      pros: ["Instant 'WOW' visual flair", "100% free & open-source", "Directly compatible with shadcn"],
      cons: ["Visual effects only - not a complete UI system", "Do NOT use as your main app component set"],
      bestFor: "Client landing pages, hero sections, marketing showcases, project pitch demos.",
      tags: ["Animations", "Landing Pages", "Visual Flair", "Shadcn Accent"]
    }
  ],

  deploymentChecklist: [
    { id: "dep_1", text: ".env.example is complete, verified, and updated with all non-sensitive variables" },
    { id: "dep_2", text: "database/schema.sql is exported and tested on a fresh DB import with zero syntax errors" },
    { id: "dep_3", text: "docs/README.md has clear, tested setup commands (install dependencies, import schema, run server)" },
    { id: "dep_4", text: "No hardcoded credentials, local passwords, or localhost API URLs remain in client/server code" },
    { id: "dep_5", text: "Basic API error handling is implemented across all endpoints (no raw unhandled 500 crash traces)" },
    { id: "dep_6", text: "Project has been tested end-to-end on a fresh git clone as if by a new developer or client IT" }
  ]
};
