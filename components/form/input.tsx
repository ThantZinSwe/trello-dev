"use client";

import { FormInputProps } from "@/interfaces/props/form/input";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

const FormInput = ({
  name,
  id,
  placeholder,
  type = "text",
}: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <Input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      disabled={pending}
    />
  );
};

export default FormInput;
