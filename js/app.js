/**
 * Universal Project Structure Guide - Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    checklist: JSON.parse(localStorage.getItem('ups_checklist') || '{}'),
    selectedTreeNode: null,
    activeContextTab: 'prd',
    uiFilter: 'all',
    theme: localStorage.getItem('ups_theme') || 'dark',
    searchQuery: ''
  };

  // Lucide Icons SVG helper
  const icons = {
    users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    layout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    'git-branch': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
    server: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    'file-text': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    'shield-check': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    folder: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    file: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
    contextFile: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-context"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  // Initialize Theme
  if (state.theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // DOM Elements
  const phaseStepsGrid = document.getElementById('phase-steps-grid');
  const treeContainer = document.getElementById('tree-container');
  const treeDetailName = document.getElementById('tree-detail-name');
  const treeDetailDesc = document.getElementById('tree-detail-desc');
  const principlesGrid = document.getElementById('principles-grid');
  const contextTabsNav = document.getElementById('context-tabs-nav');
  const contextTabBody = document.getElementById('context-tab-body');
  const uiLibrariesGrid = document.getElementById('ui-libraries-grid');
  const depChecklistContainer = document.getElementById('dep-checklist-container');
  const globalProgressFill = document.getElementById('global-progress-fill');
  const globalProgressText = document.getElementById('global-progress-text');

  // --- Render Functions ---

  // 1. Render Phase 0 Steps
  function renderPhase0() {
    const phaseStepsGrid = document.getElementById('phase-steps-grid');
    if (!phaseStepsGrid) return;
    
    // Load wizard state to sync initial values
    const savedState = JSON.parse(localStorage.getItem('ups_wizard_data') || 'null') || {};
    const defaultValues = {
      'sync-wiz-app-name': savedState.appName || '',
      'sync-wiz-problem': savedState.problem || '',
      'sync-wiz-roles': savedState.roles || '',
      'sync-wiz-features': savedState.features || ''
    };

    phaseStepsGrid.innerHTML = GUIDE_DATA.phase0.map(step => {
      return `
        <div class="step-card" id="${step.id}">
          <div class="step-header">
            <div class="step-badge-group">
              <div class="step-number">${step.stepNumber}</div>
              <h3 class="step-title">${step.title}</h3>
            </div>
            <span class="step-dest">${step.whereItEndsUp}</span>
          </div>
          <p class="step-summary">${step.summary}</p>
          <div class="step-callout">
            <strong>Why this matters:</strong> ${step.whyItMatters}
          </div>
          
          ${step.formFields ? `
            <div class="checklist-form-group">
              ${step.formFields.map(f => {
                const initVal = defaultValues[f.id] || '';
                return `
                <div class="checklist-field">
                  <label>${f.label}</label>
                  <input type="text" id="${f.id}" class="checklist-input" placeholder="${f.placeholder}" value="${initVal.replace(/"/g, '&quot;')}" />
                </div>
                `;
              }).join('')}
            </div>
          ` : ''}

          <div class="task-list">
            ${step.tasks.map(task => {
              const isChecked = !!state.checklist[task.id];
              return `
                <div class="task-item ${isChecked ? 'completed' : ''}" data-task-id="${task.id}">
                  <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} id="${task.id}" />
                  <label for="${task.id}" class="task-text">${task.text}</label>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Attach Task Checkbox Listeners
    phaseStepsGrid.querySelectorAll('.task-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const taskId = item.dataset.taskId;
        const checkbox = item.querySelector('.task-checkbox');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        state.checklist[taskId] = checkbox.checked;
        localStorage.setItem('ups_checklist', JSON.stringify(state.checklist));
        item.classList.toggle('completed', checkbox.checked);
        updateProgress();
      });
    });

    // Attach Checklist Form Sync Listeners
    const syncMapping = {
      'sync-wiz-app-name': 'wiz-app-name',
      'sync-wiz-problem': 'wiz-problem',
      'sync-wiz-roles': 'wiz-roles',
      'sync-wiz-features': 'wiz-features'
    };

    Object.keys(syncMapping).forEach(syncId => {
      const syncInput = document.getElementById(syncId);
      if (syncInput) {
        syncInput.addEventListener('input', (e) => {
          const targetWizInput = document.getElementById(syncMapping[syncId]);
          if (targetWizInput) {
            targetWizInput.value = e.target.value;
            // Trigger input event on the wizard field so docGenerator updates preview
            targetWizInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      }
    });
  }

  // 2. Render Folder Tree Explorer
  function renderFolderTree() {
    if (!treeContainer) return;

    function buildTreeHTML(node) {
      const isFolder = node.type === 'folder';
      const icon = isFolder ? icons.folder : (node.name.endsWith('.md') ? icons.contextFile : icons.file);
      
      let html = `<div class="tree-node">`;
      html += `
        <div class="tree-node-content" data-name="${node.name}" data-desc="${node.desc}">
          ${icon}
          <span>${node.name}</span>
          ${node.desc ? `<span class="node-desc-preview">- ${node.desc}</span>` : ''}
        </div>
      `;

      if (isFolder && node.children && node.children.length > 0) {
        html += `<div class="tree-children">`;
        node.children.forEach(child => {
          html += buildTreeHTML(child);
        });
        html += `</div>`;
      }
      html += `</div>`;
      return html;
    }

    treeContainer.innerHTML = buildTreeHTML(GUIDE_DATA.folderStructure);

    // Tree Node Click Handler
    treeContainer.querySelectorAll('.tree-node-content').forEach(nodeEl => {
      nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        treeContainer.querySelectorAll('.tree-node-content').forEach(n => n.classList.remove('selected'));
        nodeEl.classList.add('selected');

        const name = nodeEl.dataset.name;
        const desc = nodeEl.dataset.desc;
        if (treeDetailName) treeDetailName.textContent = name;
        if (treeDetailDesc) treeDetailDesc.textContent = desc || "Standard directory/file component.";
      });
    });
  }

  // 3. Render Principles Grid
  function renderPrinciples() {
    if (!principlesGrid) return;
    principlesGrid.innerHTML = GUIDE_DATA.principles.map(p => `
      <div class="principle-card">
        <div>
          <div class="principle-header">
            <span class="principle-num">${p.number}</span>
            <span class="principle-tag">${p.tag}</span>
          </div>
          <h3 class="principle-title">${p.title}</h3>
          <p class="principle-desc">${p.desc}</p>
        </div>
        <div class="comparison-box">
          <div class="comp-do">
            <strong>✓ DO THIS:</strong> ${p.doThis}
          </div>
          <div class="comp-dont">
            <strong>✕ DON'T:</strong> ${p.dontDoThis}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 4. Render Context Briefing Kit Tabs
  function renderContextKit() {
    if (!contextTabsNav || !contextTabBody) return;

    // Navigation Tabs
    contextTabsNav.innerHTML = GUIDE_DATA.contextDocs.map(doc => `
      <button class="context-tab-btn ${state.activeContextTab === doc.id ? 'active' : ''}" data-doc-id="${doc.id}">
        ${icons.file}
        ${doc.filename}
      </button>
    `).join('');

    // Tab Body Content
    const doc = GUIDE_DATA.contextDocs.find(d => d.id === state.activeContextTab) || GUIDE_DATA.contextDocs[0];
    contextTabBody.innerHTML = `
      <div class="tab-info-col">
        <h3>${doc.title} (${doc.filename})</h3>
        <div class="tab-subtitle">${doc.subtitle}</div>
        <div class="sections-heading">Key Required Sections:</div>
        <div class="sections-pill-list">
          ${doc.sections.map(s => `<span class="sec-pill">• ${s}</span>`).join('')}
        </div>
        <button class="btn-sm-primary" id="copy-doc-template-btn">
          ${icons.copy} Copy ${doc.filename} Boilerplate
        </button>
      </div>
      <div class="tab-code-col">
        <div class="code-col-header">
          <span>Template Preview</span>
          <span>Markdown</span>
        </div>
        <pre class="code-pre"><code>${escapeHTML(doc.templateContent)}</code></pre>
      </div>
    `;

    // Attach Tab Switchers
    contextTabsNav.querySelectorAll('.context-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeContextTab = btn.dataset.doc-id;
        renderContextKit();
      });
    });

    // Copy Template Button
    const copyBtn = document.getElementById('copy-doc-template-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyToClipboard(doc.templateContent, `Copied ${doc.filename} boilerplate template!`);
      });
    }
  }

  // 5. Render UI Component Libraries
  function renderUILibraries() {
    if (!uiLibrariesGrid) return;

    const filtered = GUIDE_DATA.uiLibraries.filter(lib => {
      if (state.uiFilter === 'all') return true;
      return lib.tags.map(t => t.toLowerCase()).includes(state.uiFilter.toLowerCase());
    });

    uiLibrariesGrid.innerHTML = filtered.map(lib => `
      <div class="ui-card">
        <div>
          <div class="ui-card-header">
            <div>
              <h3 class="ui-name">${lib.name}</h3>
              <div class="ui-type">${lib.type}</div>
            </div>
            ${lib.badge ? `<span class="ui-badge">${lib.badge}</span>` : ''}
          </div>
          <p class="ui-desc">${lib.description}</p>
          <div class="pros-cons-box">
            ${lib.pros.map(pro => `<div class="pro-item">✓ ${pro}</div>`).join('')}
            ${lib.cons.map(con => `<div class="con-item">✕ ${con}</div>`).join('')}
          </div>
        </div>
        <div class="ui-best-for">
          <strong>Best For:</strong> ${lib.bestFor}
        </div>
      </div>
    `).join('');
  }

  // Filter Chips Listener
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.uiFilter = chip.dataset.filter;
      renderUILibraries();
    });
  });

  // 6. Render Deployment Checklist
  function renderDeploymentChecklist() {
    if (!depChecklistContainer) return;
    depChecklistContainer.innerHTML = `
      <div class="dep-checklist-card">
        <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Handover Pre-Flight Verification</h3>
        <div class="task-list">
          ${GUIDE_DATA.deploymentChecklist.map(item => {
            const isChecked = !!state.checklist[item.id];
            return `
              <div class="task-item ${isChecked ? 'completed' : ''}" data-task-id="${item.id}">
                <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} id="${item.id}" />
                <label for="${item.id}" class="task-text">${item.text}</label>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    depChecklistContainer.querySelectorAll('.task-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const taskId = item.dataset.taskId;
        const checkbox = item.querySelector('.task-checkbox');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        state.checklist[taskId] = checkbox.checked;
        localStorage.setItem('ups_checklist', JSON.stringify(state.checklist));
        item.classList.toggle('completed', checkbox.checked);
        updateProgress();
      });
    });
  }

  // --- Helper & Utility Functions ---

  // Global Progress Calculator
  function updateProgress() {
    const totalTasks = GUIDE_DATA.phase0.reduce((acc, step) => acc + step.tasks.length, 0) + GUIDE_DATA.deploymentChecklist.length;
    const completedTasks = Object.values(state.checklist).filter(Boolean).length;
    const percentage = Math.round((completedTasks / totalTasks) * 100);

    if (globalProgressFill) globalProgressFill.style.width = `${percentage}%`;
    if (globalProgressText) globalProgressText.textContent = `${percentage}% (${completedTasks}/${totalTasks})`;
  }

  // Copy to Clipboard
  function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy. Please copy manually.');
    });
  }

  // Toast Notification
  function showToast(msg) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${icons.check} <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // HTML Escaper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }

  // Copy Folder Tree ASCII
  const copyTreeBtn = document.getElementById('copy-tree-btn');
  if (copyTreeBtn) {
    copyTreeBtn.addEventListener('click', () => {
      const asciiTree = `
project-root/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── config/
│   │   └── App.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   ├── utils/
│   │   └── validators/
│   ├── uploads/
│   └── package.json
├── database/
│   ├── migrations/
│   ├── seeders/
│   ├── schema.sql
│   └── ERD.png
├── docs/
│   ├── README.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CHANGELOG.md
├── context/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── DESIGN.md
│   └── RULES.md
├── tests/
├── .env.example
├── .gitignore
└── README.md`;
      copyToClipboard(asciiTree, 'Copied full directory structure ASCII tree!');
    });
  }

  // Copy PowerShell Script Generator
  const copyScriptBtn = document.getElementById('copy-script-btn');
  if (copyScriptBtn) {
    copyScriptBtn.addEventListener('click', () => {
      const script = `# PowerShell Directory Creator Script
New-Item -ItemType Directory -Force -Path "client/public","client/src/assets","client/src/components/ui","client/src/layouts","client/src/pages","client/src/hooks","client/src/services","client/src/context","client/src/utils","client/src/constants","client/src/config"
New-Item -ItemType Directory -Force -Path "server/src/controllers","server/src/services","server/src/models","server/src/routes","server/src/middlewares","server/src/config","server/src/utils","server/src/validators","server/uploads"
New-Item -ItemType Directory -Force -Path "database/migrations","database/seeders","docs","context","tests"
New-Item -ItemType File -Force -Path "context/PRD.md","context/ARCHITECTURE.md","context/SCHEMA.md","context/DESIGN.md","context/RULES.md",".env.example",".gitignore","README.md","database/schema.sql"
Write-Host "Universal Project Structure Created Successfully!" -ForegroundColor Green`;
      copyToClipboard(script, 'Copied PowerShell structure creation script!');
    });
  }

  // Theme Toggle Button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('ups_theme', state.theme);
      showToast(`Switched to ${state.theme} mode`);
    });
  }

  // Interactive UI Quiz logic
  const quizBtns = document.querySelectorAll('.quiz-btn');
  const quizResult = document.getElementById('quiz-result');
  if (quizBtns && quizResult) {
    quizBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        let recommendation = "";

        if (choice === 'standard') {
          recommendation = "<strong>Recommended: shadcn/ui</strong><br>Standard for most client projects. You own the component source code, zero bundle bloat, beautiful baseline styles with Tailwind.";
        } else if (choice === 'fast') {
          recommendation = "<strong>Recommended: daisyUI</strong><br>Fastest for quick client demos & MVPs. Over 35+ instant themes out of the box with zero JavaScript dependency.";
        } else if (choice === 'admin') {
          recommendation = "<strong>Recommended: Ant Design (antd)</strong><br>Best for data-heavy admin portals and back-office management systems with ready-made tables, forms, and filters.";
        } else if (choice === 'landing') {
          recommendation = "<strong>Recommended: shadcn/ui + Aceternity / Magic UI</strong><br>Pair shadcn with Aceternity/Magic UI for animated hero sections, glowing card grids, and interactive visual flair.";
        }

        quizResult.innerHTML = recommendation;
        quizResult.classList.add('active');
      });
    });
  }

  // Global Search Filter
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll('.section');
      
      sections.forEach(sec => {
        if (!q) {
          sec.style.display = 'block';
          return;
        }
        const text = sec.textContent.toLowerCase();
        sec.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }

  // Initial Execution
  renderPhase0();
  renderFolderTree();
  renderPrinciples();
  renderContextKit();
  renderUILibraries();
  renderDeploymentChecklist();
  updateProgress();
});
