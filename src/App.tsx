import classes from "./App.module.scss";
import MealList from "./components/Meals/MealList";

const App = () => {
  return (
    <div className={classes.app}>
      <MealList />
    </div>
  );
};

export default App;
