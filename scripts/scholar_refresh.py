"""
Refreshes Google Scholar citation counts into public/data/scholar.json.

Google publishes no Scholar API and blocks automated access, so this uses the
`scholarly` package, which reads the public profile page. Run it by hand every
few weeks; a nightly job from a shared IP address gets CAPTCHA-blocked quickly.

    pip install scholarly
    python scripts/scholar_refresh.py

The site keeps working whether or not this file exists. When present, each
publication shows its Scholar count alongside the OpenAlex one, matched on
title.

If it stops returning results, Scholar has flagged the IP. Wait a few hours,
try a different network, or run it behind a proxy. No amount of retrying from
the same address will help.
"""

import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

SCHOLAR_ID = "w69ezLIAAAAJ"
OUT = Path(__file__).resolve().parent.parent / "public" / "data" / "scholar.json"

STOP = {
    "a", "an", "the", "of", "in", "on", "for", "and", "to", "with", "across",
    "using", "from", "is", "are", "by", "at", "as", "that",
}


def norm(title: str) -> str:
    """Normalised title, used to match Scholar entries to our own records."""
    text = unicodedata.normalize("NFKD", title or "").lower()
    words = re.sub(r"[^a-z0-9 ]+", " ", text).split()
    return " ".join(w for w in words if len(w) > 2 and w not in STOP)


def main() -> int:
    try:
        from scholarly import scholarly
    except ImportError:
        print("scholarly is not installed. Run: pip install scholarly")
        return 1

    print(f"Fetching Scholar profile {SCHOLAR_ID} ...")
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author, sections=["basics", "indices", "publications"])
    except Exception as err:  # scholarly raises several unrelated types
        print(f"\nScholar refused the request: {err}")
        print("This nearly always means the IP address is temporarily blocked.")
        print("Wait a few hours or try another network. The site keeps the old file.")
        return 1

    publications = []
    for pub in author.get("publications", []):
        bib = pub.get("bib", {})
        title = bib.get("title")
        if not title:
            continue
        publications.append(
            {
                "title": title,
                "key": norm(title),
                "year": int(bib["pub_year"]) if str(bib.get("pub_year", "")).isdigit() else None,
                "citations": pub.get("num_citations", 0) or 0,
            }
        )

    payload = {
        "updated": date.today().isoformat(),
        "source": "Google Scholar via scholarly",
        "scholarId": SCHOLAR_ID,
        "citations": author.get("citedby", 0),
        "citations5y": author.get("citedby5y"),
        "hIndex": author.get("hindex"),
        "i10Index": author.get("i10index"),
        "publications": sorted(publications, key=lambda p: -p["citations"]),
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=1, ensure_ascii=False), encoding="utf-8")

    print(
        f"\nWrote {OUT.relative_to(OUT.parent.parent.parent)}: "
        f"{len(publications)} publications, {payload['citations']} citations, "
        f"h-index {payload['hIndex']}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
