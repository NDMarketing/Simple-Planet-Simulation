const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let grd;

// resizing the screen will refresh the page with new width values
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// creating the Star Class
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
}

class Planet {
  constructor(x, y, radius, color, velocity, orbitRadius) {
    this.x = x;
    this.y = y;
    this.startingPos = {
      x,
      y,
    };
    this.radian = 0;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;
    // adding a moon for each planet
    this.moon = {
      x: this.x + this.orbitRadius + this.radius,
      y: this.y + this.orbitRadius + this.radius,
      radian: 0,
      velocity: (Math.random() + 0.1) / 30,
    };
  }

  draw() {
    //PLANET PATH DRAWING
    c.beginPath();
    c.lineWidth = 1;
    c.arc(
      this.startingPos.x,
      this.startingPos.y,
      this.orbitRadius,
      0,
      Math.PI * 2,
      false
    );
    c.strokeStyle = "rgba(255, 255, 255, 0.3)";
    c.stroke();
    c.closePath();
    //PLANET DRAWING
    // c.translate(this.x, this.y);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      grd = c.createRadialGradient(75, 50, 5, 90, 60, 100);
      grd.addColorStop(0, this.color);
      grd.addColorStop(1, this.color);
      c.fillStyle = grd;

    // c.fillStyle = this.color;
    c.fill();
    c.closePath();

    // Moon drawing
    if (this.velocity > 0) {
      c.beginPath();
      c.arc(this.moon.x, this.moon.y, 2, 0, Math.PI * 2, false);
      
      c.fillStyle = 'lightgray';
      c.fill();
      c.closePath();
    }
  }
  update() {
    this.draw();
    // Update the x and y by the velocity
    this.radian += this.velocity; // increase our angle every animation frame
    // Get the new x based on our new angle and radius
    this.x = this.startingPos.x + Math.cos(this.radian) * this.orbitRadius;
    // Get the new y based on our new angle and radius
    this.y = this.startingPos.y + Math.sin(this.radian) * this.orbitRadius;
    //moon movement
    this.moon.radian += this.moon.velocity;
    this.moon.x = this.x + Math.cos(this.moon.radian) * (this.radius + 5);
    this.moon.y = this.y + Math.sin(this.moon.radian) * (this.radius + 5);
  }
}
// helper FUNCTION
const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
  new Planet(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    color,
    velocity / 1000,
    orbitRadius
  );

// Implementation

//making them variables Global
let planets;
let stars;

const init = () => {
  //empty planet ans star array created on init
  planets = [];
  stars = [];
  
  //adding planets to array on init function
  planets.push(getPlanetForOptions(50, 0, 0, "rgb(242, 220, 19)")); // sun
  planets.push(getPlanetForOptions(5, 12, 65, "rgb(74, 25, 4)")); // mercury
  planets.push(getPlanetForOptions(10, 8, 90, "rgb(214, 176, 92)")); // venus
  planets.push(getPlanetForOptions(15, 6, 125, "rgb(57, 122, 179)")); // earth
  planets.push(getPlanetForOptions(20, 5, 175, "rgb(191, 70, 13)")); // mars
  planets.push(getPlanetForOptions(25, 4, 225, "rgb(240, 212, 199)")); // jupiter
  planets.push(getPlanetForOptions(20, 3, 275, "rgb(168, 165, 56)")); // saturn
  planets.push(getPlanetForOptions(15, 2, 325, "rgb(165, 219, 232)")); // uranus
  planets.push(getPlanetForOptions(25, 1, 375, "rgb(22, 68, 219)")); // neptune
    // looping through to create 500 stars
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }

};

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = "rgb(0, 0, 0)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.draw();
  });
  planets.forEach((planet) => {
    planet.update();
  });
};

init();
animate();
