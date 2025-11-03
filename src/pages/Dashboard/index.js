import { useEffect, useState } from "react";

import api from "../../utils/api";

import InicialMetrics from "../../components/Charts/InicialMetrics";
import PieCharts from "../../components/Charts/PieCharts";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

import ModalHelp from "../../components/Modal/Help";
import HelpIndicator from "../../components/HelpIndicator";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";

import "./styles.css";

export default function Dashboard() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.dashboard);

  const [erros, setErros] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState(null);
  const [filters, setFilters] = useState({ data: "ultimo_ano" });

  useEffect(() => {
    async function alimentarDashboard() {
      try {
        setErros(null);
        setCarregando(true);

        const { data } = await api.get("/dashboard/indicadores?data=" + filters?.data);

        setDados(data);
      } catch (erro) {
        setErros("Ocorreu um erro ao carregar o dashboard.");
        console.error(erro);
        setMostrarModal(true);
      } finally {
        setCarregando(false);
      }
    }

    alimentarDashboard();
  }, [filters]);

  return (
    <>
      {carregando ? <Loading /> : null}
      {erros && mostrarModal && (
        <Modal
          type="normal"
          title="Ops, tivemos um problema..."
          description="Entre em contato com o suporte e tente novamente mais tarde."
          onCancel={() => setMostrarModal(false)}
          onConfirm={() => setMostrarModal(false)}
        />
      )}

      <InicialMetrics
        totalSolicitacoes={dados?.solicitacoes_por_status?.total || 0}
        totalConcluidas={dados?.solicitacoes_por_status?.concluida || 0}
        totalAgendadas={dados?.solicitacoes_por_status?.agendada || 0}
        totalEmAnalise={dados?.solicitacoes_por_status?.analise || 0}
        totalIndeferido={dados?.solicitacoes_por_status?.indeferida || 0}
        dados={dados}
        filters={filters}
        setFilters={setFilters}
      />

      <PieCharts
        totalSolicitacoes={dados?.solicitacoes_por_status?.total || 0}
        totalConcluidas={dados?.solicitacoes_por_status?.concluida || 0}
        totalAgendadas={dados?.solicitacoes_por_status?.agendada || 0}
        totalEmAberto={dados?.solicitacoes_por_status?.analise || 0}
        totalIndeferido={dados?.solicitacoes_por_status?.indeferida || 0}
        dados={dados}
      />
      <ModalHelp
        title={helpConfigs.dashboard.title}
        content={helpConfigs.dashboard.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </>
  );
}
