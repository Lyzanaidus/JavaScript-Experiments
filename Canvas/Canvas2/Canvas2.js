// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Initialize constant PI = Math.PI
const PI =Math.PI;
console.log(PI);


//  Set canvas properties

canvas.style.border = '1px solid black';

const maxCanvasWidth = window.innerWidth;
const maxCanvasHeight = window.innerHeight;
console.log('windowWidth : ',window.innerWidth,'windowHeight : ',window.innerHeight);
console.log('maxCanvasWidth : ',maxCanvasWidth,'maxCanvasHeight : ',maxCanvasHeight);

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Circle variable declaration
const maxRadius = 50;
var colorArr = ['red' , 'blue' , 'yellow' , 'purple' , 'green' , 'orange' , 'pink' , 'silver' , 'black'  ]			
const arc_start = 0;
const arc_end = 2*PI;																			//	Initialize array for multiple colours

//	Function to display a circle
function displayCircle(center_x_pos,center_y_pos,radius,arc_start,arc_end,color) 
{
	ctx.beginPath();     
	ctx.fillStyle = color;
	ctx.arc(center_x_pos, center_y_pos, radius, arc_start, arc_end, false);      
	ctx.fill();
	ctx.closePath();  	
}

//	Function to generate random X-Position 
function randomXPosition() 
{
	return (Math.random() * maxCanvasWidth) ;			//	Math.random() give values between [0-1) ,so * canvasWidth 
													//				; gives values between [0-1) * canvasWidth = [0-canvasWidth)
}

//	Function to generate random Y-Position 
function randomYPosition() 
{
	return (Math.random() * maxCanvasHeight) ;
}

//	Function to generate random radius 
function randomRadius() 
{
	return (Math.random() * maxRadius) ;
}

//	Function to create many (no number of) circles 
function manyCircle(no) 
{
	for (let i = 0; i <= no; i++) 
	{
		var center_x_pos = randomXPosition();
		var center_y_pos = randomYPosition();
		var radius = randomRadius();
		
		var color = colorArr[Math.round(Math.random() * 8)];

		displayCircle(center_x_pos,center_y_pos,radius,arc_start,arc_end,color); 
	}
}

manyCircle(100);
