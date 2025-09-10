import { useRef } from "react";
import "./styles.css";

export default function InputDate({
  label,
  name,
  value,
  onChange,
  adicionalClass,
  placeholder,
  required,
}) {
  const inputRef = useRef(null);

  const abrirCalendario = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker(); 
    } else {
      inputRef.current?.focus(); 
    }
  };

  return (
    <div className="container-input-date" onClick={abrirCalendario}>
      <label>{label}</label>
      <input
        ref={inputRef}
        className={`${adicionalClass} input-date`}
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
    </div>
  );
}
