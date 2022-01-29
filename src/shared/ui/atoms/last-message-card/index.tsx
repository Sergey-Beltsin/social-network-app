import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { Profile } from "@/shared/api/profile";

type LastMessageCardProps = {
  user: Profile;
  message: string;
  created: Date;
  isOwnerMessage: boolean;
};

export const LastMessageCard: FC<LastMessageCardProps> = ({
  user,
  message,
  created,
  isOwnerMessage,
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation("messages");

  return (
    <Container>
      <Link href={`/messages/${user.username}`} passHref>
        <Href>
          <NameWrapper>
            <Name>
              {user.name} {user.surname}
            </Name>
            <Date>
              <ReactTimeAgo
                date={new (window.Date as any)(created)}
                locale={locale}
              />
            </Date>
          </NameWrapper>
          <Message>
            {isOwnerMessage && <BoldText>{t("you")}: </BoldText>}
            {message}
          </Message>
        </Href>
      </Link>
    </Container>
  );
};

const Href = styled.a`
  display: block;

  padding: 14px 20px;

  text-decoration: none;

  transition: 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiaryLight};
  }
`;

const Container = styled.li`
  &:not(:last-child) ${Href} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:first-child ${Href} {
    border-radius: 4px 4px 0 0;
  }

  &:last-child ${Href} {
    border-radius: 0 0 4px 4px;
  }

  &:first-child:last-child ${Href} {
    border-radius: 4px;
  }
`;

const NameWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 4px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    margin-bottom: 6px;
  }
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 600;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const Message = styled.span`
  display: block;

  font-size: 12px;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
