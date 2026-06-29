# RepDB Example — React Native (Expo)

A small Expo Router starter that browses 21 fitness exercises from the
[RepDB](https://repdb.co) preview dataset.

## Features

- Single-screen list of exercises (FlatList) with thumbnail + tags
- Detail screen with a **real looping animated WebP** (via `expo-image`), with a
  start↔peak cross-fade as the fallback for any exercise without an animation
- **Flat ↔ classic** visual-style toggle (white background vs transparent), MET,
  and muscle / equipment icons with localized labels
- EN / DE / ES locale switch (translates exercise data — UI strings are EN)
- Light + dark themes that follow the OS setting
- Builds on iOS, Android, and Web from the same source

## Run

```bash
npm install
npm run gen-images        # only after syncing the bundle
npm start                 # then press i / a / w for iOS / Android / Web
```

Or scan the QR code with **Expo Go** on your phone.

## What's vendored where

```
assets/exercises.json        # the preview bundle, imported as a module
assets/images/flat/*.webp    # 42 webp images (21 exercises × start/peak)
lib/images.ts                # auto-generated require() map (commit it!)
LICENSE-preview.md           # CC-BY-NC for the bundle data
LICENSE                      # MIT for the example code
```

### Why the require() map?

React Native's Metro bundler resolves `require()` of static assets at
build time. Dynamic paths like `require('./assets/' + name)` won't work.
We generate `lib/images.ts` once with one explicit `require()` per file,
so `getImage(slug, variant)` returns a usable module ID at runtime.

Re-run `npm run gen-images` after syncing the bundle to refresh the map.

## Data

This demo uses the RepDB **preview** bundle: 21 hand-picked exercises under
[CC-BY-NC 4.0](LICENSE-preview.md). For commercial use or the full dataset
(400+ exercises with two visual styles, transparent backgrounds, animations,
multilingual translations, alternative & progression relations), see
<https://repdb.co/pricing>.

> Exercise data & images: RepDB (https://repdb.co)

## Sister demos

- [**exercise-dataset**](https://github.com/sergei-argutin/exercise-dataset) — the raw dataset (JSON + classic/flat WebP), browsable [live viewer](https://sergei-argutin.github.io/exercise-dataset/)
- [repdb-example-nextjs](https://github.com/sergei-argutin/repdb-example-nextjs)
- [repdb-example-flutter](https://github.com/sergei-argutin/repdb-example-flutter)

## License

MIT for the example code (`LICENSE`). Bundle data under CC-BY-NC 4.0
(`LICENSE-preview.md`). PRs welcome — accessibility improvements especially.
