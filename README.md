# Spotify Analytics

A beautiful, premium web application built with SvelteKit, Tailwind CSS, and Skeleton UI that connects to your Spotify account to provide in-depth analytics of your listening data.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- A Spotify Developer account and an registered app.

### 1. Installation
Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables
You need to set up your environment variables to connect to the Spotify API. 

1. Create a `.env` file in the root directory (or use the existing one).
2. Add the following variables:

```env
PUBLIC_CLIENT_ID="your_spotify_client_id_here"
PUBLIC_REDIRECT_URI="http://127.0.0.1:3000/callback"
```

**How to get these values:**
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create an App.
3. Copy the **Client ID** and paste it as `PUBLIC_CLIENT_ID`.
4. In your app settings, add `http://127.0.0.1:3000/callback` to the **Redirect URIs** list.

### 3. Developing

Start the development server:

```bash
npm run dev
```

The application will be available at `http://127.0.0.1:3000`.

## Tech Stack
- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [Skeleton UI](https://www.skeleton.dev/)
- **Authentication**: Spotify API with PKCE flow
