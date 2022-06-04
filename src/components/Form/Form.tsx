import { FC, FormHTMLAttributes, ReactNode } from "react";
import classes from "./Form.module.scss";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  title: string;
}

const Form: FC<Props> = ({ children, title, ...restOfProps }) => {
  return (
    <form {...restOfProps} className={classes.form}>
      <fieldset className={classes["form__fieldset"]}>
        <legend className={classes["form__legend"]}>{title}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default Form;
