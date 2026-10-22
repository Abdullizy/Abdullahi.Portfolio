# Abdullahi, portfolio (abd-port)

White, editorial-minimal portfolio with one emerald accent.
Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui components · Framer Motion.

## Run it on your PC

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. (npm works too: `npm install` then `npm run dev`.)

To test the production version: `pnpm build` then `pnpm start`.

## Change the content

Open **`lib/data.ts`**. All text lives there: your name, email, WhatsApp number,
hero text, services, process, about, testimonial and the projects.
Anything in `[BRACKETS]` is a placeholder to replace.

### Add or edit a project

Each item in the `projects` list becomes a card in the sideways Projects section
and its own page at `/work/<slug>`. Copy one entry, change the text, done.

1. Put the screenshot in the `public/projects/` folder (create it), for example `public/projects/shop.png`.
2. Set `image: '/projects/shop.png'` and add more screenshots to `gallery`.
3. Set `liveUrl` to show the "Visit live site" button.

With `image` empty, a clean sketch is shown instead.

### Your photo

Put `me.jpg` in `public/` and set `photo: '/me.jpg'` in the `about` block.

### Contact form

1. Make a free form at https://formspree.io.
2. Paste its URL into `formEndpoint` in `lib/data.ts`.

Until then the form opens the visitor's email app with the message filled in.

## How the Projects scroll works

On screens 1024px wide and up, the Projects section pins in place and normal
vertical scrolling slides the cards sideways. After the last card it releases
and the page scrolls down again. The code is in `components/site/work.tsx`.
On phones and tablets it is a normal swipe row, so the page scroll is never blocked.

## The 3D house

The house is a real 3D model, `public/models/house.glb` (CC0, public domain), drawn with three.js
in `components/site/model-house.tsx`. It starts in the hero (`data-house-start`), breaks apart and
rebuilds itself as you scroll, and lands whole in the Contact section (`data-house-end`).

- **Swap the model:** replace `public/models/house.glb` with another `.glb`. Models made of separate parts scatter best.
- **Colours:** by default it is repainted white and emerald. Set `ORIGINAL_COLORS = true` in `model-house.tsx` to keep the model's own colours, or edit the `PALETTE` list.
- If a visitor's browser cannot show WebGL, a simple CSS house (`house.tsx`) is shown instead.

## Deploy

Push the folder to GitHub, then import the repo in Vercel. It detects Next.js
automatically. After deploying, set `site.url` in `lib/data.ts` to your real address.
