import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';
import ProblemList from './components/ProblemList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/:username" element={<Home />} />
        <Route path="/:username/problems" element = {<ProblemList/>} />
      </Routes>
    </Router>
  );
};

export default App;
