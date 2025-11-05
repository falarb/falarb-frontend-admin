import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login from "./pages/Login";

import Template from "./pages/Template";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";

import Requests from "./pages/Requests";
import ViewRequest from "./pages/Requests/ViewRequest";
import EditRequest from "./pages/Requests/EditRequest";
import AddRequest from "./pages/Requests/AddRequest";

import Users from "./pages/Users";
import ViewUser from "./pages/Users/ViewUser";
import EditUser from "./pages/Users/EditUser";
import AddUser from "./pages/Users/AddUser";

import Communities from "./pages/Communities";
import ViewCommunity from "./pages/Communities/ViewCommunity";
import EditarComunidade from "./pages/Communities/EditCommunity";
import AddCommunity from "./pages/Communities/AddCommunity";

import Categorias from "./pages/Categories";
import VisualizarCategoria from "./pages/Categories/ViewCategory";
import EditarCategoria from "./pages/Categories/EditCategory";
import CadastrarCategoria from "./pages/Categories/AddCategory";

import Administrators from "./pages/Administrators";
import ViewAdministrator from "./pages/Administrators/ViewAdministrator";
import EditAdministrator from "./pages/Administrators/EditAdministrator";
import AddAdministrator from "./pages/Administrators/AddAdministrator";

import Reports from "./pages/Reports";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/administracao" element={<Template />}>
                <Route index element={<Dashboard />} />
                <Route path="solicitacoes" element={<Requests />} />
                <Route path="solicitacao/:id" element={<ViewRequest />} />
                <Route path="solicitacao/editar/:id" element={<EditRequest />}/>
                <Route path="solicitacao/cadastrar/" element={<AddRequest />}/>

                <Route path="usuarios" element={<Users />} />
                <Route path="usuario/:id" element={<ViewUser />} />
                <Route path="usuario/editar/:id" element={<EditUser />} />

                <Route path="usuario/cadastrar" element={<AddUser />} />

                <Route path="comunidades" element={<Communities />} />
                <Route path="comunidade/:id" element={<ViewCommunity />} />
                <Route
                  path="comunidade/editar/:id"
                  element={<EditarComunidade />}
                />
                <Route path="comunidade/cadastrar" element={<AddCommunity />} />

                <Route path="categorias" element={<Categorias />} />
                <Route path="categoria/:id" element={<VisualizarCategoria />} />
                <Route
                  path="categoria/editar/:id"
                  element={<EditarCategoria />}
                />
                <Route
                  path="categoria/cadastrar"
                  element={<CadastrarCategoria />}
                />

                <Route path="administradores" element={<Administrators />} />
                <Route
                  path="administrador/:id"
                  element={<ViewAdministrator />}
                />
                <Route
                  path="administrador/editar/:id"
                  element={<EditAdministrator />}
                />
                <Route
                  path="administrador/cadastrar/"
                  element={<AddAdministrator />}
                />

                <Route path="relatorios" element={<Reports />} />
              </Route>
            </Route>

            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
