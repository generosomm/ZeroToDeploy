/**
 * Phase 0 Checklist Renderer
 */

export function renderPhase0(steps, state, onTaskToggle) {
  const container = document.getElementById('phase-steps-grid');
  if (!container) return;

  // Load wizard state to sync initial values
  const savedState = JSON.parse(localStorage.getItem('ups_wizard_data') || 'null') || {};
  const defaultValues = {
    'sync-wiz-app-name': savedState.appName || '',
    'sync-wiz-problem': savedState.problem || '',
    'sync-wiz-roles': savedState.roles || '',
    'sync-wiz-features': savedState.features || '',
    'sync-wiz-stack': savedState.stack || ''
  };

  container.innerHTML = steps.map(step => `
    <div class="phase-step-card" id="${step.id}">
      <div class="phase-step-header">
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="phase-step-num">${step.stepNumber}</div>
          <h3 class="phase-step-title">${step.title}</h3>
        </div>
        <span class="step-dest" style="margin-left:auto; font-size:12px; color:var(--text-dim);">${step.whereItEndsUp}</span>
      </div>
      <p class="step-summary" style="padding:16px 20px 0;">${step.summary}</p>
      <div class="step-callout" style="padding:0 20px; font-size:13px; color:var(--gold); margin-top:8px;">
        <strong>Why this matters:</strong> ${step.whyItMatters}
      </div>
      
      ${step.formFields ? `
        <div class="checklist-form-group" style="margin: 16px 20px; padding: 16px; background: var(--surface-1); border-radius: var(--radius); border: 1px dashed var(--line); display: flex; flex-direction: column; gap: 12px;">
          ${step.formFields.map(f => {
            const initVal = defaultValues[f.id] || '';
            return `
            <div class="checklist-field" style="display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 13px; font-weight: 600; color: var(--teal); text-transform: uppercase; letter-spacing: 0.05em;">${f.label}</label>
              <input type="text" id="${f.id}" class="checklist-input" placeholder="${f.placeholder}" value="${initVal.replace(/"/g, '&quot;')}" style="background: var(--surface-0); border: 1px solid var(--line); color: var(--text); padding: 10px 12px; border-radius: 4px; font-family: 'Inter', sans-serif; font-size: 14px; width: 100%; transition: border-color 0.2s, box-shadow 0.2s;" />
            </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <div class="phase-tasks-list">
        ${step.tasks.map(task => {
          const isChecked = !!state.checklist[task.id];
          return `
            <div class="phase-task-item ${isChecked ? 'done' : ''}" data-task-id="${task.id}">
              <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} id="${task.id}" />
              <label for="${task.id}" class="task-text">${task.text}</label>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.phase-task-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const taskId = item.dataset.taskId;
      const checkbox = item.querySelector('.task-checkbox');
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      state.checklist[taskId] = checkbox.checked;
      localStorage.setItem('ups_checklist', JSON.stringify(state.checklist));
      item.classList.toggle('done', checkbox.checked);
      if (onTaskToggle) onTaskToggle();
    });
  });

  // Attach Checklist Form Sync Listeners
  const syncMapping = {
    'sync-wiz-app-name': 'wiz-app-name',
    'sync-wiz-problem': 'wiz-problem',
    'sync-wiz-roles': 'wiz-roles',
    'sync-wiz-features': 'wiz-features',
    'sync-wiz-stack': 'wiz-stack',
    'sync-wiz-industry': 'wiz-industry',
    'sync-wiz-design-vibe': 'wiz-design-vibe',
    'sync-wiz-pages': 'wiz-pages',
    'sync-wiz-team-size': 'wiz-team-size',
    'sync-wiz-comm': 'wiz-comm',
    'sync-wiz-db': 'wiz-db',
    'sync-wiz-scope': 'wiz-scope',
    'sync-wiz-deadline': 'wiz-deadline'
  };

  Object.keys(syncMapping).forEach(syncId => {
    const syncInput = document.getElementById(syncId);
    if (syncInput) {
      syncInput.addEventListener('input', (e) => {
        const targetWizInput = document.getElementById(syncMapping[syncId]);
        if (targetWizInput) {
          targetWizInput.value = e.target.value;
          // Trigger input event on the wizard field so docGenerator updates preview and localStorage
          targetWizInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }
  });
}
