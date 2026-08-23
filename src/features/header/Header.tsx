import React from "react";

import "./Header.scss";
import { ContextDigit } from "../../app/App";

import Timer from "../../assets/timer.svg";
import countError from "../../assets/error.svg";
import Pause from "../../assets/pause.svg";
import Start from "../../assets/start.svg";
import Close from "../../assets/close.svg";

export const Header = () => {
  const context = React.useContext(ContextDigit);

  if (!context) return;

  const { error, isLevel, win } = context;

  const [pause, setPause] = React.useState(true);
  const [newGame, setNewGame] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [textInPopUp, setTextInPopUp] = React.useState("Вы поставили на паузу");
  const maxError = 5;

  React.useEffect(() => {
    if (timer >= 3599) {
      setTextInPopUp(
        `Вы проиграли. Страница будет перезагружена, нажмите на крестик`
      );
      setPause(!pause);
      setNewGame(true);
    }
    if (!pause || isLevel) {
      return;
    }

    const time = setTimeout(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(time);
  }, [timer, pause, isLevel]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (win) {
        setTextInPopUp("Вы выйграли, поздравляю!");
        setPause(!pause);
        setNewGame(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [win]);

  React.useEffect(() => {
    if (error === maxError) {
      setTextInPopUp(
        `Вы проиграли. Страница будет перезагружена, нажмите на крестик`
      );
      setPause(!pause);
      setNewGame(true);
    }
  }, [error]);

  const onClickClosePopUp = () => {
    if (newGame) {
      window.location.reload();
    }
    setPause(!pause);
  };

  return (
    <>
      {!pause && (
        <div className="popup-container">
          <div className="popup-block">
            <img
              src={Close}
              className="popup-close"
              onClick={() => onClickClosePopUp()}
            />
            <p className="popup-text">{textInPopUp}</p>
            <button
              className="popup-btn_newgame"
              onClick={() => window.location.reload()}
            >
              Начать новую игру?
            </button>
          </div>
        </div>
      )}
      <div className="common header">
        <div className="header-block common-block">
          <img src={Timer} alt="" className="common-icon" />
          <p className="header-text common-text">
            {`${Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")} : ${Math.floor(timer % 60)
              .toString()
              .padStart(2, "0")}`}
          </p>
        </div>
        <div className="header-block common-block">
          <img src={countError} alt="" className="common-icon" />
          <p className="header-text common-text">
            {maxError} / {error}
          </p>
        </div>
        <div className="header-block common-block">
          <img
            src={pause ? Start : Pause}
            alt=""
            className="common-icon icon-pause"
            onClick={() => setPause(!pause)}
          />
        </div>
      </div>
    </>
  );
};
