function Button({
  label,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  style = {},
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className}`}
      style={style}
    >
      {children || label}
    </button>
  );
}

export default Button;
