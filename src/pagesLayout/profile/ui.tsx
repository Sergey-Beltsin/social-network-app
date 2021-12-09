import { NextPage } from "next";
import styled from "styled-components";

import { store } from "@/entities/profile";
import { ProfileCard } from "@/shared/ui/molecules";
import { PostNews } from "@/features/post-news";

export const ProfilePage: NextPage = () => {
  const { useProfileStore } = store;
  const profile = useProfileStore();

  return (
    <Container>
      <ProfileCard user={profile} />
      <PostNews />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
