/**
 * Universal Project Structure Guide - Main Entry Point (ES Module)
 */
import { renderBeginnerJourney } from './modules/beginnerJourney.js';
import { renderDocGenerator } from './modules/docGenerator.js';
import { renderGlossary } from './modules/glossary.js';
import { renderPhase0 } from './modules/phase0.js';
import { renderFolderTree } from './modules/explorer.js';
import { renderPrinciples } from './modules/principles.js';
import { renderContextKit } from './modules/contextKit.js';
import { renderUILibraries } from './modules/uiLibraries.js';
import { renderDeploymentChecklist } from './modules/deployment.js';
import { renderVibeCoding } from './modules/vibeCoding.js';
import { showToast } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const state = {
    checklist: JSON.parse(localStorage.getItem('ups_checklist') || '{}'),
    activeContextTab: 'prd',
    uiFilter: 'all',
    theme: localStorage.getItem('ups_theme') || 'dark'
  };

  // Initialize Theme
  if (state.theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Asynchronously Load JSON Data Files
  try {
    const [beginnerJourney, glossary, phase0, folderStructure, principles, contextDocs, uiLibraries, deploymentChecklist, vibeCoding] = await Promise.all([
      fetch('data/beginnerJourney.json').then(res => res.json()),
      fetch('data/glossary.json').then(res => res.json()),
      fetch('data/phase0.json').then(res => res.json()),
      fetch('data/folderStructure.json').then(res => res.json()),
      fetch('data/principles.json').then(res => res.json()),
      fetch('data/contextDocs.json').then(res => res.json()),
      fetch('data/uiLibraries.json').then(res => res.json()),
      fetch('data/deploymentChecklist.json').then(res => res.json()),
      fetch('data/vibeCoding.json').then(res => res.json())
    ]);

    // Calculate Progress Helper
    const updateProgress = () => {
      const totalTasks = phase0.reduce((acc, s) => acc + s.tasks.length, 0) + deploymentChecklist.length;
      const completedTasks = Object.values(state.checklist).filter(Boolean).length;
      const percentage = Math.round((completedTasks / totalTasks) * 100);

      const fill = document.getElementById('global-progress-fill');
      const text = document.getElementById('global-progress-text');
      if (fill) fill.style.width = `${percentage}%`;
      if (text) text.textContent = `${percentage}% (${completedTasks}/${totalTasks})`;
    };

    // Render Beginner Modules First
    renderBeginnerJourney(beginnerJourney);
    renderDocGenerator();
    renderGlossary(glossary);

    // Render Playbook Sections
    renderPhase0(phase0, state, updateProgress);
    renderFolderTree(folderStructure);
    renderPrinciples(principles);
    renderContextKit(contextDocs, state);
    renderUILibraries(uiLibraries, state);
    renderDeploymentChecklist(deploymentChecklist, state, updateProgress);
    renderVibeCoding(vibeCoding);
    updateProgress();

  } catch (error) {
    console.error('Error loading JSON data files:', error);
    showToast('Failed to load project data files.');
  }

  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('ups_theme', state.theme);
      showToast(`Switched to ${state.theme} mode`);
    });
  }

  // Command Palette Logic
  const cmdModal = document.getElementById('cmd-modal');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');
  const cmdBtn = document.getElementById('cmd-palette-btn');

  function toggleCmdModal() {
    if (!cmdModal) return;
    const isActive = cmdModal.classList.contains('active');
    if (isActive) {
      cmdModal.classList.remove('active');
      if (cmdInput) cmdInput.blur();
    } else {
      cmdModal.classList.add('active');
      if (cmdInput) {
        cmdInput.value = '';
        renderCmdResults(''); // Reset results
        setTimeout(() => cmdInput.focus(), 100);
      }
    }
  }

  if (cmdBtn) cmdBtn.addEventListener('click', toggleCmdModal);

  // Close on Escape or clicking outside
  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) toggleCmdModal();
    });
  }

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCmdModal();
    }
    // Escape to close
    if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('active')) {
      toggleCmdModal();
    }
  });

  function renderCmdResults(query) {
    if (!cmdResults) return;
    cmdResults.innerHTML = '';
    const q = query.toLowerCase().trim();
    
    // We will search through sections
    const sections = Array.from(document.querySelectorAll('.scrollspy-section'));
    
    if (!q) {
      // Default: show a quick links hint
      cmdResults.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 13px;">Start typing to search across the guide...</div>`;
      return;
    }

    let hasResults = false;
    sections.forEach((sec) => {
      const titleEl = sec.querySelector('.section-title');
      const title = titleEl ? titleEl.textContent : sec.getAttribute('data-nav');
      const text = sec.textContent.toLowerCase();
      
      if (text.includes(q)) {
        hasResults = true;
        const div = document.createElement('div');
        div.className = 'cmd-result-item';
        div.innerHTML = `
          <div class="cmd-result-title">${title}</div>
          <div class="cmd-result-desc">Matches found in this section...</div>
        `;
        div.addEventListener('click', () => {
          toggleCmdModal();
          window.scrollTo({
            top: sec.offsetTop - 80,
            behavior: 'smooth'
          });
        });
        cmdResults.appendChild(div);
      }
    });

    if (!hasResults) {
      cmdResults.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 13px;">No results found for "${query}"</div>`;
    }
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      renderCmdResults(e.target.value);
    });
  }

  // Floating Navigation Scrollspy Logic
  function initScrollspy() {
    const sections = document.querySelectorAll('.scrollspy-section');
    const navContainer = document.querySelector('.nav-links-wrap');
    if (!sections.length || !navContainer) return;

    // 1. Build Nav Buttons dynamically
    sections.forEach((sec, idx) => {
      const id = sec.getAttribute('id');
      const label = sec.getAttribute('data-nav') || `Section ${idx + 1}`;
      const btn = document.createElement('button');
      btn.className = 'marker';
      if (idx === 0) btn.classList.add('active');
      btn.setAttribute('data-target', id);
      btn.innerHTML = `<span class="label">${label}</span>`;
      
      btn.addEventListener('click', () => {
        const targetSec = document.getElementById(id);
        if (targetSec) {
          window.scrollTo({
            top: targetSec.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
      navContainer.appendChild(btn);
    });

    const markers = document.querySelectorAll('.marker');
    const highlighter = document.getElementById('nav-highlighter');

    // Update highlighter position
    function updateHighlighter(activeMarker) {
      if (!highlighter || !activeMarker) return;
      const navRect = document.querySelector('.timeline-track').getBoundingClientRect();
      const markerRect = activeMarker.getBoundingClientRect();
      
      // Calculate relative to the track container
      const left = markerRect.left - navRect.left + navContainer.parentElement.scrollLeft;
      const width = markerRect.width;
      
      highlighter.style.left = `${left}px`;
      highlighter.style.width = `${width}px`;
    }

    // Initialize highlighter
    if (markers.length > 0) {
      // Need a small timeout to let the DOM paint and calculate widths
      setTimeout(() => updateHighlighter(markers[0]), 100);
      window.addEventListener('resize', () => {
        const active = document.querySelector('.marker.active');
        if (active) updateHighlighter(active);
      });
    }

    // Intersection Observer for scrollspy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in upper-middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          markers.forEach(m => m.classList.remove('active'));
          
          const activeMarker = document.querySelector(`.marker[data-target="${id}"]`);
          if (activeMarker) {
            activeMarker.classList.add('active');
            updateHighlighter(activeMarker);
            
            // Scroll nav track if active item is out of view (mobile)
            const track = document.querySelector('.timeline-track');
            if (track && window.innerWidth <= 600) {
               const mRect = activeMarker.getBoundingClientRect();
               const tRect = track.getBoundingClientRect();
               if (mRect.right > tRect.right || mRect.left < tRect.left) {
                 activeMarker.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
               }
            }
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }

  initScrollspy();
});
