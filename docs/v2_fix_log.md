# v2 review fixes — applied 29 Aug 2026 (fix agent started them; verified and committed by hand)

| Defect (reviewer) | Outcome |
|---|---|
| Mobile menu links hidden under the fixed header (visual, blocker) | Fixed — list starts at 116 px, scrolls; all 10 links reachable at 390×844 (verified screenshot) |
| Mobile menu overlay transparent (`bg-ink/98` not a Tailwind step) (visual, major) | Fixed — `bg-ink/95` + backdrop blur |
| Feather mask clipping research-figure labels (visual, major) | Fixed — mask reduced to a 6 % linear fade; figure sits in a padded wrapper with multiply blending so white grounds print onto the paper; all labels visible (verified) |
| Local dist built with `/noblelab/` base (visual, major) | Moot — rebuilt with the deployed `--base=./` setting |
| 404.html asset prefix under relative base (code, major) | Fixed — 404 page resolves its assets at runtime |
| "Fonti Kar doing experiments" not in any source (facts, major) | Reverted to the old site's "Dr. Kar doing experiments" |
| "red sandstone rock", "Limestone karst hills" in alt text (facts, minor) | Neutralised to visible content only |
| Lab alumni role labels coloured as current (visual+code, minor) | Fixed — alumni take the sage "past" accent |
| Three year formats (visual+code, minor) | Normalised to "(2022 – 2025)" / "(2026 – Present)" |
| Small-text contrast: map "joint works" line, publications search placeholder/border (code, minor) | Fixed — darker neutrals / edge border |
| Research hero photo reads as rock texture (visual, minor, taste) | Left for Daniel |
| Pablo's bio "…more about my research here." without a link (minor) | Left for Daniel |
| Unreferenced large images in dist (code, minor) | Left (nothing deleted) |
