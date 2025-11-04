import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import "./styles.css";
import InputText from "../../../components/Input/InputText";
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

export default function EditarCategoria() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.editar_categoria);

  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalEditAberto, setModalEditAberto] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const listarCategoria = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/categorias/${id}`);
        setCategoria(resposta.data || {});
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar categoria");
        setCategoria({});
      } finally {
        setLoading(false);
      }
    };

    listarCategoria();
  }, [id]);

  const handleChange = (evento) => {
    setIsDirty(true);
    const { name, value } = evento.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const salvarCategoria = async () => {
    if (!categoria) return;
    setLoading(true);
    setError(null);

    try {
      await api.put(`/categorias/${id}`, { nome: categoria.nome });
      setIsDirty(false);
      navigate(-1);
    } catch (erro) {
      setError("Erro ao salvar a categoria.");
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      {error && <Erro mensagem={error} />}
      {modalEditAberto && (
        <Modal
          type="warning"
          title="Editar categoria"
          description={`Você solicitou editar as informações dessa categoria. Você tem certeza?`}
          onConfirm={(evento) => {
            evento.preventDefault();
            salvarCategoria();
            setModalEditAberto(false);
          }}
          onCancel={() => setModalEditAberto(false)}
        />
      )}

      <TitleClipPages title={`Edição de categoria`} />

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => {
            if (isDirty) {
              const confirmLeave = window.confirm(
                "Você fez alterações que não foram salvas. Deseja sair mesmo assim?"
              );
              if (!confirmLeave) return;
            }
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
          title="Salvar alterações"
          adicionalClass="success btn-svg"
          onClick={() => {
            setModalEditAberto(true);
          }}
        >
          <span
            class="material-symbols-outlined"
            style={{ color: "#fff", margin: "auto" }}
          >
            save
          </span>
        </BtnPrimary>
      </div>

      <h2>Editar Categoria</h2>
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          setModalEditAberto(true);
        }}
      >
        <div className="container-single-input">
          <InputText
            label="Nome"
            type="text"
            name="nome"
            value={categoria?.nome || ""}
            onChange={handleChange}
          />
        </div>
      </form>

      <ModalHelp
        title={helpConfigs.editar_categoria.title}
        content={helpConfigs.editar_categoria.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
