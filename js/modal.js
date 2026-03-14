let _activeModal = null;
let _activeJobId = null;

function openJobDetail(jobId) {
  const job = jobs.find(j => j.id === parseInt(jobId));
  if (!job) return;

  _activeJobId = job.id;

  const modal     = document.getElementById('modal-detail');
  const backdrop  = document.getElementById('modal-detail-backdrop');
  if (!modal || !backdrop) return;

  
  const colors = LOGO_PALETTE[job.logo] || { bg: "var(--color-accent)", text: "#fff" };

  modal.querySelector('#detail-logo').style.background = colors.bg;
  modal.querySelector('#detail-logo').style.color      = colors.text;
  modal.querySelector('#detail-logo').textContent      = job.logo;
  modal.querySelector('#detail-title').textContent     = job.title;
  modal.querySelector('#detail-company').textContent   = job.company;

  
  const metaEl = modal.querySelector('#detail-meta');
  metaEl.innerHTML = `
    <span class="meta-chip">${ICONS.location} ${escapeHTML(job.location)}</span>
    <span class="meta-chip">${ICONS.remote}   ${escapeHTML(job.mode)}</span>
    <span class="meta-chip">${escapeHTML(job.type)}</span>
    <span class="meta-chip">${ICONS.level}    ${escapeHTML(job.level)}</span>
    <span class="meta-chip">${ICONS.category} ${escapeHTML(job.category)}</span>
  `;

  
  modal.querySelector('#detail-description').textContent = job.description;

  
  const respEl = modal.querySelector('#detail-responsibilities');
  respEl.innerHTML = job.responsibilities.map(r =>
    `<li class="detail__list-item">${escapeHTML(r)}</li>`
  ).join('');

  
  const reqEl = modal.querySelector('#detail-requirements');
  reqEl.innerHTML = job.requirements.map(r =>
    `<li class="detail__list-item">${escapeHTML(r)}</li>`
  ).join('');

  
  const tagsEl = modal.querySelector('#detail-tags');
  tagsEl.innerHTML = job.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');

  
  modal.querySelector('#detail-salary').textContent = job.salary;

  
  const applyBtn = modal.querySelector('#detail-apply-btn');
  if (applyBtn) {
    applyBtn.onclick = () => {
      closeModal('modal-detail-backdrop');
      openApplyForm(job.id);
    };
  }

  
  _activeModal = backdrop;
  openBackdrop(backdrop);
}

function openApplyForm(jobId) {
  const job = jobs.find(j => j.id === parseInt(jobId));
  if (!job) return;

  _activeJobId = job.id;

  const backdrop = document.getElementById('modal-apply-backdrop');
  if (!backdrop) return;

  
  const formEl    = document.getElementById('apply-form-body');
  const successEl = document.getElementById('apply-success');
  if (formEl)    formEl.classList.remove('hidden');
  if (successEl) successEl.classList.add('hidden');

  
  const titleEl = document.getElementById('apply-job-title');
  if (titleEl) titleEl.textContent = `Apply — ${job.title} at ${job.company}`;

  
  resetApplyForm();

  
  _activeModal = backdrop;
  openBackdrop(backdrop);
}

function openBackdrop(backdropEl) {
  backdropEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  
  const modal = backdropEl.querySelector('.modal');
  if (modal) {
    modal.setAttribute('tabindex', '-1');
    setTimeout(() => modal.focus(), 50);
  }
}

function closeModal(backdropId) {
  const backdrop = backdropId
    ? document.getElementById(backdropId)
    : _activeModal;

  if (!backdrop) return;

  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  _activeModal = null;
}

function initModals() {
  
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const backdropId = btn.getAttribute('data-modal-close');
      closeModal(backdropId);
    });
  });

  
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      
      if (e.target === backdrop) {
        closeModal();
      }
    });
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && _activeModal) {
      closeModal();
    }
  });

  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', trapFocus);
  });
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;

  const focusable = [...e.currentTarget.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )].filter(el => !el.disabled && el.offsetParent !== null);

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
