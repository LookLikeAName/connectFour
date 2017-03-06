var yellowImg=new Image();
yellowImg.src='yellow.jpg';
var redImg=new Image();
redImg.src='red.jpg';
var currentX=0;
var currentY=0;
var cxt;
var targetX;
var targetY;
var yellowInterval;
var redInterval;
function displayBoard(board,canvas,moves) {
	
	targetX=moves[0];
	targetY=moves[1];
	cxt=canvas.getContext('2d');
	for(i=0;i<9;i++){
		for(j=0;j<9;j++){
			  if(i!=targetX ||j!=targetY){
				
				switch(board[i][j]){
				  case '*':
				  break;
				  case 'Y':
					drawYelllow(i,j,cxt);
				  break;
				  case 'R':
					drawRed(i,j,cxt);
				  break;
				  default:
				  break; 
			  }
			  }
		}
	}
	if(board[targetX][targetY]=='Y')
	{
		 yellowInterval=setInterval(animatedYelllow,10);
		//console.log("finsh");
		
	}
	else if(board[targetX][targetY]=='R')
	{
		redInterval=setInterval(animatedRed,10);
	} 
}

function drawYelllow(inX,inY,canvas){
	//console.log("yellow");
	var x=inX*75+18;
	var y=inY*70;
	canvas.drawImage(yellowImg,x,y,70,70);
}

function drawRed(inX,inY,canvas){
	//console.log("red");
	var x=inX*75+18;
	var y=inY*70;	
	canvas.drawImage(redImg,x,y,70,70);
	
}

function animatedYelllow(){
	cxt.clearRect(targetX*75+18,currentY-14,70,70);
	cxt.drawImage(yellowImg,targetX*75+18,currentY,70,70);
	if(targetY*70<=currentY){
		currentX=0;
		currentY=0;
		//console.log("goal");
		clearInterval(yellowInterval);
		return;
	}
	else
	{
		currentY+=14;
		 
	}
}

function animatedRed(){
	cxt.clearRect(targetX*75+18,currentY-14,70,70);
	cxt.drawImage(redImg,targetX*75+18,currentY,70,70);
	if(targetY*70<=currentY){
		currentX=0;
		currentY=0;
		//console.log("goal");
		clearInterval(redInterval);
		return;
	}
	else
	{
		currentY+=14;
		
	}
}