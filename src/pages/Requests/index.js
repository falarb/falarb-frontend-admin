import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

import TableFiveColuns from "../../components/Table/TableFive";
import TableHeader from "../../components/Table/TableFive/TableHeader";
import TableItem from "../../components/Table/TableFive/TableItem";
import TableItemEmpty from "../../components/Table/TableFive/TableItemEmpty";
import TableFooter from "../../components/Table/TableFive/TableFooter";
import Erro from "../../components/Message/Erro";
import Modal from "../../components/Modal";
import Filtros from "../../components/Filters";
import Loading from "../../components/Loading";
import SelectCustom from "../../components/Select/SelectCustom";
import InputSearch from "../../components/Input/InputSearch";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";

import "./styles.css";

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  //filtros e paginação
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState("");
  const [tipo_pedido, setTipoPedido] = useState("");
  const [comunidade, setComunidade] = useState("");
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
          `/solicitacoes?ordenar_por=${sortBy}&ordenar_direcao=${sortOrder}`
        );

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta;
console.log(dados)
        setTotalPages(dados?.data?.ultima_pagina || 1);

        setSolicitacoes(dados?.data?.dados || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar solicitações");
        setSolicitacoes([]);
      } finally {
        setLoading(false);
      }
    };

    const listarCategorias = async () => {
      setLoading(true);
      setError(null);

      try {
        //se passar de 10 deve ser configurado o limite
        const resposta = await api.get(`/categorias`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta;

        setCategorias(dados?.data?.dados || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar categorias");
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    const listarComunidades = async () => {
      setLoading(true);
      setError(null);

      try {
        //se passar de 10 deve ser configurado o limite
        const resposta = await api.get(`/comunidades`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta;

        setComunidades(dados?.data?.dados || []);
      } catch (err) {
        setError(err.message || "Erro desconhecido ao buscar comunidades");
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    listarSolicitacoes();
    listarCategorias();
    listarComunidades();
  }, [
    page,
    status,
    debouncedSearch,
    sortBy,
    sortOrder,
    tipo_pedido,
    comunidade,
  ]);

  const inativarSolicitacao = async () => {
    try {
      setLoading(true);
      setError(null);
      const resposta = await api.put(
        `/solicitacoes/${solicitacaoSelecionada.id}`,
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
    <>
      {error && <Erro mensagem={error} onClose={null} />}
      {loading && <Loading />}
      {mostrarModalDelete && solicitacaoSelecionada && (
        <Modal
          type="danger"
          title="Excluir solicitação"
          description={`Você solicitou excluir o seguinte condomínio: ${solicitacaoSelecionada.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
          onConfirm={() => {
            //handleDeleteSolicitacao()
            alert("delete");
            setAbrirModalDelete(false);
            window.location.reload();
          }}
          onCancel={() => {
            setAbrirModalDelete(false);
          }}
        />
      )}

      <div className="navTools">
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
          onClick={() => {
            alert("url");
          }}
        >
          Cadastrar
        </BtnPrimary>
      </div>

      <h2>Listagem de Solicitações</h2>

      <Filtros>
        <SelectCustom
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          <option value="">Todos</option>
          <option value="analise">Em análise</option>
          <option value="agendada">Agendada</option>
          <option value="concluida">Concluída</option>
          <option value="indeferida">Indeferida</option>
        </SelectCustom>

        <SelectCustom
          label="Tipo de pedido"
          value={status}
          onChange={(event) => {
            setTipoPedido(event.target.value);
          }}
        >
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))
          ) : (
            <option value="">Nenhuma categoria encontrada</option>
          )}
        </SelectCustom>

        <SelectCustom
          label="Comunidade"
          value={status}
          onChange={(event) => {
            setComunidade(event.target.value);
          }}
        >
          {comunidades.length > 0 ? (
            comunidades.map((comunidade) => (
              <option key={comunidade.id} value={comunidade.id}>
                {comunidade.nome}
              </option>
            ))
          ) : (
            <option value="">Nenhuma comunidade encontrada</option>
          )}
        </SelectCustom>

        <InputSearch
          label="Busque por solicitações"
          value={search}
          placeholder="Busque por solicitações..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></InputSearch>
      </Filtros>

      <TableFiveColuns>
        <TableHeader
          col1="Data de criação"
          sort1={true}
          onClickSort1={() => {
            setSortBy("created_at"); // primeiro define a coluna
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc")); // usa o valor anterior corretamente
          }}
          col2="Cidadão"
          sort2={false}
          col3="Tipo de pedido"
          sort3={false}
          col4="Comunidade"
          sort4={false}
          col5="Status"
          sort5={false}
          col5_status="true"
        />
        {solicitacoes.length > 0 ? (
          solicitacoes.map((solicitacao) => (
            <TableItem
              key={solicitacao?.id}
              id={solicitacao?.id}
              status={solicitacao?.status}
              col1={new Date(solicitacao?.created_at).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              col2={solicitacao?.cidadao?.nome || "—"}
              col3={solicitacao?.categoria?.nome || "—"}
              col4={solicitacao?.comunidade?.nome || "—"}
              col5={
                solicitacao?.status === "analise"
                  ? "Análise"
                  : solicitacao?.status === "agendada"
                  ? "Agendada"
                  : solicitacao?.status === "concluida"
                  ? "Concluída"
                  : solicitacao?.status === "indeferida"
                  ? "Indeferida"
                  : "Desconhecido"
              }
              classNameCol5={solicitacao?.status}
              link_view={`/administracao/solicitacao/${solicitacao?.id}`}
              onClickView={() => {
                navigate(`/administracao/solicitacao/${solicitacao.id}`);
              }}
              onClickEdit={() => {
                navigate(
                  `/administracao/solicitacao/editar/${solicitacao?.id}`
                );
              }}
              onClickDelete={() => {
                setSolicitacaoSelecionada(solicitacao);
                setAbrirModalDelete(true);
              }}
            />
          ))
        ) : (
          <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
        )}

        <TableFooter
          totalPages={totalPages}
          atualPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </TableFiveColuns>
    </>
  );
}
