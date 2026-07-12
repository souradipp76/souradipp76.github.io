# souradipp76.github.io

Static portfolio site deployed with GitHub Pages.

## Updating content

- Update the portfolio copy and project cards in `index.html`.
- Update the curated GitHub projects in `assets/js/portfolio-data.js`. The site uses only public GitHub API data and safely falls back to the authored project descriptions if it is unavailable.
- Keep new images optimized, give meaningful images descriptive `alt` text, and use `loading="lazy"` for below-the-fold media.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open `http://localhost:8000`.

No backend, API key, or analytics service is required.
