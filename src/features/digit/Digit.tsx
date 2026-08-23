import React from "react";
import "./Digit.scss";
import { ContextDigit } from "../../app/App";

export const Digit = () => {
  const context = React.useContext(ContextDigit);

  if (!context) return;
  const { setChoiceDigit, isNotes } = context;

  return (
    <div className="digits">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((el) => (
        <button
          key={el}
          className={`digits-item ${isNotes ? "edit" : "active-color"}`}
          onClick={() => setChoiceDigit(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
