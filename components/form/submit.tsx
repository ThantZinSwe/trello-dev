"use client";

import { Button } from "@/components/ui/button";
import { FormSubmitProps } from "@/interfaces/props/form/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

const FormSubmitButton = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      size="sm"
      variant={variant}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};

export default FormSubmitButton;
