import { SITE } from '../site.js';
export const renderDashboardService = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Service Department</h1>
                <button class="btn btn-primary" onclick="alert('Ticket creation form opens here.')" style="padding: 10px 20px;">+ New Ticket</button>
            </div>
            
            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">WO #</th>
                            <th style="padding: 16px;">Customer</th>
                            <th style="padding: 16px;">Equipment</th>
                            <th style="padding: 16px;">Issue</th>
                            <th style="padding: 16px;">Status</th>
                            <th style="padding: 16px;">Last Updated</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="serviceTableBody">
                        <tr>
                            <td colspan="7" style="padding: 30px; text-align: center;">Loading tickets...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    async function loadTickets() {
        try {
            const res = await fetch(SITE.api('/service'));
            const tickets = await res.json();
            const tbody = document.getElementById('serviceTableBody');
            
            if (tickets.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="padding: 30px; text-align: center;">No active service tickets.</td></tr>';
                return;
            }

            tbody.innerHTML = tickets.map(t => {
                // Tickets store progress as a timeline, not a status string. The
                // active step is the ticket's current status, and its timestamp is
                // the last time anyone touched the job.
                const timeline = t.timeline || [];
                const active = timeline.find(s => s.status === 'active');
                const lastDone = [...timeline].reverse().find(s => s.date);
                const status = active ? active.title : (timeline.length ? 'Ready for Pickup' : 'Unknown');
                const updated = active?.date || lastDone?.date || null;

                let statusColor = 'var(--text-muted)';
                if (status === 'In Progress') statusColor = 'var(--harvest-gold)';
                if (status === 'Parts Ordered') statusColor = 'var(--case-red)';
                if (status === 'Ready for Pickup') statusColor = 'var(--farm-green)';

                return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 16px; font-weight: bold; font-family: monospace;">${t.id}</td>
                    <td style="padding: 16px;">
                        ${t.customerName}<br>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">${t.customerPhone}</span>
                    </td>
                    <td style="padding: 16px;">${t.equipment}</td>
                    <td style="padding: 16px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${t.issue || t.issueDescription || '—'}
                    </td>
                    <td style="padding: 16px;">
                        <span style="color: ${statusColor}; font-weight: bold; font-size: 0.9rem;">${status}</span>
                    </td>
                    <td style="padding: 16px;">${updated ? new Date(updated).toLocaleDateString() : '—'}</td>
                    <td style="padding: 16px; white-space: nowrap;">
                        <button class="btn btn-outline btn-sm" onclick="alert('Update status modal opens')">Update</button>
                    </td>
                </tr>
                `;
            }).join('');
        } catch (e) {
            document.getElementById('serviceTableBody').innerHTML = '<tr><td colspan="7" style="padding: 30px; text-align: center; color: red;">Error loading tickets.</td></tr>';
        }
    }

    loadTickets();
};
