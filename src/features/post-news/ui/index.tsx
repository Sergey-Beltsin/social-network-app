import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Button, Input } from "@/shared/ui/atoms";
import { createPost } from "@/shared/api/posts";

export const PostNews: FC = () => {
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

      await createPost(content);
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
        <Input
          label={t("writePost")}
          textarea
          handleRegister={() => register("content", { required: true })}
          error={
            errors.content ? t(`errors:errors.${errors.content.type}`) : ""
          }
          required
        />
        <Button type="submit" loading={isLoading}>
          {t("publish")}
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px 20px 20px;
  margin-bottom: 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;

  & > label {
    margin-right: 20px;
  }
`;
