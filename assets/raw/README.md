# Original images

Drop full-size originals here. `npm run images` (which also runs before `dev` and
`build`) makes the web sizes. Never reference these files from the site directly.

| Folder | Naming | Used for |
| --- | --- | --- |
| `blends/<slug>/` | `pouch.jpg`, `leaf.jpg`, `cup.jpg`, `lifestyle.jpg` | Product photos. `<slug>` matches `slug` in `data/products.json` |
| `label-art/` | `<slug>.png` | Scanned label art. Shown on a label-colored card until photos exist |
| `site/` | anything, e.g. `home-hero.jpg` | Hero, About, Journal images. Reference as `site/home-hero` |

Shoot product photos at 4:5 (portrait). Keep originals at least 1600 px wide.
PNG with transparency works for label art.
