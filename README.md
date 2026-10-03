# RepDB Example — React Native (Expo)

A small Expo Router starter that browses the current fully illustrated
[RepDB free-tier dataset](https://exercise-dataset.com/).

## Features

- Single-screen list of exercises (FlatList) with thumbnail + tags
- Detail screen with flat **start ↔ peak** frames that cross-fade (or a single
  static pose for static holds and stretches), instructions, MET, and
  muscle / equipment icons with localized labels
- Paid-tier preview gallery on the home screen: a **looping animation** (via
  `expo-image`) — the exact clip shown on [repdb.co](https://repdb.co/?utm_source=github-react-native), marked
  "Standard tier preview"
- EN / DE / ES locale switch (translates the exercise data — UI strings are EN)
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
assets/exercises.json          # the public flat-edition bundle (609 exercises, EN/DE/ES), imported as a module
assets/images/flat/*.webp      # flat WebP (start/peak pairs + single-pose "main")
assets/images/muscles/*.webp   # 27 muscle icons
assets/images/equipment/*.webp # 61 equipment icons
assets/images/samples/*.webp   # 1 paid-tier looping animation (Standard-tier preview)
lib/images.ts                  # auto-generated require() map (commit it!)
LICENSE-free.md                # RepDB Free Tier License for the bundle data & images
LICENSE                        # MIT for the example code
```

### Why the require() map?

React Native's Metro bundler resolves `require()` of static assets at build
time. Dynamic paths like `require('./assets/' + name)` won't work. We generate
`lib/images.ts` once with one explicit `require()` per bundled file, so
`getImage(slug, variant)` returns a usable module ID at runtime.

The paid-tier preview gallery is **derived** from the animation files in
`assets/images/samples/` (see `SAMPLE_SLUGS` in `lib/images.ts`) — no hardcoded
list. Re-run `npm run gen-images` after syncing the bundle to refresh the map.

## Data & license

This demo uses the RepDB **free tier**: every fully illustrated exercise in
the current catalog with flat-style images, under the
[RepDB Free Tier License](LICENSE-free.md).

**Attribution required.** Keep a visible link — "Exercise data by RepDB
(repdb.co)" — in your app's about/credits screen, README, or footer.

**No generative-AI derivation.** The images may not be used as input, reference,
or conditioning material for generative models (image-to-image, style transfer,
fine-tuning, or similar). See term 5 of [LICENSE-free.md](LICENSE-free.md).

**No redistribution as a dataset** — in-app use only.

For French content, classic images, transparent backgrounds, animations, a female
character add-on, 1024px assets, and a commercial license without attribution, see
<https://repdb.co/pricing?utm_source=github-react-native>.

> Exercise data & images: RepDB (https://repdb.co)

## Sister demos

- [**exercise-dataset**](https://github.com/RepDB/exercise-dataset) — the raw dataset (JSON + WebP), browsable [live viewer](https://exercise-dataset.com/)
- [repdb-example-nextjs](https://github.com/RepDB/repdb-example-nextjs)
- [repdb-example-flutter](https://github.com/RepDB/repdb-example-flutter)

## License

MIT for the example code (`LICENSE`). Bundle data & images under the
[RepDB Free Tier License](LICENSE-free.md). PRs welcome — accessibility
improvements especially.
