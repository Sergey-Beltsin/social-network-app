import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

export const MessagesPage: NextPage = () => {
  const { t } = useTranslation("common");

  return <div>{t("helloWorld")}</div>;
};
