import { useEffect, useState } from "react";
import { Button } from "./components/button";
import { NavBar } from "./components/navbar";
import { Select } from "./components/select";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/table";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/dialog";
import { Data } from "./types/data";
import { Chart } from "./components/chart";
import { Form } from "./components/form";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Data[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5173/api/users/1/analytics")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = (id: number) =>
    setData((data) => {
      return data.filter((d) => d.id !== id);
    });

  return (
    <div className="h-screen">
      <NavBar>
        <p className="text-xl font-semibold">Centime</p>
        <Select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          options={[
            { label: "English", value: "en" },
            { label: "Hindi", value: "hi" },
          ]}
        />
      </NavBar>
      <div className="flex p-5 gap-4">
        <div className="flex flex-col flex-none gap-4">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addEntry")}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("enterDetails")}</DialogTitle>
              </DialogHeader>
              <Form
                onSubmit={(data) => {
                  setData((oldData) => {
                    const newData = [
                      ...oldData,
                      { id: oldData.length + 1, ...data },
                    ];
                    return newData;
                  });
                }}
              />
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("source")}</TableHead>
                <TableHead>{t("target")}</TableHead>
                <TableHead>{t("value")}</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            {data.length > 0 ? (
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableData>{entry.source}</TableData>
                    <TableData>{entry.target}</TableData>
                    <TableData>{entry.value}</TableData>
                    <TableData>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (entry?.id) {
                            handleDelete(entry.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <p>{t("nothingToShow")}</p>
            )}
          </Table>
        </div>
        <div className="flex-auto">
          {data.length > 0 ? <Chart data={data} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
