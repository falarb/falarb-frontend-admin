import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

export default function Template() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [verificado, setVerificado] = useState(false); // indica que o token já foi checado
  const navegacao = useNavigate();
  const tokenAdminSolicitaAi = localStorage.getItem("tokenAdminSolicitaAi");

  // Fecha o menu automaticamente em telas grandes
  useEffect(() => {
    if (window.innerWidth > 1000 && menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, []);

  // Verifica o token e redireciona se inválido
  useEffect(() => {
    if (
      !tokenAdminSolicitaAi ||
      tokenAdminSolicitaAi === "undefined" ||
      tokenAdminSolicitaAi === "null" ||
      tokenAdminSolicitaAi.trim() === ""
    ) {
      localStorage.removeItem("tokenAdminSolicitaAi");
      navegacao("/"); // redireciona corretamente
    } else {
      setVerificado(true); // token válido, podemos renderizar
    }
  }, [tokenAdminSolicitaAi, navegacao]);

  // Enquanto o token não for verificado, mostra nada ou loading
  if (!verificado) {
    return null; // ou <div>Carregando...</div>
  }

  return (
    <div>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Menu menuIsOpen={menuIsOpen} />
      <MainContainer menuIsOpen={menuIsOpen}>
        <Outlet />
      </MainContainer>
    </div>
  );
}
