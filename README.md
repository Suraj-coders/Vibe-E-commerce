🛒 Vibe E-commerce — MERN Stack Project

A full-stack e-commerce web application built with React (Vite), Tailwind CSS, Node.js, Express, and MongoDB.
Users can browse products, manage carts, and complete the checkout process with a modern UI and API-driven backend.

📁 Project Structure
Vibe-Ecommerce/
├── backend/        # Node.js + Express + MongoDB API
├── frontend/       # React + Tailwind CSS (Vite)
└── README.md       # This file

🚀 Features

✅ Browse products and categories
✅ Add/remove products from cart
✅ Checkout functionality
✅ Responsive UI using Tailwind CSS
✅ RESTful backend API
✅ Mongoose models for clean database design
✅ Environment variable setup for flexibility

🧩 Tech Stack

Frontend:

React (Vite)

Tailwind CSS

Axios


Backend:

Node.js + Express

MongoDB + Mongoose

dotenv, cors, nodemon

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/vibe-ecommerce.git
cd vibe-ecommerce

2️⃣ Setup Backend
cd backend
npm install

Create a .env file in the backend/ folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the backend:

node server.js

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev


App runs at:
👉 http://localhost:5173


📦 Folder Details
/backend

Handles:

Product and Category APIs

Checkout endpoint

MongoDB connection via Mongoose

/frontend

Handles:

React pages (Home, Cart, Checkout)

Components (Header, ProductCard, etc.)

API requests using fetch

