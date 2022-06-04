import { FC, OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import classes from "./Select.module.scss";

interface Props {
  data: string[];
  name: string;
  selectAttributes: SelectHTMLAttributes<HTMLSelectElement>;
  optionAttributes?: OptionHTMLAttributes<HTMLOptionElement>;
}

const Select: FC<Props> = ({
  data,
  name,
  selectAttributes,
  optionAttributes,
}) => {
  return (
    <div className={classes["select-item"]}>
      <label htmlFor={name} className={classes["select-item__label"]}>
        Do you have any allergies?
      </label>
      <select name={name} {...selectAttributes}>
        <option value="" {...optionAttributes}>
          ---
        </option>
        {data.map((item, i) => {
          return (
            <option key={i} value={item} {...optionAttributes}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
