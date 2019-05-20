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

function displayBg() 
{
	var bg = new Image();
	bg.src = "Images/background.jpg";
	ctx.drawImage(bg,minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

var img = new Image();
img.src = 'arr.jpg';


function draw() 
{
	ctx.drawImage(img,500,200,50,50);
}

function drect() 
{
	ctx.fillStyle = 'red';
	ctx.fillRect(0,0,50,50);

}

function ddot() 
{
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,3,3);

}

function rotation(deg) 
{
	ctx.save();
	trans(25,25);
	ctx.rotate(deg * (Math.PI / 180));
	ctx.drawImage(img,-(img.width/2),-(img.height/2));
	ctx.restore();
}

function trans(x,y) 
{
	var x = x;
	var y = y;
	ctx.translate(x,y);
}

var ct = 0;

function asd() 
{
	ct++;
	displayBg();
	ctx.save();
	trans(300,300);
	rotation(ct);
	ctx.restore();
}




setInterval(asd,100);
/*trans(200,200);
trans(25,25);
asd();*/

