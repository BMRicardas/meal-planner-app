import { FC } from "react";
import classes from "./Meal.module.scss";

type Props = {
  sourceUrl: string;
  title: string;
};

const MealItem: FC<Props> = ({ sourceUrl, title }) => {
  return (
    <li>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  );
};

export default MealItem;
