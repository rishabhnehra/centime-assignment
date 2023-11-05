import { PropsWithChildren } from "react";

export const NavBar = (props: PropsWithChildren) => (
  <div className="border-b flex items-center justify-between p-4" {...props} />
);
