
type SelectFieldType = {
  id: string
  name: string
  label: string
  value: string | number
  type: string
  onBlur?: any
  onChange?: any
  touched: boolean | undefined
  error: string | undefined
}
export const InputField = ({ id, name, label, value, onChange, onBlur, touched, error, type }: SelectFieldType) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      type={type}
    />
    {touched && error ? (
      <div>{error}</div>
    ) : null}
  </div>
);
