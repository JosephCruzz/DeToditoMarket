import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import GestionProductos from './components/GestionProductos.jsx';
import GestionUsuarios from './components/GestionUsuarios.jsx';
import GestionProveedores from './components/GestionProveedores.jsx';
import Auditoria from './components/Auditoria.jsx';
import MiPerfil from './components/MiPerfil.jsx';
import ReportesVentas from './components/ReportesVentas.jsx';
import ReportesCompras from './components/ReportesCompras.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  return (
    <Router>
      <Container>
        <ToastContainer></ToastContainer>
        <Header/> 
        <Routes>
          <Route path="/" element={<GestionProductos/>}/>
          <Route path="/gestion/productos" element={<GestionProductos/>}/>
          <Route path="/gestion/usuarios" element={<GestionUsuarios/>}/>
          <Route path="/gestion/proveedores" element={<GestionProveedores/>}/>
          <Route path="/reportes/auditoria" element={<Auditoria/>}/> 
          <Route path="/reportes/ventas" element={<ReportesVentas/>}/> 
          <Route path="/reportes/compras" element={<ReportesCompras/>}/> 
          <Route path="/perfil/:id" element={<MiPerfil/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
