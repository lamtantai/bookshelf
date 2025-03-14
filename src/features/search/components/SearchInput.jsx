/* eslint-disable react/prop-types */
import { IoCloseOutline } from "react-icons/io5";

import SpinnerMini from "../../../components/SpinnerMini";

export default function SearchInput({
  id,
  type,
  onChange,
  value,
  placeholder,
  onClear,
  isLoading,
  ...props
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only"></label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isLoading}
        autoComplete="off"
        className="w-full rounded-md border-2 border-light-gray py-1 pl-2 pr-8 outline-none focus:border-accent focus:placeholder:text-light-black"
        {...props}
      />

      {value && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-accent"
          onClick={onClear}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : <IoCloseOutline size={20} />}
        </button>
      )}
    </div>
  );
}
