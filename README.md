<div align="center">

<img src="https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/feed.png" alt="Vibe Banner" width="100%" style="border-radius:12px"/>

<br/><br/>

# 🔥 Vibe — Find Your Tribe

**A matching platform for developers, creators, founders & athletes.**
**Swipe. Connect. Build together.**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-vibe--app.vercel.app-6366f1?style=for-the-badge)](https://vibe-app-xyz.vercel.app)
[![Backend](https://img.shields.io/badge/⚡%20API-Render-46E3B7?style=for-the-badge)](https://vibe-app-dzwr.onrender.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Chanchal%20Soni-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/chanchal-soni-7528b9317/)
[![GitHub](https://img.shields.io/badge/GitHub-sonichanchal702-181717?style=for-the-badge&logo=github)](https://github.com/sonichanchal702)

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## 📌 What is Vibe?

**Vibe** is a production-deployed full-stack web application where ambitious people — developers, creators, founders, athletes — discover each other, send connection requests, and once matched, chat in real time.

Think Tinder, but built for people who ship things.

Built solo from scratch: database schema → REST API → Redux state → WebSocket chat → Razorpay payments → CI/CD deployment across Vercel + Render + MongoDB Atlas.

> ⚠️ Render free tier cold-starts after inactivity — first API call may take ~30s.

---

## 📸 Screenshots

| Feed | Profile |
|---|---|
| ![Feed](https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/feed.png) | ![Profile](https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/profile.png) |

| Real-time Chat | Connection Requests | Premium |
|---|---|---|
| ![Chat](https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/chat.png) | ![Requests](https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/connectionRequest.png) | ![Premium](https://raw.githubusercontent.com/sonichanchal702/Vibe_Hustlers_Networking_Platform/main/frontend/public/screenshots/primium.png) |

---

## ✨ Features

### Core Product
- 🔐 **JWT Auth** — login/signup with bcrypt hashing, HTTP-only cookie sessions
- 👤 **Rich Profiles** — name, bio, skills, user type, GitHub & LinkedIn links, photo
- 💘 **Swipe Matching** — send `interested` or `ignored` requests; mutual acceptance creates a connection
- 💬 **Real-time Chat** — Socket.io WebSocket messaging with emoji picker, history persisted in MongoDB
- 💳 **Premium Tier** — Razorpay payment flow to unlock unlimited connections
- 🛡️ **Protected Routes** — auth-guarded navigation on both frontend and backend

### UI & Engineering
- 🎨 **Glassmorphism Dark UI** — custom built with Tailwind CSS v4 + DaisyUI v5
- 🌀 **Framer Motion** — page transitions, card animations, micro-interactions
- 🗃️ **Redux Toolkit** — global state for auth, feed, connections, and chat
- ⚡ **Vite 7** — sub-second HMR, optimised production build
- 📱 **Responsive** — mobile-first across all breakpoints
- 🌍 **Production Deployed** — GitHub → Vercel (frontend) + Render (backend) CI/CD

---

## 🛠 Tech Stack

### Frontend
| Tech | Role |
|---|---|
| React 19 | UI framework |
| Redux Toolkit | Global state management |
| React Router v7 | Client routing + protected routes |
| Axios | HTTP client (`withCredentials` for cookies) |
| Socket.io-client | Real-time WebSocket connection |
| Framer Motion | Animations and page transitions |
| Tailwind CSS v4 + DaisyUI v5 | Styling and components |
| Vite 7 | Build tool |

### Backend
| Tech | Role |
|---|---|
| Node.js + Express 5 | REST API server |
| Socket.io | WebSocket server |
| MongoDB + Mongoose | Database and ODM |
| JWT + bcryptjs | Auth and password security |
| cookie-parser | HTTP-only cookie sessions |
| Razorpay SDK | Payment order + verification |
| Nodemailer | Transactional email |
| Validator.js | Input sanitisation |

### Infrastructure
| Service | Role |
|---|---|
| MongoDB Atlas | Cloud database (M0 cluster) |
| Render | Backend Node.js Web Service |
| Vercel | Frontend — Vite/React + SPA rewrite |
| GitHub | Version control + auto-deploy |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────┐
│              Browser — Vercel CDN                │
│   React 19 · Redux · Framer Motion · Vite 7     │
└──────────────────┬───────────────────────────────┘
                   │  HTTPS  (REST API)
                   │  WSS    (Socket.io)
                   ▼
┌──────────────────────────────────────────────────┐
│           API Server — Render                    │
│   Express 5 · Socket.io · JWT Middleware        │
│   Dynamic CORS from env · cookie-parser         │
└──────────────────┬───────────────────────────────┘
                   │  Mongoose ODM
                   ▼
┌──────────────────────────────────────────────────┐
│         MongoDB Atlas — Cloud                    │
│   users · connectionrequests · chats            │
└──────────────────────────────────────────────────┘
```

**Request lifecycle:**
1. Login → JWT signed → set as HTTP-only cookie
2. Every Axios request sends cookie automatically (`withCredentials: true`)
3. `userAuth` middleware validates JWT on all protected routes
4. On login, Socket.io connection opens → user joins private room
5. Messages saved to MongoDB + broadcast to room participants instantly

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB local or Atlas URI

```bash
git clone https://github.com/sonichanchal702/Vibe_Hustlers_Networking_Platform.git
cd Vibe_Hustlers_Networking_Platform
```

### Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/devtinder
JWT_SECRET=your_secret_here
ALLOWED_ORIGINS=http://localhost:5173
```

```bash
npm run dev       # nodemon → http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/users
VITE_SOCKET_URL=http://localhost:8080
```

```bash
npm run dev       # Vite → http://localhost:5173
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/signup` | ❌ | Register new user |
| POST | `/users/login` | ❌ | Login → sets JWT cookie |
| POST | `/users/logout` | ✅ | Clear session |

### Profile
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users/profile/view` | ✅ | Get own profile |
| PATCH | `/users/profile/edit` | ✅ | Update profile fields |
| PATCH | `/users/profile/password` | ✅ | Change password |

### Feed & Matching
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users/feed` | ✅ | Paginated discovery feed |
| POST | `/users/request/send/:status/:userId` | ✅ | Send interested / ignored |
| POST | `/users/request/review/:status/:requestId` | ✅ | Accept / reject request |
| GET | `/users/connections` | ✅ | All matched connections |
| GET | `/users/requests/received` | ✅ | Pending incoming requests |

### Payments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/payment/create-order` | ✅ | Create Razorpay order |
| POST | `/users/payment/verify` | ✅ | Verify payment + upgrade user |

### Socket Events
| Event | Direction | Description |
|---|---|---|
| `joinChat` | Client → Server | Join private room |
| `sendMessage` | Client → Server | Send + persist message |
| `messageReceived` | Server → Client | Broadcast to room |

---

## 🚢 Deployment

### MongoDB Atlas
1. Create free M0 cluster → [cloud.mongodb.com](https://cloud.mongodb.com)
2. Database Access → add user (**alphanumeric password only** — special chars break URI)
3. Network Access → `0.0.0.0/0` — required for Render dynamic IPs
4. Connect → Drivers → copy URI → add `/devtinder` before `?`

### Backend → Render
| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node src/app.js` |
| PORT | ❌ Do not set — Render injects automatically |

```
MONGO_URI        = mongodb+srv://...
JWT_SECRET       = long_random_string
ALLOWED_ORIGINS  = https://your-app.vercel.app
```

### Frontend → Vercel
| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework | Vite (auto-detected) |
| Output Directory | `dist` |

```
VITE_API_BASE_URL = https://your-backend.onrender.com/users
VITE_SOCKET_URL   = https://your-backend.onrender.com
```

`vercel.json` for SPA routing (already in repo):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🧩 Engineering Decisions & Challenges

**Socket.io Room Strategy**
Private rooms are keyed by `[userId, targetUserId].sort().join("_")` — sorting guarantees both users always compute the same room ID regardless of who initiates. No separate room record or lookup needed.

**Dynamic CORS for Production**
Hardcoded `localhost` origins in both Express and Socket.io was the first production blocker. Fixed by reading `ALLOWED_ORIGINS` from env as a comma-separated list and using a dynamic validator — supports any number of origins without code changes.

**Case-Sensitive Imports on Linux**
`import Navbar from "./NavBar"` worked on Windows (case-insensitive FS) but crashed Vercel (Linux). Caught by running `vite build` locally — rollup's error pointed to the exact file. Fixed by matching import strings to exact filenames.

**MongoDB URI Auth Failures**
Passwords containing `@`, `#`, or `$` silently break URI parsing — connection fails with a cryptic auth error. Solution: enforce alphanumeric-only passwords, eliminating URL-encoding issues entirely.

**SPA Routing on Vercel**
Direct access to `/feed` returned 404 — Vite's single `index.html` needs all paths rewritten. Fixed with `vercel.json` rewrite rule.

**Redux Stale State**
Feed and connections persisted across user sessions causing data bleed when switching accounts. Fixed by dispatching a full Redux state reset on logout before clearing the cookie.

---

## 🗺 Roadmap

- [ ] GitHub / Google OAuth
- [ ] Profile photo upload via Cloudinary
- [ ] Filter feed by user type / skills / location
- [ ] Push notifications for new matches
- [ ] Video call via WebRTC
- [ ] Mobile app — React Native

---

## 👨‍💻 Author

<div align="center">

**Chanchal Soni**
Full-Stack Developer · BCA · Mandsaur University (CGPA 9.2)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/chanchal-soni-7528b9317/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/sonichanchal702)
[![Live](https://img.shields.io/badge/Live%20App-Visit-6366f1?style=for-the-badge)](https://vibe-app-xyz.vercel.app)

*Built end-to-end solo — schema design, REST API, real-time chat, payment integration, and production deployment.*

<br/>

**If this repo helped you or impressed you, drop a ⭐ — it genuinely helps.**

</div>

---

<div align="center">
<sub>Made with 🔥 by Chanchal Soni · Deployed on Vercel + Render + MongoDB Atlas</sub>
</div>
