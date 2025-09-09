import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
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
import SelectCustom from "../../components/Select/SelectCustom";
import InputSearch from "../../components/Input/InputSearch";

import api from "../../utils/api";

export default function Administradores() {
  const [administradores, setAdministradores] = useState([]);
  const [administradorSelecionado, setAdministradorSelecionado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarModalDelete, setMostrarModalDelet] = useState(false);
  const [mostrarModalSuccess, setMostrarModalSuccess] = useState(false);

  //filtros e paginação
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState("");
  const [sortBy, setOrderBy] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 

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
  const listarAdmins = async () => {
    setError(null);
    setLoading(true);

    try {
      const resposta = await api.get(
        `/administradores?ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}&pagina=${page}&termo_geral=${debouncedSearch}`
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
      setAdministradores(dados?.dados || []);
    } catch (err) {
      setError(err.message || "Erro desconhecido na busca");
      setAdministradores([]);
    } finally {
      setLoading(false);
    }
  };

  listarAdmins();
}, [page, debouncedSearch, sortBy, sortOrder]);

  
  const inativarAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(
        `/administradores/${administradorSelecionado?.id}`,
        {
          status: "inativo",
        }
      );
    } catch (erro) {
      setError("Erro ao inativar.");
      throw new Error(`Erro: ${erro}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Erro mensagem={error.message || error} />}
      {loading ? <Loading /> : ""}

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
            navigate(`/administrador/cadastrar/`);
          }}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Administradores</h2>

      <Filtros>
        <SelectCustom
          label="Filtre por status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          <option value="">Todos</option>
        </SelectCustom>

        <InputSearch
          label="Buscar usuário"
          value={search}
          placeholder="Buscar usuário..."
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
            setOrderBy("nome");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          col2="Email"
          sort2={false}
          col3="CPF"
          sort3={false}
          col4="Status"
          sort4={false}
        />

        {loading ? <TableItemEmpty>Carregando...</TableItemEmpty> : ""}

        {administradores ? (
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
                <>
                  <span
                    className={`col-status col-status-${administrador.status}`}
                  >
                    {administrador.status}
                  </span>
                </>
              }
              onClickView={() => {
                navigate(`/administrador/${administrador.id}`);
              }}
              onClickEdit={() => {
                navigate(`/administrador/editar/${administrador.id}`);
              }}
              onClickDelete={() => {
                setMostrarModalDelet(true);
                setAdministradorSelecionado(administrador);
              }}
            />
          ))
        ) : (
          <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
        )}
        <TableFooter
          atualPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </Table>

      {mostrarModalDelete ? (
        <Modal
          type="danger"
          title="Deletar administrador"
          description={`Tem certeza que deseja deletar o administrador ${administradorSelecionado.nome}?`}
          onConfirm={() => {
            alert("Excluiu");
            //handleDelete(administradorSelecionado.id);
            setMostrarModalDelet(false);
            setMostrarModalSuccess(true);
          }}
          onCancel={() => {
            setMostrarModalDelet(false);
          }}
        />
      ) : (
        ""
      )}

      {mostrarModalSuccess ? (
        <Success
          type="success"
          title="Sucesso"
          description="Sua solicitação foi atendida com sucesso."
          onConfirm={() => {
            setMostrarModalDelet(false);
            window.location.reload();
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
