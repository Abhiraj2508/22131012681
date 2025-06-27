// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './pages/shortenerPage';
import StatsPage from './pages/startPage';
import RedirectHandler from './pages/RedirectHandler';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  </Router>
);

export default App;
