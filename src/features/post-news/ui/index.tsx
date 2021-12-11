import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Button, Input } from "@/shared/ui/atoms";
import { createPost, Post } from "@/shared/api/posts";

type PostNewsProps = {
  handleAddPost: (post: Post) => void;
};

export const PostNews: FC<PostNewsProps> = ({ handleAddPost }) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit: handleSubmitForm,
  } = useForm<{ content: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation("profile");

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsLoading(true);

      const {
        data: { message },
      } = await createPost(content);

      handleAddPost(message);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    setValue("content", "");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitForm(handleSubmit)}>
        <InputWrapper>
          <Input
            label={t("writePost")}
            textarea
            handleRegister={() => register("content", { required: true })}
            error={
              errors.content ? t(`errors:errors.${errors.content.type}`) : ""
            }
            required
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button type="submit" loading={isLoading}>
            {t("publish")}
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px 20px 0;
  margin-bottom: 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex-grow: 1;

  min-width: 220px;
  max-width: 400px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  flex-grow: 1;

  margin-bottom: 20px;
`;
