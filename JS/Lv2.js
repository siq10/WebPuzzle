//settings 
var currentX1 = 2;
var currentY1 = 2;

var initialstage=0;
var canfinish=0;

var canpass=0;
var gotkey1=0;
var gotkey2=0;

var height = 29;
var width = 50;
var interval = 100;

var currentX2 =2;//8;// 2;
var currentY2 =26;//2;// 26;
 
//game variables 
var length = 0; 
var lastX1 = [currentX1]; 
var lastY1 = [currentY1]; 
var lastX2 = [currentX2]; 
var lastY2 = [currentY2]; 
var running = false; 
var gameOver = false; 
var direction = -2; // up = 0, down = -1, left = 1, right = 2 
var int; 
var score = 681; 
//temporary direction (this fixes users pressing keys too quickly and turning into themselves) 
var tempdir = direction; 
var starTime;

function ajax_post(bestScore){
    console.log(bestScore);
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
	
    // Create some variables we need to send to our PHP file
    var url = "writeToDataBase.php";

    var vars = "score="+bestScore+"&map="+2;
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
	starTime = performance.now();
    init(); 
    int = setInterval(gameLoop, interval); 
} 
 
function init(){ 
    createMap(); 
    createPlayer1(); 
	createPlayer2();
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
				if(x==12 && y==2){
					document.write("<td class='unlock' id='"+ x + "-" + y +"'></td>"); 
				}
				else
				if((x>=1 && x<=14) && y==4){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
				}
				else
				if((y>=1 && y<=3) && x==14){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
				}
				else
				if((x>=1 && x<=3) && y==24){
					document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
				}
				else
				if(x==4 && (y ==24 || y==25 || y==26 || y==27)){
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
 
function testCanMoveHere(x,y){
	if(x == 0 || x == width-1 || y == 0 || y == height-1) 
        return false;
	
	/*if(x==11 && y==4 && (tempdir>=3 && tempdir<=6))
		return true;*/
	
	
	if(initialstage==1){
		
		
		if(x==30 && y==2 && tempdir>=-1 && tempdir<=2)
			if(gotkey1==0)
				return true;
			else
				if(currentX2==32 && currentY2==17 && gotkey2==1)
					return true;
				else
					return false;
		
		if(x==30 && y==2 && tempdir>=-1 && tempdir<=2)
			return true;
		
		
		if(x==32 && y==11 && tempdir>=3 && tempdir<=6 && gotkey1==1)
			return true;
		
		if(x==47 && y==11 && tempdir>=-1 && tempdir<=2 && currentX2==32 && currentY2==17)// && gotkey2==1)
			return true;
		
		if(x==30 && (y>=1 && y<=7))
			return false;
		
		if((x>=31 && x<=48) && y==11)
			return false;
		
		if((x>=31 && x<=34) && y==19)
			return false;
		
		if(x==34 && (y>=12 && y<=18))
			return false;
		
		if(x==45 && (y>=12 && y<=27))
			return false;
		
		
	}
	
	if(x==22 && y==14)
		return true;
	
	if((x>=1 && x<=17) && y==12)
		return false;
	
	if((x>=1 && x<=17) && y==16)
		return false;
	
	if((x>=18 && x<=21) && y==16)
		return false;
	
	if(x==18 && (y>=8 && y<=12))
		return false;
	
	if(x==18 && y==9)
		return false;
	
	if((x>=22 && x<=30) && y==19)
		return false;
	
	if(x==30 && (y>=9 && y<=18))
		return false;
	
	if((x>=18 && x<=30) && y==8)
		return false;
		
	if((x>=22 && x<=25) && y==12)
		return false;
		
	if(x==26 && (y>=12 && y<=15))
		return false;
	
	if(x==22 && (y>=13 && y<=19))
		return false;
		
		
	if((x>=1 && x<=14) && y==4)
		return false;
	
	if((y>=1 && y<=3) && x==14)
		return false;
	
	if((x>=1 && x<=3) && y==24)
		return false;
	
	if(x==4 && (y ==24 || y==25 || y==26 || y==27))
		return false;
	
	return true;
}
 
function createPlayer1(){ 
    set(currentX1, currentY1, "current"); 
} 
function createPlayer2(){ 
    set(currentX2, currentY2, "pl2"); 
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
	/// W/w -> Up  --- pl1
	if(key == 119 || key == 87)
		tempdir = 0; 
    /// S/s -> Down  --- pl1
    else
	if(key == 115 || key == 83)
		tempdir = -1; 
	/// A/a -> Left  --- pl1
    else
		if(key == 97 || key == 65)
			tempdir = 1; 
    /// D/d -> Right  --- pl1
	else
		if(key == 100 || key == 68)
			tempdir = 2; 
	/// I  -> Up  --- pl2
	else 
		if(key == 73 || key == 73+32)
			tempdir = 3; 
	/// J  -> Down  --- pl2
	else
		if(key == 75 || key == 75+32)
			tempdir = 4; 
	/// K  -> Left  --- pl2
	else
		if(key == 74 || key == 74+32)
			tempdir = 5; 
	/// L  -> Right  --- pl2
	else
		if(key == 76 || key == 76+32)
			tempdir = 6; 
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
			Leave();
		} 
} 

function update(){
	
	if(currentX1==16 && currentY1==2){
		gotkey1=1;
	}
	if(currentX2==32 && currentY2==17){
		gotkey2=1;
	}
	
	if(initialstage==1){
		canfinish=1;
		
		for(i=1;i<=7;i++)
			set(30,i,"wall");
		for(i=31;i<=48;i++)
			set(i,11,"wall");
		
		for(i=31;i<=34;i++)
			set(i,19,"wall");
		
		for(i=12;i<=18;i++)
			set(34,i,"wall");
		
		for(i=12;i<=27;i++)
			set(45,i,"wall");
		
		set(32,17,"key");
		
		set(30,2,"pink");
		
		set(32,11,"pink");
		
		set(47,11,"pink");
		
		set(47,26,"finish");
		
	}
	
	if((currentX1==12 && currentY1==2) ||(currentX2==12 && currentY2==2)){
		set(currentX2,currentY2,"blank");
		currentX2 = 1;
		currentY2 = 14;
		set(currentX2,currentY2,"pl2");
		
		set(currentX1,currentY1,"blank");
		currentX1 = 2;
		currentY1 = 26;
		set(currentX2,currentY2,"current");
		
		for(i=1;i<=17;i++){
			set(i,12,"wall");
			set(i,16,"wall");
		}
		
		for(i=18;i<=21;i++){
			set(i,16,"wall");
		}
		
		for(i=8;i<=12;i++){
			set(18,i,"wall");
		}
		
		set(18,9,"wall");
		
		for(i=22;i<=30;i++){
			set(i,19,"wall");
		}
		
		for(i=9;i<=18;i++){
			set(30,i,"wall");
		}
		
		for(i=18;i<=30;i++){
			set(i,8,"wall");
		}
		
		for(i=22;i<=25;i++){
			set(i,12,"wall");
		}
		
		for(i=12;i<=15;i++){
			set(26,i,"wall");
		}
		
		for(i=13;i<=19;i++){
			set(22,i,"wall");
		}
		
		set(24,14,"unlock");
		
	}
	
	if(currentX2 == 24 && currentY2 == 14){
		set(currentX2,currentY2,"blank");
		currentX2=currentX1;
		currentY2=currentY1;
		currentX1=currentX2+4;
		currentY1=currentY2;
		
	}
	
	if(initialstage==0 && ((currentX1==45 && (currentY1>=24 && currentY1<=27)) || ((currentX1>=46 && currentX1<=48) && currentY1==24))){
				
		set(47,26,"pink");
		
		set(currentX1,currentY1,"blank");
		
		set(currentX2,currentY2,"blank");
		
		set(16,2,"key");
		
		currentX1=32;
		currentY1=9;
		
		currentX2=32;
		currentY2=2;
		
		initialstage=1;
	}
	
	
    direction = tempdir;
    //sets the previous square as blank
    set(lastX1[length], lastY1[length], "blank"); 
	set(lastX2[length], lastY2[length], "blank"); 
	
    //updates the current position
    if(direction == 0) {
		//Up
		currentY1copy = currentY1;
		currentY1copy-=1;
		if(testCanMoveHere(currentX1,currentY1copy)==true)
			currentY1--; 
		running = false; 
	}
    else if(direction == -1) {
		//Down
		currentY1copy = currentY1;
		currentY1copy+=1;
		if(testCanMoveHere(currentX1,currentY1copy)==true)
			currentY1++; 
		running = false; 
	}
    else if(direction == 1) {
		//Left
		currentX1copy = currentX1;
		currentX1copy-=1;
		if(testCanMoveHere(currentX1copy,currentY1)==true)
			currentX1--; 
		running = false; 
	}
    else if(direction == 2) {
		//Right
		currentX1copy = currentX1;
		currentX1copy+=1;
		if(testCanMoveHere(currentX1copy,currentY1)==true)
			currentX1++; 
		running = false; 
	}
	else if(direction == 3) {
		//Down
		currentY2copy = currentY2;
		currentY2copy-=1;
		if(testCanMoveHere(currentX2,currentY2copy)==true)
			currentY2--; 
		running = false; 
	}
	else if(direction == 4) {
		//Down
		currentY2copy = currentY2;
		currentY2copy+=1;
		if(testCanMoveHere(currentX2,currentY2copy)==true)
			currentY2++; 
		running = false; 
	}
	 else if(direction == 5) {
		//Left
		currentX2copy = currentX2;
		currentX2copy-=1;
		if(testCanMoveHere(currentX2copy,currentY2)==true)
			currentX2--; 
		running = false; 
	}
    else if(direction == 6) {
		//Right
		currentX2copy = currentX2;
		currentX2copy+=1;
		if(testCanMoveHere(currentX2copy,currentY2)==true)
			currentX2++; 
		running = false; 
	}
    //update the current block
    set(currentX1, currentY1, "current");
	set(currentX2, currentY2, "pl2"); 
    
    if(currentX1 == 47 && currentY1 == 26 && canfinish==1)
        gameOver = true;
	if(currentX2 == 47 && currentY2 == 26 && canfinish==1)
        gameOver = true;
	
	if(score>0 && direction>=-1 && direction<=6)
		score-=1;
    
	updatePlayer1(); 
	updatePlayer2(); 
	
    //set 
    document.getElementById("score").innerHTML = "Score: " + score; 
	
	//document.getElementById("position1").innerHTML = "Position: X1 = " + currentX1 + " | Y1 = " + currentY1;
	
	//document.getElementById("position2").innerHTML = "Position: X2 = " + currentX2 + " | Y2 = " + currentY2; 
	
	if(gameOver==true){
		
	}
} 
 
function updatePlayer1(){ 
    for(var i = length; i > 0; i--){ 
        lastX1[i] = lastX1[i-1]; 
        lastY1[i] = lastY1[i-1]; 
    } 
    lastX1[0] = currentX1; 
    lastY1[0] = currentY1; 
}

function updatePlayer2(){ 
    for(var i = length; i > 0; i--){ 
        lastX2[i] = lastX2[i-1]; 
        lastY2[i] = lastY2[i-1]; 
    } 
    lastX2[0] = currentX2; 
    lastY2[0] = currentY2; 
} 

function Leave(){
	ajax_post(score);
	setTimeout(function() {
		  window.location.href ='http://localhost:88/authenticated/menu.php'
		}
		,3000)
}
 
run();