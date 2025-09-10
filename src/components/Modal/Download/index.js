import BtnPrimary from "../../Btn/BtnPrimary";
import BtnSecundary from "../../Btn/BtnSecundary";
import "./styles.css";

export default function Download({ title, children, onConfirm, onCancel, classeAdicional }) {
  return (
    <div className="modal-download">
      <div className="card-download">
        <div className={`card-content-download ${classeAdicional}`}>
          <div className="image-download">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
          </div>
          <div className="content-download">
            {children}
          </div>
          <div className="actions-download">
            <BtnPrimary onClick={onConfirm}>Baixar</BtnPrimary>
            <BtnSecundary onClick={onCancel}>Cancelar</BtnSecundary>
          </div>
        </div>
      </div>
    </div>
  );
}
