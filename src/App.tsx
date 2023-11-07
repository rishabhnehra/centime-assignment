import { useState } from "react";
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/dialog";
import { Chart } from "./components/chart";
import { Form } from "./components/form";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "./hooks/useAnalytics";

function App() {
  const { t, i18n } = useTranslation();
  const { data, setData } = useAnalytics();
  const [id, setId] = useState<number>();
  const [open, setOpen] = useState(false);

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
  };

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
      <div className="flex justify-center gap-12  p-5">
        <div className="flex flex-none flex-col gap-4">
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
                formData={data.find((d) => d.id === id)}
                onSubmit={(newData) => {
                  setData((oldData) => {
                    if (newData.id !== undefined) {
                      return oldData.map((data) =>
                        data.id === id ? { ...data, ...newData } : data,
                      );
                    }
                    return [...oldData, { id: oldData.length + 1, ...newData }];
                  });
                  setOpen(false);
                  setId(undefined);
                }}
              />
            </DialogContent>
          </Dialog>
          {data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("source")}</TableHead>
                  <TableHead>{t("target")}</TableHead>
                  <TableHead>{t("value")}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableData>{entry.source}</TableData>
                    <TableData>{entry.target}</TableData>
                    <TableData>{entry.value}</TableData>
                    <TableData>
                      <Button
                        aria-label="delete"
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
                      <Button
                        aria-label="edit"
                        className="ml-2"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setOpen(true);
                          setId(entry.id);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>{t("nothingToShow")}</p>
          )}
        </div>
        <div className="basis-[600px]">
          {data.length > 0 ? <Chart data={data} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
