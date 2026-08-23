// import React from "react";
// import { ContextDigit } from "../../app/App";
// import "./Cell.scss";

// export const Cell = ({ bool }: { bool: boolean }) => {
//   const context = React.useContext(ContextDigit);
//   if (!context) return;
//   const { choiceDigit } = context;
//   console.log(choiceDigit);

//   const [cell, setCell] = React.useState<boolean[]>(
//     Array.from({ length: 9 }, (_) => false)
//   );

//   const onClickBtn = (i: number) => {
//     setCell((prev) => prev.map((el, index) => (index === i ? true : false)));
//   };

//   return (
//     <div className="cell-list">
//       {Array.from({ length: 9 }, (_) => false).map((el, index) => (
//         <button
//           key={index}
//           onClick={() => onClickBtn(index)}
//           className={`cell-item ${bool && cell[index] && "active-cell"}`}
//         >
//           {bool && cell[index] ? choiceDigit : ""}
//         </button>
//       ))}
//     </div>
//   );
// };
