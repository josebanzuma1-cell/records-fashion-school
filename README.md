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

CLI-driven (not git-integrated): `vercel deploy --prod --yes --scope zym1`.
Production alias: <https://records-fashion-school.vercel.app>.
