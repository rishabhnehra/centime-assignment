import { InputHTMLAttributes, forwardRef } from "react";
import { useTranslation } from "react-i18next";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errorMessage?: string;
  }
>((props, ref) => {
  const { t } = useTranslation();

  return (
    <div>
      {props.label ? (
        <label htmlFor={props.name} className="block mb-1 text-sm font-medium">
          {t(props.label)}
        </label>
      ) : null}
      <input
        ref={ref}
        id={props.name}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      {props.errorMessage ? (
        <p className="mt-1 text-sm font-medium text-destructive">
          {props.errorMessage}
        </p>
      ) : null}
    </div>
  );
});
