function Explosion(bomb_x, bomb_y) {
	this.x = bomb_x;
	this.y = bomb_y;
	this.r = 30;
	this.explosion_radius = 150;
	this.transparency = 1000;
	this.fadeout_rate = 10;
	this.expand_rate = 10;

	this.show = function() {
		noStroke();
		fill(211, 8, 93, this.transparency);
		ellipse(this.x, this.y, this.r, this.r);
	}

	this.fadeout = function() {
		if (this.transparency > 0) {
			this.transparency -= this.fadeout_rate;
		}
		if (this.transparency <= 0) {
			this.r = 0;
		}
	}

	this.expand = function() {
		if (this.r <= this.explosion_radius)
			this.r += this.expand_rate;
	}

	this.hits = function(enemy) {
		var d = dist(this.x, this.y, enemy.x, enemy.y);
		if (d*2 < this.r + enemy.r) {
			return true;
		} return false;
	}
}