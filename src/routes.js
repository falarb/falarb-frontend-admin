import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/Template';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';
import Solicitacoes from './pages/Solicitacoes'; 
import VisualizarSolicitacao from './pages/Solicitacoes/VisualizarSolicitacao';
import EditarSolicitacao from './pages/Solicitacoes/EditarSolicitacao';
import Usuarios from "./pages/Usuarios";
import VisualizarUsuario from "./pages/Usuarios/VisualizarUsuario"
import EditarUsuario from "./pages/Usuarios/EditarUsuario"
import CadastrarUsuario from "./pages/Usuarios/CadastrarUsuario"
import Comunidades from "./pages/Comunidades";
import VisualizarComunidade from "./pages/Comunidades/VisualizarComunidade";
import EditarComunidade from "./pages/Comunidades/EditarComunidade";
import CadastrarComunidade from "./pages/Comunidades/CadastrarComunidade";
import Administradores from "./pages/Administradores";
import VisualizarAdministrador from "./pages/Administradores/VisualizarAdministrador";
import EditarAdministrador from './pages/Administradores/EditarAdministrador';
import CadastrarAdministrador from './pages/Administradores/CadastrarAdministrador';
import Relatorios from './pages/Relatorios';

function App() {
  return (
<>
  <BrowserRouter>

    <Routes>
      {/* Rotas com Template */}
      <Route path="/" element={<Template />}>
        <Route index element={<Dashboard />} />
        <Route path="solicitacoes" element={<Solicitacoes />} />
        <Route path="solicitacao/:id" element={<VisualizarSolicitacao />} />
        <Route path="solicitacao/editar/:id" element={<EditarSolicitacao />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuario/:id" element={<VisualizarUsuario />} />
        <Route path="usuario/editar/:id" element={<EditarUsuario />} />
        <Route path="usuario/cadastrar" element={<CadastrarUsuario />} />
        <Route path="administradores" element={<Administradores />} />
        <Route path="comunidades" element={<Comunidades />} />
        <Route path="comunidade/:id" element={<VisualizarComunidade />} />
        <Route path="comunidade/editar/:id" element={<EditarComunidade />} />
        <Route path="comunidade/cadastrar" element={<CadastrarComunidade />} />
        <Route path="administradores" element={<Administradores />} />
        <Route path="administrador/:id" element={<VisualizarAdministrador />} />
        <Route path="administrador/editar/:id" element={<EditarAdministrador />} />
        <Route path="administrador/cadastrar/" element={<CadastrarAdministrador />} />
        <Route path="relatorios" element={<Relatorios />} />
      </Route>

      {/* 404 fora do Template */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
</>
  );
}

export default App;
