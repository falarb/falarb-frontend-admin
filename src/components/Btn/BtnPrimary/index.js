import "./styles.css";

export default function BtnPrimary({
  children,
  type,
  onClick,
  adicionalClass,
  title,
  disabled,
}) {

  console.log(disabled);

  return (
    <button
      className={`btn-primary ${adicionalClass} ${disabled ? "disabled" : ""}`}
      title={title}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
