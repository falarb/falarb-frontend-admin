import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../utils/api";

import Loading from "../../../components/Loading";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Modal from "../../../components/Modal";
import TitleClipPages from "../../../components/TitleClipPages";
import MiniDashboardUser from "../../../components/MiniDashboardUser";
import Erro from "../../../components/Message/Erro";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

import "./styles.css";

export default function VisualizarCategoria() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.detalhes_categoria);

  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalDelete, setAbrirModalDelete] = useState(false);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const listarCategoria = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/categorias/${id}`);
        setCategoria(resposta?.data || []);
        return resposta;
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar categoria");
        setCategoria([]);
      } finally {
        setLoading(false);
      }
    };

    const listarSolicitacoesCategoria = async () => {
      setError(null);
      setLoading(true);

      try {
        const resposta = await api.get(
          `/dashboard/indicadores?categoria_id=${id}`
        );
        const dados = await resposta;
        setDashboard(dados?.data || []);
        console.log(dados.data);
        return dados;
      } catch (err) {
        setError(err.message || "Erro desconhecido");
        setDashboard([]);
      } finally {
        setLoading(false);
      }
    };
    listarCategoria();
    listarSolicitacoesCategoria();
  }, [id]);

  const inativarCategoria = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(`/categorias/${id}`, {
        status: "inativo",
      });
      return resposta;
    } catch (erro) {
      setError("Erro ao inativar a categoria.");
      throw new Error(`Erro: ${erro}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <Erro mensagem={error} />;
  if (!categoria) return <>Nenhum dado encontrado</>;

  return (
    <div>
      {loading && <Loading />}
      {error && `Erro: ${error}`}
      {!categoria && `Nenhum condomínio encontrado`}
      <TitleClipPages title={`Visualização de categoria`} />
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
            navigate(`/administracao/categoria/editar/${categoria.id}`);
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

        <BtnPrimary
          adicionalClass="danger btn-svg"
          onClick={() => {
            setAbrirModalDelete(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </BtnPrimary>

        <div className="container-mini-dashboard-user">
          <MiniDashboardUser
            total={dashboard?.solicitacoes_por_status?.total || 0}
            concluidas={dashboard?.solicitacoes_por_status?.concluida || 0}
            agendadas={dashboard?.solicitacoes_por_status?.agendada || 0}
            analise={dashboard?.solicitacoes_por_status?.analise || 0}
            indeferida={dashboard?.solicitacoes_por_status?.indeferida || 0}
          />
        </div>

        {mostrarModalDelete && (
          <Modal
            type="danger"
            title="Excluir solicitação"
            description={`Você solicitou excluir essa categoria. Essa alteração não pode ser desfeita. Você tem certeza?`}
            onConfirm={() => {
              inativarCategoria();
              setAbrirModalDelete(false);
              navigate(-1);
            }}
            onCancel={() => {
              setAbrirModalDelete(false);
            }}
          />
        )}
      </div>
      <div className="box-info-categoria" style={{ marginTop: 14 }}>
        <span className="font-size-p">Nome</span>
        <p className="font-size-m">{categoria?.nome}</p>
      </div>

      <ModalHelp
        title={helpConfigs.detalhes_categoria.title}
        content={helpConfigs.detalhes_categoria.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />
      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}



