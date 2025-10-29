import "./InicialMetrics.css";
import Card from "./Card";
import SelectCustom from "../../Select/SelectCustom";

const InicialMetrics = ({
  totalSolicitacoes,
  totalConcluidas,
  totalAgendadas,
  totalEmAnalise,
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
        titleCard="Em análise"
        type="em-analise"
        valueCard={totalEmAnalise}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card
        titleCard="Indeferido"
        type="indeferido"
        valueCard={totalIndeferido}
        totalSolicitacoes={totalSolicitacoes}
      />
      <Card type="select">
        <SelectCustom label="Período" />
      </Card>
    </div>
  );
};

export default InicialMetrics;
