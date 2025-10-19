export default function Input({ label, type="text", value, onChange, placeholder="", required = false }) {
  return (
    <div className="mb-3 w-100">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
