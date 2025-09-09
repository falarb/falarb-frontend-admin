import "./styles.css";

export default function MiniDashboardUser({
  total,
  concluidas,
  agendadas,
  analise,
}) {
  return (
    <>
      <div className="mini_dashboard_user">
        <span className="title">Número de solicitações</span>
        <div className="solicitacoes-infos">
          <div className="total">{total}</div>
          <div className="por_status">
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-concluidas"></div>
              <span>{concluidas} concluidas</span>
            </div>
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-agendadas"></div>
              <span>{agendadas} agendadas</span>
            </div>
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-em-aberto"></div>
              <span>{analise} em aberto</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
