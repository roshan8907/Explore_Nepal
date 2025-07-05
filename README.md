# 🌄 Explore Nepal

**Explore Nepal** is a full-stack travel web application designed to help travelers explore the beauty of Nepal — from trekking routes to cultural heritage, all in one place. Whether you're planning a trek through the Himalayas or browsing local tour packages, Explore Nepal simplifies the journey.

---

## 🏆 Project Status

✅ Completed and graded **A+** in final academic project  
🎯 Actively seeking feedback and suggestions

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML, CSS, Bootstrap
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js, express-session
- **Deployment**: Localhost (can be deployed to Heroku or Render)

---

## ✨ Features

- 🥾 **Trekking Planner**: Customize and plan your own trekking routes  
- 🧭 **Tour Packages**: View curated tour listings with descriptions and images  
- 👤 **User Dashboard**: Login and register with role-based access  
- 💬 **Feedback System**: Leave reviews and read feedback from other travelers  
- 🖼 **Photo Gallery**: Browse beautiful photos of the Himalayas and Nepalese culture  

---

## 📁 Folder Structure

Explore-Nepal/
│
├── models/ # Mongoose models (User, Package, Feedback, etc.)
│ ├── user.js
│ ├── package.js
│ └── feedback.js
│
├── routes/ # Express routes
│ ├── auth.js
│ ├── dashboard.js
│ ├── trekking.js
│ └── feedback.js
│
├── views/ # EJS templates
│ ├── partials/
│ ├── home.ejs
│ ├── login.ejs
│ ├── register.ejs
│ ├── dashboard.ejs
│ ├── trekking-planner.ejs
│ └── gallery.ejs
│
├── public/ # Static files (CSS, JS, images)
│ ├── css/
│ └── images/
│
├── app.js # Main server file
├── package.json # Node dependencies
└── README.md # Project documentation




---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/explore-nepal.git
cd explore-nepal




npm install








MONGODB_URI=mongodb://localhost:27017/explore-nepal
SESSION_SECRET=yourSecretKey




node app.js



