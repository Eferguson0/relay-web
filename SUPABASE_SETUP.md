# Supabase Authentication Setup

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## 3. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_APP_NAME=Relay
```

## 4. Configure Authentication Settings (Optional)

In your Supabase dashboard:
1. Go to "Authentication" → "Settings"
2. Configure your site URL (for local development: `http://localhost:3000`)
3. Set up email templates if desired
4. Configure password requirements if needed

## 5. Test the Setup

1. Run your development server: `pnpm dev`
2. Go to `http://localhost:3000/login`
3. Click "Sign Up" and try creating an account
4. Check your email for the confirmation link
5. After confirming, try logging in

## What's Already Implemented

✅ Supabase client configuration  
✅ Email/password authentication forms  
✅ Login and signup functionality  
✅ Session management  
✅ Protected routes middleware  
✅ Automatic redirects after authentication  

## Next Steps

- The authentication is now fully functional
- Users can sign up, confirm email, and log in
- Protected routes will redirect to login if not authenticated
- After login, users are redirected to `/onboarding`

## Troubleshooting

- **"Invalid API key"**: Check your environment variables
- **"Email not confirmed"**: Check your email and click the confirmation link
- **CORS errors**: Make sure your site URL is configured in Supabase settings
