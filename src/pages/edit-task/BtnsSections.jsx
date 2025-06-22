import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BtnsSections = ({ user, stringId }) => {
  const { t, i18n } = useTranslation();

  const [value, loading, error] = useCollection(collection(db, user.uid));

  const navigate = useNavigate();

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (value) {
    return (
      <section className="center">
        <div>
          <button
            onClick={async () => {
              navigate("/", { replace: true });
              await deleteDoc(doc(db, user.uid, stringId));
            }}
            className="btn-red mtt"
            style={{ marginBottom: "30px" }}
          >
            {i18n.language === "ar" && "مسح المهمة"}
            {i18n.language === "en" && "Delete task"}
          </button>
        </div>
      </section>
    );
  }
};

export default BtnsSections;
