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
      <br />
      Carbohydrates: {carbohydrates}
      <br />
      Fat: {fat}
      <br />
      Protein: {protein}
      <br />
    </p>
  );
};

export default NutrientsList;
