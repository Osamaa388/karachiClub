# Karachi Club

This repository contains the static marketing website for Karachi Club GYM in Nazimabad, Karachi.

## Project structure

- `index.html` — landing page
- `about-us.html`, `services.html`, `gallery.html`, `contact.html` — static content pages
- `css/` — shared stylesheets
- `js/` — site scripts and third-party libraries
- `img/` and `fonts/` — static assets

## Run locally

From the project root:

```bash
python -m http.server 3000
```

Then open `http://127.0.0.1:3000`.

## Deploy to Vercel

This project is a static site and can be deployed directly from the repository root on Vercel with no additional build step.
