import { FC, OptionHTMLAttributes, SelectHTMLAttributes } from "react";

interface Props {
  data: string[];
  selectAttributes: SelectHTMLAttributes<HTMLSelectElement>;
  optionAttributes?: OptionHTMLAttributes<HTMLOptionElement>;
}

const Select: FC<Props> = ({ data, selectAttributes, optionAttributes }) => {
  return (
    <select {...selectAttributes}>
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
  );
};

export default Select;
