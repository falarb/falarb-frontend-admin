import "./styles.css";

export default function SelectStatus({ value, name, children ,onChange }) {
  return (
    <div className="select-status-wrapper">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`select-status ${value === "ativo" ? "ativo" : "inativo"}`}
      >
        {children}
      </select>
      <div className={`tag-${value}`}></div>
    </div>
  );
}
