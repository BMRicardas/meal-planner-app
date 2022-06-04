import { useEffect, useState } from "react";
import { MealData } from "../components/Meals/MealList";

const useRecepiesData = (
  submittedCalories: string,
  submittedDietType: string,
  submittedExclude: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MealData | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      apiKey: process.env.REACT_APP_API_KEY as string,
      timeFrame: "week",
      targetCalories: submittedCalories,
      ...(submittedDietType && { diet: submittedDietType }),
      ...(submittedExclude && { exclude: submittedExclude }),
    });

    const url = `https://api.spoonacular.com/mealplanner/generate?${params.toString()}`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const { week } = await response.json();
        setData(week);
      } catch (error) {
        console.error("Failed to fetch from API", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (submittedCalories || submittedDietType || submittedExclude) {
      fetchData();
    }
  }, [submittedCalories, submittedDietType, submittedExclude]);
  return [isLoading, data] as const;
};

export default useRecepiesData;
