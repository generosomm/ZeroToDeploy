# Zero to Deploy

Zero to Deploy is a beginner-friendly planning and delivery guide for people building client systems with AI coding assistants. It turns a system idea into a structured briefing kit, teaches a focused vibe-coding workflow, enforces one reusable project folder contract, and provides launch checks before production deployment.

**Live site:** [https://generosomm.github.io/ZeroToDeploy/](https://generosomm.github.io/ZeroToDeploy/)

## The four-step workflow

1. **Plan** — answer guided questions about the client, problem, users, permissions, workflows, data, security, design, technology, and deployment.
2. **Build** — give the AI one observable outcome at a time, include only relevant context, and verify every vertical slice.
3. **Structure** — use the same universal `client/`, `server/`, `database/`, `context/`, `docs/`, `tests/`, and `scripts/` contract for every project.
4. **Launch** — pass requirements, testing, security, recovery, client acceptance, and handover gates.

The interactive bottom navigation explains the current step, displays progress, marks completed steps, and provides Previous and Next controls.

## What the planner generates

- `START_HERE.md`
- `prompts/MASTER_PROMPT.md`
- `prompts/SESSION_PROMPTS.md`
- `context/PRD.md`
- `context/ARCHITECTURE.md`
- `context/SCHEMA.md`
- `context/DESIGN.md`
- `context/RULES.md`
- `docs/BUILD_PLAN.md`
- Fixed folder scaffold
- Downloadable project-kit ZIP

Planner answers are saved only in the current browser through `localStorage`.

## Project structure

```text
ZeroToDeploy/
|-- css/
|   |-- base.css
|   |-- layout.css
|   |-- components.css
|   `-- style.css
|-- data/
|   `-- folderStructure.json
|-- js/
|   |-- modules/
|   |   |-- docGenerator.js
|   |   |-- explorer.js
|   |   `-- utils.js
|   `-- main.js
|-- index.html
`-- README.md
```

Every remaining source file is loaded by the website or documents the project. Historical prototypes, unused datasets, and disconnected modules were removed to keep the repository focused.

## Run locally

This is a static website. Because it loads JSON with `fetch()`, serve it through a local HTTP server instead of opening `index.html` directly.

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Main files

- `index.html` — four-step page content and accessible navigation shell.
- `js/main.js` — startup, theme, search, folder-data loading, scroll tracking, and guided navigation.
- `js/modules/docGenerator.js` — discovery questionnaire and generated project-kit documents.
- `js/modules/explorer.js` — interactive universal folder explorer.
- `js/modules/utils.js` — shared escaping, clipboard, toast, and icon utilities.
- `data/folderStructure.json` — the canonical folder structure displayed by the explorer.
- `css/base.css` — theme tokens, reset, and typography.
- `css/layout.css` — page, hero, and responsive layout.
- `css/components.css` — styles for the active planner, stepper, explorer, teaching cards, search, and launch gates.

## Deployment

The repository is compatible with GitHub Pages because it uses static HTML, CSS, JavaScript, and JSON with relative paths. Push changes to the branch configured for GitHub Pages, then verify the live site and its browser console.
