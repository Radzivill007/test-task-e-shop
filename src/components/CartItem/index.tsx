import React from "react";
import { useAppDispatch } from "../../hooks/defineTyped";
import { removeFromCart } from "../../features/cart/slice";
import styles from "./CartItem.module.scss";

interface Props {
  title?: string;
  size?: string;
  color?: string;
  price?: string;
  image?: string;
}

export default function CartItem({ title, size, color, price, image }: Props) {
  const dispatch = useAppDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ title, color, size }));
  };

  return (
    <div key={`${title} ${size} ${color}`} className={styles.cartItem}>
      <img
        src={image}
        alt={`${title} ${size} ${color}`}
        className={styles.img}
      />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.text}>Цвет: {color}</div>
      <div className={styles.text}>Размер: {size}</div>
      <div className={styles.text}>Цена: {price}</div>
      <button className={styles.btn} onClick={handleRemoveItem}>
        Удалить
      </button>
    </div>
  );
}
