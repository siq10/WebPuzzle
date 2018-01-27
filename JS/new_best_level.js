

var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = '../resources/Juan_monster.png';

imgArray[1] = new Image();
imgArray[1].src = '../resources/robi_monster.png';

var attempts = 0;
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
        attempts = attempts + 1 ;

		/////
        switch (val) {
    case "A":
		tile.style.background = 'url(../resources/robi_register.png) no-repeat';
        tile.style.backgroundSize = 'cover';
        break;
    case "B":
	    tile.style.background = 'url(../resources/juan_register.png) no-repeat';
        tile.style.backgroundSize = 'cover';
        break;
    case "C":
	    tile.style.background = 'url(../resources/scared_kid.png) no-repeat';
        tile.style.backgroundSize = 'cover';
        break;
    case "D":
	    tile.style.background = 'url(../resources/scared_woman.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
    case "E":
	    tile.style.background = 'url(../resources/juan_monster.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
    case "F":
	    tile.style.background = 'url(../resources/robi_monster.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
    case "G":
	    tile.style.background = 'url(../resources/story2.png) no-repeat';
        tile.style.backgroundSize = 'cover'
		break;
	case "H":
	    tile.style.background = 'url(../resources/andreea_monster.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
    case "I":
     	tile.style.background = 'url(../resources/andreea_monster2.png) no-repeat';
        tile.style.backgroundSize = 'cover';
		break;
	case "J":
	    tile.style.background = 'url(../resources/story.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
    case "K":
	    tile.style.background = 'url(../resources/andreea_monster4.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
	case "L":
	    tile.style.background = 'url(../resources/andreea_monster3.png) no-repeat';
        tile.style.backgroundSize = 'cover'
        break;
}


		///
		//tile.style.background = '#FFF';
		tile.innerHTML = "";
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
                    
					//alert("Board cleared... generating new board");

					//AICI E SCORUL FINAL :attempts
					attempts = (100-attempts)*5
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
                    // Flip the 2 tiles back over
                    document.getElementById('score').innerHTML = "";
                    document.getElementById('score').innerHTML = attempts/2;
                    console.log(attempts/2);
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(../resources/rsz_2puzzle.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_1.style.backgroundSize = 'cover';
            	    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(../resources/rsz_2puzzle.png) no-repeat';
                    tile_2.style.backgroundSize = 'cover';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
