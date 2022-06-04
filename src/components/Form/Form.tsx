import { FC, FormHTMLAttributes, ReactNode } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  title: string;
}

const Form: FC<Props> = ({ children, title, ...restOfProps }) => {
  return (
    <form {...restOfProps}>
      <fieldset>
        <legend>
          {title}
          Choose your diet type &#40;optional&#41;, allergy &#40;optional&#41;
          and colories count
        </legend>
        {children}
      </fieldset>
    </form>
  );
};

export default Form;
