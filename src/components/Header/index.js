import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Header({ children, menuIsOpen, setMenuIsOpen }) {
  const navegacao = useNavigate();
  return (
    <header
      className={`header header-${
        menuIsOpen === true ? "menu-is-open" : "menu-is-close"
      }`}
    >
      <svg
        className={`header-svg ${
          menuIsOpen === true ? "header-svg-true" : "header-svg-false"
        }`}
        onClick={() => {
          setMenuIsOpen(menuIsOpen === true ? false : true);
        }}
        fill="#344054"
        height="24px"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>

      <svg
        className={`header-svg ${
          menuIsOpen === true ? "header-svg-false" : "header-svg-true"
        }`}
        onClick={() => {
          setMenuIsOpen(menuIsOpen === true ? false : true);
        }}
        height="24px"
        width="24px"
        fill="#344054"
        viewBox="0 -960 960 960"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>

      <svg
        className={`header-svg`}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#344054"
        onClick={() => {
          localStorage.removeItem("tokenAdminSolicitaAi");
          navegacao("/");
        }}
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </header>
  );
}
