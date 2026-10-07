/**
 * STACKLY TRAVEL & TOURISM - ROLE-AWARE DASHBOARD LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check active session
  const currentUserRaw = localStorage.getItem('currentUser');
  if (!currentUserRaw) {
    window.location.href = 'sign-in.html';
    return;
  }

  const currentUser = JSON.parse(currentUserRaw);

  // If on main dashboard.html, smart-route to the specific role dashboard
  const currentPath = window.location.pathname.split('/').pop() || '';
  if (currentPath === 'dashboard.html' || currentPath === 'dashboard') {
    const roleRoutes = {
      'traveler': 'dashboard-traveler.html',
      'guide': 'dashboard-guide.html',
      'agency': 'dashboard-agency.html',
      'admin': 'dashboard-admin.html'
    };
    const target = roleRoutes[currentUser.role] || 'dashboard-traveler.html';
    window.location.replace(target);
    return;
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

  // Per specifications: All action buttons in dashboard redirect to 404
  const dashActionButtons = document.querySelectorAll('.dash-action-btn, [data-action="404"]');
  dashActionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
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
