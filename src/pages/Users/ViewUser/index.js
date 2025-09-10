import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../utils/api";
import html2canvas from "html2canvas";

import Modal from "../../../components/Modal";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Erro from "../../../components/Message/Erro";
import Loading from "../../../components/Loading";
import TitleClipPages from "../../../components/TitleClipPages";
import MiniDashboardUser from "../../../components/MiniDashboardUser";

import "./styles.css";

export default function ViewUser() {
  const [cidadao, setCidadao] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const listarCidadao = async () => {
      setError(null);
      setLoading(true);

      try {
        const resposta = await api.get(`/cidadaos/${id}`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta;
        setCidadao(dados?.data || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar cidadão");
        setCidadao([]);
      } finally {
        setLoading(false);
      }
    };

    const listarSolicitacoesCidadao = async () => {
      setError(null);
      setLoading(true);

      try {
        const resposta = await api.get(`/dashboard/indicadores?id_cidadao=${id}`);
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

    listarCidadao();
    listarSolicitacoesCidadao();
  }, [id]);

  const inativarCidadao = async () => {
    try {
      setLoading(true);
      setError(null);

      const resposta = await api.delete(`/cidadaos/${id}`);

      return resposta.data;
    } catch (erro) {
      console.error(erro);
      setError("Erro ao inativar cidadão.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const baixarComprovante = async () => {
    const element = document.getElementById("container-info-user");
    if (!element) return;

    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "cidadao.png";
    link.click();
  };
  // loading
  if (loading) return <Loading />;

  // erro
  if (error) return <Erro mensagem={error + error?.mensagem} />;

  // nenhum dado
  if (!cidadao) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      <TitleClipPages title={`Usuário CPF ${cidadao?.cpf}`} />

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
          adicionalClass="btn-svg"
          onClick={() => {
            baixarComprovante();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </BtnPrimary>

        <BtnPrimary
          adicionalClass="roxo btn-svg"
          onClick={() => {
            navigate("/administracao/solicitacoes", { state: { cidadao: id } });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
          </svg>
        </BtnPrimary>

        <BtnPrimary
          adicionalClass="warning btn-svg"
          onClick={() => {
            navigate(`/administracao/usuario/editar/${cidadao.id}`);
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
            setModalDeleteAberto(true);
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

        {modalDeleteAberto && (
          <Modal
            type="danger"
            title="Excluir solicitação"
            description={`Você solicitou excluir esse usuário. Essa alteração não pode ser desfeita. Você tem certeza?`}
            onConfirm={() => {
              inativarCidadao();
              setModalDeleteAberto(false);
              navigate(-1);
            }}
            onCancel={() => {
              setModalDeleteAberto(false);
            }}
          />
        )}
      </div>

      <div className="container-info-user" id="container-info-user">
        <div className="box-info">
          <label className="font-size-p">Dados do cidadão com nome</label>
          <p className="font-size-m">{cidadao?.nome}</p>
        </div>

        <div className="box-info">
          <label className="font-size-p">CPF</label>
          <p className="font-size-m">{cidadao?.cpf}</p>
        </div>

        <div className="box-info">
          <label className="font-size-p">Email</label>
          <p className="font-size-m">{cidadao?.email}</p>
        </div>

        <div className="box-info">
          <label className="font-size-p">Telefone</label>
          <p className="font-size-m">{cidadao?.cpf}</p>
        </div>
      </div>
    </div>
  );
}
