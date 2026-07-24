/**
 * Step-by-Step Beginner Roadmap Module
 */
import { icons, copyToClipboard } from './utils.js';

export function renderBeginnerJourney(journeyData) {
  const container = document.getElementById('beginner-roadmap-container');
  if (!container) return;

  container.innerHTML = `
    <div class="roadmap-accordion">
      ${journeyData.map(stage => `
        <div class="roadmap-stage-card" id="${stage.id}">
          <div class="stage-card-header">
            <div class="stage-title-group">
              <span class="stage-badge">Stage ${stage.stage}</span>
              <h3 class="stage-title">${stage.title}</h3>
            </div>
            <p class="stage-subtitle">${stage.subtitle}</p>
          </div>

          <div class="stage-steps-list">
            ${stage.steps.map(step => {
              if (step.analogy) {
                return `
                  <div class="concept-step-box">
                    <div class="concept-header">
                      <h4>${step.title}</h4>
                      <span class="analogy-pill">💡 Analogy: ${step.analogy}</span>
                    </div>
                    <p class="concept-desc">${step.desc}</p>
                  </div>
                `;
              } else if (step.prompt) {
                return `
                  <div class="prompt-step-box">
                    <div class="prompt-step-header">
                      <div>
                        <span class="step-num-badge">${step.stepNum}</span>
                        <h4 style="display: inline-block; margin-left: 0.5rem;">${step.title}</h4>
                      </div>
                      <button class="btn-sm-primary btn-copy-guided-prompt" data-prompt="${encodeURIComponent(step.prompt)}">
                        ${icons.copy} Copy Prompt
                      </button>
                    </div>
                    <div class="prompt-pre"><code>${step.prompt}</code></div>
                  </div>
                `;
              } else if (step.tool) {
                return `
                  <div class="tool-step-box">
                    <div class="tool-header">
                      <h4>${step.tool}</h4>
                      <span class="tool-purpose">${step.purpose}</span>
                    </div>
                    <p class="tool-desc">${step.desc}</p>
                    <div class="tool-action">👉 <strong>How to get:</strong> ${step.action}</div>
                  </div>
                `;
              } else {
                return `
                  <div class="general-step-box">
                    <h4>${step.title}</h4>
                    <p>${step.desc}</p>
                  </div>
                `;
              }
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach Guided Prompt Copy Listeners
  container.querySelectorAll('.btn-copy-guided-prompt').forEach(btn => {
    btn.onclick = () => {
      const promptText = decodeURIComponent(btn.dataset.prompt);
      copyToClipboard(promptText, 'Copied guided prompt! Paste into Cursor or Claude.');
    };
  });
}
