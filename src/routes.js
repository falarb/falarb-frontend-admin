import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';

import Template from './pages/Template';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';

import Requests from './pages/Requests'; 
import ViewRequest from './pages/Requests/ViewRequest';
import EditRequest from './pages/Requests/EditRequest';

import Users from "./pages/Users";
import ViewUser from "./pages/Users/ViewUser";
import AddUser from "./pages/Users/AddUser";

import Communities from "./pages/Communities";
import ViewCommunity from "./pages/Communities/ViewCommunity";
import EditCommunity from "./pages/Communities/EditCommunity";
import AddCommunity from "./pages/Communities/AddCommunity";

import Administrators from "./pages/Administrators";
import ViewAdministrator from "./pages/Administrators/ViewAdministrator";
import EditAdministrator from './pages/Administrators/EditAdministrator';
import AddAdministrator from './pages/Administrators/AddAdministrator';

import Reports from './pages/Reports';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/administracao" element={<Template />}>

            <Route index element={<Dashboard/>} />
            <Route path="solicitacoes" element={<Requests />} />
            <Route path="solicitacao/:id" element={<ViewRequest />} />
            <Route path="solicitacao/editar/:id" element={<EditRequest />} />

            <Route path="usuarios" element={<Users />} />
            <Route path="usuario/:id" element={<ViewUser />} />
            
            <Route path="usuario/cadastrar" element={<AddUser />} />

            <Route path="comunidades" element={<Communities />} />
            <Route path="comunidade/:id" element={<ViewCommunity />} />
            <Route path="comunidade/editar/:id" element={<EditCommunity />} />
            <Route path="comunidade/cadastrar" element={<AddCommunity />} />

            <Route path="administradores" element={<Administrators />} />
            <Route path="administrador/:id" element={<ViewAdministrator />} />
            <Route path="administrador/editar/:id" element={<EditAdministrator />} />
            <Route path="administrador/cadastrar/" element={<AddAdministrator />} />

            <Route path="relatorios" element={<Reports />} />
          </Route>

          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/*---------------------------------------*/

/*
ROTAS PÚBLICAS - BACKEND

POST /login
POST /esqueci-senha
POST /admin

GET  /comunidades/

POST /cidadaos/
POST /cidadaos/envia-token/{id}
POST /cidadaos/verifica-email/{id}
GET  /cidadaos/email-existe

POST /solicitacoes/
GET  /solicitacoes/busca-por-token/{token}

GET  /categorias/
*/

/*---------------------------------------*/ 

/*
Rotas Protegidas (auth:sanctum)
POST /logout

# Administradores
GET  /administradores/
GET  /administradores/{id}

# Categorias
POST   /categorias/
GET    /categorias/{id}
PUT    /categorias/{id}
DELETE /categorias/{id}

# Comunidades
GET    /comunidades/{id}
POST   /comunidades/
PUT    /comunidades/{id}
DELETE /comunidades/{id}

# Cidadãos
GET  /cidadaos/
GET  /cidadaos/{id}
PUT  /cidadaos/{id}

# Modificações
GET    /modificacoes/
POST   /modificacoes/
GET    /modificacoes/{id}
PUT    /modificacoes/{id}
DELETE /modificacoes/{id}

# Solicitações
GET    /solicitacoes/
GET    /solicitacoes/{id}
PUT    /solicitacoes/{id}
DELETE /solicitacoes/{id}

# Dashboard
GET /dashboard/indicadores

# Relatórios
GET /relatorios/geral

*/
