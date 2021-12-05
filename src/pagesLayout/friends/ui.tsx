import { FC, useEffect } from "react";
import styled from "styled-components";

import { store, UserCard, actions } from "@/entities/user";
import { UserCardActionButton } from "@/features/user-card-action-button";

export const FriendsPage: FC = () => {
  const { useUsersStore } = store;
  const { getUsers } = actions;

  const users = useUsersStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <List>
        {users.map((user) => (
          <UserCard
            key={`${user.username}-${user.id}`}
            name={`${user.name} ${user.surname}`}
            username={user.username}
            link={user.username}
            actionButton={<UserCardActionButton isFriend />}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
`;

const List = styled.ul`
  margin: 0;
  padding: 10px 20px;

  list-style: none;
`;
