import { FC } from "react";

interface Props {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
}

const NutrientsList: FC<Props> = ({
  calories,
  carbohydrates,
  fat,
  protein,
}) => {
  return (
    <p>
      Calories: {calories}
      Carbohydrates: {carbohydrates}
      Fat: {fat}
      Protein: {protein}
    </p>
  );
};

export default NutrientsList;
