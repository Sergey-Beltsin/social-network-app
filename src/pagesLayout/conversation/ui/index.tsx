import {
  FC,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import useTranslation from "next-translate/useTranslation";
import { store, actions } from "@/entities/messages";
import {
  ConversationHeader,
  ConversationMessage,
} from "@/shared/ui/atoms/conversation";
import { SendMessage } from "@/features/send-message";
import { Profile } from "@/shared/api/profile";
import { getUserById } from "@/shared/api/users";
import { store as profileStore } from "@/entities/profile";
import { compareDatesByDay } from "@/shared/lib/utils";
import { months } from "@/shared/lib/constants";

type MessagesProps = {
  center: boolean;
};

export const ConversationPage: FC = () => {
  const { useMessagesStore, useActiveConversationStore } = store;
  const { useProfileStore } = profileStore;
  const { handleSetActiveConversation, handleReset } = actions;

  const conversations = useMessagesStore();
  const activeConversation = useActiveConversationStore();
  const profile = useProfileStore();
  const {
    query: { username },
    back,
  } = useRouter();
  const { t } = useTranslation("messages");
  const [user, setUser] = useState<Profile | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const firstMessageDate = new (window.Date as any)(
    activeConversation?.messages[0]?.created,
  );

  useLayoutEffect(() => {
    if (username) {
      const currentConversation = conversations.find(
        (message) =>
          message.users.find((item) => item.id !== profile.id)?.username ===
          username,
      );

      if (currentConversation) {
        handleSetActiveConversation(currentConversation.id);
      }

      (async function () {
        const {
          data: { message },
        } = await getUserById(
          Array.isArray(username) ? username.join("") : username,
        );

        setUser(message);
      })();
    }
  }, [username, conversations]);

  useEffect(() => {
    const handlePressEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        back();
      }
    };

    document.addEventListener("keydown", handlePressEscape);

    return () => {
      document.removeEventListener("keydown", handlePressEscape);
      handleReset();
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      const maxScroll =
        messagesRef.current.scrollHeight - messagesRef.current.offsetHeight;
      console.log(
        "conversations",
        messagesRef.current.scrollHeight,
        messagesRef.current.offsetHeight,
      );

      if (maxScroll - messagesRef.current.scrollTop < 100) {
        messagesRef.current.scrollTo(messagesRef.current.scrollLeft, maxScroll);
      }
    }
  }, [conversations, messagesRef]);

  useEffect(() => {
    if (messagesRef.current) {
      const maxScroll =
        messagesRef.current.scrollHeight - messagesRef.current.offsetHeight;
      console.log(
        messagesRef.current.scrollHeight,
        messagesRef.current.offsetHeight,
      );
      messagesRef.current.scrollTo(messagesRef.current.scrollLeft, maxScroll);
    }
  }, [messagesRef]);

  useEffect(() => {
    console.log(lastMessageRef);
  }, [lastMessageRef.current]);

  const getMessages = () =>
    activeConversation?.messages?.map((message, index) => {
      const currentNewDate =
        activeConversation.messages[index + 1]?.created &&
        new (window.Date as any)(
          activeConversation.messages[index + 1]?.created,
        );

      return (
        <Fragment key={message.id}>
          <ConversationMessage message={message} />
          {currentNewDate &&
            compareDatesByDay(message.created, currentNewDate) && (
              <MessagesDate>
                {t(`date:months.${months[currentNewDate.getMonth()]}`)},{" "}
                {currentNewDate.getDate()}
              </MessagesDate>
            )}
        </Fragment>
      );
    });

  return (
    <Container>
      <ConversationHeader
        user={
          activeConversation
            ? activeConversation.users.find((item) => item.id !== profile.id) ||
              null
            : user
        }
      />
      <Messages center={!activeConversation} ref={messagesRef}>
        {activeConversation ? (
          <>
            <MessagesDate>
              {t(`date:months.${months[firstMessageDate?.getMonth()]}`)},{" "}
              {firstMessageDate?.getDate()}
            </MessagesDate>
            {getMessages()}
          </>
        ) : (
          <NoMessagesText>
            {t("noMessages", {
              username: user?.username ? `@${user?.username}` : "",
            })}
          </NoMessagesText>
        )}
      </Messages>
      <SendMessage
        conversationId={activeConversation?.id || null}
        user={user}
      />
    </Container>
  );
};

const Container = styled.div``;

const Messages = styled.div<MessagesProps>`
  display: flex;
  flex-direction: column;
  ${({ center }) => center && "justify-content: center;"}

  height: calc(100vh - 280px);
  padding: 10px 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    height: calc(100vh - 232px);
  }
`;

const NoMessagesText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const MessagesDate = styled.span`
  display: block;

  margin: 10px 0;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
