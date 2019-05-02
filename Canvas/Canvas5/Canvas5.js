// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Set canvas properties
canvas.style.border = '1px solid black';

const minCanvasWidth = 0;
const minCanvasHeight = 0;
const maxCanvasWidth = window.innerWidth;
const maxCanvasHeight = window.innerHeight;

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Declaring sprite sheet related variables
const SheetWidth = 864;
const SheetHeight = 280;
const rows = 2;
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

function clearFrame() 
{
	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

//	Declaring avatar related variables
var avatar = new Image();
avatar.src = "Images/avatar.png";
var avatarXPos = 150;
var avatarYPos = 260;
var dx = 10;
var dy = 10;
var xdir = 0;
var ydir = 0;

var stepSound = new Audio();
stepSound.src = "Audios/step.wav";

function updateAvatarXPos() 
{
	avatarXPos = avatarXPos + (xdir * dx);
}

function updateAvatarYPos() 
{
	avatarYPos = avatarYPos + (ydir * dy);
}

function updateAvatarAnimation() 
{

	if (currentFrameType != -1) 
	{
		SheetXPos = currentFrameNo * SpriteWidth;
		currentFrameNo = (currentFrameNo + 1) % cols;	//	Sets value of currentFrameNo to the range [0,cols - 1]
		
		currentFrameType = currentFrameType;
		SheetYPos = currentFrameType * SpriteHeight;

		stepPlay();
	}
}

function stepPlay() 
{
	if ((currentFrameNo === 3) || (currentFrameNo === 7)) 
	{
		stepSound.play();
	}
}

function updateAvatar() 
{
	updateAvatarXPos();
	updateAvatarYPos();
	updateAvatarAnimation();
}

function displayFrame() 
{
	ctx.drawImage(avatar,SheetXPos,SheetYPos,SpriteWidth,SpriteHeight,avatarXPos,avatarYPos,SpriteWidth,SpriteHeight);
}

function animateAvatar() 
{
	displayBg();
	displayFrame();
}

function animate() 
{	
	boundaryCollision();
	animateAvatar();

	requestAnimationFrame(animate);	
}

document.addEventListener('keydown', control);
document.addEventListener('keyup', delControl);

function control(event) 
{
	if (event.keyCode === 38) 
	{
		ydir = -1;
	}
	if (event.keyCode === 40) 
	{
		ydir = 1;
	}
	
	if (event.keyCode === 37) 
	{
		xdir = -1;
		currentFrameType = 1;
	}
	else if (event.keyCode === 39) 
	{
		xdir = 1;
		currentFrameType = 0;
	}
	updateAvatar();
}

function delControl(event) 
{
	if (event.keyCode === 38) 
	{
		ydir = 0;
	}
	if (event.keyCode === 40) 
	{
		ydir = 0;
	}
	
	if (event.keyCode === 37) 
	{
		xdir = 0;
		currentFrameType = 1;
	}
	else if (event.keyCode === 39) 
	{
		xdir = 0;
		currentFrameType = 0;
	}
}

function boundaryCollision() 
{
	if (avatarXPos <= minCanvasWidth) 
	{
		avatarXPos = minCanvasWidth;
	}

	if (avatarXPos >= (maxCanvasWidth - SpriteWidth)) 
	{
		avatarXPos = (maxCanvasWidth - SpriteWidth);
	}
	
	if (avatarYPos <= 60) 
	{
		avatarYPos = 60;
	}

	if (avatarYPos >= 490) 
	{
		avatarYPos = 490;
	}
}

animate();





