import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../hooks/defineTyped";
import {
  getProduct,
  getProductColor,
  getSizes,
  getSize,
} from "../../services/api";
import { addToCart } from "../../features/cart/slice";
import { setSizes, setSizesLoaded } from "../../features/sizes/slice";
import { Color, Product } from "../../features/products/types";
import { Size } from "../../features/sizes/types";
import Dropdown from "../../components/Dropdown";

import styles from "./Detail.module.scss";

export default function Detail() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const sizes = useAppSelector((state) => state.sizes.items);
  const isSizesLoaded = useAppSelector((state) => state.sizes.sizesLoaded);

  const cart = useAppSelector((state) => state.cart.items);

  const [product, setProduct] = React.useState<Product>();
  const [productLoaded, setProductLoaded] = React.useState(false);

  const [currentColor, setCurrentCololr] = React.useState<Color>();
  const [currentColorId, setCurrentColorId] = React.useState<number>();

  const [currentSize, setCurrentSize] = React.useState<Size | null>();
  const [currentSizeId, setCurrentSizeId] = React.useState<number>();

  const [currentImage, setCurrentImage] = React.useState(1);

  const [uniqProduct, setUniqProduct] = React.useState(true);

  React.useEffect(() => {
    if (!isSizesLoaded) {
      getSizes()
        .then((res) => dispatch(setSizes(res)))
        .finally(() => dispatch(setSizesLoaded(true)));
    }
  }, [dispatch, isSizesLoaded]);

  React.useEffect(() => {
    if (id)
      getProduct(+id)
        .then((res) => {
          setProduct(res);
          setCurrentColorId(res.colors[0].id);
          setCurrentSizeId(res.colors[0].sizes[0]);
        })
        .finally(() => setProductLoaded(true));
  }, [id]);

  React.useEffect(() => {
    if (id && currentColorId) {
      setProductLoaded(false);
      getProductColor(+id, currentColorId)
        .then((res) => {
          setCurrentCololr(res);
          setCurrentSizeId(res.sizes[0]);
        })
        .finally(() => setProductLoaded(true));
    }
  }, [id, currentColorId]);

  React.useEffect(() => {
    currentSizeId
      ? getSize(currentSizeId).then((res) => setCurrentSize(res))
      : setCurrentSize(null);
  }, [currentSizeId]);

  React.useEffect(() => {
    setUniqProduct(
      !cart.find(
        (item) =>
          item.title === product?.name &&
          item.color === currentColor?.name &&
          item.size === currentSize?.label
      )
    );
  }, [cart, product, currentColor, currentSize]);

  const handleAddToCart = () => {
    if (currentSize && uniqProduct) {
      const newCartProduct = {
        title: product?.name || "",
        color: currentColor?.name || "",
        size: currentSize.label,
        price: currentColor?.price || "",
        image: currentColor?.images[0] || "",
      };
      dispatch(addToCart(newCartProduct));
      setUniqProduct(false);
    }
  };

  return (
    <>
      {productLoaded && (
        <div className={styles.detail}>
          <div className={styles.left}>
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.description}>{currentColor?.description}</p>
            <button
              className={`${styles.btn} ${
                (!currentSize || !uniqProduct) && styles.disable
              }`}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </button>
          </div>
          <div className={styles.dropdowns}>
            <div className={styles.label}>Цвет:</div>
            <Dropdown header={currentColor?.name}>
              {product?.colors?.map((i) => (
                <div
                  key={i.id}
                  onClick={() => setCurrentColorId(i.id)}
                  className={styles.dropdownItem}
                >
                  {i.name}
                </div>
              ))}
            </Dropdown>

            <div className={styles.label}>размер:</div>
            <Dropdown header={currentSize?.label || ""}>
              {sizes?.map((size) => (
                <div
                  key={size.id}
                  onClick={() =>
                    currentColor?.sizes?.includes(size.id) &&
                    setCurrentSizeId(size.id)
                  }
                  className={
                    currentColor?.sizes?.includes(size.id)
                      ? styles.dropdownItem
                      : styles.dropdownItemDisabled
                  }
                >
                  {size.label}
                </div>
              ))}
            </Dropdown>
            <p className={styles.price}>Цена: {currentColor?.price}$</p>
          </div>

          <div className={styles.images}>
            {currentColor?.images.map(
              (image, index) =>
                index + 1 === currentImage && (
                  <img
                    key={image}
                    src={image}
                    alt={`${product?.name} ${index}`}
                  />
                )
            )}
            <div className={styles.btnWrapper}>
              {currentColor?.images.map((image, index) => (
                <button key={image} onClick={() => setCurrentImage(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {!productLoaded && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
    </>
  );
}
