/**
 * Deployment Handover Checklist Renderer
 */

export function renderDeploymentChecklist(checklistItems, state, onTaskToggle) {
  const container = document.getElementById('dep-checklist-container');
  if (!container) return;

  container.innerHTML = `
    <div class="dep-checklist-grid">
      <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Handover Pre-Flight Verification</h3>
      ${checklistItems.map(item => {
        const isChecked = !!state.checklist[item.id];
        return `
          <div class="dep-item ${isChecked ? 'done' : ''}" data-task-id="${item.id}">
            <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} id="${item.id}" />
            <label for="${item.id}" class="dep-item-label">${item.text}</label>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.dep-item').forEach(item => {
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
}
