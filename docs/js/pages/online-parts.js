export const renderOnlinePartsPage = (root) => {
    const urlSplit = window.location.hash.split('?');
    const query = urlSplit.length > 1 ? urlSplit[1] : '';
    const params = new URLSearchParams(query);
    const initialBrand = params.get('brand') || '';
    const initialSearch = params.get('search') || '';

    root.innerHTML = `
        <div class="container section">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Online Parts Catalog</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem;">
                    Browse genuine OEM parts from our full inventory. Search by part number, keyword, or brand.
                </p>
            </div>

            <!-- Search & Filter Bar -->
            <div class="glass-card" style="padding: 24px; margin-bottom: 30px;">
                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
                    <div style="flex: 2; min-width: 250px;">
                        <label class="form-label" style="font-size: 0.85rem;">Search Parts</label>
                        <input type="text" class="form-control" id="partsSearch" 
                            placeholder="Part number, description, or keyword..." 
                            value="${initialSearch}">
                    </div>
                    <div style="flex: 1; min-width: 180px;">
                        <label class="form-label" style="font-size: 0.85rem;">Filter by Brand</label>
                        <select id="partsBrandFilter" class="form-control">
                            <option value="">All Brands</option>
                        </select>
                    </div>
                    <div style="flex: 0 0 auto;">
                        <button class="btn btn-primary" id="partsSearchBtn" style="height: 44px;">
                            🔍 Search
                        </button>
                    </div>
                </div>
                <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span id="partsResultCount" style="color: var(--text-muted); font-size: 0.85rem;"></span>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-ghost" id="prevPageBtn" style="padding: 6px 12px; font-size: 0.85rem;" disabled>← Prev</button>
                        <span id="pageInfo" style="color: var(--text-muted); font-size: 0.85rem; line-height: 32px;"></span>
                        <button class="btn btn-ghost" id="nextPageBtn" style="padding: 6px 12px; font-size: 0.85rem;" disabled>Next →</button>
                    </div>
                </div>
            </div>

            <!-- Quick Brand Buttons -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; justify-content: center;" id="brandQuickLinks">
                <button class="brand-chip active" data-brand="">All Parts</button>
            </div>

            <!-- Parts Grid -->
            <div id="partsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
                <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <div class="loading-spinner"></div>
                    <p style="color: var(--text-muted); margin-top: 15px;">Loading parts catalog...</p>
                </div>
            </div>

            <!-- Bottom Pagination -->
            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 30px;">
                <button class="btn btn-outline" id="prevPageBtnBottom" disabled>← Previous Page</button>
                <span id="pageInfoBottom" style="color: var(--text-muted); line-height: 44px;"></span>
                <button class="btn btn-outline" id="nextPageBtnBottom" disabled>Next Page →</button>
            </div>

            <!-- CTA -->
            <div class="glass-card" style="padding: 40px; text-align: center; margin-top: 40px; background: linear-gradient(135deg, rgba(204,0,0,0.08), rgba(27,77,62,0.08));">
                <h3 style="margin-bottom: 12px;">Can't find what you're looking for?</h3>
                <p style="color: var(--text-muted); margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto;">
                    Our parts department has access to thousands more parts. Submit a request and we'll find it for you — usually within the hour.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <a href="#/parts" class="btn btn-primary">📋 Submit Parts Request</a>
                    <a href="tel:5635571184" class="btn btn-outline">📞 Call Parts Counter</a>
                </div>
            </div>
        </div>
    `;

    // State
    let currentPage = 1;
    let currentBrand = initialBrand;
    let currentSearch = initialSearch;
    let allBrands = [];

    // Brand chip styling
    const style = document.createElement('style');
    style.textContent = `
        .brand-chip {
            padding: 6px 16px;
            border-radius: 20px;
            border: 1px solid var(--glass-border);
            background: rgba(255,255,255,0.03);
            color: var(--text-muted);
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .brand-chip:hover {
            border-color: var(--case-red);
            color: var(--text-primary);
        }
        .brand-chip.active {
            background: var(--case-red);
            border-color: var(--case-red);
            color: white;
            font-weight: 600;
        }
        .part-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: default;
        }
        .part-card:hover {
            border-color: var(--case-red);
            background: rgba(204,0,0,0.03);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .part-number {
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: 0.9rem;
            color: var(--harvest-gold);
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .part-brand-tag {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .part-brand-tag.case { background: rgba(204,0,0,0.15); color: #ff4444; }
        .part-brand-tag.kubota { background: rgba(255,136,0,0.15); color: #ff8800; }
        .part-brand-tag.deere { background: rgba(55,135,50,0.15); color: #55cc44; }
        .part-brand-tag.virnig { background: rgba(100,100,200,0.15); color: #8888dd; }
        .part-brand-tag.other { background: rgba(150,150,150,0.15); color: #999; }
        .part-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--harvest-gold);
        }
        .part-action-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid var(--case-red);
            background: transparent;
            color: var(--case-red);
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .part-action-btn:hover {
            background: var(--case-red);
            color: white;
        }
    `;
    document.head.appendChild(style);

    function getBrandClass(brand) {
        const b = brand.toLowerCase();
        if (b.includes('case')) return 'case';
        if (b.includes('kubota')) return 'kubota';
        if (b.includes('deere') || b.includes('john')) return 'deere';
        if (b.includes('virnig')) return 'virnig';
        return 'other';
    }

    function formatBrandName(brand) {
        // Shorten long brand names
        const map = {
            'CASE CORPORATION': 'Case IH',
            'CASE IH': 'Case IH',
            'KUBOTA ENGINE': 'Kubota',
            'KUBOTA TRACTOR': 'Kubota',
            'JOHN DEERE': 'John Deere',
            'YANMAR CE NA -ASV *ACH': 'ASV / Yanmar',
            'VIRNIG MANUFACTURING': 'Virnig',
            'YETTER MANUFACTURING CO': 'Yetter',
            'ANDERSON GROUP': 'Anderson',
        };
        return map[brand] || brand.split(' ').slice(0, 2).join(' ');
    }

    async function loadParts() {
        const grid = document.getElementById('partsGrid');
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <div class="loading-spinner"></div>
                <p style="color: var(--text-muted); margin-top: 15px;">Searching parts...</p>
            </div>
        `;

        try {
            const params = new URLSearchParams();
            if (currentBrand) params.set('brand', currentBrand);
            if (currentSearch) params.set('search', currentSearch);
            params.set('page', currentPage);
            params.set('limit', 30);

            const res = await fetch(`/api/parts?${params}`);
            const data = await res.json();

            // Update brand filter
            if (allBrands.length === 0 && data.brands) {
                allBrands = data.brands;
                const select = document.getElementById('partsBrandFilter');
                data.brands.forEach(b => {
                    const opt = document.createElement('option');
                    opt.value = b;
                    opt.textContent = formatBrandName(b);
                    if (b === currentBrand) opt.selected = true;
                    select.appendChild(opt);
                });

                // Build quick brand chips for top brands
                const topBrands = data.brands.filter(b => 
                    b.includes('CASE') || b.includes('KUBOTA') || b.includes('DEERE') || 
                    b.includes('VIRNIG') || b.includes('YETTER') || b.includes('ANDERSON') ||
                    b.includes('YANMAR')
                ).slice(0, 6);
                
                const chipsContainer = document.getElementById('brandQuickLinks');
                topBrands.forEach(b => {
                    const chip = document.createElement('button');
                    chip.className = 'brand-chip' + (b === currentBrand ? ' active' : '');
                    chip.dataset.brand = b;
                    chip.textContent = formatBrandName(b);
                    chipsContainer.appendChild(chip);
                });
            }

            // Result count
            document.getElementById('partsResultCount').textContent = 
                `${data.total.toLocaleString()} parts found${currentBrand ? ' for ' + formatBrandName(currentBrand) : ''}${currentSearch ? ' matching "' + currentSearch + '"' : ''}`;

            // Pagination
            const updatePagination = (prevBtn, nextBtn, info) => {
                prevBtn.disabled = data.page <= 1;
                nextBtn.disabled = data.page >= data.totalPages;
                info.textContent = `Page ${data.page} of ${data.totalPages}`;
            };
            updatePagination(
                document.getElementById('prevPageBtn'),
                document.getElementById('nextPageBtn'),
                document.getElementById('pageInfo')
            );
            updatePagination(
                document.getElementById('prevPageBtnBottom'),
                document.getElementById('nextPageBtnBottom'),
                document.getElementById('pageInfoBottom')
            );

            // Render parts
            if (data.parts.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🔍</div>
                        <h3>No parts found</h3>
                        <p style="color: var(--text-muted);">Try a different search term or brand filter.</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = data.parts.map((part, i) => `
                <div class="part-card" style="animation: fadeInUp 0.4s ease-out ${i * 0.03}s forwards; opacity: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <span class="part-brand-tag ${getBrandClass(part.brand)}">${formatBrandName(part.brand)}</span>
                        <span class="part-number">#${part.partNumber}</span>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="font-size: 1rem; margin-bottom: 4px; line-height: 1.3;">${part.description}</h4>
                        ${part.category ? `<span style="color: var(--text-muted); font-size: 0.8rem;">${part.category}</span>` : ''}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 12px;">
                        <span class="part-price">${part.price ? '$' + part.price.toFixed(2) : 'Call for Price'}</span>
                        <button class="part-action-btn" onclick="window.location.hash='#/parts'">Request Part</button>
                    </div>
                </div>
            `).join('');

        } catch(e) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                    <h3>Could not load parts catalog</h3>
                    <p style="color: var(--text-muted);">Please try again or <a href="#/parts" style="color: var(--case-red);">submit a parts request</a> instead.</p>
                </div>
            `;
        }
    }

    // Event Listeners
    document.getElementById('partsSearchBtn').addEventListener('click', () => {
        currentSearch = document.getElementById('partsSearch').value;
        currentPage = 1;
        loadParts();
    });

    document.getElementById('partsSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = e.target.value;
            currentPage = 1;
            loadParts();
        }
    });

    document.getElementById('partsBrandFilter').addEventListener('change', (e) => {
        currentBrand = e.target.value;
        currentPage = 1;
        loadParts();
        // Update chips
        document.querySelectorAll('.brand-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.brand === currentBrand);
        });
    });

    // Brand chip clicks
    document.getElementById('brandQuickLinks').addEventListener('click', (e) => {
        if (e.target.classList.contains('brand-chip')) {
            currentBrand = e.target.dataset.brand;
            currentPage = 1;
            document.getElementById('partsBrandFilter').value = currentBrand;
            document.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            loadParts();
        }
    });

    // Pagination
    const pagePrev = () => { if (currentPage > 1) { currentPage--; loadParts(); window.scrollTo(0, 0); } };
    const pageNext = () => { currentPage++; loadParts(); window.scrollTo(0, 0); };
    
    document.getElementById('prevPageBtn').addEventListener('click', pagePrev);
    document.getElementById('nextPageBtn').addEventListener('click', pageNext);
    document.getElementById('prevPageBtnBottom').addEventListener('click', pagePrev);
    document.getElementById('nextPageBtnBottom').addEventListener('click', pageNext);

    // Initial load
    loadParts();
};
