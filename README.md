# Av9Hub - MERN Stack Social Media Dashboard

A full-featured social media dashboard built with MongoDB, Express, React, and Node.js. Ready to deploy on Vercel!

## ✨ Features

- 🔐 **User Authentication** - JWT-based login/register
- 📝 **Create Posts** - Share text and images
- 💬 **Comments** - Engage with posts
- ❤️ **Likes** - Like posts and comments
- 👥 **Follow System** - Follow/unfollow users
- 👤 **User Profiles** - View and edit profiles
- 📱 **Responsive Design** - Works on all devices
- 🔔 **Real-time Feed** - See latest posts

## 🚀 Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- React Icons
- React Toastify
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone or navigate to the project**
```bash
cd e:\PROJECT\FSD
```

2. **Install dependencies**

Install root dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/social-media
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-media?retryWrites=true&w=majority
```

4. **Run the Application**

Development mode (both frontend and backend):
```bash
npm run dev
```

Or run separately:

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌐 Deployment on Vercel

### Step 1: Prepare MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist all IPs (0.0.0.0/0) for Vercel

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional)
```bash
npm i -g vercel
```

2. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

3. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
   - Deploy!

4. **Or Deploy via CLI**
```bash
vercel
```

### Step 3: Configure Environment Variables in Vercel

In your Vercel project settings, add:
- `MONGODB_URI` = `mongodb+srv://...`
- `JWT_SECRET` = `your-secret-key`

## 📁 Project Structure

```
FSD/
├── server/                 # Backend
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   └── Notification.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   └── follows.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   └── server.js          # Entry point
├── client/                # Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API
│   │   ├── utils/        # Utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search/:query` - Search users

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/like` - Like/unlike comment

### Likes
- `POST /api/likes/:postId` - Like/unlike post

### Follows
- `POST /api/follows/:userId` - Follow/unfollow user
- `GET /api/follows/:userId/followers` - Get followers
- `GET /api/follows/:userId/following` - Get following

## 🎨 Features Showcase

### User Registration & Login
- Secure authentication with JWT
- Password hashing with bcrypt
- Form validation

### Create & Share Posts
- Text posts with optional images
- Real-time feed updates
- Edit and delete your own posts

### Social Interactions
- Like posts and comments
- Comment on posts
- Follow/unfollow users
- View followers and following

### User Profiles
- Customizable profiles
- Avatar and cover photos
- Bio and user information
- View user's posts

## 🔧 Customization

### Change App Name
Edit `client/src/components/Navbar.jsx`:
```jsx
<Link to="/">YourAppName</Link>
```

### Update Colors
Edit `client/src/index.css` to change the color scheme.

### Add Features
- Notifications system (model already created)
- Direct messaging
- Story features
- Search functionality
- Hashtags

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure MongoDB is running locally

**Vercel Deployment Issues:**
- Verify environment variables are set
- Check build logs for errors
- Ensure MongoDB allows Vercel IPs

**CORS Errors:**
- Backend is configured to accept all origins
- Check proxy settings in `vite.config.js`

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using MERN Stack

---

**Happy Coding! 🚀**
