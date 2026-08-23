import React from "react";
import { ContextDigit } from "../../app/App";

import "./Footer.scss";
import notes from "../../assets/note-edit.svg";
import hintImg from "../../assets/hintmajor.svg";
import eraseImg from "../../assets/erase.svg";

export const Footer = () => {
  const context = React.useContext(ContextDigit);
  if (!context) return;

  const { erase, setErase, hint, setHint, isNotes, setIsNotes } = context;

  return (
    <div className="footer common">
      <div
        className="footer-block common-block"
        onClick={() => setIsNotes(!isNotes)}
      >
        <img src={notes} alt="" className="common-icon" />
        <p className={`footer-text common-text ${isNotes && "edit"}`}>
          Заметки
        </p>
      </div>
      <div
        className="footer-block common-block"
        onClick={() => setHint(() => !hint)}
      >
        <img src={hintImg} alt="" className="common-icon" />
        <p className={`footer-text common-text ${hint && "edit"}`}>Подсказка</p>
      </div>
      <div
        className="footer-block common-block"
        onClick={() => {
          setErase(!erase);
        }}
      >
        <img src={eraseImg} alt="" className="common-icon" />
        <p className={` footer-text common-text ${erase && "edit"}`}>Стереть</p>
      </div>
    </div>
  );
};
