# Taska - Frontend Client

This is the frontend application for **Taska**, a modern and elegant personal task manager built with React and Vite.

## 🚀 Getting Started

Follow these steps to set up the frontend on your local machine.

### Prerequisites
- **Node.js** (v20 or higher recommended)
- **npm** (comes with Node.js)

### Installation

Since this project is set up as a mono-repo using npm workspaces, you don't need to install dependencies in this folder directly.

1. **Open a terminal** and navigate to the **root** folder of the project.
2. Run the following command to install dependencies for both the frontend and backend simultaneously:
   ```bash
   npm install
   ```

### Running the App

1. Ensure your backend server is running (see the Backend README).
2. From the **root** folder of the project, start the frontend development server:
   ```bash
   npm run dev:client
   ```
   *Alternatively, you can run `npm run dev` from the root to start both servers at the same time.*
3. Open your browser and navigate to `http://localhost:3000` (or the port Vite provides in your terminal).

---

## 🛠️ Tech Stack & Architecture

- **React 18**: Core UI library.
- **Vite**: Ultra-fast build tool and development server.
- **Axios**: Used to make HTTP requests to the backend API.
- **react-hot-toast**: Used for elegant, non-intrusive toast notifications.
- **Custom CSS**: Built entirely with custom CSS (Vanilla CSS) using modern design principles like glassmorphism and liquid animations.

### Vite Proxy Setup
To avoid CORS (Cross-Origin Resource Sharing) issues during development, this project is configured with a Vite proxy. 
In `vite.config.ts`, any request made to `/api` is automatically proxied to `http://localhost:5000` (the default backend port). This allows the frontend to communicate with the backend seamlessly as if they were running on the same domain without any CORS blockages.

---

## ⚠️ Assumptions & Limitations

1. **Backend Port**: The frontend assumes the backend is running locally on port `5000`. If you change the backend port, you must also update the `proxy` setting in `vite.config.ts`.
2. **Client-side Filtering**: The filter bar (All / Active / Done) operates entirely on the client side. This is fast and works perfectly for personal task management, but if the task list grew to thousands of items, server-side filtering might be required.
3. **Optimistic Updates**: The UI assumes that backend operations will succeed and updates the screen instantly. If a network failure occurs, the UI handles rolling back to its previous state and gracefully shows an error toast.
