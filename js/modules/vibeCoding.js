/**
 * AI Vibe Coding Playbook & Prompt Builder Module
 */
import { icons, copyToClipboard, escapeHTML } from './utils.js';

export function renderVibeCoding(vibeData) {
  const container = document.getElementById('vibe-coding-container');
  if (!container) return;

  const { vibeCodingRules, promptTemplates } = vibeData;

  // Interactive Prompt Generator State
  let promptState = {
    projectType: 'E-Commerce Platform',
    os: 'win', // 'mac' | 'win'
    frontend: 'React + Vite',
    backend: 'Node.js + Express',
    database: 'MySQL',
    uiLibrary: 'shadcn/ui + Tailwind',
    stateManagement: 'Zustand',
    authMethod: 'JWT API Tokens',
    deployment: 'VPS + Docker'
  };

  const setupTemplate = promptTemplates.find(t => t.id === 'setup');
  const otherTemplates = promptTemplates.filter(t => t.id !== 'setup');

  const getCustomizedPrompt = () => {
    return setupTemplate.template
      .replace('{{projectType}}', promptState.projectType || 'Custom System')
      .replace('{{frontend}}', promptState.frontend)
      .replace('{{backend}}', promptState.backend)
      .replace('{{database}}', promptState.database)
      .replace('{{uiLibrary}}', promptState.uiLibrary)
      .replace('{{stateManagement}}', promptState.stateManagement)
      .replace('{{authMethod}}', promptState.authMethod)
      .replace('{{deployment}}', promptState.deployment);
  };

  const getScaffoldScript = () => {
    if (promptState.os === 'win') {
      return `md client\\public, client\\src\\assets, client\\src\\components\\ui, client\\src\\layouts, client\\src\\pages, client\\src\\hooks, client\\src\\services, client\\src\\context, client\\src\\utils, client\\src\\constants, client\\src\\config, server\\src\\controllers, server\\src\\services, server\\src\\models, server\\src\\routes, server\\src\\middlewares, server\\src\\config, server\\src\\utils, server\\src\\validators, server\\uploads, database\\migrations, database\\seeders, docs, context, tests\n\nni client\\src\\App.jsx, client\\package.json, server\\package.json, server\\src\\index.js, database\\schema.sql, database\\ERD.png, docs\\README.md, docs\\API.md, docs\\DEPLOYMENT.md, docs\\CHANGELOG.md, context\\PRD.md, context\\ARCHITECTURE.md, context\\SCHEMA.md, context\\DESIGN.md, context\\RULES.md, .env.example, .gitignore, README.md -ItemType File`;
    }
    return `mkdir -p client/public client/src/{assets,components/ui,layouts,pages,hooks,services,context,utils,constants,config} \\
  server/src/{controllers,services,models,routes,middlewares,config,utils,validators} server/uploads \\
  database/{migrations,seeders} docs context tests\n
touch client/src/App.jsx client/package.json server/package.json server/src/index.js \\
  database/schema.sql database/ERD.png \\
  docs/{README.md,API.md,DEPLOYMENT.md,CHANGELOG.md} \\
  context/{PRD.md,ARCHITECTURE.md,SCHEMA.md,DESIGN.md,RULES.md} \\
  .env.example .gitignore README.md`;
  };

  container.innerHTML = `
    <!-- Rules Banner -->
    <div class="vibe-rules-grid">
      ${vibeCodingRules.map(rule => `
        <div class="vibe-rule-card">
          <div class="vibe-rule-num">${rule.number}</div>
          <h4 class="vibe-rule-title">${rule.title}</h4>
          <p class="vibe-rule-desc">${rule.desc}</p>
        </div>
      `).join('')}
    </div>

    <!-- Master Interactive Prompt Generator Builder Card -->
    <div class="prompt-builder-card">
      <div class="builder-header">
        <div style="display: flex; justify-content: space-between; gap: 24px; flex-wrap: wrap;">
          <div>
            <span class="builder-badge">⚡ Interactive Prompt Generator</span>
            <h3 class="builder-title">Master System Initializer Prompt Builder</h3>
            <p class="builder-subtitle">Customize your tech stack to generate a portable setup prompt for any AI coding assistant.</p>
          </div>
          
          <!-- Micro-Tutorial / Instructional Animation Placeholder -->
          <div style="background: var(--surface-2); border: 1px dashed var(--line); border-radius: var(--radius-md); padding: 12px 16px; display: flex; align-items: center; gap: 16px;">
             <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
               <div style="background: var(--surface); border: 1px solid var(--teal); border-radius: 4px; padding: 6px; color: var(--teal);">${icons.copy}</div>
               <span style="font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace;">1. COPY</span>
             </div>
             <div style="color: var(--line);">➔</div>
             <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
               <div style="background: var(--surface); border: 1px solid var(--line); border-radius: 4px; padding: 6px; color: var(--text);">🤖</div>
               <span style="font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace;">2. OPEN AI</span>
             </div>
             <div style="color: var(--line);">➔</div>
             <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
               <div style="background: var(--surface); border: 1px solid var(--gold); border-radius: 4px; padding: 6px; color: var(--gold);">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
               </div>
               <span style="font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace;">3. PASTE & SEND</span>
             </div>
          </div>
        </div>
      </div>

      <div class="builder-controls" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="control-group" style="grid-column: 1 / -1;">
          <label class="control-label">Project System Type:</label>
          <input type="text" id="inp-project-type" class="text-input" style="width:100%; padding:10px; border:1px solid var(--line); background:var(--surface-2); border-radius:var(--radius); color:var(--text); font-family:inherit;" value="E-Commerce Platform" placeholder="e.g. Employee Portal, Booking System" />
        </div>

        <div class="control-group">
          <label class="control-label">Operating System:</label>
          <select id="sel-os" class="select-input">
            <option value="win">Windows (PowerShell)</option>
            <option value="mac">Mac / Linux (Bash)</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Frontend Stack:</label>
          <select id="sel-frontend" class="select-input">
            <option value="React + Vite">React + Vite (Vanilla CSS)</option>
            <option value="Vue.js 3 + Vite">Vue.js 3 + Vite</option>
            <option value="PHP Blade / HTML5">PHP Blade / HTML5</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Backend Stack:</label>
          <select id="sel-backend" class="select-input">
            <option value="Node.js + Express">Node.js + Express</option>
            <option value="PHP / Laravel">PHP / Laravel</option>
            <option value="Native PHP">Native PHP (Modular)</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Database Engine:</label>
          <select id="sel-database" class="select-input">
            <option value="MySQL">MySQL</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="SQLite">SQLite</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">UI Component Library:</label>
          <select id="sel-uilibrary" class="select-input">
            <option value="shadcn/ui + Tailwind">shadcn/ui + Tailwind</option>
            <option value="Tailwind CSS Only">Tailwind CSS Only</option>
            <option value="Bootstrap 5">Bootstrap 5</option>
            <option value="Material UI (MUI)">Material UI (MUI)</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">State Management:</label>
          <select id="sel-statemanagement" class="select-input">
            <option value="Zustand">Zustand</option>
            <option value="Redux Toolkit">Redux Toolkit</option>
            <option value="React Context API">React Context API</option>
            <option value="Vuex / Pinia">Vuex / Pinia</option>
            <option value="None / Vanilla State">None / Vanilla State</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Authentication Method:</label>
          <select id="sel-authmethod" class="select-input">
            <option value="JWT API Tokens">JWT API Tokens</option>
            <option value="Session Cookies">Session Cookies</option>
            <option value="NextAuth / Auth.js">NextAuth / Auth.js</option>
            <option value="Firebase Auth">Firebase Auth</option>
            <option value="OAuth (Social Logins)">OAuth (Social Logins)</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Deployment Target:</label>
          <select id="sel-deployment" class="select-input">
            <option value="VPS + Docker">VPS + Docker</option>
            <option value="Vercel / Netlify (Serverless)">Vercel / Netlify (Serverless)</option>
            <option value="AWS / GCP">AWS / GCP Cloud</option>
            <option value="Shared Hosting / cPanel">Shared Hosting / cPanel</option>
          </select>
        </div>
      </div>

      <div class="prompt-outputs-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <!-- Step 1: Script Output -->
        <div class="prompt-output-box">
          <div class="prompt-output-header">
            <div>
              <div style="font-weight:700; color:var(--teal);">Step 1: Folder Scaffolding Script</div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:2px;">Run this in your terminal to instantly create the folders.</div>
            </div>
            <button class="btn-sm-primary" id="copy-script-btn">
              ${icons.copy} Copy Script
            </button>
          </div>
          <pre class="code-pre" id="script-output" style="max-height:350px;"><code>${escapeHTML(getScaffoldScript())}</code></pre>
        </div>

        <!-- Step 2: Prompt Output -->
        <div class="prompt-output-box">
          <div class="prompt-output-header">
            <div>
              <div style="font-weight:700; color:var(--gold);">Step 2: Master Setup Prompt</div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:2px;">Paste this into AI to start generating boilerplate code.</div>
            </div>
            <button class="btn-sm-primary" id="copy-master-prompt-btn">
              ${icons.copy} Copy Prompt
            </button>
          </div>
          <pre class="code-pre" id="master-prompt-output" style="max-height:350px;"><code>${escapeHTML(getCustomizedPrompt())}</code></pre>
        </div>
      </div>
    </div>

    <!-- Additional Prompt Templates -->
    <div class="prompt-templates-heading">
      <h3>Workflow Prompt Templates</h3>
      <p>Use these prompts during active development iterations with your AI coding tool.</p>
    </div>

    <div class="prompt-templates-grid">
      ${otherTemplates.map(tmpl => `
        <div class="template-card">
          <div class="template-header">
            <div>
              <span class="template-badge">${tmpl.badge}</span>
              <h4 class="template-title">${tmpl.title}</h4>
            </div>
            <button class="btn-secondary btn-copy-tmpl" data-tmpl-id="${tmpl.id}">
              ${icons.copy} Copy
            </button>
          </div>
          <p class="template-desc">${tmpl.desc}</p>
          <div class="prompt-preview-pre"><code>${escapeHTML(tmpl.template)}</code></div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach Selector Event Listeners
  const inpProjectType = document.getElementById('inp-project-type');
  const selOs = document.getElementById('sel-os');
  const selFrontend = document.getElementById('sel-frontend');
  const selBackend = document.getElementById('sel-backend');
  const selDatabase = document.getElementById('sel-database');
  const selUiLibrary = document.getElementById('sel-uilibrary');
  const selStateManagement = document.getElementById('sel-statemanagement');
  const selAuthMethod = document.getElementById('sel-authmethod');
  const selDeployment = document.getElementById('sel-deployment');
  const promptOutput = document.getElementById('master-prompt-output');
  const scriptOutput = document.getElementById('script-output');
  const copyMasterBtn = document.getElementById('copy-master-prompt-btn');
  const copyScriptBtn = document.getElementById('copy-script-btn');

  const updatePromptDisplay = () => {
    if (inpProjectType) promptState.projectType = inpProjectType.value;
    if (selOs) promptState.os = selOs.value;
    if (selFrontend) promptState.frontend = selFrontend.value;
    if (selBackend) promptState.backend = selBackend.value;
    if (selDatabase) promptState.database = selDatabase.value;
    if (selUiLibrary) promptState.uiLibrary = selUiLibrary.value;
    if (selStateManagement) promptState.stateManagement = selStateManagement.value;
    if (selAuthMethod) promptState.authMethod = selAuthMethod.value;
    if (selDeployment) promptState.deployment = selDeployment.value;
    
    if (promptOutput) promptOutput.innerHTML = `<code>${escapeHTML(getCustomizedPrompt())}</code>`;
    if (scriptOutput) scriptOutput.innerHTML = `<code>${escapeHTML(getScaffoldScript())}</code>`;
  };

  if (inpProjectType) inpProjectType.oninput = updatePromptDisplay;
  if (selOs) selOs.onchange = updatePromptDisplay;
  if (selFrontend) selFrontend.onchange = updatePromptDisplay;
  if (selBackend) selBackend.onchange = updatePromptDisplay;
  if (selDatabase) selDatabase.onchange = updatePromptDisplay;
  if (selUiLibrary) selUiLibrary.onchange = updatePromptDisplay;
  if (selStateManagement) selStateManagement.onchange = updatePromptDisplay;
  if (selAuthMethod) selAuthMethod.onchange = updatePromptDisplay;
  if (selDeployment) selDeployment.onchange = updatePromptDisplay;

  if (copyMasterBtn) {
    copyMasterBtn.onclick = () => {
      copyToClipboard(getCustomizedPrompt(), 'Copied Master System Setup Prompt!');
    };
  }
  if (copyScriptBtn) {
    copyScriptBtn.onclick = () => {
      copyToClipboard(getScaffoldScript(), 'Copied Folder Scaffolding Script!');
    };
  }

  // Attach Preset Copy Listeners
  container.querySelectorAll('.btn-copy-tmpl').forEach(btn => {
    btn.onclick = () => {
      const tmplId = btn.dataset.tmplId;
      const tmpl = otherTemplates.find(t => t.id === tmplId);
      if (tmpl) {
        copyToClipboard(tmpl.template, `Copied ${tmpl.title}!`);
      }
    };
  });
}
