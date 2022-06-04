import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import Radio from "../../ui/Radio/Radio";
import Select from "../../ui/Select/Select";
import TextInput from "../../ui/TextInput/TextInput";
import Form from "../Form/Form";
import MealItem from "./MealItem";
import classes from "./MealList.module.scss";
import NutrientsList from "./NutrientsList";

interface Props {}

type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type MealData = Record<Weekday, Meals>;

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
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calories, setCalories] = useState("");
  const [dietType, setDietType] = useState("");
  const [exclude, setExclude] = useState("");
  const [submittedCalories, setSubmittedCalories] = useState("");
  const [submittedDietType, setSubmittedDietType] = useState("");
  const [submittedExclude, setSubmittedExclude] = useState("");

  // TODO: remove
  const tempApiKey: string = "";
  // ef6fedd64246453e96f8f82e88c11ae6

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

  useEffect(() => {
    const params = new URLSearchParams({
      apiKey: tempApiKey
        ? tempApiKey
        : (process.env.REACT_APP_API_KEY as string),
      timeFrame: "week",
      targetCalories: submittedCalories,
      ...(submittedDietType && { diet: submittedDietType }),
      ...(submittedExclude && { exclude: submittedExclude }),
    });

    const fetchData = async () => {
      const url = `https://api.spoonacular.com/mealplanner/generate?${params.toString()}`;

      try {
        setIsLoading(true);

        const response = await fetch(url);
        const { week } = await response.json();

        setMealData(week);
      } catch (error) {
        console.log("Failed to fetch from API", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (submittedCalories || submittedDietType || submittedExclude) {
      fetchData();
    }
  }, [submittedCalories, submittedDietType, submittedExclude]);

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
              &#40;optional&#41; and colories count"
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
        <br />
        <label htmlFor="exclude">Do you have any allergies?</label>
        <br />
        <Select
          data={excludeList}
          selectAttributes={{
            name: "exclude",
            id: "exclude",
            defaultValue: exclude,
            onChange: handleExcludeChange,
          }}
        />
        <br />
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
        <br />
        <Button type="submit" label="Generate meal plan for a week" />
      </Form>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : mealData ? (
        <>
          <h2>Your delicious meal plan:</h2>
          <br />
          <ul>
            {Object.entries(mealData).map(([key, value]) => {
              return (
                <li key={key}>
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
                    <br />
                    <NutrientsList
                      calories={value.nutrients.calories}
                      carbohydrates={value.nutrients.carbohydrates}
                      fat={value.nutrients.fat}
                      protein={value.nutrients.protein}
                    />
                    <br />
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
