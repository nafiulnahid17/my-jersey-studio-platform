# My Jersey Studio V3 — Mockup-faithful build

This version intentionally uses the customer-approved mockup artwork as the visual surface for the primary pages, with real interactive overlays and functional workflows. This makes the deployed application visually match the supplied 1536×864 designs while keeping navigation, login/guest mode, image upload/cleanup, design controls, project saving and exports functional.

Primary routes:
- `#/landing`
- `#/login`
- `#/dashboard`
- `#/menu`
- `#/vector`
- `#/forge`
- `#/customize`
- `#/preview`
- `#/templates`
- `#/projects`
- `#/bulk`
- `#/production`
- `#/architecture`

Cloudflare Pages:
- Build command: leave blank
- Output directory: `.`
- Root directory: `/`
- D1 binding: `DB`
- Workers AI binding: `AI`
