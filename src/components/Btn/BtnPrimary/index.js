import "./styles.css";

export default function BtnPrimary({
  children,
  type,
  onClick,
  adicionalClass,
  title
}) {
  return (
    <button
      className={`btn-primary ${adicionalClass}`}
      title={title}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
