# Xingzhi Qian — Academic Website

Personal academic website for Xingzhi Qian, a doctoral researcher at University College London connecting efficient, self-improving LLM agents with trustworthy reasoning for software and security.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Run `npm run build` to create the Sites/Cloudflare production build.
Run `npm run build:github` to create the static GitHub Pages build in `out/`.

## GitHub Pages

The repository is configured to publish automatically from the `main` branch.
Use the repository name `Felixqxz.github.io`, then select **GitHub Actions** under
**Settings → Pages → Build and deployment**. Every push to `main` rebuilds and
publishes the site at <https://felixqxz.github.io>.

## Content

The single-page site is implemented in `app/page.tsx`, with its visual system in `app/globals.css`. Publication records and profile links are kept near the top of the page component for straightforward updates.
