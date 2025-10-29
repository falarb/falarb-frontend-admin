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
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step001);

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

  // nenhum dado
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
          onClick={() => {
            cadastrarCidadao();
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
          placeholder={"Nome do cidadão"}
          value={cidadao?.nome}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputCPF
          label="CPF"
          name="cpf"
          placeholder={"000.000.000-00"}
          value={cidadao?.cpf}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputEmail
          label="Email"
          name="email"
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
        title={helpConfigs.step001.title}
        content={helpConfigs.step001.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />
      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
