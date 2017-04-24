function Cloud() {
	this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);
	this.r = (Math.floor(Math.random() * 200) + 100);
	this.speed = 1;

	this.show = function() {
		noStroke();
		fill(255, 255, 255, 5);
		ellipse(this.x, this.y, this.r, this.r);
	} 

	this.move = function(speed) {
		this.x -= speed; 
		this.y += speed;
		if (this.x + this.r < 0) {
			this.x = width + this.r;
		}
		if (this.y - this.r > height) {
			this.y = 0 - this.r;
		}
	}
}