import { KeyboardEventHandler } from "react";

export interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeydown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}
