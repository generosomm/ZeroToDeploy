# Zero to Deploy

Zero to Deploy is a reusable discovery, planning, implementation, and delivery standard for building client systems with AI coding assistants. It is designed for beginners and experienced developers who need one dependable path from a client’s rough idea to an approved, tested, deployable, and maintainable system.

Live site: [generosomm.github.io/ZeroToDeploy](https://generosomm.github.io/ZeroToDeploy/)

## Why this exists

AI can produce code quickly, but speed does not solve unclear scope, missing permissions, inconsistent data, unsafe deployment, or poor client handover. This project turns those business and engineering decisions into a structured source of truth before implementation begins.

The structure has five purposes:

1. **Reduce guessing.** Guided discovery converts informal client conversations into explicit users, workflows, rules, data, acceptance checks, and constraints.
2. **Keep AI sessions focused.** Stable facts live in small Markdown documents. Each coding session receives only the context and source files relevant to one outcome.
3. **Make projects familiar.** Every client system uses the same top-level folder responsibilities even when the framework changes.
4. **Create traceability.** Requirements flow into architecture, schema, design, implementation tasks, tests, deployment checks, and client approval.
5. **Protect delivery.** Security, backup, recovery, ownership, support, and production approval are treated as required work rather than launch-day surprises.

This is not a one-click guarantee that generated code is production ready. AI assists with planning and implementation; humans remain responsible for commercial scope, legal/privacy review, credentials, real client data, security decisions, acceptance, and production deployment.

## What users can do

- Answer a six-step, plain-language client discovery questionnaire.
- Follow compact expandable setup and learning stages so only the current instructions are visible.
- Open “Why this matters” guidance beside important questions.
- Apply answer suggestions as editable starting points.
- See every generated Markdown document update from the same answer state.
- Autosave locally and synchronize changes across tabs in the same browser.
- Save named project snapshots for multiple clients.
- Export all answers as a portable JSON backup or spreadsheet-friendly CSV.
- Re-import JSON or CSV to restore the questionnaire and regenerate every document.
- Preview and copy individual project documents.
- Download a complete project-kit ZIP with the fixed scaffold, context, prompts, and deployment guidance.
- Learn required tools, UI-library selection, AI safety boundaries, the focused build loop, and launch gates.

Browser storage is device-local and is not a cloud backup. Export the JSON answer file at important milestones and store it with the approved project records. Do not enter passwords, API keys, payment details, health information, or real personal data into the planner.

## The end-to-end workflow

### 1. Qualify the project

Confirm the client contact, decision-maker, business problem, approximate budget, target dates, existing systems, and whether the work involves regulated or sensitive data. Do not promise a stack or deadline before discovery.

Recommended commercial outputs:

- Discovery agreement or proposal
- Scope, assumptions, exclusions, and change-control process
- Payment milestones
- Client responsibilities
- Intellectual-property and account-ownership terms
- Warranty, maintenance, and support terms

### 2. Discover and approve

Use the planner with the client. Record facts in everyday language:

- Business problem and current process
- User roles and permission boundaries
- MVP behaviors and explicit non-goals
- Pages, states, end-to-end workflows, and edge cases
- Records, reports, notifications, integrations, and migration
- Security, privacy, retention, audit, and recovery needs
- Brand, content, accessibility, language, device, and browser needs
- Budget, dates, hosting, domain, account ownership, and support

Export the answers, review every “to be confirmed” entry, and obtain written approval. A blank answer is an unresolved risk—not permission for AI to invent a requirement.

### 3. Design the solution

Approve low-fidelity flows before visual polish. Translate discovery into:

- Product scope and acceptance criteria
- Role-permission matrix
- Entity relationships and data lifecycle
- API and integration contracts
- Architecture decisions and deployment constraints
- Design tokens, component strategy, responsive layouts, and UI states
- Threat review, backup, restore, monitoring, and rollback plans

For React, shadcn/ui with Radix primitives is a useful default when the team wants accessible components that live inside the repository. React Aria, Headless UI, Mantine, and framework-native component libraries may be better for other constraints. Choose one primary system after checking licensing, accessibility, maintenance, bundle cost, styling control, and team familiarity.

### 4. Build vertical slices

Do not ask AI to build the entire product in one prompt. Implement one observable outcome through every required layer:

```text
UI state
  -> client validation
  -> API service
  -> server validation and authorization
  -> business rule
  -> persistence or integration
  -> success/error feedback
  -> automated and manual verification
```

Each task should state context, goal, behavior, limits, and definition of done. Inspect before editing, preserve unrelated work, record assumptions, and require evidence for checks that actually ran.

### 5. Test and harden

Verify:

- Success, failure, empty, loading, retry, offline, and permission-denied states
- Allowed and forbidden actions for every role
- Validation at trust boundaries
- Duplicate submissions and concurrency where relevant
- Responsive layout, keyboard access, labels, focus, contrast, zoom, and reduced motion
- Unit, integration, end-to-end, migration, and clean-clone setup
- Dependency, upload, secret, log, privacy, backup, and restore behavior
- Performance under realistic data volume

Never use real client records as test fixtures.

### 6. Deploy and hand over

Deploy to staging first. Production requires written acceptance, a backup, a tested restore path, a migration plan, monitoring, smoke tests, rollback instructions, client-owned accounts, MFA, and recovery contacts.

The handover should include source, release version, admin/user guides, architecture and deployment documentation, account inventory, known limitations, backlog, restore instructions, support contacts, and ownership confirmation. Never store passwords in Git or ordinary Markdown.

## Generated project kit

The downloaded ZIP contains:

```text
project-root/
|-- client/                     # Browser or app user interface
|   |-- public/
|   `-- src/
|       |-- assets/
|       |-- components/ui/      # Reusable accessible UI primitives
|       |-- layouts/
|       |-- pages/
|       |-- hooks/
|       |-- services/           # All client API/integration calls
|       |-- state/
|       |-- utils/
|       |-- constants/
|       `-- config/
|-- server/                     # Trusted backend boundary
|   |-- src/
|   |   |-- controllers/        # HTTP input/output orchestration
|   |   |-- services/           # Business rules and use cases
|   |   |-- models/
|   |   |-- routes/
|   |   |-- middlewares/
|   |   |-- validators/
|   |   |-- constants/
|   |   |-- utils/
|   |   `-- config/
|   `-- uploads/                # Ignored; use managed storage in production
|-- database/
|   |-- migrations/             # Versioned schema changes
|   |-- seeders/                # Safe non-production seed data
|   `-- schema.sql              # Current schema snapshot
|-- context/                    # Stable source of truth for humans and AI
|   |-- PRD.md
|   |-- ARCHITECTURE.md
|   |-- SCHEMA.md
|   |-- DESIGN.md
|   `-- RULES.md
|-- prompts/
|   |-- MASTER_PROMPT.md
|   `-- SESSION_PROMPTS.md
|-- docs/
|   |-- decisions/              # Architecture decision records
|   |-- handoffs/               # Small fresh-session summaries
|   |-- BUILD_PLAN.md
|   |-- CLIENT_DISCOVERY.md
|   |-- API.md
|   |-- DEPLOYMENT.md
|   `-- CHANGELOG.md
|-- tests/
|   |-- unit/
|   |-- integration/
|   |-- e2e/
|   `-- fixtures/
|-- scripts/                    # Repeatable setup, validation, backup, deploy
|-- project-answers.json        # Portable planner source data
|-- .env.example               # Names and safe examples only
|-- .gitignore
|-- START_HERE.md
`-- README.md
```

Framework-specific filenames may change inside these responsibilities. Keep the top-level contract stable so developers, clients, and AI tools always know where product truth, interface code, trusted business rules, schema history, tests, operations, and handoff records belong. If a layer is intentionally unused, keep a short README in that folder explaining why.

## Markdown source-of-truth rules

When documents disagree, resolve them in this order:

1. Signed contract, approved change requests, and written client acceptance
2. `context/PRD.md` for scope, users, behaviors, and acceptance
3. `context/ARCHITECTURE.md` and `context/SCHEMA.md` for technical contracts
4. `context/DESIGN.md` for interface behavior and accessibility
5. `context/RULES.md` for implementation, security, and AI collaboration
6. `docs/BUILD_PLAN.md` for delivery order
7. `docs/decisions/` for reasons behind important choices
8. `docs/handoffs/` for temporary current-session state

Update the relevant source document in the same change as behavior. Do not use a handoff note to silently override approved requirements.

## Tools a beginner may need

The website now presents **Setup** as the first main guide step, with official downloads, operating-system instructions, verification commands, and a clear distinction between required and conditional tools.

Install these four essentials first:

1. Visual Studio Code or one approved repository-aware editor
2. Git
3. A verified GitHub account with two-factor authentication
4. One AI coding assistant selected in the planner

An updated browser and terminal are already included with the computer. After completing the planner, install only the runtime chosen for the project—Node.js LTS, Python, or PHP/Composer—not all of them.

Conditional tools include a project-selected database, an API client, Docker Desktop, a password manager, an authenticator, and stack-specific editor extensions.

Install from official sources only:

- A modern browser and its developer tools
- VS Code, Cursor, Codex, or another repository-aware editor/assistant
- Git and access to a private, client-owned remote repository
- The exact runtime and package manager required by the project
- A local or disposable development database
- An API client when the system has an API
- Optional database viewer and container runtime
- Password manager and MFA app for account access
- Hosting/provider CLI only when the deployment guide requires it

Learn these minimum skills before handling a client production system:

- Files, terminal navigation, environment variables, and processes
- Git status, diff, branch, commit, pull, and push
- Reading browser console, network requests, server logs, and exact errors
- Starting, stopping, testing, and building the application
- Database migration, backup, and restore basics
- Difference between authentication, authorization, validation, and encryption
- How to keep secrets and real data out of prompts, source, logs, and screenshots

## Current website architecture

```text
ZeroToDeploy/
|-- css/
|   |-- base.css                # Tokens, reset, typography
|   |-- layout.css              # Page and responsive layout
|   |-- components.css          # Planner and teaching components
|   `-- style.css               # CSS entry point
|-- data/
|   `-- folderStructure.json    # Canonical explorer data
|-- js/
|   |-- modules/
|   |   |-- docGenerator.js     # Questions, persistence, imports, generated docs
|   |   |-- explorer.js         # Interactive structure explorer
|   |   `-- utils.js            # Shared safe rendering and feedback helpers
|   `-- main.js                 # Startup, theme, search, navigation
|-- index.html
`-- README.md
```

The website deliberately uses browser-native HTML, CSS, and JavaScript. This keeps it free, transparent, easy to host on GitHub Pages, and usable without a build step. Generated client applications are free to use an appropriate framework and component library.

## Run locally

Because the site loads `data/folderStructure.json` with `fetch()`, serve it over HTTP:

```bash
python -m http.server 4173
```

Open `http://localhost:4173`.

Alternative:

```bash
npx serve .
```

## Manual verification

Before publishing changes:

- Open the site at desktop and mobile widths.
- Complete every planner step and verify suggestion chips append editable text.
- Confirm readiness and every generated document update immediately.
- Refresh and verify the current draft remains.
- Open a second tab and verify answer changes synchronize.
- Save and reopen a named project snapshot.
- Export JSON, reset, import JSON, and compare all answers.
- Export CSV, edit a safe field, import it, and verify multiline values.
- Download the project kit and inspect every generated Markdown file and folder.
- Test keyboard focus, help toggles, progress navigation, theme, search, and folder explorer.
- Check the browser console for errors.

## Privacy and recovery

Autosaved answers and named snapshots use `localStorage` on the current browser profile. Clearing browser storage removes them. JSON export is the canonical portable backup; CSV is intended for review and spreadsheet editing. Imports accept only known fields and ignore unknown fields.

This static site has no account system or server synchronization. A future authenticated sync feature should include encryption in transit and at rest, access control, version history, audit logs, retention, export/deletion, conflict resolution, and a clear privacy policy before storing client information.

## Recommended roadmap

- Conditional question packs for booking, e-commerce, payments, inventory, healthcare, and internal tools
- Versioned, read-only client review links with comments and approvals
- Requirement-to-task-to-test traceability
- Role-permission matrix and workflow diagram generator
- Cost, timeline, recurring-service, and contingency estimator
- Stack-specific setup and provider-specific deployment adapters
- Encrypted authenticated team projects with conflict history
- Automated consistency checks across generated documents
- Printable proposal, discovery report, and acceptance checklist
- Optional AI answer coach that explains suggestions without sending sensitive data by default

## Deployment

The site is compatible with GitHub Pages: it uses relative static assets and no server runtime. Push the verified files to the branch configured for Pages, then test the public URL, imports/exports, ZIP generation, mobile layout, keyboard navigation, and browser console.
