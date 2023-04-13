import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../hooks/defineTyped";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <>
      <nav className={styles.navWrapper}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <Link to={"/"} className={styles.link}>
              На главную
            </Link>
            <Link to={"/cart"} className={styles.link}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.22803 2.96777H2.88227C3.36066 2.96777 3.59985 2.96777 3.79431 3.05451C3.96573 3.13098 4.11217 3.25415 4.21688 3.40994C4.33566 3.58666 4.37664 3.82231 4.45861 4.29363L4.83672 6.46777M4.83672 6.46777L5.71975 11.5452C5.89893 12.5755 5.98852 13.0906 6.25385 13.4617C6.48748 13.7885 6.81409 14.0373 7.19113 14.1758C7.61935 14.3331 8.13979 14.2828 9.18067 14.182L18.842 13.2471C19.8579 13.1488 20.3658 13.0996 20.7502 12.8711C21.0933 12.667 21.3675 12.365 21.5376 12.0038C21.728 11.5992 21.728 11.0889 21.728 10.0683V10.0683C21.728 8.9836 21.728 8.44126 21.5202 8.02171C21.3348 7.64749 21.037 7.34067 20.6684 7.14431C20.2552 6.92418 19.7131 6.90813 18.6289 6.87604L4.83672 6.46777Z"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>

                <circle
                  cx="8.72803"
                  cy="19.4678"
                  r="2"
                  strokeWidth="1.4"
                ></circle>

                <circle
                  cx="18.228"
                  cy="19.4678"
                  r="2"
                  strokeWidth="1.4"
                ></circle>
              </svg>
              <span>{cart.length}</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.container}>{children}</div>
    </>
  );
}
