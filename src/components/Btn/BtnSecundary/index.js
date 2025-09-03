import "./styles.css";

export default function BtnSecundary({
  children,
  type,
  onClick,
  adicionalClass,
  title
}) {
  return (
    <button
      className={`btn-secundary ${adicionalClass}`}
      title={title}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
