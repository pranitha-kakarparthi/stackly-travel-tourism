/**
 * STACKLY TRAVEL & TOURISM - ROLE-AWARE DASHBOARD LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check active session from sessionStorage (priority for session consistency) then localStorage
  let currentUser = null;
  const sessionRaw = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
  if (sessionRaw) {
    try {
      currentUser = JSON.parse(sessionRaw);
    } catch (e) {
      currentUser = null;
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramEmail = urlParams.get('email');
  if (paramEmail) {
    sessionStorage.setItem('userEmail', paramEmail);
  }

  const storedRole = sessionStorage.getItem('userRole');
  const storedEmail = paramEmail || sessionStorage.getItem('userEmail') || (currentUser && currentUser.email);

  const currentPath = window.location.pathname.split('/').pop() || '';
  const isAgentPath = currentPath.includes('agent') || currentPath.includes('agency');
  const travellerPages = [
    'dashboard-traveler.html', 'dashboard-traveller.html', 
    'dashboard-expeditions.html', 'dashboard-itineraries.html', 
    'dashboard-safety.html', 'dashboard-settings.html', 'dashboard-support.html'
  ];
  const isTravellerPath = currentPath.includes('traveler') || currentPath.includes('traveller') || travellerPages.includes(currentPath);

  // Determine effective role maintaining strict isolation
  let role = 'traveler';
  if (isAgentPath) {
    role = 'agent';
  } else if (isTravellerPath) {
    role = 'traveler';
  } else if (storedRole) {
    role = storedRole;
  } else if (currentUser && currentUser.role) {
    role = currentUser.role;
  }

  // Determine effective email from login session or fallback default
  let email = storedEmail || (currentUser && currentUser.email);
  if (!email) {
    email = (role === 'agent' || role === 'agency') ? 'agent.lead@stacklyadventures.com' : 'alex.sterling@stacklyadventures.com';
  }

  // Derive User name strictly according to the login email ID
  const nameInfo = getNameFromEmail(email);

  currentUser = {
    ...(currentUser || {}),
    email: email,
    username: email.split('@')[0],
    firstName: nameInfo.firstName,
    lastName: nameInfo.lastName,
    fullName: nameInfo.fullName,
    initials: nameInfo.initials,
    role: (role === 'agent' || role === 'agency') ? 'agent' : 'traveler',
    roleLabel: (role === 'agent' || role === 'agency') ? 'Travel Agent' : 'Traveller',
    lastLogin: (currentUser && currentUser.lastLogin) ? currentUser.lastLogin : new Date().toISOString()
  };

  sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  sessionStorage.setItem('userEmail', email);
  sessionStorage.setItem('userRole', currentUser.role);
  sessionStorage.setItem('userRoleLabel', currentUser.roleLabel);

  // If on main dashboard.html, cleanly route to the role-specific dashboard
  if (currentPath === 'dashboard.html' || currentPath === 'dashboard') {
    const roleRoutes = {
      'traveler': 'dashboard-traveler.html',
      'traveller': 'dashboard-traveler.html',
      'agent': 'dashboard-agent.html',
      'agency': 'dashboard-agent.html'
    };
    const target = roleRoutes[currentUser.role] || 'dashboard-traveler.html';
    if (target && target !== 'dashboard.html') {
      window.location.replace(target);
      return;
    }
  }

  // Ensure sidebar Overview link always navigates to user's independent role dashboard
  const isAgent = currentUser.role === 'agent' || currentUser.role === 'agency' || isAgentPath;
  const roleOverviewTarget = isAgent ? 'dashboard-agent.html' : 'dashboard-traveler.html';
  const overviewNavItems = document.querySelectorAll('.dash-nav-item');
  overviewNavItems.forEach(item => {
    const span = item.querySelector('span');
    if (span && span.textContent.trim() === 'Overview') {
      item.href = roleOverviewTarget;
    }
  });

  // Populate user data & dynamic time-of-day greeting
  setupDashboardUser(currentUser);

  // Handle Sign Out: clear both session & local storage and redirect to sign-in.html
  const signOutBtn = document.getElementById('dashSignOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.clear();
      localStorage.removeItem('currentUser');
      window.location.href = 'sign-in.html';
    });
  }

  // Mobile sidebar drawer handling
  const sidebarToggle = document.getElementById('dashSidebarToggle');
  const sidebarClose = document.getElementById('dashSidebarClose');
  const sidebar = document.querySelector('.dash-sidebar');
  let overlay = document.querySelector('.dash-sidebar-overlay');

  if (sidebar && !overlay) {
    overlay = document.createElement('div');
    overlay.className = 'dash-sidebar-overlay';
    document.body.appendChild(overlay);
  }

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Per specifications: Every link and action button in dashboard content strictly redirects to 404
  const dashContentLinks = document.querySelectorAll('.dash-main a, .dash-content a, .dash-content button, .dash-action-btn, [data-action="404"]');
  dashContentLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.id === 'dashSignOutBtn' || link.id === 'dashSidebarToggle' || link.id === 'dashSidebarClose') return;
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
});

function setupDashboardUser(user) {
  // Dynamic Greeting based on time of day
  const hours = new Date().getHours();
  let timeGreeting = 'Welcome';
  if (hours >= 4 && hours < 12) timeGreeting = 'Good morning';
  else if (hours >= 12 && hours < 18) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';

  const currentPath = window.location.pathname.split('/').pop() || '';
  const isAgent = user.role === 'agent' || user.role === 'agency' || currentPath.includes('agent') || currentPath.includes('agency');
  const welcomeHeading = document.getElementById('dashGreetingHeading');
  if (welcomeHeading) {
    const displayName = user.fullName || user.firstName || (isAgent ? 'Travel Agent' : 'Traveller');
    welcomeHeading.textContent = `${timeGreeting}, ${displayName}!`;
  }

  // Display User Name in sidebar profile & cards
  const userNameElements = document.querySelectorAll('.dash-user-display-name');
  userNameElements.forEach(el => {
    el.textContent = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || (isAgent ? 'Travel Agent' : 'Traveller');
  });

  // Display role label
  const userRoleElements = document.querySelectorAll('.dash-user-display-role');
  userRoleElements.forEach(el => {
    el.textContent = isAgent ? 'Travel Agent' : 'Traveller';
  });

  // Display role badges
  const roleBadgeElements = document.querySelectorAll('.dash-role-badge');
  roleBadgeElements.forEach(el => {
    if (!el.textContent.includes('Portal') && !el.textContent.includes('Tier')) {
      el.textContent = isAgent ? 'Travel Agent' : 'Traveller';
    }
  });

  // Display user avatar initials computed from login email name
  const userAvatarElements = document.querySelectorAll('.dash-user-initials');
  userAvatarElements.forEach(el => {
    el.textContent = user.initials || (isAgent ? 'TA' : 'TR');
  });

  // Display login timestamp with user email
  const loginTimeElement = document.getElementById('dashLoginTimestamp');
  if (loginTimeElement) {
    const loginDate = user.lastLogin ? new Date(user.lastLogin) : new Date();
    const roleDesc = isAgent ? 'Authorized Travel Agent' : 'Expedition Member';
    const emailInfo = user.email ? ` &bull; ${user.email}` : '';
    loginTimeElement.innerHTML = `${roleDesc} &bull; Logged in: ${loginDate.toLocaleDateString()} at ${loginDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${emailInfo}`;
  }

  // Sync profile fields on Settings pages if present
  const profileNameInputs = document.querySelectorAll('.form-control[value="Alexander Sterling"], input[name="fullName"], #settingsFullName');
  profileNameInputs.forEach(input => {
    if (user.fullName) input.value = user.fullName;
  });
  const profileEmailInputs = document.querySelectorAll('.form-control[value="alexander.sterling@example.com"], .form-control[value="agent.partner@apex-travel.com"], input[name="email"], #settingsEmail');
  profileEmailInputs.forEach(input => {
    if (user.email) input.value = user.email;
  });
}

function getNameFromEmail(email) {
  if (!email || typeof email !== 'string') {
    return { firstName: 'User', lastName: '', fullName: 'User', initials: 'U' };
  }
  const cleanEmail = email.trim().toLowerCase();
  const handle = cleanEmail.split('@')[0].trim();
  if (!handle) {
    return { firstName: 'User', lastName: '', fullName: 'User', initials: 'U' };
  }

  const rawParts = handle.split(/[._\-+]+/).filter(Boolean);
  const words = [];

  for (const part of rawParts) {
    if (/^\d+$/.test(part)) {
      if (words.length === 0) words.push(part);
      continue;
    }
    let cleaned = part.replace(/\d+$/, '');
    if (!cleaned || cleaned.length < 2) cleaned = part;
    const formatted = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    if (formatted) words.push(formatted);
  }

  if (words.length === 0) {
    const fallback = handle.charAt(0).toUpperCase() + handle.slice(1).toLowerCase();
    words.push(fallback);
  }

  const firstName = words[0];
  const lastName = words.slice(1).join(' ');
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;

  let initials = '';
  if (lastName) {
    const lastWord = words[words.length - 1];
    initials = (firstName.charAt(0) + lastWord.charAt(0)).toUpperCase();
  } else if (firstName.length >= 2) {
    initials = firstName.slice(0, 2).toUpperCase();
  } else {
    initials = firstName.charAt(0).toUpperCase();
  }

  return { firstName, lastName, fullName, initials };
}

