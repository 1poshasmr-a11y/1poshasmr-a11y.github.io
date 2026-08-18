import { SITE } from '../site.js';
export const renderDashboardParts = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Parts Inventory Management</h1>
                <button class="btn btn-primary" onclick="alert('Feature coming soon')">➕ Add Part</button>
            </div>

            <!-- Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 2rem; color: var(--case-red); font-weight: 700;" id="statTotalParts">...</div>
                    <div style="color: var(--text-muted); font-size: 0.9rem;">Total Parts Tracked</div>
                </div>
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 2rem; color: var(--farm-green); font-weight: 700;" id="statTotalBrands">...</div>
                    <div style="color: var(--text-muted); font-size: 0.9rem;">Brands</div>
                </div>
            </div>

            <!-- Management Tools -->
            <div class="glass-card" style="padding: 24px; margin-bottom: 30px;">
                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
                    <div style="flex: 2; min-width: 250px;">
                        <label class="form-label" style="font-size: 0.85rem;">Search Inventory</label>
                        <input type="text" class="form-control" id="inventorySearch" placeholder="Part number, description, or keyword...">
                    </div>
                    <div style="flex: 1; min-width: 180px;">
                        <label class="form-label" style="font-size: 0.85rem;">Filter by Brand</label>
                        <select id="inventoryBrandFilter" class="form-control">
                            <option value="">All Brands</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Data Table -->
            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">Part #</th>
                            <th style="padding: 16px;">Brand</th>
                            <th style="padding: 16px;">Description</th>
                            <th style="padding: 16px;">Category</th>
                            <th style="padding: 16px;">In Stock</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventoryTableBody">
                        <tr>
                            <td colspan="6" style="padding: 30px; text-align: center;">Loading inventory...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                <span id="inventoryResultCount" style="color: var(--text-muted); font-size: 0.9rem;"></span>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline" id="prevPageBtn" disabled>← Previous</button>
                    <span id="pageInfo" style="color: var(--text-muted); line-height: 44px; padding: 0 15px;"></span>
                    <button class="btn btn-outline" id="nextPageBtn" disabled>Next →</button>
                </div>
            </div>
        </div>
    `;

    // State
    let currentPage = 1;
    let currentBrand = '';
    let currentSearch = '';
    let allBrands = [];

    async function loadInventory() {
        const tbody = document.getElementById('inventoryTableBody');
        tbody.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center;">Loading inventory...</td></tr>`;

        try {
            const params = new URLSearchParams();
            if (currentBrand) params.set('brand', currentBrand);
            if (currentSearch) params.set('search', currentSearch);
            params.set('page', currentPage);
            params.set('limit', 20);

            const res = await fetch(SITE.api(`/parts?${params}`));
            const data = await res.json();

            // Update stats
            document.getElementById('statTotalParts').textContent = data.total.toLocaleString();
            
            if (allBrands.length === 0 && data.brands) {
                allBrands = data.brands;
                document.getElementById('statTotalBrands').textContent = allBrands.length;
                
                const select = document.getElementById('inventoryBrandFilter');
                allBrands.forEach(b => {
                    const opt = document.createElement('option');
                    opt.value = b;
                    opt.textContent = b;
                    select.appendChild(opt);
                });
            }

            document.getElementById('inventoryResultCount').textContent = `Showing ${data.parts.length} of ${data.total} parts`;

            // Pagination
            document.getElementById('prevPageBtn').disabled = data.page <= 1;
            document.getElementById('nextPageBtn').disabled = data.page >= data.totalPages;
            document.getElementById('pageInfo').textContent = `Page ${data.page} of ${data.totalPages}`;

            if (data.parts.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center;">No parts found matching criteria.</td></tr>`;
                return;
            }

            tbody.innerHTML = data.parts.map(part => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                    <td style="padding: 16px; font-family: monospace; font-weight: 600;">${part.partNumber}</td>
                    <td style="padding: 16px;">
                        <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                            ${part.brand}
                        </span>
                    </td>
                    <td style="padding: 16px;">
                        <div style="font-weight: 500;">${part.description}</div>
                    </td>
                    <td style="padding: 16px; color: var(--text-muted);">${part.category || '-'}</td>
                    <td style="padding: 16px;">
                        ${part.inStock 
                            ? '<span style="color: var(--farm-green); font-weight: bold;">Yes</span>' 
                            : '<span style="color: var(--case-red);">No</span>'}
                    </td>
                    <td style="padding: 16px;">
                        <button class="btn btn-ghost" style="padding: 4px 8px; font-size: 0.85rem;" onclick="alert('Edit feature coming soon')">Edit</button>
                    </td>
                </tr>
            `).join('');

        } catch(e) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--case-red);">Error loading inventory.</td></tr>`;
        }
    }

    // Event Listeners
    let debounceTimer;
    document.getElementById('inventorySearch').addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            currentSearch = e.target.value;
            currentPage = 1;
            loadInventory();
        }, 300);
    });

    document.getElementById('inventoryBrandFilter').addEventListener('change', (e) => {
        currentBrand = e.target.value;
        currentPage = 1;
        loadInventory();
    });

    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; loadInventory(); }
    });
    
    document.getElementById('nextPageBtn').addEventListener('click', () => {
        currentPage++; loadInventory();
    });

    loadInventory();
};
