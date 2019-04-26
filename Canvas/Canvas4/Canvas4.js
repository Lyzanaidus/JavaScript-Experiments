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
//console.log('windowWidth : ',window.innerWidth,'windowHeight : ',window.innerHeight);
//console.log('maxCanvasWidth : ',maxCanvasWidth,'maxCanvasHeight : ',maxCanvasHeight);

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Circle default variable declaration
var center_x_pos;
var center_y_pos;
var radius = 10;
const minRadius = 10;
const maxRadius = 50;
const arc_start = 0;
const arc_end = 2*PI;	
var colourArr = ['red' , 'blue' , 'yellow' , 'purple' , 'green' , 'orange' , 'pink' , 'silver' , 'black' , 'grey' , 'turquoise' , 'gold' ]	
var colour;
var dx = 1;			//	X-Vextor	
var dy = 1;			//	Y-Vextor
const noc = 15;		

//	Function to randomly initialize  x & y positions, radius, colour, dx & dy
function randomInitialize() 
{
	radius = ((Math.random() * (maxRadius - minRadius)) + minRadius);
	center_x_pos = (Math.random() * ((maxCanvasWidth - radius) - (minCanvasWidth + radius)) + (minCanvasWidth + radius)) ;
	center_y_pos = (Math.random() * ((maxCanvasHeight - radius) - (minCanvasHeight + radius)) + (minCanvasHeight + radius))  ;
	colour = colourArr[Math.round(Math.random() * colourArr.length)];
	dx = Math.round((Math.random()-.5)*dx);			//	-.5 to change value to +ve or -ve 	&	*(2*dx) to speed it up
	dy = Math.round((Math.random()-.5)*dy);			//	-.5 to change value to +ve or -ve 	&	*(2*dx) to speed it up
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

//	console.log('Circle')
	/*console.log('circleArr.x-pos : ',this.center_x_pos);
	console.log('circleArr.center_y_pos-pos : ',this.center_y_pos);
	console.log('circleArr.radius : ',this.radius);
	console.log('circleArr.arc_start : ',this.arc_start);
	console.log('circleArr.arc_end : ',this.arc_end);
	console.log('circleArr.colour : ',this.colour);*/

	//	Function to display a circle
	this.displayCircle = function() 
	{
//		console.log('Function : displayCircle');
		/*console.log('circleArr.x-pos : ',this.center_x_pos);
		console.log('circleArr.y-pos : ',this.center_y_pos);
		console.log('circleArr.radius : ',this.radius);
		console.log('circleArr.arc_start : ',this.arc_start);
		console.log('circleArr.arc_end : ',this.arc_end);
		console.log('circleArr.colour : ',this.colour);*/
		
		ctx.beginPath();     
		ctx.fillStyle = this.colour;
		ctx.arc(this.center_x_pos, this.center_y_pos, this.radius, this.arc_start, this.arc_end, false);      
		ctx.fill();
		ctx.closePath();  	
	}

	//	Function to check if a ball collides with the canvas border
	this.borderCollision = function(/*center_x_pos,center_y_pos,radius*/) 
	{	
//		console.log('circleArr.x-pos : ',this.center_x_pos);
		/*console.log('circleArr.y-pos : ',this.center_y_pos);
		console.log('circleArr.radius : ',this.radius);
		console.log('circleArr.dx : ',this.dx);
		console.log('circleArr.dy : ',this.dy);*/		
		
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
			debugger
			this.dy = this.dy * -1;
		}
	}

	//	Function to update a circle
	this.updateCircle = function()
	{
//		console.log('Function : updateCircle');

		this.borderCollision();
		
		this.center_x_pos = this.center_x_pos + this.dx;
		this.center_y_pos = this.center_y_pos + this.dy;
		
		this.displayCircle();
	}

	
}

var circleArr = []			//	Array to store multiple Circles

//function collision

//	Function to initialize 'noc' number of Circles
function initManyCircles() 
{
	for (let i = 0; i < noc; i++) 
	{
		randomInitialize();

		circleArr.push(new Circle(center_x_pos,center_y_pos,radius,arc_start,arc_end,colour,dx,dy));
	}	
}

//	Function to update all Circles in 'circleArr'
function updateManyCircles() 
{
	for (var i = 0; i < circleArr.length; i++) 
	{
		checkCollision();
		circleArr[i].updateCircle();

		/*console.log('Circle no ',i);
		console.log('circleArr.x-pos : ',this.center_x_pos);
		console.log('circleArr.y-pos : ',this.center_y_pos);
		console.log('circleArr.dx : ',this.dx);
		console.log('circleArr.dy : ',this.dy);*/
	}	
}

function checkCollision() 
{
	for (var i = 0; i < circleArr.length; i++) 
	{
		for (var j = 0; j < circleArr.length; j++) 
		{

			if (j != i) 
			{
				//console.log('i : ',i,'j : ',j);
				var xDist = circleArr[i].center_x_pos - circleArr[j].center_x_pos;
				var yDist = circleArr[i].center_y_pos - circleArr[j].center_y_pos;
				var distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
				//console.log('circleArr [',i,'].center_x_pos : ',circleArr[i].center_x_pos,'circleArr [',i,'].center_y_pos : ',circleArr[i].center_y_pos);
				//console.log('circleArr [',j,'].center_x_pos : ',circleArr[i].center_x_pos,'circleArr [',j,'].center_y_pos : ',circleArr[i].center_y_pos);
				//console.log('distance : ',distance);
				if (distance < (circleArr[i].radius + circleArr[j].radius)) 
				{
					//console.log('Collision');
					
					circleArr[i].dx = circleArr[i].dx * -1;
					circleArr[i].dy = circleArr[i].dy * -1;
					circleArr[i].updateCircle();
					
					circleArr[j].dx = circleArr[j].dx * -1;
					circleArr[j].dy = circleArr[j].dy * -1;
					circleArr[j].updateCircle();
					    		
				}
			}
		}
	}
}

//Function to animate a ball
function animate() 
{
//	console.log('Function : animate');

	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);			/*	Clears a rectangle of size
																	//	(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight)*/
	updateManyCircles();
	
	requestAnimationFrame(animate);			//	Animates the function 'animate' -recursively 
}





initManyCircles();
//console.log(circleArr);

animate();