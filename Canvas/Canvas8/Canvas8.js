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
function dot() 
{
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,3,3);

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

//	Avatar Class
class Avatar
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
		//console.log('[Class Avatar]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Avatar]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Avatar]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Avatar]\n','width : ',this.width,'height : ',this.height);
		
		this.dx = 0;
		this.dy = 0;
		this.speed = 3;
		
		this.isFacingLeft = false;
		this.previousIsFacingLeft = false;
		this.nextMove = [false,false,false,false];			//	nextMove[up,down,left,right]

		this.leftKey = 37;
		this.rightKey = 39;
		this.upKey = 38;
		this.downKey = 40;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;
		this.ammoArr = [];
		
		document.addEventListener(
								'keydown',
								event =>
								{
									//console.log('[Class Avatar]\n','Avatar Input');
									
									//console.log('event.keyCode : ',event.keyCode);
									
									if (event.keyCode === this.upKey) 
									{
										//console.log('up pressed.');
										this.nextMove[0] = true;
										this.nextMove[1] = false;
									}
									else if (event.keyCode === this.downKey) 
									{
										//console.log('down pressed.');
										this.nextMove[1] = true;
										this.nextMove[0] = false;	
									}
									
									if (event.keyCode === this.leftKey) 
									{
										//console.log('left pressed.');
										this.nextMove[2] = true;
										this.nextMove[3] = false;
										this.isFacingLeft = true;
									}
									else if (event.keyCode === this.rightKey) 
									{
										//console.log('right pressed.');
										this.nextMove[3] = true;
										this.nextMove[2] = false;
										this.isFacingLeft = false;
									}
									//console.log(this.nextMove);
									this.updateAnimation();
									this.updatePos();
								}

								
								);

		document.addEventListener(
								'keyup',
								event =>
								{
									//console.log('[Class Avatar]\n','Clear Avatar Input');
									
									//console.log('event.keyCode : ',event.keyCode);
									if (event.keyCode === this.upKey) 
									{
										//console.log('up cleared.');
										this.nextMove[0] = false;
									}
									if (event.keyCode === this.downKey) 
									{
										//console.log('down cleared.');
										this.nextMove[1] = false;
									}
									if (event.keyCode === this.leftKey) 
									{
										//console.log('left cleared.');
										this.nextMove[2] = false;
									}
									if (event.keyCode === this.rightKey) 
									{
										//console.log('right cleared.');
										this.nextMove[3] = false;
									}									
								}
								);

		var AvatarObject = this;
		var can = document.getElementById('canvas-1')
		can.onclick = function (event) 
								{
									
									//console.log('clicked at ',event.clientX,event.clientY);
									AvatarObject.targetXPos = event.clientX;
									AvatarObject.targetYPos = event.clientY;
									AvatarObject.fire(AvatarObject.targetXPos,AvatarObject.targetYPos);
									
								}

	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Avatar]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move(dx,dy) 
	{
		//console.log('[Class Avatar]\n','Function : move()');
		
		this.xPos = this.xPos + (this.speed * dx);
		this.yPos = this.yPos + (this.speed * dy);

		grunt1.updatePos(this.xPos,this.yPos);

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Avatar]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
	}

	nextSpriteCol()
	{
		//console.log('[Class Avatar]\n','Function : nextSpriteCol()');

		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 3);
		this.sheetCurrentCol = this.nextSpriteCounter + 3;			//	Since we only need sprites (0,3) to (0,7)

		//console.log('nextSpriteCounter : ',this.nextSpriteCounter);
		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	isDirChange()			//	return XOR of (this.previousIsFacingLeft,this.isFacingLeft)
	{
		//console.log('[Class Avatar]\n','Function : isDirChange()');

		return ((this.previousIsFacingLeft || this.isFacingLeft) && (!(this.previousIsFacingLeft && this.isFacingLeft)))
	}

	updateAnimation()
	{
		//console.log('[Class Avatar]\n','Function : updateAnimation()');

		this.nextSpriteCol();

		if (this.isDirChange()) 
		{
			//console.log('[Class Avatar]\n','DirChange : ',this.isDirChange());
			this.sheetCurrentCol = 0;
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}

		if (this.isFacingLeft) 
		{
			//console.log('[Class Avatar]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 3;			//	Row 0 Mirror (i.e. Right to Left)
			this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}
		else
		{
			//console.log('[Class Avatar]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 0;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
		}

		this.previousIsFacingLeft = this.isFacingLeft;

		this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
	}

	updatePos()
	{
		if (this.nextMove[0])			//	Up 
		{
			this.dy = -1;
		}
		else if (this.nextMove[1])			//	Down
		{
			this.dy = 1;
		}
		else
		{
			this.dy = 0;
		}
		
		if (this.nextMove[2])			//	Left
		{
			this.dx = -1;
		}
		else if (this.nextMove[3])			//	Right
		{
			this.dx = 1;
		}
		else
		{
			this.dx = 0;
		}

		this.move(this.dx,this.dy);
	}

	fire(tXPos,tYPos) 
	{
		//console.log('Function : fire()');
		
		var img = new Image();
		img.src = "Images/ball.png";
		img.width = 655;
		img.height = 330;
		var noOfRows = 4;
		var noOfCols = 8;
		var targetXPos = tXPos;
		var targetYPos = tYPos;

		if (!this.isFacingLeft) 
		{
			if (targetXPos >= this.xPos + this.width) 
			{
				this.bulletNo++;
				this.ammoArr.push(new Ball(this.xPos,this.yPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos,this.isFacingLeft));
			}
		}
		else 
		{
			if (targetXPos < this.xPos) 
			{
				this.bulletNo++;
				this.ammoArr.push(new Ball(this.xPos,this.yPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos,this.isFacingLeft));
			}
		}
		//console.log('ammoArr[',this.bulletNo,'] : ',this.ammoArr[this.bulletNo]);
	}

}

