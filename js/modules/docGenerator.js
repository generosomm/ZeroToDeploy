/**
 * Interactive App Briefing Generator Wizard for Beginners
 */
import { icons, copyToClipboard, escapeHTML } from './utils.js';

export function renderDocGenerator() {
  const container = document.getElementById('doc-generator-container');
  if (!container) return;

  const savedState = JSON.parse(localStorage.getItem('ups_wizard_data') || 'null');
  const formState = savedState || {
    appName: 'My New Website',
    problem: 'Managing client requests manually on spreadsheets',
    roles: 'Admin, Staff, Client',
    features: 'User Login, Request Form, Dashboard Overview, Export PDF Reports'
  };

  const generateDocs = () => {
    return {
      prd: `# PRD: ${formState.appName}\n\n## 1. Executive Summary\n${formState.appName} is built to solve: ${formState.problem}.\n\n## 2. Target User Roles\n${formState.roles.split(',').map(r => `- **${r.trim()}**`).join('\n')}\n\n## 3. Launch Day Core Features (MVP)\n${formState.features.split(',').map(f => `- [ ] ${f.trim()}`).join('\n')}\n\n## 4. Success Metrics\n- 50% faster request processing time.\n- Zero paper forms post-launch.`,
      arch: `# ARCHITECTURE: ${formState.appName}\n\n## 1. High-Level Flow\n[Frontend Screens (React/HTML)] <---> [API Gateway / Server Routes] <---> [Services Layer] <---> [Database Layer]\n\n## 2. Layer Rules\n- **Controllers**: Handle HTTP input/output.\n- **Services**: Pure business logic routines.\n- **Models**: Database schema definitions.`,
      schema: `# SCHEMA: ${formState.appName}\n\n## 1. Core Data Entities\n- \`users\` (id, name, email, password_hash, role, created_at)\n- \`records\` (id, user_id, title, status, details, created_at)\n\n## 2. Core API Endpoints\n- \`POST /api/v1/auth/login\`\n- \`GET /api/v1/records\`\n- \`POST /api/v1/records\``,
      design: `# DESIGN SYSTEM: ${formState.appName}\n\n## 1. Brand Tokens\n- Primary Color: Deep Cyan (\`#06b6d4\`)\n- Dark Theme Background: Obsidian (\`#0b0f19\`)\n- Surface: Glass Slate (\`rgba(30, 41, 59, 0.7)\`)\n- Font Family: Inter, sans-serif`,
      rules: `# RULES: ${formState.appName}\n\n## 1. Coding House Rules\n- **Component-First**: Create reusable UI pieces in \`components/\`.\n- **Service Layer**: Never fetch API directly inside page views.\n- **No Magic Strings**: Store all roles and status codes in \`constants/\`.\n- **Config in .env**: Store secrets in \`.env\`.`
    };
  };

  let generated = generateDocs();

  container.innerHTML = `
    <div class="wizard-card">
      <div class="wizard-header">
        <span class="wizard-badge">✨ Beginner Briefing Generator Wizard</span>
        <h3 class="wizard-title">Answer 4 Questions to Generate Your AI Briefing Kit</h3>
        <p class="wizard-subtitle">Fill in your app details below. We'll automatically build all 5 required AI briefing files for your project!</p>
      </div>

      <div class="wizard-form-grid">
        <div class="wizard-field">
          <label>1. What is your App or Website Name?</label>
          <input type="text" id="wiz-app-name" value="${escapeHTML(formState.appName)}" placeholder="e.g. Citizen Portal" />
        </div>

        <div class="wizard-field">
          <label>2. What main problem does it solve?</label>
          <input type="text" id="wiz-problem" value="${escapeHTML(formState.problem)}" placeholder="e.g. Manual paper record tracking" />
        </div>

        <div class="wizard-field">
          <label>3. Who will use the website? (Separate with commas)</label>
          <input type="text" id="wiz-roles" value="${escapeHTML(formState.roles)}" placeholder="e.g. Admin, Staff, Customer" />
        </div>

        <div class="wizard-field">
          <label>4. List key features needed for launch (Comma separated)</label>
          <input type="text" id="wiz-features" value="${escapeHTML(formState.features)}" placeholder="e.g. User Login, Submit Form, Dashboard" />
        </div>
      </div>

      <div class="wizard-output-section">
        <div class="wizard-tabs-nav">
          <button class="wiz-tab-btn active" data-doc="prd">PRD.md</button>
          <button class="wiz-tab-btn" data-doc="arch">ARCHITECTURE.md</button>
          <button class="wiz-tab-btn" data-doc="schema">SCHEMA.md</button>
          <button class="wiz-tab-btn" data-doc="design">DESIGN.md</button>
          <button class="wiz-tab-btn" data-doc="rules">RULES.md</button>
        </div>

        <div class="wizard-output-body">
          <div class="wiz-output-header">
            <span id="wiz-active-filename">PRD.md (Generated Preview)</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-sm-primary" id="copy-wiz-doc-btn" style="background: var(--surface-2); border-color: var(--line); color: var(--text);">
                ${icons.copy} Copy Current File
              </button>
              <button class="btn-sm-primary" id="download-zip-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Project (.zip)
              </button>
            </div>
          </div>
          <pre class="code-pre" id="wiz-code-preview"><code>${escapeHTML(generated.prd)}</code></pre>
        </div>
      </div>
    </div>
  `;

  // Attach Input Listeners
  let currentDocKey = 'prd';
  const nameInput = document.getElementById('wiz-app-name');
  const probInput = document.getElementById('wiz-problem');
  const rolesInput = document.getElementById('wiz-roles');
  const featInput = document.getElementById('wiz-features');
  const codePreview = document.getElementById('wiz-code-preview');
  const filenameLabel = document.getElementById('wiz-active-filename');

  const updatePreview = () => {
    if (nameInput) formState.appName = nameInput.value || 'My Website';
    if (probInput) formState.problem = probInput.value || 'Manual processes';
    if (rolesInput) formState.roles = rolesInput.value || 'Admin, User';
    if (featInput) formState.features = featInput.value || 'Login, Dashboard';

    // Auto-save to localStorage
    localStorage.setItem('ups_wizard_data', JSON.stringify(formState));

    generated = generateDocs();
    if (codePreview) codePreview.innerHTML = `<code>${escapeHTML(generated[currentDocKey])}</code>`;
  };

  [nameInput, probInput, rolesInput, featInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updatePreview);
  });

  // Attach Tab Switchers
  container.querySelectorAll('.wiz-tab-btn').forEach(btn => {
    btn.onclick = () => {
      container.querySelectorAll('.wiz-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDocKey = btn.dataset.doc;
      if (filenameLabel) filenameLabel.textContent = `${currentDocKey.toUpperCase()}.md (Generated Preview)`;
      updatePreview();
    };
  });

  // Copy Active Generated Doc
  const copyBtn = document.getElementById('copy-wiz-doc-btn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      copyToClipboard(generated[currentDocKey], `Copied generated ${currentDocKey.toUpperCase()}.md!`);
    };
  }

  // Generate and Download .zip Archive
  const zipBtn = document.getElementById('download-zip-btn');
  if (zipBtn) {
    zipBtn.onclick = async () => {
      try {
        if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
          showToast('Error: ZIP library not loaded yet. Try again.');
          return;
        }

        const zip = new JSZip();
        
        // Create base folders
        zip.folder("client");
        zip.folder("server");
        zip.folder("docs");
        
        // Create the context folder and add all generated markdown files
        const ctxFolder = zip.folder("context");
        ctxFolder.file("prd.md", generated.prd);
        ctxFolder.file("architecture.md", generated.arch);
        ctxFolder.file("schema.md", generated.schema);
        ctxFolder.file("design.md", generated.design);
        ctxFolder.file("rules.md", generated.rules);
        
        // Add a helpful readme
        zip.file("README.md", `# ${formState.appName}\n\nThis project skeleton was generated by the Zero to Deploy App Briefing Wizard.\n\n## Getting Started\n1. Open this folder in your code editor (Cursor / VSCode).\n2. Drag the contents of the \`context/\` folder into your AI chat.\n3. Run your setup prompt to begin generating code!`);

        // Generate and download
        const blob = await zip.generateAsync({ type: "blob" });
        const safeName = formState.appName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'project';
        saveAs(blob, `${safeName}_skeleton.zip`);
        
        showToast('Project bundle downloaded successfully! 🎉');
      } catch (err) {
        console.error(err);
        showToast('Failed to create .zip file.');
      }
    };
  }
}
