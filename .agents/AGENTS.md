# Roeder — Project Workspace

## What this is

A working demo platform pitched to two sibling dealerships in Dubuque, Iowa,
owned by the same family and sitting next door to each other:

| | Roeder Implement | Roeder Outdoor Power |
|---|---|---|
| Sells | Farm equipment | Mowers, UTVs, compact tractors |
| Address | 2550 Rockdale Rd | 2580 Rockdale Road |
| Phone | 563-557-1184 / 800-557-1184 | 563-556-2071 / 800-942-4673 |
| Live site | roederimplement.com | roederoutdoorpower.com |
| Demo route | `/` | `/power/` |
| API base | `/api` | `/api/power` |
| Inventory | 258 units | 29 used units |
| Parts | 300 records | 360 records |

Both currently run generic EquipmentLocator.com template sites. Founded 1957
(their own About page is the source; earlier copy saying 1958 was wrong).

## Architecture — both sites share one UI/UX

This is a hard requirement from the user: the two storefronts must look and
behave identically. That is enforced structurally, not by convention.

```
public/
  shared/            ← single source of truth for BOTH sites
    index.css        design system (tokens, components)
    app.js           SPA router + navbar + mobile menu; exports bootSite()
    site.js          reads window.__SITE__, exposes SITE.api() / SITE.telHref()
    observe.js       scroll-reveal helper
    pages/           all 20 page renderers, config-driven
  index.html         Implement shell
  js/site-config.js  Implement config  → window.__SITE__
  js/app.js          calls bootSite()
  power/
    index.html       Outdoor Power shell
    js/site-config.js  Outdoor Power config
    js/app.js        calls bootSite()
    images/          local logo, hero, covers, 29 inventory photos
server/
  index.js           makeApi(prefix) mounted twice
  data/              equipment.json etc. + power-*.json counterparts
```

**When adding a page or component, put it in `public/shared/` and drive the
differences from `site-config.js`.** Do not fork a component per site. If
something truly can't be shared, add a config-driven variant inside the shared
component (see the `wordmark` option in `landing.js`, added because Outdoor
Power's supplied logo is 195px wide with dark text).

## Running it

```
npm start          # http://localhost:3001/  and  http://localhost:3001/power/
```

## Status

- [x] Research, pitch strategy, client-facing email
- [x] Implement demo built — all 8 MVP features scaffolded
- [x] Outdoor Power data migrated (inventory, parts, catalog, departments, company copy)
- [x] Shared UI layer extracted; both sites on identical components
- [x] Both sites verified: 49 routes, 0 console errors, 0 broken images
- [ ] Customer Portal still hardcoded — not wired to any API
- [ ] Dashboard has no auth gate; 7 buttons are `alert()` stubs
- [ ] Push notifications still faked
- [ ] No deploy config; no live URL yet
- [ ] Save/share on equipment not built

See the punch list artifact for the full remaining-work breakdown.

## Known data caveats

- Implement inventory: 136 of 258 items have no price, 254 have no hours.
  Brand strings are unnormalized (Case IH / Case / IH / International).
- Outdoor Power inventory is cleaner: 29/29 priced, 29/29 photographed,
  20/29 with HP. All photos are local — machinefinder.com blocks cross-origin
  image loads (`ERR_BLOCKED_BY_ORB`), so they must be served from our own host.
- Scraper scripts and raw HTML dumps still sit in the project root and should
  move to `scripts/` before this is deployed from a repo.
