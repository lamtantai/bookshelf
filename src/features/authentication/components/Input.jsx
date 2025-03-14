export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-1 block">
        {label}
      </label>

      <input
        required
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full rounded-md border border-gray-600 bg-gray-50 px-2 py-1 outline-none hover:bg-gray-100 focus:border-accent"
        {...props}
      />
    </div>
  );
}
