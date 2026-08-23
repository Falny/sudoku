// import React from "react";

// export const InitDesk = () => {
//   const local = React.useMemo(() => {
//     return window.localStorage.getItem("table");
//   }, []);

//   if (!local) return;

//   const table = React.useMemo(() => {
//     console.log(JSON.parse(local));
//     return local && JSON.parse(local);
//   }, []);

//   // удаляю из таблицы цифры
//   const tableTemp = React.useMemo(() => {
//     return removeDigit({ table, level });
//   }, [level]);

//   return <div>InitDesk</div>;
// };
