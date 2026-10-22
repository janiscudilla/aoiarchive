# aoiarchive
A private, interactive fiction archive and storytelling platform for All Our Intervals (AOI).

## Local development

```bash
npm install
npm run dev
```

## Firebase setup (required before private writing features work)

The public application is deliberately safe before Firebase is configured: it does not initialize Firebase, offers no sign-in, and loads no archive content. When the six Firebase web-app values are present but the owner UID is absent, Firebase may initialize but sign-in and all archive access remain disabled.

1. Create a Firebase project on the free Spark plan; enable **Google** in Firebase Authentication and create a Cloud Firestore database.
2. Copy `.env.example` to `.env.local` and provide the Firebase web app values plus the exact Firebase Authentication UID that is allowed to own the archive. For GitHub Pages, configure the six `VITE_FIREBASE_*` web-app values as repository variables and configure `VITE_AOI_OWNER_UID` separately before enabling private access.
3. Add your local and deployed URLs to Firebase Authentication's authorized domains.
4. In `firestore.rules`, replace `REPLACE_WITH_OWNER_UID` with that same UID, then deploy rules using the Firebase CLI: `npx firebase-tools deploy --only firestore:rules`.
5. Restart the Vite development server after modifying `.env.local`.

Firebase web configuration values are not server secrets, but `.env.local` is ignored and must not contain service-account files, private keys, or tokens.

### Rule testing before real data

Use the free Firebase Local Emulator Suite before creating real archive content:

```bash
npx firebase-tools emulators:start --only auth,firestore
```

Confirm these cases against `firestore.rules`: unauthenticated reads/writes are denied; a signed-in non-owner is denied; only the configured owner UID can access `/archives/{ownerUid}/scenes/*`. The committed placeholder owner UID intentionally denies every request until it is replaced and deployed.

## Build 004 scope

Build 004 introduces the Firebase-ready, owner-only Scenes workspace and an initial Tiptap editor shell (paragraphs, headings, bold, italic, and lists). Cross-device persistence works only after the Firebase setup and rules tests above are complete. Media uploads, image editing, advanced blocks, and reading polish remain future V0.2 work.
