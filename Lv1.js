//settings 
var currentX = 2;//18;//10;//2; 
var currentY = 2;//26;//26;//2; 
var height = 29; 
var width = 50; 
var interval = 100; 
 
//game variables 
var length = 0; 
var lastX = [currentX]; 
var lastY = [currentY]; 
var running = false; 
var gameOver = false; 
var direction = -2; // up = 0, down = -1, left = 1, right = 2 
var int; 
var score = 573; 
//temporary direction (this fixes users pressing keys too quickly and turning into themselves) 
var tempdir = direction; 
var starTime;
 

function run(){ 
	starTime = performance.now();
    init(); 
    int = setInterval(gameLoop, interval); 
} 
 
function init(){ 
    createMap(); 
    createPlayer(); 
    checkFinish();
}

//Generates the map for the Player 
function createMap(){ 
    document.write("<table>"); 
 
    for( var y = 0; y < height; y++){ 
        document.write("<tr>"); 
        for( var x = 0; x < width; x++){ 
            if(x == 0 || x == width -1 || y == 0 || y == height - 1){ 
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
            } 
			else{ 
				/// here
				if(y==12 && (x==5 || x==7)){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else ///here
				if(x==47 && y==2){
					document.write("<td class='finish' id='"+ x + "-" + y +"'></td>"); 
				}
				else /// here
				if(y==12 && x==6){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else /// here
				if(y==12 && ( x==9 || x==11 )){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else /// here
				if( x==4 && y==3 ){
					document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
				}
				else /// here
				if( x==8 && y==26 ){
					document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
				}
				else /// here
				if(x==16 && (y>=1 && y<=3)){
					document.write("<td class='blank' id='"+ x + "-" + y +"'></td>"); 
				}
				else
				if((x==4 || x==12 || x==20) && (y>=1 && y<=24)){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else
				if((x==8 || x==16 || x==24) && (y>=4 && y<=27) ){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else
				if((y==4 || y==12 || y==20) && (x>=25 && x<=45)){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else
				if((y==8 || y==16 || y==24) && (x>=28 && x<=48)){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
				}
				else{
					document.write("<td class='blank' id='"+ x + "-" + y +"'></td>"); 
				}
            }
			
        } 
        document.write("</tr>"); 
    } 
    document.write("</table>"); 
	
} 
 
function testCanMoveHere(X,Y){
	if(X == 0 || X == width-1 || Y == 0 || Y == height-1) 
        return false;
	
	if(X==47 && Y==2)
		return false;
	
	if(X==46 && Y==24)
		return true;
	
	if(X==45 && (Y==25 || Y==26))
		return false;
	
	if(X==48 && ( Y==8 || Y==16))
		return true;
	
	if((X==46 || X==47) && Y==4)
		return false;
	
	if(X==16 && (Y>=1 && Y<=3))
		return false;
	
	if(X==24 && (Y>=15 && Y<=17))
		return true;
	
	if(X==24 && (Y==1 || Y==3))
		return false;
	
	if(X==24 && Y==25)
		return true;
	
	if(X==16 && Y==26)
		return true;

	if(X==4 && Y==3)
		return true;
	
	if(X==8 && Y==26)
		return true;
	
	if(Y==12 && (X==5 || X==7 || (X>=9 && X<=11))){
		return false;
	}
	
	if(X==4 && (Y>=1 && Y<=24)){
		return false;		
	}
	if(X==12 && (Y>=1 && Y<=24)){
		return false;		
	}
	if(X==20 && (Y>=1 && Y<=24)){
		return false;		
	}
	
	if(X==8 && (Y>=4 && Y<=27)){
		return false;
	}
	if(X==16 && (Y>=4 && Y<=27)){
		return false;
	}
	if(X==24 && (Y>=4 && Y<=27)){
		return false;
	}
	
	if((X>=25 && X<=45) && Y==4){
		return false;
	}
	if((X>=25 && X<=45) && Y==12){
		return false;
	}
	if((X>=25 && X<=45) && Y==20){
		return false;
	}
	
	if((X>=28 && X<=48) && Y==8){
		return false;
	}
	if((X>=28 && X<=48) && Y==16){
		return false;
	}
	if((X>=28 && X<=48) && Y==24){
		return false;
	}
	
	return true;
}
 
function createPlayer(){ 
    set(currentX, currentY, "current"); 
} 
 
function get(x,y){ 
    return document.getElementById(x+"-"+y); 
} 
 
function set(x,y,value){ 
    if(x != null && y != null) 
        get(x,y).setAttribute("class", value); 
} 

function getType(x,y){ 
    return get(x,y).getAttribute("class"); 
} 

function checkFinish(){ 
    var found = false; 
    while(!found){
      
	    var finishX =  47;
	    var finishY =  26;
        if(getType(finishX, finishY) == "blank") 
            found = true; 
    } 
    set(finishX, finishY, "finish"); 
	
}

window.addEventListener("keypress", function key(event){ 
   
    var key = event.keyCode; 
	/// W/w -> Up
	if(key == 119 || key == 87)
		tempdir = 0; 
    /// if S/s -> Down
    else
	if(key == 115 || key == 83)
		tempdir = -1; 
	/// A/a -> Left
    else
		if(key == 97 || key == 65)
			tempdir = 1; 
    /// D/d -> Right
	else
		if(key == 100 || key == 68)
			tempdir = 2; 
	else 
		tempdir=-2;
	
    running = true; 
}); 
 
function gameLoop(){
    if(running && !gameOver){ 
        update(); 
    }
	else 
		if(gameOver){ 
			clearInterval(int); 
		} 
} 

function update(){
	
	if((currentX>=9 && currentX<=11) && (currentY==10 || currentY==11 || currentY==13 || currentY==14)){
		set(10,12,"wall");
	}
	
	if((currentX>=21 && currentX<=23) && (currentY==18 || currentY==19) ){
		set(24,17,"blank");
		set(24,16,"blank");
		set(24,15,"blank");
		set(24,1,"wall");
		set(24,3,"wall");
	}
	
	if((currentX>=5 && currentX<=7) && (currentY==10 || currentY==11 || currentY==13 || currentY==14)){
		set(6,12,"blank");
	}
	
	if((currentX>=45 && currentX<=49) && (currentY==1 || currentY==2 || currentY==3)){
		set(47,2,"wall");
	}
	
	if((currentX>=11 && currentX<=17) && (currentY==5)){
		set(16,3,"wall");
	}
	if((currentX>=11 && currentX<=17) && (currentY==4)){
		set(16,2,"wall");
	}
	if((currentX>=11 && currentX<=17) && (currentY==3)){
		set(16,1,"wall");
		set(16,26,"blank");
	}
	
	if(currentX==48 && (currentY>=7 && currentY<=8)){
		set(46,4,"wall");
		set(47,4,"wall");
		set(48,4,"wall");
	}
	
	if(currentX==44 && ((currentY>=5 && currentY<=7) ||(currentY>=1 && currentY<=3))){
		set(46,4,"wall");
	}
	
	if(currentX==45 && ((currentY>=5 && currentY<=7) ||(currentY>=1 && currentY<=3))){
		set(47,4,"wall");
	}
	
	if(currentX==46 && ((currentY>=5 && currentY<=7) ||(currentY>=1 && currentY<=3))){
		set(48,4,"wall");
	}
	
	if((currentX==43 || currentX==46) && (currentY>=24 && currentY<=27)){
		set(45,25,"wall");
		set(45,26,"wall");
		set(45,27,"wall");
		set(46,24,"blank");
	}
	
    direction = tempdir; 
    updatePlayer(); 
    //sets the previous square as blank
    set(lastX[length], lastY[length], "blank"); 
	
    //updates the current position
    if(direction == 0) {
		//Up
		currentYcopy = currentY;
		currentYcopy-=1;
		if(testCanMoveHere(currentX,currentYcopy)==true)
			currentY--; 
		running = false; 
	}
    else if(direction == -1) {
		//Down
		currentYcopy = currentY;
		currentYcopy+=1;
		if(testCanMoveHere(currentX,currentYcopy)==true)
			currentY++; 
		running = false; 
	}
    else if(direction == 1) {
		//Left
		currentXcopy = currentX;
		currentXcopy-=1;
		if(testCanMoveHere(currentXcopy,currentY)==true)
			currentX--; 
		running = false; 
	}
    else if(direction == 2) {
		//Right
		currentXcopy = currentX;
		currentXcopy+=1;
		if(testCanMoveHere(currentXcopy,currentY)==true)
			currentX++; 
		running = false; 
	}
    //update the current block
    set(currentX, currentY, "current"); 
    
    if((currentX == 47 && currentY == 26 ))
        gameOver = true;
	
	if(score>0 && direction>=-1 && direction<=2)
		score-=1;
        
    //set 
    document.getElementById("score").innerHTML = "Score: " + score; 
	
	document.getElementById("position").innerHTML = "Position: X = " + currentX + " | Y = " + currentY; 
} 
 
function updatePlayer(){ 
    for(var i = length; i > 0; i--){ 
        lastX[i] = lastX[i-1]; 
        lastY[i] = lastY[i-1]; 
    } 
    lastX[0] = currentX; 
    lastY[0] = currentY; 
} 
 
run();