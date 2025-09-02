import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InicialMetrics from "../../components/Charts/InicialMetrics";
import PieCharts from "../../components/Charts/PieCharts";
import BarCharts from "../../components/Charts/BarCharts";
import "./styles.css";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const [erros, setErros] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState(null);
  const [verificado, setVerificado] = useState(false);

  const navegacao = useNavigate();
  const tokenAdminSolicitaAi = localStorage.getItem("tokenAdminSolicitaAi");

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (
      !tokenAdminSolicitaAi ||
      tokenAdminSolicitaAi === "undefined" ||
      tokenAdminSolicitaAi === "null" ||
      tokenAdminSolicitaAi.trim() === ""
    ) {
      localStorage.removeItem("tokenAdminSolicitaAi");
      setErros("Acesso negado. Por favor, faça login.");
      setMostrarModal(true);
      console.log("Token inválido ou ausente, redirecionando para login.");
      navegacao("/");
    } else {
      setVerificado(true);
    }
  }, [tokenAdminSolicitaAi, navegacao]);

  // Busca os dados do dashboard
  useEffect(() => {
    if (!verificado) return;

    async function fetchDashboard() {
      try {
        setErros(null);
        setCarregando(true);

        const resposta = await fetch(
          "http://127.0.0.1:8000/api/dashboard/indicadores",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenAdminSolicitaAi}`,
            },
          }
        );

        if (resposta.status !== 200) {
          localStorage.removeItem("tokenAdminSolicitaAi");
          setErros("Erro ao carregar o dashboard.");
          setMostrarModal(true);
          navegacao("/");
          return;
        }

        const dados_recebidos = await resposta.json();
        setDados(dados_recebidos);
      } catch (erro) {
        setErros("Ocorreu um erro ao carregar o dashboard.");
        setMostrarModal(true);
      } finally {
        setCarregando(false);
      }
    }

    fetchDashboard();
  }, [tokenAdminSolicitaAi, navegacao, verificado]);

  if (!verificado || carregando) {
    return <Loading />;
  }

  return (
    <>
      {erros && mostrarModal && <div className="modal">{erros}</div>}
      <InicialMetrics
        totalSolicitacoes={dados?.solicitacoes_por_status?.total || 0}
        totalConcluidas={dados?.solicitacoes_por_status?.concluida || 0}
        totalAgendadas={dados?.solicitacoes_por_status?.agendada || 0}
        totalEmAberto={dados?.solicitacoes_por_status?.analise || 0}
        totalIndeferido={dados?.solicitacoes_por_status?.indeferida || 0}
      />

      <PieCharts />
      <BarCharts />
    </>
  );
}
