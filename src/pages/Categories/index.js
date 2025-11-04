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

import ModalHelp from "../../components/Modal/Help";
import HelpIndicator from "../../components/HelpIndicator";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";

export default function Categorias() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.categorias);

  const [categorias, setCategorias] = useState([]);
  const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
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
          `/categorias?limite=10&pagina=${page}&ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}&ativo=1&termo_geral=${debouncedSearch}`
        );

        const ultimaPagina = resposta?.data?.ultima_pagina || 1;

        if (page > ultimaPagina) {
          setPage(ultimaPagina);
          return;
        }

        setTotalPages(ultimaPagina);

        setCategorias(resposta?.data?.dados || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar categorias");
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };
    listarSolicitacoes();
  }, [page, debouncedSearch, sortBy, sortOrder]);

  const inativarCategoria = async () => {
    try {
      setLoading(true);
      setAbrirModalDelete(false);
      setError(null);
      await api.delete(`/categorias/${categoriaSelecionada?.id}`);
      window.location.reload();
    } catch (erro) {
      setMostrarModalErro(true);
    } finally {
      setLoading(false);
      setDebouncedSearch("");
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && (
        <Erro
          mensagem={
            "Tivemos um problema ao inativar a categoria. Tente novamente mais tarde."
          }
        />
      )}
      {mostrarModalDelete && categoriaSelecionada && (
        <Modal
          type="danger"
          title="Excluir categoria"
          description={`Você solicitou excluir a seguinte categoria: ${categoriaSelecionada?.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
          onConfirm={() => { inativarCategoria(); }}
          onCancel={() => { setAbrirModalDelete(false); }}
        />
      )}

      {mostrarModalErro && (
        <Modal
          type="danger"
          title="Erro"
          description={`Não é possível inativar esta categoria pois ela está vinculada a solicitações.`}
          onConfirm={() => { setMostrarModalErro(false); }}
          onCancel={() => { setMostrarModalErro(false); }}
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
            navigate(`/administracao/categoria/cadastrar/`);
          }}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Categorias</h2>

      <Filtros>
        <InputSearch
          label="Busque por categorias"
          value={search}
          placeholder="Busque pela categoria..."
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
          col2=""
          sort2={"false"}
          col3=""
          sort3={"false"}
          col4=""
          sort4={"false"}
          col5=""
          sort5={"false"}
        />

        {loading ? (
          <TableItemEmpty>Carregando...</TableItemEmpty>
        ) : error ? (
          <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
        ) : categorias.length > 0 ? (
          categorias.map((categoria) => (
            <TableItem
              key={categoria?.id}
              col1={categoria?.nome}
              link_view={`/administracao/categoria/${categoria?.id}`}
              onClickView={() => {
                navigate(`/administracao/categoria/${categoria?.id}`);
              }}
              onClickEdit={() => {
                navigate(`/administracao/categoria/editar/${categoria?.id}`);
              }}
              onClickDelete={() => {
                setCategoriaSelecionada(categoria);
                setAbrirModalDelete(true);
              }}
            />
          ))
        ) : (
          <TableItemEmpty>Nenhum tipo de categoria encontrado.</TableItemEmpty>
        )}

        <TableFooter
          totalPages={totalPages}
          atualPage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </Table>

      <ModalHelp
        title={helpConfigs.categorias.title}
        content={helpConfigs.categorias.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
