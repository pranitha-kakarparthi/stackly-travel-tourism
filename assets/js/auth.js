/**
 * STACKLY TRAVEL & TOURISM - AUTHENTICATION LOGIC (LOCALSTORAGE)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Password Visibility Toggles
  setupPasswordToggles();

  // Sign In Form handling
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    initSignIn(signInForm);
  }

  // Sign Up Form handling
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    initSignUp(signUpForm);
  }

  // Social Auth Buttons Redirect to 404
  const socialAuthBtns = document.querySelectorAll('.social-auth-btn, .forgot-pwd-link');
  socialAuthBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
});

// Setup eye toggle for password inputs
function setupPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        }
      }
    });
  });
}

// SIGN IN LOGIC
function initSignIn(form) {
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const roleSelect = document.getElementById('loginRole');
  const alertBox = document.getElementById('loginAlert');

  // Clear errors on typing
  [emailInput, passwordInput, roleSelect].forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        if (alertBox) alertBox.style.display = 'none';
      });
      field.addEventListener('change', () => {
        field.classList.remove('is-invalid');
        if (alertBox) alertBox.style.display = 'none';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    // Reset
    [emailInput, passwordInput, roleSelect].forEach(f => f && f.classList.remove('is-invalid'));
    if (alertBox) alertBox.style.display = 'none';

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
    }

    // Validate Password (min 6 characters)
    if (!passwordInput.value.trim() || passwordInput.value.trim().length < 6) {
      passwordInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = passwordInput;
    }

    // Validate Role
    if (!roleSelect.value) {
      roleSelect.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = roleSelect;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const role = roleSelect.value;

    // Check localStorage users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let matchedUser = users.find(u => u.email.toLowerCase() === email && u.role === role);

    if (!matchedUser) {
      // Per specification: "Should be able to login to dashboard with any valid email address and password that passes the form validations."
      const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      matchedUser = {
        id: 'USR-' + Date.now(),
        username: email.split('@')[0],
        firstName: formattedName,
        lastName: 'Explorer',
        email: email,
        password: password,
        role: role,
        roleLabel: getRoleLabel(role),
        lastLogin: new Date().toISOString()
      };
      users.push(matchedUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Store active session in localStorage
    const sessionUser = {
      id: matchedUser.id,
      username: matchedUser.username || matchedUser.firstName,
      firstName: matchedUser.firstName,
      lastName: matchedUser.lastName,
      email: matchedUser.email,
      role: matchedUser.role,
      roleLabel: matchedUser.roleLabel || getRoleLabel(matchedUser.role),
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));

    if (alertBox) {
      alertBox.className = 'alert alert-success';
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = '#DEF7EC';
      alertBox.style.color = '#03543F';
      alertBox.style.padding = '12px';
      alertBox.style.borderRadius = '8px';
      alertBox.style.marginBottom = '16px';
      alertBox.textContent = '✓ Sign in successful! Redirecting to your dashboard...';
    }

    // Role-specific dashboard route
    const targetDashboard = getRoleDashboard(matchedUser.role);
    setTimeout(() => {
      window.location.href = targetDashboard;
    }, 700);
  });
}

// SIGN UP LOGIC
function initSignUp(form) {
  const usernameInput = document.getElementById('regUsername');
  const firstNameInput = document.getElementById('regFirstName');
  const lastNameInput = document.getElementById('regLastName');
  const emailInput = document.getElementById('regEmail');
  const passwordInput = document.getElementById('regPassword');
  const confirmPasswordInput = document.getElementById('regConfirmPassword');
  const roleSelect = document.getElementById('regRole');
  const phoneCodeSelect = document.getElementById('regPhoneCode');
  const phoneInput = document.getElementById('regPhone');
  const addressInput = document.getElementById('regAddress');
  const termsCheckbox = document.getElementById('regTerms');
  const alertBox = document.getElementById('signUpAlert');
  const strengthFill = document.getElementById('pwdStrengthFill');
  const strengthText = document.getElementById('pwdStrengthText');

  // Strict Alphabets-only masking for Name inputs
  if (firstNameInput) {
    firstNameInput.addEventListener('input', () => {
      firstNameInput.value = firstNameInput.value.replace(/[^A-Za-z\s]/g, '');
      firstNameInput.classList.remove('is-invalid');
    });
  }
  if (lastNameInput) {
    lastNameInput.addEventListener('input', () => {
      lastNameInput.value = lastNameInput.value.replace(/[^A-Za-z\s]/g, '');
      lastNameInput.classList.remove('is-invalid');
    });
  }

  // Strict Digits-only & 10 digits max masking for Phone input
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      phoneInput.classList.remove('is-invalid');
    });
  }

  // Real-time password strength indicator
  if (passwordInput && strengthFill && strengthText) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      const strength = evaluatePasswordStrength(val);
      strengthFill.style.width = strength.percent + '%';
      strengthFill.style.backgroundColor = strength.color;
      strengthText.textContent = strength.text;
      strengthText.style.color = strength.color;
    });
  }

  // Remove invalid state on typing/change
  [usernameInput, firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput, roleSelect, phoneInput, addressInput, termsCheckbox].forEach(el => {
    if (el) {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
      el.addEventListener('change', () => el.classList.remove('is-invalid'));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    // Clean states
    [usernameInput, firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput, roleSelect, phoneInput, addressInput].forEach(el => {
      if (el) el.classList.remove('is-invalid');
    });
    if (alertBox) alertBox.style.display = 'none';

    // 1. Username Validation
    const username = usernameInput ? usernameInput.value.trim() : '';
    if (username.length < 3) {
      if (usernameInput) usernameInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = usernameInput;
    } else {
      // Check uniqueness in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
        if (usernameInput) {
          usernameInput.classList.add('is-invalid');
          const fb = usernameInput.parentElement.querySelector('.invalid-feedback');
          if (fb) fb.textContent = 'This username is already taken. Please choose another.';
        }
        if (!firstInvalid) firstInvalid = usernameInput;
      }
    }

    // 2. First & Last Name: ONLY alphabets and at least 2 chars
    const alphaRegex = /^[A-Za-z\s]{2,}$/;
    if (!firstNameInput.value.trim() || !alphaRegex.test(firstNameInput.value.trim())) {
      firstNameInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = firstNameInput;
    }
    if (!lastNameInput.value.trim() || !alphaRegex.test(lastNameInput.value.trim())) {
      lastNameInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = lastNameInput;
    }

    // 3. Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = emailInput.value.trim().toLowerCase();
    if (!email || !emailRegex.test(email)) {
      emailInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some(u => u.email.toLowerCase() === email)) {
        emailInput.classList.add('is-invalid');
        const fb = emailInput.parentElement.querySelector('.invalid-feedback');
        if (fb) fb.textContent = 'An account with this email already exists. Please sign in.';
        if (!firstInvalid) firstInvalid = emailInput;
      }
    }

    // 4. Mobile Phone: EXACTLY 10 digits
    const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
    if (!phoneVal || phoneVal.length !== 10 || !/^\d{10}$/.test(phoneVal)) {
      phoneInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = phoneInput;
    }

    // 5. Password Standards (Uppercase, Lowercase, Number, Special Char, 8+ chars)
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_-])[A-Za-z\d@$!%*?&#^_-]{8,}$/;
    if (!passwordInput.value || !pwdRegex.test(passwordInput.value)) {
      passwordInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = passwordInput;
    }

    // 6. Confirm Password
    if (!confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = confirmPasswordInput;
    }

    // 7. Role Selection
    if (!roleSelect.value) {
      roleSelect.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = roleSelect;
    }

    // 8. Terms Checkbox
    if (termsCheckbox && !termsCheckbox.checked) {
      termsCheckbox.classList.add('is-invalid');
      const termsFb = document.getElementById('termsFeedback');
      if (termsFb) termsFb.style.display = 'block';
      if (!firstInvalid) firstInvalid = termsCheckbox;
    }

    // Focus first invalid field
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Valid registration! Save to localStorage
    const newUser = {
      id: 'USR-' + Date.now(),
      username: username,
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: email,
      password: passwordInput.value,
      role: roleSelect.value,
      roleLabel: getRoleLabel(roleSelect.value),
      phone: `${phoneCodeSelect ? phoneCodeSelect.value : '+91'} ${phoneVal}`,
      address: addressInput ? addressInput.value.trim() : '',
      createdAt: new Date().toISOString()
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    if (alertBox) {
      alertBox.className = 'alert alert-success';
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = '#DEF7EC';
      alertBox.style.color = '#03543F';
      alertBox.style.padding = '14px';
      alertBox.style.borderRadius = '8px';
      alertBox.style.marginBottom = '16px';
      alertBox.textContent = '✓ Account successfully created! Redirecting to Sign In...';
    }

    setTimeout(() => {
      window.location.href = 'sign-in.html';
    }, 1200);
  });
}

function evaluatePasswordStrength(password) {
  let score = 0;
  if (!password) return { percent: 0, color: '#CBD5E1', text: 'Enter password' };
  
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&#^_-]/.test(password)) score++;

  if (score <= 2) {
    return { percent: 30, color: '#EF4444', text: 'Weak: Add uppercase, number & symbol' };
  } else if (score === 3 || score === 4) {
    return { percent: 70, color: '#F59E0B', text: 'Medium: Good, add missing symbols for strong' };
  } else {
    return { percent: 100, color: '#10B981', text: 'Strong: Meets all security criteria' };
  }
}

function getRoleLabel(role) {
  const roles = {
    'traveler': 'Traveler / Explorer',
    'guide': 'Tour Guide / Operator',
    'agency': 'Agency Partner',
    'admin': 'Travel Admin'
  };
  return roles[role] || 'Traveler / Explorer';
}

function getRoleDashboard(role) {
  const dashboards = {
    'traveler': 'dashboard-traveler.html',
    'guide': 'dashboard-guide.html',
    'agency': 'dashboard-agency.html',
    'admin': 'dashboard-admin.html'
  };
  return dashboards[role] || 'dashboard.html';
}
