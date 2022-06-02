import { FC } from "react";

type Props = {
  image: string;
  title: string;
};

const ProductItem: FC<Props> = ({ image, title }) => {
  return (
    <li>
      <img src={image} alt={title} />
      <p>{title}</p>
    </li>
  );
};

export default ProductItem;
