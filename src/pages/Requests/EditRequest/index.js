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
import InputText from "../../../components/Input/InputText";
import { status } from "../../../components/Charts/PieCharts/status";

export default function EditarSolicitacao() {
  const [solicitacao, setSolicitacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalEdit, setAbrirModalEdit] = useState(false);

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

  const lidandoComAlteracoes = (evento) => {
    const { name, value } = evento.target;
    setSolicitacao((prevSolicitacao) => ({
      ...prevSolicitacao,
      [name]: value,
    }));
  };

  const salvarSolicitacao = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(`/solicitacoes/${id}`, {
        status: solicitacao.status,
        anotacoes: solicitacao.anotacoes,
      });

      if (resposta.status !== 200) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
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
          title="Voltar"
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
          title="Salvar alterações"
          adicionalClass="success btn-svg"
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

        <SelectStatus
          name="status"
          value={solicitacao?.status}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        >
          <option value="em_aberto">Em aberto</option>
          <option value="agendada">Agendada</option>
          <option value="concluida">Concluída</option>
          <option value="indeferida">Infererida</option>
        </SelectStatus>

        {mostrarModalEdit && (
          <Modal
            type="warning"
            title="Editar solicitação"
            description="Você solicitou editar os dados essa solicitação. Você tem certeza?"
            onConfirm={() => {
              alert("Delete");
              setAbrirModalEdit(false);
              navigate(-1);
            }}
            onCancel={() => setAbrirModalEdit(false)}
          />
        )}
      </div>

      <div>
        <InputText
          label="Anotações da solicitação"
          type="text"
          name="anotacoes"
          value={solicitacao?.anotacoes || ""}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
          placeholder="Adicione as anotações aqui..."
          required="true"
        />

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
          <span className="font-size-p">Solicitação</span>
          <p className="font-size-m">{solicitacao?.categoria?.nome}</p>
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
