
var player1;
var player2;
var ball;
var scorePlayer1;
var scorePlayer2;
var point1 = 0;
var point2 = 0;
var gameOver = 0;

function ajax_post(bestScore){
    console.log(bestScore);
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "writeToDataBase.php";

    var vars = "score="+bestScore+"&map="+3;
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



function startGame() {
    myGameArea.start();
    //myGameArea.intro();
    player1 = new component(8, 60, "yellow", 20, 150);
    player2 = new component(8, 60, "lime", 670, 150);
    ball = new component(7, 7, "orange", 350, 170);
    scorePlayer1 = new component("16px", "consolas", "yellow", 200, 25, "text");
    scorePlayer2 = new component("16px", "consolas", "lime", 410, 25, "text");
   

}

function passVal() {
    var data = {
        fn: "filename",
        str: "this_is_a_dummy_test_string"
    };

    $.post("writeToDataBase.php", data);
}


var myGameArea = {
    canvas: document.createElement('canvas'),


    start: function () {
        this.canvas.width = 700;
        this.canvas.height = 390;
        this.context = this.canvas.getContext('2d');


        
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        console.log(gameOver);
        
        this.interval = setInterval(updateGameArea, 10);
        

        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })

        window.addEventListener('keyup', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = false;
        })

    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    },

    stop: function () {

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillText("You Win", (this.canvas.width / 2) - 50, this.canvas.height / 4);
        clearInterval(this.interval);
    }
}


//create constructor function

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;


    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.crashWith = function (anotherObj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var anotherObjleft = anotherObj.x;
        var anotherObjright = anotherObj.x + (anotherObj.width);
        var anotherObjtop = anotherObj.y;
        var anotherObjbuttom = anotherObj.y + (anotherObj.height);
        var crash = true;
        if ((mybottom < anotherObjtop) || (mytop > anotherObjbuttom) || (myright < anotherObjleft) || (myleft > anotherObjright)) {
            crash = false;
        }

        return crash;
    }
}

// update game function

function updateGameArea() {

    // player control

    if (player1.y <= 5) {
        player1.y = 5;
    }

    if (player1.y >= 340) {
        player1.y = 340;
    }

    if (player2.y <= 5) {
        player2.y = 5;
    }

    if (player2.y >= 340) {
        player2.y = 340;
    }

    //keybord control
    if (myGameArea.keys && myGameArea.keys[37]) {
        console.log('arrow up');
        player1.y -= 10;
        if (ball.crashWith(player1)) {
            ball.speedY = -4;
            ball.speedX = 14;
        }
    }

    if (myGameArea.keys && myGameArea.keys[39]) {
        player1.y += 10;
        if (ball.crashWith(player1)) {
            ball.speedY = -4;
            ball.speedX = 14;
        }
    }

    if (myGameArea.keys && myGameArea.keys[65]) {
        player2.y -= 10;
        if (ball.crashWith(player2)) {
            ball.speedY = -4;
            ball.speedX = 8;
        }
    }

    if (myGameArea.keys && myGameArea.keys[68]) {
        player2.y += 10;
        if (ball.crashWith(player2)) {
            ball.speedY = 4;
            ball.speedX = -8;
        }
    }


    // Ball control 

    ball.newPos()

    if (ball.crashWith(player1)) {
        ball.speedY = 0;
        ball.speedX = 13;
    }

    else if (ball.crashWith(player2)) {
        ball.speedY = 0;
        ball.speedX = -8;
    }

    else {
        ball.x += -4;
    }

    if (ball.y <= 0) {
        ball.speedY = 4;
    }

    if (ball.y >= 390) {
        ball.speedY = -4;
    }

    if (ball.x <= 2) {
        ball.x = 690;
        point2 += 10
    }

    if (ball.x >= 700) {
        ball.x = 0;
        point1 += 10
    }

    myGameArea.clear();
    player1.update();
    player2.update();
    ball.update();

    scorePlayer1.text = "Score :" + point1;
    scorePlayer2.text = "Score :" + point2;
    scorePlayer1.update();
    scorePlayer2.update();

    if (point1 > 40 || point2 > 40) {
        myGameArea.stop();
        clearInterval(this.interval);
        this.ajax_post(point1);
        

    }
}

