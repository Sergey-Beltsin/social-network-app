import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import { Profile } from "@/shared/api/profile";
import { ArrowIcon } from "@/shared/lib/icons/common";
import { Loader } from "@/shared/ui/atoms";

type ConversationHeaderProps = {
  user: Profile | null;
};

type ContainerProps = {
  center: boolean;
};

export const ConversationHeader: FC<ConversationHeaderProps> = ({ user }) => {
  const { t } = useTranslation("common");
  const { back } = useRouter();

  const handleClickBackButton = () => {
    back();
  };

  return (
    <Container center={!user}>
      {user ? (
        <>
          <BackLink onClick={handleClickBackButton}>
            <ArrowIcon />
            {t("back")}
          </BackLink>
          <Link href={`/${user.username}`} passHref>
            <Name>
              {user.name} {user.surname}
            </Name>
          </Link>
          <Wrapper />
        </>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};

  height: 50px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px 8px 0 0;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  align-self: stretch;

  padding: 0 20px;

  background-color: transparent;
  border: none;
  cursor: pointer;

  font-size: 12px;
  text-decoration: none;

  & > svg {
    margin-right: 12px;

    transform: rotate(180deg);
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  width: 50px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    width: 100px;
    padding-right: 20px;
  }
`;

const Name = styled.a`
  font-size: 12px;
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
