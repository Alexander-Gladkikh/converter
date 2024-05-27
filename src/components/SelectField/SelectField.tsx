import React from "react";
import s from './SelectField.module.scss'

type SelectFieldType = {
  id: string
  name: string
  label: string
  value: string | number
  onBlur?: any
  onChange?: any
  options: React.ReactNode
  touched: boolean | undefined
  error: string | undefined
}
export const SelectField = ({ id, name, label, value, onChange, onBlur, options, touched, error }: SelectFieldType) => (
  <div className={s.formSelect}>
    <label htmlFor={id}>{label}</label>
    <select
      className={s.formGroupSelect}
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    >
      {options}
    </select>
    {touched && error ? (
      <div>{error}</div>
    ) : null}
  </div>
);
