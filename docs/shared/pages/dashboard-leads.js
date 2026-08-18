import { SITE } from '../site.js';
export const renderDashboardLeads = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Customer Leads & Quotes</h1>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-outline" style="padding: 8px 16px;">Export CSV</button>
                </div>
            </div>
            
            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">Date</th>
                            <th style="padding: 16px;">Type</th>
                            <th style="padding: 16px;">Customer</th>
                            <th style="padding: 16px;">Equipment / Details</th>
                            <th style="padding: 16px;">Status</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="leadsTableBody">
                        <tr>
                            <td colspan="6" style="padding: 30px; text-align: center;">Loading leads...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    async function loadLeads() {
        try {
            const res = await fetch(SITE.api('/leads'));
            const leads = await res.json();
            const tbody = document.getElementById('leadsTableBody');
            
            if (leads.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="padding: 30px; text-align: center;">No leads found.</td></tr>';
                return;
            }

            tbody.innerHTML = leads.reverse().map(lead => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 16px;">${new Date(lead.date).toLocaleDateString()}</td>
                    <td style="padding: 16px;">
                        <span style="background: ${lead.type === 'Trade-In' ? 'rgba(212,168,67,0.2)' : 'rgba(204,0,0,0.2)'}; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; color: ${lead.type === 'Trade-In' ? 'var(--harvest-gold)' : 'var(--case-red)'};">
                            ${lead.type}
                        </span>
                    </td>
                    <td style="padding: 16px;">
                        <strong>${lead.name || [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unnamed lead'}</strong><br>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">${[lead.phone, lead.email].filter(Boolean).join(' | ') || 'No contact details'}</span>
                    </td>
                    <td style="padding: 16px;">
                        ${[lead.make, lead.model].filter(Boolean).join(' ') || '—'} ${lead.year ? `(${lead.year})` : ''}
                        ${lead.tradeIn ? `<br><span style="color: var(--text-muted); font-size: 0.85rem;">Trade: ${[lead.condition, lead.hours ? lead.hours + ' hrs' : null].filter(Boolean).join(', ') || 'details pending'}</span>` : ''}
                    </td>
                    <td style="padding: 16px;">
                        <span style="color: var(--farm-green); font-size: 0.9rem;">New</span>
                    </td>
                    <td style="padding: 16px;">
                        <button class="btn btn-outline btn-sm" onclick="alert('Marked as contacted!')">Mark Contacted</button>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            document.getElementById('leadsTableBody').innerHTML = '<tr><td colspan="6" style="padding: 30px; text-align: center; color: red;">Error loading leads.</td></tr>';
        }
    }

    loadLeads();
};
