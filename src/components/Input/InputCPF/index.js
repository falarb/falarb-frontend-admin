import InputMask from "react-input-mask";
import "./styles.css";

export default function InputCPF({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="custom-input-mask">
      <label>{label}</label>
      <InputMask
        className="input-mask"
        mask="999.999.999-99"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, "");
          onChange({
            ...e,
            target: {
              ...e.target,
              value: numericValue,
              name: name, 
            },
          });
        }}
      />
    </div>
  );
}
