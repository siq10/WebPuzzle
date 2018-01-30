//settings 
// Player's possition
var currentX = 2;//18;//10;//2; 
var currentY = 2;//26;//26;//2; 

// Table Dimension
var height = 29; 
var width = 50; 
// at 0.1s, there must be an update
var interval = 100; 
 
//game variables 
var running = false; 
var gameOver = false; 


var score = 573; 
var direction=-2;
//temporary direction (this fixes users pressing keys too quickly and turning into themselves) 
var tempdir = direction; 

 
//var usrname = document.getElementById("usrname").value;

function ajax_post(bestScore){
    console.log(bestScore);
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
	
    // Create some variables we need to send to our PHP file
    var url = "writeToDataBase.php";

    var vars = "score="+bestScore+"&map="+1;
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    var return_data = hr.responseText;
			document.getElementById("status").innerHTML = return_data;
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    document.getElementById("status").innerHTML = "processing...";

}

function run(){ 
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
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
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
    /// S/s -> Down
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
			leave();
		} 
} 

function update(){
	
	
	
	if((currentX>=9 && currentX<=11) && (currentY==10 || currentY==11 || currentY==13 || currentY==14)){
		set(10,12,"wall");
		set(6,12,"blank");
		set(8,26,"blank");
	}
	
	if((currentX>=21 && currentX<=23) && (currentY==18 || currentY==19) ){
		set(24,17,"blank");
		set(24,16,"blank");
		set(24,15,"blank");
		set(24,1,"wall");
		set(24,3,"wall");
		
		set(25,17,"wall");
		set(26,17,"wall");
		set(27,17,"wall");
	}
	
	if((currentX>=5 && currentX<=7) && (currentY==10 || currentY==11 || currentY==13 || currentY==14)){
		set(6,12,"blank");
	}
	
	if((currentX>=45 && currentX<=49) && (currentY==1 || currentY==2 || currentY==3)){
		set(47,2,"wall");
		
		set(25,17,"blank");
		set(26,17,"blank");
		set(27,17,"blank");
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
	
    //updates the current position
    if(direction == 0) {
		//Up
		currentYcopy = currentY;
		currentYcopy-=1;
		if(testCanMoveHere(currentX,currentYcopy)==true){
			set(currentX,currentY,"blank");
			currentY--; 
		}
		
		running = false; 
	}
    else if(direction == -1) {
		//Down
		currentYcopy = currentY;
		currentYcopy+=1;
		if(testCanMoveHere(currentX,currentYcopy)==true){
			set(currentX,currentY,"blank");
			currentY++; 
		}
		running = false; 
	}
    else if(direction == 1) {
		//Left
		currentXcopy = currentX;
		currentXcopy-=1;
		if(testCanMoveHere(currentXcopy,currentY)==true){
			set(currentX,currentY,"blank");
			currentX--; 
		}
		running = false; 
	}
    else if(direction == 2) {
		//Right
		currentXcopy = currentX;
		currentXcopy+=1;
		if(testCanMoveHere(currentXcopy,currentY)==true){
			set(currentX,currentY,"blank");
			currentX++; 
		}
		running = false; 
	}
    //update the current block
    set(currentX, currentY, "current"); 
    
    if((currentX == 47 && currentY == 26 )){
        gameOver = true;
		//setTimeout("leave()", 3000);
	}
	
	if(score>0 && direction>=-1 && direction<=2)
		score-=1;
        
    //set 
    document.getElementById("score").innerHTML = "Score: " + score; 
	
	//document.getElementById("position").innerHTML = "Position: X = " + currentX + " | Y = " + currentY; 
	
} 


function leave() {
	ajax_post(score);
	setTimeout(function() {
		  window.location.href ='http://localhost/WebPuzzle/authenticated/menu.php'
		}
		,3000)
}

run();