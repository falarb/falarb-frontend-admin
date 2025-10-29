import { Children, useEffect, useRef } from "react";
import "./Card.css";
import { Outlet } from "react-router-dom";

const Card = ({ totalSolicitacoes, type, titleCard, valueCard, children }) => {
  if (totalSolicitacoes === 0 || totalSolicitacoes === null) {
    totalSolicitacoes = 1; // Evita divisão por zero
  }

  const fillRef = useRef(null);
  let percentCard = (valueCard / totalSolicitacoes) * 100;

  useEffect(() => {
    // Força o reflow para garantir a animação
    requestAnimationFrame(() => {
      if (fillRef.current) {
        fillRef.current.style.width = `${percentCard}%`;
      }
    });
  }, [percentCard]);

  return (
    <div className={`card cart-type-${type}`}>
      {children}
      <div className="card-content">
        <div className="title-card-dashboard">
          <p className="title-text">{titleCard}</p>
          <p className={`percent type-${type}`}>{percentCard.toFixed(2)}%</p>
        </div>
        <div className={`data ${type === "total" ? "data-large" : ""}`}>
          <p>{valueCard}</p>
          <div className={`range ${type === "total" ? "range-none" : ""}`}>
            <div
              ref={fillRef}
              className={`fill type-${type}`}
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
