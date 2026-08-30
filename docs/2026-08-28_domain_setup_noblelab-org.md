# Getting noblelab.org and pointing it at the site

`noblelab.org` was **available** at the .org registry (RDAP lookup, 28 Aug 2026).
Domains change hands daily, so register it soon. No agent will buy or configure
anything on your behalf — these are your steps; the code side (`public/CNAME`)
is already prepared in the site.


> **Status 28 Aug 2026, afternoon:** noblelab.org is registered (Cloudflare
> Registrar, expires 2027-08-28). Nameservers are Cloudflare's
> (lochlan / nelly.ns.cloudflare.com). **No DNS records exist yet** — step 1 is
> done; do steps 2 and 3 below in the Cloudflare dashboard.

## Cloudflare-specific steps (you registered there, so DNS lives there too)

1. dash.cloudflare.com → **noblelab.org → DNS → Records → Add record**, nine
   times, using the table in step 2 below. For each record set **Proxy status
   = DNS only** (grey cloud), not "Proxied" — GitHub must see the real
   requests to issue its certificate. You can proxy later if you want.
2. Same zone → **SSL/TLS → Overview**: leave "Full" (not "Flexible"; Flexible
   causes redirect loops with GitHub Pages if you ever turn the proxy on).
3. **Domain Registration → Manage → noblelab.org**: confirm **Auto-renew is on**
   and the contact email is one you read.
4. Then do "3. Tell GitHub the domain is yours" below (the TXT record also goes
   in Cloudflare DNS, DNS only).
5. Propagation from Cloudflare is usually a minute or two; `dig +short
   noblelab.org A` from a terminal should list the four GitHub addresses.

## 1. Register the domain (10 minutes, ~AU$15–25 per year)

Any ICANN registrar works. Reasonable choices, no affiliation:

- **Cloudflare Registrar** — sells at wholesale cost, free WHOIS privacy, and
  its DNS is what you'd use anyway. Needs a free Cloudflare account.
- **Porkbun** or **Namecheap** — cheap, simple, free WHOIS privacy.

Whichever you pick: search `noblelab.org`, buy 1–2 years, turn **auto-renew
on**, use your ANU or personal email as the account contact (a domain that
lapses because the renewal notice went to a dead address is the classic way
labs lose their site). Keep the login somewhere safe.

Optional: also register `noblelab.au` (available; needs an Australian address)
and later set it to redirect to noblelab.org. Not needed for launch.

## 2. Add DNS records at the registrar

In the registrar's DNS panel, create:

| Type | Name | Value |
|---|---|---|
| A | `@` (apex) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `daniel1noble.github.io` |

These are GitHub Pages' published addresses; confirm they still match
https://docs.github.com/pages → "Managing a custom domain" before saving.
If using Cloudflare, set the records to **DNS only** (grey cloud), not proxied,
at least until HTTPS is working.

## 3. Tell GitHub the domain is yours

1. github.com → your profile **Settings → Pages → "Add a domain"** → enter
   `noblelab.org`. GitHub gives you a TXT record
   (`_github-pages-challenge-daniel1noble` → a token). Add that TXT record at
   the registrar, wait a few minutes, click **Verify**. This stops anyone else
   from pointing your domain at their Pages site.
2. Repo **daniel1noble/noblelab → Settings → Pages**:
   - *Source*: **GitHub Actions** (the new site deploys with a workflow, not
     the old Jekyll "deploy from branch" setting the repo currently has).
   - *Custom domain*: `noblelab.org` → Save. GitHub runs a DNS check.
   - Tick **Enforce HTTPS** once the check passes (the certificate can take
     up to an hour to be issued).

The repository already carries `public/CNAME` containing `noblelab.org`; the
deploy workflow copies it into every build so the setting survives redeploys.

## 4. Check

- `dig +short noblelab.org A` should list the four GitHub addresses.
- https://noblelab.org and https://www.noblelab.org both load the site
  (www redirects to the apex).
- https://daniel1noble.github.io/noblelab/ will redirect to the new domain.

## 5. Afterwards

- Put the new URL on your ORCID record, Scholar profile, ANU staff page, email
  signature and the old Google Site (a one-line "we've moved to noblelab.org"
  on its home page; Google Sites cannot redirect).
- Add the renewal date to your calendar even with auto-renew on.
