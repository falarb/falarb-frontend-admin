import "./styles.css";

export default function MiniDashboardUser({
  total,
  concluidas,
  agendadas,
  analise,
  indeferida
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
              <span>{concluidas} concluida(s)</span>
            </div>
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-agendadas"></div>
              <span>{agendadas} agendada(s)</span>
            </div>
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-analise"></div>
              <span>{analise} em análise</span>
            </div>
            <div>
              <div className="tag-dashboard-user tag-dashboard-user-indeferida"></div>
              <span>{indeferida} indeferida(s)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
