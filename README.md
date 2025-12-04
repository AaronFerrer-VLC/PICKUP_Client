<p align="center">
  <img src="https://res.cloudinary.com/lucaslelieur/image/upload/v1736788255/LOGO_blanca_kkwqzh.png" alt="PICKUP Logo">
</p>

# 🎬 **PICKUP**

<br>

<p align="center">
  <a href="https://lapremiere.netlify.app/">Visit the web app!</a>
</p>

## ⌨️ **Project Description**

**PICKUP** is a full-stack web application developed by **Lucas Lelieur** and **Aaron Ferrer** as part of the Ironhack Web Development Bootcamp. The platform enables users to share movie reviews and discover insights from other film lovers in a clean, user-friendly environment.

It includes a **secure authentication system based on JSON Web Tokens (JWT)** and allows authenticated users to create, edit, and manage their own reviews. Built following the **MERN stack architecture**, this project combines front-end interactivity with a robust backend and dynamic database management.

## 🚀 **Features**

- 🔐 **JWT-based authentication** for secure login and route protection
- 📝 **CRUD operations** on film reviews
- 👥 **User profile management** with personalized review feeds
- 🌍 **Community-driven feed** to browse other users' reviews
- 🎬 **TMDB integration** for comprehensive movie information
- 💾 **MongoDB integration** for data persistence
- 📱 **Responsive design** with a smooth user experience
- 🔍 **Advanced search** functionality for communities, users, and reviews
- ❤️ **Like system** for reviews
- 🎯 **Private routes** protection for authenticated content

## 🖱️ **Navigation**

| URL                         | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `/`                         | Home Page                                                  |
| `/comunidades`              | Page containing all communities                            |
| `/comunidades/detalles/:id` | Page containing the details of the selected community      |
| `/comunidades/crear`        | Create a new community (Protected route)                   |
| `/reviews`                  | Page containing all reviews                                |
| `/reviews/:reviewId`        | Page containing the details of the selected review         |
| `/reviews/movie/:movieId`   | Page containing reviews for a specific movie               |
| `/usuarios`                 | Page containing all registered users                       |
| `/usuarios/:id`             | Page containing the details of the selected user           |
| `/peliculas-populares`      | Page containing popular movies from the TMDB API           |
| `/mejor-valoradas`          | Page containing best rated movies from the TMDB API        |
| `/estrenos`                 | Page containing recently released movies from the TMDB API |
| `/próximos-estrenos`        | Page containing upcoming release movies from the TMDB API  |
| `/registro`                 | User registration page                                     |
| `/inicio-sesion`            | User login page                                            |
| `/*`                        | 404 page                                                   |

## 🛠️ **Technologies Used**

### Front-end

- **React 18.3.1** - UI library
- **Vite 6.0.1** - Build tool and dev server
- **React Router DOM 7.0.1** - Client-side routing
- **Bootstrap 5.3.3** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Axios 1.7.8** - HTTP client
- **Cloudinary** - Image management
- **JavaScript (ES6+)** - Programming language
- **HTML5, CSS3** - Markup and styling

### Back-end

- **Node.js** - Runtime environment
- **Express** - Web framework

### Database

- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Authentication & Security

- **JSON Web Tokens (JWT)** - Authentication
- **bcrypt** - Password hashing

### Deployment & Tools

- **GitHub** - Version control
- **Git** - Version control system
- **Postman** - API testing
- **Netlify** - Frontend deployment

## 📦 **Installation & Setup**

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client-final-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_APP_API_URL=https://your-api-server.com
   VITE_APP_TMDB_API_KEY=your_tmdb_api_key
   VITE_APP_TMDB_API_IMG_URL=https://image.tmdb.org/t/p
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 **Available Scripts**

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ **Project Structure**

```
src/
├── components/          # Reusable components
│   ├── CommunitiesComponents/
│   ├── Filters/
│   ├── MovieComponentes/
│   ├── Navigation/
│   ├── PersonComponents/
│   ├── Reviews/
│   └── User/
├── contexts/           # React Context (Authentication)
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── CommunityPages/
│   ├── MoviesPage/
│   ├── ReviewPages/
│   └── UserPages/
├── routes/             # Route configuration
├── services/           # API services
├── const/              # Constants
├── App.jsx            # Main component
└── main.jsx           # Entry point
```

## 🔐 **Authentication**

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in `localStorage`
- Tokens are automatically sent in all requests via Axios interceptors
- Protected routes require authentication (see `PrivateRoutes.jsx`)
- Automatic logout on token expiration (401 errors)

## 🎨 **Key Features Explained**

### 🔐 Secure Authentication

- JWT-based token system
- Protected routes for authenticated content
- Automatic token refresh handling
- Secure logout functionality

### 📝 Review Management

- Create, read, update, and delete reviews
- Rate movies from 0 to 10
- Like/unlike reviews
- View reviews by movie or author

### 👥 User Profiles

- Personalized user profiles
- View user's reviews and activity
- Edit profile information
- Upload profile pictures via Cloudinary

### 🌍 Communities

- Create and join communities
- Follow/unfollow communities
- Community-specific movie discussions
- Top communities showcase

### 🎬 TMDB Integration

- Real-time movie data from The Movie Database
- Movie posters, trailers, and details
- Search functionality
- Popular, top-rated, and upcoming movies

## 🚀 **Deployment**

The application is ready to deploy on:

- **Netlify** (Recommended for React apps)
- **Vercel** (Excellent Vite support)
- **GitHub Pages**
- Any static hosting service

### Environment Variables in Production

Make sure to configure these environment variables in your hosting platform:

- `VITE_APP_API_URL` - Your backend API URL
- `VITE_APP_TMDB_API_KEY` - TMDB API key
- `VITE_APP_TMDB_API_IMG_URL` - TMDB image base URL

## 🐛 **Troubleshooting**

### Connection Issues

- Verify that `VITE_APP_API_URL` is correctly set in your `.env` file
- Check that your backend server is running
- Ensure CORS is properly configured on the backend

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TMDB API Issues

- Verify `VITE_APP_TMDB_API_KEY` is set correctly
- Check TMDB API rate limits
- Ensure `VITE_APP_TMDB_API_IMG_URL` is correct

## 📽️ **About the Developers**

### Lucas Lelieur

**Full Stack Developer** with a background in the creative and entertainment industries. After several years managing digital projects for brands like Sony Pictures and Cine Yelmo, he now focuses on crafting intuitive, user-centric web applications. His hybrid profile combines technical precision with strategic thinking.

_"I created PICKUP to merge my passion for cinema and technology, crafting a digital space where users can express and discover through stories."_

### Aaron Ferrer

**Full Stack Developer** passionate about creating engaging web experiences. Specialized in modern web technologies and user-centered design.

## 💡 **Credits**

Developed by:

- <a href="https://github.com/Lelieur">Lucas Lelieur</a>
- <a href="https://github.com/AaronFerrer-VLC">Aaron Ferrer</a>

## 📄 **License**

This project is private and protected by copyright.

---

<p align="center">
  <img src="https://res.cloudinary.com/lucaslelieur/image/upload/v1742816384/PICKUP_MockUp_pl3si8.png" alt="PICKUP MockUp">
</p>

<p align="center">
  <strong>Developed with ❤️ for film lovers</strong>
</p>
