import "./InicialMetrics.css";
import Card from "./Card";
import SelectCustom from "../../Select/SelectCustom";

const InicialMetrics = ({
  totalSolicitacoes,
  totalConcluidas,
  totalAgendadas,
  totalEmAnalise,
  totalIndeferido,
  filters,
  setFilters,
}) => {
  const optionsPeriod = [
    { id: "ultima_semana", nome: "Última semana" },
    { id: "duas_semanas", nome: "Últimas duas semanas" },
    { id: "ultimo_mes", nome: "Último mês" },
    { id: "ultimo_bimestre", nome: "Último bimestre" },
    { id: "ultimo_semestre", nome: "Último semestre" },
    { id: "ultimo_ano", nome: "Último ano" },
  ]

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
        <SelectCustom
          label="Período"
          placeholder="Sempre"
          options={optionsPeriod}
          value={filters.data}
          onChange={(e) => setFilters({ ...filters, data: e.target.value })}
        />
      </Card>
    </div>
  );
};

export default InicialMetrics;
