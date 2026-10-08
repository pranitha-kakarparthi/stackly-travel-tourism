/**
 * STACKLY TRAVEL & TOURISM - ROLE-AWARE DASHBOARD LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check active session, fallback gracefully for direct preview
  let currentUser = null;
  const currentUserRaw = localStorage.getItem('currentUser');
  if (currentUserRaw) {
    try {
      currentUser = JSON.parse(currentUserRaw);
    } catch (e) {
      currentUser = null;
    }
  }

  if (!currentUser) {
    currentUser = {
      username: 'alex_sterling',
      firstName: 'Alex',
      lastName: 'Sterling',
      role: 'traveler',
      roleLabel: 'World Explorer',
      lastLogin: new Date().toISOString()
    };
  }

  // If on main dashboard.html and a specific role is explicitly stored from login, route to that role dashboard
  const currentPath = window.location.pathname.split('/').pop() || '';
  if (currentPath === 'dashboard.html' || currentPath === 'dashboard') {
    if (currentUserRaw) {
      const roleRoutes = {
        'traveler': 'dashboard-traveler.html',
        'guide': 'dashboard-guide.html',
        'agency': 'dashboard-agency.html',
        'admin': 'dashboard-admin.html'
      };
      const target = roleRoutes[currentUser.role];
      if (target && target !== 'dashboard.html') {
        window.location.replace(target);
        return;
      }
    }
  }

  // Populate user data & dynamic time-of-day greeting
  setupDashboardUser(currentUser);

  // Handle Sign Out: clear session and redirect to sign-in.html
  const signOutBtn = document.getElementById('dashSignOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
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
  };

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
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

  const welcomeHeading = document.getElementById('dashGreetingHeading');
  if (welcomeHeading) {
    const rolePrefix = user.role === 'guide' ? 'Lead Guide' : user.role === 'admin' ? 'Administrator' : user.role === 'agency' ? 'Agency Partner' : 'Explorer';
    const displayName = user.firstName || user.username || rolePrefix;
    welcomeHeading.textContent = `${timeGreeting}, ${displayName}!`;
  }

  // Display user name
  const userNameElements = document.querySelectorAll('.dash-user-display-name');
  userNameElements.forEach(el => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    el.textContent = fullName || user.username || 'Explorer';
  });

  // Display role label
  const userRoleElements = document.querySelectorAll('.dash-user-display-role');
  userRoleElements.forEach(el => {
    el.textContent = user.roleLabel || user.role || 'Traveler';
  });

  // Display user avatar initials
  const userAvatarElements = document.querySelectorAll('.dash-user-initials');
  const fInitial = (user.firstName || user.username || 'S').charAt(0).toUpperCase();
  const lInitial = (user.lastName || 'T').charAt(0).toUpperCase();
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
