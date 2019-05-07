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
function displayBg() 
{
	var bg = new Image();
	bg.src = "Images/background.jpg";
	ctx.drawImage(bg,minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

function clearCanvas() 
{
	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

//	Ball Class
class Ball
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,targetXPos,targetYPos)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.targetXPos = targetXPos;
		this.targetYPos = targetYPos;
		this.noOfRows = rows;
		this.noOfCols = cols;

		this.sheet = new Image();
		this.sheet.src = imgSrc;
		this.sheetWidth = imgWidth;
		this.sheetHeight = imgHeight;
		console.log('[Class Ball]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		console.log('[Class Ball]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		console.log('[Class Ball]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		console.log('[Class Ball]\n','width : ',this.width,'height : ',this.height);
		
		/*this.xDir = 0;
		this.yDir = 0;*/
		this.dx = this.targetXPos - this.xPos;
		this.dy = this.targetYPos - this.yPos;
		this.speed = 0.05;
		
		this.isFacingLeft = false;
		//this.nextMove = [true,false,false,true];			//	nextMove[up,down,left,right]

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		console.log('[Class Ball]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move() 
	{
		console.log('[Class Ball]\n','Function : move()');
		
		this.xPos = this.xPos + (this.dx * this.speed); 
		this.yPos = this.yPos + (this.dy * this.speed); 

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		console.log('[Class Ball]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
	}

	nextSpriteCol()
	{
		console.log('[Class Ball]\n','Function : nextSpriteCol()');

		this.sheetCurrentCol = (this.sheetCurrentCol + 1) % (this.noOfCols - 4);			//	Since we only need sprites (0,3) to (0,7)

		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	updateAnimation()
	{
		console.log('[Class Ball]\n','Function : updateAnimation()');

		this.nextSpriteCol();

		/*
		if (this.isCollision()) 
		{
			console.log('[Class Ball]\n','DirChange : ',this.isDirChange());
			this.sheetCurrentCol = 0;
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}
		*/

		if (this.isFacingLeft) 
		{
			console.log('[Class Ball]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 2;			//	Row 0 Mirror (i.e. Right to Left)
			this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}
		else
		{
			console.log('[Class Ball]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 0;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}

		this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
	}

	start()
	{
		console.log('Function : ssart()');
		
		console.log('this : ',this);
		var that = this;
		setInterval(function () 
					{
						console.log('that : ',that);
						console.log('setInterval this : ',this);
						clearCanvas();
						that.move();
						that.updateAnimation();
						that.display();	
					
					}
					,300);
	}
}

class World
{
	constructor()
	{
		var that = this;
		var can = document.getElementById('canvas-1')
		can.onclick = function (event) 
								{
									
									console.log('clicked at ',event.clientX,event.clientY);
									that.targetXPos = event.clientX;
									that.targetYPos = event.clientY;

									that.newAmmo(that.targetXPos,that.targetYPos);
								}

								
								
	}

	/*function */newAmmo(tXPos,tYPos) 
	{
		//console.log('Function : newAmmo()');
		
		var initXPos = 50;
		var initYPos = 50;
		var img = new Image();
		img.src = "Images/ball.png";
		img.width = 655;
		img.height = 330;
		var noOfRows = 4;
		var noOfCols = 8;
		var targetXPos = tXPos;
		var targetYPos = tYPos;

		var ammo = new Ball(initXPos,initYPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos);	
		ammo.start();	
		console.log('dhichkayu');
	}

	/*function */animate() 
	{
		//console.log('Function : animate()');
			
		/*clearCanvas();
		this.ammo.move();
		ammo.updateAnimation();
		ammo.display();	*/
	}

	/*function */start() 
	{
		//initammo();

		setInterval(this.animate,150);	
	}

}

var w = new World();

w.start();

/*var initXPos = 50;
		var initYPos = 50;
		var img = new Image();
		img.src = "Images/ball.png";
		img.width = 655;
		img.height = 330;
		var noOfRows = 4;
		var noOfCols = 8;
		var targetXPos = 500;
		var targetYPos = 500;

		var ammo = new Ball(initXPos,initYPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos);	
		//setInterval(ammo.start,150);
		//ammo.start();	*/