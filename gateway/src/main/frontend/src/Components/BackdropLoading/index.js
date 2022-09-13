import React from "react";
import { Spinner } from "reactstrap";
import style from "./style.module.css";

const BackdropLoading = () => {
  return (
    <div className={style.spiner_setup}>
      <Spinner color="success"> Loading... </Spinner>
    </div>
  );
};

export default BackdropLoading;
