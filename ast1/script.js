var image = document.getElementById('image');

var MinWidth = 0 ;
var MaxWidth = -200 ;
var FPS = 60;
var image_INTERVAL = 1000/FPS;  

var imageMove = 0;
var xDir = -1;
var int;
var pause = 1;

function checkDir(imageMove) 
{
  console.log('Function : checkDir');
  if (imageMove >= MinWidth) 
  {
    xDir = -1;
  }
  else if (imageMove <= MaxWidth) 
  {
    xDir = 5;
  }
}

function checkPause(imageMove)
{
  console.log('Function : checkPause');
  if (imageMove === MinWidth - xDir) 
  {
    pause = 1;
  }
  else if (imageMove === MaxWidth) 
  {
    pause = 0;
  }
}

function left() 
{
  console.log('Function : left');
  
  if (imageMove < -100) 
  {
    console.log('asd')
  }
}

function right() 
{
  console.log('Function : right');
  
  if (imageMove >= -200) 
  {
    clearInterval(int);
    console.log('Interval Cleared')
    imageMove = imageMove - 100;
  }

}

function start() 
{
  console.log('Function : start');
  
  int = setInterval(moveimage,image_INTERVAL);
}

function delay() 
{
  console.log('Function : delay');
 
  setTimeout(start,1000);
}

function moveimage() 
{
  console.log('Function : moveimage');
  
  checkDir(imageMove);
  checkPause(imageMove)
  

  imageMove = imageMove + xDir;
  image.style.marginLeft = imageMove + '%';

  console.log('xDir = ',xDir , 'imageMove = ',imageMove , 'pause = ',pause, 'MinWidth = ' , MinWidth , "MaxWidth = " , MaxWidth);

  if (imageMove % 100 === 0 && pause === 1) 
  {
    clearInterval(int);
    console.log('Interval Cleared')
    delay();
  }
}

start();

