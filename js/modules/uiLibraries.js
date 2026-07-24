/**
 * UI Component Libraries Grid & Quiz Renderer
 */

export function renderUILibraries(libraries, state) {
  const container = document.getElementById('ui-libraries-grid');
  if (!container) return;

  const filtered = libraries.filter(lib => {
    if (state.uiFilter === 'all') return true;
    return lib.tags.map(t => t.toLowerCase()).includes(state.uiFilter.toLowerCase());
  });

  container.innerHTML = filtered.map(lib => `
    <div class="ui-lib-card">
      <div>
        <div class="lib-card-header">
          <div>
            <h3 class="lib-name">${lib.name}</h3>
            <div class="lib-desc" style="margin-bottom:0; font-size:12px;">${lib.type}</div>
          </div>
          ${lib.badge ? `<span class="lib-tag">${lib.badge}</span>` : ''}
        </div>
        <p class="lib-desc">${lib.description}</p>
        <div class="pros-cons-box">
          ${lib.pros.map(pro => `<div class="pro-item">✓ ${pro}</div>`).join('')}
          ${lib.cons.map(con => `<div class="con-item">✕ ${con}</div>`).join('')}
        </div>
      </div>
      <div class="lib-desc" style="margin-top:16px; color:var(--text);">
        <strong>Best For:</strong> ${lib.bestFor}
      </div>
    </div>
  `).join('');

  // Filter Chips Listeners
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.uiFilter = chip.dataset.filter;
      renderUILibraries(libraries, state);
    };
  });

  // Decision Quiz Listeners
  const quizBtns = document.querySelectorAll('.quiz-btn');
  const quizResult = document.getElementById('quiz-result');
  if (quizBtns && quizResult) {
    quizBtns.forEach(btn => {
      btn.onclick = () => {
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
      };
    });
  }
}
