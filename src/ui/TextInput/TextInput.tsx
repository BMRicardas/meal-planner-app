import { FC, InputHTMLAttributes } from "react";
import classes from "./TextInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const TextInput: FC<Props> = ({ id, label, ...inputProps }) => {
  return (
    <div className={classes["text-input"]}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} className={classes["text-input__input"]} />
    </div>
  );
};

export default TextInput;
