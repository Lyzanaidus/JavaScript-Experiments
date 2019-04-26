// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Initialize constant PI = Math.PI
const PI =Math.PI;
console.log(PI);

//  Set canvas properties
canvas.style.border = '1px solid black';

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;
console.log('windowWidth : ',window.innerWidth,'windowHeight : ',window.innerHeight);

//  Drawing a rectangle 
ctx.beginPath();      //  To begin a path, or reset the current path
ctx.fillStyle = 'red';			//	Set style to fill an object
ctx.fillRect(10, 10, 150, 100);
ctx.fill();			//	Fill an object with above selected style 
ctx.closePath();      //  To close current path ; Paired wit 'beginPath()'


//  Drawing a arc 
ctx.beginPath();     
ctx.fillStyle = 'green';
ctx.arc(750 , 50, 50 , 0, 2*PI, false);      //arc(center-x-position,center-y-position,radius,
                                      //    arc-starting-point-in-radian's,arc-finishing-point-in-radian's,draw-in-counter-clock-wise);
ctx.fill();
ctx.closePath();      

//  Drawing a line
ctx.beginPath();      
ctx.moveTo(50,600);
ctx.lineTo(800,100);
ctx.lineTo(250,200);
ctx.lineTo(50,600);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.closePath();      
//ctx.clearPath();      //  To clear all paths after this command



//  Drawing 2 intersecting lines
    //  Line1 [color : 'orange']
ctx.beginPath();
ctx.moveTo(150,300);
ctx.lineTo(800,600);
ctx.strokeStyle = "orange";			//	Set color of a stroke i.e.: a line'ish sth
ctx.stroke();			//	Fill a stroke with above selected color 
ctx.closePath();

    //  Line2 [color : 'purple']
ctx.beginPath();
ctx.moveTo(500,500);
ctx.lineTo(190,100);
ctx.strokeStyle = "purple";
ctx.stroke();
ctx.closePath(); 


//	Without ctx.beginPath() the previous lines are affected 

ctx.strokeStyle = 'yellow';
ctx.arc(900 , 275, 50 , 0, 2*PI, false);      
ctx.stroke();


