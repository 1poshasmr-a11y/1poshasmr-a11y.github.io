// Per-site configuration.
//
// Both Roeder storefronts render from the same component set in /shared/pages.
// Everything that differs between them — copy, contact details, inventory
// endpoints, filter vocabulary — lives here, so the UI and UX stay identical
// by construction rather than by convention.

const cfg = window.__SITE__;

if (!cfg) {
    throw new Error('window.__SITE__ must be defined before loading shared modules.');
}

export const SITE = {
    ...cfg,

    // Build an endpoint URL for this site: SITE.api('/equipment') -> '/api/power/equipment'
    api(path) {
        return cfg.apiBase + path;
    },

    // Digits only, for tel: hrefs
    telHref(number) {
        return 'tel:' + String(number).replace(/[^\d]/g, '');
    },
};

export default SITE;
