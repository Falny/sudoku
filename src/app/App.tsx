import React from "react";
import "./App.scss";
import { Desk } from "../widgets/desk/Desk";
import { Digit } from "../features/digit/Digit";
import { Footer } from "../features/footer/Footer";
import { Header } from "../features/header/Header";
import { PopupLevel } from "../features/popupLevel/PopupLevel";
import randomChange from "../shared/logic/logicGame";
import removeDigit from "../shared/removeDigit";

interface AppContext {
  choiceDigit: number | null;
  setChoiceDigit: React.Dispatch<React.SetStateAction<number | null>>;
  error: number;
  setError: React.Dispatch<React.SetStateAction<number>>;
  erase: boolean;
  setErase: React.Dispatch<React.SetStateAction<boolean>>;
  hint: boolean;
  setHint: React.Dispatch<React.SetStateAction<boolean>>;
  isNotes: boolean;
  setIsNotes: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  isLevel: boolean;
  setIsLevel: React.Dispatch<React.SetStateAction<boolean>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  tableTemp: (string | number)[][];
  table: number[][];
}

export const ContextDigit = React.createContext<AppContext | null>(null);

function App() {
  const [choiceDigit, setChoiceDigit] = React.useState<number | null>(null);
  const [error, setError] = React.useState<number>(0);
  const [erase, setErase] = React.useState<boolean>(false);
  const [hint, setHint] = React.useState<boolean>(false);
  const [isNotes, setIsNotes] = React.useState<boolean>(false);
  const [level, setLevel] = React.useState<number>(31);
  const [isLevel, setIsLevel] = React.useState<boolean>(true);
  const [win, setWin] = React.useState<boolean>(false);
  const [tableTemp, setTableTemp] = React.useState<(string | number)[][]>([]);
  const [table, setTable] = React.useState<number[][]>([]);

  React.useEffect(() => {
    (function () {
      const initTable = randomChange();
      window.localStorage.setItem("table", JSON.stringify(initTable));
    })();

    const local = window.localStorage.getItem("table");

    if (!local) return;

    const newTable = JSON.parse(local);
    setTable(newTable);

    // удаляю из таблицы цифры
    const newTableTemp = removeDigit({ table: newTable, level });
    setTableTemp(newTableTemp);
  }, []);

  return (
    <ContextDigit
      value={{
        choiceDigit,
        setChoiceDigit,
        error,
        setError,
        erase,
        setErase,
        hint,
        setHint,
        isNotes,
        setIsNotes,
        level,
        setLevel,
        isLevel,
        setIsLevel,
        win,
        setWin,
        tableTemp,
        table,
      }}
    >
      <div className="container">
        <div className="footer-container">
          <Header />
        </div>
        {!isLevel && <Desk />}
        {isLevel ? (
          <div className="pupup-level-container">
            <PopupLevel />
          </div>
        ) : (
          ""
        )}
        <div className="footer-container">
          <Footer />
          <Digit />
        </div>
      </div>
    </ContextDigit>
  );
}

export default App;
