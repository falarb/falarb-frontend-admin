import { useEffect, useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

import api from "../../utils/api";

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

import "./styles.css";

export default function Usuarios() {
  const [cidadaos, setCidadaos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

   //filtros e paginação
   const [totalPages, setTotalPages] = useState(null);
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState(search);
   const [sortOrder, setSortOrder] = useState("asc");
   const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
  const listarCidadaos = async () => {
    setError(null);
    setLoading(true);

    try {
      const resposta = await api.get(
        `/cidadaos?ativo=true&ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}&pagina=${page}&termo_geral=${debouncedSearch}`
      );

      if (resposta.status !== 200) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }

      const dados = resposta.data;

      if (page > dados.ultima_pagina) {
        setPage(dados.ultima_pagina || 1);
        return;
      }

      setTotalPages(dados?.ultima_pagina || 1);
      setCidadaos(dados?.dados || []);
    } catch (err) {
      setError(err.message || "Erro desconhecido na busca");
      setCidadaos([]);
    } finally {
      setLoading(false);
    }
  };

  listarCidadaos();
}, [page, debouncedSearch, sortBy, sortOrder]);


 
const inativarCidadao = async () => {
  try {
    setLoading(true);
    setError(null);

    const resposta = await api.delete(`/cidadaos/${usuarioSelecionado?.id}`);

    return resposta.data;
  } catch (erro) {
    console.error(erro);
    setError("Erro ao inativar cidadão.");
    return null;
  } finally {
    setLoading(false);
    setUsuarioSelecionado(null);
    window.location.reload();
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
            navigate(`/administracao/usuario/cadastrar/`);
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
      </Filtros>

      <Table>
        <TableHeader
          col1="Nome"
          sort1={true}
          onClickSort1={() => {
            setSortBy("nome");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          col2="CPF"
          sort2={false}
          col3="Email"
          sort3={false}
          col4="Último Código"
          sort4={false}
        />

        {cidadaos?.length > 0 ? (
          cidadaos?.map((cidadao) => (
            <TableItem
              key={cidadao?.id}
              id={cidadao?.id}
              status={cidadao?.bloqueado ? "inativo" : "ativo"}
              col1={cidadao?.nome}
              col2={cidadao?.cpf}
              col3={cidadao?.email}
              col4={cidadao?.ultimo_codigo}
              tipo={cidadao?.tipo}
              link_view={`/administracao/usuario/${cidadao?.id}`}
              onClickView={() => {
                navigate(`/administracao/usuario/${cidadao?.id}`);
              }}
              onClickEdit={() => {
                navigate(`/administracao/usuario/editar/${cidadao?.id}`);
              }}
              onClickDelete={() => {
                setMostrarModalDelete(true);
                setUsuarioSelecionado(cidadao);
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
            description={`Você solicitou excluir o seguinte usuário: ${usuarioSelecionado?.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
            onConfirm={() => {
              inativarCidadao();
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
