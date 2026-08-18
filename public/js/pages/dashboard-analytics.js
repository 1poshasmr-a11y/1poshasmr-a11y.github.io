export const renderDashboardAnalytics = async (root) => {
    // Initial loading state
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 0;">Analytics & Reports</h1>
                <div style="background: rgba(204,0,0,0.2); color: #ff6b6b; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(204,0,0,0.5);">
                    DEMO DATA
                </div>
            </div>
            
            <div id="analyticsContent" style="text-align: center; padding: 40px;">Loading analytics...</div>
        </div>
        
        <style>
            .kpi-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            .dashboard-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 30px;
            }
            @media (max-width: 900px) {
                .dashboard-grid { grid-template-columns: 1fr; }
            }
            .activity-item {
                padding: 15px 0;
                border-bottom: 1px solid var(--glass-border);
            }
            .activity-item:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
            .tag {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 8px;
            }
            .tag.quote { background: rgba(212, 168, 67, 0.2); color: var(--harvest-gold); }
            .tag.alert { background: rgba(27, 77, 62, 0.3); color: #4ade80; }
            .tag.service { background: rgba(204, 0, 0, 0.2); color: #ff6b6b; }
        </style>
    `;

    try {
        const res = await fetch('/api/dashboard');
        const data = await res.json();
        
        const content = document.getElementById('analyticsContent');
        
        content.innerHTML = `
            <!-- KPIs -->
            <div class="kpi-grid">
                <div class="dash-stat animate-fade-in">
                    <div class="dash-stat-value" style="color: var(--case-red);">${data.kpis.totalLeads}</div>
                    <div class="dash-stat-label">Total Leads (30d)</div>
                    <div class="dash-stat-delta delta-up">↑ 12% vs last month</div>
                </div>
                <div class="dash-stat animate-fade-in" style="animation-delay: 0.1s">
                    <div class="dash-stat-value" style="color: var(--harvest-gold);">${data.kpis.websiteVisits.toLocaleString()}</div>
                    <div class="dash-stat-label">Website Visits</div>
                    <div class="dash-stat-delta delta-up">↑ 8% vs last month</div>
                </div>
                <div class="dash-stat animate-fade-in" style="animation-delay: 0.2s">
                    <div class="dash-stat-value">${data.kpis.quoteRequests}</div>
                    <div class="dash-stat-label">Quote Requests</div>
                    <div class="dash-stat-delta delta-up">↑ 5 this week</div>
                </div>
                <div class="dash-stat animate-fade-in" style="animation-delay: 0.3s">
                    <div class="dash-stat-value" style="color: #4CAF88;">${data.kpis.activeServiceTickets}</div>
                    <div class="dash-stat-label">Active Service Tickets</div>
                    <div class="dash-stat-delta" style="color:var(--text-muted);">2 ready for pickup</div>
                </div>
            </div>

            <div class="dashboard-grid">
                <!-- Charts Area (Mocked for Demo) -->
                <div class="glass-card animate-fade-in" style="padding: 24px; animation-delay: 0.4s; text-align: left;">
                    <h3 style="margin-bottom: 20px;">Equipment Views by Category</h3>
                    
                    <!-- Simple CSS Bar Chart -->
                    <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 30px;">
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                                <span>Tractors</span>
                                <span>45%</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="width: 45%; height: 100%; background: var(--case-red);"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                                <span>Harvesting</span>
                                <span>25%</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="width: 25%; height: 100%; background: var(--harvest-gold);"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                                <span>Construction</span>
                                <span>20%</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="width: 20%; height: 100%; background: var(--farm-green);"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                                <span>Attachments</span>
                                <span>10%</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="width: 10%; height: 100%; background: #666;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity Feed -->
                <div class="glass-card animate-fade-in" style="padding: 24px; animation-delay: 0.5s; text-align: left;">
                    <h3 style="margin-bottom: 20px;">Recent Activity</h3>
                    
                    <div style="display: flex; flex-direction: column;">
                        ${data.recentActivity.map(item => `
                            <div class="activity-item">
                                <span class="tag ${item.type}">${item.type}</span>
                                <div style="font-size: 0.95rem; margin-bottom: 5px;">${item.text}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">${item.time}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        document.getElementById('analyticsContent').innerHTML = `<div style="color: red;">Error loading analytics data.</div>`;
    }
};
