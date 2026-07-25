import { icons, copyToClipboard, escapeHTML } from './utils.js';

const UNIVERSAL_TREE = `project-root/
|-- client/
|   |-- public/
|   \`-- src/
|       |-- assets/
|       |-- components/ui/
|       |-- layouts/
|       |-- pages/
|       |-- hooks/
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
\`-- README.md`;

export function renderFolderTree(folderData) {
  const container = document.getElementById('tree-container');
  const detailName = document.getElementById('tree-detail-name');
  const detailDescription = document.getElementById('tree-detail-desc');
  if (!container) return;

  const buildNode = node => {
    const folder = node.type === 'folder';
    const icon = folder ? icons.folder : (node.name.endsWith('.md') ? icons.contextFile : icons.file);
    const children = folder && node.children?.length
      ? `<div class="tree-children">${node.children.map(buildNode).join('')}</div>`
      : '';

    return `
      <div class="tree-node">
        <button
          type="button"
          class="tree-node-content"
          data-name="${escapeHTML(node.name)}"
          data-desc="${escapeHTML(node.desc || '')}"
        >
          ${icon}
          <span>${escapeHTML(node.name)}</span>
          ${node.desc ? `<span class="node-desc-preview">- ${escapeHTML(node.desc)}</span>` : ''}
        </button>
        ${children}
      </div>
    `;
  };

  container.innerHTML = buildNode(folderData);
  container.addEventListener('click', event => {
    const button = event.target.closest('.tree-node-content');
    if (!button || !container.contains(button)) return;
    container.querySelectorAll('.tree-node-content').forEach(node => node.classList.toggle('selected', node === button));
    if (detailName) detailName.textContent = button.dataset.name;
    if (detailDescription) detailDescription.textContent = button.dataset.desc || 'Standard project responsibility.';
  });

  document.getElementById('copy-tree-btn')?.addEventListener('click', () => {
    copyToClipboard(UNIVERSAL_TREE, 'Copied the universal folder structure');
  });
}
