import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/:username" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
