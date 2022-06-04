import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<Props> = ({ label, ...buttonProps }) => {
  return <button {...buttonProps}>{label}</button>;
};

export default Button;
