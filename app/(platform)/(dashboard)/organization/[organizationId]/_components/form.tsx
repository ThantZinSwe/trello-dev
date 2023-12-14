"use client";

import { createBoard } from "@/actions/board/create";
import FormButton from "@/components/form/button";
import FormError from "@/components/form/error";
import FormInput from "@/components/form/input";
import useAction from "@/hooks/useAction";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput name="title" id="title" placeholder="Enter title" />
        <FormError errors={fieldErrors} />
      </div>
      <FormButton type="submit" text="Create" size="sm" />
    </form>
  );
};

export default Form;
