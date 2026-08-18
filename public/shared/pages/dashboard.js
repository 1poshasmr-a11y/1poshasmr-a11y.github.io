export const renderDashboardPage = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 0;">Dealer Dashboard</h1>
                <div style="background: rgba(204,0,0,0.2); color: #ff6b6b; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(204,0,0,0.5);">
                    DEALER ADMIN
                </div>
            </div>
            
            <div class="launchpad-grid">
                <a href="#/dashboard/inventory" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0s;">
                    <div class="launchpad-icon">🚜</div>
                    <h3 class="launchpad-title">Inventory</h3>
                    <p class="launchpad-desc">Manage equipment, prices, and photos</p>
                </a>
                
                <a href="#/dashboard/leads" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.1s;">
                    <div class="launchpad-icon">👥</div>
                    <h3 class="launchpad-title">Leads & Quotes</h3>
                    <p class="launchpad-desc">View incoming customer requests</p>
                </a>
                
                <a href="#/dashboard/parts" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.2s;">
                    <div class="launchpad-icon">⚙️</div>
                    <h3 class="launchpad-title">Parts Catalog</h3>
                    <p class="launchpad-desc">Manage parts catalog and inventory</p>
                </a>
                
                <a href="#/dashboard/parts-requests" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.25s;">
                    <div class="launchpad-icon">📦</div>
                    <h3 class="launchpad-title">Parts Requests</h3>
                    <p class="launchpad-desc">Manage incoming customer parts requests</p>
                </a>
                
                <a href="#/dashboard/service" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.3s;">
                    <div class="launchpad-icon">🔧</div>
                    <h3 class="launchpad-title">Service Dept</h3>
                    <p class="launchpad-desc">Update tickets and notify customers</p>
                </a>
                
                <a href="#/dashboard/analytics" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.4s;">
                    <div class="launchpad-icon">📈</div>
                    <h3 class="launchpad-title">Analytics</h3>
                    <p class="launchpad-desc">View KPIs, visits, and activity</p>
                </a>

                <a href="#/dashboard/jobs" class="glass-card launchpad-card animate-fade-in" style="animation-delay: 0.5s;">
                    <div class="launchpad-icon">👔</div>
                    <h3 class="launchpad-title">Job Postings</h3>
                    <p class="launchpad-desc">Manage dealership career opportunities</p>
                </a>
            </div>
        </div>
        
        <style>
            .launchpad-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 24px;
                margin-top: 20px;
            }
            .launchpad-card {
                padding: 40px 24px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                border: 1px solid var(--glass-border);
            }
            .launchpad-card:hover {
                transform: translateY(-5px);
                border-color: rgba(255, 255, 255, 0.2);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                background: var(--dark-surface-2);
            }
            .launchpad-icon {
                font-size: 3.5rem;
                margin-bottom: 20px;
            }
            .launchpad-title {
                color: white;
                margin-bottom: 8px;
                font-size: 1.25rem;
            }
            .launchpad-desc {
                color: var(--text-muted);
                font-size: 0.9rem;
                line-height: 1.4;
            }
        </style>
    `;
};
