import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import Modal from "../../../components/Modal";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Erro from "../../../components/Message/Erro";
import Loading from "../../../components/Loading";
import TitleClipPages from "../../../components/TitleClipPages";
import InputText from "../../../components/Input/InputText";
import InputCPF from "../../../components/Input/InputCPF";
import InputEmail from "../../../components/Input/InputEmail";
import InputCustomMask from "../../../components/Input/InputCustomMask";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

import "./styles.css";

export default function AddUser() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.cadastrar_cidadao);

  const [cidadao, setCidadao] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    status: "ativo",
  });

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);

  const navigate = useNavigate();

  const lidandoComAlteracoes = (evento) => {
    const { name, value } = evento.target;
    console.log(name, value);
    setCidadao((prevCidadao) => ({
      ...prevCidadao,
      [name]: value,
    }));
  };

  const cadastrarCidadao = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.post(`/cidadaos`, {
        nome: cidadao.nome,
        cpf: cidadao.cpf,
        email: cidadao.email,
        telefone: cidadao.telefone,
      });

      navigate(-1);
      return resposta;
    } catch (erro) {
      setError("Erro ao cadastrar o cidadão.");
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  const handleDisabled = () => {
    if (loading) return true;

    if (
      !cidadao.nome ||
      !cidadao.cpf ||
      !cidadao.email
    ) {
      return true;
    }

    return false;
  }

  if (!cidadao) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      {loading && <Loading />}
      {error && <Erro mensagem={error} />}

      <TitleClipPages title="Cadastro de usuário" />

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
          adicionalClass="success btn-svg"
          disabled={handleDisabled()}
          onClick={() => { cadastrarCidadao() }}
        >
          <span className="material-symbols-outlined" style={{ color: "#fff", margin: "auto" }}>
            save
          </span>
        </BtnPrimary>

        {modalDeleteAberto && (
          <Modal
            type="danger"
            title="Excluir solicitação"
            description={`Você solicitou excluir essa solicitação. Essa alteração não pode ser desfeita. Você tem certeza?`}
            onConfirm={() => {
              //fetchDelete()
              alert("Delete");
              setModalDeleteAberto(false);
              navigate(-1);
            }}
            onCancel={() => {
              setModalDeleteAberto(false);
            }}
          />
        )}
      </div>

      <div>
        <InputText
          label="Nome"
          name="nome"
          required
          placeholder={"Nome do cidadão"}
          value={cidadao?.nome}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputCPF
          label="CPF"
          name="cpf"
          required
          placeholder={"000.000.000-00"}
          value={cidadao?.cpf}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputEmail
          label="Email"
          name="email"
          required
          placeholder={`email@email.com`}
          value={cidadao?.email}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputCustomMask
          label="Celular"
          name="telefone"
          placeholder={`(99) 99999-9999`}
          value={cidadao?.telefone}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />
      </div>

      <ModalHelp
        title={helpConfigs.cadastrar_cidadao.title}
        content={helpConfigs.cadastrar_cidadao.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />
      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
