# ATINY Replay

**A collection for the curious ATINY.**

ATINY Replay is a personal, fan-curated archive of ATEEZ videos: music videos, performances, fancams, interviews, variety shows, vlogs, and lives. It brings links, dates, songs, releases, and appearances together so they are easier to find and revisit.

🌐 **[Browse the archive](https://janiscudilla.github.io/ATINYreplay/)**

The archive is open to visitors. Adding, editing, and organizing entries is reserved for the archive owner.

## What you can explore

- **Music Videos** — ATEEZ, collaborations, and solo videos.
- **Performances** — concerts, awards shows, broadcast performances, fanmeetings, and other appearances, including fan uploads.
- **Variety** — interviews, shows, and other activities, grouped by show or series where applicable.
- **Vlogs & Lives** — logbooks, behind-the-scenes footage, and livestreams.
- **Releases & Songs** — group and solo releases, tracklists, and related videos.
- **Calendar** — appearances and footage organized around relevant dates.
- **Resources** — channel tallies and links to other ATINY resources.

Categories and subcategories can be customized and reordered by the editor.

## Made for a growing archive

### Compact browsing or gallery view

Browse collapsible groups of links or thumbnail galleries. Events, shows, tours, and songs provide structure as the collection grows. Subcategory covers can be chosen by the editor, with an automatic YouTube thumbnail fallback.

### Connected information

A video can connect to an event, a song, a release, or a series. Concert footage can be organized by tour, concert date and location, then setlist song. Multi-song videos can be kept together as full or multi-song coverage.

Member-focused entries make it easier to find solo, unit, and focus footage without treating every group appearance as a solo result.

### Dates with context

Upload, filming, event, and broadcast dates are stored separately. Entries can include date ranges, month-and-year dates, and multiple footage segments. Calendar placement uses the relevant date context for the video rather than treating every upload as a new event.

## Editor tools

- **Add a link:** save a video URL, choose its category, and add relevant details.
- **Add several links:** review pasted URLs, import a CSV using the downloadable template, or load videos from a YouTube playlist.
- **Bulk editing:** update shared fields across selected entries or change each selected video's category and subcategory.
- **For sorting:** find entries that need a category, subcategory, or key performance details.
- **Autocomplete:** reuse saved names for songs, releases, tours, shows, channels, and other supported fields.
- **Title tools:** retain the original title, add an English translation, and review an archive-title suggestion before applying it.
- **Duplicate checks:** catch existing video URLs before saving another copy.
- **Backups:** export and import archive data through the editor.

A video URL and category are required. Other details can be added later. Leaving the subcategory unset keeps the entry available for sorting; entering a tour name does not automatically classify it as a concert.

Title translation depends on browser support. When unavailable, the form provides a Google Translate link and a field for pasting the translation. YouTube playlist imports and some metadata lookups require a configured YouTube Data API key and are subject to API availability and quotas.

## How the site is built

The application is intentionally kept in a single **`index.html`** file, containing the HTML, CSS, JavaScript, and Firebase web configuration. There is no npm install or compilation step for deployment.

| Component | Purpose |
| --- | --- |
| GitHub Pages | Hosts the website |
| Firebase Authentication | Google sign-in for the editor |
| Cloud Firestore | Stores videos, events, releases, resources, and category information |
| YouTube links and embeds | Provide thumbnails and access to the original videos |

Video files are not uploaded to this repository. The archive stores links and metadata; the original platforms host the videos.

The Firebase configuration identifies the connected project. Access control must be enforced by Firestore security rules, including owner-only writes and restrictions on reading private drafts. Hiding editor buttons alone is not access control.

## Updating the website

1. Replace **`index.html`** in the repository with the updated file.
2. Commit the change with a descriptive title and description.
3. Wait for the GitHub Pages deployment to finish.
4. Refresh the website and check the editor-visible build number.

Ordinary content changes made through the editor are saved to Firebase; they do not require a new GitHub commit. Changing this README updates the repository documentation only.

For code updates, increment the build number in `index.html` so the owner can identify the version currently loaded. Export a backup before making substantial data changes.

## Project scope and credits

ATINY Replay is an independent fan project curated by **Janis**. It is not affiliated with ATEEZ, KQ Entertainment, YouTube, or the channels represented in the archive.

Videos and other referenced media belong to their respective creators and rights holders. Official and fan-uploaded sources are identified separately. Links may become unavailable if their original uploads are removed or made private.

Other fan masterlists and lore resources are linked as resources for further exploration. This archive is a personal collection, not a replacement for their work.
