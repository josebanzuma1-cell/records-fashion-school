# Records Fashion School — website

Next.js (App Router) site for Records Fashion School, Kampala. Read
`CLAUDE.md` for the full art direction, stack rules and content sources.

## Getting started

```bash
npm install
npm run dev   # runs on the port you pass with -p (project convention: 3005)
```

## Online application form (`/apply`) — Web3Forms

The `/apply` page offers two application paths: downloading the official
form (`public/forms/`), and an online form that emails submissions to the
school **with no backend** — it POSTs directly from the browser to
[Web3Forms](https://web3forms.com), so there is no API route, no Nodemailer
and no mail server in this codebase.

### Setup (one-time)

1. Go to <https://web3forms.com>, enter the school's admissions inbox
   (e.g. `info@recordsfashionschool.com`) and copy the **access key** it
   emails you. The key is free.
2. Locally: `cp .env.example .env.local` and paste the key as
   `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. On Vercel: Project → Settings → Environment Variables → add
   `NEXT_PUBLIC_WEB3FORMS_KEY` for Production (and Preview), then redeploy.

### Where the email goes

The **destination inbox is bound to the access key** and managed in the
Web3Forms dashboard — changing it never requires a code change. Submissions
arrive as an email titled "New application — {applicant name}".

Until the key is set, `/apply` still renders the whole form but shows an
"online submission not activated" notice and points applicants to the
downloadable form instead.

### Notes and limits

- **Attachments** (certificate scan, portfolio, passport photo — all
  optional, ≤5MB each): file uploads are a Web3Forms **paid-plan** feature.
  On the free plan the text fields still arrive; applicants are told they
  can email copies instead.
- Spam is filtered by a hidden `botcheck` honeypot field (Web3Forms drops
  any submission where it is checked).
- Applicant data is sent by POST only — nothing personal ever appears in a
  URL.

### What applicants must still do in person

The online form cannot complete: the six physical passport-size photos,
presentation of original certificates, and the UGX 122,000/= admission
processing fee. These happen at the office (Lower Katwe, along Muteesa I
Road, Tezira House, Second Floor, Kampala) or as arranged with admissions —
the page and the post-submission screen both say so.

## Deploying

### Vercel (current production)

CLI-driven (not git-integrated): `vercel deploy --prod --yes --scope zym1`.
Production alias: <https://records-fashion-school.vercel.app>.

### Hostinger (or any plain file host)

The site builds to a fully static export — no Node.js needed on the server
at all, so it works on Hostinger's cheapest shared plan just as well as a
VPS. There's nothing Hostinger-specific to configure; this is true of any
plain web host (any shared hosting, Netlify's "drop a folder", S3+CloudFront, etc).

1. **Set the live Web3Forms key before building** — it's a
   `NEXT_PUBLIC_*` variable, so it gets baked into the JS at build time.
   There's no server on Hostinger to read `.env.local` afterwards, so if
   the key is ever missing or wrong at build time, the only fix is
   rebuilding and re-uploading (see step 4). Confirm `.env.local` has the
   real key before running the build.
2. Build: `npm run build`. Output lands in `out/` (~380 files, ~6MB) —
   plain HTML/CSS/JS.
3. Zip the **contents** of `out/` (not the folder itself — you want
   `index.html` etc. at the zip's top level, not inside an `out/`
   subfolder).
4. In Hostinger's hPanel: File Manager → open `public_html` (or the
   subdomain's folder if deploying to a subdomain) → delete Hostinger's
   default placeholder files if present → Upload → pick the zip → once
   uploaded, right-click it → Extract, into `public_html`.
   (An FTP client such as FileZilla, pointed at the FTP credentials in
   hPanel, works the same way — upload the contents of `out/` to
   `public_html`.)
5. Custom 404 page: `out/404.html` is already there. Most Hostinger
   plans auto-detect it; if not, hPanel → Website → Error Pages lets you
   point 404s at `/404.html`.
6. **To publish any future change**: repeat steps 1–4 — edit code, build,
   re-zip, re-upload. There's no git integration or auto-deploy on this
   path (unlike Vercel), so nothing updates until you manually re-upload.

Domain note: if `recordsfashionschool.com` (or whatever domain) already
points at Vercel and you want Hostinger to serve the live site instead,
you'll update the domain's DNS (or nameservers) in whichever registrar
holds it — that's a DNS change, not something in this repo, and it can
take a few hours to propagate. Keeping both running (Vercel on the main
domain, Hostinger on a subdomain for testing) is fine and needs no DNS
change beyond adding the subdomain.
