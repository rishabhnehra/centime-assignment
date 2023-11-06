import { PropsWithChildren } from "react";

export const NavBar = (props: PropsWithChildren) => (
  <div className="flex items-center justify-between border-b p-4" {...props} />
);
