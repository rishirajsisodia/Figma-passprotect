# Case Study Password Page

A page that asks for a password. If the password is right, it opens your Figma case study.

## What is inside

| File | What it does |
|---|---|
| `index.html` | The page people see (password box, button, email link). |
| `api/unlock.js` | Runs on Vercel's server. Checks the password. |
| `api/deck.js` | Runs on Vercel's server. Opens your Figma file. |
| `api/_auth.js` | Small helper used by the two files above. |
| `vercel.json` | Tells Vercel that `/deck` should go to `api/deck.js`. |

Your password and Figma link are **not** in these files. You type them on the Vercel website, so nobody can see them.

## Step 1 — Put the files on GitHub

1. Go to github.com → click **New** (new repository).
2. Name it, for example `case-study-gate`. Choose **Private**. Click **Create repository**.
3. Click **uploading an existing file**.
4. Drag in everything from this folder (including the `api` folder). Click **Commit changes**.

## Step 2 — Put it on Vercel

1. Go to vercel.com → **Add New** → **Project**.
2. Pick your repository → **Import**.
3. Open **Environment Variables**. Add these two:

   | Name | Value |
   |---|---|
   | `SITE_PASSWORD` | the password you want people to type |
   | `FIGMA_URL` | the link to your Figma case study |

4. Click **Deploy**. Wait about 1 minute.

## Step 3 — Share it

Send people your Vercel link, for example `https://case-study-gate.vercel.app`, and the password.

## Changing things later

- **New password or new Figma link:** Vercel → your project → **Settings** → **Environment Variables** → edit → then **Deployments** → **⋯** → **Redeploy**.
- When you change the password, everyone must type the new one again.
- A person stays unlocked for 7 days in their browser.
- **Your email:** it is in `index.html` in two places (search for `rishirsisodia@gmail.com`).

## Design tokens

The colors, spacing and corner sizes at the top of `index.html` (`--color-primary`, `--space-24`, `--radius-lg` …) use the same names as the variables in the Figma file.
