/**
 * Universal system planner and AI project-kit generator.
 * Answers remain in the user's browser.
 */
import { icons, copyToClipboard, escapeHTML, showToast } from './utils.js';

const STORAGE_KEY = 'ups_planner_v2';

const DEFAULTS = {
  appName: '',
  clientName: '',
  industry: '',
  projectType: 'Business management system',
  summary: '',
  problem: '',
  currentProcess: '',
  roles: '',
  permissions: '',
  features: '',
  nonGoals: '',
  pages: '',
  workflows: '',
  entities: '',
  notifications: '',
  reports: '',
  integrations: '',
  dataMigration: '',
  successMetrics: '',
  expectedScale: '',
  compliance: '',
  stack: 'Let the AI recommend the simplest maintainable stack',
  deployment: 'Recommend based on the project and budget',
  auth: 'Email and password with role-based access',
  sensitivity: 'Standard business data',
  designDirection: 'Clean, modern, trustworthy, and easy to use',
  branding: '',
  languages: 'English',
  accessibility: 'Keyboard accessible, readable contrast, and mobile friendly',
  platforms: 'Responsive web: desktop, tablet, and mobile',
  constraints: 'Keep recurring costs low; prefer free and open-source tools',
  aiTool: 'Any AI coding assistant',
  skillLevel: 'Beginner / vibe coder',
  operatingSystem: 'Windows',
  approvalRule: 'Plan first, then wait for my approval before coding'
};

const GROUPS = [
  {
    number: '01',
    title: 'Define the system',
    hint: 'Name the idea and the real-world problem it must solve.',
    fields: [
      { key: 'appName', label: 'System name', placeholder: 'e.g. Northstar Clinic Portal' },
      { key: 'clientName', label: 'Client or organization', placeholder: 'e.g. Northstar Family Clinic' },
      { key: 'industry', label: 'Industry or service', placeholder: 'e.g. Healthcare, retail, local government' },
      {
        key: 'projectType', label: 'System type', type: 'select',
        options: ['Business management system', 'Client portal', 'E-commerce platform', 'Booking or reservation system', 'Inventory or POS system', 'Admin dashboard', 'Marketing website', 'Mobile application', 'API or backend service', 'Automation or internal tool', 'Other custom software']
      },
      { key: 'summary', label: 'One-sentence idea', placeholder: 'What should this system make possible?', wide: true },
      { key: 'problem', label: 'Main problem', type: 'textarea', placeholder: 'Where is time lost? What errors or frustrations keep happening?', wide: true },
      { key: 'currentProcess', label: 'How the work is done today', type: 'textarea', placeholder: 'Describe the current paper, spreadsheet, chat, email, or walk-in process.', wide: true }
    ]
  },
  {
    number: '02',
    title: 'Users and launch scope',
    hint: 'Separate the first useful release from ideas that can wait.',
    fields: [
      { key: 'roles', label: 'Users and roles', type: 'textarea', placeholder: 'Admin manages users; Staff processes requests; Client tracks status' },
      { key: 'permissions', label: 'What each role can and cannot do', type: 'textarea', placeholder: 'Admin sees everything; Staff sees assigned records; Clients see only their own records' },
      { key: 'features', label: 'Must-have launch features', type: 'textarea', placeholder: 'One per line:\nLogin\nSubmit request\nReview dashboard\nExport report' },
      { key: 'nonGoals', label: 'Not included in the first release', type: 'textarea', placeholder: 'Online payments, native mobile app, AI recommendations' },
      { key: 'pages', label: 'Main pages or screens', type: 'textarea', placeholder: 'Login, Admin dashboard, Request form, Request details, Reports, Settings' },
      { key: 'successMetrics', label: 'How will you know it worked?', type: 'textarea', placeholder: 'Cut processing time from 2 days to 2 hours; zero duplicate records' }
    ]
  },
  {
    number: '03',
    title: 'Workflows and data',
    hint: 'Give the AI the business rules before it invents them.',
    fields: [
      { key: 'workflows', label: 'Key user workflows', type: 'textarea', placeholder: 'Client submits request -> staff reviews -> admin approves -> client gets notified' },
      { key: 'entities', label: 'Important records or data', type: 'textarea', placeholder: 'Users, requests, approvals, attachments, audit logs' },
      { key: 'notifications', label: 'Notifications and triggers', type: 'textarea', placeholder: 'Email client after approval; alert staff when a new request arrives' },
      { key: 'reports', label: 'Reports, search, and exports', type: 'textarea', placeholder: 'Monthly totals, status filters, CSV export, printable summary' },
      { key: 'integrations', label: 'External tools or services', type: 'textarea', placeholder: 'Email provider, payment gateway, Google Calendar, existing API — or None' },
      { key: 'dataMigration', label: 'Existing data to import', type: 'textarea', placeholder: 'Excel customer list, old MySQL records — or None' },
      {
        key: 'sensitivity', label: 'Data sensitivity', type: 'select',
        options: ['Public or low-risk data', 'Standard business data', 'Personal or confidential data', 'Payments or financial data', 'Health, government, or regulated data']
      },
      { key: 'auth', label: 'Login and access rules', placeholder: 'Role-based access; admins invite staff; clients self-register' },
      { key: 'compliance', label: 'Privacy, audit, or retention requirements', type: 'textarea', placeholder: 'Keep an audit trail; delete records after 5 years; obtain consent — or Not sure' }
    ]
  },
  {
    number: '04',
    title: 'Technology and launch',
    hint: 'Lock practical constraints early so deployment does not force a rebuild.',
    fields: [
      {
        key: 'stack', label: 'Technology preference', type: 'select',
        options: ['Let the AI recommend the simplest maintainable stack', 'React + TypeScript + Node.js', 'Next.js + TypeScript', 'Vue + Node.js', 'Laravel + MySQL', 'PHP + MySQL for shared hosting', 'Python + FastAPI', 'Static HTML, CSS, and JavaScript']
      },
      {
        key: 'deployment', label: 'Deployment target', type: 'select',
        options: ['Recommend based on the project and budget', 'Shared hosting / cPanel', 'Vercel or Netlify', 'Railway or Render', 'VPS with Docker', 'AWS, Azure, or Google Cloud', 'Local network / on-premise']
      },
      { key: 'expectedScale', label: 'Expected usage', placeholder: 'e.g. 20 staff, 2,000 clients, around 100 requests per day' },
      { key: 'constraints', label: 'Budget, deadline, integrations, or limits', type: 'textarea', placeholder: '6-week MVP; free services when possible; must import existing Excel files' },
      { key: 'platforms', label: 'Devices and platforms', placeholder: 'Responsive web for office desktops and client phones' }
    ]
  },
  {
    number: '05',
    title: 'Design and AI working style',
    hint: 'Set the visual direction and how the coding assistant should collaborate.',
    fields: [
      { key: 'designDirection', label: 'Visual and UX direction', type: 'textarea', placeholder: 'Describe the tone, brand, accessibility needs, and sites you like.' },
      { key: 'branding', label: 'Brand assets and visual references', type: 'textarea', placeholder: 'Logo, colors, fonts, screenshots, or websites the client likes' },
      { key: 'languages', label: 'Languages and content', placeholder: 'English only, English and Filipino, or other languages' },
      { key: 'accessibility', label: 'Accessibility needs', placeholder: 'Keyboard access, large text, high contrast, screen-reader support' },
      {
        key: 'aiTool', label: 'AI coding tool', type: 'select',
        options: ['Any AI coding assistant', 'Codex', 'ChatGPT', 'Claude Code', 'Cursor', 'GitHub Copilot', 'Gemini']
      },
      {
        key: 'skillLevel', label: 'Your experience', type: 'select',
        options: ['Beginner / vibe coder', 'Intermediate developer', 'Experienced developer', 'Mixed-skill team']
      },
      {
        key: 'operatingSystem', label: 'Development computer', type: 'select',
        options: ['Windows', 'macOS', 'Linux', 'Mixed team']
      },
      {
        key: 'approvalRule', label: 'AI change policy', type: 'select', wide: true,
        options: ['Plan first, then wait for my approval before coding', 'Implement one small verified task at a time', 'Implement autonomously, but stop for risky decisions']
      }
    ]
  }
];

