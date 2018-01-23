function ajax_post(bestScore){
    console.log(bestScore);
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "writeToDataBase.php";

    var vars = "score="+bestScore+"&map="+5;
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

var Context = {
    canvas: null,
    context: null,
    create: function (canvas_tag_id) {
        this.canvas = document.getElementById(canvas_tag_id)
        this.context = this.canvas.getContext('2d')
        return this.context;
    }
}
var color = "blue"
var Sprite = function (filename, is_pattern) {
    this.image = null
    this.pattern = null
    this.TO_RADIANS = Math.PI / 180

    if (filename != undefined && filename != "" && filename != null) {
        this.image = new Image()
        this.image.src = filename

        if (this.pattern)
            this.pattern = Context.context.createPattern(this.image, 'repeat')
    } else
        console.log("Error 404 : Unable to load sprite.")

    this.draw = function (x, y, w, h) {
        if (this.pattern != null) {
            Context.context.fillStyle = this.pattern
            Context.context.fillRect(x, y, w, h)
        } else {
            if (w == undefined || h == undefined) {
                Context.context.drawImage(this.image, x, y, this.image.width, this.image.height)
            } else {
                Context.context.drawImage(this.image, x, y, w, h)

            }
        }
    }

    this.rotate = function (x, y, angle) {
        Context.context.save()
        Context.context.translate(x, y)
        Context.context.rotate(angle * this.TO_RADIANS)
        Context.context.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2))
        Context.context.restore()
    }

}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function rotate(velocity, angle)
{
    const rotatedVelocities = {
        x:velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y:velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotatedVelocities
}

/*function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y
    
    const xDist = otherParticle.x - particle.x
    const yDist = otherParticle.y - particle.y
    
    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0)
        {
            const angle = -Math.atan2(otherParticle.y - particle.y,otherParticle.x - particle.x)
            
            m1 = particle.mass
            m2 = otherParticle.mass
            
            const u1 = rotate(particle.velocity,angle)
            const u2 = rotate(otherParticle.velocity,angle)
            
            const v1 = {x:u1.x * (m1-m2) / (m1+m2) + u2.x * 2 * m2 / (m1*m2), y:u1.y}
            const v2 = {x:u2.x * (m1-m2) / (m1+m2) + u1.x * 2 * m2 / (m1*m2), y:u2.y}
            
            const vFinal1 = rotate(v1, -angle)
            const vFinal2 = rotate(v2, -angle)
            
            particle.velocity.x = vFinal1.x
            particle.velocity.y = vFinal1.y
            
            otherParticle.velocity.x = vFinal2.x
            otherParticle.velocity.y = vFinal2.y
        }
}*/
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
       particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function distance(x1,y1,x2,y2)
{
    const xDist = x2-x1
    const yDist = y2-y1
    return Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2))
}
//var img = new Sprite("../")

