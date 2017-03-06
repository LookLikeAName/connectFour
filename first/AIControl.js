//console.log('ai');

function connectFour(){
	//console.log('connectFour');
	this.board=new Array();
	for(i=0;i<9;i++){
			this.board[i]=new Array();
			for(j=0;j<9;j++){
				this.board[i][j]='*';
			}
	}
   
};



connectFour.prototype.getBoard=function(){
		return this.board;
};

connectFour.prototype.getAvailableMove=function(){
		var availableMoves=new Array();
		  for(i=0;i<9;i++){
			  if(this.board[i][8]=='*'){
				  availableMoves.push([i,8]);
			  }
			  
		  }
		  for(i=0;i<9;i++){
			for(j=0;j<8;j++){
			  if(this.board[i][j]=='*'&&this.board[i][j+1]!='*'){
				  availableMoves.push([i,j]);
			  }
			}  
		  }
	return availableMoves;	
};

connectFour.prototype.playerMove=function(inX,inY){
	//console.log('player move');
	    var moves=new Array();
		var x=-1;
		var y=-1;
		for(i=0;i<9;i++){
			
			if(this.board[inX][i]=='*'){
				x=inX;
				y=i;
			}
		}
		//console.log('player move0');
		if(x==-1&&y==-1){
			//console.log('player move1');
			return moves;
		}
		else
		{
			this.board[x][y]='Y';
			moves.push(x,y);
			return moves;
		}
		
};

connectFour.prototype.aiMove=function(input){
	temp=this.notNow();
	
	//console.log('aimove');
	var temp;
 
	
	
	if(temp.length==0){
		var bestMove = alphaBeta(this,input,0);
		this.board[bestMove[0]][bestMove[1]] = 'R';
		console.log("("+bestMove[0]+","+bestMove[1]+") "+bestMove[2]);
		if(bestMove[2]==4){
			bestMove = alphaBeta(this,input,4);
			console.log("("+bestMove[0]+","+bestMove[1]+") "+bestMove[2]);
		}
		return bestMove;
		 
	}
	else
	{	
		return temp;
	}
  
};

connectFour.prototype.isTerminal = function() {
	var noSpaces = true;
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if(this.board[i][j] == '*') {
				noSpaces = false;
			}
		}
	}
	
	return noSpaces || this.getScore() == 4 || this.getScore() == -4;
};

