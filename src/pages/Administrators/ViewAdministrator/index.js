import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import Modal from "../../../components/Modal";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Erro from "../../../components/Message/Erro";
import Loading from "../../../components/Loading";
import TitleClipPages from "../../../components/TitleClipPages";
import "./styles.css";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

export default function VisualizarAdministrador() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(
    helpConfigs.detalhes_administrador
  );

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get(`/administradores/${id}`);
        setUsuario(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Erro desconhecido ao buscar usuário."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUsuario();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/administradores/${usuario.id}`);
      setModalDeleteAberto(false);
      navigate(-1);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Erro ao deletar usuário."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Erro mensagem={error} />;
  if (!usuario) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="visualizar-administrador-container">
      <TitleClipPages title={`Visualizar usuário ${usuario?.nome}`} />

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#344054"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </BtnSecundary>
        <BtnPrimary
          adicionalClass="warning btn-svg"
          onClick={() => {
            navigate(`/administracao/administrador/editar/${usuario?.id}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
        </BtnPrimary>
      </div>

      {modalDeleteAberto && (
        <Modal
          type="danger"
          title="Excluir usuário"
          description={`Você solicitou excluir o usuário ${usuario.nome}. Esta ação não pode ser desfeita. Tem certeza?`}
          onConfirm={handleDelete}
          onCancel={() => setModalDeleteAberto(false)}
        />
      )}

      <div className="container-info-user">
        <div className="box-info">
          <label className="font-size-p">Dados do administrador com nome</label>
          <p className="font-size-m">{usuario?.nome}</p>
        </div>

        <div className="box-info">
          <label className="font-size-p">Email</label>
          <p className="font-size-m">{usuario?.email}</p>
        </div>

        <div className="box-info">
          <label className="font-size-p">Telefone</label>
          <p className="font-size-m">{usuario?.telefone || "-"}</p>
        </div>
      </div>

      <ModalHelp
        title={helpConfigs.detalhes_administrador.title}
        content={helpConfigs.detalhes_administrador.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
