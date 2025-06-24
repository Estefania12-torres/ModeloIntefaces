// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const welcomeTitle = document.querySelector('.welcome-title');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.closest('.logout')) {
                e.preventDefault();
                
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.closest('.nav-item').classList.add('active');
                
                // Update welcome message based on selected section
                const sectionName = this.querySelector('span').textContent;
                updateMainContent(sectionName);
            }
        });
    });
    
    // Notification button functionality
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        showNotification('You have 3 new notifications!');
    });
    
    // Add hover effects to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Update main content based on navigation
function updateMainContent(sectionName) {
    const welcomeTitle = document.querySelector('.welcome-title');
    const contentArea = document.querySelector('.content-area');
    
    // Update title
    welcomeTitle.textContent = sectionName === 'User Profile' ? 'Welcome, Alex' : sectionName;
    
    // Update content based on section
    let content = '';
    switch(sectionName) {
        case 'User Profile':
            content = `
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>Profile Information</h3>
                        <p>Manage your personal information and preferences</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Account Settings</h3>
                        <p>Update your account security and privacy settings</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Activity Summary</h3>
                        <p>View your recent activity and engagement</p>
                    </div>
                </div>
            `;
            break;
        case 'Sport Profile':
            content = `
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>Sports Preferences</h3>
                        <p>Configure your favorite sports and activities</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Performance Goals</h3>
                        <p>Set and track your athletic objectives</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Training Schedule</h3>
                        <p>Manage your training sessions and routines</p>
                    </div>
                </div>
            `;
            break;
        case 'Health Metrics':
            content = `
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>Vital Statistics</h3>
                        <p>Monitor your health indicators and metrics</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Fitness Tracking</h3>
                        <p>Track your daily fitness activities and progress</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Health Reports</h3>
                        <p>View detailed health analysis and reports</p>
                    </div>
                </div>
            `;
            break;
        default:
            content = `
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>${sectionName} Overview</h3>
                        <p>Manage and view your ${sectionName.toLowerCase()} information</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Recent Updates</h3>
                        <p>Latest changes and modifications in ${sectionName.toLowerCase()}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Quick Actions</h3>
                        <p>Perform common tasks related to ${sectionName.toLowerCase()}</p>
                    </div>
                </div>
            `;
    }
    
    contentArea.innerHTML = content;
    
    // Re-add hover effects to new cards
    const newCards = contentArea.querySelectorAll('.dashboard-card');
    newCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Logout functionality
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Add logout animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            alert('Sesión cerrada exitosamente');
            // Here you would typically redirect to login page
            // window.location.href = 'login.html';
        }, 500);
    }
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8B5CF6, #A855F7);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add smooth scrolling for sidebar
document.querySelector('.sidebar').addEventListener('wheel', function(e) {
    e.preventDefault();
    this.scrollTop += e.deltaY;
});