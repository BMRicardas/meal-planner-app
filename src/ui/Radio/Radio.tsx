import { FC, InputHTMLAttributes } from "react";
import classes from "./Radio.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  info?: string;
}

const Radio: FC<Props> = ({ id, label, info, ...inputProps }) => {
  return (
    <div className={classes["radio-item"]}>
      <input id={id} {...inputProps} className={classes["radio-item__input"]} />
      <label htmlFor={id} className={classes["radio-item__label"]}>
        {label}
      </label>
      <p className={classes["radio-item__paragraph"]}>{info}</p>
    </div>
  );
};

export default Radio;
