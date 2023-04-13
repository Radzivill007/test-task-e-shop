import React from "react";
import { Link } from "react-router-dom";

import styles from "./ProductCard.module.scss";

interface Props {
  id: number;
  img?: string;
  name?: string;
}

export default function ProductCard({ id, img, name }: Props) {
  return (
    <div className={styles.productCard} key={id.toString()}>
      <Link className={styles.link} to={`/detail/${id}`}>
        <img className={styles.img} src={img} alt={"img"} />
        <h2>{name}</h2>
      </Link>
    </div>
  );
}
