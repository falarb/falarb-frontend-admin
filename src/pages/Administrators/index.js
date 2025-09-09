import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import Table from "../../components/Table/TableFour";
import TableHeader from "../../components/Table/TableFour/TableHeader";
import TableItem from "../../components/Table/TableFour/TableItem";
import TableItemEmpty from "../../components/Table/TableFour/TableItemEmpty";
import TableFooter from "../../components/Table/TableFour/TableFooter";
import Success from "../../components/Modal/Success";
import Erro from "../../components/Message/Erro";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import Filtros from "../../components/Filters";
import InputSearch from "../../components/Input/InputSearch";

import api from "../../utils/api";
import "./styles.css";

export default function Administradores() {
  const [administradores, setAdministradores] = useState([]);
  const [administradorSelecionado, setAdministradorSelecionado] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [mostrarModalSuccess, setMostrarModalSuccess] = useState(false);

  // filtros e paginação
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 700);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const listarAdmins = async () => {
      setLoading(true);
      setError("");
      try {
        const resposta = await api.get(
          `/administradores?ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}&pagina=${page}&termo_geral=${debouncedSearch}`
        );

        if (resposta.status !== 200) throw new Error(`Erro HTTP ${resposta.status}`);

        const dados = resposta.data;
        setTotalPages(dados?.ultima_pagina || 1);
        setAdministradores(dados?.dados || []);

        if (page > dados.ultima_pagina) setPage(dados.ultima_pagina || 1);
      } catch (err) {
        setError(err.message || "Erro desconhecido na busca");
        setAdministradores([]);
      } finally {
        setLoading(false);
      }
    };

    listarAdmins();
  }, [page, debouncedSearch, sortBy, sortOrder]);

  const inativarAdmin = async (id) => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/administradores/${id}`);
      setMostrarModalSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Erro ao inativar administrador.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("asc");
    }
  };

  return (
    <div className="administradores-container">
      {error && <Erro mensagem={error} />}
      {loading && <Loading />}

      <div className="nav-tools">
        
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => navigate("/")}
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
          onClick={() => navigate(`/administracao/administrador/cadastrar/`)}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Administradores</h2>

      <Filtros>
        <InputSearch
          label="Buscar usuário"
          value={search}
          placeholder="Buscar usuário..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </Filtros>

      <Table>
        <TableHeader
          col1="Nome"
          sort1={true}
          onClickSort1={() => handleSort("nome")}
          col2="Email"
          sort2={false}
          col3="CPF"
          sort3={false}
          col4="Status"
          sort4={false}
        />

        {loading && <TableItemEmpty>Carregando...</TableItemEmpty>}

        {!loading && administradores.length === 0 && (
          <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
        )}

        {!loading &&
          administradores.map((administrador) => (
            <TableItem
              key={administrador.id}
              id={administrador.id}
              link_view={`/administrador/${administrador.id}`}
              status={administrador.status}
              col1={administrador.nome}
              col2={administrador.email}
              col3={administrador.cpf}
              col4={
                <span className={`col-status col-status-${administrador.status}`}>
                  {administrador.status}
                </span>
              }
              onClickView={() => navigate(`/administracao/administrador/${administrador.id}`)}
              onClickEdit={() => navigate(`/administracao/administrador/editar/${administrador.id}`)}
              onClickDelete={() => {
                setAdministradorSelecionado(administrador);
                setMostrarModalDelete(true);
              }}
            />
          ))}

        <TableFooter
          atualPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Table>

      {mostrarModalDelete && administradorSelecionado && (
        <Modal
          type="danger"
          title="Deletar administrador"
          description={`Tem certeza que deseja inativar o administrador ${administradorSelecionado.nome}?`}
          onConfirm={() => {
            inativarAdmin(administradorSelecionado.id);
            setMostrarModalDelete(false);
          }}
          onCancel={() => setMostrarModalDelete(false)}
        />
      )}

      {mostrarModalSuccess && (
        <Success
          type="success"
          title="Sucesso"
          description="Administrador inativado com sucesso."
          onConfirm={() => setMostrarModalSuccess(false)}
        />
      )}
    </div>
  );
}
