
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	"#801638",
	"#027878",
	"#fdb632",
	"#f37338",
	"#c22326",
	"#222222"
];

window.addEventListener("mousemove", event => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});


class Circle {
	constructor(x, y, dx, dy, radius){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	}

	draw(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	update(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		// interactivity

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRadius){
				this.radius += 1;
			}
		}else if(this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.draw();
	}
}


var circleArray = [];

const init = () => {

	circleArray = [];
	for(var i = 0; i < 800; i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - 2 * radius) + radius;
		var y = Math.random() * (innerHeight - 2 * radius) + radius;
		var dx = Math.random() * 0.5;
		var dy = Math.random() * 0.5;

		circleArray.push(new Circle(x, y, dx, dy, radius));

	}

}



const animate = () => {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}

}
animate();
init();