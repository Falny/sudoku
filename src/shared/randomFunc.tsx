export function getRandomInt(desk: (number | string)[][]) {
  let emptyCell: number[][] = [];

  desk.map((arr, rowInd) =>
    arr.map((el, colInd) => {
      if (typeof el === "string") {
        emptyCell.push([rowInd, colInd]);
      }
    })
  );
  const cell = randomInt(emptyCell.length);

  return emptyCell[cell];
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
