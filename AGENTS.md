# AOI Archive contributor guide

## Purpose and stack

AOI Archive is a private platform for fiction writing, reading, and interconnected storytelling. Build with React, TypeScript, Vite, and Tailwind CSS. Keep the code modular, maintainable, and ready to expand.

## Product and responsive design

- Prioritize a capable desktop writing and organization experience.
- Prioritize an immersive, accessible mobile reading experience; basic editing may remain available on mobile.
- Use a polished editorial visual language: warm neutrals, generous typography, and purposeful white space.
- Implement and test layouts across desktop and mobile breakpoints.

## Services and dependencies

- Use only free, open-source dependencies and services.
- Firebase may be configured only with explicit approval. Client Firebase configuration belongs in local `.env` files and is never committed; service-account JSON, private keys, tokens, Firebase Storage, Cloud Functions, and Blaze-only features are out of scope.
- Do not deploy the site without explicit approval.
- Do not add paid services.
- Do not establish real AOI story content as canon; use clearly fictional placeholder content.
- Treat the Firestore rules file as the security boundary: it must deny access by default and allow only the configured owner UID. Test rules with Firebase emulators before use with real archive content.

## Builds, releases, and Git

- Builds are sequential and permanent: `Build 001`, `Build 002`, and so on. Never reset or reuse a build number.
- Increment once for each release-ready build, never for temporary commits.
- Versions use the display format `Build NNN · Vx.y.z`. Store the build number, version, milestone, and release date together in centralized release metadata, which the application displays. Never derive it from a GitHub commit at runtime.
- Milestones are `V0.1.x` Application Foundation, `V0.2.x` Private Writing Workspace, `V0.3.x` Interconnected AOI Archive, and `V1.0.x` Full Storytelling Platform. Increment the patch number for release-ready changes within a milestone; advance milestones only with explicit approval.
- Release commits must use: `Build NNN: <release summary>`.
- Test the relevant application behavior and production build before committing.

## Release process

1. Update the centralized release metadata for the new build number, version, milestone, and date.
2. Verify the build and version display is visible in desktop and mobile layouts and discreet on reader pages.
3. Install dependencies as needed and run `npm run build`; resolve errors.
4. Review the changed files and commit once with the required `Build NNN:` message.
5. Do not push or deploy until explicit approval is received.
