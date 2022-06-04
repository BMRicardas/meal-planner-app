import { FC } from "react";
import classes from "./MealItem.module.scss";

type Props = {
  sourceUrl: string;
  title: string;
};

const MealItem: FC<Props> = ({ sourceUrl, title }) => {
  return (
    <li className={classes["meal-item"]}>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  );
};

export default MealItem;
