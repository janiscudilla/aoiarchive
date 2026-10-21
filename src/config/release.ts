export const release = {
  build: 'Build 003',
  version: 'V0.1.0',
  date: 'October 22, 2026',
  milestone: 'Application Foundation',
} as const

export const releaseDisplay = `${release.build} · ${release.version}`
