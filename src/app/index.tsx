import { FC, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Cookies from "js-cookie";
import useTranslation from "next-translate/useTranslation";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { io } from "socket.io-client";

import { AlertMessage, Container } from "@/shared/ui/atoms";
import { ThemeProvider } from "@/shared/lib/theme";
import { Navigation, Header } from "@/widgets";
import { ProtectedRoute } from "@/shared/lib/hocs";
import { Auth, actions, store as profileStore } from "@/entities/profile";
import { DEFAULT_BASE_URL } from "@/shared/api/base";
import {
  actions as messagesActions,
  store as messagesStore,
} from "@/entities/messages";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

type MainWrapperProps = {
  notPaddingBottom: boolean;
};

export const App: FC = ({ children }) => {
  const { getProfile } = actions;
  const {
    handleSetSocket,
    handleSetConversations,
    handlePrependConversation,
    handlePushMessage,
  } = messagesActions;
  const { useMessagesSocketStore } = messagesStore;
  const { useProfileStore } = profileStore;

  const socket = useMessagesSocketStore();
  const profile = useProfileStore();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (Cookies.get("token")) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("getConversations");

      socket?.on("conversations", (currentConversations) => {
        console.log("Get conversations! ", currentConversations);
        handleSetConversations(currentConversations);
      });
      socket?.on("newMessage", (message) => {
        console.log("New message! ", message);
        handlePushMessage(message);
      });
      socket?.on("newConversation", (conversation) => {
        console.log("new conversation!", conversation);
        handlePrependConversation(conversation);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (!profile.id) {
      socket?.disconnect();
    } else {
      handleSetSocket(
        io(process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL, {
          extraHeaders: {
            authorization: Cookies.get("token") || "",
          },
        }),
      );
    }
  }, [profile.id]);

  return (
    <ThemeProvider>
      <ProtectedRoute>
        <Header />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <MainWrapper notPaddingBottom={!Auth.getIsAuth()}>
          <AlertWrapper>
            <AlertMessage name="devAlert" hideOnTime={86400}>
              {t("devAlert")}
            </AlertMessage>
          </AlertWrapper>
          <Container>
            {Auth.getIsAuth() && <Navigation />}
            <Main>{children}</Main>
          </Container>
        </MainWrapper>
      </ProtectedRoute>
    </ThemeProvider>
  );
};

const Main = styled.main`
  display: flex;

  min-height: 100%;
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    margin: 0;
  }

  & > div {
    width: 100%;
  }
`;

const AlertWrapper = styled.div`
  margin-bottom: 19px;
`;

const MainWrapper = styled.div<MainWrapperProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  padding-top: 49px;
  padding-bottom: ${({ notPaddingBottom }) =>
    notPaddingBottom ? "20px" : "68px"};

  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    padding-bottom: 20px;

    & > ${Container} {
      display: flex;
      align-items: flex-start;
      flex-grow: 1;
    }
  }
`;
