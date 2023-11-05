import { PropsWithChildren } from "react";

export const Table = (props: PropsWithChildren) => (
  <table className="w-full" {...props} />
);

export const TableHeader = (props: PropsWithChildren) => (
  <thead className="border-b" {...props} />
);

export const TableRow = (props: PropsWithChildren) => (
  <tr className="border-b transition-colors hover:bg-muted/50" {...props} />
);

export const TableHead = (props: PropsWithChildren) => (
  <th className="h-12 px-4 font-medium text-muted-foreground" {...props} />
);

export const TableData = (props: PropsWithChildren) => (
  <td className="p-4" {...props} />
);

export const TableBody = (props: PropsWithChildren) => (
  <tbody className="[&_tr:last-child]:border-0" {...props} />
);
