import React from "react";
import "./index.scss";
import { ContextDigit } from "../../app/App";

export const PopupLevel = () => {
  const context = React.useContext(ContextDigit);
  if (!context) return;
  const { isLevel, setIsLevel, setLevel } = context;

  const onClickPopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      setLevel(Number(e.target.dataset.level));
    }
    setIsLevel(!isLevel);
  };

  return (
    <div className="popup-level">
      <div className="popup-level_text">Выберите уровень:</div>
      <div className="popup-level_level-block" onClick={(e) => onClickPopUp(e)}>
        <button className="popup-level_level" data-level="35">
          Легкий
        </button>
        <button className="popup-level_level" data-level="31">
          Средний
        </button>
        <button className="popup-level_level" data-level="28">
          Сложный
        </button>
      </div>
    </div>
  );
};
