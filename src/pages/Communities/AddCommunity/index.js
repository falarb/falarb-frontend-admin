import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import InputText from "../../../components/Input/InputText";
import Erro from "../../../components/Message/Erro";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";

export default function CadastrarComunidade() {
  const [novaComunidade, setNovaComunidade] = useState({ nome: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaComunidade((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("comunidades", {
        nome: novaComunidade.nome,
      });

      setSuccess(`Comunidade "${response.data.nome}" cadastrada com sucesso!`);
      setNovaComunidade({ nome: "" });
      return response;
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao cadastrar comunidade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastrar-comunidade-container">
      {error && <Erro mensagem={error}/>}
      {success && <p className="success-message">{success}</p>}
      <BtnSecundary
        onClick={() => {
          navigate("-1");
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

      <h2>Cadastrar nova comunidade</h2>

      <form onSubmit={handleSubmit}>
        <InputText
          label="Nome da nova comunidade"
          placeholder="Insira o nome..."
          name="nome"
          value={novaComunidade.nome}
          onChange={handleChange}
          required
        />
        <BtnPrimary type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </BtnPrimary>
      </form>
    </div>
  );
}
