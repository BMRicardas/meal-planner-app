import { ButtonHTMLAttributes, FC } from "react";
import classes from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<Props> = ({ label, ...buttonProps }) => {
  return (
    <button {...buttonProps} className={classes.button}>
      {label}
    </button>
  );
};

export default Button;
