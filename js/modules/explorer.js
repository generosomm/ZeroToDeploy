/**
 * Directory Tree Explorer Renderer
 */
import { icons, copyToClipboard } from './utils.js';

export function renderFolderTree(folderData) {
  const treeContainer = document.getElementById('tree-container');
  const treeDetailName = document.getElementById('tree-detail-name');
  const treeDetailDesc = document.getElementById('tree-detail-desc');

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

  treeContainer.innerHTML = buildTreeHTML(folderData);

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

  // ASCII Tree Copy Button Listener
  const copyTreeBtn = document.getElementById('copy-tree-btn');
  if (copyTreeBtn) {
    copyTreeBtn.onclick = () => {
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
    };
  }

  // Terminal Script Copy Button Listener
  const copyScriptBtn = document.getElementById('copy-script-btn');
  if (copyScriptBtn) {
    copyScriptBtn.onclick = () => {
      const script = `# PowerShell Directory Creator Script
New-Item -ItemType Directory -Force -Path "client/public","client/src/assets","client/src/components/ui","client/src/layouts","client/src/pages","client/src/hooks","client/src/services","client/src/context","client/src/utils","client/src/constants","client/src/config"
New-Item -ItemType Directory -Force -Path "server/src/controllers","server/src/services","server/src/models","server/src/routes","server/src/middlewares","server/src/config","server/src/utils","server/src/validators","server/uploads"
New-Item -ItemType Directory -Force -Path "database/migrations","database/seeders","docs","context","tests"
New-Item -ItemType File -Force -Path "context/PRD.md","context/ARCHITECTURE.md","context/SCHEMA.md","context/DESIGN.md","context/RULES.md",".env.example",".gitignore","README.md","database/schema.sql"
Write-Host "Universal Project Structure Created Successfully!" -ForegroundColor Green`;
      copyToClipboard(script, 'Copied PowerShell structure creation script!');
    };
  }
}
