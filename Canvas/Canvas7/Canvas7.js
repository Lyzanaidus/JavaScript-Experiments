// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Set canvas properties
canvas.style.border = '1px solid black';

var isCollision = false;

const minCanvasWidth = 0;
const minCanvasHeight = 0;
const maxCanvasWidth = window.innerWidth;
const maxCanvasHeight = window.innerHeight;

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Declaring sprite sheet related variables
const SheetWidth = 655;
const SheetHeight = 330;
const rows = 4;
const cols = 8;
var SpriteWidth = SheetWidth / cols;
var SpriteHeight = SheetHeight / rows;
var SheetXPos = 0;
var SheetYPos = 0;

var currentFrameNo = 0;				//	Sheet Column no = 0 
var currentFrameType = 0;			//	Sheet Row no = 0

function displayBg() 
{
	var bg = new Image();
	bg.src = "Images/background.jpg";
	ctx.drawImage(bg,minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

var ball = new Image();
ball.src = "Images/ball.png"

ballXPos = 10;
ballYPos = 120;

xdir = 1;
dx = 15;
var asd = 0;
var ct = 1;

function displayFrame() 
{
	ctx.drawImage(ball,SheetXPos,SheetYPos,SpriteWidth,SpriteHeight,ballXPos,ballYPos,SpriteWidth,SpriteHeight);
}

function updateBallAnimation() 
{
	//console.log(isCollision);
	if (isCollision) 
	{
		if (asd < 7) 
		{
			currentFrameNo = ((currentFrameNo + 1) % (cols-4));	//	Sets value of currentFrameNo to the range [0,cols - 4]
			asd = currentFrameNo + 4;
			SheetXPos = asd * SpriteWidth;
			console.log(asd);
			ct++;
		}
		if (ct === 4)
		{
			currentFrameNo = 3;
		}
	}
	else
	{
		currentFrameNo = ((currentFrameNo + 1) % (cols-4));	//	Sets value of currentFrameNo to the range [0,cols - 1]
		SheetXPos = currentFrameNo * SpriteWidth;
	}
	
	if (currentFrameType === 3) 
	{
		currentFrameNo = (cols - 1) - currentFrameNo;
		console.log(currentFrameNo);
	}

	
	SheetYPos = currentFrameType * SpriteHeight;
}

function updateBallXPos() 
{
	ballXPos = ballXPos + (xdir * dx);
}


var isBoundaryXCollision = 0;
var isBoundaryYCollision = 0;
var boundaryCollision = function () 
{
	return([isBoundaryXCollision,isBoundaryYCollision]);
}


function isBoundaryCollision() 
{
	console.log("iBC");
	
	if (ballXPos <= minCanvasWidth) 
	{
		isBoundaryXCollision = -1;
		isCollision = true;
		console.log("q");
	}

	else if (ballXPos >= (maxCanvasWidth - SpriteWidth - dx)) 
	{
		isBoundaryXCollision = 1;
		isCollision = true;
	}

	else
	{
		isBoundaryXCollision = 0;
		isCollision = false;	
	}
	/*
	if (ballYPos <= 110) 
	{
		isBoundaryYCollision = -1;
		isCollision = true;
		console.log("w");
	}

	else if (ballYPos >=  (maxCanvasHeight - SpriteHeight)) 
	{
		isBoundaryYCollision = 1;
		isCollision = true;
		console.log("e");
	}

	else
	{
		isBoundaryYCollision = 0;
		isCollision = false;
	}*/
}

function animate() 
{	
	isBoundaryCollision();
	displayBg();
	updateBallAnimation();
	if (boundaryCollision()[0] != 1) 
	{
		updateBallXPos();
	}
	displayFrame();
}

setInterval(animate,300);
/*animate();*/





