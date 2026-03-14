const filterState = {
  keyword:    '',
  location:   '',
  types:      [],   
  modes:      [],   
  levels:     [],   
  categories: [],   
  salaryMin:  0,
  sortBy:     'recent'
};

const activeChipsMap = {};

function applyFilters() {
  
  syncFilterStateFromDOM();

  let result = [...jobs];

  
  if (filterState.keyword.trim()) {
    const kw = filterState.keyword.trim().toLowerCase();
    result = result.filter(job => {
      const titleMatch   = job.title.toLowerCase().includes(kw);
      const companyMatch = job.company.toLowerCase().includes(kw);
      const tagMatch     = job.tags.some(t => t.toLowerCase().includes(kw));
      return titleMatch || companyMatch || tagMatch;
    });
  }

  
  if (filterState.location) {
    result = result.filter(job => {
      
      return job.locationKey === filterState.location ||
             job.modeKey === filterState.location;
    });
  }

  
  if (filterState.types.length > 0) {
    result = result.filter(job =>
      filterState.types.includes(job.typeKey)
    );
  }

  
  if (filterState.modes.length > 0) {
    result = result.filter(job =>
      filterState.modes.includes(job.modeKey)
    );
  }

  
  if (filterState.levels.length > 0) {
    result = result.filter(job =>
      filterState.levels.includes(job.levelKey)
    );
  }

  
  if (filterState.categories.length > 0) {
    result = result.filter(job =>
      filterState.categories.includes(job.categoryKey)
    );
  }

  
  if (filterState.salaryMin > 0) {
    result = result.filter(job =>
      job.salaryMax >= filterState.salaryMin
    );
  }

  
  result = sortJobs(result, filterState.sortBy);

  
  renderJobs(result);
}

function syncFilterStateFromDOM() {
  
  const searchInput = document.getElementById('search-input');
  filterState.keyword = searchInput ? searchInput.value : '';

  
  const locationSelect = document.getElementById('location-filter');
  filterState.location = locationSelect ? locationSelect.value : '';

  
  const sortSelect = document.getElementById('sort-select');
  filterState.sortBy = sortSelect ? sortSelect.value : 'recent';

  
  const salaryRange = document.getElementById('salary-filter');
  filterState.salaryMin = salaryRange ? parseInt(salaryRange.value) : 0;

  
  filterState.types      = [];
  filterState.modes      = [];
  filterState.levels     = [];
  filterState.categories = [];

  document.querySelectorAll('.filter-item').forEach(item => {
    const checkbox = item.querySelector('.filter-item__checkbox');
    if (!checkbox || !checkbox.classList.contains('is-checked')) return;

    const type  = item.getAttribute('data-filter-type');
    const value = item.getAttribute('data-filter-value');

    if (type === 'type')     filterState.types.push(value);
    if (type === 'mode')     filterState.modes.push(value);
    if (type === 'level')    filterState.levels.push(value);
    if (type === 'category') filterState.categories.push(value);
  });
}

function sortJobs(jobsArray, sortBy) {
  const sorted = [...jobsArray];

  if (sortBy === 'salary') {
    
    sorted.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sortBy === 'recent') {
    
    sorted.sort((a, b) => {
      
      return postedToNumber(a.posted) - postedToNumber(b.posted);
    });
  } else if (sortBy === 'relevance') {
    
    sorted.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.id - b.id;
    });
  }

  return sorted;
}

function postedToNumber(posted) {
  if (!posted) return 9999;
  if (posted.includes('week')) {
    return parseInt(posted) * 7;
  }
  if (posted.includes('day')) {
    return parseInt(posted);
  }
  return 9999;
}

function updateActiveChips(filterType, filterValue, isAdding, label) {
  const key = `${filterType}:${filterValue}`;

  if (isAdding) {
    activeChipsMap[key] = { label, filterType, filterValue };
  } else {
    delete activeChipsMap[key];
  }

  renderActiveChips();
}

function renderActiveChips() {
  const container = document.getElementById('active-filters');
  if (!container) return;

  container.innerHTML = '';
  const keys = Object.keys(activeChipsMap);

  if (keys.length === 0) return;

  
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-all-btn';
  clearBtn.textContent = 'Clear all';
  clearBtn.setAttribute('aria-label', 'Clear all active filters');
  clearBtn.addEventListener('click', clearAllFilters);
  container.appendChild(clearBtn);

  
  keys.forEach(key => {
    const { label, filterType, filterValue } = activeChipsMap[key];
    const chip = document.createElement('span');
    chip.className = 'filter-chip';
    chip.innerHTML = `
      ${escapeHTML(label)}
      <button class="filter-chip__remove"
              aria-label="Remove ${escapeHTML(label)} filter"
              title="Remove filter">
        ×
      </button>
    `;
    chip.querySelector('.filter-chip__remove').addEventListener('click', () => {
      
      const sidebarItem = document.querySelector(
        `.filter-item[data-filter-type="${filterType}"][data-filter-value="${filterValue}"]`
      );
      if (sidebarItem) {
        const checkbox = sidebarItem.querySelector('.filter-item__checkbox');
        if (checkbox) checkbox.classList.remove('is-checked');
      }
      delete activeChipsMap[key];
      renderActiveChips();
      applyFilters();
    });
    container.appendChild(chip);
  });
}

function clearAllFilters() {
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  
  const locationSelect = document.getElementById('location-filter');
  if (locationSelect) locationSelect.value = '';

  
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'recent';

  
  const salaryRange = document.getElementById('salary-filter');
  if (salaryRange) {
    salaryRange.value = FILTERS_CONFIG.salaryRange.min;
    const label = document.getElementById('salary-min-label');
    if (label) label.textContent = '$40k';
  }

  
  document.querySelectorAll('.filter-item__checkbox.is-checked').forEach(cb => {
    cb.classList.remove('is-checked');
  });

  
  Object.keys(activeChipsMap).forEach(k => delete activeChipsMap[k]);
  renderActiveChips();

  
  filterState.keyword    = '';
  filterState.location   = '';
  filterState.types      = [];
  filterState.modes      = [];
  filterState.levels     = [];
  filterState.categories = [];
  filterState.salaryMin  = 0;
  filterState.sortBy     = 'recent';

  
  renderJobs(jobs);
}

function initSearch() {
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => applyFilters());
  }

  
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => applyFilters());
  }

  
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => applyFilters());
  }

  
  const viewBtns = document.querySelectorAll('.view-toggle__btn');
  const jobsContainer = document.getElementById('jobs-container');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const view = btn.getAttribute('data-view');
      if (jobsContainer) {
        if (view === 'grid') {
          jobsContainer.classList.add('view-grid');
        } else {
          jobsContainer.classList.remove('view-grid');
        }
      }
    });
  });

  
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const sidebarEl = document.getElementById('sidebar');
  if (filterToggleBtn && sidebarEl) {
    filterToggleBtn.addEventListener('click', () => {
      sidebarEl.classList.toggle('sidebar--mobile-hidden');
      sidebarEl.classList.toggle('sidebar--mobile-visible');
      const isOpen = sidebarEl.classList.contains('sidebar--mobile-visible');
      filterToggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}
