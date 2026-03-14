const LOGO_PALETTE = {
  VC: { bg: "#000000", text: "#ffffff" },
  LN: { bg: "#5E6AD2", text: "#ffffff" },
  ST: { bg: "#635BFF", text: "#ffffff" },
  NO: { bg: "#111110", text: "#ffffff" },
  FG: { bg: "#1ABCFE", text: "#ffffff" },
  LM: { bg: "#625DF5", text: "#ffffff" },
  SP: { bg: "#1DB954", text: "#ffffff" },
  WF: { bg: "#146EF5", text: "#ffffff" },
  GL: { bg: "#FC6D26", text: "#ffffff" },
  IC: { bg: "#1F8DED", text: "#ffffff" },
  SB: { bg: "#3ECF8E", text: "#ffffff" },
  MC: { bg: "#FFE01B", text: "#000000" }
};

const MODE_ICONS = {
  "Remote":  ICONS.remote,
  "Hybrid":  ICONS.hybrid,
  "On-site": ICONS.onsite
};

const TYPE_COLORS = {
  "Full-time": "var(--color-accent)",
  "Part-time": "#7C3AED",
  "Contract":  "#D97706",
  "Internship":"#059669"
};

function renderJobs(jobsToRender) {
  const container = document.getElementById('jobs-container');
  if (!container) return;

  
  container.innerHTML = '';

  
  const countEl = document.getElementById('results-count');
  if (countEl) {
    countEl.innerHTML = `<strong>${jobsToRender.length}</strong> jobs found`;
  }

  
  if (jobsToRender.length === 0) {
    container.appendChild(renderEmptyState());
    renderPagination(0, 0);
    return;
  }

  
  jobsToRender.forEach(job => {
    container.appendChild(renderCard(job));
  });

  
  renderPagination(jobsToRender.length, 1);
}

function renderCard(job) {
  const colors = LOGO_PALETTE[job.logo] || { bg: "var(--color-accent)", text: "#fff" };
  const modeIcon = MODE_ICONS[job.mode] || ICONS.location;

  const article = document.createElement('article');
  article.className = `job-card${job.featured ? ' is-featured' : ''}`;
  article.setAttribute('data-job-id', job.id);
  article.setAttribute('role', 'button');
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `${job.title} at ${job.company}`);

  
  article.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-apply') && !e.target.closest('.bookmark-btn')) {
      openJobDetail(job.id);
    }
  });

  
  article.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openJobDetail(job.id);
    }
  });

  
  const tagsHTML = job.tags.map(tag =>
    `<span class="tag">${escapeHTML(tag)}</span>`
  ).join('');

  
  const featuredBadge = job.featured
    ? `<span class="featured-badge">${ICONS.star} Featured</span>`
    : '';

  article.innerHTML = `
    <div class="job-card__header">
      <div class="job-card__logo-wrap">
        <div class="job-card__logo"
             style="background:${colors.bg}; color:${colors.text};"
             aria-label="${escapeHTML(job.company)} logo">
          ${escapeHTML(job.logo)}
        </div>
        <div class="job-card__title-group">
          <h3 class="job-card__title">${escapeHTML(job.title)}</h3>
          <p class="job-card__company">${escapeHTML(job.company)}</p>
        </div>
      </div>
      <div class="job-card__actions">
        ${featuredBadge}
        <button class="bookmark-btn"
                aria-label="Save job"
                data-job-id="${job.id}"
                title="Save job">
          <span class="bookmark-icon">${ICONS.bookmark}</span>
        </button>
      </div>
    </div>

    <div class="job-card__meta">
      <span class="meta-chip">${ICONS.location} ${escapeHTML(job.location)}</span>
      <span class="meta-chip">${modeIcon} ${escapeHTML(job.mode)}</span>
      <span class="meta-chip" style="color:${TYPE_COLORS[job.type] || 'inherit'}; border-color:${TYPE_COLORS[job.type] || 'var(--color-border)'};">
        ${escapeHTML(job.type)}
      </span>
      <span class="meta-chip">${ICONS.level} ${escapeHTML(job.level)}</span>
    </div>

    <div class="job-card__tags">${tagsHTML}</div>

    <div class="job-card__footer">
      <div>
        <p class="job-card__salary">${escapeHTML(job.salary)}</p>
        <p class="job-card__posted">${escapeHTML(job.posted)}</p>
      </div>
      <button class="btn-apply"
              data-job-id="${job.id}"
              aria-label="Apply for ${escapeHTML(job.title)}">
        Apply Now →
      </button>
    </div>
  `;

  
  const bookmarkBtn = article.querySelector('.bookmark-btn');
  if (bookmarkBtn) {
    const saved = getSavedJobs();
    if (saved.includes(job.id)) {
      bookmarkBtn.classList.add('is-saved');
      bookmarkBtn.setAttribute('aria-label', 'Unsave job');
      const iconSpan = bookmarkBtn.querySelector('.bookmark-icon');
      if (iconSpan) iconSpan.innerHTML = ICONS.bookmarkSaved;
    }
    bookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(job.id, bookmarkBtn);
    });
  }

  
  const applyBtn = article.querySelector('.btn-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openApplyForm(job.id);
    });
  }

  return article;
}

function renderEmptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  div.innerHTML = `
    <div class="empty-state__icon">${ICONS.search}</div>
    <h3 class="empty-state__title">No jobs found</h3>
    <p class="empty-state__text">
      Try adjusting your search terms or clearing some filters to see more results.
    </p>
    <button class="btn btn-secondary" onclick="clearAllFilters()">
      Clear all filters
    </button>
  `;
  return div;
}

function renderPagination(total, currentPage) {
  const container = document.getElementById('pagination');
  if (!container) return;
  container.innerHTML = '';

  if (total === 0) return;

  const totalPages = Math.ceil(total / 6);
  if (totalPages <= 1) return;

  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.textContent = '← Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute('aria-label', 'Previous page');
  container.appendChild(prevBtn);

  
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn${i === currentPage ? ' is-active' : ''}`;
    btn.textContent = i;
    btn.setAttribute('aria-label', `Page ${i}`);
    if (i === currentPage) btn.setAttribute('aria-current', 'page');
    container.appendChild(btn);
  }

  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.textContent = 'Next →';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute('aria-label', 'Next page');
  container.appendChild(nextBtn);
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar-filters');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar__card">
      <div class="sidebar__title">
        Filters
        <button class="btn-ghost btn-sm" onclick="clearAllFilters()" aria-label="Clear all filters">
          Clear all
        </button>
      </div>

      <!-- Location -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Location</p>
        <select class="location-select" id="location-filter" aria-label="Filter by location">
          ${FILTERS_CONFIG.locations.map(loc =>
            `<option value="${loc.value}">${escapeHTML(loc.label)}</option>`
          ).join('')}
        </select>
      </div>

      <!-- Job Type -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Job Type</p>
        ${FILTERS_CONFIG.jobTypes.map(item => renderFilterItem(item, 'type')).join('')}
      </div>

      <!-- Work Mode -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Work Mode</p>
        ${FILTERS_CONFIG.workModes.map(item => renderFilterItem(item, 'mode')).join('')}
      </div>

      <!-- Experience Level -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Experience</p>
        ${FILTERS_CONFIG.experienceLevels.map(item => renderFilterItem(item, 'level')).join('')}
      </div>

      <!-- Category -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Category</p>
        ${FILTERS_CONFIG.categories.map(item => renderFilterItem(item, 'category')).join('')}
      </div>

      <!-- Salary Range -->
      <div class="sidebar__section">
        <p class="sidebar__section-label">Min Salary</p>
        <div class="salary-range">
          <div class="salary-range__labels">
            <span id="salary-min-label">$40k</span>
            <span id="salary-max-label">$300k+</span>
          </div>
          <input type="range"
                 class="range-input"
                 id="salary-filter"
                 min="${FILTERS_CONFIG.salaryRange.min}"
                 max="${FILTERS_CONFIG.salaryRange.max}"
                 step="${FILTERS_CONFIG.salaryRange.step}"
                 value="${FILTERS_CONFIG.salaryRange.min}"
                 aria-label="Minimum salary filter">
        </div>
      </div>
    </div>
  `;

  
  sidebar.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', () => {
      const checkbox = item.querySelector('.filter-item__checkbox');
      const filterType = item.getAttribute('data-filter-type');
      const filterValue = item.getAttribute('data-filter-value');
      const isChecked = checkbox.classList.toggle('is-checked');
      applyFilters();
      updateActiveChips(filterType, filterValue, isChecked, item.querySelector('.filter-item__label').textContent);
    });
  });

  
  const locationSelect = document.getElementById('location-filter');
  if (locationSelect) {
    locationSelect.addEventListener('change', () => applyFilters());
  }

  
  const salaryRange = document.getElementById('salary-filter');
  if (salaryRange) {
    salaryRange.addEventListener('input', () => {
      const val = parseInt(salaryRange.value);
      const label = document.getElementById('salary-min-label');
      if (label) label.textContent = val >= 300000 ? '$300k+' : `$${Math.round(val / 1000)}k`;
      applyFilters();
    });
  }
}

