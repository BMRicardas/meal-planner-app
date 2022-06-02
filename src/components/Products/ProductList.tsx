import { FC, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.scss";

interface Props {}

const dummyData = [
  {
    id: 192386,
    title: "Pizza Buddy Pizza Dough, 16 oz",
    image: "https://spoonacular.com/productImages/192386-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 531751,
    title: "Pizza Corner Pizza Corner  Pizza, 24 oz",
    image: "https://spoonacular.com/productImages/531751-312x231.jpeg",
    imageType: "jpeg",
  },
];

const ProductList: FC<Props> = () => {
  const [data, setData] = useState<any[]>(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://api.spoonacular.com/food/products/search?apiKey=${process.env.REACT_APP_API_KEY}&query=pizza&number=2`;

  useEffect(() => {
    setIsLoading(true);
    if (data.length !== 0) {
      return setIsLoading(false);
    }
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data.products);
          setData(data.products);
        } catch (error) {
          console.log("error", error);
        }
      };

      setIsLoading(false);
      fetchData();
    }, 1000);
  }, [data.length, url]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <ul className={classes["product-list"]}>
        {data.map((product) => {
          return (
            <ProductItem
              key={product.id}
              image={product.image}
              title={product.title}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ProductList;
