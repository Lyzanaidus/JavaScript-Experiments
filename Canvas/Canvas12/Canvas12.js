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

//	Canvas related functions

//	Function to clear entire canvas
function clearCanvas() 
{
	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

var rect1x = 100;
var rect1y = 100;
var rect1width = 80;
var rect1height = 80;
var rect2x = 600;
var rect2y = 600;
var rect2width = 80;
var rect2height = 80;
var rect1dx = 1;
var rect1dy = 1;
var rect2dx = -1;
var rect2dy = -1;
var speed = 1;
var rect1coll = false;
var rect2coll = false;
var destx = 0;
var desty = 0;
var rect1ca = [0,0,0,0];
var rect2ca = [0,0,0,0];

function isColli() 
{
	if ((rect1y < rect2y + rect2height) && (rect2y < rect1y + rect1height))
	{
		if ((rect1x < rect2x + rect2width) && (rect2x < rect1x + rect1width))
		{
			return true;
		}	
	}
	else
	{
		return false;	
	}
}

function colli() 
{
	if (isColli()) 
	{
		//rect1ca = [0,0,0,0];
		//rect2ca = [0,0,0,0];
		if (rect1y < rect2y + rect2height) 
		{
			rect1ca[0] = 1;
			rect2ca[1] = 1; 
		}
		else if (rect2y < rect1y + rect1height) 
		{
			rect2ca[0] = 1;
			rect1ca[1] = 1;
		}
		if (rect1x <=rect2x + rect2width)
		{
			rect1ca[2] = 1;
			rect2ca[3] = 1;    
		}
		else if (rect2x < rect1x + rect1width)
		{
			rect2ca[2] = 1;
			rect1ca[3] = 1;
		}
	}
}

function update1() 
{
	canvas.onclick = function (event) 
								{
									destx = event.clientX;
									desty = event.clientY; 
								}
	var xMovement = (destx - rect1x);
	var yMovement = (desty - rect1y);
	var totalMovement = Math.abs(xMovement) + Math.abs(yMovement);
	rect1dx = ((xMovement / totalMovement) * speed) + 1;
	rect1dy = ((yMovement / totalMovement) * speed) + 1;
	if (isColli()) 
	{
		move1(rect1dx / Math.abs(rect1dx) , rect1dy / Math.abs(rect1dy));
		/*rect1dx = 0;
		rect1dy = 0;*/
	}
	move1(rect1dx,rect1dy)
}

function move1(x,y) 
{
	rect1x = rect1x + x;
	rect1y = rect1y + y;	
}

function update2() 
{
	var xMovement = (rect1x - rect2x);
	var yMovement = (rect1y - rect2y);
	var totalMovement = Math.abs(xMovement) + Math.abs(yMovement);
	rect2dx = (xMovement / totalMovement) * speed;
	rect2dy = (yMovement / totalMovement) * speed;
	if (!isColli()) 
	{
		rect2x = rect2x + rect2dx;
		rect2y = rect2y + rect2dy;
	}
	else
	{
		rect2x = rect2x;
		rect2y = rect2y;
	}
}

function drect1(x,y,w,h) 
{
	if (!isColli()) 
	{
		ctx.fillStyle = 'red';	
	}
	else 
	{
		ctx.fillStyle = 'yellow';	
	}
	ctx.fillRect(x,y,w,h);
}

function drect2(x,y,w,h) 
{
	if (!isColli()) 
	{
		ctx.fillStyle = 'blue';	
	}
	else 
	{
		ctx.fillStyle = 'green';	
	}
	ctx.fillRect(x,y,w,h);
}



function start() 
{
	clearCanvas();
	update1();
	update2();
	//colli();
	if (isColli()) 
	{
		drect1(rect1x - rect1dx,rect1y - rect1dy,rect1width,rect1height);
		drect2(rect2x - rect2dx,rect2y - rect2dy,rect2width,rect2height);
	}
	else 
	{
		drect1(rect1x,rect1y,rect1width,rect1height);
		drect2(rect2x,rect2y,rect2width,rect2height);
	}
	
}

function header() 
{
	ctx.beginPath();
	ctx.fillStyle = '#926653';	
	ctx.fillRect(0,0,maxCanvasWidth,maxCanvasHeight);
	ctx.closePath();

	var e = new Image();
	e.src = 'sky.png';
	ctx.drawImage(e,0,0);

/*
	ctx.beginPath();
	ctx.fillStyle = '#314c9a';	
	ctx.fillRect(0,0,maxCanvasWidth,70);
	ctx.closePath();*/

	ctx.save();
	var playerImg = new playerImage('john_s.png',25,10);
	var hp = 1;
	var mp = hp;

	if (hp < 30) 
	{
		var hpBar = new statusBar(80,15,hp,100,150,15,'red','#314c70');
	}
	else if (hp < 60) 
	{
		var hpBar = new statusBar(80,15,hp,100,150,15,'orange','#314c70');
	}
	else 
	{
		var hpBar = new statusBar(80,15,hp,100,150,15,'green','#314c70');
	}
	
	var mpBar = new statusBar(80,35,mp,100,150,15,'blue','#314c70');

	hpBar.display(); 	
	mpBar.display();

	ctx.restore();

	var tree = new Image();
	tree.src = 'wallH.png';
	ctx.drawImage(tree,0,100);
	ctx.drawImage(tree,0,maxCanvasHeight - 38);
	
	var three = new Image();
	three.src = 'wallV.png';
	ctx.drawImage(three,-50,100 + 60);
	ctx.drawImage(three,maxCanvasWidth - 82 + 50,100 + 60);
}

class playerImage
{
	constructor(imgSrc,imgXPos,imgYPos)
	{
		this.img = new Image();
		this.img.src = imgSrc;
		this.imgXPos = imgXPos;
		this.imgYPos = imgYPos;

		this.display();
	}

	display()
	{
		ctx.drawImage(this.img,this.imgXPos,this.imgYPos);
	}

}

class statusBar
{

	constructor(xPos,yPos,points,maxPoints,pointsBarWidth,pointsBarHeight,colour,inactiveColour)
	{
		console.log('statusBar');
		this.xPos = xPos;
		this.yPos = yPos;
		this.points = points;
		this.maxPoints = maxPoints;
		this.pointsBarWidth = pointsBarWidth;
		this.pointsBarHeight = pointsBarHeight;
		this.colour = colour;
		this.inactiveColour = inactiveColour;		
	}

	display()
	{
		ctx.beginPath();
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 5;
		ctx.fillStyle = this.inactiveColour;	
		ctx.fillRect(this.xPos,this.yPos,this.pointsBarWidth,this.pointsBarHeight);
		ctx.closePath();

		ctx.beginPath();
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 5;
		ctx.fillStyle = this.colour;	
		ctx.fillRect(this.xPos,this.yPos,this.points * (this.pointsBarWidth / this.maxPoints),this.pointsBarHeight);
		ctx.closePath();
	}
}

setInterval(header,20);
