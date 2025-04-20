const primeNumbers = [2, 3, 5, 7, 13]

var interval = 7000;
var maxim = 70;
var running = false;
var myInterval;

var display;
var startBttn;
var restartBttn;
var resultsBttn;

var values = []; 
var finalResult;

var numbers = [];

function start() {

    display = document.getElementById("numberDisplay");
    startBttn = document.getElementById("start");
    restartBttn = document.getElementById("restart");
    resultsBttn = document.getElementById("result");

    running = true;

    startBttn.disabled = true; // desactivar boton de inicio
    restartBttn.disabled = false; // Activar boton de reinicio
    resultsBttn.disabled = true;  // desactivar boton resultados
    /*
    console.log("------TESTEO------")
    for(let j = 0; j < 5; j++){ // TESTEO DE NUMEROS RANDOM
        generateValues();
        console.log(getNumbers(values))
    }
    console.log("------TESTEO------")
    */

    generateValues();  // Generar valores

    numbers = getNumbers(values); // Guardar numeros

    let i = 0;

    myInterval = setInterval(() => {

        if(!running) {
        
            clearInterval(myInterval);
            return;

        }
        if(i < numbers.length){
            display.style.opacity = 0;
            display.style.transform = 'scale(0.5)';

            setTimeout(() => {
                if (i % 2 !== 0){ // si es division
                    display.textContent = "÷" + numbers[i]; // Mostrar el número actual
                } else { // si es multiplicacion
                    if(i === 0) display.textContent = numbers[i];
                    else display.textContent = "×" + numbers[i]; // Mostrar el número actual
                }
                display.style.opacity = 1; // Restaurar opacidad
                display.style.transform = 'scale(1)'; // Restaurar tamaño
                i++;
            }, 500); // Retardar para que la animación ocurra primero
        } else {
            
            clearInterval(myInterval);
            
            resultsBttn.disabled = false;  // Activar boton
        }

    }, interval);

    //document.getElementById("numberDisplay").textContent = display;

}

function restart() {
    
    if (running) {
        clearInterval(myInterval);
        running = false; 
    }
    let display = document.getElementById("numberDisplay");
    let startBttn = document.getElementById("start");
    let restartBttn = document.getElementById("restart");
    
    display.textContent = "🎲";
    display.style.color = "#007bff";  // Volver al color normal
    
    startBttn.disabled = false;
    restartBttn.disabled = true;
    resultsBttn.disabled = true;
}

function showResults(){
    let result = getNumber(finalResult);
    resultsBttn.disabled = true;
    display.style.opacity = 0;
    display.style.transform = 'scale(0.5)';

    setTimeout(() => {
        display.textContent = result; // Mostrar el número actual

        display.style.color = "#003267";  // Cambiar color del resultado
        
        display.style.opacity = 1; // Restaurar opacidads
        display.style.transform = 'scale(1)'; // Restaurar tamaño
        
    }, 500); // Retardar para que la animación ocurra primero
}

// HERRAMIENTAS

function generateValues(){
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
            //console.log(i + " es impar")
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
}

function generateValue() {
    const map = new Map();
    
    let value;
    do {
    primeNumbers.forEach(nr => {
      map.set(nr, randomExponent(nr));
    });
    value = getNumber(map);
    } while (value === 1 || value > maxim || value < 7); // Establecer limite de 70
   
    return map;
}

function generateDivisionValue(previousNumber){
    var newMapNumber = new Map();  // Nuevo mapa de numeros (mapa tiene la base y el exponente)
    previousNumber.forEach((value, key) => {
      if (value !== 0){
        newMapNumber.set(key, value);
      }
    })
    
    //console.log("Numero previo: " + getNumber(newMapNumber))
  
    var finalNumber = new Map();
    var finalInt;
    do{
      newMapNumber.forEach((value, key) => {
        //console.log(key, value)
        finalNumber.set(key, random(value));
      })
      finalInt = getNumber(finalNumber);
    } while (finalInt === 1 || finalInt === getNumber(previousNumber) || finalInt > 100);
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

function randomExponent(base){
    switch(base){
      case 2:
      return random(7); // Maximo 2^6
      case 3:
      return random(5); // Maximo 3^4
      case 5:
      return random(3); // Maximo 5^2
      case 7:
        return random (3);
      
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
    //console.log("dividend " + getNumber(dividend));
    //console.log("divisor: " + getNumber(divisor));
    //console.log("divide: " + getNumber(result));
    return result;
}
  
function multiply(factor1, factor2){
  
    const result = new Map(factor1);
  
    for (const [base, exponent] of factor2){
      result.set(base, (result.get(base) || 0) + exponent);
    }
  
    return result;
  
}
/* CONFIGURACION */
const toggleBtn = document.getElementById("toggleBtn");
const toggleIcon = document.getElementById("toggleIcon");
const configCollapse = document.getElementById("configCollapse");
const configCard = document.getElementById("configCard");

configCollapse.addEventListener('show.bs.collapse', () => {
    toggleIcon.textContent = 'v';
    const btnWidth = toggleBtn.offsetWidth;
    configCard.style.width = (btnWidth * 2) + 'px';
});
configCollapse.addEventListener('hide.bs.collapse', () => {
    toggleIcon.textContent = '>';
    configCard.style.width = null;
});

document.getElementById('saveBtn').addEventListener('click', () => {
    if(document.getElementById('intervalo').value !== "")
        interval = document.getElementById('intervalo').value * 1000;
    if(document.getElementById('limite').value !== "")
        maxim = document.getElementById('limite').value;
});