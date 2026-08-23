
export let table = initilization();

function initilization() {
  //иницилизация базовой судоку
  let arr = [];
  let row = [];
  let count = 1;

  for (let i = 1; i <= 9; i++) {
    while (row.length !== 9) {
      if (count >= 10) {
        count = 1;
      }
      row.push(count);
      count++;
    }

    if (count > 9) {
      count = 1;
    }

    count += 3;

    if (i === 3) {
      count = 2;
    }

    if (i === 6) {
      count = 3;
    }

    arr.push(row);
    row = [];
  }

  return arr;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function swapGorizont() {
  let block = getRandomInt(3);
  let line1 = getRandomInt(3);
  let line2 = getRandomInt(3);

  while (line1 === line2) {
    line2 = getRandomInt(3);
  }

  let n1 = block * 3 + line1;
  let n2 = block * 3 + line2;

  let temp = table[n1];
  table[n1] = table[n2];
  table[n2] = temp;

  return table;
}

function transitionLeft() {
  let arr = [];
  let rowArr = [];

  for (let row = table.length - 1; row >= 0; row--) {
    for (let col = 0; col < table.length; col++) {
      rowArr.push(table[col][row]);
    }
    arr.push(rowArr);
    rowArr = [];
  }

  table = arr;
  return table;
}

function transitionRight() {
  let arr = [];
  let rowArr = [];

  for (let col = 0; col < table.length; col++) {
    for (let row = table.length - 1; row >= 0; row--) {
      rowArr.push(table[row][col]);
    }
    arr.push(rowArr);
    rowArr = [];
  }

  table = arr;
  return table;
}

function swapVertical() {
  transitionRight();
  swapGorizont();
  transitionLeft();
}

function swapAreaGorizont() {
  let block1 = getRandomInt(3);
  let block2 = getRandomInt(3);

  while (block1 === block2) {
    block2 = getRandomInt(3);
  }

  let line1 = block1 * 3; //начало строки
  let line2 = block2 * 3;

  let splitBlock1 = table.slice(line1, line1 + 3); // хранится срез массива
  let splitBlock2 = table.slice(line2, line2 + 3); // хранится срез массива

  table.splice(line1, 3, ...splitBlock2);
  table.splice(line2, 3, ...splitBlock1);

  return table;
}

function swapAreaVertical() {
  transitionRight();
  swapAreaGorizont();
  transitionLeft();
}

export default function randomChange() {
  // смена 4 строк по горизонтали в одном блоке
  // смена 4 строк по вертикально в одном блоке
  // смена 2 блоков по горизонтали в одном блоке
  // смена 2 блоков по вертикально в одном блоке
  // 12 операций

  //swapAreaVertical()
  //swapAreaGorizont()
  //swapGorizont()
  //swapVertical()

  let count = 0;
  let func = [
    () => swapAreaVertical(),
    () => swapAreaGorizont(),
    () => swapGorizont(),
    () => swapVertical(),
  ];

  while (count <= 12) {
    let random = getRandomInt(4);
    func[random]();
    count++;
  }

  return table;
}

// const initTable = randomChange();
// window.localStorage.setItem("table", JSON.stringify(initTable));
