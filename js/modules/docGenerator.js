/**
 * Universal system planner and AI project-kit generator.
 * Answers remain in the user's browser.
 */
import { icons, copyToClipboard, escapeHTML, showToast } from './utils.js';

const STORAGE_KEY = 'ups_planner_v2';

const DEFAULTS = {
  appName: '',
  projectType: 'Business management system',
  summary: '',
  problem: '',
  roles: '',
  features: '',
  nonGoals: '',
  workflows: '',
  entities: '',
  successMetrics: '',
  stack: 'Let the AI recommend the simplest maintainable stack',
  deployment: 'Recommend based on the project and budget',
  auth: 'Email and password with role-based access',
  sensitivity: 'Standard business data',
  designDirection: 'Clean, modern, trustworthy, and easy to use',
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
      {
        key: 'projectType', label: 'System type', type: 'select',
        options: ['Business management system', 'Client portal', 'E-commerce platform', 'Booking or reservation system', 'Inventory or POS system', 'Admin dashboard', 'Marketing website', 'Mobile application', 'API or backend service', 'Automation or internal tool', 'Other custom software']
      },
      { key: 'summary', label: 'One-sentence idea', placeholder: 'What should this system make possible?', wide: true },
      { key: 'problem', label: 'Current problem or manual process', type: 'textarea', placeholder: 'What does the client do today? Where is time lost? What keeps going wrong?', wide: true }
    ]
  },
  {
    number: '02',
    title: 'Users and launch scope',
    hint: 'Separate the first useful release from ideas that can wait.',
    fields: [
      { key: 'roles', label: 'Users and roles', type: 'textarea', placeholder: 'Admin manages users; Staff processes requests; Client tracks status' },
      { key: 'features', label: 'Must-have launch features', type: 'textarea', placeholder: 'One per line:\nLogin\nSubmit request\nReview dashboard\nExport report' },
      { key: 'nonGoals', label: 'Not included in the first release', type: 'textarea', placeholder: 'Online payments, native mobile app, AI recommendations' },
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
      {
        key: 'sensitivity', label: 'Data sensitivity', type: 'select',
        options: ['Public or low-risk data', 'Standard business data', 'Personal or confidential data', 'Payments or financial data', 'Health, government, or regulated data']
      },
      { key: 'auth', label: 'Login and access rules', placeholder: 'Role-based access; admins invite staff; clients self-register' }
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

## Problem statement
${valueOr(state.problem)}

## Target users and permissions
${bullets(state.roles, 'User roles and permissions require client confirmation')}

## MVP features
${bullets(state.features, 'MVP feature list requires client confirmation')}

## Non-goals for the first release
${bullets(state.nonGoals, 'Anything not listed in the approved MVP is out of scope')}

## Key workflows
${numbered(state.workflows, 'Primary end-to-end workflow requires client confirmation')}

## Success metrics
${bullets(state.successMetrics, 'Define measurable adoption, speed, accuracy, or cost targets')}

## Constraints
${bullets(state.constraints, 'No confirmed constraints yet')}

## Delivery target
- Platforms: ${valueOr(state.platforms)}
- Deployment: ${state.deployment}
- Initial technology direction: ${state.stack}

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

Remove an application layer only after documenting why it is not applicable. Preserve the remaining responsibility-based names across projects.

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
`;

  const design = `# Design System - ${name}

## Product direction
${valueOr(state.designDirection)}

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
- Create the universal directory structure and version control.
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
- Type: ${state.projectType}
- Goal: ${valueOr(state.summary)}
- Problem: ${valueOr(state.problem)}
- Users: ${valueOr(state.roles)}
- MVP: ${valueOr(state.features)}
- Non-goals: ${valueOr(state.nonGoals)}
- Key workflows: ${valueOr(state.workflows)}
- Data: ${valueOr(state.entities)}
- Stack direction: ${state.stack}
- Deployment: ${state.deployment}
- Constraints: ${valueOr(state.constraints)}
- Data sensitivity: ${state.sensitivity}
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
|       |-- hooks-or-composables/
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

Adapt framework-specific filenames inside these stable responsibility folders. Remove client or server only when the approved architecture truly does not need it.`;

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
  let docs = generate(state);

  container.innerHTML = `
    <div class="planner-shell">
      <aside class="planner-aside">
        <div class="planner-aside-kicker">Your project brief</div>
        <h3>Plan once.<br>Build in small, safe sessions.</h3>
        <p>Complete what you know. Missing decisions are marked instead of being silently invented by AI.</p>
        <div class="planner-score" aria-live="polite">
          <div class="planner-score-ring" id="planner-score-ring"><span id="planner-score-value">0%</span></div>
          <div><strong>Brief readiness</strong><span id="planner-score-copy">Add your project details</span></div>
        </div>
        <div class="planner-route-list">
          <span><b>01</b> Product truth</span><span><b>02</b> Architecture</span>
          <span><b>03</b> Data & permissions</span><span><b>04</b> Design rules</span>
          <span><b>05</b> AI working rules</span>
        </div>
        <div class="planner-privacy">Private by default - your answers stay in this browser.</div>
      </aside>

      <div class="planner-main">
        <div class="planner-form">
          ${GROUPS.map(group => `
            <section class="planner-step" aria-labelledby="planner-step-${group.number}">
              <div class="planner-step-head">
                <span>${group.number}</span>
                <div><h4 id="planner-step-${group.number}">${group.title}</h4><p>${group.hint}</p></div>
              </div>
              <div class="planner-fields">${group.fields.map(field => fieldHtml(field, state)).join('')}</div>
            </section>
          `).join('')}
        </div>

        <div class="planner-output">
          <div class="planner-output-top">
            <div>
              <span class="builder-badge">Generated project kit</span>
              <h3>Your AI-ready build package</h3>
              <p>Use the master prompt once, then use smaller session prompts for day-to-day work.</p>
            </div>
            <div class="planner-actions">
              <button class="btn-secondary" id="reset-planner-btn">Reset</button>
              <button class="btn-sm-primary" id="download-project-kit-btn">Download project kit</button>
            </div>
          </div>
          <div class="planner-output-tabs" role="tablist">
            ${Object.entries(docs).filter(([key]) => key !== 'meta').map(([key, doc]) =>
              `<button class="planner-output-tab ${key === active ? 'active' : ''}" data-output-key="${key}" role="tab">${doc.label}</button>`
            ).join('')}
          </div>
          <div class="planner-preview-head">
            <span id="planner-active-file">${docs[active].filename}</span>
            <button class="btn-secondary" id="copy-planner-output-btn">${icons.copy} Copy</button>
          </div>
          <pre class="planner-code" id="planner-code-preview"><code>${escapeHTML(docs[active].content)}</code></pre>
        </div>
      </div>
    </div>
  `;

  const preview = document.getElementById('planner-code-preview');
  const filename = document.getElementById('planner-active-file');
  const scoreValue = document.getElementById('planner-score-value');
  const scoreCopy = document.getElementById('planner-score-copy');
  const scoreRing = document.getElementById('planner-score-ring');
  const important = ['appName', 'summary', 'problem', 'roles', 'features', 'workflows', 'entities', 'successMetrics', 'constraints', 'designDirection'];

  const update = () => {
    docs = generate(state);
    preview.innerHTML = `<code>${escapeHTML(docs[active].content)}</code>`;
    filename.textContent = docs[active].filename;
    const complete = important.filter(key => String(state[key] || '').trim().length >= 8).length;
    const score = Math.round((complete / important.length) * 100);
    scoreValue.textContent = `${score}%`;
    scoreRing.style.setProperty('--score', `${score * 3.6}deg`);
    scoreCopy.textContent = score < 50 ? 'Add the core client facts' : score < 80 ? 'Good start - resolve the gaps' : 'Ready for client review';
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

    ['client', 'server', 'database', 'tests', 'scripts'].forEach(folder => zip.folder(folder));

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${docs.meta.slug}-project-kit.zip`);
    showToast('Project kit downloaded');
  });

  update();
}
