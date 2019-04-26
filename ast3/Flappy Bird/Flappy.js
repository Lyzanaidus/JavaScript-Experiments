// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Set canvas properties
canvas.style.border = '1px solid black';

const minCanvasWidth = 0;
const minCanvasHeight = 0;
const maxCanvasWidth = 288;
const maxCanvasHeight = 512;

canvas.width = maxCanvasWidth;
canvas.height = maxCanvasHeight;


//	Initializing image variables
var bird = new Image();
var backgr = new Image();
var foregr = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// Loading image sources
bird.src = "images/bird.png";
backgr.src = "images/bg.png";
foregr.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//	Initializing audio variables
var flapSound = new Audio();
var scoreSound = new Audio();

// Loading audio sources
flapSound.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";

//	Initializing Game variables
var pipeDistance = 0;
var GRAVITY = 1;
var isGameOver = false;
var score = 0;

//	Initializing Bird , Pipes & Foreground related variables 
var birdXPos;
var birdYPos;

const BirdWidth = 38;
const BirdHeight = 26;


const MinNorthPipePos = -200;
const MaxSouthPipePos = 350;

var MinPipeXGap = BirdHeight*2;
var MaxPipeXGap = BirdHeight*10;
const pipeNorthHeight = 242;
const pipeNorthWidth = 52;
const pipeSouthHeight = 378;
const pipeSouthWidth = 52;
var pipeXGap = 50;
var pipeXPos = maxCanvasHeight;//			pipeSouthXPos = pipeNorthXPos = pipeXPos (Since Both pipes are on the same X Pos )		
var pipeNorthYPos;
var pipeSouthYPos;
var pipeSpeed = 1;
//	Function to initiallize random pipeXGap 
function initPipeXGap() 
{
	pipeXGap = (Math.round(Math.random() * (MaxPipeXGap - MinPipeXGap)) + MinPipeXGap);
}

//	Function to initiallize random pipeXPos
function initPipeXPos() 
{
	pipeXPos = maxCanvasWidth;
}

//	Function to initiallize random pipeNorthYPos
function initPipeNorthYPos() 
{
	pipeNorthYPos = (Math.round(Math.random() * MinNorthPipePos));
}

//	Function to initiallize random pipSouthYPos
function initPipeSouthYPos()
{
	pipeSouthYPos = (pipeNorthYPos + pipeNorthHeight) + pipeXGap;
}

//	Function to implement gravity
function applyGravity(x) 
{
	return (x + GRAVITY);
}

function Birds(birdXPos,birdYPos) 
{
	this. birdXPos = birdXPos;
	this. birdYPos = birdYPos;

	this.displayBird = function()
						{
							ctx.drawImage(bird,this.birdXPos,this.birdYPos,BirdWidth,BirdHeight);
						}	
	this.updateBird = function()
						{
							this.birdYPos = applyGravity(this.birdYPos);
						}	


	
}

var birdsArr = [];

function initBirds() 
{
	birdXPos = 50;
	birdYPos = (canvas.height - foregr.height) / 2;
	birdsArr.push(new Birds(birdXPos,birdYPos));
		
}

initBirds();

function Pipes(birdXPos,birdNorthYPos,birdSouthYPos,birdXGap) 
{
	this.pipeXPos= pipeXPos;
	this.pipeNorthYPos= pipeNorthYPos;
	this.pipeSouthYPos= pipeSouthYPos;
	this.pipeXGap= pipeXGap;
	
	this.drawPipeNorth = function()
						{
							ctx.drawImage(pipeNorth,this.pipeXPos,this.pipeNorthYPos);
						}	
	this.drawPipeSouth = function()
						{
							ctx.drawImage(pipeSouth,this.pipeXPos,this.pipeSouthYPos);
						}
	this.updatePipesPos = function()
						{
							this.pipeXPos = this.pipeXPos - pipeSpeed;
						}
}

var pipesArr = [];

function initPipes() 
{
	initPipeXGap();
	initPipeXPos();
	initPipeNorthYPos();
	initPipeSouthYPos();

	pipesArr.push(new Pipes(pipeXPos,pipeNorthYPos,pipeSouthYPos,pipeXGap));
		
}

function displayPipes() 
{

	for (var i = 0; i < pipesArr.length; i++) 
	{
		if ((pipesArr[i].pipeXPos + pipeNorthWidth) >= 0) 
		{
			pipesArr[i].drawPipeNorth();
			pipesArr[i].drawPipeSouth();
		}
	}
}

function updatePipes() 
{
	for (var i = 0; i < pipesArr.length; i++) 
	{
		if ((pipesArr[i].pipeXPos + pipeNorthWidth) >= 0) 
		{
			pipesArr[i].updatePipesPos();
		}
	}
}