window.onload = function () {
    Context.create("game")

    //    Context.context.beginPath()
    var tile5 = "../resources/Assets/png/Tiles/Tile.png"
    //    var tile5 = "http://www.tigrisgames.com/wall.png"
    var crate = "../resources/Assets/png/Objects/Crate.png"
    //    var crate = "http://www.tigrisgames.com/crate.png"

    var img = new Sprite(tile5, false)

    var img2 = new Sprite(crate, false)

    var pattern = new Sprite(crate, true)

    var angle = 0

    var posX = 200
    var posY = 500
    var incX = 0
    var incY = 0
    var angle1 = 0
    var posx = 200
    var posy = 300
    var incx = 0
    var incy = 0



//    var obstacles = {}
    var obsnum = 1
    var obsindex = 0
    var constant = 1
    function Player(radius) {
        this.x = Math.random()*Context.canvas.width
        this.y = Math.random()*Context.canvas.height
        this.radius = radius
        this.color = color
        this.mass = 1
        this.up = 0
        this.right = 0
        this.left = 0
        this.down = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.life = 30
        this.del = 1
        this.sacrifice = () =>{
            if (this.del = 1)
                {
                    this.life--
                    this.del = 0
                    setTimeout(function() {
                        this.del = 1    
                    },3000)
                }
        }
        this.update = obstacles => {
            if (this.life> 0)
            this.draw()
            for(var i = 0;i< obstacles.length;i++)
                {

                    if (distance(this.x,this.y,obstacles[i].x, obstacles[i].y)-this.radius *2 < 0)
                        {
                            resolveCollision(this, obstacles[i])
                            this.sacrifice()
                        }
                }
            if(this.x - this.radius <= 0)
                {
                    this.x = this.radius
                }
            if(this.x + this.radius >= Context.canvas.width)
                {
                    this.x = Context.canvas.width - this.radius
                }
            if(this.y - this.radius <= 0)
                {
                    this.y = this.radius
                }
            if(this.y + this.radius >= Context.canvas.height)
                {
                    this.y = Context.canvas.height - this.radius
                }
            if (this.left == 1)
                {
                    this.velocity.x = -3
                }
            else
            if(this.right ==1)
                {
                    this.velocity.x = 3
                }
            else
                this.velocity.x = 0

            if(this.down==1)
                {
                    this.velocity.y = 3
                }
            else
            if(this.up==1)
                {
                    this.velocity.y = -3
                }
            else
            {
                this.velocity.y = 0
            }
            this.x += this.velocity.x
            this.y += this.velocity.y
                
        }   
    
        this.draw = () => {
            Context.context.beginPath()
            Context.context.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            Context.context.fillStyle = "teal"
            Context.context.fill()
            Context.context.closePath()
        }
    }
    
    
    
    
     function Opponent(radius) {
        this.x = Math.random()*Context.canvas.width
        this.y = Math.random()*Context.canvas.height
        this.radius = radius
        this.color = color
        this.mass = 3
        this.up = 0
         this.life = 5000
        this.right = 0
        this.left = 0
        this.down = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.del = 1
        this.update = obstacles => {
            if (this.life> 0)
            this.draw()
            for(var i = 0;i< obstacles.length;i++)
                {

                    if (distance(this.x,this.y,obstacles[i].x, obstacles[i].y)-this.radius *2 < 0)
                        {
                            resolveCollision(this, obstacles[i])
                        }
                }
            if(this.x - this.radius <= 0)
                {
                    this.x = this.radius
                }
            if(this.x + this.radius >= Context.canvas.width)
                {
                    this.x = Context.canvas.width - this.radius
                }
            if(this.y - this.radius <= 0)
                {
                    this.y = this.radius
                }
            if(this.y + this.radius >= Context.canvas.height)
                {
                    this.y = Context.canvas.height - this.radius
                }
            if (this.left == 1)
                {
                    this.velocity.x = -3
                }
            else
            if(this.right ==1)
                {
                    this.velocity.x = 3
                }
            else
                this.velocity.x = 0

            if(this.down==1)
                {
                    this.velocity.y = 3
                }
            else
            if(this.up==1)
                {
                    this.velocity.y = -3
                }
            else
            {
                this.velocity.y = 0
            }
            this.x += this.velocity.x
            this.y += this.velocity.y
                
        }   
    
        this.draw = () => {
            Context.context.beginPath()
            Context.context.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            Context.context.fillStyle = "green"
            Context.context.fill()
            Context.context.closePath()
        }
    }
    
    
    
        function onkeydopp(e) {
        if (e.keyCode == 39) {
            op.right = 1
        } //right arrow
        else    
        if (e.keyCode == 37) {
            op.left = 1
        } //left arrow
        else
        if (e.keyCode == 38) {
            op.up = 1
        } //up arrow
        else 
        if (e.keyCode == 40) {
            op.down = 1;

        } //down arrow
    }
    
    
    
    function onkeyupp(e)
    {
        if (e.keyCode == 39) {
            op.right = 0
        } //right arrow
        else         
        if (e.keyCode == 37) {
            op.left = 0
        } //left arrow
        else
        if (e.keyCode == 38) {
            op.up = 0
        } //up arrow
        else 
        if (e.keyCode == 40) {
            op.down = 0;
        }
    }
    
    
    
    function onkeydown(e) {
        if (e.keyCode == 100 || e.keyCode==68) {
            p.right = 1
        } //right arrow
        else    
        if (e.keyCode == 97 || e.keyCode==65) {
            p.left = 1
        } //left arrow
        else
        if (e.keyCode == 119 || e.keyCode==87) {
            p.up = 1
        } //up arrow
        else 
        if (e.keyCode == 115 || e.keyCode==83) {
            p.down = 1;

        } //down arrow
    }
    
    
    
    function onkeyup(e)
    {
        if (e.keyCode == 100 || e.keyCode==68) {
            p.right = 0
        } //right arrow
        else         
        if (e.keyCode == 97 || e.keyCode==65) {
            p.left = 0
        } //left arrow
        else
        if (e.keyCode == 119 || e.keyCode==87) {
            p.up = 0
        } //up arrow
        else 
        if (e.keyCode == 115 || e.keyCode==83) {
            p.down = 0;
        }
    }

    
    function Obstacle(x,y,radius) {
        this.x = Math.random()*Context.canvas.width
        this.y = Math.random()*Context.canvas.height
        this.radius = radius
        this.color = color
        this.mass = 1
        this.velocity = {
            x: constant*(Math.random() - 0.5),
            y: constant*(Math.random() - 0.5)
        }
        
        this.update = obstacles => {
            this.draw()
//            if (distance(this.x,this.y,p.x, p.y)-this.radius *2 < 0)
//                {
//                    resolveCollision(p, this)
//                }
            for(var i = 0;i< obstacles.length;i++)
                {
                    if(this===obstacles[i])
                        {
                            continue
                        }
                    if (distance(this.x,this.y,obstacles[i].x, obstacles[i].y)-this.radius *2 < 0)
                        {
                            resolveCollision(this, obstacles[i])
                        }
                }

            if(this.x - this.radius <= 0 || this.x + this.radius >= Context.canvas.width)
                {
                    this.velocity.x = -this.velocity.x
                }
            if(this.y - this.radius <= 0 || this.y + this.radius >= Context.canvas.height)
                {
                    this.velocity.y = -this.velocity.y
                }
            this.x += this.velocity.x
            this.y += this.velocity.y
            if(constant<=15)
            constant+=0.0001
        } 
    
        this.draw = () => {
            Context.context.beginPath()
            Context.context.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            Context.context.fillStyle = "white"
            Context.context.fill()
            Context.context.closePath()
        }
    }
//        this.vx = Math.random() * 10 - 5
//        this.vy = Math.random() * 10 - 5
//        this.gravity = 0.1
//        obsindex++
//        obstacles[obsindex] = this
//        this.id = obsindex
//        this.life = 0
//        this.maxLife = Math.random() * 200 + 10

//    Obstacle.prototype.draw = function () {
//        this.x += this.vx
//        this.y += this.vy
//        if (Math.random() < 0.2) {
//            this.vx = Math.random() * 10 - 5
//            this.vy = Math.random() * 10 - 5
//        }
//        //this.vy += this.gravity
//        this.life++
//            if (this.life >= this.maxLife) {
//                delete obstacles[this.id]
//            }
//        Context.context.fillStyle = 'white'
//        Context.context.fillRect(this.x, this.y, 10, 10)
//
//    }
    var p = new Player(15)
    var op = new Opponent(15)
    
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keyup", onkeyup);
    window.addEventListener("keyup", onkeyupp);
    window.addEventListener("keydown", onkeydopp);

    let obstacles
    function init() {
        obstacles = []
        for (let i = 0;i<60;i++)
            {   
                const radius = 15
                
                var x = randomIntFromRange(radius,Context.canvas.width - radius)
                var y = randomIntFromRange(radius,Context.canvas.height-radius)
                if(i!==0)
                {
                for (let j=0; j < obstacles.length;j++)
                    {
                        if(distance(x,y,obstacles[j].x,obstacles[j].y) - 2*radius < 0 ||
                          distance(p.x,p.y,obstacles[j].x,obstacles[j].y) - 2*radius < 0
                          )
                            {
                                
                                x = randomIntFromRange(radius,Context.canvas.width - radius)
                                y = randomIntFromRange(radius,Context.canvas.height- radius)
                                j = -1
                            }
                    }
                }
                obstacles.push(new Obstacle(x,y,radius))
            }
    }    
    var hp = document.getElementById("hp")
    var seconds = document.getElementById("seconds")
    var seccount = 0
    function incrementSeconds() {
    seccount += 1;
    seconds.innerHTML = seccount+" seconds passed!"
}
    var ok = 1

    var timer = setInterval(incrementSeconds, 1000);
    function animate() {
        requestAnimationFrame(animate)
        {
            Context.context.clearRect(0,0, Context.canvas.width, Context.canvas.height)
            obstacles.forEach(obstacle => {
            obstacle.update(obstacles)
                              })
            p.update(obstacles)
            op.update(obstacles)
            if(p.life>=0)
                hp.innerHTML = "HP: " + p.life
            
            if(p.life==0)
                {
                    if(ok==1)
                        {
                    clearInterval(timer)
                    ok=0
					var scor = seccount*20;
					ajax_post(scor);
                    setTimeout(function() {
                      window.location.href ='http://localhost:88/authenticated/menu.php'
                    }
                    ,3000)
                        }
                }
        }
    }
    
        

init()
animate()

    
    
    
//    function Player() {
//        this.x = Context.canvas.width / 4
//        this.y = Context.canvas.height / 4
//        this.vx = 0
//        this.vy = 0
//        this.gravity = 0
//        this.life = 0
//        this.maxLife = 1
//        this.moving = 0
//        this.left=0
//        this.right=0
//        this.up = 0
//        this.down = 0


}
    
    
//
//    Player.prototype.draw = function () {
//        if(p.left==1)
//            {
//                p.vx=-4
//            }
//        if(p.right==1)
//            {
//                p.vx=4
//            }
//        if(p.down==1)
//            {
//                p.vy=4
//            }
//        if(p.up==1){
//            p.vy=-4
//        }
        
