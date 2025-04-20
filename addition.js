//var waitTime = 10000;
var interval = 5000;

var min = 7;

var maxim = 100;

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
            numbers.push(Math.floor(Math.random() * (maxim - min)) + min)
        } else {
            numbers.push(Math.floor(Math.random() * (min - maxim)) - min)
        }
    }
    return numbers;
}

function start() {

    display = document.getElementById("numberDisplay");
    startBttn = document.getElementById("start");
    restartBttn = document.getElementById("restart");
    resultsBttn = document.getElementById("result");

    startBttn.disabled = true;
    restartBttn.disabled = false;
    resultsBttn.disabled = true;

    let numbers = generateNumbers();
    running = true;
    result = 0;

    let i = 0;

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

            resultsBttn.disabled = false;
            
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

    resultsBttn.disabled = true;
    display.style.opacity = 0;
    display.style.transform = 'scale(0.5)';

    setTimeout(() => {
        display.textContent = result; // Mostrar el número actual
        display.style.color = "#003267";  // Cambiar color del resultado
        display.style.opacity = 1; // Restaurar opacidad
        display.style.transform = 'scale(1)'; // Restaurar tamaño
        
    }, 500); // Retardar para que la animación ocurra primero
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