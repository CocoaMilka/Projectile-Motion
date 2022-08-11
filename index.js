const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");

let xComponent = 100;
let yComponent = canvas.clientHeight - 100;

let magnitude;
let angle;

let gravity = .1;
let time = 0;

let isStopped = false;

function drawSimulation()
{
    if (isStopped)
    {
        return;
    }

    clearScreen();
    drawProjectile();
    calculatePosition();

    calculateTime();

    //Draw new frame every 60 seconds
    setTimeout(drawSimulation, 1000 / 60);
}

function clearScreen()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

function drawProjectile()
{
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(xComponent, yComponent, 5, 0, Math.PI * 2);
    ctx.fill();
}

function calculatePosition()
{
    launchVector();

    xComponent += magnitude * Math.cos(degrees_to_radians(angle));

    //v yfinal = v yinitial + (acceleration * time)
    yComponent = yComponent + magnitude * Math.sin(degrees_to_radians(angle)) + (gravity * time);

    yComponent = yComponent + gravity;
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function runSimulation()
{
    restartSimulation();

    drawSimulation();
}

function stopSimulation()
{
    if (isStopped)
    {
        isStopped = false;
        drawSimulation();
    }
    else
    {
        isStopped = true;
    }
}

function restartSimulation()
{
    xComponent = 100;
    yComponent = canvas.clientHeight - 100;
    
    magnitude = document.getElementById("magnitude").value;
    angle = document.getElementById("angle").value * -1;
    
    gravity = .1;
    time = 0;
    
    isStopped = false;    
}

function launchVector()
{
    magnitude = document.getElementById("magnitude").value;
    angle = document.getElementById("angle").value * -1;
}

function calculateTime()
{
    time++;

    console.log("X: ", xComponent);
    console.log("Y: ", yComponent);
    console.log("Magnitude: ", magnitude);
    console.log("Angle: ", angle);
    console.log("Gravity: ", gravity);
}

drawSimulation();