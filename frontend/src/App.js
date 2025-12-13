import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import GestionProductos from './components/GestionProductos.jsx';

function App() {
  
  return (
    <Router>
      <Container>
        <Header/> 
        <Routes>
          <Route path="/" element={<GestionProductos/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
