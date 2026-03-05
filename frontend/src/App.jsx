import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Feed from './pages/Feed';
import Body from './components/Body';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>

          <Route index element={<Feed />} />        {/* 👈 shows at "/" */}

          <Route index element={<Login />} />        {/* 👈 shows at "/" */}
          <Route path="/login" element={<Login />} />
          <Route path="/feed"  element={<Feed />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;