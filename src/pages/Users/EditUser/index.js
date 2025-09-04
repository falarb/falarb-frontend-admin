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
import SelectStatus from "../../../components/Select/SelectStatus";
import InputText from "../../../components/Input/InputText";
import InputCPF from "../../../components/Input/InputCPF";
import InputEmail from "../../../components/Input/InputEmail";
import InputCustomMask from "../../../components/Input/InputCustomMask";

import "./styles.css";

export default function EditUser() {
  const [cidadao, setCidadao] = useState(null);
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

    listarCidadao();
  }, [id]);

  const lidandoComAlteracoes = (evento) => {
    const { name, value } = evento.target;
    setCidadao((prevSolicitacao) => ({
      ...prevSolicitacao,
      [name]: value,
    }));
  };

  const salvarCidadao = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(`/cidadaos/${id}`, {
        cidadao
      });

      if (resposta.status !== 200) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      navigate(-1);
    } catch (erro) {
      setError("Erro ao editar a cidadao.");
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
  if (!cidadao) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      {loading && <Loading />}
      {error && <Erro mensagem={error + error?.mensagem} />}

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
          adicionalClass="success btn-svg"
          onClick={() => {
            salvarCidadao();
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

        <SelectStatus
          value={cidadao?.status}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </SelectStatus>

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
          value={cidadao?.nome}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputCPF
          label="CPF"
          name="cpf"
          value={cidadao?.cpf}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputEmail
          label="Email"
          name="email"
          value={cidadao?.email}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <InputCustomMask
          label="Celular"
          name="telefone"
          placeholder={`${cidadao?.telefone}`}
          value={cidadao?.telefone}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />
      </div>
    </div>
  );
}
