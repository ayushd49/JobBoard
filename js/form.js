const REGEX_EMAIL = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const REGEX_URL   = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&

function validateField(field) {
  const fieldId     = field.id;
  const errorEl     = document.getElementById(`${fieldId}-error`);
  const fileLabel   = field.parentElement && field.parentElement.querySelector('.file-upload__label');
  let isValid       = true;

  
  field.classList.remove('has-error');
  if (fileLabel) fileLabel.classList.remove('has-error');
  if (errorEl) errorEl.classList.remove('is-visible');

  const required = field.hasAttribute('required') || field.dataset.required === 'true';

  
  if (field.type === 'file') {
    if (required && (!field.files || field.files.length === 0)) {
      isValid = false;
    } else if (field.files && field.files.length > 0) {
      
      const maxBytes = 5 * 1024 * 1024;
      if (field.files[0].size > maxBytes) {
        isValid = false;
        if (errorEl) {
          errorEl.textContent = 'File must be under 5MB.';
        }
      }
    }
    if (!isValid && fileLabel) {
      fileLabel.classList.add('has-error');
    }
  }
  
  else if (field.type === 'text' || field.tagName === 'TEXTAREA') {
    const val = field.value.trim();
    if (required && val.length === 0) {
      isValid = false;
    } else if (field.tagName === 'TEXTAREA' && val.length > 0 && val.length < 20) {
      isValid = false;
      if (errorEl) {
        errorEl.textContent = 'Please write at least 20 characters.';
      }
    }
  }
  
  else if (field.type === 'email') {
    const val = field.value.trim();
    if (required && val.length === 0) {
      isValid = false;
    } else if (val.length > 0 && !REGEX_EMAIL.test(val)) {
      isValid = false;
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid email address.';
      }
    }
  }
  
  else if (field.type === 'url') {
    const val = field.value.trim();
    if (required && val.length === 0) {
      isValid = false;
    } else if (val.length > 0 && !REGEX_URL.test(val)) {
      isValid = false;
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid URL starting with http:// or https://';
      }
    }
  }
  
  else if (field.type === 'tel') {
    
    isValid = true;
  }
  
  else if (required && (!field.value || field.value.trim() === '')) {
    isValid = false;
  }

  
  if (!isValid) {
    field.classList.add('has-error');
    if (errorEl) errorEl.classList.add('is-visible');
  }

  return isValid;
}

function validateForm() {
  const form = document.getElementById('apply-form');
  if (!form) return false;

  const fields = form.querySelectorAll('input, textarea');
  let allValid = true;

  fields.forEach(field => {
    
    if (field.type === 'hidden' || field.disabled) return;
    const valid = validateField(field);
    if (!valid) allValid = false;
  });

  return allValid;
}

function handleFormSubmit(e) {
  e.preventDefault();

  
  const isValid = validateForm();

  if (!isValid) {
    
    const firstError = document.querySelector('.form__error.is-visible');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  
  
  const formBody  = document.getElementById('apply-form-body');
  const successEl = document.getElementById('apply-success');
  const footerEl  = document.querySelector('#modal-apply .modal__footer');

  if (formBody)  formBody.classList.add('hidden');
  if (successEl) successEl.classList.remove('hidden');
  if (footerEl)  footerEl.classList.add('hidden');

  
}

function resetApplyForm() {
  const form = document.getElementById('apply-form');
  if (!form) return;

  
  form.reset();

  
  form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  form.querySelectorAll('.form__error.is-visible').forEach(el => el.classList.remove('is-visible'));

  
  const fileLabel = document.querySelector('.file-upload__label');
  if (fileLabel) {
    fileLabel.classList.remove('has-file', 'has-error');
    fileLabel.innerHTML = `${ICONS.paperclip} Click to upload your resume`;
  }

  
  const footerEl = document.querySelector('#modal-apply .modal__footer');
  if (footerEl) footerEl.classList.remove('hidden');
}

function initForm() {
  const form = document.getElementById('apply-form');
  if (!form) return;

  
  form.addEventListener('submit', handleFormSubmit);

  
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    
    field.addEventListener('input', () => {
      field.classList.remove('has-error');
      const errorEl = document.getElementById(`${field.id}-error`);
      if (errorEl) errorEl.classList.remove('is-visible');
    });
  });

  
  const resumeInput = document.getElementById('resume');
  const fileLabel   = document.querySelector('.file-upload__label');

  if (resumeInput && fileLabel) {
    resumeInput.addEventListener('change', () => {
      if (resumeInput.files && resumeInput.files.length > 0) {
        const file     = resumeInput.files[0];
        const sizeMB   = (file.size / (1024 * 1024)).toFixed(2);
        const tooLarge = file.size > 5 * 1024 * 1024;

        fileLabel.classList.remove('has-error');
        fileLabel.classList.add('has-file');

        if (tooLarge) {
          fileLabel.innerHTML = `${ICONS.close} File too large (${sizeMB}MB) — Max 5MB`;
          fileLabel.classList.add('has-error');
          fileLabel.classList.remove('has-file');
          const errorEl = document.getElementById('resume-error');
          if (errorEl) {
            errorEl.textContent = 'File must be under 5MB.';
            errorEl.classList.add('is-visible');
          }
        } else {
          fileLabel.innerHTML = `${ICONS.check} ${escapeHTML(file.name)} (${sizeMB}MB)`;
        }
      } else {
        fileLabel.classList.remove('has-file');
        fileLabel.innerHTML = `${ICONS.paperclip} Click to upload your resume`;
      }
    });
  }

  
  const backBtn = document.getElementById('success-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      closeModal('modal-apply-backdrop');
      resetApplyForm();
    });
  }
}