//        if(this.x+this.vx>0 && this.x+this.vx<Context.canvas.width)
//        this.x += this.vx
////        if(this.y+this.vy>0 && this.y + this.vy<Context.canvas.height)
//        this.y += this.vy
//        if (this.life >= this.maxLife) {
//            delete this
//        }
//        if(this.x>Context.canvas.width-20)
//            this.x = Context.canvas.width-20
//        else if(this.x < 10 )
//            this.x = 10
//        if(this.y>Context.canvas.height-10)
//            this.y = Context.canvas.height-10
//        else if(this.y < 10 )
//            this.y = 10
//        Context.context.fillStyle = 'red'
//        Context.context.fillRect(this.x, this.y, 10, 10)
//
//    }
//     var p =  new Player()
    
//    window.addEventListener("keydown", onkeydown);
 //    window.addEventListener("keyup", onkeyup);

//        p.moving = 0
//    }

    //    var back = new Image()    
    //    back.src = '../resources/Assets/png/BG.png'
    //    back.onload = function(){
    //        Context.context.drawImage(back,0,0);   
    //    }


//    setInterval(function () {
//        Context.context.fillStyle = "black"
//        Context.context.fillRect(0, 0, 800, 800)
//
//        for (var i = 0; i < obsnum; i++) {
//            new Obstacle()
//        }
//        for (var i in obstacles) {
//
//            obstacles[i].draw()
//        }
//        p.draw()
//        if(p.moving==0)
//        {
//        if(p.vx>0 && p.right==0)
//            p.vx -= 0.5
//        else
//            if(p.vx<0 && p.left==0)
//                p.vx+=0.5
//        if(p.vy<0&& p.up==0)
//            p.vy+=0.5
//        else
//            if(p.vy>0&&p.down==0)
//                p.vy-=0.5
//        }
        
        //        if (incX < 500 && incX > -100) {
        //            if (Math.random() >= 0.3)
        //            {incX += 2
        //             angle+=2.0}
        //            else
        //            {incX -= 2
        //                angle-=2.0}
        //        }
        //        if (incY < 200 && incY > -400) {
        //            if (Math.random() >= 0.5)
        //                incY += 2
        //            else
        //                incY -= 2
        //        }
        //        
        //        if (incx < 500 && incx > -100) {
        //            if (Math.random() >= 0.35)
        //            {incx += 2
        //             angle1+=2.0}
        //            else
        //            {incx -= 2
        //                angle1-=2.0}
        //        }
        //        if (incy < 200 && incy > -400) {
        //            if (Math.random() >= 0.5)
        //                incy += 2
        //            else
        //                incy -= 2
        //        }
        //        img.draw(600, 50, 64, 64)
        //        img.draw(0, 74, 256, 32)
        //        pattern.draw(160, 160, 256, 32)
        //        img.rotate(posX + incX, posY + incY, angle)
        //        img2.rotate(posx + incx, posy + incy, angle1)
//
//    }, 30)
//}
