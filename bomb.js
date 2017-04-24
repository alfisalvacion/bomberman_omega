function Bomb(bomber_x, bomber_y) {
	this.x = bomber_x;
	this.y = bomber_y;
	this.r = 10;

	this.show = function() {
		noStroke();
		fill(211, 8, 93, this.transparency);
		rect(this.x, this.y, this.r, this.r);
	}

	this.explode = function() {
		this.r = 0;	
	}
}