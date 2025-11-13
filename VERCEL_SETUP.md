# Vercel Deployment Setup

## Required Environment Variables

Add these environment variables in your Vercel Dashboard (Settings → Environment Variables):

### Production Variables

1. **MONGODB_URI**
   - Value: Your MongoDB connection string (e.g., from MongoDB Atlas)
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/social-media?retryWrites=true&w=majority`

2. **JWT_SECRET**
   - Value: A secure random string for JWT token signing
   - Example: `your-super-secret-jwt-key-change-this-in-production-2025`

## How to Add Environment Variables

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Navigate to **Environment Variables**
4. Add each variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
   - Environment: Production (and Preview if needed)
   - Click "Save"

5. Repeat for `JWT_SECRET`

## MongoDB Atlas Setup (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't)
3. Go to Database Access → Add Database User
4. Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Go to Database → Connect → Connect your application
6. Copy the connection string and replace `<password>` with your database user password

## After Setup

1. Redeploy your application or trigger a new deployment
2. Check the deployment logs for any errors
3. Test registration and login functionality

## Troubleshooting

- If registration fails, check Vercel Function logs
- Ensure MongoDB connection string is correct
- Verify that MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check that JWT_SECRET is set
