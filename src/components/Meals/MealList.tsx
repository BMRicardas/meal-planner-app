import { ChangeEvent, FC, FormEvent, useState } from "react";
import useRecipesData from "../../hooks/useRecipesData";
import Button from "../../ui/Button/Button";
import Radio from "../../ui/Radio/Radio";
import Select from "../../ui/Select/Select";
import TextInput from "../../ui/TextInput/TextInput";
import Form from "../Form/Form";
import MealItem from "./MealItem";
import NutrientsList from "./NutrientsList";
import classes from "./MealList.module.scss";

interface Props {}

type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type MealData = Record<Weekday, Meals>;

interface Meals {
  meals: Meal[];
  nutrients: Nutrients;
}

interface Meal {
  id: number;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  title: string;
}
interface Nutrients {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
}

const MealList: FC<Props> = () => {
  const [calories, setCalories] = useState("");
  const [dietType, setDietType] = useState("");
  const [exclude, setExclude] = useState("");
  const [submittedCalories, setSubmittedCalories] = useState("");
  const [submittedDietType, setSubmittedDietType] = useState("");
  const [submittedExclude, setSubmittedExclude] = useState("");

  const excludeList = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  const [isLoading, mealData] = useRecipesData(
    submittedCalories,
    submittedDietType,
    submittedExclude
  );

  const handleDietTypeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDietType(target.value);
  };

  const handleExcludeChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setExclude(target.value);
  };

  const handleCaloriesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCalories(target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedDietType(dietType);
    setSubmittedExclude(exclude);
    setSubmittedCalories(calories);
  };

  return (
    <>
      <Form
        title="Choose your diet type &#40;optional&#41;, allergy
              &#40;optional&#41; and calories count"
        onSubmit={handleSubmit}
      >
        <div className={classes["radio-boxes"]}>
          <Radio
            label="Vegetarian"
            type="radio"
            name="dietType"
            id="vegetarian"
            value="vegetarian"
            onChange={handleDietTypeChange}
            info="No ingredients may contain meat or meat by-products, such as bones
              or gelatin."
          />
          <Radio
            label="Lacto-Vegetarian"
            type="radio"
            name="dietType"
            id="lacto-vegetarian"
            value="lacto-vegetarian"
            onChange={handleDietTypeChange}
            info="All ingredients must be vegetarian and none of the ingredients can
              be or contain egg."
          />
          <Radio
            label="Ovo-Vegetarian"
            type="radio"
            name="dietType"
            id="ovo-vegetarian"
            value="ovo-vegetarian"
            onChange={handleDietTypeChange}
            info="All ingredients must be vegetarian and none of the ingredients can
              be or contain dairy."
          />
          <Radio
            label="Vegan"
            type="radio"
            name="dietType"
            id="vegan"
            value="vegan"
            onChange={handleDietTypeChange}
            info="No ingredients may contain meat or meat by-products, such as bones
              or gelatin, nor may they contain eggs, dairy, or honey."
          />
        </div>
        <Select
          data={excludeList}
          name="exclude"
          selectAttributes={{
            name: "exclude",
            id: "exclude",
            defaultValue: exclude,
            onChange: handleExcludeChange,
          }}
        />
        <TextInput
          label="How many calories do you want to eat every day?"
          type="number"
          inputMode="numeric"
          id="calories"
          value={calories}
          min={0}
          step={1}
          placeholder="e.g. 2000"
          required
          onChange={handleCaloriesChange}
        />
        <Button type="submit" label="Generate meal plan for a week" />
      </Form>

      {isLoading ? (
        <div className={classes["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : mealData ? (
        <>
          <h2 className={classes["meal-list__title"]}>
            Your delicious meal plan:
          </h2>
          <ul className={classes["meal-list"]}>
            {Object.entries(mealData).map(([key, value]) => {
              return (
                <li key={key} className={classes["meal-list__item"]}>
                  <h3>{key.toUpperCase()}</h3>
                  <ul>
                    {value.meals.map((meal) => {
                      return (
                        <MealItem
                          key={meal.id}
                          sourceUrl={meal.sourceUrl}
                          title={meal.title}
                        />
                      );
                    })}
                    <NutrientsList
                      calories={value.nutrients.calories}
                      carbohydrates={value.nutrients.carbohydrates}
                      fat={value.nutrients.fat}
                      protein={value.nutrients.protein}
                    />
                  </ul>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default MealList;
