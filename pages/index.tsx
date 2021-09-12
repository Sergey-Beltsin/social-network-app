import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { News } from "@/pages/news";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default News;
