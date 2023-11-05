import { Sankey, Tooltip } from "recharts";
import { Data } from "../types/data";

const generateChartData = (data: Data[]) => {
  const nameSet = new Set();
  const nodes = [];
  const links = [];

  for (let i = 0; i < data.length; i++) {
    nameSet.add(data[i].source);
    nameSet.add(data[i].target);
  }

  const map = new Map([...nameSet].map((name, index) => [name, index]));

  for (let i = 0; i < data.length; i++) {
    const link = {
      source: map.get(data[i].source),
      target: map.get(data[i].target),
      value: data[i].value,
    };
    links.push(link);
  }

  for (const key of map.keys()) {
    nodes.push({
      name: key,
    });
  }

  return {
    nodes,
    links,
  };
};

export const Chart = ({ data }: { data: Data[] }) => {
  const resolvedData = generateChartData(data);

  return (
    <Sankey
      width={600}
      height={500}
      data={resolvedData}
      nodePadding={50}
      link={{ stroke: "#77c878" }}
    >
      <Tooltip />
    </Sankey>
  );
};