/*function initPlayer1() 
{*/
	let initXPos = 0;
	let initYPos = 0;
	let img = new Image();
	img.src = "Images/john.png";
	img.width = 640;
	img.height = 480;
	let noOfRows = 6;
	let noOfCols = 8;
	let hp = 100;

	var player1 = new Avatar(initXPos,initYPos,img.src,img.width,img.height,noOfRows,noOfCols,hp);

//}

//	Ball Class
class Ball
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,targetXPos,targetYPos,isFacingLeft)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.noOfRows = rows;
		this.noOfCols = cols;

		this.sheet = new Image();
		this.sheet.src = imgSrc;
		this.sheetWidth = imgWidth;
		this.sheetHeight = imgHeight;
		//console.log('[Class Ball]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Ball]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Ball]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.targetXPos = targetXPos;
		this.targetYPos = targetYPos - (this.sheetWinHeight / 2);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Ball]\n','width : ',this.width,'height : ',this.height);
		
		/*this.xDir = 0;
		this.yDir = 0;*/
		this.speed = 3;
		this.xMovement = (this.targetXPos - this.xPos);
		this.yMovement = (this.targetYPos - this.yPos);
		this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
		this.dx = (this.xMovement / this.totalMovement) * this.speed;
		this.dy = (this.yMovement / this.totalMovement) * this.speed;
		this.angle = Math.atan(this.yMovement / this.xMovement);
		
		
		this.isFacingLeft = isFacingLeft;
		
		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.cc = 0;
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Ball]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move() 
	{
		//console.log('[Class Ball]\n','Function : move()');
		
		this.xPos = this.xPos + (this.dx * this.speed); 
		this.yPos = this.yPos + (this.dy * this.speed); 

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Ball]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
		//debugger;
	}

	rotate(degrees)
	{
		//console.log('[Class Ball]\n','Function : rotate(',degrees,')');
		ctx.save();
		//ctx.translate(player1.xPos,player1.yPos);
		ctx.rotate(degrees);
		this.display();
		dot();
		this.dot();
		//debugger
		ctx.restore();
	}
	dot() 
	{	
		ctx.fillStyle = 'pink';
		ctx.fillRect(this.xPos + (this.width),this.yPos + (this.height / 2),3,3);

	}


	nextSpriteCol()
	{
		//console.log('[Class Ball]\n','Function : nextSpriteCol()');

		this.sheetCurrentCol = (this.sheetCurrentCol + 1) % (this.noOfCols - 4);			//	Since we only need sprites (0,3) to (0,7)

		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	updateAnimation()
	{
		//console.log('[Class Ball]\n','Function : updateAnimation()');

		if(this.cc === 0)
		{
			this.nextSpriteCol();	
		
			/*
			if (this.isCollision()) 
			{
				//console.log('[Class Ball]\n','DirChange : ',this.isDirChange());
				this.sheetCurrentCol = 0;
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}
			*/

			if (this.isFacingLeft) 
			{
				//console.log('[Class Ball]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 2;			//	Row 0 Mirror (i.e. Right to Left)
				this.sheetCurrentCol = this.sheetCurrentCol + 4;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}
			else
			{
				//console.log('[Class Ball]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 0;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}

			this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
		}

		this.cc = (this.cc + 1) % 4; 
		
	}

	

	start()
	{
		//console.log('Function : start()');
		
		//clearCanvas();
		this.move();
		this.updateAnimation();
		//this.rotate(this.angle);
		this.display();
		
		//debugger
	}
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
		this.speed = 2;
		
		this.isFacingLeft = false;
		this.previousIsFacingLeft = false;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;

		this.targetXPos = 100;
		this.targetYPos = 100;
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
		console.log('[Class Grunt]\n','Function : updateAnimation()');
		if (this.targetXPos < this.xPos) 
		{
			this.isFacingLeft = true;
			//console.log('isFacingLeft : ',this.isFacingLeft);
		}
		else if (this.targetXPos > this.xPos) 
		{
			this.isFacingLeft = false;
			//console.log('isFacingLeft : ',this.isFacingLeft);
		
		}

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

	updatePos(targetXPos,targetYPos)
	{
		//console.log('[Class Grunt]\n','Function : updatePos()');

		if (true) 
		{
			this.xMovement = (targetXPos - this.xPos);
			this.yMovement = (targetYPos - this.yPos);
			this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
			this.dx = (this.xMovement / this.totalMovement) * this.speed;
			this.dy = (this.yMovement / this.totalMovement) * this.speed;	
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
		/*//console.log('Area X : ',this.xPos,this.xPos + this.width);
		//console.log('targetXPos : ',this.targetXPos);
		//console.log('Area Y : ',this.yPos,this.yPos + this.height);
		//console.log('targetYPos : ',this.targetYPos);
		//console.log('inArea : ',this.inArea())*/
	}

}

let gInitXPos = 500;
let gInitYPos = 300;
let gImg = new Image();
gImg.src = "Images/john.png";
gImg.width = 640;
gImg.height = 480;
let gNoOfRows = 6;
let gNoOfCols = 8;
let gHp = 100;

var grunt1 = new Grunt(gInitXPos,gInitYPos,gImg.src,gImg.width,gImg.height,gNoOfRows,gNoOfCols,gHp);


function animate() 
{
	//console.log('Function : animate()');
		
	//clearCanvas();
	displayBg();
	player1.display();	
	for (var i = 0; i < player1.ammoArr.length; i++) 
	{
		player1.ammoArr[i].start();
	}
	grunt1.start();
}

function start() 
{
	//initPlayer1();
	setInterval(animate,1000 / 60);	
}

start();
