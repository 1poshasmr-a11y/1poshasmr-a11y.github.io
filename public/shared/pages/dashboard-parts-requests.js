import { SITE } from '../site.js';
export const renderDashboardPartsRequests = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Parts Requests</h1>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-outline" style="padding: 8px 16px;">Export CSV</button>
                </div>
            </div>
            
            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">Date</th>
                            <th style="padding: 16px;">Customer</th>
                            <th style="padding: 16px;">Equipment</th>
                            <th style="padding: 16px;">Parts Needed</th>
                            <th style="padding: 16px;">Status</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="partsReqTableBody">
                        <tr>
                            <td colspan="6" style="padding: 30px; text-align: center;">Loading requests...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    async function loadRequests() {
        try {
            const res = await fetch(SITE.api('/parts-requests'));
            const reqs = await res.json();
            const tbody = document.getElementById('partsReqTableBody');
            
            if (reqs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="padding: 30px; text-align: center;">No parts requests found.</td></tr>';
                return;
            }

            tbody.innerHTML = reqs.reverse().map(r => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 16px; white-space: nowrap;">${new Date(r.date).toLocaleDateString()}</td>
                    <td style="padding: 16px;">
                        <strong>${r.name}</strong><br>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">${r.phone || r.email}</span>
                    </td>
                    <td style="padding: 16px;">
                        ${r.make} ${r.model} ${r.year ? `(${r.year})` : ''}<br>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">SN: ${r.serial || 'N/A'}</span>
                    </td>
                    <td style="padding: 16px; max-width: 250px;">
                        <div style="white-space: pre-wrap; font-size: 0.9rem;">${r.parts}</div>
                    </td>
                    <td style="padding: 16px;">
                        <span style="color: var(--case-red); font-size: 0.9rem;">Pending Quote</span>
                    </td>
                    <td style="padding: 16px; white-space: nowrap;">
                        <button class="btn btn-primary btn-sm" onclick="alert('Parts marked as ordered!')">Mark Ordered</button>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            document.getElementById('partsReqTableBody').innerHTML = '<tr><td colspan="6" style="padding: 30px; text-align: center; color: red;">Error loading requests.</td></tr>';
        }
    }

    loadRequests();
};
