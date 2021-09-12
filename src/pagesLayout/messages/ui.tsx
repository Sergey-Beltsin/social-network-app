import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

export const Messages: NextPage = () => {
  const { t } = useTranslation("common");

  return <div>{t("helloWorld")}</div>;
};