const list = value => String(value || '').split(/\n|,/).map(item => item.trim()).filter(Boolean);
const valueOr = (value, fallback = 'To be confirmed with the client') => String(value || '').trim() || fallback;
const bullets = (value, fallback) => (list(value).length ? list(value) : [fallback]).map(item => `- ${item}`).join('\n');
const numbered = (value, fallback) => (list(value).length ? list(value) : [fallback]).map((item, index) => `${index + 1}. ${item}`).join('\n');

function generate(state) {
  const name = valueOr(state.appName, 'Untitled Client System');
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client-system';
  const date = new Date().toISOString().slice(0, 10);

  const prd = `# Product Requirements Document - ${name}

## Executive summary
${valueOr(state.summary, `${name} is a ${state.projectType.toLowerCase()} that solves the client's documented operational problem.`)}

## Client context
- Organization: ${valueOr(state.clientName)}
- Industry or service: ${valueOr(state.industry)}

## Problem statement
${valueOr(state.problem)}

## Current process
${valueOr(state.currentProcess)}

## Target users and permissions
${bullets(state.roles, 'User roles and permissions require client confirmation')}

### Permission boundaries
${bullets(state.permissions, 'Define what every role can view, create, edit, approve, export, and delete')}

## MVP features
${bullets(state.features, 'MVP feature list requires client confirmation')}

## Non-goals for the first release
${bullets(state.nonGoals, 'Anything not listed in the approved MVP is out of scope')}

## Main pages or screens
${bullets(state.pages, 'Screen list requires client confirmation')}

## Key workflows
${numbered(state.workflows, 'Primary end-to-end workflow requires client confirmation')}

## Notifications and reports
### Notifications
${bullets(state.notifications, 'Notification triggers require confirmation')}

### Reports, search, and exports
${bullets(state.reports, 'Reporting requirements require confirmation')}

## Success metrics
${bullets(state.successMetrics, 'Define measurable adoption, speed, accuracy, or cost targets')}

## Constraints
${bullets(state.constraints, 'No confirmed constraints yet')}

## Delivery target
- Platforms: ${valueOr(state.platforms)}
- Deployment: ${state.deployment}
- Initial technology direction: ${state.stack}
- Expected usage: ${valueOr(state.expectedScale)}

## Definition of done
- Every approved MVP feature has acceptance criteria and a passing verification.
- Role permissions are tested for allowed and forbidden actions.
- Setup, environment variables, database migration, backup, and deployment are documented.
- The system passes accessibility, security, error-state, and responsive-layout checks.
`;

  const architecture = `# Architecture - ${name}

## Architecture status
This document defines constraints, not permission to invent requirements. Record major choices in \`docs/decisions/\`.

## Proposed shape
- Product type: ${state.projectType}
- Technology direction: ${state.stack}
- Deployment target: ${state.deployment}
- Client platforms: ${valueOr(state.platforms)}
- Authentication: ${valueOr(state.auth)}
- Expected usage: ${valueOr(state.expectedScale)}
- External integrations: ${valueOr(state.integrations)}
- Existing data migration: ${valueOr(state.dataMigration)}

## Required layers
1. **Presentation** - pages/screens composed from reusable components.
2. **Application** - use cases and orchestration; no UI concerns.
3. **Domain** - business rules and permission decisions.
4. **Data/integration** - database repositories and external services.

## Request flow
\`UI -> client service -> API route -> validation -> controller -> domain service -> repository -> database\`

## Universal directory contract
- \`client/\`: user interface, assets, components, pages, services, state, constants.
- \`server/\`: routes, controllers, services, models, validation, middleware, configuration.
- \`database/\`: migrations, seed data, schema snapshot, and ERD source.
- \`context/\`: stable AI briefing documents.
- \`docs/\`: setup, API, deployment, decisions, changelog, and handoffs.
- \`tests/\`: unit, integration, end-to-end, fixtures.
- \`scripts/\`: safe repeatable setup, validation, backup, and deployment helpers.

Keep every top-level folder in this contract for every project. If a layer is not active yet, retain its folder with a short README explaining that it is intentionally inactive. Do not rename or remove contract folders.

## Cross-cutting rules
- Validate at every trust boundary.
- Deny unauthorized access by default and enforce it on the server.
- Use structured errors and logs without secrets or personal data.
- Keep environment-specific values outside source code.
- Make database changes with versioned migrations and update the schema snapshot.
- Add tests at the lowest useful level plus one end-to-end path for critical workflows.
`;

  const schema = `# Data and API Schema - ${name}

## Known domain records
${bullets(state.entities, 'Domain entities require discovery')}

## Access and sensitivity
- Data classification: ${state.sensitivity}
- Authentication and access: ${valueOr(state.auth)}
- Role boundaries: ${valueOr(state.permissions)}
- Privacy, audit, or retention: ${valueOr(state.compliance)}
- Existing data to import: ${valueOr(state.dataMigration)}
- Baseline: least privilege, server-side authorization, audited important mutations, and no secrets or personal data in logs.

## Schema workflow
Before implementation:
1. Convert each approved entity into fields, types, constraints, ownership, and retention rules.
2. Draw relationships and confirm cardinality with the client.
3. Define role permissions for create, read, update, delete, export, and approval.
4. Create a versioned migration and update \`database/schema.sql\`.
5. Add safe seed data containing no real client information.

## API contract rules
- Group routes by domain and version public APIs.
- Document method, path, permission, validation, success response, and error responses.
- Use pagination and bounded filters for lists.
- Make write operations safe against duplicate submission where needed.
- Do not expose database rows directly; return intentional response objects.

## Candidate workflows to translate into contracts
${bullets(state.workflows, 'Primary workflow requires confirmation')}

## External integrations
${bullets(state.integrations, 'No external integrations confirmed')}
`;

  const design = `# Design System - ${name}

## Product direction
${valueOr(state.designDirection)}

## Brand and content
- Brand references: ${valueOr(state.branding)}
- Languages: ${valueOr(state.languages)}
- Accessibility: ${valueOr(state.accessibility)}

## Supported experiences
${valueOr(state.platforms)}

## Foundation tokens
Define semantic tokens before styling screens:
- Color: background, surface, text, muted text, border, primary, success, warning, danger.
- Type: display, heading, body, label, code; minimum readable mobile sizes.
- Space: a consistent 4px or 8px scale.
- Shape: radius, border, shadow, and focus-ring tokens.
- Motion: purposeful, brief, and disabled when reduced motion is requested.

## Interaction rules
- Every screen covers loading, empty, error, success, disabled, and permission-denied states.
- All controls need labels, keyboard access, visible focus, and sufficient contrast.
- Never rely only on color to communicate status.
- Confirm destructive or irreversible actions.
- Prefer progressive disclosure for complex forms and dashboards.

## Design approval
Create low-fidelity flows first. Obtain client approval for navigation and required information before polishing visual design.
`;

  const rules = `# Project Rules - ${name}

## Non-negotiable implementation rules
- Follow the approved PRD; do not silently add scope or invent business rules.
- Keep the universal directory contract and explain any necessary deviation.
- Build one vertical slice at a time: UI, validation, business rule, persistence, and test.
- Reuse a component when a pattern appears twice; keep pages focused on composition.
- Put API access in client services and business logic in server/domain services.
- Put roles, statuses, routes, and other fixed values in typed constants or enums.
- Read configuration from validated environment variables; keep \`.env.example\` current.
- Never commit credentials, tokens, real client data, build output, or uploaded files.
- Keep files cohesive; split files that contain unrelated responsibilities.
- Update tests and documentation in the same change as behavior.

## AI collaboration contract
- Tool: ${state.aiTool}
- User experience: ${state.skillLevel}
- Change policy: ${state.approvalRule}
- Inspect existing files before editing. Preserve unrelated user changes.
- State assumptions and blockers. Ask only questions that materially change the solution.
- For normal feature work, show only changed files or a concise diff summary.
- After each task, report changed files, verification performed, result, and next smallest task.
- Never claim a test, command, migration, or deployment succeeded unless it was actually run.

## Security threshold
Data classification is **${state.sensitivity}**. Authentication, payments, personal data, regulated data, destructive actions, and production deployment require explicit threat review and human verification.
`;

  const plan = `# Build Plan - ${name}

## Phase 0 - Confirm
- Review the PRD with the client and replace every "to be confirmed."
- Approve wireframes, role permissions, MVP boundaries, stack, hosting, budget, and deadline.
- Define acceptance criteria for every MVP feature.

## Phase 1 - Foundation
- Create the exact universal directory structure and version control. Keep every contract folder, even when a layer is intentionally inactive.
- Lock runtime versions, environment validation, linting, formatting, and test commands.
- Establish design tokens, application shell, error handling, logging, and health checks.
- Draft the schema, migrations, safe seed data, and authentication boundary.

## Phase 2 - Vertical slices
${bullets(state.features, 'Implement the first approved workflow')}

For each slice: plan -> implement -> test success and failure paths -> review permissions -> demo -> commit.

## Phase 3 - Integration and hardening
- Test complete workflows across roles and devices.
- Review validation, authorization, rate limits, uploads, secrets, logs, dependencies, and backups.
- Test database migration and rollback on a disposable environment.
- Resolve accessibility, performance, empty-state, and error-state issues.

## Phase 4 - Launch
- Run a clean-clone setup and production-like smoke test.
- Deploy a staging build for client acceptance.
- Prepare monitoring, backup/restore, admin guide, user guide, and rollback steps.
- Deploy production only after written acceptance and a recovery plan.

## Phase 5 - Handover
- Record version, known limitations, credentials ownership, support window, and future backlog.
- Start future features from a fresh AI session using the handoff prompt and only relevant context.
`;

  const master = `You are my senior software architect and implementation partner for **${name}**.

PROJECT
- Client: ${valueOr(state.clientName)}
- Industry: ${valueOr(state.industry)}
- Type: ${state.projectType}
- Goal: ${valueOr(state.summary)}
- Problem: ${valueOr(state.problem)}
- Current process: ${valueOr(state.currentProcess)}
- Users: ${valueOr(state.roles)}
- Permission boundaries: ${valueOr(state.permissions)}
- MVP: ${valueOr(state.features)}
- Non-goals: ${valueOr(state.nonGoals)}
- Screens: ${valueOr(state.pages)}
- Key workflows: ${valueOr(state.workflows)}
- Data: ${valueOr(state.entities)}
- Notifications: ${valueOr(state.notifications)}
- Reports and exports: ${valueOr(state.reports)}
- Integrations: ${valueOr(state.integrations)}
- Data migration: ${valueOr(state.dataMigration)}
- Stack direction: ${state.stack}
- Deployment: ${state.deployment}
- Expected usage: ${valueOr(state.expectedScale)}
- Constraints: ${valueOr(state.constraints)}
- Data sensitivity: ${state.sensitivity}
- Compliance and retention: ${valueOr(state.compliance)}
- Design and branding: ${valueOr(state.designDirection)}; ${valueOr(state.branding)}
- Languages and accessibility: ${valueOr(state.languages)}; ${valueOr(state.accessibility)}
- My level: ${state.skillLevel}; computer: ${state.operatingSystem}

SOURCE OF TRUTH
Read these repository files before proposing code:
1. \`context/PRD.md\` - scope, users, workflows, acceptance targets.
2. \`context/ARCHITECTURE.md\` - layers, directory contract, data flow.
3. \`context/SCHEMA.md\` - entities, permissions, API/data contracts.
4. \`context/DESIGN.md\` - visual tokens, states, accessibility.
5. \`context/RULES.md\` - coding, security, and collaboration rules.
6. \`docs/BUILD_PLAN.md\` - delivery sequence.

WORKING AGREEMENT
- ${state.approvalRule}.
- Use the exact universal folder contract in \`context/ARCHITECTURE.md\`. Do not rename or remove its top-level folders; keep an inactive layer with a short explanatory README.
- Inspect the repository before acting; do not assume files or dependencies exist.
- Do not build the whole product in one pass. Work in the smallest complete vertical slice.
- Do not invent missing business rules. Mark assumptions and ask at most 3 blocking questions.
- Preserve unrelated changes. Never expose or hardcode secrets or personal data.
- Reuse existing patterns and dependencies. Do not add a package without explaining why.
- Update tests and relevant docs with behavior changes.
- Run the narrowest useful checks, then broader checks when risk warrants it.
- Keep replies concise: plan or outcome, changed files, checks run, and next task.

FIRST TASK - PLANNING ONLY
1. Inspect the repository and the source-of-truth files.
2. Restate the product in no more than 8 bullets.
3. Identify contradictions, missing decisions, security risks, and deployment constraints.
4. Recommend one maintainable stack only if the stack is not locked; explain it briefly.
5. Propose the first 5 implementation milestones with acceptance checks.
6. Recommend the smallest first vertical slice.

Do not write or modify code yet. Wait for my approval after the plan.`;

  const sessions = `# Token-Efficient AI Session Prompts - ${name}

## Start a feature session
Read only \`context/RULES.md\`, the relevant sections of \`context/PRD.md\`, \`context/SCHEMA.md\`, and the files directly involved in [FEATURE].

Task: [ONE CONCRETE OUTCOME]
Acceptance checks:
- [CHECK 1]
- [CHECK 2]

Inspect first. State a short plan, then implement the smallest complete vertical slice. Preserve unrelated code. Update tests and docs. At the end list changed files and checks actually run. Keep the response concise.

## Debug a failure
Expected: [EXPECTED BEHAVIOR]
Actual: [ACTUAL BEHAVIOR]
Exact error/log: [PASTE EXACT OUTPUT]
Reproduction: [MINIMAL STEPS]
Relevant files: [PATHS]

Diagnose the root cause before editing. Do not hide the error, weaken validation, or add dummy data. Change only necessary files, add a regression test when practical, run the narrowest relevant checks, and report evidence.

## Security and production review
Review [FEATURE OR FLOW] against \`context/RULES.md\` and \`context/SCHEMA.md\`. Trace authentication, authorization, validation, data exposure, logging, uploads, rate limits, secrets, and failure behavior. Rank findings by impact and likelihood. Fix only issues I explicitly approve, then add tests.

## Fresh-session handoff
Project: ${name}
Current milestone: [MILESTONE]
Completed: [SHORT BULLETS]
Current behavior: [WHAT WORKS]
Next task: [ONE OUTCOME]
Decisions: [ONLY RELEVANT DECISIONS]
Known issues: [SHORT BULLETS]
Checks last run: [COMMAND + RESULT]
Relevant files: [PATHS]

Read the listed files and only the relevant context docs. Verify repository state, then continue with the next task. Do not recap unrelated history.
`;

  const start = `# ${name} - Start Here

Generated: ${date}

## What this bundle is
This is a planning-first briefing kit for building ${name} with ${state.aiTool}. Stable project facts live in \`context/\`; individual AI sessions stay small by loading only task-relevant files.

## Before code
1. Review every generated document with the client.
2. Replace all unconfirmed statements with facts.
3. Approve the MVP, permissions, workflows, wireframes, hosting, and acceptance checks.
4. Commit the approved context kit to the repository.

## Start building
1. Open the repository in your AI coding tool.
2. Paste \`prompts/MASTER_PROMPT.md\`.
3. Approve or correct the proposed milestones.
4. Build one vertical slice per session with \`prompts/SESSION_PROMPTS.md\`.
5. At milestone boundaries, create a short handoff and start a fresh session.

## Context routing
- Product decision -> \`PRD.md\`
- Layers or file placement -> \`ARCHITECTURE.md\`
- Data, API, or permissions -> \`SCHEMA.md\`
- UI or accessibility -> \`DESIGN.md\`
- Coding/security behavior -> \`RULES.md\`

Do not attach every project file to every prompt. Give the AI the task, acceptance checks, relevant context sections, relevant code paths, and exact errors or logs.
`;

  const scaffold = `project-root/
|-- client/
|   |-- public/
|   \`-- src/
|       |-- assets/
|       |-- components/ui/
|       |-- layouts/
|       |-- pages/
|       |-- hooks/
|       |-- services/
|       |-- state/
|       |-- utils/
|       |-- constants/
|       \`-- config/
|-- server/
|   |-- src/
|   |   |-- controllers/
|   |   |-- services/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- middlewares/
|   |   |-- validators/
|   |   |-- constants/
|   |   |-- utils/
|   |   \`-- config/
|   \`-- uploads/
|-- database/
|   |-- migrations/
|   |-- seeders/
|   \`-- schema.sql
|-- context/
|   |-- PRD.md
|   |-- ARCHITECTURE.md
|   |-- SCHEMA.md
|   |-- DESIGN.md
|   \`-- RULES.md
|-- docs/
|   |-- decisions/
|   |-- handoffs/
|   |-- BUILD_PLAN.md
|   |-- API.md
|   |-- DEPLOYMENT.md
|   \`-- CHANGELOG.md
|-- tests/
|   |-- unit/
|   |-- integration/
|   |-- e2e/
|   \`-- fixtures/
|-- scripts/
|-- .env.example
|-- .gitignore
\`-- README.md

Adapt framework-specific filenames inside these stable responsibility folders, but keep every top-level contract folder in every project. If a layer is inactive, retain its folder with a short README explaining why.`;

  return {
    start: { filename: 'START_HERE.md', label: 'Start here', content: start },
    master: { filename: 'MASTER_PROMPT.md', label: 'Master prompt', content: master },
    plan: { filename: 'BUILD_PLAN.md', label: 'Build plan', content: plan },
    prd: { filename: 'PRD.md', label: 'PRD', content: prd },
    architecture: { filename: 'ARCHITECTURE.md', label: 'Architecture', content: architecture },
    schema: { filename: 'SCHEMA.md', label: 'Schema', content: schema },
    design: { filename: 'DESIGN.md', label: 'Design', content: design },
    rules: { filename: 'RULES.md', label: 'Rules', content: rules },
    sessions: { filename: 'SESSION_PROMPTS.md', label: 'Session prompts', content: sessions },
    scaffold: { filename: 'FOLDER_STRUCTURE.txt', label: 'Folder tree', content: scaffold },
    meta: { slug }
  };
}

