import React from "react";
import { useTranslation } from "react-i18next";

const Snackbar = ({ showMessage }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <p
        className="show-message"
        style={{ right: showMessage ? "20px" : "-100vw" }}
      >
        
        {i18n.language === "ar" && "تمت اضافه المهمه بنجاح"}
        {i18n.language === "en" && "Task added successfully "}
        <i className="fa-regular fa-circle-check" style={{margin : '0 5px'}}></i>
      </p>
    </>
  );
};

export default Snackbar;
