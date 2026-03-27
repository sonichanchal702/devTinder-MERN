# DevTinder

- create the react + vite
- remove the unneccessary code from the from index.css and app.jsx
- install the Tailwind CSS
- install the DaisyUI
- add the Navbar component to the app.jsx 
- login.jsx (using card & input) 
- apply hooks in the login.jsx
- Install react-router-dom
- use <BrowserRouter>, <Routes> for routing
- CORS install in backend(app.js) & Axios in fronted(app.jsx) & also set up the Middleware in backend(authMiddleware.js) concepts for communication in frontend and backend URL -> configuration (origin URL & credincial: true) in CORS and axios
- install - npm install @reduxjs/toolkit react-redux -> 2-library
- Redux- utils/redux/appStore.js; utils/redux/userSlice.js --> for store the data and congigure data, instead of use PROS URL again n again
- add Redux devTool Extension to the browser for store the data and see that data
- added the fetch() for axios-get the data on body pg-> body.jsx 

- 🚀 Features Completed

1. Navbar — Logo left, links right, active state, glassmorphism effect
2. Login/Signup — Form validation, JWT auth, Redux state management
3. Feed Page — Developer cards with Like/Ignore buttons
4. UserCard — Photo, name, age, gender, about, action buttons
5. Connections Page — Matched developers list
6. Requests Page — Pending connection requests with Accept/Reject
7. Profile Edit — Update name, photo, bio, skills

🐛 Bugs Fixed

1. Double path issue /users/users/ → /users/
2. JWT token field mismatch userId → _id
3. sameSite: "lax" cookie fix
4. bio → about field name fix
5. Missing export default in components
6. firstName/lastName schema fix

- add chat, fix connections, requests, profile edit and socket.io setup

# payment.js /primium.jsx 
Payment gateway integrate kiya tha Razorpay se, mock mode mein hai — production mein real keys lagani hain!