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
      <input id={id} {...inputProps} />
    </div>
  );
};

export default TextInput;
