/**
 * AI Context Briefing Kit Tabs Renderer
 */
import { icons, copyToClipboard, escapeHTML } from './utils.js';

export function renderContextKit(contextDocs, state) {
  const tabsNav = document.getElementById('context-tabs-nav');
  const tabBody = document.getElementById('context-tab-body');

  if (!tabsNav || !tabBody) return;

  // Render Nav Buttons
  tabsNav.innerHTML = contextDocs.map(doc => `
    <button class="ctx-tab-btn ${state.activeContextTab === doc.id ? 'active' : ''}" data-doc-id="${doc.id}">
      <div style="display:flex; align-items:center; gap:6px;">
        ${icons.file}
        ${doc.filename}
      </div>
    </button>
  `).join('');

  // Render Body
  const activeDoc = contextDocs.find(d => d.id === state.activeContextTab) || contextDocs[0];
  tabBody.innerHTML = `
    <div class="ctx-tab-header">
      <div>
        <div class="ctx-tab-title">${activeDoc.filename} &mdash; ${activeDoc.title}</div>
        <div style="font-size:13px; color:var(--text-dim); margin-top:4px;">${activeDoc.subtitle}</div>
      </div>
      <button class="btn-secondary" id="copy-doc-template-btn" style="padding:6px 12px; font-size:12px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy Boilerplate
      </button>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-size:12px; font-weight:600; color:var(--text); margin-bottom:8px;">Required Sections:</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${activeDoc.sections.map(s => `<span class="lib-tag">${s}</span>`).join('')}
      </div>
    </div>
    <pre class="ctx-content-pre"><code>${escapeHTML(activeDoc.templateContent)}</code></pre>
  `;

  // Attach Nav Listeners
  tabsNav.querySelectorAll('.ctx-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeContextTab = btn.dataset.doc-id;
      renderContextKit(contextDocs, state);
    });
  });

  // Attach Copy Button Listener
  const copyBtn = document.getElementById('copy-doc-template-btn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      copyToClipboard(activeDoc.templateContent, `Copied ${activeDoc.filename} boilerplate template!`);
    };
  }
}
