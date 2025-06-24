> 🚀 This is a joint project developed by [Monwar Khan](https://github.com/monwark) and [Michael Connor](https://github.com/necrydark).

# 🎬 CineWave

CineWave is a fully responsive, Netflix-inspired streaming web application that provides access to thousands of movies and TV shows. Built with modern web technologies like **Next.js**, **Tailwind CSS**, and **TypeScript**, it offers a sleek user experience with premium features, dynamic content, and smooth UI transitions.

---

## 🔥 Features

- 🔐 **Authentication with Clerk** – Secure sign-up, login, and session handling.
- 💳 **Stripe Subscriptions** – Manage premium memberships with payment integration.
- 🎥 **Streaming with Video APIs** – Access thousands of shows and movies via third-party providers.
- 📡 **TMDB Integration** – Movie and TV show metadata, images, genres, and trailers.
- 🎞️ **Detailed Movie Pages** – Trailers, overviews, cast info, and related content.
- 🔎 **Search & Filter** – Discover content by genre or keyword.
- 🎨 **Framer Motion** – Smooth transitions and animations for an engaging UI.
- ☁️ **Deployed on Vercel** – Optimized for fast, global performance.

---

## 🛠 Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript
- **Authentication:** [Clerk](https://clerk.dev/)
- **Payments:** [Stripe](https://stripe.com/)
- **Content API:** [TMDB API](https://www.themoviedb.org/documentation/api)
- **Deployment:** [Vercel](https://vercel.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 📸 Screenshots

Will add soon

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/cinewave.git
   cd cinewave

   # Install dependencies
   npm i (Node)
   bun install (bun)
   ```

2. **Start the App**
   ```bash
   npm run dev (Node)
   bun dev (bun)
   ```

### Environment Setup

1. **Create a .env file**
   
   - Open the `.env` file and add the following to it
  

   ```env
   TMDB_API_KEY
   NEXT_PUBLIC_TMDB_API_KEY
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **Clerk Setup** (Required for auth)

   - Go To [Clerk](https://clerk.com/)
   - Create a new project
   - Configure your project to allow First and last name
   - Next go to API Keys and quick copy your keys
   - Place them inside the `.env` under their respective variable names
   - Setup Stripe payments inside Clerks dashboard
  
4. **TMDB Setup** (Required for indexing items)

   - Go to [TMDB API](https://developer.themoviedb.org/docs/getting-started)
   - Create an account & register for an API key
   - Copy your API Key not the read access token
   - Fill your TMDB_API_KEY and NEXT_PUBLIC_TMDB_API_KEY with the API Key
  
5. **Supabase Setup**

   - Go To [Supabase](https://supabase.com/)
   - Create a account and a new database
   - Copy the URL and Anon key
   - Fill the respective variable with each key


## Contribute

   If you want to contribute fork the project and push any changes or features onto new branches and then create a PR describing what the change is or the new feature is.

**🤍 The team**



   

