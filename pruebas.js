const primeNumbers = [2, 3, 7, 11, 13]; // Lista de numeros primos los cuales conformaran los numeros generados

var finalResult;
var values = []; // Numeros generados
start();
function start() {
  for(let i = 0; i < 6; i++){ // Generar los 6 numeros aleatorios
    if(i === 0){
      var firstValue;
      do {
        firstValue = generateValue();
      } while(getNumber(firstValue) < 0); // Asegurar que el primer numero no sea muy pequeño
      values[i] = firstValue;
      finalResult = values[i];

    } else {
      if (i % 2 !== 0){
        console.log(i + " es impar")
        //values[i] = generateDivisionValue(values[i-1]);
        values[i] = generateDivisionValue(finalResult);
        finalResult = divide(finalResult, values[i]); // PENDIENTE FUNCION PARA DIVIDIR MAPAS DE NUMEROS
      }
      else{ 
        values[i] = generateValue();
        finalResult = multiply(finalResult, values[i]);
      }
    }
  }
   

  console.log("------------")
  console.log("valores:");
  console.log(getNumbers(values));

  console.log(random(3));

  console.log(getNumber(finalResult));
}

function random(max) {
  if (max === 1) {
    if(Math.random() < 0.5)
    return 0;
    else if (Math.random() > 0.5){
    return 1;
    }
  } 
  return Math.floor(Math.random() * max);
}

function generateValue() {
  const map = new Map();
  
  let value;
  do {
  primeNumbers.forEach(nr => {
    map.set(nr, randomExponent(nr));
  });
  value = getNumber(map);
  } while (value === 1 || value > 70 || value < 7); // Establecer limite de 70
 
  return map;
}

function generateDivisionValue(previousNumber){
  var newMapNumber = new Map();  // Nuevo mapa de numeros (mapa tiene la base y el exponente)
  previousNumber.forEach((value, key) => {
    if (value !== 0){
      newMapNumber.set(key, value);
    }
  })
  
  console.log("Numero previo: " + getNumber(newMapNumber))

  var finalNumber = new Map();
  var finalInt;
  do{
    newMapNumber.forEach((value, key) => {
      console.log(key, value)
      finalNumber.set(key, random(value));
    })
    finalInt = getNumber(finalNumber);
  } while (finalInt === 1);
  return finalNumber;

}

function getNumber(map) {
  var number = 1;
  map.forEach((value, key) => {
    //console.log(key + " " + value)
    //console.log(Math.pow(key, value))
    //console.log("------")
    number = number * Math.pow(key, value);
  });
 
  return number;

}

function getNumbers(values){
  let numbers = [];
  let i = 0;
  values.forEach((map) => {
    numbers[i] = getNumber(map);
    i++
  })
  return numbers;
}

function randomExponent(base){
  switch(base){
    case 2:
    return random(6); // Maximo 2^5
    case 3:
    return random(4); // Maximo 3^3
    case 5:
    return random(3); // Maximo 5^2
    default: return random(2);
  }

}

function divide(dividend, divisor) {
  var result = new Map();
  dividend.forEach((value, key) =>{
    let base = key;
    let exponent = value - divisor.get(key);
    if(exponent !== 0 && !isNaN(exponent)) {
      result.set(base, exponent);
      
    }
  })
  console.log("dividend " + getNumber(dividend));
  console.log("divisor: " + getNumber(divisor));
  console.log("divide: " + getNumber(result));
  return result;
}

function multiply(factor1, factor2){

  const result = new Map(factor1);

  for (const [base, exponent] of factor2){
    result.set(base, (result.get(base) || 0) + exponent);
  }

  return result;

}
