/**
 * Interactive ELI5 Jargon Glossary Module
 */

export function renderGlossary(glossaryItems) {
  const container = document.getElementById('glossary-container');
  if (!container) return;

  const categories = ['All', ...new Set(glossaryItems.map(item => item.category))];
  let activeCat = 'All';

  const renderCards = (filterCat = 'All', searchQ = '') => {
    const filtered = glossaryItems.filter(item => {
      const matchCat = filterCat === 'All' || item.category === filterCat;
      const matchSearch = !searchQ || item.term.toLowerCase().includes(searchQ) || item.definition.toLowerCase().includes(searchQ);
      return matchCat && matchSearch;
    });

    return `
      <div class="glossary-filters">
        <div class="filter-tags">
          ${categories.map(cat => `
            <button class="filter-chip ${activeCat === cat ? 'active' : ''}" data-cat="${cat}">${cat}</button>
          `).join('')}
        </div>
        <div class="search-box" style="max-width: 300px;">
          <input type="text" id="glossary-search" placeholder="Search tech terms..." />
        </div>
      </div>

      <div class="glossary-grid">
        ${filtered.map(item => `
          <div class="glossary-card">
            <div class="glossary-card-header">
              <h4 class="glossary-term">${item.term}</h4>
              <span class="glossary-cat-badge">${item.category}</span>
            </div>
            <p class="glossary-def">${item.definition}</p>
          </div>
        `).join('')}
      </div>
    `;
  };

  container.innerHTML = renderCards();

  const bindEvents = () => {
    container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.onclick = () => {
        activeCat = btn.dataset.cat;
        container.innerHTML = renderCards(activeCat);
        bindEvents();
      };
    });

    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
      searchInput.oninput = (e) => {
        const q = e.target.value.toLowerCase().trim();
        container.querySelector('.glossary-grid').innerHTML = glossaryItems
          .filter(item => (activeCat === 'All' || item.category === activeCat) && (item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)))
          .map(item => `
            <div class="glossary-card">
              <div class="glossary-card-header">
                <h4 class="glossary-term">${item.term}</h4>
                <span class="glossary-cat-badge">${item.category}</span>
              </div>
              <p class="glossary-def">${item.definition}</p>
            </div>
          `).join('');
      };
    }
  };

  bindEvents();
}
