import { useState, useEffect } from "react";
import "./styles.css";

export default function InputEmail({
  label,
  adicionalClass,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [changed, setChanged] = useState(false);

  // Detecta se o valor já foi alterado pelo usuário
  useEffect(() => {
    if (value !== "") {
      setChanged(true);
    }
  }, [value]);

  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValid = isEmailValid(value);

  return (
    <div className={`container-input-email ${adicionalClass}`}>
      <label>{label}</label>
      <input
        type="email"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={!isValid && changed ? "invalid" : ""}
      />
      {!isValid && changed && (
        <p className="invalid-text" style={{ color: "red" }}>
          E-mail inválido
        </p>
      )}
    </div>
  );
}
