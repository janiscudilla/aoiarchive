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
- Do not configure or alter Firebase without explicit approval.
- Do not deploy the site without explicit approval.
- Do not add paid services.
- Do not establish real AOI story content as canon; use clearly fictional placeholder content.

## Builds, releases, and Git

- Builds are sequential and permanent: `Build 001`, `Build 002`, and so on. Never reset or reuse a build number.
- Increment once for each release-ready build, never for temporary commits.
- Store each release's build number and release date in centralized release metadata, which the application displays. Never derive it from a GitHub commit at runtime.
- Release commits must use: `Build NNN: <release summary>`.
- Test the relevant application behavior and production build before committing.

## Release process

1. Update the centralized release metadata for the new release number and date.
2. Verify the build number is displayed in desktop and mobile layouts.
3. Install dependencies as needed and run `npm run build`; resolve errors.
4. Review the changed files and commit once with the required `Build NNN:` message.
5. Do not push or deploy until explicit approval is received.
