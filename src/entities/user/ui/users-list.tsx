import { FC, ReactElement } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Profile } from "@/shared/api/profile";
import { ListEmptyText, Loader } from "@/shared/ui/atoms";
import { UserCard } from "@/entities/user";

type UserListProps = {
  isLoading: boolean;
  users: Profile[];
  getActionButton: (user: Profile) => ReactElement;
};

export const UsersList: FC<UserListProps> = ({
  isLoading,
  users,
  getActionButton,
}) => {
  const { t } = useTranslation("common");

  const getUserList = () => {
    if (!users.length) {
      return <ListEmptyText>{t("listEmpty")}</ListEmptyText>;
    }

    return (
      <List>
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={`${user.name} ${user.surname}`}
            username={user.username}
            link={user.username}
            actionButton={getActionButton(user)}
          />
        ))}
      </List>
    );
  };

  return <Container>{isLoading ? <Loader center /> : getUserList()}</Container>;
};

const Container = styled.div`
  width: 100%;
  padding: 10px 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-sizing: border-box;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
`;
