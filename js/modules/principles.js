/**
 * Core Development Principles Renderer
 */

export function renderPrinciples(principles) {
  const container = document.getElementById('principles-grid');
  if (!container) return;

  container.innerHTML = principles.map(p => `
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
