export const renderEquipmentDetail = async (root, id) => {
    root.innerHTML = `<div class="container section"><div style="text-align:center; padding: 40px;">Loading details...</div></div>`;

    try {
        const res = await fetch(`/api/equipment/${id}`);
        if (!res.ok) {
            if(res.status === 404) {
                root.innerHTML = `<div class="container section"><h1>Equipment Not Found</h1><a href="#/equipment" class="btn btn-primary" style="margin-top:20px;">Back to Inventory</a></div>`;
                return;
            }
            throw new Error('Network error');
        }
        
        const item = await res.json();

        root.innerHTML = `
            <div class="container section">
                <!-- Breadcrumbs -->
                <div style="margin-bottom: 20px; font-size: 0.9rem; color: var(--text-muted);">
                    <a href="#/equipment" style="color: white;">Equipment</a> / 
                    ${item.category} / 
                    <span style="color: var(--harvest-gold);">${item.title}</span>
                </div>

                <div class="detail-layout">
                    <!-- Left Col: Images & Desc -->
                    <div class="detail-main">
                    <div class="glass-card" style="height: 480px; display:flex; align-items:center; justify-content:center; background: ${item.image ? `url('${item.image}') center/cover` : 'var(--dark-surface-2)'}; margin-bottom: 24px; border-radius: var(--border-radius); position:relative; overflow:hidden;">
                        ${!item.image ? `
                        <div style="text-align:center; color: var(--text-dim);">
                            <div style="font-size: 4rem; margin-bottom: 12px;">🚜</div>
                            <div style="font-size: 0.9rem;">${item.brand} ${item.model || ''}</div>
                        </div>` : ''}
                        <div style="position:absolute;top:16px;right:16px;">
                            <span class="badge ${item.condition === 'New' ? 'badge-green' : 'badge-gray'}" style="font-size:0.85rem;padding:6px 14px;">${item.condition}</span>
                        </div>
                    </div>

                        
                        <div class="glass-card" style="padding: 28px;">
                            <h2 style="margin-bottom: 16px; font-size: 1.3rem;">Description</h2>
                            <p style="color: var(--text-muted); line-height: 1.8; font-size: 0.95rem;">${item.description}</p>
                            
                            <h3 style="margin: 28px 0 14px; font-size: 1.1rem;">Key Features</h3>
                            <ul style="color: var(--text-muted); line-height: 2; padding-left: 20px; font-size: 0.9rem;">
                                ${item.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>

                    </div>

                    <!-- Right Col: Price & Action -->
                    <div class="detail-sidebar">
                        <div class="glass-card" style="padding: 30px; position: sticky; top: calc(var(--nav-height) + 20px);">
                            <h1 style="font-size: 2rem; margin-bottom: 10px; line-height: 1.2;">${item.title}</h1>
                            
                            <div style="font-size: 2.5rem; font-weight: 800; color: var(--harvest-gold); margin: 20px 0; border-bottom: 1px solid var(--glass-border); padding-bottom: 20px;">
                                ${item.price ? '$' + item.price.toLocaleString() : 'Call for Price'}
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; font-size: 0.95rem;">
                                <div>
                                    <div style="color: var(--text-muted); margin-bottom: 5px;">Condition</div>
                                    <div style="font-weight: 600;">${item.condition}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); margin-bottom: 5px;">Brand</div>
                                    <div style="font-weight: 600;">${item.brand}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); margin-bottom: 5px;">Year</div>
                                    <div style="font-weight: 600;">${item.year}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); margin-bottom: 5px;">Hours</div>
                                    <div style="font-weight: 600;">${item.hours || 'N/A'}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); margin-bottom: 5px;">Stock #</div>
                                    <div style="font-weight: 600;">${item.stockNumber}</div>
                                </div>
                            </div>

                            <a href="#/quote?type=new_quote&brand=${encodeURIComponent(item.brand)}&model=${encodeURIComponent(item.model || '')}&year=${item.year || ''}" class="btn btn-primary" style="display: block; width: 100%; padding: 15px; font-size: 1.1rem; margin-bottom: 15px; text-align: center; text-decoration: none;">Get a Quote</a>
                            <a href="#/quote?type=trade_in&brand=${encodeURIComponent(item.brand)}&model=${encodeURIComponent(item.model || '')}&year=${item.year || ''}" class="btn btn-outline" style="display: block; width: 100%; padding: 15px; text-align: center; text-decoration: none;">Value Your Trade</a>
                            
                            <div style="margin-top: 30px; padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--border-radius-sm); text-align:center; font-size: 0.9rem; color: var(--text-muted);">
                                Have questions? Call Sales at<br>
                                <a href="tel:563-557-1184" style="color: white; font-weight: 700; font-size: 1.15rem; display: inline-block; margin-top: 6px;">563-557-1184</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <style>
                .detail-layout {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 40px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .detail-layout { grid-template-columns: 1fr; }
                    .detail-sidebar .glass-card { position: static; }
                }
            </style>
        `;
    } catch (e) {
        console.error(e);
        root.innerHTML = `<div class="container section"><h1>Error loading details.</h1></div>`;
    }
};