function renderFilterItem(item, type) {
  return `
    <div class="filter-item"
         data-filter-type="${type}"
         data-filter-value="${item.id}"
         role="checkbox"
         aria-checked="false"
         tabindex="0">
      <div class="filter-item__left">
        <div class="filter-item__checkbox" aria-hidden="true"></div>
        <span class="filter-item__label">${escapeHTML(item.label)}</span>
      </div>
      <span class="filter-item__count">${item.count}</span>
    </div>
  `;
}

function renderNavLinks() {
  const navLinks = document.getElementById('nav-links');
  const drawerLinks = document.getElementById('nav-drawer-links');

  const linksHTML = SITE.navLinks.map(link => `
    <a href="${link.href}"
       class="nav__link${link.active ? ' is-active' : ''}"
       ${link.active ? 'aria-current="page"' : ''}>
      ${escapeHTML(link.label)}
    </a>
  `).join('');

  if (navLinks) navLinks.innerHTML = linksHTML;

  if (drawerLinks) {
    drawerLinks.innerHTML = SITE.navLinks.map(link => `
      <a href="${link.href}"
         class="nav__drawer-link${link.active ? ' is-active' : ''}">
        ${escapeHTML(link.label)}
      </a>
    `).join('');
  }
}

function renderStats() {
  const statsEl = document.getElementById('hero-stats');
  if (!statsEl) return;

  statsEl.innerHTML = SITE.stats.map(stat => `
    <div class="stat-item">
      <span class="stat-item__value">${escapeHTML(stat.value)}</span>
      <span class="stat-item__label">${escapeHTML(stat.label)}</span>
    </div>
  `).join('');
}

function renderSortOptions() {
  const select = document.getElementById('sort-select');
  if (!select) return;

  select.innerHTML = FILTERS_CONFIG.sortOptions.map(opt =>
    `<option value="${opt.value}">${escapeHTML(opt.label)}</option>`
  ).join('');
}

const _savedJobs = [];

function getSavedJobs() {
  return _savedJobs;
}

function toggleBookmark(jobId, btn) {
  const idx       = _savedJobs.indexOf(jobId);
  const iconSpan  = btn.querySelector('.bookmark-icon');
  if (idx === -1) {
    _savedJobs.push(jobId);
    btn.classList.add('is-saved');
    btn.setAttribute('aria-label', 'Unsave job');
    btn.title = 'Unsave job';
    if (iconSpan) iconSpan.innerHTML = ICONS.bookmarkSaved;
  } else {
    _savedJobs.splice(idx, 1);
    btn.classList.remove('is-saved');
    btn.setAttribute('aria-label', 'Save job');
    btn.title = 'Save job';
    if (iconSpan) iconSpan.innerHTML = ICONS.bookmark;
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
