import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import InputText from "../../../components/Input/InputText";
import Erro from "../../../components/Message/Erro";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

export default function CadastrarCategoria() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(
    helpConfigs.cadastrar_categoria
  );

  const [novaCategoria, setNovaCategoria] = useState({ nome: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaCategoria((prev) => ({
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
      const response = await api.post("categorias", {
        nome: novaCategoria.nome,
      });

      setSuccess(`Categoria "${response.data.nome}" cadastrada com sucesso!`);
      setNovaCategoria({ nome: "" });
      return response;
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao cadastrar categoria.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastrar-categoria-container">
      {error && <Erro mensagem={error} />}
      {success && <p className="success-message">{success}</p>}
      <BtnSecundary
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

      <h2>Cadastrar nova categoria</h2>

      <form onSubmit={handleSubmit}>
        <InputText
          label="Nome da nova categoria"
          placeholder="Insira o nome..."
          name="nome"
          value={novaCategoria.nome}
          onChange={handleChange}
          required
        />
        <BtnPrimary type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </BtnPrimary>
      </form>

      <ModalHelp
        title={helpConfigs.cadastrar_categoria.title}
        content={helpConfigs.cadastrar_categoria.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
