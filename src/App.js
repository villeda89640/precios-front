import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css'; // Asegúrate de importar tu archivo CSS

const App = () => {
  return (
    <Router>
     
      <Header />
    
      <Routes>
        <Route path="/ChecaPrecios/" element={<Home />} />
      </Routes>

      {/* Franja Naranja */}
      <div className="orange-bar"></div>
    </Router>
  );
};

export default App;