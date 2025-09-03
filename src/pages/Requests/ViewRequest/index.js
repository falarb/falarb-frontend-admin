import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/http";

import Loading from "../../../components/Loading";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Modal from "../../../components/Modal";
import TitleClipPages from "../../../components/TitleClipPages";
import SelectStatus from "../../../components/Select/SelectStatus";

import "./styles.css";

export default function VisualizarSolicitacao() {
  const [solicitacao, setSolicitacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalDelete, setAbrirModalDelete] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/solicitacoes/${id}`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const { data } = resposta;
        console.log("Dados recebidos:", data);
        setSolicitacao(data);
      } catch (erro) {
        setError(erro.message || "Erro desconhecido");
        console.error(erro);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const inativarSolicitacao = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(`/solicitacoes/${id}`, {
        status: "inativo",
      });

      if (resposta.status !== 200) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }

      alert("Solicitação inativada com sucesso!");
    } catch (erro) {
      setError("Erro ao inativar a solicitação.");
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  // loading
  if (loading) return <Loading />;

  // erro
  if (error) return <div>Erro: {error}</div>;

  // nenhum dado
  if (!solicitacao) return <div>Nenhuma solicitação encontrada.</div>;

  return (
    <div>
      <TitleClipPages title={`Solicitação ID: ${solicitacao?.id}`} />

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => navigate(-1)}
          title="Voltar para a listagem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#344054"
          >
            {" "}
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />{" "}
          </svg>
        </BtnSecundary>

        <BtnPrimary
          title="Fazer download do comprovante da solicitação"
          adicionalClass="btn-svg"
          onClick={() => alert("imprimeeeeee")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            {" "}
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />{" "}
          </svg>
        </BtnPrimary>

        <BtnPrimary
          title="Ver localização no Google Maps"
          adicionalClass="roxo btn-svg"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${solicitacao?.latitude},${solicitacao?.longitude}`,
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" />
          </svg>
        </BtnPrimary>

        <BtnPrimary
          title="Editar solicitação"
          adicionalClass="warning btn-svg"
          onClick={() => navigate(`/administracao/solicitacao/editar/${id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </BtnPrimary>

        <BtnPrimary
          title="Inativar solicitação"
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
            {" "}
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />{" "}
          </svg>
        </BtnPrimary>

        {mostrarModalDelete && (
          <Modal
            type="danger"
            title="Excluir solicitação"
            description="Você solicitou excluir essa solicitação. Essa alteração não pode ser desfeita. Você tem certeza?"
            onConfirm={() => {
              alert("Delete");
              setAbrirModalDelete(false);
              navigate(-1);
            }}
            onCancel={() => setAbrirModalDelete(false)}
          />
        )}
      </div>

      <div>
        <div className="box-info">
          <span className="font-size-p">Data da solicitação</span>
          <p className="font-size-m">
            {solicitacao?.created_at &&
              new Date(solicitacao.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }) +
                " às " +
                new Date(solicitacao.created_at).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
          </p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Status atual</span>
          <p className="font-size-m">{solicitacao?.status}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Solicitante</span>
          <p className="font-size-m">{solicitacao?.cidadao?.nome}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">CPF</span>
          <p className="font-size-m">{solicitacao?.cidadao?.cpf}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Email</span>
          <p className="font-size-m">{solicitacao?.cidadao?.email}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Celular</span>
          <p className="font-size-m">{solicitacao?.cidadao?.telefone}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Descrição da solicitação</span>
          <p className="font-size-m">{solicitacao?.descricao}</p>
        </div>

        <div className="box-info">
          <span className="font-size-p">Geolocalização</span>
        </div>

        <div className="box-geolocalizacao">
          <div className="box-info">
            <span className="font-size-p">Latitude</span>
            <p className="font-size-m">{solicitacao?.latitude}</p>
          </div>
          <div className="box-info">
            <span className="font-size-p">Longitude</span>
            <p className="font-size-m">{solicitacao?.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
