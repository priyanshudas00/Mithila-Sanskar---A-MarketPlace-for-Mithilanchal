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
