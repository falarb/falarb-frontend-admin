import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import "./styles.css";
import InputText from "../../../components/Input/InputText";
import InputEmail from "../../../components/Input/InputEmail";
import InputCustomMask from "../../../components/Input/InputCustomMask";
import Erro from "../../../components/Message/Erro";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Loading from "../../../components/Loading";
import TitleClipPages from "../../../components/TitleClipPages";
import Modal from "../../../components/Modal";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

export default function EditarAdministrador() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.editar_administrador);

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [modalEditAberto, setModalEditAberto] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Busca do usuário
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
            "Erro ao buscar usuário."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUsuario();
  }, [id]);

  const handleChange = (evento) => {
    setIsDirty(true);
    const { name, value } = evento.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setValidationErrors({});

    try {
      const { data } = await api.put(`/administradores/${id}`, {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
      });
      setUsuario(data);
      setIsDirty(false);
      navigate(-1);
    } catch (err) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Erro ao atualizar usuário."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!usuario) return <p>Nenhum usuário encontrado.</p>;

  return (
    <div className="editar-administrador-container">
      {error && <Erro mensagem={error} />}

      {modalEditAberto && (
        <Modal
          type="warning"
          title="Editar usuário"
          description={`Você solicitou editar as informações desse usuário. Tem certeza que deseja continuar?`}
          onConfirm={() => {
            handleSubmit();
            setModalEditAberto(false);
          }}
          onCancel={() => setModalEditAberto(false)}
        />
      )}

      <TitleClipPages title={`Edição de usuário administrador`} />

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
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setModalEditAberto(true);
        }}
      >
        <div className="container-single-input">
          <InputText
            label="Nome"
            name="nome"
            value={usuario?.nome}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.nome}</div>
        </div>

        <div className="container-single-input">
          <InputEmail
            label="Email"
            name="email"
            value={usuario?.email}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.email}</div>
        </div>

        <div className="container-single-input">
          <InputCustomMask
            label="Celular"
            mask="(99) 9 9999-9999"
            name="telefone"
            value={usuario?.telefone || ""}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.celular}</div>
        </div>

        <BtnPrimary type="submit">Salvar</BtnPrimary>
      </form>

      <ModalHelp
        title={helpConfigs.editar_administrador.title}
        content={helpConfigs.editar_administrador.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
