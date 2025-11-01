import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../utils/api";

import Loading from "../../../components/Loading";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Modal from "../../../components/Modal";
import TitleClipPages from "../../../components/TitleClipPages";
import SelectStatus from "../../../components/Select/SelectStatus";
import InputText from "../../../components/Input/InputText";
import InputDate from "../../../components/Input/InputDate";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

import "./styles.css";
import moment from "moment";
import { formataCpf, formataTelefone } from "../../../utils/functions";

export default function EditarSolicitacao() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step001);

  const [solicitacao, setSolicitacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalEdit, setAbrirModalEdit] = useState(false);
  const [mostrarModalAlterado, setMostrarModalAlterado] = useState(false);
  const [alterado, setAlterado] = useState(false);

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
    setAlterado(true);
    const { name, value } = evento.target;
    setSolicitacao((prevSolicitacao) => ({
      ...prevSolicitacao,
      [name]: value,
    }));
  };

  const salvarSolicitacao = async () => {
    if (!solicitacao) return;
    if (!id) return;
    if (solicitacao.status === "analise") {
      solicitacao.mot_indeferimento = null;
      solicitacao.data_agendamento = null;
      solicitacao.data_conclusao = null;
    } else if (solicitacao.status === "agendada") {
      solicitacao.data_conclusao = null;
      solicitacao.mot_indeferimento = null;
    } else if (solicitacao.status === "concluida") {
      solicitacao.mot_indeferimento = null;
    }

    try {
      setLoading(true);
      setError(null);

      await api.put(`/solicitacoes/${id}`, {
        status: solicitacao.status,
        mot_indeferimento: solicitacao.mot_indeferimento,
        data_agendamento: solicitacao.data_agendamento,
        data_conclusao: solicitacao.data_conclusao,
      });
      navigate('/administracao/solicitacoes');
      setAlterado(false);
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
      <TitleClipPages title={`Código: ${solicitacao?.token_solicitacao}`} />

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => {
            if (alterado) {
              setMostrarModalAlterado(true);
            } else {
              navigate(-1);
            }
          }}
          title="Voltar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#344054"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />{" "}
          </svg>
        </BtnSecundary>

        <BtnPrimary
          title="Salvar alterações"
          adicionalClass="success btn-svg"
          onClick={() => {
            setAbrirModalEdit(true);
          }}
        >
          <span
            class="material-symbols-outlined"
            style={{ color: "#fff", margin: "auto" }}
          >
            save
          </span>
        </BtnPrimary>

        <SelectStatus
          name="status"
          value={solicitacao?.status}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        >
          <option value="analise">Em análise</option>
          <option value="agendada">Agendada</option>
          <option value="concluida">Concluída</option>
          <option value="indeferida">Indeferida</option>
        </SelectStatus>

        {mostrarModalAlterado && (
          <Modal
            type="warning"
            title="Salve suas alterações"
            description="Você tem alterações não salvas. Tem certeza que deseja sair sem salvar?"
            onConfirm={() => navigate(-1)}
            onCancel={() => setMostrarModalAlterado(false)}
          />
        )}

        {mostrarModalEdit && (
          <Modal
            type="warning"
            title="Editar solicitação"
            description="Você solicitou editar os dados essa solicitação. Você tem certeza?"
            onConfirm={() => {
              salvarSolicitacao();
              setAbrirModalEdit(false);
              navigate(-1);
            }}
            onCancel={() => setAbrirModalEdit(false)}
          />
        )}
      </div>

      <div>
        {solicitacao?.status === "indeferida" && (
          <InputText
            label="Adicione o motivo do indeferimento"
            type="text"
            name="mot_indeferimento"
            value={solicitacao?.mot_indeferimento || ""}
            onChange={(evento) => {
              lidandoComAlteracoes(evento);
            }}
            placeholder="Adicione o motivo aqui..."
            required={true}
          />
        )}

        {solicitacao?.status === "agendada" && (
          <InputDate
            label="Adicione a data do agendamento"
            name="data_agendamento"
            value={solicitacao?.data_agendamento}
            onChange={(evento) => { lidandoComAlteracoes(evento) }}
            required={true}
          />
        )}

        {solicitacao?.status === "concluida" && (
          <InputDate
            label="Adicione a data da conclusão"
            name="data_conclusao"
            value={solicitacao?.data_conclusao}
            onChange={(evento) => { lidandoComAlteracoes(evento) }}
            required={true}
          />
        )}

        {(solicitacao?.status === 'concluida' && solicitacao?.data_conclusao) &&
          <div className="box-info-editar-solicitacao-editar-solicitacao">
            <span className="font-size-p">Data de conclusão</span>
            <p className="font-size-m">
              {solicitacao?.data_conclusao &&
                moment(solicitacao?.data_conclusao).add(3, 'hours').format("DD/MM/YYYY")}
            </p>
          </div>
        }

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">Data da solicitação</span>
          <p className="font-size-m">
            {solicitacao?.created_at &&
              moment(solicitacao?.created_at).format("DD/MM/YYYY") +
              " às " +
              moment(solicitacao?.created_at).format("HH:mm:ss")
            }
          </p>
        </div>

        {(solicitacao?.status === "agendada" && solicitacao?.data_agendamento) &&
          <div className="box-info-editar-solicitacao">
            <span className="font-size-p">Data de agendamento</span>
            <p className="font-size-m">
              {moment(solicitacao?.data_agendamento).add(3, 'hours').format('DD/MM/YYYY')}
            </p>
          </div>
        }

        {(solicitacao?.status === 'indeferida' && solicitacao?.mot_indeferimento) &&
          <div className="box-info-editar-solicitacao">
            <span className="font-size-p">Motivo do indeferimento</span>
            <p className="font-size-m">{solicitacao?.mot_indeferimento}</p>
          </div>
        }

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">Solicitação</span>
          <p className="font-size-m">{solicitacao?.categoria?.nome}</p>
        </div>

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">Solicitante</span>
          <p className="font-size-m">{solicitacao?.cidadao?.nome}</p>
        </div>

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">CPF</span>
          <p className="font-size-m">{formataCpf(solicitacao?.cidadao?.cpf)}</p>
        </div>

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">Email</span>
          <p className="font-size-m">{solicitacao?.cidadao?.email}</p>
        </div>

        <div className="box-info-editar-solicitacao">
          <span className="font-size-p">Celular</span>
          <p className="font-size-m">{formataTelefone(solicitacao?.cidadao?.telefone)}</p>
        </div>

        <div className="box-info-visualizar-solicitacao">
          <span className="font-size-p">Comunidade</span>
          <p className="font-size-m">{solicitacao?.comunidade?.nome}</p>
        </div>

        {solicitacao?.additional_address &&
          <div className="box-info-visualizar-solicitacao">
            <span className="font-size-p">Endereço completo (para Centro)</span>
            <p className="font-size-m">
              {solicitacao?.additional_address}
            </p>
          </div>
        }

        {solicitacao?.descricao &&
          <div className="box-info-editar-solicitacao">
            <span className="font-size-p">Descrição da solicitação</span>
            <p className="font-size-m">{solicitacao?.descricao}</p>
          </div>
        }
      </div>

      <ModalHelp
        title={helpConfigs.step001.title}
        content={helpConfigs.step001.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />
      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
