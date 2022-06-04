import { FC } from "react";
import classes from "./Footer.module.scss";

const Footer: FC = () => {
  const year = new Date();
  const currentYear = year.getFullYear();

  return (
    <div className={classes.footer}>
      ©{" "}
      <a href="https://ricardas.io" className={classes["footer__link"]}>
        Ricardas.io
      </a>{" "}
      {currentYear}. All Rights Reserved.
    </div>
  );
};

export default Footer;
