# Taska - Backend API

This is the Express.js REST API backend for **Taska**, providing database persistence and task management operations.

## 🚀 Getting Started

Follow these steps to set up the backend server on your local machine.

### Prerequisites
- **Node.js** (v20 or higher recommended)
- **MongoDB**: You need a MongoDB database. You can use a free cloud cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB installation.

### Installation

Since this project uses npm workspaces, you should install dependencies from the root directory.

1. **Open a terminal** and navigate to the **root** folder of the project.
2. Run the following command to install dependencies:
   ```bash
   npm install
   ```

### Database Connection Setup (.env)

Before starting the server, you must provide your MongoDB connection string.

1. Inside this `Backend` folder, create a new file named `.env`.
2. Copy the contents of `.env.example` (if available) or create the variables manually.
3. Add your MongoDB connection string to the `MONGO_URI` variable:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/taska?retryWrites=true&w=majority
   ```
   *Note: Never commit your real `.env` file to version control.*

#### MongoDB Atlas Notes:
- Ensure your IP address is whitelisted in MongoDB Atlas (Network Access -> Add IP Address -> Allow Access from Anywhere `0.0.0.0/0` for development).
- Ensure you replace `<username>` and `<password>` with your actual database user credentials.

### Running the Server

1. From the **root** folder of the project, start the backend server in development mode (using nodemon):
   ```bash
   npm run dev:server
   ```
   *Alternatively, you can run `npm run dev` from the root to start both servers at the same time.*
2. You should see two messages in your terminal indicating success:
   - `Server running on port 5000`
   - `MongoDB Connected: <hostname>`

---

## 📡 API Endpoints

The API is mounted at `/api/todos`.

| Method | Endpoint | Description | Body / Params |
|--------|----------|-------------|---------------|
| `GET` | `/api/todos` | Fetch all tasks (newest first) | None |
| `POST` | `/api/todos` | Create a new task | `{ title: string, description?: string }` |
| `PUT` | `/api/todos/:id` | Update task text | `{ title: string, description?: string }` |
| `PATCH`| `/api/todos/:id/done` | Toggle completion status | URL Param: `id` |
| `DELETE`|`/api/todos/:id` | Delete a task | URL Param: `id` |

---

## ⚠️ Assumptions & Limitations

1. **Authentication**: This API is currently completely open and does not include user authentication or authorization. Anyone who can access the API can view, modify, and delete tasks.
2. **Rate Limiting**: There is currently no rate-limiting implemented, assuming it will be used in a secure, local, or trusted environment.
3. **Database Scalability**: The current `GET /api/todos` endpoint fetches all documents in the collection at once. While perfectly fine for a personal task manager, a production app with thousands of tasks would require pagination.
