var bomber;
var inVulnerable = false;

var bomb;
var bomb_flag = false;
var detonated = false;
var has_exploded = false;
var gone = false;
var explosion;

var enemies = [];
var enemy_count = 5;
var tmp_count = 10;
var enemy_add = 5;
var gameover = false;

var controller = new Object();
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var UP_KEY = 38;
var C_KEY = 67;
var SPACE = 32;
var ENTER = 13;	

var cloud_count = 100;
var mist = [];

var level = 1;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	bomber = new Bomber();

	var sound = new Audio("res/music/bomberman.mp3");
	sound.play();
	// sound.pause();

	init_enemies(enemy_count);
	initClouds();
}

function init_enemies(e) {
	for(var i = 0; i < e; i++) {
		var enemy = new Enemy();
		enemies.push(enemy);
	}
}

function draw() {

	background(13, 16, 17);

	textSize(40);
	textFont("Impact");
	fill('#BFD8D2');
	text("Bomberman Omega", 30, 60);

	textSize(30);
	textFont("Impact");
	fill('#FEDCD2');
	text("by alfisalvacion", 50, 90);

	textSize(25);
	text("Level ", 50, 130);
	text(level, 110, 130);
	// fill(93, 255, 0);
	fill(255)
	textSize(20);
	text("Enemies Left: ", 50, 155);
	text(enemies.length, 170, 155);
	
	text("Life Remaining: ", 50, 180);
	text(bomber.life, 190, 180);


	if (!bomber.moves) {
		fill(255)
		textSize(25);
		text("Kill all the enemies using your bomb", width/2 - 190, height/2 + 330);
		text("SPACE/J to plant, C/K to detonate", width/2 - 170, height/2 + 360);
		text("Use Arrow Keys or W, A, S, D to move", width/2 - 185, height/2 + 390);
	}

	if (bomber.life <= 0) {
		gameover = true;
		textSize(200);
		textFont("Impact");
		fill(211, 8, 93);
		text("GAME OVER", width/4, height/2);

		textSize(100);
		// textFont("Impact");
		fill('#FEDCD2');
		text("You reached Level ", width/4 + 50, height/2 + 100);	
		text(level, width/2 + 350, height/2 + 100);	
		textSize(70);
		// textFont("Impact");
		fill('#DCB239');
		text("Press ENTER to play again", width/4 + 100, height/2 + 170);		
	}

	else {		
		handleControls();

		for (var i = 0; i < enemies.length; i++) {
			enemies[i].show();
			if (bomber.moves) {
				enemies[i].move(bomber);				
			}

			if (enemies[i].hits(bomber) && !inVulnerable) {
				inVulnerable = true;
				setTimeout(makeVulnerable, 3000);
				bomber.r += 20;
				bomber.life--;
			}
		}

		if (bomb_flag) {
			bomb.show();

			if (detonated && explosion.hits(bomber) && !inVulnerable) {
				inVulnerable = true;
				setTimeout(makeVulnerable, 3000);
				bomber.r += 20;
				bomber.life--;
			}

			if (detonated && !has_exploded) {
				for (var i = 0; i < enemies.length; i++) {
					if (explosion.hits(enemies[i])){
						console.log("hit!");
						enemies.splice(i, 1);
						if (enemies.length < 1) {
							enemy_count = tmp_count;
							tmp_count += enemy_add;
							bomber.moves = false;

							setTimeout(init_enemies(enemy_count), 3000);
							// init_enemies(enemy_count);
							level++;
							for (var j = 0; j < enemies.length; j++) {
								enemies[j].range += 20;
							}
						}
					}
				}
				bomb.explode();
				explosion.show();
				explosion.expand();
				if (explosion.r >= explosion.explosion_radius) {
					has_exploded = true;
					gone = false;
				}
			}

			if (has_exploded && !gone) {
				explosion.show();
				explosion.fadeout();
				if (explosion.transparency <= 0 && explosion.r <= 0) {
					gone = true;
					detonated = false;
					has_exploded = false;
					bomb_flag = false;
				}
			}
			
		}
		bomber.show();	
		for (var c of mist) {
			c.show();
			c.move(level * .5);
		}
	}
}

function toggleKey(keyCode, isPressed) {


	if (keyCode == RIGHT_KEY || keyCode == LEFT_KEY || keyCode == UP_KEY || keyCode == DOWN_KEY || 
		keyCode == 68 || keyCode == 65 || keyCode == 87 || keyCode == 83)
		bomber.moves = true;

	if (keyCode == RIGHT_KEY || keyCode == 68) {
		controller.right = isPressed;
	} 
	if (keyCode == LEFT_KEY || keyCode == 65) {
		controller.left = isPressed;
	} 
	if (keyCode == UP_KEY || keyCode == 87) {
		controller.up = isPressed;
	} 
	if (keyCode == DOWN_KEY || keyCode == 83) {
		controller.down = isPressed;
	} 
	if ((keyCode == SPACE || keyCode == 74) && !bomb_flag) {
		bomb_flag = true;
		bomb = bomber.plant();
	} 
	if ((keyCode == C_KEY || keyCode == 75) && (!detonated && bomb_flag)) {
		console.log("explodes!");
		// console.log(explode);
		// sound.play();
		var explode = new Audio("res/music/explode.mp3");
	explode.play();
	
		detonated = true;
		explosion = new Explosion(bomb.x, bomb.y);			
	}
	console.log(keyCode);
	if (keyCode == ENTER && gameover) {
		gameover = false;
		reset();
		draw();
	}
}

function handleControls() {
	if (controller.up) {
		bomber.y -= bomber.speed;
	} if (controller.down) {
		bomber.y += bomber.speed;
	} if (controller.right) {
		bomber.x += bomber.speed;
	} if (controller.left) {
		bomber.x -= bomber.speed;
	} 
	if (bomber.x - bomber.r < 0) {
		bomber.x = bomber.r;
	}
	if (bomber.x + bomber.r > width) {
		bomber.x = width - bomber.r;
	}
	if (bomber.y - bomber.r < 0) {
		bomber.y = bomber.r;
	}
	if (bomber.y + bomber.r > height) {
		bomber.y = height - bomber.r;
	}
}


function makeVulnerable() {
	inVulnerable = false;
}


document.onkeydown = function(evt) {
	toggleKey(evt.keyCode, true);
};

document.onkeyup = function(evt) {
	toggleKey(evt.keyCode, false);
};

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function reset() {
	bomber = new Bomber();
	level = 1;
	inVulnerable = false;
	bomb;
	bomb_flag = false;
	detonated = false;
	has_exploded = false;
	gone = false;
	enemy_count = 5;
	tmp_count = 10;
	// console.log(enemy_count);
	// alert(enemy_count);
	enemies = [];
	init_enemies (enemy_count);
}

function initClouds() {
	for (var i = 0; i <  cloud_count; i++) {
		var cloud = new Cloud();
		mist.push(cloud);
	}
}