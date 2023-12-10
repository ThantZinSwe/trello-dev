"use client";

import { Button } from "@/components/ui/button";
import { FormButtonProps } from "@/interfaces/props/form/button";
import { useFormStatus } from "react-dom";

const FormButton = ({
  text,
  type,
  size = "default",
  variant = "default",
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type={type} disabled={pending} size={size} variant={variant}>
      {text}
    </Button>
  );
};

export default FormButton;
