export default function SelectMultiple({ label, options, selectedValues, onChange }) {
  return (
    <div className="">
      <label className="form-label">{label}</label>
      <select
        multiple
        className="form-select"
        value={selectedValues}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
          onChange(values);
        }}
      >
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.nombre}</option>
        ))}
      </select>
    </div>
  );
}
