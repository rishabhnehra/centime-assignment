import clsx from "clsx";
import { ClassAttributes, ButtonHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

export const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: JSX.IntrinsicAttributes &
  ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
    size?: "default" | "icon";
  }) => (
  <button
    className={clsx(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "default" &&
        "bg-primary text-primary-foreground hover:bg-primary/90",
      variant === "outline" &&
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      size === "default" && "h-10 px-4 py-2",
      size === "icon" && "h-10 w-10",
      className,
    )}
    {...props}
  />
);
