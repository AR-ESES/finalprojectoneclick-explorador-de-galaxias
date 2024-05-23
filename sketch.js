function Bird() {
  this.y = height / 2;
  this.x = width / 2;
  this.gravity = 0.96;
  this.lift = -16;
  this.velocity = 0;
  this.diam = 80;
  this.imgIndex = 0;
  this.images = [
    loadImage("azul.png"),
    loadImage("roxo.png"),
    loadImage("vermelho.png"),
    loadImage("rosa.png"),
  ];
  this.img = this.images[this.imgIndex];  
  this.img4 = loadImage("flame.png");

  this.show = function () {
    stroke(0);
    strokeWeight(2);
    fill(255);
    image(this.img, this.x, this.y, this.diam, this.diam * 0.7368421053);
  };

  this.goUp = function () {
    this.velocity += this.lift;
    console.log(this.velocity);
    image(
      this.img4,
      this.x - this.diam / 1.6,
      this.y,
      this.diam,
      this.diam - this.diam / 3
    );
  };


  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    this.changeImage = function() {
      this.imgIndex = (this.imgIndex + 1)
      % this.images.length;
      this.img = this.images[this.imgIndex];
    };
  };



function Obstacle() {
  this.x = width;
  this.y = random(height);
  this.w = random(30, 80);
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("navee.png");
  this.img3 = loadImage("navee.png");

  this.show = function () {
    fill(0);
    if (this.highlight) {
      image(this.img3, this.x, this.y, this.w, this.w);
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };
  this.update = function () {
    this.x -= this.speed;
  };
  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (bird) {
    if (bird.y > this.y - this.w / 2 && bird.y < this.y + this.w / 2) {
      if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w / 2) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

var bird;
var obstacles = [];
var pipesCleared;
var obstaclesHit;
var playQuality;
var gameStarted = false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  bird = new Bird();
  pipesCleared = 0;
  obstaclesHit = 0;
  playQuality = 10;

}

function draw() {
  if (gameStarted) {
    // Se o jogo começou, desenhe o jogo
    clear();
    background(0, 20, 50);
    fill(255); // Define a cor de preenchimento como branco
    textSize(20);
    textFont("Sans-Serif Bold");
    text("Naves ultrapassadas : " + pipesCleared, 140, 20);
    text("Dano: " + obstaclesHit, 60, 40);

    bird.show();
    bird.update();

    if (frameCount % 10 == 0) {
      obstacles.push(new Obstacle());
    }

    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(bird)) {
        obstaclesHit++;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        pipesCleared++;
      }
    }
  } else {
    // Se o jogo não começou, desenhe o layout de início
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(40);
    text("Explorador de Galaxias", width / 2, height / 2);
  }
}
function mouseClicked() {
  // Quando o mouse é clicado, inicie o jogo
  if (!gameStarted) {
    gameStarted = true;
    obstacles.push(new Obstacle());
  }
}

function keyPressed() {
  if (gameStarted && key === " ") {
    bird.goUp();
  }
}
}

function Obstacle() {
  this.x = width;
  this.y = random(height);
  this.w = random(30, 80);
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("navee.png");
  this.img3 = loadImage("navee.png");

  this.show = function () {
    fill(0);
    if (this.highlight) {
      image(this.img3, this.x, this.y, this.w, this.w);
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };
  this.update = function () {
    this.x -= this.speed;
  };
  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (bird) {
    if (bird.y > this.y - this.w / 2 && bird.y < this.y + this.w / 2) {
      if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w / 2) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

var bird;
var obstacles = [];
var pipesCleared;
var obstaclesHit;
var playQuality;
var gameStarted = false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  bird = new Bird();
  pipesCleared = 0;
  obstaclesHit = 0;
  playQuality = 10;

}

function draw() {
  if (gameStarted) {
    // Se o jogo começou, desenhe o jogo
    clear();
    background(0, 20, 50);
    fill(255); // Define a cor de preenchimento como branco
    textSize(20);
    textFont("Sans-Serif Bold");
    text("naves Ultrapassadas: " + pipesCleared, 140, 20);
    text("Dano: " + obstaclesHit, 60, 40);
   
    bird.show();
    bird.update();

    if (frameCount % 10 == 0) {
      obstacles.push(new Obstacle());
    }

    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(bird)) {
        obstaclesHit++;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        pipesCleared++;
      }
    }
  } else {
    // Se o jogo não começou, desenhe o layout de início
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(40);
    text("Explorador de Galaxias", width / 2, height / 2);
  
    
  }
}
function mouseClicked() {
  // Quando o mouse é clicado, inicie o jogo
  if (!gameStarted) {
    gameStarted = true;
    obstacles.push(new Obstacle());
  }
}

function keyPressed() {
  if (gameStarted && key === " ") {
    bird.goUp();
  }
}

this.changeImage = function () {
  this.imgIndex = (this.imgIndex + 1)
  % this.image.length;
  this.img = this.images[this.imgIndex];
};

function Obstacle() {
  this.x = width;
  this.y = random(height);
  this.w = random(30, 80);
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("navee.png");
  this.img3 = loadImage("navee.png");
  this.img3 = loadImage("nave2.png");
  this.img3 = loadImage("nave3.png");
  this.img3 = loadImage("nave4.png");
  

function changeObstacles() {
  // Code to change obstacles here
}
  this.show = function () {
    fill(0);
    if (this.highlight) {
      image(this.img3, this.x, this.y, this.w, this.w);
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };
  this.update = function () {
    this.x -= this.speed;
  };
  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (bird) {
    if (bird.y > this.y - this.w / 2 && bird.y < this.y + this.w / 2) {
      if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w / 2) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

var bird;
var obstacles = [];
var pipesCleared;
var obstaclesHit;
var playQuality;
var gameStarted = false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  bird = new Bird();
  pipesCleared = 0;
  obstaclesHit = 0;
  playQuality = 10;

  setInterval(function() {
    bird.changeImage();
  }, 7000);
  
}

 //setInterval(function () {
  //  changeBackground(),
  //  bird.changeImage();
  //}, 10000);

let ultimaMudancaDeCor = 0;
let corAtual = [0, 20, 50];

// Função para gerar uma cor aleatória
function gerarCorAleatoria() {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ];
}


function draw() {
  if (gameStarted) {
    // Se o jogo começou, desenhe o jogo
    clear();
    background(0, 20, 50);
    fill(255); // Define a cor de preenchimento como branco
    textSize(20);
    textFont("Sans-Serif Bold");
    text(" Naves Ultrapassadas: " + pipesCleared, 120, 20);
    text("Dano: " + obstaclesHit, 60, 40);
  
    bird.show();
    bird.update();

    if (frameCount % 10 == 0) {
      obstacles.push(new Obstacle());
    }

    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(bird)) {
        obstaclesHit++;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        pipesCleared++;
      }
    }
  } else {
    // Se o jogo não começou, desenhe o layout de início
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(40);
    text("Explorador de Galaxias", width / 2, height / 2);
  }
}

function mouseClicked() {
  // Quando o mouse é clicado, inicie o jogo
  if (!gameStarted) {
    gameStarted = true;
    obstacles.push(new Obstacle());
  }
}

function keyPressed() {
  if (gameStarted && key === " ") {
    bird.goUp();
  }
}