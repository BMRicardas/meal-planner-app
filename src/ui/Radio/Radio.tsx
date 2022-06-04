import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  info?: string;
}

const Radio: FC<Props> = ({ id, label, info, ...inputProps }) => {
  return (
    <>
      <input id={id} {...inputProps} />
      <label htmlFor={id}>{label}</label>
      <p>{info}</p>
    </>
  );
};

export default Radio;
