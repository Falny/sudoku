export default function removeDigit({
  table,
  level,
}: {
  table: (number | string)[][];
  level: number;
}) {
  let newTable = structuredClone(table);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function removeDigit() {
    while (countDigit() > level) {
      let line = getRandomInt(9);
      let digit1 = getRandomInt(9);
      let digit2 = getRandomInt(9);

      newTable[line][digit1] = " ";
      newTable[line][digit2] = " ";
    }
    return newTable;
  }

  function countDigit() {
    let count = 0;

    newTable.map((obj) =>
      obj.map((el) => {
        if ("123456789".includes(el.toString())) {
          count++;
        }
      })
    );

    return count;
  }

  const tempTable = removeDigit();

  return tempTable;
}

// export const tableChanged = React.useMemo(() => {
//   removeDigit();
// }, []);
