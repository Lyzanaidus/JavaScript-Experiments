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

//	Canvas related functions
function dot(x,y) 
{
	ctx.fillStyle = 'blue';
	ctx.fillRect(x,y,3,3);

}
//	Function to display Bg
function displayBg() 
{
	var bg = new Image();
	bg.src = "Images/background.jpg";
	ctx.drawImage(bg,minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

//	Function to clear entire canvas
function clearCanvas() 
{
	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

//	Grunt Class
class Grunt
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,hp)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.noOfRows = rows;
		this.noOfCols = cols;

		this.sheet = new Image();
		this.sheet.src = imgSrc;
		this.sheetWidth = imgWidth;
		this.sheetHeight = imgHeight;
		//console.log('[Class Grunt]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Grunt]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Grunt]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Grunt]\n','width : ',this.width,'height : ',this.height);
		
		this.dx = 0;
		this.dy = 0;
		this.speed = 3;
		
		this.isFacingLeft = false;
		this.previousIsFacingLeft = false;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;

		this.targetXPos = 100;
		this.targetYPos = 100;
		
		var GruntObject = this;
		canvas.onclick = function (event) 
								{
									
									//console.log('clicked at ',event.clientX,event.clientY);
									GruntObject.targetXPos = event.clientX;
									GruntObject.targetYPos = event.clientY - (GruntObject.height / 2); 
									if (GruntObject.targetXPos < GruntObject.xPos) 
									{
										GruntObject.isFacingLeft = true;
									}
									else if (GruntObject.targetXPos > GruntObject.xPos) 
									{
										GruntObject.isFacingLeft = false;
									}
									dot(GruntObject.targetXPos,GruntObject.targetYPos)
									GruntObject.updatePos();									
									//console.log(GruntObject.targetXPos,GruntObject.targetYPos);								
								}

	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Grunt]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move() 
	{
		//console.log('[Class Grunt]\n','Function : move()');
		
		this.xPos = this.xPos + (this.speed * this.dx);
		this.yPos = this.yPos + (this.speed * this.dy);

		this.updateAnimation();
		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Grunt]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
	}

	nextSpriteCol()
	{
		//console.log('[Class Grunt]\n','Function : nextSpriteCol()');

		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 3);
		this.sheetCurrentCol = this.nextSpriteCounter + 3;			//	Since we only need sprites (0,3) to (0,7)

		//console.log('nextSpriteCounter : ',this.nextSpriteCounter);
		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	isDirChange()			//	return XOR of (this.previousIsFacingLeft,this.isFacingLeft)
	{
		//console.log('[Class Grunt]\n','Function : isDirChange()');

		return ((this.previousIsFacingLeft || this.isFacingLeft) && (!(this.previousIsFacingLeft && this.isFacingLeft)))
	}

	updateAnimation()
	{
		//console.log('[Class Grunt]\n','Function : updateAnimation()');

		this.nextSpriteCol();

		if (this.isDirChange()) 
		{
			//console.log('[Class Grunt]\n','DirChange : ',this.isDirChange());
			this.sheetCurrentCol = 0;
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}

		if (this.isFacingLeft) 
		{
			//console.log('[Class Grunt]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 3;			//	Row 0 Mirror (i.e. Right to Left)
			this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}
		else
		{
			//console.log('[Class Grunt]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 0;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
		}

		this.previousIsFacingLeft = this.isFacingLeft;

		this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
	}

	updatePos()
	{
		//console.log('[Class Grunt]\n','Function : updatePos()');

		if (!this.inArea()) 
		{
			this.xMovement = (this.targetXPos - this.xPos);
			this.yMovement = (this.targetYPos - this.yPos);
			this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
			this.dx = (this.xMovement / this.totalMovement) * this.speed;
			this.dy = (this.yMovement / this.totalMovement) * this.speed;

			this.move(this.dx,this.dy);
		}
		else
		{
			this.dx = 0;
			this.dy = 0;
		}
	}

	inArea()
	{
		if (((this.targetXPos >= this.xPos) && (this.targetXPos <= this.xPos + this.width)) && ((this.targetYPos >= this.yPos) && (this.targetYPos <= this.yPos + this.height))) 
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	start()
	{
		this.move();
		this.display();
		console.log('Area X : ',this.xPos,this.xPos + this.width);
		console.log('targetXPos : ',this.targetXPos);
		console.log('Area Y : ',this.yPos,this.yPos + this.height);
		console.log('targetYPos : ',this.targetYPos);
		console.log('inArea : ',this.inArea())
	}

}

let initXPos = 0;
let initYPos = 0;
let img = new Image();
img.src = "Images/john.png";
img.width = 640;
img.height = 480;
let noOfRows = 6;
let noOfCols = 8;
let hp = 100;

var grunt1 = new Grunt(initXPos,initYPos,img.src,img.width,img.height,noOfRows,noOfCols,hp);

function animate() 
{
	//console.log('Function : animate()');
		
	//clearCanvas();
	//displayBg();
	grunt1.start();

}

function start() 
{
	setInterval(animate,100);	
}

start();