function newPipe() 
{
	//console.log(pipeDistance);
	if (pipeDistance === (Math.round(maxCanvasWidth / 3) * 2))
	{
		initPipes();
		pipeDistance = 0;
	}
	pipeDistance++;
}

document.addEventListener("keydown",moveUp);

function moveUp()
{
	console.log('oer')
    birdsArr[0].birdYPos = birdsArr[0].birdYPos - 25;
    flapSound.play();
    //birdsArr[0].updateBird();
}

function gameOver(birdXPos,birdYPos) 
{
	console.log(birdXPos,birdYPos)
	for (var i = 0; i < pipesArr.length; i++) 
	{
		if ((pipesArr[i].pipeXPos + pipeNorthWidth) >= 0) 
		{
			//console.log('Pipe[',i,']')
			if ((birdXPos + BirdWidth>= pipesArr[i].pipeXPos) && 
				(birdXPos < pipesArr[i].pipeXPos + pipeNorthWidth) &&
				(birdYPos <= pipesArr[i].pipeNorthYPos + pipeNorthHeight)
				)
			{
				pipeSpeed = 0;
				GRAVITY = 15;
				isGameOver = true;
				return isGameOver;
				console.log('Game Over');
			}

			if ((birdXPos + BirdWidth>= pipesArr[i].pipeXPos) && 
				(birdXPos < pipesArr[i].pipeXPos + pipeSouthWidth) &&
				(birdYPos + BirdHeight >= pipesArr[i].pipeSouthYPos)
				)
			{
				GRAVITY = 5;
				isGameOver = true;
				return isGameOver;
				console.log('Game Over');
			}
		}
	}
}

function borderCollision(j,birdXPos,birdYPos) 
{
	if (birdYPos < 0)
	{
		birdsArr[j].birdYPos = 0;
	}
	if (birdYPos + BirdHeight >= canvas.height - foregr.height)
	{
		console.log('ground',birdYPos);
		birdsArr[j].birdYPos = canvas.height - foregr.height - BirdHeight;
	}
}

function updateScore() 
{
	for (var i = 0; i < pipesArr.length; i++) 
	{
		if ((pipesArr[i].pipeXPos + pipeNorthWidth) === birdsArr[0].birdXPos) 
		{
			score++;
			scoreSound.play();
		}
	}
}

function displayScore() 
{
	ctx.font = "30px Arial";
	ctx.fillText("Score " + score, 90,470);
}

function animate() 
{
	//	Function to draw the background
	ctx.drawImage(backgr,0,0);
	/*console.log('MinPipeXGap : ',MinPipeXGap,
			'MaxPipeXGap : ',MaxPipeXGap,
			'pipeXGap : ',pipeXGap,
			'pipeXPos : ',pipeXPos,
			'pipeNorthYPos : ',pipeNorthYPos,
			'pipeSouthYPos : ',pipeSouthYPos,
			);
	*/

	borderCollision(0,birdsArr[0].birdXPos,birdsArr[0].birdYPos)
	
	birdsArr[0].updateBird();
	updateScore(); 
	
	if(!gameOver(birdsArr[0].birdXPos,birdsArr[0].birdYPos))
	{
		//console.log('HAHAHA');
		newPipe();
		updatePipes();

	}
	else
	{
		document.removeEventListener("keydown",moveUp);
		setTimeout(over(),3000);
	}
	
	displayPipes();
	birdsArr[0].displayBird();

	ctx.drawImage(foregr,0,canvas.height - foregr.height);
	
	displayScore();
		
	requestAnimationFrame(animate);
}

function play() 
{
	initBirds();
	initPipes();
	animate();
}

function enterCheck(event) 
{
	if(event.keyCode === 13)
	{
		document.removeEventListener("keyup",enterCheck) 
		play();
	}
}

function start() 
{
	ctx.drawImage(backgr,0,0);
	ctx.font = "20px Arial";
	ctx.fillText("Press ENTER to start.", 45,200);
	ctx.fillText(" Press SPACE to play.", 45,250);
	ctx.drawImage(foregr,0,canvas.height - foregr.height);
	displayScore();

	document.addEventListener("keyup",enterCheck);
	requestAnimationFrame(start);
}

function over() 
{
	ctx.drawImage(backgr,0,0);
	ctx.font = "20px Arial";
	ctx.fillText("Game Over", 80,200);
	ctx.drawImage(foregr,0,canvas.height - foregr.height);
	displayScore();
	setTimeout(function (){location.reload()},3000);
}

start();

