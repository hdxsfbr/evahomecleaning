# Eva Home Cleaning

Production-ready marketing site for Eva Home Cleaning.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file based on `.env.example`.

3. Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, import the repo.
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy (Vercel will detect Next.js automatically).

## DNS guidance

Set the following DNS records:

- Apex A record: `76.76.21.21`
- `www` CNAME: `cname.vercel-dns.com`

## Twilio inbound SMS

Set the Messaging webhook in Twilio to:

`https://evahomecleaning.com/api/twilio/sms`

Environment variables required (already in `.env.example`):
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `LEADS_TO`
