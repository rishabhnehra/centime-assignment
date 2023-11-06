import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Data, DataSchema } from "../types/data";
import { Input } from "./input";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

export const Form = ({ onSubmit }: { onSubmit: SubmitHandler<Data> }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(DataSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          label={t("source")}
          placeholder={t("sourcePlaceholder")}
          errorMessage={errors.source?.message}
          {...register("source")}
        />
        <Input
          type="text"
          label={t("target")}
          placeholder={t("targetPlaceholder")}
          errorMessage={errors.target?.message}
          {...register("target")}
        />
        <Input
          type="number"
          label={t("value")}
          placeholder={t("valuePlaceholder")}
          errorMessage={errors.value?.message}
          {...register("value", {
            setValueAs: (value) => Number(value),
          })}
        />
      </div>
      <div className="flex flex-col-reverse">
        <Button className="mt-4" type="submit">
          {t("saveChange")}
        </Button>
        {/* <Input type="submit" name="saveChange" /> */}
      </div>
    </form>
  );
};
