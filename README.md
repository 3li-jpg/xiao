# for Ashwaki

A tiny romantic birthday website. No build step, no framework — just open `index.html`.

## Send it to her

The fastest way is GitHub Pages:

1. Merge this to `master` (or use this branch).
2. On GitHub: **Settings → Pages → Deploy from a branch → `master` / root**.
3. Send her `https://3li-jpg.github.io/xiao/`.

You can also just open `index.html` on your phone and hand it to her.

## Make it hers

Everything personal lives at the top of `app.js`:

```js
const SITE = {
  herName: "Ashwaki",
  fromName: "Ali",
  dateLabel: "September 6th",
  intro: [ ... ],
  letter: `...`,
  reasons: [ ... ],
};
```

That’s it. Soft click-through, an envelope, a letter, a few reasons, then a cake — with hearts throughout, and a heart wherever she taps.
