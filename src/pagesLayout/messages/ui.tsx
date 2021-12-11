import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import { Container } from "@/shared/ui/atoms";

export const MessagesPage: NextPage = () => {
  const { t } = useTranslation("common");

  return <Container stretchDesktop>{t("helloWorld")}</Container>;
};
