import { SelectHTMLAttributes } from "react";

export const Select = (
  props: SelectHTMLAttributes<HTMLSelectElement> & {
    options: { label: string; value: string }[];
  },
) => (
  <select
    {...props}
    className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {props.options.map((option, index) => (
      <option value={option.value} key={`${option.value}-${index}`}>
        {option.label}
      </option>
    ))}
  </select>
);
