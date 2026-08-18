import { SITE } from '../site.js';
export const renderServicePage = (root) => {
    root.innerHTML = `
        <div class="container section" style="max-width: 800px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Service Tracker</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem;">
                    Check the real-time status of your equipment in our shop.
                </p>
            </div>

            <div class="glass-card" style="padding: 40px; margin-bottom: 40px;">
                <form id="serviceLookupForm" style="display: flex; gap: 15px;">
                    <div style="flex-grow: 1;">
                        <input type="text" id="lookupInput" class="form-control" placeholder="Enter Work Order # or Phone Number" required style="padding: 15px; font-size: 1.1rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="padding: 15px 30px;">Track</button>
                </form>
                <div style="margin-top: 15px; font-size: 0.9rem; color: var(--text-muted);">
                    Demo: Try tracking Work Order <strong style="color: white; cursor: pointer;" onclick="document.getElementById('lookupInput').value='WO-8832'">WO-8832</strong> or <strong style="color: white; cursor: pointer;" onclick="document.getElementById('lookupInput').value='WO-8835'">WO-8835</strong>.
                </div>
            </div>

            <div id="serviceResultContainer">
                <!-- Results will render here -->
            </div>
        </div>

        <style>
            .timeline {
                position: relative;
                padding-left: 40px;
                margin-top: 40px;
            }
            .timeline::before {
                content: '';
                position: absolute;
                left: 14px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: var(--glass-border);
            }
            .timeline-item {
                position: relative;
                margin-bottom: 30px;
            }
            .timeline-item:last-child {
                margin-bottom: 0;
            }
            .timeline-dot {
                position: absolute;
                left: -40px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: var(--dark-surface);
                border: 2px solid var(--glass-border);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                color: var(--text-muted);
                z-index: 2;
                transition: all 0.3s ease;
            }
            .timeline-item.completed .timeline-dot {
                background: var(--farm-green);
                border-color: var(--farm-green);
                color: white;
            }
            .timeline-item.active .timeline-dot {
                background: var(--case-red);
                border-color: var(--case-red);
                color: white;
                box-shadow: 0 0 15px rgba(204, 0, 0, 0.5);
                animation: pulse 2s infinite;
            }
            .timeline-content {
                padding: 15px 20px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid transparent;
            }
            .timeline-item.active .timeline-content {
                background: rgba(204, 0, 0, 0.05);
                border-color: rgba(204, 0, 0, 0.2);
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(204, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(204, 0, 0, 0); }
            }
        </style>
    `;

    document.getElementById('serviceLookupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('lookupInput').value.trim();
        const container = document.getElementById('serviceResultContainer');
        
        container.innerHTML = `<div style="text-align: center; padding: 40px;">Searching...</div>`;

        try {
            const res = await fetch(SITE.api(`/service/${input}`));
            if (!res.ok) {
                const error = await res.json();
                container.innerHTML = `
                    <div class="glass-card" style="padding: 30px; text-align: center; border-color: rgba(204,0,0,0.3);">
                        <div style="color: var(--case-red); font-size: 2rem; margin-bottom: 10px;">⚠️</div>
                        <h3 style="margin-bottom: 10px;">Not Found</h3>
                        <p style="color: var(--text-muted);">${error.error}</p>
                    </div>
                `;
                return;
            }

            const ticket = await res.json();

            container.innerHTML = `
                <div class="glass-card animate-fade-in" style="padding: 40px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--glass-border); padding-bottom: 20px; margin-bottom: 20px;">
                        <div>
                            <h2 style="font-size: 1.8rem; margin-bottom: 5px;">Work Order: ${ticket.id}</h2>
                            <div style="color: var(--text-muted); font-size: 1.1rem;">${ticket.equipment}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px;">Estimated Completion</div>
                            <div style="font-weight: 600; font-size: 1.1rem; color: var(--harvest-gold);">${new Date(ticket.estimatedCompletion).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 5px;">Issue Description</h3>
                        <p style="color: var(--text-muted);">${ticket.issue}</p>
                    </div>

                    <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">📱</span>
                            <div>
                                <div style="font-weight: 600;">Enable Push Notifications</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">Get alerts when status changes</div>
                            </div>
                        </div>
                        <button class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem;" onclick="alert('In a real app, this would prompt for Web Push notification permissions.')">Enable</button>
                    </div>

                    <div class="timeline">
                        ${ticket.timeline.map((step) => {
                            let icon = '';
                            if (step.status === 'completed') icon = '✓';
                            else if (step.status === 'active') icon = '⚙';
                            else icon = step.step;

                            return `
                                <div class="timeline-item ${step.status}">
                                    <div class="timeline-dot">${icon}</div>
                                    <div class="timeline-content">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                            <h4 style="font-size: 1.1rem; ${step.status === 'active' ? 'color: var(--case-red);' : ''}">${step.title}</h4>
                                            ${step.date ? `<span style="font-size: 0.85rem; color: var(--text-muted);">${step.date}</span>` : ''}
                                        </div>
                                        ${step.notes ? `<p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 5px;">${step.notes}</p>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } catch (err) {
            container.innerHTML = `<div style="color: red; text-align: center;">Error looking up service ticket.</div>`;
        }
    });
};
