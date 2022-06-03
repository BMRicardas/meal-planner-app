import { FC, useEffect, useState } from "react";
import classes from "./MealList.module.scss";

interface Props {}

// TODO: remove
const tempApiKey = "ef6fedd64246453e96f8f82e88c11ae6";

const MealList: FC<Props> = () => {
  const [mealData, setMealData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calories, setCalories] = useState("");
  const [dietType, setDietType] = useState("");
  const [exclude, setExclude] = useState("");
  const [submittedCalories, setSubmittedCalories] = useState("2000");
  const [submittedDietType, setSubmittedDietType] = useState("");
  const [submittedExclude, setSubmittedExclude] = useState("");

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

    fetchData();
  }, [submittedCalories, submittedDietType, submittedExclude]);

  const handleDietTypeChange = (event: any) => {
    setDietType(event.target.value);
  };

  const handleExclude = (event: any) => {
    setExclude(event.target.value);
  };

  const handleInput = (event: any) => {
    setCalories(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmittedDietType(dietType);
    setSubmittedExclude(exclude);
    setSubmittedCalories(calories);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Choose your diet type &#40;optional&#41;, allergy &#40;optional&#41;
            and colories count
          </legend>
          <div className={classes["radio-boxes"]}>
            <div>
              <input
                type="radio"
                name="dietType"
                id="vegetarian"
                value="vegetarian"
                onChange={handleDietTypeChange}
              />
              <label htmlFor="vegetarian">Vegetarian</label>
              <p>
                No ingredients may contain meat or meat by-products, such as
                bones or gelatin.
              </p>
            </div>
            <div>
              <input
                type="radio"
                name="dietType"
                id="lacto-vegetarian"
                value="lacto-vegetarian"
                onChange={handleDietTypeChange}
              />
              <label htmlFor="lacto-vegetarian">Lacto-Vegetarian</label>
              <p>
                All ingredients must be vegetarian and none of the ingredients
                can be or contain egg.
              </p>
            </div>
            <div>
              <input
                type="radio"
                name="dietType"
                id="ovo-vegetarian"
                value="ovo-vegetarian"
                onChange={handleDietTypeChange}
              />
              <label htmlFor="ovo-vegetarian">Ovo-Vegetarian</label>
              <p>
                All ingredients must be vegetarian and none of the ingredients
                can be or contain dairy.
              </p>
            </div>
            <div>
              <input
                type="radio"
                name="dietType"
                id="vegan"
                value="vegan"
                onChange={handleDietTypeChange}
              />
              <label htmlFor="vegan">Vegan</label>
              <p>
                No ingredients may contain meat or meat by-products, such as
                bones or gelatin, nor may they contain eggs, dairy, or honey.
              </p>
            </div>
          </div>
          <br />
          <label htmlFor="exclude">Do you have any allergies?</label>
          <br />
          <select
            name="exclude"
            id="exclude"
            defaultValue={exclude}
            onChange={handleExclude}
          >
            <option value="">---</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="grain">Grain</option>
            <option value="peanut">Peanut</option>
            <option value="seafood">Seafood</option>
            <option value="sesame">Sesame</option>
            <option value="shellfish">Shellfish</option>
            <option value="soy">Soy</option>
            <option value="sulfite">Sulfite</option>
            <option value="tree-nut">Tree Nut</option>
            <option value="wheat">Wheat</option>
          </select>
          <br />
          <label htmlFor="calories">
            How many calories do you want to eat every day?
          </label>
          <br />
          <input
            type="number"
            inputMode="numeric"
            id="calories"
            value={calories}
            min={0}
            step={1}
            placeholder="e.g. 2000"
            required
            onChange={handleInput}
          />
          <br />
          <button type="submit">Generate meal plan for a week</button>
        </fieldset>
      </form>

      {!isLoading ? (
        <>
          <h2>Your delicious meal plan:</h2>
          <br />
          <ul>
            {Object.entries(mealData).map(([key, value]) => {
              return (
                <li key={key}>
                  <h3>{key}</h3>
                  <ul>
                    {value.meals.map((meal: any) => {
                      return (
                        <li key={meal.id}>
                          <a
                            href={meal.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {meal.title}
                          </a>
                        </li>
                      );
                    })}
                    <br />
                    <p>
                      Calories: {value.nutrients.calories}
                      <br />
                      Carbohydrates: {value.nutrients.carbohydrates}
                      <br />
                      Fat: {value.nutrients.fat}
                      <br />
                      Protein: {value.nutrients.protein}
                      <br />
                    </p>
                    <br />
                  </ul>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default MealList;
