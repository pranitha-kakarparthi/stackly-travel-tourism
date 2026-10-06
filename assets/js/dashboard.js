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
  setupDashboard(currentUser);

  // Sign out button
  const signOutBtn = document.getElementById('dashSignOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'sign-in.html';
    });
  }

  // Action buttons redirect to 404
  const dashActionButtons = document.querySelectorAll('.dash-action-btn, [data-action="404"]');
  dashActionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
});

function setupDashboard(user) {
  // Dynamic Greeting based on time of day
  const hours = new Date().getHours();
  let timeGreeting = 'Welcome';
  if (hours >= 4 && hours < 12) timeGreeting = 'Good morning';
  else if (hours >= 12 && hours < 18) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';

  const welcomeHeading = document.getElementById('dashGreetingHeading');
  if (welcomeHeading) {
    welcomeHeading.textContent = `${timeGreeting}, ${user.firstName || user.username || 'Explorer'}!`;
  }

  // User meta in topbar and sidebar
  const userNameElements = document.querySelectorAll('.dash-user-display-name');
  userNameElements.forEach(el => el.textContent = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username);

  const userRoleElements = document.querySelectorAll('.dash-user-display-role');
  userRoleElements.forEach(el => el.textContent = user.roleLabel || user.role);

  const userAvatarElements = document.querySelectorAll('.dash-user-initials');
  const initials = `${(user.firstName || 'S')[0]}${(user.lastName || 'T')[0]}`.toUpperCase();
  userAvatarElements.forEach(el => el.textContent = initials);

  const loginTimeElement = document.getElementById('dashLoginTimestamp');
  if (loginTimeElement) {
    const loginDate = user.lastLogin ? new Date(user.lastLogin) : new Date();
    loginTimeElement.textContent = `Logged in: ${loginDate.toLocaleDateString()} at ${loginDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Render role-specific content
  renderRoleContent(user.role);
}

function renderRoleContent(role) {
  const container = document.getElementById('dashRoleContainer');
  if (!container) return;

  if (role === 'traveler') {
    container.innerHTML = `
      <!-- KPI Row -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon primary"><i class="fa-solid fa-compass"></i></div>
          <div class="kpi-meta">
            <h4>Active Bookings</h4>
            <div class="kpi-value">2</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon secondary"><i class="fa-solid fa-map-location-dot"></i></div>
          <div class="kpi-meta">
            <h4>Places Explored</h4>
            <div class="kpi-value">14</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon accent"><i class="fa-solid fa-award"></i></div>
          <div class="kpi-meta">
            <h4>Adventure Points</h4>
            <div class="kpi-value">2,850</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon info"><i class="fa-solid fa-passport"></i></div>
          <div class="kpi-meta">
            <h4>Saved Wishlist</h4>
            <div class="kpi-value">5 Tours</div>
          </div>
        </div>
      </div>

      <!-- Main Two Column Content -->
      <div class="dash-two-col">
        <!-- Upcoming Expeditions Table -->
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">My Booked Expeditions</h3>
            <button class="btn btn-sm btn-outline dash-action-btn">Explore More Tours</button>
          </div>
          <div class="dash-table-wrap">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>Destination & Tour</th>
                  <th>Departure Date</th>
                  <th>Group Size</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Serengeti Safari & Ngorongoro</strong><br><small class="text-muted">Tanzania, Africa</small></td>
                  <td>Oct 24, 2026</td>
                  <td>2 Guests</td>
                  <td><span class="dash-status confirmed">Confirmed</span></td>
                  <td><button class="btn btn-sm btn-primary dash-action-btn">Manage</button></td>
                </tr>
                <tr>
                  <td><strong>Swiss Alpine Glacier Trail</strong><br><small class="text-muted">Zermatt, Switzerland</small></td>
                  <td>Dec 10, 2026</td>
                  <td>4 Guests</td>
                  <td><span class="dash-status pending">Pending Gear Check</span></td>
                  <td><button class="btn btn-sm btn-primary dash-action-btn">Manage</button></td>
                </tr>
                <tr>
                  <td><strong>Kyoto Zen & Bamboo Groves</strong><br><small class="text-muted">Kyoto, Japan</small></td>
                  <td>Mar 15, 2027</td>
                  <td>1 Guest</td>
                  <td><span class="dash-status completed">Paid & Ready</span></td>
                  <td><button class="btn btn-sm btn-primary dash-action-btn">Manage</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Itinerary Timeline -->
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">Trip Timeline</h3>
          </div>
          <div class="timeline-list">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h5>Oct 23: Pre-departure Briefing</h5>
                <p>Virtual check-in with your safari team lead at 18:00 IST.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h5>Oct 24: Arrival at Kilimanjaro Airport</h5>
                <p>Private 4x4 transfer to Arusha Eco Wilderness Lodge.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h5>Oct 26: Ngorongoro Crater Descent</h5>
                <p>Full day game drive with picnic lunch and wildlife tracker.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (role === 'guide') {
    container.innerHTML = `
      <!-- Guide KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon primary"><i class="fa-solid fa-person-hiking"></i></div>
          <div class="kpi-meta">
            <h4>Assigned Expeditions</h4>
            <div class="kpi-value">4 Active</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon secondary"><i class="fa-solid fa-users"></i></div>
          <div class="kpi-meta">
            <h4>Total Travelers Led</h4>
            <div class="kpi-value">48 Travelers</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon accent"><i class="fa-solid fa-star"></i></div>
          <div class="kpi-meta">
            <h4>Guide Rating</h4>
            <div class="kpi-value">4.97 / 5.0</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon info"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="kpi-meta">
            <h4>Safety Certifications</h4>
            <div class="kpi-value">Verified (WFA)</div>
          </div>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card-header">
          <h3 class="dash-card-title">Your Assigned Guided Tours</h3>
          <button class="btn btn-sm btn-primary dash-action-btn">Update Itinerary</button>
        </div>
        <div class="dash-table-wrap">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Route Title</th>
                <th>Dates</th>
                <th>Group Capacity</th>
                <th>Emergency Contacts</th>
                <th>Guide Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Himalayan Annapurna Base Camp</strong></td>
                <td>Oct 15 - Oct 25, 2026</td>
                <td>12 / 12 (Full)</td>
                <td>Verified SAT-Phone #8812</td>
                <td><button class="btn btn-sm btn-outline dash-action-btn">View Manifest</button></td>
              </tr>
              <tr>
                <td><strong>Iceland Aurora & Glacial Caves</strong></td>
                <td>Nov 05 - Nov 12, 2026</td>
                <td>8 / 10 (2 Open)</td>
                <td>Reykjavik Ops Support</td>
                <td><button class="btn btn-sm btn-outline dash-action-btn">View Manifest</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (role === 'agency') {
    container.innerHTML = `
      <!-- Agency KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon primary"><i class="fa-solid fa-briefcase"></i></div>
          <div class="kpi-meta">
            <h4>Partner Bookings</h4>
            <div class="kpi-value">142 Trips</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon secondary"><i class="fa-solid fa-wallet"></i></div>
          <div class="kpi-meta">
            <h4>Commission Earned</h4>
            <div class="kpi-value">$28,450</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon accent"><i class="fa-solid fa-medal"></i></div>
          <div class="kpi-meta">
            <h4>Agency Tier</h4>
            <div class="kpi-value">Gold Explorer</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon info"><i class="fa-solid fa-chart-line"></i></div>
          <div class="kpi-meta">
            <h4>Conversion Rate</h4>
            <div class="kpi-value">22.4%</div>
          </div>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card-header">
          <h3 class="dash-card-title">Recent Client Bookings & Commission Payouts</h3>
          <button class="btn btn-sm btn-primary dash-action-btn">Download Report</button>
        </div>
        <div class="dash-table-wrap">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Client Name</th>
                <th>Package</th>
                <th>Total Value</th>
                <th>Commission (15%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#STK-9021</td>
                <td>Marcus Vance & Family</td>
                <td>Costa Rica Rainforest Eco Tour</td>
                <td>$5,400</td>
                <td>$810</td>
                <td><span class="dash-status confirmed">Paid Out</span></td>
              </tr>
              <tr>
                <td>#STK-9022</td>
                <td>Sarah Jenkins</td>
                <td>Patagonia Trekking Adventure</td>
                <td>$3,850</td>
                <td>$577.50</td>
                <td><span class="dash-status confirmed">Paid Out</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    // Admin role
    container.innerHTML = `
      <!-- Admin KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon primary"><i class="fa-solid fa-globe"></i></div>
          <div class="kpi-meta">
            <h4>Total Global Bookings</h4>
            <div class="kpi-value">1,280</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon secondary"><i class="fa-solid fa-dollar-sign"></i></div>
          <div class="kpi-meta">
            <h4>Gross Platform Revenue</h4>
            <div class="kpi-value">$1.42M</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon accent"><i class="fa-solid fa-user-shield"></i></div>
          <div class="kpi-meta">
            <h4>Active Guides</h4>
            <div class="kpi-value">64 Verified</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon info"><i class="fa-solid fa-server"></i></div>
          <div class="kpi-meta">
            <h4>System Status</h4>
            <div class="kpi-value">100% Operational</div>
          </div>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card-header">
          <h3 class="dash-card-title">Real-Time Travel Operations Dispatch</h3>
          <button class="btn btn-sm btn-secondary dash-action-btn">System Audit Log</button>
        </div>
        <div class="dash-table-wrap">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Tours in Field</th>
                <th>Total Travelers</th>
                <th>Safety Condition</th>
                <th>Ops Lead</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>East Africa (Serengeti / Kilimanjaro)</td>
                <td>8 Groups</td>
                <td>64 Travelers</td>
                <td><span class="dash-status confirmed">Optimal Green</span></td>
                <td>Lead Ranger A. Kimani</td>
                <td><button class="btn btn-sm btn-outline dash-action-btn">Inspect</button></td>
              </tr>
              <tr>
                <td>Northern Europe (Iceland / Norway)</td>
                <td>6 Groups</td>
                <td>42 Travelers</td>
                <td><span class="dash-status confirmed">Optimal Green</span></td>
                <td>Lead Guide E. Lind</td>
                <td><button class="btn btn-sm btn-outline dash-action-btn">Inspect</button></td>
              </tr>
              <tr>
                <td>Himalayas (Nepal / Ladakh)</td>
                <td>5 Groups</td>
                <td>35 Travelers</td>
                <td><span class="dash-status confirmed">Optimal Green</span></td>
                <td>Lead Sherpa P. Tenzing</td>
                <td><button class="btn btn-sm btn-outline dash-action-btn">Inspect</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Re-attach action triggers inside generated HTML
  const actionTriggers = container.querySelectorAll('.dash-action-btn, [data-action="404"]');
  actionTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
}