function fieldHtml(field, state) {
  const current = escapeHTML(String(state[field.key] || ''));
  const className = field.wide ? 'planner-field planner-field--wide' : 'planner-field';
  const fieldId = field.key === 'appName' ? 'wiz-app-name' : `wiz-${field.key}`;
  let control;

  if (field.type === 'textarea') {
    control = `<textarea id="${fieldId}" data-planner-key="${field.key}" rows="4" placeholder="${escapeHTML(field.placeholder || '')}">${current}</textarea>`;
  } else if (field.type === 'select') {
    control = `<select id="${fieldId}" data-planner-key="${field.key}">${field.options.map(option =>
      `<option value="${escapeHTML(option)}" ${state[field.key] === option ? 'selected' : ''}>${escapeHTML(option)}</option>`
    ).join('')}</select>`;
  } else {
    control = `<input id="${fieldId}" data-planner-key="${field.key}" type="text" value="${current}" placeholder="${escapeHTML(field.placeholder || '')}">`;
  }

  return `<div class="${className}"><label for="${fieldId}">${field.label}</label>${control}</div>`;
}

const TOOL_OPTIONS = [
  { name: 'Codex', mark: 'Cx', desc: 'Builds and edits a real repository' },
  { name: 'Cursor', mark: 'C', desc: 'AI-first code editor' },
  { name: 'GitHub Copilot', mark: 'GH', desc: 'AI pair programmer' },
  { name: 'Claude Code', mark: 'Cl', desc: 'Terminal coding agent' },
  { name: 'Bolt.new', mark: 'B', desc: 'Browser-based app builder' },
  { name: 'Replit Agent', mark: 'R', desc: 'Hosted development agent' },
  { name: 'v0 by Vercel', mark: 'v0', desc: 'UI and app generator' },
  { name: 'Gemini', mark: 'G', desc: 'Google AI coding assistant' },
  { name: 'Any AI coding assistant', mark: 'AI', desc: 'Portable prompt format' }
];

