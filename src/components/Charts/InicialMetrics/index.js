import "./InicialMetrics.css";
import Card from "./Card";

const InicialMetrics = ({
  totalSolicitacoes,
  totalConcluidas,
  totalAgendadas,
  totalEmAberto,
  totalIndeferido,
}) => {
  return (
    <div className="container-inicial-metrics">
      <Card
        titleCard="Total de solicitações"
        type="total"
        valueCard={totalSolicitacoes}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card
        titleCard="Concluídas"
        type="concluido"
        valueCard={totalConcluidas}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card
        titleCard="Agendadas"
        type="agendado"
        valueCard={totalAgendadas}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card
        titleCard="Em aberto"
        type="em-aberto"
        valueCard={totalEmAberto}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card
        titleCard="Indeferido"
        type="indeferido"
        valueCard={totalIndeferido}
        totalSolicitacoes={totalSolicitacoes}
      />
    </div>
  );
};

export default InicialMetrics;
