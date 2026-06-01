import clsx from "clsx";

function Button({ themecss, click, label, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={click}
      disabled={disabled}
      className={clsx("flex items-center", themecss, disabled && "opacity-60 cursor-not-allowed")}
    >
      {label}
    </button>
  );
}

export default Button;
