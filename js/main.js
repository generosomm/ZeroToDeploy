import { renderDocGenerator } from './modules/docGenerator.js';
import { renderFolderTree } from './modules/explorer.js';
import { showToast } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  const previewTheme = ['light', 'dark'].includes(requestedTheme) ? requestedTheme : null;
  const state = { theme: previewTheme || localStorage.getItem('ups_theme') || 'light' };
  document.documentElement.setAttribute('data-theme', state.theme);

  renderDocGenerator();

  try {
    const response = await fetch('data/folderStructure.json');
    if (!response.ok) throw new Error(`Folder structure request failed: ${response.status}`);
    renderFolderTree(await response.json());
  } catch (error) {
    console.error(error);
    showToast('The folder structure could not be loaded.');
  }

  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('ups_theme', state.theme);
  });

  document.querySelectorAll('.setup-stage, .learning-module').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      const group = details.parentElement;
      group?.querySelectorAll(':scope > details[open]').forEach(sibling => {
        if (sibling !== details) sibling.open = false;
      });
    });
  });

  const modal = document.getElementById('cmd-modal');
  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  const sections = [...document.querySelectorAll('.scrollspy-section')];

  const closeSearch = () => modal?.classList.remove('active');
  const openSearch = () => {
    if (!modal) return;
    modal.classList.add('active');
    input.value = '';
    renderSearch('');
    setTimeout(() => input.focus(), 50);
  };

  const renderSearch = query => {
    if (!results) return;
    const clean = query.toLowerCase().trim();
    if (!clean) {
      results.innerHTML = '<div class="cmd-empty">Search tools, planner questions, build method, folder structure, or launch gates.</div>';
      return;
    }
    const matches = sections.filter(section => section.textContent.toLowerCase().includes(clean));
    results.innerHTML = matches.length
      ? matches.map(section => `<button class="cmd-result-item" data-result-id="${section.id}"><span class="cmd-result-title">${section.querySelector('.section-title')?.textContent || section.dataset.nav}</span><span class="cmd-result-desc">Open ${section.dataset.nav}</span></button>`).join('')
      : `<div class="cmd-empty">No result for “${clean}”.</div>`;
  };

  document.getElementById('cmd-palette-btn')?.addEventListener('click', openSearch);
  input?.addEventListener('input', event => renderSearch(event.target.value));
  results?.addEventListener('click', event => {
    const button = event.target.closest('[data-result-id]');
    if (!button) return;
    closeSearch();
    document.getElementById(button.dataset.resultId)?.scrollIntoView({ behavior: 'smooth' });
  });
  modal?.addEventListener('click', event => { if (event.target === modal) closeSearch(); });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
    if (event.key === 'Escape') closeSearch();
  });

  const guideSteps = {
    setup: {
      title: 'Set up your tools',
      purpose: 'Install the essentials and verify your development computer.'
    },
    planner: {
      title: 'Plan your system',
      purpose: 'Answer the discovery questions and generate your project kit.'
    },
    build: {
      title: 'Build one feature at a time',
      purpose: 'Use focused AI sessions and verify every complete vertical slice.'
    },
    structure: {
      title: 'Follow the folder contract',
      purpose: 'Place every file in the same predictable, reusable project structure.'
    },
    launch: {
      title: 'Verify and launch',
      purpose: 'Pass the release gates before deployment and client handover.'
    }
  };

  const nav = document.querySelector('.nav-links-wrap');
  sections.forEach((section, index) => {
    const button = document.createElement('button');
    button.className = `marker ${index === 0 ? 'active' : ''}`;
    button.dataset.target = section.id;
    button.type = 'button';
    button.setAttribute('aria-label', `Step ${index + 1}: ${guideSteps[section.id].title}`);
    button.innerHTML = `<span class="marker-number">${String(index + 1).padStart(2, '0')}</span><span class="label">${section.dataset.nav}</span>`;
    button.addEventListener('click', () => {
      setActiveStep(index);
      section.scrollIntoView({ behavior: 'smooth' });
    });
    nav?.appendChild(button);
  });

  const markers = [...document.querySelectorAll('.marker')];
  const highlighter = document.getElementById('nav-highlighter');
  const stepCount = document.getElementById('guide-step-count');
  const stepTitle = document.getElementById('guide-step-title');
  const stepPurpose = document.getElementById('guide-step-purpose');
  const progressFill = document.getElementById('guide-nav-progress-fill');
  const previousButton = document.getElementById('guide-prev-section');
  const nextButton = document.getElementById('guide-next-section');
  let activeIndex = 0;

  const updateHighlighter = marker => {
    if (!marker || !highlighter) return;
    highlighter.style.left = `${marker.offsetLeft}px`;
    highlighter.style.width = `${marker.offsetWidth}px`;
  };

  function setActiveStep(index) {
    activeIndex = Math.max(0, Math.min(index, sections.length - 1));
    const section = sections[activeIndex];
    const active = markers[activeIndex];
    const copy = guideSteps[section.id];

    markers.forEach((marker, markerIndex) => {
      marker.classList.toggle('active', markerIndex === activeIndex);
      marker.classList.toggle('completed', markerIndex < activeIndex);
      marker.setAttribute('aria-current', markerIndex === activeIndex ? 'step' : 'false');
    });

    if (stepCount) stepCount.textContent = `STEP ${activeIndex + 1} OF ${sections.length}`;
    if (stepTitle) stepTitle.textContent = copy.title;
    if (stepPurpose) stepPurpose.textContent = copy.purpose;
    if (progressFill) progressFill.style.width = `${((activeIndex + 1) / sections.length) * 100}%`;
    if (previousButton) previousButton.disabled = activeIndex === 0;
    if (nextButton) {
      nextButton.disabled = activeIndex === sections.length - 1;
      const nextTitle = sections[activeIndex + 1] ? guideSteps[sections[activeIndex + 1].id].title : '';
      nextButton.setAttribute('aria-label', nextTitle ? `Next step: ${nextTitle}` : 'You are on the final guide step');
    }
    updateHighlighter(active);
  }

  const moveStep = direction => {
    const targetIndex = activeIndex + direction;
    if (!sections[targetIndex]) return;
    setActiveStep(targetIndex);
    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
  };

  previousButton?.addEventListener('click', () => moveStep(-1));
  nextButton?.addEventListener('click', () => moveStep(1));
  window.addEventListener('resize', () => updateHighlighter(markers[activeIndex]));
  setTimeout(() => setActiveStep(0), 100);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = sections.findIndex(section => section.id === entry.target.id);
      if (index >= 0) setActiveStep(index);
    });
  }, { rootMargin: '-20% 0px -65% 0px' });
  sections.forEach(section => observer.observe(section));
});
