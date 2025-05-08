# Deployment Guide for Vercel

This guide will help you deploy your application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [GitHub](https://github.com) account
3. The Orange ID credentials (you already have these)

## Preparation Steps

1. Download this entire project as a ZIP file from Replit.
2. Create a new GitHub repository.
3. Extract the ZIP locally and push the code to your GitHub repository.

## File Updates Before Deploying

Before deploying, you need to make a few changes to the files:

1. **Replace package.json**:
   - Use the content from `package.json.for.vercel` to replace your `package.json` file.

2. **Update OrangeAuthProvider.tsx**:
   - After deployment, you need to update the `OrangeAuthProvider.tsx` file with your Vercel domain.
   - Use the template in `client/src/components/OrangeAuthProvider.for.vercel.tsx` as a reference.
   - Replace `https://your-project.vercel.app` with your actual Vercel domain after deployment.

## Deployment Steps on Vercel

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your account.

2. **Create a New Project**:
   - Click "New Project" on your Vercel dashboard.
   - Import your GitHub repository.

3. **Configure the Project**:
   - Configure the build settings:
     - Framework Preset: Other
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

4. **Set Environment Variables**:
   - Add the following environment variables:
     - `VITE_BEDROCK_TENANT_ID`: orange-ood92bfz7z
     - `SESSION_SECRET`: (create a secure random string)

5. **Deploy**:
   - Click "Deploy" and wait for the build to complete.

6. **Get Your Domain**:
   - Once deployed, Vercel will assign a domain like `your-project.vercel.app`.
   - Copy this domain.

## Post-Deployment Steps

1. **Update the Callback URL**:
   - Update your `OrangeAuthProvider.tsx` file with your new Vercel domain.
   - Replace `domain = "https://your-project.vercel.app"` with your actual domain.
   - Commit and push these changes to GitHub.
   - Vercel will automatically redeploy with your changes.

2. **Whitelist Your Domain in Orange ID Dashboard**:
   - Log in to the Orange ID dashboard.
   - Add your Vercel domain (`https://your-project.vercel.app`) to the list of allowed origins.

3. **Test Your Application**:
   - Visit your deployed application at your Vercel domain.
   - Test the login functionality in a regular browser (not in an embedded view).

## Troubleshooting

- If login still doesn't work, check browser console for errors.
- Verify that your domain is correctly whitelisted in the Orange ID dashboard.
- Make sure the callback URL in OrangeAuthProvider matches exactly with your Vercel domain.

## Need Help?

If you encounter any issues during deployment or with authentication, review the configuration files and make sure all steps have been followed correctly.