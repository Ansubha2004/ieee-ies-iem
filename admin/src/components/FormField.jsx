function FormField({ label, value, onChange, multiline, rows = 3, type = "text", name, required, className = "" }) {
  const inputClass = "inputbox w-full";

  return (
    <div className={className}>
      <label className="admin-label">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          required={required}
          className={`${inputClass} h-auto min-h-[60px]`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
}

export default FormField;
