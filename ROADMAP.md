# AOI Archive roadmap

## Release identity

Every release has a permanent sequential build number and a semantic version, displayed as `Build NNN · Vx.y.z`. Application release metadata is centralized in `src/config/release.ts` and bundled into the deployed site; it is never derived from the latest GitHub commit.

- Build numbers increment once for every release-ready build and are never reset or reused.
- Version patch numbers increment for release-ready changes within the active milestone when appropriate.
- A milestone change requires explicit approval; it is never inferred from the number of builds.

## Development milestones

| Version range | Milestone | Focus |
| --- | --- | --- |
| `V0.1.x` | Application Foundation | Responsive shell, navigation, archive structure, and reading foundation. |
| `V0.2.x` | Private Writing Workspace | Private writing, editing, and organization workflows. Build 004 establishes Firebase/Auth/Firestore foundations and a first editor shell. |
| `V0.3.x` | Interconnected AOI Archive | Relationships, timelines, maps, and interconnected archive tools. |
| `V1.0.x` | Full Storytelling Platform | Complete, cohesive storytelling platform. |

## Current release

`Build 007 · V0.2.3` — Private Writing Workspace.
