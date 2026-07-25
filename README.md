# Records Fashion School — website

Next.js (App Router) site for Records Fashion School, Kampala. Read
`CLAUDE.md` for the full art direction, stack rules and content sources.

## Getting started

```bash
npm install
npm run dev
```

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Dev server on <http://localhost:3005>                             |
| `npm run build`   | Static export → `out/` (this is what gets deployed)               |
| `npm run preview` | Serves the built `out/` on :3006 — the *real* deployed artifact   |
| `npm run check`   | TypeScript + ESLint                                               |
| `npm run clean`   | Removes `.next/` and `out/`                                       |

Before pushing anything visual, `npm run build && npm run preview` is the
honest check — it exercises the exported static files rather than the dev
server, which is what visitors actually get.

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

## Deploying (Hostinger, via GitHub)

**Day to day, deploying is just: commit and push to `main`.** Everything
below is the one-time wiring that makes that true.

### How it works

```
you push to main
      ↓
GitHub Actions  (.github/workflows/deploy.yml)
  installs deps → npm run build → static site in out/
      ↓
publishes those files to the `deploy` branch (site files at branch root)
      ↓
Hostinger Git pulls `deploy` into public_html
```

Two branches, two different jobs:

| Branch   | Holds                    | Who writes it            |
| -------- | ------------------------ | ------------------------ |
| `main`   | Source code              | You                      |
| `deploy` | Built HTML/CSS/JS        | GitHub Actions — **never edit or commit here by hand** |

The split exists because **Hostinger's Git integration only runs `git pull`** —
it does not run `npm install` or `npm run build`. So the branch it tracks has
to already contain the finished site at its root. Keeping that out of `main`
keeps the source history clean.

### One-time setup

**1. Add the application-form key to GitHub** (skip and `/apply` still
deploys, but its online form shows "not activated"):

Repo → Settings → Secrets and variables → Actions → New repository secret
- Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Value: the Web3Forms access key (same one in your local `.env.local`)

This is needed because `NEXT_PUBLIC_*` values are compiled into the
JavaScript at build time — there's no server on Hostinger to read them
later.

**2. Let the first deploy run.** Push anything to `main` (or Actions tab →
"Build and publish to Hostinger" → Run workflow). This creates the `deploy`
branch. It won't exist until then, and step 3 needs it to exist.

**3. Point Hostinger at the `deploy` branch.** hPanel → Advanced → GIT:
- Repository: `https://github.com/josebanzuma1-cell/records-fashion-school`
- Branch: **`deploy`** ← not `main`
- Directory: `public_html` (leave blank if it defaults there)

Then hit **Deploy** once to pull the first copy.

**4. (Optional but recommended) Make Hostinger pull automatically.** In that
same hPanel Git section, copy the **Auto Deployment webhook URL**, then add
it to GitHub as a secret named `HOSTINGER_DEPLOY_WEBHOOK`. The workflow
pings it after each publish, so the site updates within seconds instead of
waiting for you to click Deploy.

### After setup — the everyday loop

```bash
# edit code
npm run build && npm run preview   # optional: check the real built output
git add -A
git commit -m "Update fees for 2027 intake"
git push
```

Then watch the **Actions** tab. Green check = published. If you added the
webhook, the live site follows within seconds; otherwise click Deploy in
hPanel.

### Troubleshooting

- **Site didn't change** → Check the Actions tab first. Red X = build broke,
  and the click into the failed step shows why. Green check but stale site =
  Hostinger hasn't pulled; click Deploy in hPanel (or set up the webhook).
- **`/apply` form says "not activated"** → `NEXT_PUBLIC_WEB3FORMS_KEY` secret
  is missing or misspelled in GitHub. Fix it, then re-run the workflow — a
  secret change alone doesn't trigger a rebuild.
- **A page 404s on Hostinger but works locally** → confirm `public/.htaccess`
  made it into `public_html`. Some FTP/file managers hide dotfiles by default.
- **Deploy branch history got tangled** (rare — e.g. someone force-pushed):
  delete the `deploy` branch on GitHub, re-run the workflow to recreate it,
  then in hPanel remove and re-add the repository.

### Notes

- **Don't add API routes, middleware, server actions, or `next/image`** — the
  static export depends on their absence (see `CLAUDE.md` §2). The build will
  fail loudly rather than silently ship something broken.
- Domain/DNS is separate from this repo: pointing `recordsfashionschool.com`
  at Hostinger is done at whichever registrar holds the domain, and takes a
  few hours to propagate.
- `out/` and `.next/` are gitignored on `main` by design — build artifacts
  belong on `deploy`, not in source history.
