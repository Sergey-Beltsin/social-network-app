import { FC } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Profile } from "@/shared/api/profile";

type ProfileCardProps = {
  user: Profile;
};

export const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
  const { t } = useTranslation("profile");

  return (
    <Container>
      <Title className="visually-hidden">
        {t("title", { user: `${user.name} ${user.surname}` })}
      </Title>
      <Name>
        {user.name} {user.surname}
      </Name>
      <Username>@{user.username}</Username>
      {user.bio && <Bio>{user.bio}</Bio>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1``;

const Name = styled.h3`
  display: block;

  margin-top: 0;
  margin-bottom: 4px;

  font-size: 14px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 18px;
  }
`;

const Username = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 12px;
  }
`;

const Bio = styled.span`
  display: block;

  margin-top: 10px;
  margin-bottom: 30px;

  font-size: 16px;
`;
