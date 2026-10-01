# My Jersey Studio V2

Production-oriented website/application starter based on the supplied My Jersey Studio mockups.

## What works now

### Customer UI
- Premium responsive dark/emerald design system
- Landing page
- Login, registration and guest mode
- Workspace dashboard and slide-out menu
- Role-aware workspace: Studio Owner, Designer, Production Manager, Factory / Client

### Design workflow
- Image upload + drag/drop
- Adjustable flat-background cleanup tolerance
- Browser-based color simplification
- Real SVG approximation output
- Transparent PNG output
- Apply cleaned artwork as a jersey logo
- Live front/back jersey editor
- Base/accent colors
- Pattern presets: slashes, chevrons, waves, none
- Player name and number
- Logo upload and reusable brand assets
- Local AI-style command parser plus optional Cloudflare Workers AI command parser
- Preview Studio
- SVG and high-resolution PNG exports

### Production workflow
- Saved project library
- Jersey template presets
- File converter: PNG, JPG, WEBP, SVG
- Team / Clubs roster
- CSV bulk-personalization import
- Individual front/back SVG generation per roster row
- Production validation center
- Production-sheet PDF
- Factory ZIP generation without an external ZIP library
- Order / export history
- Workspace backup / restore JSON
- Owner admin overview

### Cloudflare backend included
- Pages Functions health endpoint
- D1-backed registration/login/session authentication
- D1 project sync endpoint
- D1 order submission endpoint
- Optional Workers AI design-command endpoint
- `schema.sql` for D1
- `wrangler.toml.example`

### PWA
- Web manifest
- Service worker shell cache

## Local run

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

Without Cloudflare bindings, the application automatically uses local workspace mode. Design, bulk production, exports and ZIP generation still work.

## Cloudflare Pages deployment

1. Create a Cloudflare Pages project from this folder/repository.
2. Create a D1 database.
3. Apply `schema.sql` to the D1 database.
4. Bind the database to Pages Functions using binding name `DB`.
5. Optional: add a Workers AI binding named `AI`.
6. Deploy.

The included auth Functions use PBKDF2-SHA256 password hashing and 30-day server sessions when D1 is connected.

## Important commercial vectorization note

The included in-browser vectorizer is a genuine SVG approximation and is useful for logos, flat artwork and prototyping. Complex photographic jerseys, embroidery, distressed prints, fabric folds and detailed production artwork require a dedicated tracing/image model or professional vectorization service for commercial-grade reconstruction. The current `/api` architecture is ready for that service to be added without rebuilding the front end.
