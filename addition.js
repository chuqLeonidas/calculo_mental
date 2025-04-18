var waitTime = 10000;
var interval = 5000;
var min = 7;
var max = 100;
var running = false;
var myInterval;

var display;
var startBttn;
var restartBttn;
var resultsBttn;

var result;

function generateNumbers(){
    let numbers = [];
    for (let i = 0; i < 6; i++){
        if(Math.random() < 0.5) {
            numbers.push(Math.floor(Math.random() * (max - min)) + min)
        } else {
            numbers.push(Math.floor(Math.random() * (min - max)) - min)
        }
    }
    console.log(numbers);
    return numbers;
}

function start() {

    display = document.getElementById("numberDisplay");
    startBttn = document.getElementById("start");
    restartBttn = document.getElementById("restart");
    resultsBttn = document.getElementById("result");

    startBttn.disabled = true;
    restartBttn.disabled = false;


    let numbers = generateNumbers();
    running = true;
    result = 0;

    let i = 0;

    console.log("Empezo");

    myInterval = setInterval(() => {

        if(!running) {
        
            clearInterval(myInterval);
            return;

        }

        if(i < numbers.length){

            display.style.opacity = 0;
            display.style.transform = 'scale(0.5)';

            result = result + numbers[i];

            setTimeout(() => {

                display.textContent = numbers[i];
                display.style.opacity = 1; // Restaurar opacidad
                display.style.transform = 'scale(1)'; // Restaurar tamaño
                i++;
            }, 500);

            

        } else {

            clearInterval(myInterval);
            
            console.log("Resultado final " + result);

            resultsBttn.disabled = false;
            
        }

    }, interval);

    //document.getElementById("numberDisplay").textContent = display;


    console.log("Termino");
    console.log(running);
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
    
    startBttn.disabled = false;
    restartBttn.disabled = true;
    console.log(running);
}

function showResults(){

    resultsBttn.disabled = true;
    display.style.opacity = 0;
    display.style.transform = 'scale(0.5)';

    setTimeout(() => {
        console.log("boton: " + result);
        display.textContent = result; // Mostrar el número actual
        display.style.opacity = 1; // Restaurar opacidad
        display.style.transform = 'scale(1)'; // Restaurar tamaño
        
    }, 500); // Retardar para que la animación ocurra primero
}