// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Initialize constant PI = Math.PI
const PI =Math.PI;
//console.log(PI);


//  Set canvas properties
canvas.style.border = '1px solid black';

const minCanvasWidth = 0;
const minCanvasHeight = 0;
const maxCanvasWidth = window.innerWidth;
const maxCanvasHeight = window.innerHeight;

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Circle default variable declaration
var center_x_pos;
var center_y_pos;
var radius = 5;
const minRadius = 3;
const maxRadius = 5;
const arc_start = 0;
const arc_end = 2*PI;	
var colourArr = ['red' , 'blue' , 'yellow' , 'purple' , 'green' , 'orange' , 'pink' , 'silver' , 'black' , 'grey' , 'turquoise' , 'gold' ]	
var colour;
var dx;			//	X-Vextor	
var dy;			//	Y-Vextor
var maxdx = 20;			//	X-Vextor	
var maxdy = 20;			//	Y-Vextor
const noc = 500;

//	Function to randomly initialize  x & y positions, radius, colour, dx & dy
function randomInitialize() 
{
	//console.log('Function randomInitialize');

	radius = ((Math.random() * (maxRadius - minRadius)) + minRadius);
	center_x_pos = (Math.random() * ((maxCanvasWidth - radius) - (minCanvasWidth + radius)) + (minCanvasWidth + radius)) ;
	center_y_pos = (Math.random() * ((maxCanvasHeight - radius) - (minCanvasHeight + radius)) + (minCanvasHeight + radius))  ;
	colour = colourArr[Math.round(Math.random() * colourArr.length)];
	dx = ((Math.random() * (maxdx - (maxdx * -1)) - maxdx));
	dy = ((Math.random() * (maxdy - (maxdy * -1)) - maxdy));
	/*dx = Math.round(((Math.random()*1)-.5)*maxdx);			//	-.5 to change value to +ve or -ve 	&	*(2*dx) to speed it up
	dy = Math.round(((Math.random()*1)-.5)*maxdy);			//	-.5 to change value to +ve or -ve 	&	*(2*dx) to speed it up
	*/
	if (dx === 0) 
	{
		dx = 10;
	}
	if (dy === 0) 
	{
		dy = 10;
	}
}

//	Circle Object
function Circle(x_pos,y_pos,radius,arc_start,arc_end,colour,dx,dy) 
{
	this.center_x_pos = x_pos;
	this.center_y_pos = y_pos;
	this.radius = radius;
	this.arc_start = arc_start;
	this.arc_end = arc_end;
	this.colour = colour;
	this.dx = dx;
	this.dy = dy;

	//	Function to display a circle
	this.displayCircle = function() 
	{
		//console.log('Function Circle>displayCircle');

		ctx.beginPath();     
		ctx.fillStyle = this.colour;
		ctx.arc(this.center_x_pos, this.center_y_pos, this.radius, this.arc_start, this.arc_end, false);      
		ctx.fill();
		ctx.closePath();  	
	}

	//	Function to check if a ball collides with the canvas border
	this.borderCollision = function(/*center_x_pos,center_y_pos,radius*/) 
	{	
		//console.log('Function Circle>borderCollision');
		
		if (this.center_x_pos + this.radius >= maxCanvasWidth) 
		{
			this.dx = this.dx * -1;
		}
		if (this.center_y_pos + this.radius >= maxCanvasHeight) 
		{

			this.dy = this.dy * -1;
		}
		if (this.center_x_pos - this.radius <= minCanvasWidth) 
		{
			this.dx = this.dx * -1;
		}
		if (this.center_y_pos - this.radius <= minCanvasHeight) 
		{
			this.dy = this.dy * -1;
		}
	}

	//	Function to update a circle
	this.updateCircle = function()
	{
		//console.log('Function Circle>updateCircle');

		this.borderCollision();
		
		this.center_x_pos = this.center_x_pos + this.dx;
		this.center_y_pos = this.center_y_pos + this.dy;
		
	}

	
}

var circleArr = []			//	Array to store multiple Circles

//	Function to ensure balls don't go inside borrders
function kittyPride() 
{

	//console.log('Function kittyPride');
	for (var i = 0; i < circleArr.length; i++) 
	{
		if ((circleArr[i].center_y_pos - circleArr[i].radius) < minCanvasHeight) 
		{
			circleArr[i].center_y_pos = minCanvasHeight + circleArr[i].radius;
		}
		else if ((circleArr[i].center_y_pos + circleArr[i].radius) > maxCanvasHeight) 
		{
			circleArr[i].center_y_pos = maxCanvasHeight - circleArr[i].radius;
		}
		if ((circleArr[i].center_x_pos - circleArr[i].radius) < minCanvasWidth) 
		{
			circleArr[i].center_x_pos = minCanvasWidth + circleArr[i].radius;
		}
		else if ((circleArr[i].center_x_pos + circleArr[i].radius) > maxCanvasWidth) 
		{
			circleArr[i].center_x_pos = maxCanvasWidth - circleArr[i].radius;
		}
	}
}

//	Function to ensure balls are correctly born
function isBadBirth() 
{
		//console.log('Function isBadBirth');
	for (let i = 0; i < circleArr.length; i++) 
	{
		xDist = circleArr[i].center_x_pos - center_x_pos;
		yDist = circleArr[i].center_y_pos - center_y_pos;
		distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
				
		if (distance < (circleArr[i].radius + radius)) 
		{	
			//console.log('bad birth');
			return true;
			debugger;
		}
		else
		{
			//console.log('good birth');
			return false;
		}
	}	
}

//	Function to initialize 'noc' number of Circles
function initManyCircles() 
{

		//console.log('Function initManyCircles');
	for (let i = 0; i < noc; i++) 
	{
		do
		{
			randomInitialize();

			circleArr.push(new Circle(center_x_pos,center_y_pos,radius,arc_start,arc_end,colour,dx,dy));
		}while(isBadBirth());
		
	}	
}

//	Function to update all Circles in 'circleArr'
function updateManyCircles() 
{
		//console.log('Function updateManyCircles');
	for (var i = 0; i < circleArr.length; i++) 
	{
		checkCollision();
		kittyPride();
		circleArr[i].updateCircle();
		circleArr[i].displayCircle();
	}	
}

function checkCollision() 
{

		//console.log('Function checkCollision');
	for (var i = 0; i < circleArr.length; i++) 
	{
		for (var j = 0; j < circleArr.length; j++) 
		{

			if (j != i) 
			{
				var xDist = circleArr[i].center_x_pos - circleArr[j].center_x_pos;
				var yDist = circleArr[i].center_y_pos - circleArr[j].center_y_pos;
				var distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
				if (distance < (circleArr[i].radius + circleArr[j].radius)) 
				{
					//console.log('Collision');
					
					circleArr[i].dx = circleArr[i].dx * -1;
					circleArr[i].dy = circleArr[i].dy * -1;
					//circleArr[i].updateCircle();
					
					circleArr[j].dx = circleArr[j].dx * -1;
					circleArr[j].dy = circleArr[j].dy * -1;
					//circleArr[j].updateCircle();
					    		
				}
			}
		}
	}
}

//Function to animate a ball
function animate() 
{
	//console.log('Function : animate');

	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);			/*	Clears a rectangle of size
																	//	(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight)*/
	updateManyCircles();
	
	requestAnimationFrame(animate);			//	Animates the function 'animate' -recursively 
}





initManyCircles();
animate();
