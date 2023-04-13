import React from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/defineTyped";
import { getProducts } from "../../services/api";
import { setProducts, setProductsLoaded } from "../../features/products/slice";
import ProductCard from "../../components/ProductCard";

import styles from "./Home.module.scss";

export default function Home() {
  const products = useAppSelector((state) => state.products.items);
  const isProductsLoaded = useAppSelector(
    (state) => state.products.productsLoaded
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isProductsLoaded) {
      getProducts()
        .then((res) => dispatch(setProducts(res)))
        .finally(() => dispatch(setProductsLoaded(true)));
    }
  }, [dispatch, isProductsLoaded]);

  return (
    <div className={styles.products}>
      {isProductsLoaded &&
        (products?.length ? (
          <>
            <h1>Продукты</h1>
            <div className={styles.cards}>
              {products?.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  img={item.colors[0].images[0]}
                  name={item.name}
                />
              ))}
            </div>
          </>
        ) : (
          <h1>Нет продуктов...</h1>
        ))}
      {!isProductsLoaded && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}
