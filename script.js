let numberOfIterations = 50;
let graphsData = [];

document.getElementById("numberOfIterationsForm").addEventListener("submit", submitInterationsFunction);
document.getElementById("serchNumberForm").addEventListener("submit", submitNumberSearchFunction);
document.getElementById("tornaSuButton").addEventListener("click", tornaSuFunction);

function tornaSuFunction(e) {
  document.getElementById('1').scrollIntoView();

  e.preventDefault();
}

function submitInterationsFunction(e) {
  numberOfIterations = document.getElementById('numberOfIterations').value;
  collatz(numberOfIterations);
  drawGraphsAndTable();

  e.preventDefault();
}

function submitNumberSearchFunction(e) {
  let inputNumber = document.getElementById('numberInput').value;
  if (inputNumber < numberOfIterations && inputNumber >= 1) {
    document.getElementById(inputNumber).scrollIntoView();
  } else {
    alert('The number is out of range, try with another one!')
  }

  e.preventDefault();
}

function collatz(iterations) {
  /* iterations is the number of iterations for the loop */
  let result = [];
  for (let n = 1; n < iterations; n++) {
    let x = n;
    let cycles = 0;
    while (true) {
      if (x === 1) {
        break;
      }
      else { 
        x = x%2 === 0 ? x/2 : (x*3) + 1;
        cycles += 1;
      }
    }
    result.push({number: n, cycles: cycles, sameCycles: 0, differenceNumCycles: n - cycles, productNumCycles: n * cycles, sumNumCicles: n + cycles, divisionNumCicles: n / cycles, powerNumCicles: n ** cycles});
  }

  for (let x = 0; x < result.length; x++) {
    for (let y = 0; y < result.length; y++) {
      if (result[x].cycles === result[y].cycles) {
        result[x].sameCycles += 1;
      }
    }
  }
  return result;
}

function drawGraphsAndTable() {
  document.getElementById('tableInfo').innerText = 'The number of iterations is: ' + numberOfIterations;

  let tableDiv = document.getElementById("collatzTable");
  tableDiv.innerHTML = ""

  let collatzList = collatz(numberOfIterations);
  graphsData = []
  createGraph(collatzList, 'number', 'cycles', 'numbers and cycles');
  createGraph(collatzList, 'number', 'sameCycles', 'numbers and the number of the same cycles');
  createGraph(collatzList, 'number', 'differenceNumCycles', 'numbers and the difference with the number of cycles');
  createGraph(collatzList, 'number', 'productNumCycles', 'numbers and the product with the number of cycles');
  createGraph(collatzList, 'number', 'sumNumCycles', 'numbers and the sum with the number of cycles');
  createGraph(collatzList, 'number', 'divisionNumCicles', 'numbers and the division with the number of cycles');
  createGraph(collatzList, 'number', 'powerNumCicles', 'numbers and the power with the number of cycles');
  
  Plotly.newPlot('graphsDiv', graphsData); 
  let tableData = Object.keys(collatzList[0]);
  generateTableHead(tableDiv, tableData);
  generateTable(tableDiv, collatzList)
  console.table(collatzList);
}

function createGraph(list, x, y, name) {
  let xList = [];
  for (let i = 0; i < list.length; i++) { xList.push(list[i][x]) }
  
  let yList = [];
  for (let i = 0; i < list.length; i++) { yList.push(list[i][y]) }
  let tempGraph = {
    x: xList,
    y: yList,
    name: name
  }
  // add element
  graphsData.push(tempGraph);
}
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    row.id = element.number;
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

drawGraphsAndTable();

