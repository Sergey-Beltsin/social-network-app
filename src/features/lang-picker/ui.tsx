import { FC } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { Dropdown, DropdownItems } from "@/shared/ui/atoms";
import { LangIcon } from "@/shared/lib/icons/common";

export const LangPicker: FC = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t } = useTranslation("languages");

  const dropdownItems: DropdownItems =
    router.locales?.map((locale) => ({
      title: t(locale),
      onClick: () => router.push({ pathname, query }, asPath, { locale }),
    })) || [];

  return (
    <Dropdown
      items={dropdownItems}
      trigger="hover"
      selectedItem={dropdownItems.findIndex(
        (item) => item.title === t(router.locale || ""),
      )}
    >
      <DropdownTrigger>
        <LangIcon />
        <Title>{t(router.locale || "")}</Title>
      </DropdownTrigger>
    </Dropdown>
  );
};

const DropdownTrigger = styled.span`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  display: block;

  margin-left: 6px;

  font-weight: 500;
`;
