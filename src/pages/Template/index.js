import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Loading from "../../components/Loading";

export default function Template() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const navegacao = useNavigate();
  const tokenAdminSolicitaAi = localStorage.getItem("tokenAdminSolicitaAi");

  useEffect(() => {
    if (window.innerWidth > 1000 && menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (
      !tokenAdminSolicitaAi ||
      tokenAdminSolicitaAi === "undefined" ||
      tokenAdminSolicitaAi === "null" ||
      tokenAdminSolicitaAi.trim() === ""
    ) {
      localStorage.removeItem("tokenAdminSolicitaAi");
      navegacao("/");
    } else {
      setVerificado(true);
    }
  }, [tokenAdminSolicitaAi, navegacao]);

  if (!verificado) {
    return <Loading />;
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