connectFour.prototype.getScore = function() {
	var lines = new Array()
	var board = this.board;
	
	lines.push([board[0][5],board[1][6],board[2][7],board[3][8]]);
	lines.push([board[3][0],board[2][1],board[1][2],board[0][3]]);
	lines.push([board[5][0],board[6][1],board[7][2],board[8][3]]);
	lines.push([board[8][5],board[7][6],board[6][7],board[5][8]]); //4
	for(i=0;i<5;i++){
		for(j=0;j<9;j++){
			lines.push([board[i][j],board[i+1][j],board[i+2][j],board[i+3][j],board[i+4][j]]);
		}
	}   //49 橫
    for(i=0;i<9;i++){
		for(j=0;j<5;j++){
			lines.push([board[i][j],board[i][j+1],board[i][j+2],board[i][j+3],board[i][j+4]]);
		}
	} //94 直
	for(i=0;i<5;i++){
		for(j=0;j<5;j++){
			lines.push([board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3],board[i+4][j+4]]);
		}
	}//119 右斜
	for(i=4;i<9;i++){
		for(j=0;j<5;j++){
			lines.push([board[i][j],board[i-1][j+1],board[i-2][j+2],board[i-3][j+3],board[i-4][j+4]]);
		}
	}//144	左斜
	var fourFlag=0;
	for(i=0;i<4;i++){
			if(lines[i][0] == lines[i][1] && lines[i][1] == lines[i][2] && lines[i][2] == lines[i][3]){
				if(lines[i][0]=='Y'){
					fourFlag =4;
				}
				else if(lines[i][0]=='R')
				{
				 fourFlag =-4;
				}
			}
	}
    
	for (i = 4; i < 144; i++) {
		if (lines[i][4] == lines[i][3] && lines[i][3] == lines[i][2] && lines[i][2] == lines[i][1]&& lines[i][4] == 'Y') {
				if(lines[i][0] == 'Y'){
					//console.log("逆向 Y 5"+i);
					return -4;
					//fourFlag =-4;
				}
				else
				{
					//console.log("逆向 Y"+i);
					//return 4;
					fourFlag =4;					
				}
		}	
		if (lines[i][4] == lines[i][3] && lines[i][3] == lines[i][2] && lines[i][2] == lines[i][1]&& lines[i][4] == 'R') {
				if(lines[i][0] == 'R'){
					//console.log("逆向 R 5"+i);
					return 4;
					//fourFlag =4;					
				}
				else
				{
					//console.log("逆向 R "+i + lines[i]);
					//return -4;		
					fourFlag =-4;
				}
		}
		if (lines[i][0] == lines[i][1] && lines[i][1] == lines[i][2] && lines[i][2] == lines[i][3]&& lines[i][0] == 'Y') {
				if(lines[i][4] == 'Y'){
					//console.log("順向 Y 5"+i);
					return -4;
					//fourFlag =-4;
				}
				else
				{
					//console.log("順向 Y "+i);
					//return 4;	
					fourFlag =4;										
				}
		}	
		if (lines[i][0] == lines[i][1] && lines[i][1] == lines[i][2] && lines[i][2] == lines[i][3]&& lines[i][0] == 'R') {
				if(lines[i][4] == 'R'){
					//console.log("順向 R 5"+i);
					return 4;
					//fourFlag =4;					
				}
				else
				{
					//console.log("順向 R "+i);
					//return -4;
					fourFlag =-4;					
				}
		}
	}
     if(fourFlag==4||fourFlag==-4){
		 return fourFlag;
	 }
		
	   
		////   3
		     var sum=0;
			for(i=0;i<lines.length;i++){
			if(lines[i][1] == lines[i][2] && lines[i][2] == lines[i][3] ){
				if(lines[i][1]=='Y'){
					if(lines[i][0]=='R'||lines[i][4]=='R'){
						//return 2;
						if(lines[i][4]=='R'&&lines[i][0]=='R'){													
							sum+=1.9;
						}
						else
						{
							if(i>=118){
								sum+=2.5;
							}
							else
							{
							sum+=2;
							}
						}
					}
					else
					{
						if(i>=118){
							sum+=3.5;
						}
						else
						{
							sum+=3;
						}
						//return 3;
					}
					if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum+=3.9;
					}
				}
				else if(lines[i][1]=='R')
				{
					if(lines[i][0]=='Y'||lines[i][4]=='Y'){
						if(lines[i][4]=='Y'&&lines[i][0]=='Y'){													
							sum-=1.9;
						}
						else
						{
							if(i>=118){
								sum-=2.5;
							}
							else
							{
							sum-=2;
							}
						}
					}
					else
					{
						//return -3;
						if(i>=118){
							sum-=3.5;
						}
						else
						{
						sum-=3;
						}
					}
					if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum-=3.9;
					}
				}
			}
			if(lines[i][2] == lines[i][3] && lines[i][3] == lines[i][4] ){
				if(lines[i][2]=='Y'){
					if(lines[i][1]=='R'){
						//return 2;
						
						if(i>=118){
							sum+=2.5;
						}
						else
						{
						sum+=2;
						}
					}
					else
					{
						if(i>=118){
							sum+=3.5;
						}
						else
						{
							sum+=3;
						}
						//return 3;
					}
					if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum+=3.9;
					}
				}
				else if(lines[i][2]=='R')
				{
					if(lines[i][1]=='Y'){
						//return -2;
						if(i>=118){
							sum-=2.5;
						}
						else
						{
						sum-=2;
						}
					}
					else
					{
						//return -3;
						if(i>=118){
							sum-=3.5;
						}
						else
						{
						sum-=3;
						}
					}
					if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum-=3.9;
					}
				}
			}
			if(lines[i][0] == lines[i][1] && lines[i][1] == lines[i][2] ){
				if(lines[i][1]=='Y'){
					if(lines[i][3]=='R'){
						if(i>=118){
							sum+=2.5;
						}
						else
						{
						sum+=2;
						}
						//return 2;
					}
					else
					{
						if(i>=118){
							sum+=3.5;
						}
						else
						{
						sum+=3;
						}
						//return 3;
					}
					if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum+=3.9;
					}
				}
				else if(lines[i][1]=='R')
				{
					if(lines[i][3]=='Y'){
						if(i>=118){
							sum-=2.5;
						}
						else
						{
						sum-=2;
						}
						//return -2;
					}
					else
					{
						if(i>=118){
							sum-=3.5;
						}
						else
						{
						sum-=3;
						}
						if(lines[i][0]=='*'&&lines[i][4]=='*')
					{
						sum-=3.9;
					}
						//return -3;
					}
				}
			}
			}
			
	
	 //////  2	
	for (i = 0; i < lines.length; i++) {
		for(j=0;j<4;j++){
		if (lines[i][j] == lines[i][j+1] ) {
				if(lines[i][j] == 'Y'){
					if(j+2<=4&& lines[i][j+2]=='R'){
						sum+=0.5;
						//return 0.9;
					}
					if(j-2>=0&& lines[i][j-2]=='R'){
						sum+=0.5;
						//return 0.9;
					}
					if(j+2<=4&&j-1>=0&& lines[i][j-1]=='*'&&lines[i][j+2]=='*'){
						sum+=1;
						
					}
						sum+=1.5;
						//return 1;
				}
				else if(lines[i][j] == 'R')
				{
					if(j+2<=4&& lines[i][j+2]=='Y'){
						sum-=0.5;
						//return -0.9;
					}
					if(j-2>=0&& lines[i][j-2]=='Y'){
						sum-=0.5;
						//return -0.9;
					}
					if(j+2<=4&&j-1>=0&& lines[i][j-1]=='*'&&lines[i][j+2]=='*'){
						sum-=1;
						
					}
					sum-=1.5;
					//return -1;		
				}
				
		}
		}
	}
				//console.log(sum+" "+sum/100);
	            return sum/100;
	return 0;
};
connectFour.prototype.notNow=function(){
	var board=this.board;
	var moves=this.getAvailableMove();
	//console.log("one more time "+moves.length+" "+moves);
	var winFlag=false;
	var fiveFlag=false;
	for(i=0;i<moves.length;i++){
		x=moves[i][0];
		y=moves[i][1];
		var thisX;
		var thisY;
		
		var thisMove=new Array();
		if(x-3>=0){
			if(board[x-1][y]==board[x-2][y]&&board[x-2][y]==board[x-3][y]&&board[x-1][y]!='*')
			{
				if(x+1>8){
					if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x-1][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("left 3");
					}
				}
				else if(board[x+1][y]!=board[x-1][y])
				{
				
					if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x-1][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("left 3");
			     	}
			
				}
			}
		}
		if(x+3<=8){
			if(board[x+1][y]==board[x+2][y]&&board[x+2][y]==board[x+3][y]&&board[x+1][y]!='*')
			{
			 if(x-1<0){
					if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x+1][y]=='R') winFlag=true;
						console.log("right 3");
					}
				}
				else if(board[x+1][y]!=board[x-1][y])
				{
				
					if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x+1][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("right 3");
			     	}
			
				}
			}
		}
		if(x-1>=0&&x+2<=8)
		{
			if(board[x-1][y]==board[x+1][y]&&board[x+1][y]==board[x+2][y]&&board[x-1][y]!='*')
			{
				if(x<2||x>5){
					if(winFlag==false&&fiveFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-1][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("left middle");
					
				}
				}
				else if(board[x-2][y]!=board[x-1][y]&&board[x+3][y]!=board[x-1][y])
				{
					if(winFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-1][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("left middle");
					}
					
				}
				else
				{
					fiveFlag=true;
				}

			}
		}
		if(x+1<=8&&x-2>=0)
		{
			if(board[x-2][y]==board[x-1][y]&&board[x-1][y]==board[x+1][y]&&board[x-2][y]!='*')
			{
				if(x<3||x>6)
				{
					if(winFlag==false&&fiveFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-2][y]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						 console.log("right middle0");
					}
				}
				else if(board[x-3][y]!=board[x-2][y]&&board[x+2][y]!=board[x-2][y])
				{
					if(winFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-2][y]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
						 console.log("right middle1");
					}
				}
				else
				{
					fiveFlag=true;
				}
			}
		}
		if(y+3<=8){
			if(board[x][y+1]==board[x][y+2]&&board[x][y+2]==board[x][y+3]&&board[x][y+1]!='*')
			{
			if(winFlag==false){
			 thisX=x;
			 thisY=y;
			 if(board[x][y+1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
			console.log("down 3");
			}
			}
		}
		//////strate
		
		if(x-3>=0&&y-3>=0){
			if(board[x-1][y-1]==board[x-2][y-2]&&board[x-2][y-2]==board[x-3][y-3]&&board[x-1][y-1]!='*')
			{
				if(x>7||y>7){
					if(winFlag==false){
					thisX=x;
					thisY=y;
					if(board[x-1][y-1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↖ 3");
					}	
				}
				else if(board[x+1][y+1]!=board[x-1][y-1])
				{
					if(winFlag==false){
					thisX=x;
					thisY=y;
					if(board[x-1][y-1]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↖ 3");
					}	
				}
			
			}
		}
		if(x+3<=8&&y+3<=8){
			if(board[x+1][y+1]==board[x+2][y+2]&&board[x+2][y+2]==board[x+3][y+3]&&board[x+1][y+1]!='*')
			{
				if(x<1||y<1){
					if(winFlag==false){
					thisX=x;
					thisY=y;
					if(board[x+1][y+1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↘ 3");
					}
				}
			 else if(board[x+1][y+1]!=board[x-1][y-1])
			 {
				if(winFlag==false){
					thisX=x;
					thisY=y;
					if(board[x+1][y+1]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↘ 3");
				} 
			 }
			}
		}
		if(x-1>=0&&x+2<=8&&y-1>=0&&y+2<=8)
		{
			if(board[x-1][y-1]==board[x+1][y+1]&&board[x+1][y+1]==board[x+2][y+2]&&board[x-1][y-1]!='*')
			{
				if(x>5||y>5)
				{
					if(winFlag==false&&fiveFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-1][y-1]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↘ middle");
					}
				}
				else if(board[x+3][y+3]!=board[x-1][y-1])
				{
					if(winFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-1][y-1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↘ middle");
					}
				}
				else
				{
					fiveFlag=true;
				}				
			}
		}
		if(x+1<=8&&x-2>=0&&y-2>=0&&y+1<=8)
		{
			if(board[x-2][y-2]==board[x-1][y-1]&&board[x-1][y-1]==board[x+1][y+1]&&board[x-2][y-2]!='*')
			{
				if(x<3||y<3)
				{
					if(winFlag==false&&fiveFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-2][y-2]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↖ middle");
					}
				}
				else if(board[x-3][y-3]!=board[x-2][y-2])
				{
					if(winFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-2][y-2]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↖ middle");
					}
				}
				else
				{
					fiveFlag=true;
				}
			}
		}
		////////
		if(x-3>=0&&y+3<=8){
			if(board[x-1][y+1]==board[x-2][y+2]&&board[x-2][y+2]==board[x-3][y+3]&&board[x-1][y+1]!='*')
			{
				if(x>7||y<1){
					if(winFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-1][y+1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					 console.log("↙ 3");
					}
				}
				else if(board[x+1][y-1]!=board[x-1][y+1])
				{
					if(winFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-1][y+1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
					 console.log("↙ 3");
					}
				}
			}
		}
		if(x+3<=8&&y-3>=0){
			if(board[x+1][y-1]==board[x+2][y-2]&&board[x+2][y-2]==board[x+3][y-3]&&board[x+1][y-1]!='*')
			{
				if(x<1||y>7)
				{
					 if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x+1][y-1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↗ 3");
					 }
				}
				else if(board[x+1][y-1]!=board[x-1][y+1])
				{
					if(winFlag==false){
						thisX=x;
						thisY=y;
						if(board[x+1][y-1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↗ 3");
					 }
				}
			}
		}
		if(x-1>=0&&x+2<=8&&y+1<=8&&y-2>=0)
		{
			if(board[x-1][y+1]==board[x+1][y-1]&&board[x+1][y-1]==board[x+2][y-2]&&board[x-1][y+1]!='*')
			{
				if(x>5||y<3)
				{
					if(winFlag==false&&fiveFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-1][y+1]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↗ middle0");
					}
				}
				else if(board[x+3][y-3]!=board[x-1][y+1])///////////////////// OK x=2  - x= 5 y=3 y=7
				{
					if(winFlag==false){
						 thisX=x;
						 thisY=y;
						 if(board[x-1][y+1]=='R'){
						fiveFlag=false;	
						winFlag=true;
						}
						console.log("↗ middle1");
					}
				}
				else
				{
					fiveFlag=true;
				}				
			}
		}
		if(x+1<=8&&x-2>=0&&y+2<=8&&y-1>=0)
		{
			if(board[x-2][y+2]==board[x-1][y+1]&&board[x-1][y+1]==board[x+1][y-1]&&board[x-2][y+2]!='*')
			{
				if(x<3||y>5)
				{
					if(winFlag==false&&fiveFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-2][y+2]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↙ middle");
					}
				}
				else if(board[x-3][y+3]!=board[x-2][y+2])
				{
					if(winFlag==false){
					 thisX=x;
					 thisY=y;
					 if(board[x-2][y+2]=='R') {
						fiveFlag=false;	
						winFlag=true;
						}
					console.log("↙ middle");
					}
				}
				else
				{
					fiveFlag=true;
				}				
			}
		}
		
		
	}
	if(thisX!=undefined&&fiveFlag!=true){
			console.log("("+thisX+","+thisY+")");
			thisMove.push(thisX,thisY);
			board[thisX][thisY]='R';
			
		}
	return thisMove;
};
connectFour.prototype.getNext = function(move,player) {
	if (player == "max") {
		player = 'Y';
	} else {
		player = 'R';
	}

	var nextState = new connectFour();
	nextState.board = copyBoard(this.board);
	nextState.board[move[0]][move[1]] = player;
  
	return nextState;
};


function copyBoard(board) {
	var newBoard = Array();
	for (var i = 0; i < board.length; i++) {
		newBoard[i] = board[i].slice(0);
	}
	return newBoard;
};

function alphaBeta(state,count,addition) {
    //console.log('AB');
    var newCount=new Array();
	
	if(count<25){
		newCount[0]=5+addition;	//////////////////////////////////////////////////////////////////////////////////
	}
	else if(count<=50)
	{
		newCount[0]=6+addition;
	}
	else if(count<=65)
	{
		newCount[0]=7+addition;
	}
	else
	{
		newCount[0]=9+addition;
	}
	return minValue(state,-100000,100000,true,newCount[0]);

};

function maxValue(state,alpha,beta,isFirst,countDown) {

	var isFirst = isFirst || false;
     //console.log('max'+countDown);	
	if (state.isTerminal()||countDown==0) {
		//console.log("bound max");
		return state.getScore();
	}

	var v = -100000;
	var moves = state.getAvailableMove();
    var	min;
    var	bestMove = moves[0];
    var newCount=new Array();
	//debugger;
	newCount[0]=countDown-1;
	for (var i = 0; i < moves.length; i++) {
		min = minValue(state.getNext(moves[i],"max"),alpha,beta,false,newCount[0]);
		if (min > v) v = min, bestMove = moves[i];
		
		if (v >= beta) {
			if (isFirst) return moves[i];
			delete state;
			return v;
		}
		if (v > alpha) alpha = v;
	}

	if (isFirst) {
		
		bestMove.push(v);
		return bestMove;
	} else {
		delete state;
		return v;
	}

};

function minValue(state,alpha,beta,isFirst,countDown) {
      
	var isFirst = isFirst || false;
     //console.log('min'+countDown);	
	if (state.isTerminal()||countDown==0) {
		//console.log("bound max");
		return state.getScore();
	}
     
	var v = 100000;
	var moves = state.getAvailableMove();
    var	max;
    var	bestMove = moves[0];
     var newCount=new Array();
	newCount[0]=countDown-1;
	for (var i = 0; i < moves.length; i++) {
		
		max = maxValue(state.getNext(moves[i],"min"),alpha,beta,false,newCount[0]);
	
		if (max < v)v = max, bestMove = moves[i];
		 
		if (v <= alpha) {
			if (isFirst) return moves[i];
			delete state;
			return v;
		}
		if (v < beta) beta = v;
	}

	if (isFirst) {
		
		bestMove.push(v);
		return bestMove;
	} else {
		delete state;
		return v;
	}

};