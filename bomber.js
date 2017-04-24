function Bomber() {
	this.x = width/2;
	this.y = height/2;
	this.r = 30;
	this.speed = 7;
	this.life = 3;
	this.gotHit = false;
	this.inVulnerable = false;
	this.moves = false;

	this.show = function() {
		noStroke();
		fill('#DCB239');
		ellipse(this.x, this.y, this.r, this.r);
	}

	this.plant = function() {
		var bomb = new Bomb(this.x, this.y);
		return bomb;
	}

}