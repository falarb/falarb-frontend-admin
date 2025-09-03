import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/http";

import InicialMetrics from "../../components/Charts/InicialMetrics";
import PieCharts from "../../components/Charts/PieCharts";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

import "./styles.css";

export default function Dashboard() {
  const [erros, setErros] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState(null);

  const navegacao = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setErros(null);
        setCarregando(true);

        const resposta = await api.get("/dashboard/indicadores");

        if (resposta.status !== 200) {
          setErros("Erro ao carregar o dashboard.");
          console.error("Erro ao carregar o dashboard:", resposta);
          setMostrarModal(true);
          navegacao("/");
          return;
        }

        const dados_recebidos = resposta.data;
        setDados(dados_recebidos);
        console.log(dados_recebidos);
      } catch (erro) {
        setErros("Ocorreu um erro ao carregar o dashboard.");
        console.error(erro);
        setMostrarModal(true);
      } finally {
        setCarregando(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <>
      {carregando ? <Loading /> : null}
      {erros && mostrarModal && (
        <Modal
          title="Ops, tivemos um problema..."
          description="Tente novamente mais tarde"
          onCancel={() => setMostrarModal(false)}
          onConfirm={() => setMostrarModal(false)}
        />
      )}
      <InicialMetrics
        totalSolicitacoes={dados?.solicitacoes_por_status?.total || 0}
        totalConcluidas={dados?.solicitacoes_por_status?.concluida || 0}
        totalAgendadas={dados?.solicitacoes_por_status?.agendada || 0}
        totalEmAberto={dados?.solicitacoes_por_status?.analise || 0}
        totalIndeferido={dados?.solicitacoes_por_status?.indeferida || 0}
      />

      <PieCharts
        totalSolicitacoes={dados?.solicitacoes_por_status?.total || 0}
        totalConcluidas={dados?.solicitacoes_por_status?.concluida || 0}
        totalAgendadas={dados?.solicitacoes_por_status?.agendada || 0}
        totalEmAberto={dados?.solicitacoes_por_status?.analise || 0}
        totalIndeferido={dados?.solicitacoes_por_status?.indeferida || 0}
      />
    </>
  );
}
