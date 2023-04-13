import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAppSelector } from "../../hooks/defineTyped";
import CartItem from "../../components/CartItem";
import styles from "./Cart.module.scss";

export default function Cart() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const cart = useAppSelector((state) => state.cart.items);

  return (
    <div className={styles.cart}>
      <button onClick={handleGoBack}>Назад</button>
      {cart.length ? (
        <>
          <h1 className={styles.title}>Корзина</h1>
          <div className={styles.items}>
            {cart?.map((item) => (
              <CartItem
                key={`${item.title} ${item.color} ${item.size}`}
                title={item.title}
                size={item.size}
                color={item.color}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <h1 className={styles.title}>Корзина пока пуста</h1>
          <Link to={"/"}>Вернуться на главную</Link>
        </div>
      )}
    </div>
  );
}
