import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

import Table from "../../components/Table/TableFive";
import TableHeader from "../../components/Table/TableFive/TableHeader";
import TableItem from "../../components/Table/TableFive/TableItem";
import Loading from "../../components/Loading";
import TableItemEmpty from "../../components/Table/TableFive/TableItemEmpty";
import TableFooter from "../../components/Table/TableFive/TableFooter";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import Erro from "../../components/Message/Erro";
import Filtros from "../../components/Filters";
import Modal from "../../components/Modal";
import InputSearch from "../../components/Input/InputSearch";

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
  const [comunidadeSelecionada, setComunidadeSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const listarSolicitacoes = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(
          `/comunidades?ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}`
        );

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta;
        setTotalPages(dados?.data?.ultima_pagina || 1);

        setComunidades(dados?.data?.dados || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar comunidades");
        setComunidades([]);
      } finally {
        setLoading(false);
      }
    };
    listarSolicitacoes();
  }, [
    page,
    debouncedSearch,
    sortBy,
    sortOrder
  ]);

  const inativarComunidade = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(
        `/comunidade/${comunidadeSelecionada.id}`,
        {
          status: "inativo",
        }
      );
    } catch (erro) {
      setError("Erro ao inativar a solicitação.");
      throw new Error(`Erro: ${erro}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Erro mensagem={error.message || "Erro desconhecido"} />}
      {mostrarModalDelete && comunidadeSelecionada && (
        <Modal
          type="danger"
          title="Excluir comunidade"
          description={`Você solicitou excluir a seguinte comunidade: ${comunidadeSelecionada?.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
          onConfirm={() => {

            alert("delete");
            setAbrirModalDelete(false);
            window.location.reload();
          }}
          onCancel={() => {
            setAbrirModalDelete(false);
          }}
        />
      )}
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
            navigate(`/administracao/comunidade/cadastrar/`);
          }}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Comunidades</h2>

      <Filtros>
        <InputSearch
          label="Busque por solicitações"
          value={search}
          placeholder="Busque por solicitações..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></InputSearch>
      </Filtros>

      <Table>
        <TableHeader
          col1="Nome"
          sort1={true}
          onClickSort1={() => {
            setSortBy("nome");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          col2="Total de pedidos"
          col3="Nº de concluídos"
          col4="Nº de agendados"
          col5="Nº em espera"
        />

        {loading ? (
          <TableItemEmpty>Carregando...</TableItemEmpty>
        ) : error ? (
          <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
        ) : comunidades.length > 0 ? (
          comunidades.map((comunidade) => (
            <TableItem
              key={comunidade?.id}
              id={comunidade?.id}
              col1={comunidade?.nome}
              col2={comunidade?.solicitacoes_info?.total}
              col3={comunidade?.solicitacoes_info?.agendadas}
              col4={comunidade?.solicitacoes_info?.concluidas}
              col5={comunidade?.solicitacoes_info?.em_espera}
              link_view={`/administracao/comunidade/${comunidade.id}`}
              onClickView={() => {
                navigate(`/administracao/comunidade/${comunidade.id}`);
              }}
              onClickEdit={() => {
                navigate(`/administracao/comunidade/editar/${comunidade.id}`);
              }}
              onClickDelete={() => {
                setComunidadeSelecionada(comunidade);
                setAbrirModalDelete(true);
              }}
            />
          ))
        ) : (
          <TableItemEmpty>Nenhum tipo de manutenção encontrado.</TableItemEmpty>
        )}

        <TableFooter
          totalPages={totalPages}
          atualPage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </Table>
    </div>
  );
}
