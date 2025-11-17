import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import GestionProductos from './components/GestionProductos.jsx';
import GestionUsuarios from './components/GestionUsuarios.jsx';
import GestionProveedores from './components/GestionProveedores.jsx';

function App() {
  
  return (
    <Router>
      <Container>
        <Header/> 
        <Routes>
          <Route path="/" element={<GestionProductos/>}/>
          <Route path="/gestion/productos" element={<GestionProductos/>}/>
          <Route path="/gestion/usuarios" element={<GestionUsuarios/>}/>
          <Route path="/gestion/proveedores" element={<GestionProveedores/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