export function renderDocGenerator() {
  const container = document.getElementById('doc-generator-container');
  if (!container) return;

  let state;
  try {
    state = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    state = { ...DEFAULTS };
  }

  let active = 'master';
  let currentStep = 0;
  let docs = generate(state);
  const allFields = Object.fromEntries(GROUPS.flatMap(group => group.fields).map(field => [field.key, field]));
  const renderFields = keys => keys.map(key => fieldHtml(allFields[key], state)).join('');

  container.innerHTML = `
    <div class="guided-builder">
      <div class="guided-builder-head">
        <div>
          <span class="builder-badge">Beginner-friendly prompt builder</span>
          <h3>Answer simple questions. We structure the technical prompt.</h3>
          <p>No coding terms required. Examples are included, and you can leave anything uncertain blank.</p>
        </div>
        <div class="guided-readiness" aria-live="polite">
          <strong id="planner-score-value">0%</strong>
          <span id="planner-score-copy">Brief readiness</span>
        </div>
      </div>

      <div class="guided-progress" aria-label="Builder progress">
        <div class="guided-progress-line"><span id="guided-progress-fill"></span></div>
        ${['AI tool', 'Your idea', 'Users & scope', 'Workflow & data', 'Build choices', 'Your prompt'].map((label, index) => `
          <button class="guided-progress-step ${index === 0 ? 'active' : ''}" data-jump-step="${index}">
            <b>${index + 1}</b><span>${label}</span>
          </button>
        `).join('')}
      </div>

      <div class="guided-content">
        <section class="guided-panel active" data-guide-panel="0">
          <div class="guided-panel-heading">
            <span>Step 1 of 6</span>
            <h4>Which AI coding tool will you use?</h4>
            <p>Choose one if you know it. The generated project kit still works if you change tools later.</p>
          </div>
          <div class="tool-choice-grid">
            ${TOOL_OPTIONS.map(tool => `
              <button class="tool-choice ${state.aiTool === tool.name ? 'selected' : ''}" data-tool-name="${escapeHTML(tool.name)}">
                <span class="tool-mark">${tool.mark}</span>
                <span><strong>${tool.name}</strong><small>${tool.desc}</small></span>
                <i aria-hidden="true">✓</i>
              </button>
            `).join('')}
          </div>
          <div class="guided-tip"><b>Not sure?</b> Choose “Any AI coding assistant.” You will receive a portable prompt with no tool-specific commands.</div>
        </section>

        <section class="guided-panel" data-guide-panel="1">
          <div class="guided-panel-heading">
            <span>Step 2 of 6</span>
            <h4>Describe the idea in everyday language</h4>
            <p>Explain the outcome for the client. Do not worry about databases, APIs, or frameworks yet.</p>
          </div>
          <div class="planner-fields">${renderFields(['appName', 'clientName', 'industry', 'projectType', 'summary', 'problem', 'currentProcess'])}</div>
          <div class="guided-example">
            <b>Example answer</b>
            <p>“A clinic portal where patients request appointments and staff confirm schedules without using phone calls and spreadsheets.”</p>
          </div>
        </section>

        <section class="guided-panel" data-guide-panel="2">
          <div class="guided-panel-heading">
            <span>Step 3 of 6</span>
            <h4>Decide who uses it and what launches first</h4>
            <p>List only the features needed for the first useful version. Extra ideas can wait.</p>
          </div>
          <div class="planner-fields">${renderFields(['roles', 'permissions', 'features', 'nonGoals', 'pages', 'successMetrics'])}</div>
          <div class="guided-example">
            <b>Good feature format</b>
            <p>“Patient can request an appointment” is clearer than “appointment system” because it names the user and behavior.</p>
          </div>
        </section>

        <section class="guided-panel" data-guide-panel="3">
          <div class="guided-panel-heading">
            <span>Step 4 of 6</span>
            <h4>Explain what happens and what information is stored</h4>
            <p>Describe the journey like a story. This prevents the AI from inventing business rules.</p>
          </div>
          <div class="planner-fields">${renderFields(['workflows', 'entities', 'notifications', 'reports', 'integrations', 'dataMigration', 'sensitivity', 'auth', 'compliance'])}</div>
          <div class="guided-example">
            <b>Workflow example</b>
            <p>“Patient sends request → receptionist checks schedule → doctor confirms → patient receives the final time.”</p>
          </div>
        </section>

        <section class="guided-panel" data-guide-panel="4">
          <div class="guided-panel-heading">
            <span>Step 5 of 6</span>
            <h4>Choose practical build preferences</h4>
            <p>The defaults are safe for beginners. Only change an option when the client or hosting provider requires it.</p>
          </div>
          <div class="planner-fields">
            ${renderFields(['stack', 'deployment', 'expectedScale', 'constraints', 'platforms', 'designDirection', 'branding', 'languages', 'accessibility', 'skillLevel', 'operatingSystem', 'approvalRule'])}
          </div>
          <div class="guided-tip"><b>Beginner recommendation:</b> Let the AI recommend one maintainable stack after it reads your requirements. Ask it to explain the choice before writing code.</div>
        </section>

        <section class="guided-panel" data-guide-panel="5">
          <div class="guided-panel-heading guided-panel-heading--result">
            <span>Step 6 of 6</span>
            <h4>Your project prompt is ready</h4>
            <p>Start with the Master prompt. The other tabs become useful after the plan is approved.</p>
          </div>
          <div class="prompt-use-strip">
            <div><b>1</b><span><strong>Copy</strong><small>Copy the Master prompt</small></span></div>
            <div><b>2</b><span><strong>Open your AI</strong><small>Open the project folder first</small></span></div>
            <div><b>3</b><span><strong>Paste and plan</strong><small>Approve the plan before code</small></span></div>
            <div><b>4</b><span><strong>Build in pieces</strong><small>One feature per session</small></span></div>
          </div>

          <div class="planner-output">
            <div class="planner-output-top">
              <div>
                <span class="builder-badge">Generated project kit</span>
                <h3>Your AI-ready build package</h3>
                <p>Use the master prompt once, then the smaller session prompts for day-to-day work.</p>
              </div>
              <div class="planner-actions">
                <button class="btn-secondary" id="reset-planner-btn">Start over</button>
                <button class="btn-sm-primary" id="download-project-kit-btn">Download full project kit</button>
              </div>
            </div>
            <div class="planner-output-tabs" role="tablist">
              ${Object.entries(docs).filter(([key]) => key !== 'meta').map(([key, doc]) =>
                `<button class="planner-output-tab ${key === active ? 'active' : ''}" data-output-key="${key}" role="tab">${doc.label}</button>`
              ).join('')}
            </div>
            <div class="planner-preview-head">
              <span id="planner-active-file">${docs[active].filename}</span>
              <button class="btn-secondary" id="copy-planner-output-btn">${icons.copy} Copy this file</button>
            </div>
            <pre class="planner-code" id="planner-code-preview"><code>${escapeHTML(docs[active].content)}</code></pre>
          </div>
        </section>
      </div>

      <div class="guided-footer">
        <button class="btn-secondary" id="guided-prev-btn">← Previous</button>
        <span><b id="guided-step-count">1</b> of 6 · Saved automatically in this browser</span>
        <button class="btn-sm-primary" id="guided-next-btn">Next: describe the idea →</button>
      </div>
    </div>
  `;

  const preview = document.getElementById('planner-code-preview');
  const filename = document.getElementById('planner-active-file');
  const scoreValue = document.getElementById('planner-score-value');
  const scoreCopy = document.getElementById('planner-score-copy');
  const progressFill = document.getElementById('guided-progress-fill');
  const previousButton = document.getElementById('guided-prev-btn');
  const nextButton = document.getElementById('guided-next-btn');
  const stepCount = document.getElementById('guided-step-count');
  const important = ['appName', 'clientName', 'summary', 'problem', 'currentProcess', 'roles', 'permissions', 'features', 'pages', 'workflows', 'entities', 'successMetrics', 'constraints', 'designDirection'];
  const nextLabels = ['Next: describe the idea →', 'Next: users and features →', 'Next: workflow and data →', 'Next: build choices →', 'Generate my prompt →'];

  const showStep = (target, shouldScroll = true) => {
    currentStep = Math.max(0, Math.min(5, target));
    container.querySelectorAll('.guided-panel').forEach((panel, index) => panel.classList.toggle('active', index === currentStep));
    container.querySelectorAll('.guided-progress-step').forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
      step.classList.toggle('complete', index < currentStep);
    });
    progressFill.style.width = `${(currentStep / 5) * 100}%`;
    stepCount.textContent = String(currentStep + 1);
    previousButton.disabled = currentStep === 0;
    nextButton.hidden = currentStep === 5;
    if (currentStep < 5) nextButton.textContent = nextLabels[currentStep];
    if (currentStep === 5) update();
    if (shouldScroll) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const update = () => {
    docs = generate(state);
    if (preview && filename) {
      preview.innerHTML = `<code>${escapeHTML(docs[active].content)}</code>`;
      filename.textContent = docs[active].filename;
    }
    const complete = important.filter(key => String(state[key] || '').trim().length >= 8).length;
    const score = Math.round((complete / important.length) * 100);
    scoreValue.textContent = `${score}%`;
    scoreCopy.textContent = score < 50 ? 'Keep adding the basics' : score < 80 ? 'Good start - a few gaps remain' : 'Ready for client review';
  };

  container.querySelectorAll('[data-planner-key]').forEach(input => {
    input.addEventListener('input', event => {
      const key = event.target.dataset.plannerKey;
      state[key] = event.target.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      const legacyKeys = ['appName', 'problem', 'roles', 'features'];
      if (legacyKeys.includes(key)) {
        const legacy = JSON.parse(localStorage.getItem('ups_wizard_data') || '{}');
        legacy[key] = event.target.value;
        localStorage.setItem('ups_wizard_data', JSON.stringify(legacy));
      }
      update();
    });
  });

  container.querySelectorAll('.tool-choice').forEach(button => {
    button.addEventListener('click', () => {
      state.aiTool = button.dataset.toolName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      container.querySelectorAll('.tool-choice').forEach(item => item.classList.toggle('selected', item === button));
      update();
    });
  });

  previousButton.addEventListener('click', () => showStep(currentStep - 1));
  nextButton.addEventListener('click', () => showStep(currentStep + 1));
  container.querySelectorAll('[data-jump-step]').forEach(button => {
    button.addEventListener('click', () => showStep(Number(button.dataset.jumpStep)));
  });

  container.querySelectorAll('.planner-output-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      active = tab.dataset.outputKey;
      container.querySelectorAll('.planner-output-tab').forEach(item => item.classList.toggle('active', item === tab));
      update();
    });
  });

  document.getElementById('copy-planner-output-btn')?.addEventListener('click', () => {
    copyToClipboard(docs[active].content, `Copied ${docs[active].filename}`);
  });

  document.getElementById('reset-planner-btn')?.addEventListener('click', () => {
    if (!window.confirm('Clear this project brief and start again?')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('ups_wizard_data');
    renderDocGenerator();
    showToast('Project brief reset');
  });

  document.getElementById('download-project-kit-btn')?.addEventListener('click', async () => {
    if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
      showToast('Download library unavailable. Copy the files individually instead.');
      return;
    }

    const zip = new JSZip();
    zip.file('START_HERE.md', docs.start.content);
    zip.file('README.md', `# ${valueOr(state.appName, 'Client System')}\n\nSee START_HERE.md and approve context/ before development.`);
    zip.file('.env.example', '# Add variable names only. Never commit real secrets.\n');
    zip.file('.gitignore', 'node_modules/\ndist/\nbuild/\n.env\n*.log\nuploads/\ncoverage/\n');

    const context = zip.folder('context');
    context.file('PRD.md', docs.prd.content);
    context.file('ARCHITECTURE.md', docs.architecture.content);
    context.file('SCHEMA.md', docs.schema.content);
    context.file('DESIGN.md', docs.design.content);
    context.file('RULES.md', docs.rules.content);

    const prompts = zip.folder('prompts');
    prompts.file('MASTER_PROMPT.md', docs.master.content);
    prompts.file('SESSION_PROMPTS.md', docs.sessions.content);

    const projectDocs = zip.folder('docs');
    projectDocs.file('BUILD_PLAN.md', docs.plan.content);
    projectDocs.file('FOLDER_STRUCTURE.txt', docs.scaffold.content);
    projectDocs.folder('decisions');
    projectDocs.folder('handoffs');

    [
      'client/public',
      'client/src/assets',
      'client/src/components/ui',
      'client/src/layouts',
      'client/src/pages',
      'client/src/hooks',
      'client/src/services',
      'client/src/state',
      'client/src/utils',
      'client/src/constants',
      'client/src/config',
      'server/src/controllers',
      'server/src/services',
      'server/src/models',
      'server/src/routes',
      'server/src/middlewares',
      'server/src/validators',
      'server/src/constants',
      'server/src/utils',
      'server/src/config',
      'server/uploads',
      'database/migrations',
      'database/seeders',
      'tests/unit',
      'tests/integration',
      'tests/e2e',
      'tests/fixtures',
      'scripts'
    ].forEach(folder => zip.folder(folder));

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${docs.meta.slug}-project-kit.zip`);
    showToast('Project kit downloaded');
  });

  update();
  showStep(0, false);
}
