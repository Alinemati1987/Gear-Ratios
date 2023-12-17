const fs = require("fs");

// Main //
function main() {
  const data = getData();
  partOne(data);
  partTwo(data);
}

// Functions //

function partOne(inputData) {
  let partOneSum = process(inputData);
  consoleResults("Part ONE", partOneSum);
}

function partTwo(inputData) {
  let gearsObject = processTwo(inputData);
  let partTwoSum = calcGears(gearsObject);
  consoleResults("Part Two", partTwoSum);
}

function process(theData) {
  let totalSum = 0;
  theData.forEach((line, lineIndex) => {
    let dIndex = 0;
    let checkChar = false;

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      if (charIndex == dIndex) {
        checkChar = true;
      }
      if (checkChar) {
        const digit = /^\d+$/.test(line[charIndex]) ? line[charIndex] : null;
        if (digit) {
          let number = digit;
          let otherDigit = true;
          dIndex = charIndex + 1;
          while (otherDigit) {
            otherDigit = /^\d+$/.test(line[dIndex])
              ? ((number += line[dIndex]), dIndex++)
              : false;
          }

          const lineUp =
            lineIndex - 1 < 0 ? theData[lineIndex] : theData[lineIndex - 1];
          const lineBotton =
            lineIndex + 1 == theData.length
              ? theData[lineIndex]
              : theData[lineIndex + 1];

          const leftIndex = charIndex - 1 < 0 ? charIndex : charIndex - 1;
          const rightIndex = dIndex == line.length ? dIndex - 1 : dIndex;

          const leftChar =
            charIndex - 1 < 0 ? line[charIndex] : line[charIndex - 1];
          const rightChar =
            dIndex == line.length ? line[line.length - 1] : line[dIndex];

          const upChars = lineUp.slice(leftIndex, rightIndex + 1);
          const bottonChars = lineBotton.slice(leftIndex, rightIndex + 1);

          const aroundChars = [leftChar, rightChar, ...upChars, ...bottonChars];

          const sumNumber = checkNumber(aroundChars);

          if (sumNumber) {
            totalSum += parseInt(number);
          }
          checkChar = !checkChar;
        }
      }
    }
  });
  return totalSum;
}

function processTwo(theData) {
  let gears = {};

  theData.forEach((line, lineIndex) => {
    let dIndex = 0;
    let checkChar = false;
    if (lineIndex == 139) {
      let test = 0;
    }
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      if (charIndex == dIndex) {
        checkChar = true;
      }
      if (checkChar) {
        const digit = /^\d+$/.test(line[charIndex]) ? line[charIndex] : null;
        if (digit) {
          let number = digit;
          let otherDigit = true;
          dIndex = charIndex + 1;
          while (otherDigit) {
            otherDigit = /^\d+$/.test(line[dIndex])
              ? ((number += line[dIndex]), dIndex++)
              : false;
          }

          // check the left character
          const leftIndex = charIndex - 1 < 0 ? charIndex : charIndex - 1;
          const leftChar = line[leftIndex];
          if (leftChar == "*") {
            let gearIndex = `${lineIndex}-${leftIndex}`;
            if (gears.hasOwnProperty(gearIndex)) gears[gearIndex].push(number);
            else gears[gearIndex] = [number];
          }

          // check the right character
          const rightIndex = dIndex == line.length ? dIndex - 1 : dIndex;
          const rightChar = line[rightIndex];
          if (rightChar == "*") {
            let gearIndex = `${lineIndex}-${rightIndex}`;
            if (gears.hasOwnProperty(gearIndex)) gears[gearIndex].push(number);
            else gears[gearIndex] = [number];
          }

          // check top characters
          const lineUp = theData[lineIndex - 1];
          if (lineUp) {
            const lineUpIndex = lineIndex - 1;
            const upChars = lineUp.slice(leftIndex, rightIndex + 1);
            if (upChars.includes("*")) {
              for (
                let upIndex = leftIndex;
                upIndex < rightIndex + 1;
                upIndex++
              ) {
                const upChar = lineUp[upIndex];
                if (upChar == "*") {
                  let gearIndex = `${lineUpIndex}-${upIndex}`;
                  if (gears.hasOwnProperty(gearIndex))
                    gears[gearIndex].push(number);
                  else gears[gearIndex] = [number];
                }
              }
            }
          }

          const lineBotton = theData[lineIndex + 1];

          if (lineBotton) {
            const lineBottonIndex = lineIndex + 1;
            const bottonChars = lineBotton.slice(leftIndex, rightIndex + 1);
            if (bottonChars.includes("*")) {
              for (
                let bottonIndex = leftIndex;
                bottonIndex < rightIndex + 1;
                bottonIndex++
              ) {
                const bottonChar = lineBotton[bottonIndex];
                if (bottonChar == "*") {
                  let gearIndex = `${lineBottonIndex}-${bottonIndex}`;
                  if (gears.hasOwnProperty(gearIndex))
                    gears[gearIndex].push(number);
                  else gears[gearIndex] = [number];
                }
              }
            }
          }

          checkChar = false;
        }
      }
    }
  });
  return gears;
}

function calcGears(gObject) {
  let tSum = 0;
  Object.keys(gObject).map((gear) => {
    if (gObject[gear].length == 2) {
      const [first, second] = gObject[gear];
      tSum += Number(first) * Number(second);
    }

    if (gObject[gear].length != 2 && gObject[gear].length != 1) {
      console.log("ERROR!!");
    }
  });
  return tSum;
}

function checkNumber(surroundArray) {
  let result = false;
  surroundArray.forEach((char) => {
    if (!result && char != "." && char != "" && !/^\d+$/.test(char)) {
      result = !result;
    }
  });
  return result;
}

function getData() {
  const allData = fs.readFileSync("input.txt").toString();
  const dataArray = allData.trim().split("\n");
  let dArray = [];
  dataArray.forEach((elem) => {
    dArray.push(elem.split(""));
  });
  return dArray;
}

function consoleResults(part, answer) {
  console.log("Answer for " + part + " is: " + answer);
}

// Run the script
main();
