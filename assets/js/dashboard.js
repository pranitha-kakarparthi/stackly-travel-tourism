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

  // Ensure role consistency from sessionStorage
  const storedRole = sessionStorage.getItem('userRole');
  if (currentUser && storedRole && currentUser.role !== storedRole) {
    currentUser.role = storedRole;
    currentUser.roleLabel = sessionStorage.getItem('userRoleLabel') || currentUser.roleLabel;
  }

  const currentPath = window.location.pathname.split('/').pop() || '';
  const isAgentPath = currentPath.includes('agent') || currentPath.includes('agency');
  const travellerPages = [
    'dashboard-traveler.html', 'dashboard-traveller.html', 
    'dashboard-expeditions.html', 'dashboard-itineraries.html', 
    'dashboard-safety.html', 'dashboard-settings.html', 'dashboard-support.html'
  ];
  const isTravellerPath = currentPath.includes('traveler') || currentPath.includes('traveller') || travellerPages.includes(currentPath);

  // Maintain strict role isolation according to the page being accessed or stored session
  if (isAgentPath) {
    currentUser = {
      username: 'agent_lead',
      firstName: 'Partner',
      lastName: 'Lead',
      role: 'agent',
      roleLabel: 'Travel Agent',
      lastLogin: new Date().toISOString()
    };
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('userRole', 'agent');
    sessionStorage.setItem('userRoleLabel', 'Travel Agent');
  } else if (isTravellerPath) {
    currentUser = {
      username: 'alex_sterling',
      firstName: 'Alex',
      lastName: 'Sterling',
      role: 'traveler',
      roleLabel: 'Traveller',
      lastLogin: new Date().toISOString()
    };
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('userRole', 'traveler');
    sessionStorage.setItem('userRoleLabel', 'Traveller');
  } else if (!currentUser) {
    const isAgentRole = storedRole === 'agent' || storedRole === 'agency';
    currentUser = {
      username: isAgentRole ? 'agent_lead' : 'alex_sterling',
      firstName: isAgentRole ? 'Partner' : 'Alex',
      lastName: isAgentRole ? 'Lead' : 'Sterling',
      role: isAgentRole ? 'agent' : 'traveler',
      roleLabel: isAgentRole ? 'Travel Agent' : 'Traveller',
      lastLogin: new Date().toISOString()
    };
  }

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
    const rolePrefix = isAgent ? 'Travel Agent' : 'Explorer';
    const displayName = user.firstName || user.username || rolePrefix;
    welcomeHeading.textContent = `${timeGreeting}, ${displayName}!`;
  }

  // Display user name
  const userNameElements = document.querySelectorAll('.dash-user-display-name');
  userNameElements.forEach(el => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    el.textContent = fullName || user.username || (isAgent ? 'Travel Agent' : 'Explorer');
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

  // Display user avatar initials
  const userAvatarElements = document.querySelectorAll('.dash-user-initials');
  const defaultFirst = isAgent ? 'T' : 'S';
  const defaultLast = isAgent ? 'A' : 'T';
  const fInitial = (user.firstName || user.username || defaultFirst).charAt(0).toUpperCase();
  const lInitial = (user.lastName || defaultLast).charAt(0).toUpperCase();
  userAvatarElements.forEach(el => {
    el.textContent = `${fInitial}${lInitial}`;
  });

  // Display login timestamp
  const loginTimeElement = document.getElementById('dashLoginTimestamp');
  if (loginTimeElement) {
    const loginDate = user.lastLogin ? new Date(user.lastLogin) : new Date();
    loginTimeElement.textContent = `Logged in: ${loginDate.toLocaleDateString()} at ${loginDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}
