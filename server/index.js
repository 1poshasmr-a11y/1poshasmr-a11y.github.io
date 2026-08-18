import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const PUBLIC = path.join(__dirname, '../docs');
const DATA = path.join(__dirname, 'data');

// --- Data helpers ---
const file = name => path.join(DATA, name + '.json');
const read = (name, fallback = []) => {
    try { return JSON.parse(fs.readFileSync(file(name), 'utf8')); }
    catch { return fallback; }
};
const write = (name, data) => fs.writeFileSync(file(name), JSON.stringify(data, null, 2), 'utf8');

/*
 * Both storefronts run the same API surface over their own data files.
 * `prefix` is what the data files are named; the routes below are mounted
 * twice, once at /api (Roeder Implement) and once at /api/power
 * (Roeder Outdoor Power).
 */
const makeApi = (prefix) => {
    const router = express.Router();
    const n = suffix => (prefix ? `${prefix}-${suffix}` : suffix);

    // 1. Equipment inventory
    router.get('/equipment', (req, res) => {
        let inventory = read(n('equipment'));
        const { category, brand, condition, minPrice, maxPrice, search, limit } = req.query;

        if (category) inventory = inventory.filter(i => (i.category || '').toLowerCase() === category.toLowerCase());
        if (brand) inventory = inventory.filter(i => (i.brand || '').toLowerCase() === brand.toLowerCase());
        if (condition) inventory = inventory.filter(i => (i.condition || '').toLowerCase() === condition.toLowerCase());
        if (minPrice) inventory = inventory.filter(i => i.price >= parseInt(minPrice));
        if (maxPrice) inventory = inventory.filter(i => i.price <= parseInt(maxPrice));

        if (search) {
            const s = search.toLowerCase();
            inventory = inventory.filter(i =>
                (i.title || '').toLowerCase().includes(s) ||
                (i.brand || '').toLowerCase().includes(s) ||
                (i.model || '').toLowerCase().includes(s)
            );
        }

        // Featured strips ask for a handful; lead with priced, photographed units
        // so the first thing a visitor sees is a real listing.
        if (limit) {
            inventory = [...inventory]
                .sort((a, b) => (b.price ? 1 : 0) - (a.price ? 1 : 0))
                .slice(0, parseInt(limit));
        }

        res.json(inventory);
    });

    router.get('/equipment/:id', (req, res) => {
        const item = read(n('equipment')).find(i => i.id === req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    });

    router.delete('/equipment/:id', (req, res) => {
        write(n('equipment'), read(n('equipment')).filter(i => i.id !== req.params.id));
        res.json({ success: true });
    });

    // 2. Equipment alerts
    router.post('/alerts', (req, res) => {
        const alerts = read(n('alerts'));
        alerts.push({ id: Date.now().toString(), ...req.body, date: new Date().toISOString() });
        write(n('alerts'), alerts);
        res.json({ success: true, message: 'Alert saved!' });
    });

    // 3. Service tracker
    router.get('/service', (req, res) => res.json(read(n('service-tickets'))));

    router.get('/service/:id', (req, res) => {
        const ticket = read(n('service-tickets')).find(t =>
            t.id.toLowerCase() === req.params.id.toLowerCase() || t.customerPhone === req.params.id);
        if (!ticket) return res.status(404).json({ error: 'Service ticket not found.' });
        res.json(ticket);
    });

    router.post('/service', (req, res) => {
        const tickets = read(n('service-tickets'));
        const newTicket = { id: 'WO-' + Math.floor(Math.random() * 10000), ...req.body, lastUpdated: new Date().toISOString() };
        tickets.push(newTicket);
        write(n('service-tickets'), tickets);
        res.json(newTicket);
    });

    router.put('/service/:id', (req, res) => {
        const tickets = read(n('service-tickets'));
        const idx = tickets.findIndex(t => t.id === req.params.id);
        if (idx === -1) return res.status(404).json({ error: 'Not found' });
        tickets[idx] = { ...tickets[idx], ...req.body, lastUpdated: new Date().toISOString() };
        write(n('service-tickets'), tickets);
        res.json(tickets[idx]);
    });

    // 4. Quotes / trade-ins
    router.get('/leads', (req, res) => res.json(read(n('leads'))));
    router.post('/quotes', (req, res) => {
        const leads = read(n('leads'));
        leads.push({ id: Date.now().toString(), type: req.body.tradeIn ? 'Trade-In' : 'Quote', ...req.body, date: new Date().toISOString() });
        write(n('leads'), leads);
        res.json({ success: true, message: 'Quote requested!' });
    });

    // 5. Parts requests
    router.get('/parts-requests', (req, res) => res.json(read(n('parts-requests'))));
    router.post('/parts-requests', (req, res) => {
        const requests = read(n('parts-requests'));
        requests.push({ id: Date.now().toString(), ...req.body, date: new Date().toISOString() });
        write(n('parts-requests'), requests);
        res.json({ success: true });
    });

    // 6. Dashboard summary
    router.get('/dashboard', (req, res) => {
        const leads = read(n('leads'));
        const partsReqs = read(n('parts-requests'));
        const open = read(n('service-tickets')).filter(t => {
            const last = (t.timeline || []).slice(-1)[0];
            return !last || last.status !== 'completed';
        });

        res.json({
            kpis: {
                totalLeads: 142 + leads.length,
                websiteVisits: 8430,
                quoteRequests: 38 + leads.length,
                activeServiceTickets: open.length,
            },
            recentActivity: [
                ...leads.slice(-2).map(l => ({ id: 'L' + l.id, type: 'quote', text: `${l.name || l.firstName || 'A customer'} requested a ${l.type}`, time: 'Just now' })),
                ...partsReqs.slice(-2).map(p => ({ id: 'P' + p.id, type: 'parts', text: `${p.name} requested parts for ${p.make} ${p.model}`, time: 'Just now' })),
                ...open.map(t => ({
                    id: 'S' + t.id,
                    type: 'service',
                    text: `${t.id} — ${t.equipment} is ${((t.timeline || []).find(s => s.status === 'active') || {}).title || 'in the shop'}`,
                    time: 'Today',
                })),
            ].slice(0, 8),
        });
    });

    // 7. Parts catalog
    router.get('/parts', (req, res) => {
        const all = read(n('parts'));
        let parts = all;
        const { brand, category, search, page, limit } = req.query;

        if (brand) parts = parts.filter(p => (p.brand || '').toLowerCase().includes(brand.toLowerCase()));
        if (category) parts = parts.filter(p => (p.category || '').toLowerCase().includes(category.toLowerCase()));
        if (search) {
            const s = search.toLowerCase();
            parts = parts.filter(p =>
                (p.partNumber || '').toLowerCase().includes(s) ||
                (p.description || '').toLowerCase().includes(s) ||
                (p.brand || '').toLowerCase().includes(s)
            );
        }

        const brands = [...new Set(all.map(p => p.brand))].sort();
        const pageNum = parseInt(page) || 1;
        const pageLimit = parseInt(limit) || 30;
        const start = (pageNum - 1) * pageLimit;

        res.json({
            parts: parts.slice(start, start + pageLimit),
            total: parts.length,
            page: pageNum,
            totalPages: Math.ceil(parts.length / pageLimit),
            brands,
        });
    });

    router.get('/parts/:id', (req, res) => {
        const part = read(n('parts')).find(p => p.id === req.params.id);
        if (!part) return res.status(404).json({ error: 'Part not found' });
        res.json(part);
    });

    // 8. Job listings
    router.get('/jobs', (req, res) => res.json(read(n('jobs'))));

    router.post('/jobs', (req, res) => {
        const jobs = read(n('jobs'));
        const newJob = { id: Date.now().toString(), ...req.body, datePosted: new Date().toISOString() };
        jobs.push(newJob);
        write(n('jobs'), jobs);
        res.json(newJob);
    });

    router.delete('/jobs/:id', (req, res) => {
        write(n('jobs'), read(n('jobs')).filter(j => j.id !== req.params.id));
        res.json({ success: true });
    });

    // 9. New-equipment catalog (Outdoor Power only; empty elsewhere)
    router.get('/catalog', (req, res) => res.json(read(n('catalog'))));

    return router;
};

// Roeder Outdoor Power must mount first — Express matches in order, and
// /api would otherwise swallow /api/power.
app.use('/api/power', makeApi('power'));
app.use('/api', makeApi(''));

app.use(express.static(PUBLIC));

// SPA fallbacks — each storefront serves its own shell
app.get('/power/*', (req, res) => res.sendFile(path.join(PUBLIC, 'power', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));

app.listen(PORT, () => {
    console.log(`🚀 Roeder demo server running on http://localhost:${PORT}`);
    console.log(`   Roeder Implement      → http://localhost:${PORT}/`);
    console.log(`   Roeder Outdoor Power  → http://localhost:${PORT}/power/`);
});
