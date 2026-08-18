export const renderDashboardInventory = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Inventory Management</h1>
                <button class="btn btn-primary" onclick="alert('Add Equipment modal opens here.')" style="padding: 10px 20px;">+ Add Equipment</button>
            </div>
            
            <div class="glass-card" style="padding: 24px; margin-bottom: 30px;">
                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
                    <div style="flex: 2; min-width: 250px;">
                        <label class="form-label" style="font-size: 0.85rem;">Search Inventory</label>
                        <input type="text" class="form-control" id="inventorySearch" placeholder="Model, brand, or keyword...">
                    </div>
                </div>
            </div>

            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">Photo</th>
                            <th style="padding: 16px;">Details</th>
                            <th style="padding: 16px;">Category</th>
                            <th style="padding: 16px;">Price</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventoryTableBody">
                        <tr>
                            <td colspan="5" style="padding: 30px; text-align: center;">Loading inventory...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    async function loadInventory(search = '') {
        try {
            const res = await fetch(`/api/equipment${search ? '?search=' + encodeURIComponent(search) : ''}`);
            const equipment = await res.json();
            const tbody = document.getElementById('inventoryTableBody');
            
            if (equipment.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="padding: 30px; text-align: center;">No inventory found.</td></tr>';
                return;
            }

            // Expose delete function globally so inline onclick can use it
            window.deleteEquipment = async (id) => {
                if(confirm('Are you sure you want to delete this equipment?')) {
                    await fetch('/api/equipment/' + id, { method: 'DELETE' });
                    loadInventory(document.getElementById('inventorySearch').value);
                }
            };

            tbody.innerHTML = equipment.map(item => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 16px; width: 80px;">
                        <img src="${item.images[0]}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                    </td>
                    <td style="padding: 16px;">
                        <strong>${item.title}</strong><br>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">${item.brand} | ${item.condition} | ${item.hours ? item.hours + ' hrs' : 'N/A'}</span>
                    </td>
                    <td style="padding: 16px; text-transform: capitalize;">${item.category}</td>
                    <td style="padding: 16px; font-weight: bold;">
                        ${item.price > 0 ? '$' + item.price.toLocaleString() : 'Call for Price'}
                    </td>
                    <td style="padding: 16px; white-space: nowrap;">
                        <button class="btn btn-ghost btn-sm" onclick="alert('Edit modal opens')">Edit</button>
                        <button class="btn btn-outline btn-sm" style="color: var(--case-red); border-color: rgba(204,0,0,0.3);" onclick="window.deleteEquipment('${item.id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            document.getElementById('inventoryTableBody').innerHTML = '<tr><td colspan="5" style="padding: 30px; text-align: center; color: red;">Error loading inventory.</td></tr>';
        }
    }

    let debounceTimer;
    document.getElementById('inventorySearch').addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            loadInventory(e.target.value);
        }, 300);
    });

    loadInventory();
};
