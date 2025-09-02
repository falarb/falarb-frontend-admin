import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/TableFour";
import TableHeader from "../../components/Table/TableFour/TableHeader";
import TableItem from "../../components/Table/TableFour/TableItem";
import TableItemEmpty from "../../components/Table/TableFour/TableItemEmpty";
import TableFooter from "../../components/Table/TableFour/TableFooter";
import Erro from "../../components/Message/Erro";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import Filtros from "../../components/Filters";
import InputSearch from "../../components/Input/InputSearch";
import SelectCustom from "../../components/Select/SelectCustom";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [sort_by, setSortBy] = useState("");
  const [sort_order, setSortOrder] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [comunidade, setComunidade] = useState("");

  const navigate = useNavigate();
  const tokenAdminSolicitaAi = localStorage.getItem("tokenAdminSolicitaAi");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      setLoading(true);

      try {
        const resposta = await fetch("http://127.0.0.1:8000/api/cidadaos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenAdminSolicitaAi}`,
          },
        });

        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const data = await resposta.json();
        console.log(data);

        if (data) {
          setUsuarios(data.dados);
          setTotalPages(data.ultima_pagina || 1);
        } else {
          setError("Formato de resposta inesperado da API");
        }
      } catch (error) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, debouncedSearch, sort_by, sort_order, comunidade]);

  const handleDeleteUser = async () => {
    try {
      setError(null);

      const response = await fetch(
        `http://127.0.0.1:8000/api/usuarios/${usuarioSelecionado.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        setError(response.status);
      }

      alert("Excluido com sucesso.");
      window.location.reload();
    } catch (error) {
      setError(error.mensagem);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <Erro mensagem={error} />}

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => {
            navigate("/");
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
          type="button"
          onClick={() => {
            navigate(`/usuario/cadastrar/`);
          }}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Usuários</h2>

      <Filtros>
        <InputSearch
          label="Buscar por usuário"
          placeholder="Nome, cpf, email..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <SelectCustom
          label="Comunidade"
          value={comunidade}
          onChange={(event) => {
            setComunidade(event.target.value);
          }}
        >
          <option value="">Todos</option>
          <option value="sindico_condominio">Síndico Condomínio</option>
          <option value="sindico_bloco">Síndico Bloco</option>
          <option value="ocupante_ap">Ocupante Ap</option>
        </SelectCustom>
      </Filtros>

      <Table>
        <TableHeader
          col1="Nome"
          sort1={true}
          onClickSort1={() => {
            setSortBy("nome");
            setSortOrder(sort_order === "asc" ? "desc" : "asc");
          }}
          col2="CPF"
          sort2={false}
          col3="Email"
          sort3={false}
          col4="Último Código"
          sort4={true}
          onClickSort4={() => {
            setSortBy("cpf");
            setSortOrder(sort_order === "asc" ? "desc" : "asc");
          }}
        />

        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <TableItem
              key={usuario?.id}
              id={usuario?.id}
              status={usuario?.bloqueado ? "inativo" : "ativo"}
              col1={usuario?.nome}
              col2={usuario?.cpf}
              col3={usuario?.email}
              col4={usuario?.ultimo_codigo}
              tipo={usuario?.tipo}
              link_view={`/administracao/usuario/${usuario?.id}`}
              onClickView={() => {
                navigate(`/administracao/usuario/${usuario?.id}`);
              }}
              onClickEdit={() => {
                navigate(`/administracao/usuario/editar/${usuario?.id}`);
              }}
              onClickDelete={() => {
                setMostrarModalDelete(true);
                setUsuarioSelecionado(usuario);
              }}
            />
          ))
        ) : (
          <>
            <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
          </>
        )}

        {mostrarModalDelete && usuarioSelecionado && (
          <Modal
            type="danger"
            title="Excluir usuário"
            description={`Você solicitou excluir o seguinte usuário: ${usuarioSelecionado.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
            onConfirm={() => {
              //handleDeleteUser()
              alert("Delete");
              setMostrarModalDelete(false);
            }}
            onCancel={() => {
              setMostrarModalDelete(false);
            }}
          />
        )}

        <TableFooter
          totalPages={totalPages}
          atualPage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </Table>
    </>
  );
}
