import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import InputText from "../../../components/Input/InputText";
import InputEmail from "../../../components/Input/InputEmail";
import InputCPF from "../../../components/Input/InputCPF";
import Erro from "../../../components/Message/Erro";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Loading from "../../../components/Loading";
import InputCustomMask from "../../../components/Input/InputCustomMask";

export default function CadastrarAdministrador() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors({});

    try {
      const { data } = await api.post("/administradores", usuario);
      navigate(-1);
    } catch (err) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
      } else if (
        err.response?.status === 500 &&
        err.response?.data?.message?.includes("Duplicate entry")
      ) {
        setError("Esse e-mail já está cadastrado. Tente outro.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Erro ao cadastrar administrador."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastrar-administrador-container">
      {loading && <Loading />}
      {console.log(error)}
      {error && <Erro mensagem={error} />}

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

      <h2>Cadastrar Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div className="container-single-input">
          <InputText
            label="Nome"
            name="nome"
            placeholder="Digite o nome do administrador"
            value={usuario.nome}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.nome}</div>
        </div>

        <div className="container-single-input">
          <InputEmail
            label="Email"
            name="email"
            placeholder="Digite o email do administrador"
            value={usuario.email}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.email}</div>
        </div>

        <div className="container-single-input">
          <InputCPF
            label="CPF"
            name="cpf"
            placeholder="123.456.789-10"
            value={usuario.cpf}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.cpf}</div>
        </div>

        <div className="container-single-input">
          <InputCustomMask
            label="Telefone"
            name="telefone"
            placeholder="(99) 9 9999-9999"
            value={usuario.telefone}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.nome}</div>
        </div>

        <div className="container-single-input">
          <InputText
            label="Senha"
            name="senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
          />
          <div className="validation-error">{validationErrors.nome}</div>
        </div>

        <BtnPrimary type="submit">Cadastrar</BtnPrimary>
      </form>
    </div>
  );
}
