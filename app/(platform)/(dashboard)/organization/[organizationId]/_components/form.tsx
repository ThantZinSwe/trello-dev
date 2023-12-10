"use client";

import create from "@/actions/board/create";
import FormButton from "@/components/form/button";
import FormError from "@/components/form/error";
import FormInput from "@/components/form/input";
import { useFormState } from "react-dom";

const Form = () => {
  const initialState = {
    message: "",
    errors: {},
  };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput name="title" id="title" placeholder="Enter title" />
        <FormError errors={state?.errors} />
      </div>
      <FormButton type="submit" text="Create" size="sm" />
    </form>
  );
};

export default Form;
