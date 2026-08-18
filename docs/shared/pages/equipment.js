import { SITE } from '../site.js';
import { observeElements } from '../observe.js';

export const renderEquipmentBrowser = async (root) => {
    // Initial Shell
    root.innerHTML = `
        <div class="container section">
            <h1 class="section-title">Equipment Inventory</h1>
            
            <div class="equipment-layout">
                <!-- Filters Sidebar -->
                <aside class="filters-sidebar glass-card">
                    <h3 style="margin-bottom: 20px;">Filters</h3>
                    
                    <div class="form-group">
                        <label class="form-label">Search</label>
                        <input type="text" id="searchInput" class="form-control" placeholder="Search by model, brand...">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select id="categoryFilter" class="form-control">
                            <option value="">All Categories</option>
                            ${SITE.categories.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Brand</label>
                        <select id="brandFilter" class="form-control">
                            <option value="">All Brands</option>
                            ${SITE.brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Condition</label>
                        <select id="conditionFilter" class="form-control">
                            <option value="">All Conditions</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                    </div>

                    <button id="applyFiltersBtn" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Apply Filters</button>
                    <button id="resetFiltersBtn" class="btn btn-outline" style="width: 100%; margin-top: 10px;">Reset</button>
                </aside>

                <!-- Results Area -->
                <div class="results-area">
                    <div class="results-header" style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 20px;">
                        <div id="resultsCount">Loading...</div>
                        <div style="display:flex; gap: 10px; align-items:center;">
                            <span style="color:var(--text-muted)">Sort by:</span>
                            <select id="sortSelect" class="form-control" style="width: auto; padding: 6px 12px;">
                                <option value="newest">Newest Added</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    
                    <div id="equipmentGrid" class="featured-grid">
                        <!-- Items injected here -->
                    </div>
                </div>
            </div>
        </div>

        <style>
            .equipment-layout {
                display: grid;
                grid-template-columns: 280px 1fr;
                gap: 32px;
                align-items: start;
            }
            .filters-sidebar {
                padding: 24px;
                position: sticky;
                top: calc(var(--nav-height) + 20px);
            }
            #equipmentGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 20px;
            }
            @media (max-width: 900px) {
                .equipment-layout { grid-template-columns: 1fr; }
                .filters-sidebar { position: static; }
            }
        </style>

    `;

    // Fetch and render function
    const fetchAndRender = async () => {
        const grid = document.getElementById('equipmentGrid');
        const count = document.getElementById('resultsCount');
        grid.innerHTML = `
            <div class="eq-card" style="pointer-events:none;">
                <div class="eq-card-img skeleton"></div>
                <div class="eq-card-body">
                    <div class="skeleton" style="height:11px;width:55%;margin-bottom:10px"></div>
                    <div class="skeleton" style="height:18px;width:80%;margin-bottom:10px"></div>
                    <div class="skeleton" style="height:22px;width:35%;margin-bottom:16px"></div>
                </div>
            </div>`.repeat(6);

        
        try {
            // Get filter values
            const search = document.getElementById('searchInput').value;
            const category = document.getElementById('categoryFilter').value;
            const brand = document.getElementById('brandFilter').value;
            const condition = document.getElementById('conditionFilter').value;
            const sort = document.getElementById('sortSelect').value;

            // Build query string
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            if (brand) params.append('brand', brand);
            if (condition) params.append('condition', condition);

            const res = await fetch(SITE.api(`/equipment?${params.toString()}`));
            let items = await res.json();

            // Client-side sort for demo purposes
            if (sort === 'price-low') items.sort((a,b) => a.price - b.price);
            if (sort === 'price-high') items.sort((a,b) => b.price - a.price);

            count.innerHTML = `<strong>${items.length}</strong> items found`;

            if (items.length === 0) {
                grid.innerHTML = `
                    <div class="glass-card" style="grid-column: 1/-1; padding: 60px; text-align: center;">
                        <h3 style="margin-bottom: 15px;">No equipment found</h3>
                        <p style="color: var(--text-muted); margin-bottom: 20px;">Try adjusting your filters to find what you're looking for.</p>
                        <button class="btn btn-outline" onclick="document.getElementById('resetFiltersBtn').click()">Clear Filters</button>
                    </div>
                `;
                return;
            }

            grid.innerHTML = items.map((item, index) => `
                <a href="#/equipment/${item.id}" class="eq-card" style="animation-delay: ${(index % 6) * 0.08}s; animation: fadeInUp 0.5s ease-out forwards; opacity:0;">
                    <div class="eq-card-img" style="background-image: url('${item.image || ''}'); background-size: cover; background-position: center;">
                        ${!item.image ? `<span>🚜</span>` : ''}
                        <div style="position:absolute;top:10px;left:10px;">
                            <span class="badge badge-red">${item.brand}</span>
                        </div>
                        <div style="position:absolute;top:10px;right:10px;">
                            <span class="badge ${item.condition === 'New' ? 'badge-green' : 'badge-gray'}">${item.condition}</span>
                        </div>
                    </div>
                    <div class="eq-card-body">
                        <div class="eq-card-brand">${item.year ? item.year + ' · ' : ''}${item.hours ? item.hours.toLocaleString() + ' hrs' : (item.hp ? item.hp + ' HP' : item.condition)}</div>
                        <div class="eq-card-model">${item.title}</div>
                        <div class="eq-card-price">${item.price ? '$' + item.price.toLocaleString() : 'Call for Price'}</div>
                        <div class="eq-card-footer">
                            <span>${item.subcategory || item.category || ''}</span>
                            <span style="color:var(--case-red);font-weight:600;font-size:0.85rem;">Details →</span>
                        </div>
                    </div>
                </a>
            `).join('');


        } catch (e) {
            console.error(e);
            grid.innerHTML = '<div style="color: red; grid-column: 1/-1;">Error loading equipment. Please try again.</div>';
        }
    };

    // Seed the filters from the hash query so links like
    // "#/equipment?brand=Kubota" or "#/equipment?category=Tractors" land pre-filtered.
    const seedFromUrl = () => {
        const q = window.location.hash.split('?')[1];
        if (!q) return;
        const params = new URLSearchParams(q);
        const set = (id, key) => {
            const v = params.get(key);
            if (!v) return;
            const el = document.getElementById(id);
            const match = [...el.options].find(o => o.value.toLowerCase() === v.toLowerCase());
            if (match) el.value = match.value;
        };
        set('categoryFilter', 'category');
        set('brandFilter', 'brand');
        set('conditionFilter', 'condition');
        const search = params.get('search');
        if (search) document.getElementById('searchInput').value = search;
    };
    seedFromUrl();

    // Bind events
    document.getElementById('applyFiltersBtn').addEventListener('click', fetchAndRender);
    document.getElementById('sortSelect').addEventListener('change', fetchAndRender);
    document.getElementById('categoryFilter').addEventListener('change', fetchAndRender);
    document.getElementById('brandFilter').addEventListener('change', fetchAndRender);
    document.getElementById('conditionFilter').addEventListener('change', fetchAndRender);

    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('brandFilter').value = '';
        document.getElementById('conditionFilter').value = '';
        fetchAndRender();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') fetchAndRender();
    })

    // Initial load
    fetchAndRender();
};
