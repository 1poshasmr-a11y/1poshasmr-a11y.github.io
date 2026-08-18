import { observeElements } from '../app.js';

export const renderLandingPage = async (root) => {
    root.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-bg" style="background-image: url('/images/hero.png');"></div>
            <div class="hero-overlay"></div>
            <div class="container hero-content">
                <p class="hero-eyebrow animate-fade-in">Since 1958 · Dubuque, Iowa</p>
                <img src="https://www.roederimplement.com/assets/Uploads/RI-logo.png" alt="Roeder Implement" class="hero-logo animate-fade-in" style="animation-delay:0.1s">
                <div class="hero-ctas animate-fade-in" style="animation-delay: 0.35s">
                    <a href="#/equipment" class="btn btn-primary btn-lg">Browse Inventory</a>
                    <a href="#/service" class="btn btn-ghost btn-lg">Track Service</a>
                </div>
            </div>
        </section>

        <!-- Stats Bar -->
        <section class="stats-bar-wrap">
            <div class="container">
                <div class="stats-bar glass-card scroll-animate">
                    <div class="stat-item">
                        <div class="stat-number" data-target="65">65+</div>
                        <div class="stat-label">Years Serving Dubuque</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="500">500+</div>
                        <div class="stat-label">Units in Stock</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">24hr</div>
                        <div class="stat-label">Service Response</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">Brand Partners</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Intro -->
        <section class="section container scroll-animate" style="text-align: center; max-width: 800px; padding: 60px 24px;">
            <p style="font-size: 1.25rem; line-height: 1.8; color: var(--text-light); margin-bottom: 24px;">
                Roeder Implement a CASE IH dealer in Dubuque Iowa, selling and servicing new and used tractors, combines and farm equipment. An experienced, knowledgeable staff, competitive prices, first rate service and hard to find parts are what makes Roeder Implement Eastern Iowa's premiere destination for all your farming needs.
            </p>
            <a href="#/company" class="btn btn-outline">Read More About Us</a>
        </section>

        <!-- Departments -->
        <section class="section container">
            <h2 class="section-title scroll-animate">Our Departments</h2>
            <div class="departments-grid">
                <div class="department-card glass-card glass-card-clickable scroll-animate" onclick="window.location.hash='#/equipment'">
                    <div class="dept-icon">🚜</div>
                    <h3>Sales</h3>
                    <p>New and used equipment from top brands to keep your operation running efficiently.</p>
                    <span class="dept-link">Shop Now →</span>
                </div>
                <div class="department-card glass-card glass-card-clickable scroll-animate" style="animation-delay: 0.1s" onclick="window.location.hash='#/service'">
                    <div class="dept-icon">🔧</div>
                    <h3>Service</h3>
                    <p>Factory-trained technicians ready for routine maintenance or emergency repairs.</p>
                    <span class="dept-link">Track Ticket →</span>
                </div>
                <div class="department-card glass-card glass-card-clickable scroll-animate" style="animation-delay: 0.2s" onclick="window.location.hash='#/quote'">
                    <div class="dept-icon">⚙️</div>
                    <h3>Parts</h3>
                    <p>Massive on-hand inventory of OEM parts to minimize your downtime.</p>
                    <span class="dept-link">Request Parts →</span>
                </div>
                <div class="department-card glass-card glass-card-clickable scroll-animate" style="animation-delay: 0.3s" onclick="window.location.hash='#/quote'">
                    <div class="dept-icon">🛰️</div>
                    <h3>AFS Precision</h3>
                    <p>Advanced farming systems and tech support for modern precision agriculture.</p>
                    <span class="dept-link">Get Support →</span>
                </div>
            </div>
        </section>

        <!-- Featured Equipment -->
        <section class="section" style="background: var(--dark-surface);">
            <div class="container">
                <div class="featured-header scroll-animate">
                    <h2 class="section-title" style="text-align: left; margin-bottom: 0;">Featured Equipment</h2>
                    <a href="#/equipment" class="btn btn-outline">View All Inventory</a>
                </div>
                
                <div class="featured-grid" id="featuredEquipmentList">
                    <div class="eq-card"><div class="eq-card-img skeleton" style="height:180px"></div><div class="eq-card-body"><div class="skeleton" style="height:12px;width:60%;margin-bottom:8px"></div><div class="skeleton" style="height:18px;width:80%;margin-bottom:10px"></div><div class="skeleton" style="height:22px;width:40%"></div></div></div>
                    <div class="eq-card"><div class="eq-card-img skeleton" style="height:180px"></div><div class="eq-card-body"><div class="skeleton" style="height:12px;width:60%;margin-bottom:8px"></div><div class="skeleton" style="height:18px;width:80%;margin-bottom:10px"></div><div class="skeleton" style="height:22px;width:40%"></div></div></div>
                    <div class="eq-card"><div class="eq-card-img skeleton" style="height:180px"></div><div class="eq-card-body"><div class="skeleton" style="height:12px;width:60%;margin-bottom:8px"></div><div class="skeleton" style="height:18px;width:80%;margin-bottom:10px"></div><div class="skeleton" style="height:22px;width:40%"></div></div></div>
                </div>
            </div>
        </section>

        <!-- CTA Banner -->
        <section class="section container scroll-animate">
            <div class="cta-banner glass-card" style="padding: 48px; text-align: center;">
                <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 12px;">Ready to find your next machine?</h2>
                <p style="color: var(--text-muted); margin-bottom: 32px; font-size: 1.05rem;">Sign up for equipment alerts and be the first to know when new inventory arrives.</p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="#/alerts" class="btn btn-primary btn-lg">Set Equipment Alert</a>
                    <a href="#/quote" class="btn btn-ghost btn-lg">Request a Quote</a>
                </div>
            </div>
        </section>

        <style>
            /* Hero */
            .hero-section {
                position: relative;
                height: 85vh;
                min-height: 600px;
                display: flex;
                align-items: center;
                margin-top: calc(var(--nav-height) * -1);
                overflow: hidden;
            }
            @keyframes subtleZoom {
                0% { transform: scale(1.0); }
                100% { transform: scale(1.1); }
            }
            .hero-bg {
                position: absolute;
                inset: 0;
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                animation: subtleZoom 30s infinite alternate ease-in-out;
            }
            .hero-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    105deg,
                    rgba(10,10,10,0.92) 0%,
                    rgba(10,10,10,0.65) 55%,
                    rgba(10,10,10,0.25) 100%
                );
            }
            .hero-content {
                position: relative;
                z-index: 2;
                max-width: 900px;
                padding-top: 60px;
                margin: 0 auto;
                text-align: center;
            }
            .hero-eyebrow {
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 2.5px;
                text-transform: uppercase;
                color: var(--harvest-gold);
                margin-bottom: 16px;
            }
            .hero-logo {
                max-width: 900px;
                width: 100%;
                margin: 0 auto 30px auto;
                display: block;
                filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3));
            }
            .hero-subtitle {
                font-size: 1.1rem;
                color: rgba(255,255,255,0.7);
                margin-bottom: 40px;
                max-width: 500px;
                line-height: 1.65;
            }
            .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

            /* Stats */
            .stats-bar-wrap { margin-top: -40px; position: relative; z-index: 10; padding: 0 24px; }
            .stats-bar {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 28px 40px;
                max-width: var(--container-width);
                margin: 0 auto;
            }
            .stat-item { text-align: center; }
            .stat-divider { width: 1px; height: 40px; background: var(--glass-border); }

            /* Departments */
            .departments-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 24px;
            }
            .department-card {
                padding: 28px;
                display: flex;
                flex-direction: column;
                cursor: pointer;
            }
            .dept-icon { font-size: 2rem; margin-bottom: 14px; }
            .department-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 10px; }
            .department-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.65; margin-bottom: 18px; flex-grow: 1; }
            .dept-link { color: var(--case-red); font-size: 0.9rem; font-weight: 600; margin-top: auto; }

            /* Featured */
            .featured-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 32px;
            }
            .featured-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
            }

            /* CTA Banner */
            .cta-banner {
                background: linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(10,10,10,0.9) 100%);
                border-color: rgba(204,0,0,0.2);
                position: relative;
                overflow: hidden;
            }
            .cta-banner::before {
                content: '';
                position: absolute;
                top: -80px; right: -80px;
                width: 300px; height: 300px;
                background: radial-gradient(circle, rgba(204,0,0,0.08) 0%, transparent 70%);
                pointer-events: none;
            }

            @media (max-width: 768px) {
                .hero-title { font-size: 2.4rem; }
                .hero-ctas { flex-direction: column; }
                .stats-bar { flex-wrap: wrap; gap: 20px; padding: 24px; }
                .stat-divider { display: none; }
                .stats-bar-wrap { margin-top: -20px; padding: 0 16px; }
                .featured-header { flex-direction: column; align-items: flex-start; gap: 16px; }
            }
        </style>
    `;

    // Fetch featured equipment
    try {
        const res = await fetch('/api/equipment?limit=3');
        const equipment = await res.json();
        
        const featuredHtml = equipment.slice(0, 3).map((item) => `
            <a href="#/equipment/${item.id}" class="eq-card" style="text-decoration:none;">
                <div class="eq-card-img" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                    ${!item.image ? `<span>🚜 ${item.brand}</span>` : ''}
                    <div style="position:absolute;top:10px;right:10px;">
                        <span class="badge ${item.condition === 'New' ? 'badge-green' : 'badge-gray'}">${item.condition}</span>
                    </div>
                </div>
                <div class="eq-card-body">
                    <div class="eq-card-brand">${item.brand} · ${item.year}</div>
                    <div class="eq-card-model">${item.title || item.model}</div>
                    <div class="eq-card-price">${item.price ? '$' + item.price.toLocaleString() : 'Call for Price'}</div>
                    <div class="eq-card-footer">
                        <span>${item.category || ''}</span>
                        <span>${item.hours ? item.hours + ' hrs' : ''}</span>
                    </div>
                </div>
            </a>
        `).join('');
        
        document.getElementById('featuredEquipmentList').innerHTML = featuredHtml;
    } catch (e) {
        document.getElementById('featuredEquipmentList').innerHTML = `
            <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1/-1;">
                <p style="color: var(--text-muted)">Could not load inventory. <a href="#/equipment" style="color:var(--case-red)">Browse all →</a></p>
            </div>
        `;
    }

    observeElements();
};
