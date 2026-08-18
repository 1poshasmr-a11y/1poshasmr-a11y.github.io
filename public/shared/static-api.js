// Static fallback for hosts that only serve files (GitHub Pages).
//
// The storefronts talk to an Express API in development. When that API is not
// present, this shim answers the same endpoints from the JSON files in /data,
// doing the filtering and pagination the server would normally do. Writes
// report success without persisting, so the forms still complete.

const jsonHeaders = { 'Content-Type': 'application/json' };
const ok = (body) => new Response(JSON.stringify(body), { status: 200, headers: jsonHeaders });
const notFound = () => new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: jsonHeaders });

const cache = new Map();
const load = async (name) => {
    if (!cache.has(name)) {
        const res = await fetch(`/data/${name}.json`);
        cache.set(name, res.ok ? await res.json() : []);
    }
    return cache.get(name);
};

// Resolve an API path to the data-file prefix for that storefront.
const split = (path) => {
    const power = path.startsWith('/api/power/');
    return {
        prefix: power ? 'power-' : '',
        route: path.replace(power ? '/api/power' : '/api', ''),
    };
};

const handle = async (url, method, body) => {
    const { prefix, route } = split(url.pathname);
    const q = url.searchParams;
    const file = (name) => load(prefix + name);

    // Writes: acknowledge, don't persist. A static host has nowhere to put them.
    if (method !== 'GET') {
        if (route === '/jobs' || route.startsWith('/service')) return ok({ success: true, ...body });
        return ok({ success: true, message: 'Received. This demo does not store submissions.' });
    }

    if (route === '/equipment') {
        let items = await file('equipment');
        const eq = (f, v) => items = items.filter(i => (i[f] || '').toLowerCase() === v.toLowerCase());
        if (q.get('category')) eq('category', q.get('category'));
        if (q.get('brand')) eq('brand', q.get('brand'));
        if (q.get('condition')) eq('condition', q.get('condition'));
        if (q.get('minPrice')) items = items.filter(i => i.price >= +q.get('minPrice'));
        if (q.get('maxPrice')) items = items.filter(i => i.price <= +q.get('maxPrice'));
        if (q.get('search')) {
            const s = q.get('search').toLowerCase();
            items = items.filter(i => ['title', 'brand', 'model']
                .some(f => (i[f] || '').toLowerCase().includes(s)));
        }
        if (q.get('limit')) {
            items = [...items].sort((a, b) => (b.price ? 1 : 0) - (a.price ? 1 : 0))
                .slice(0, +q.get('limit'));
        }
        return ok(items);
    }

    if (route.startsWith('/equipment/')) {
        const id = route.split('/')[2];
        const item = (await file('equipment')).find(i => i.id === id);
        return item ? ok(item) : notFound();
    }

    if (route === '/parts') {
        const all = await file('parts');
        let parts = all;
        const like = (f, v) => parts = parts.filter(p => (p[f] || '').toLowerCase().includes(v.toLowerCase()));
        if (q.get('brand')) like('brand', q.get('brand'));
        if (q.get('category')) like('category', q.get('category'));
        if (q.get('search')) {
            const s = q.get('search').toLowerCase();
            parts = parts.filter(p => ['partNumber', 'description', 'brand']
                .some(f => (p[f] || '').toLowerCase().includes(s)));
        }
        const page = +q.get('page') || 1;
        const limit = +q.get('limit') || 30;
        const start = (page - 1) * limit;
        return ok({
            parts: parts.slice(start, start + limit),
            total: parts.length,
            page,
            totalPages: Math.ceil(parts.length / limit),
            brands: [...new Set(all.map(p => p.brand))].sort(),
        });
    }

    if (route === '/service') return ok(await file('service-tickets'));

    if (route.startsWith('/service/')) {
        const key = route.split('/')[2].toLowerCase();
        const t = (await file('service-tickets'))
            .find(t => t.id.toLowerCase() === key || t.customerPhone === key);
        return t ? ok(t) : notFound();
    }

    if (route === '/dashboard') {
        const leads = await file('leads');
        const open = (await file('service-tickets')).filter(t => {
            const last = (t.timeline || []).slice(-1)[0];
            return !last || last.status !== 'completed';
        });
        return ok({
            kpis: {
                totalLeads: 142 + leads.length,
                websiteVisits: 8430,
                quoteRequests: 38 + leads.length,
                activeServiceTickets: open.length,
            },
            recentActivity: open.map(t => ({
                id: 'S' + t.id,
                type: 'service',
                text: `${t.id} — ${t.equipment} is ${((t.timeline || []).find(s => s.status === 'active') || {}).title || 'in the shop'}`,
                time: 'Today',
            })),
        });
    }

    for (const [r, name] of [['/jobs', 'jobs'], ['/leads', 'leads'],
                             ['/parts-requests', 'parts-requests'],
                             ['/alerts', 'alerts'], ['/catalog', 'catalog']]) {
        if (route === r) return ok(await file(name));
    }

    return notFound();
};

// Hosts we know serve files only. Checking the hostname first means the common
// cases resolve silently, with no failed request in the console.
const KNOWN_STATIC = [/\.github\.io$/, /\.pages\.dev$/, /\.netlify\.app$/];

const isStaticHost = () =>
    window.__STATIC__ === true ||
    window.location.protocol === 'file:' ||
    KNOWN_STATIC.some(re => re.test(window.location.hostname));

export const installStaticApi = async (SITE) => {
    if (!isStaticHost()) {
        // Unknown host: ask the API directly. JSON back means Express is running.
        try {
            const res = await fetch(SITE.apiBase + '/equipment?limit=1');
            if (res.ok && (res.headers.get('content-type') || '').includes('json')) return false;
        } catch { /* no server — fall through to static */ }
    }

    const real = window.fetch.bind(window);
    window.fetch = (input, init = {}) => {
        const raw = typeof input === 'string' ? input : input.url;
        const url = new URL(raw, window.location.origin);
        if (!url.pathname.startsWith('/api/')) return real(input, init);
        let body = null;
        try { body = init.body ? JSON.parse(init.body) : null; } catch { /* not json */ }
        return handle(url, (init.method || 'GET').toUpperCase(), body);
    };
    console.info('Static demo mode — data served from /data, submissions are not stored.');
    return true;
};
