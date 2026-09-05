# for Ashwaki

A tiny romantic birthday website. No build step — just open `index.html` on a phone.

## Send it to her

The fastest way is GitHub Pages:

1. Merge this to `master` (or use this branch).
2. On GitHub: **Settings → Pages → Deploy from a branch → `master` / root**.
3. Send her `https://3li-jpg.github.io/xiao/`.

## Her childhood photo

Drop the picture here:

```
photos/ashwaki.jpg
```

It is shown as a heart-shaped paper cutout. A childhood portrait that is fairly close-up works best.

## Names and copy

Everything personal lives at the top of `app.js`:

```js
const SITE = {
  herName: "Ashwaki",
  fromName: "Alawi",
  dateLabel: "September 6th",
  photo: "./photos/ashwaki.jpg",
};
```
