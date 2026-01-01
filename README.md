# Mithila Sangam Crafts

Designed, crafted and developed by **Priyanshu Raj** — LinkedIn: https://www.linkedin.com/in/priyanshudas00

## How to run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

You can edit the project with your preferred IDE and use the above commands to run it locally.

## Google OAuth setup (Supabase)

If you want to enable Sign in with Google:

1. Open your Supabase project dashboard.
2. Go to **Authentication → Providers** and enable **Google**.
3. Add the **Client ID** and **Client Secret** obtained from Google Cloud Console.
4. Set the **Site URL** (Authentication settings) to your app origin (e.g., `http://localhost:8081` or your production domain).

In Google Cloud Console (APIs & Services → Credentials):

- Create an OAuth 2.0 Client ID (Web application).
- Add the Supabase callback URL to **Authorized redirect URIs**: `https://<your-supabase-project>.supabase.co/auth/v1/callback`.
- Optionally add local origins (e.g., `http://localhost:8081`) for testing.

For local development, add `VITE_GOOGLE_CLIENT_ID` to your local `.env` (do not commit it):

```
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

If you see the error `Unsupported provider: provider is not enabled`, enable Google in Supabase as described above.

Cloudflare Pages (production) setup

1. In Cloudflare Pages, open your project and go to **Settings → Environment variables**.
2. Add the variable `VITE_GOOGLE_CLIENT_ID` with the Google OAuth Client ID (e.g., `1095...apps.googleusercontent.com`).
3. Add any other required env vars (e.g., `VITE_SUPABASE_URL`). Additionally, set `VITE_SITE_URL` to your site origin (e.g., `https://mithilasanskar.shop`) so the app and Supabase use the correct production domain.
4. Redeploy the site. Cloudflare will inject env vars at build-time for Vite prefixed with `VITE_`.

Notes:
- Make sure the Google OAuth consent screen and OAuth client include the Supabase callback URL: `https://<your-supabase-project>.supabase.co/auth/v1/callback`.
- In Supabase Auth Providers, enable Google and paste the Client ID and Client Secret there.


## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Deploy this project to your preferred hosting provider (for example, Vercel or Netlify). Connect the repository to that provider and follow their deployment instructions.

## Can I connect a custom domain?

Yes — configure your domain with your hosting provider (Vercel, Netlify, etc.) following their documentation.
