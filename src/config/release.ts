export const release = {
  build: 'Build 007',
  version: 'V0.2.3',
  date: 'October 23, 2026',
  milestone: 'Private Writing Workspace',
} as const

export const releaseDisplay = `${release.build} · ${release.version}`
