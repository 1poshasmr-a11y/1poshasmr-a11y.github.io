// Shared SPA shell: routing, navbar behaviour, mobile menu.
// Both storefronts boot from this, so navigation behaves identically on each.

import { renderLandingPage } from './pages/landing.js';
import { renderEquipmentBrowser } from './pages/equipment.js';
import { renderEquipmentDetail } from './pages/equipment-detail.js';
import { renderAlertsPage } from './pages/alerts.js';
import { renderServicePage } from './pages/service.js';
import { renderQuotePage } from './pages/quote.js';
import { renderPartsPage } from './pages/parts.js';
import { renderCompanyPage } from './pages/company.js';
import { renderOnlinePartsPage } from './pages/online-parts.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderDashboardAnalytics } from './pages/dashboard-analytics.js';
import { renderDashboardInventory } from './pages/dashboard-inventory.js';
import { renderDashboardLeads } from './pages/dashboard-leads.js';
import { renderDashboardService } from './pages/dashboard-service.js';
import { renderDashboardParts } from './pages/dashboard-parts.js';
import { renderDashboardPartsRequests } from './pages/dashboard-parts-requests.js';
import { renderDashboardJobs } from './pages/dashboard-jobs.js';
import { renderCareersPage } from './pages/careers.js';
import { renderLoginPage } from './pages/login.js';
import { renderPortalPage } from './pages/portal.js';
import { installStaticApi } from './static-api.js';
import { SITE } from './site.js';

const routes = {
    '#/': renderLandingPage,
    '#/equipment': renderEquipmentBrowser,
    '#/alerts': renderAlertsPage,
    '#/service': renderServicePage,
    '#/quote': renderQuotePage,
    '#/parts': renderPartsPage,
    '#/company': renderCompanyPage,
    '#/online-parts': renderOnlinePartsPage,
    '#/careers': renderCareersPage,
    '#/login': renderLoginPage,
    '#/portal': renderPortalPage,
    '#/dashboard': renderDashboardPage,
    '#/dashboard/inventory': renderDashboardInventory,
    '#/dashboard/leads': renderDashboardLeads,
    '#/dashboard/service': renderDashboardService,
    '#/dashboard/analytics': renderDashboardAnalytics,
    '#/dashboard/parts': renderDashboardParts,
    '#/dashboard/parts-requests': renderDashboardPartsRequests,
    '#/dashboard/jobs': renderDashboardJobs,
};

const router = () => {
    const root = document.getElementById('app-root');
    const fullHash = window.location.hash || '#/';
    const hash = fullHash.split('?')[0]; // Strip query parameters for routing

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.split('?')[0] === hash && hash !== '#/') {
            link.classList.add('active');
        } else if (href === '#/' && hash === '#/') {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);

    if (hash.startsWith('#/equipment/')) {
        renderEquipmentDetail(root, hash.split('/')[2]);
        return;
    }

    const render = routes[hash];
    if (render) {
        render(root);
    } else {
        root.innerHTML = `
            <div class="container section" style="text-align: center; padding: 120px 24px;">
                <h1 style="font-size: 3rem; margin-bottom: 16px;">Page not found</h1>
                <p style="color: var(--text-muted); margin-bottom: 32px;">We couldn't find that page. It may have moved.</p>
                <a href="#/" class="btn btn-primary">Back to Home</a>
            </div>`;
    }
};

const setupNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
};

const setupMobileMenu = () => {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    const closedIcon = btn.dataset.icon || '🚜';

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
        btn.textContent = links.classList.contains('open') ? '✕' : closedIcon;
    });

    // Dropdowns open on tap rather than hover once we're on a phone
    document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toggle.parentElement.classList.toggle('open');
            }
        });
    });

    links.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            btn.textContent = closedIcon;
            document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        });
    });
};

export const bootSite = () => {
    window.addEventListener('hashchange', router);

    const start = async () => {
        // Falls back to the JSON in /data when no Express API is reachable,
        // so the same build runs locally and on a static host.
        await installStaticApi(SITE);
        setupNavbar();
        setupMobileMenu();
        router();
    };

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
};

export { observeElements } from './observe.js';
