export const release = {
  build: 'Build 005',
  version: 'V0.2.1',
  date: 'October 22, 2026',
  milestone: 'Private Writing Workspace',
} as const

export const releaseDisplay = `${release.build} · ${release.version}`
