import { FormErrors } from "@/interfaces/props/form/errors";

const FormError = ({ errors }: FormErrors) => {
  return (
    <>
      {errors?.title ? (
        <>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </>
      ) : null}
    </>
  );
};

export default FormError;
