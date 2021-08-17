function start() {
  const backgroundMoviment = () => {
    left = parseInt($("#game-bg").css("background-position"));
    $("#game-bg").css("background-position", left - 1);
  };

  const shoot = () => {
    if (canShoot) {
      canShoot = false;
      $("#game-bg").append("<div id='shoot'></div>");
      playerHeight = parseInt($("#player").css("top"));
      $("#shoot").css("left", 190);
      $("#shoot").css("top", playerHeight + 50);
    }
  };

  const movePlayer = (key) => {
    let playerTop = parseInt($("#player").css("top"));
    switch (key) {
      case "W":
        $("#player").css("top", playerTop - 10);
        if (playerTop < 0) $("#player").css("top", playerTop + 10);
        break;
      case "w":
        $("#player").css("top", playerTop - 10);
        if (playerTop < 0) $("#player").css("top", playerTop + 10);
        break;
      case "S":
        $("#player").css("top", playerTop + 10);
        if (playerTop > 434) $("#player").css("top", playerTop - 10);
        break;
      case "s":
        $("#player").css("top", playerTop + 10);
        if (playerTop > 434) $("#player").css("top", playerTop - 10);
        break;
      case "D":
        shoot();
        break;
      case "d":
        shoot();
        break;
      default:
        break;
    }
  };

  const moveEnemy1 = () => {
    let enemy1Distance = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", enemy1Distance - enemy1Speed);
    if (enemy1Distance < 0) {
      enemy1Height = Math.random() * 334;
      $("#enemy1").css("top", enemy1Height);
      $("#enemy1").css("left", 694);
    }
  };

  const moveEnemy2 = () => {
    let enemy2Distance = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", enemy2Distance - enemy2Speed);
    if (enemy2Distance < 0) {
      $("#enemy2").css("left", 775);
    }
  };

  const moveAlly = () => {
    let allyDistance = parseInt($("#ally").css("left"));
    $("#ally").css("left", allyDistance + allySpeed);
    if (allyDistance > 906) {
      $("#ally").css("left", 0);
    }
  };

  const moveBullet = () => {
    if (!canShoot) {
      bulletDistance = parseInt($("#shoot").css("left"));
      if (bulletDistance > 900) {
        canShoot = true;
        $("#shoot").remove();
      }
      $("#shoot").css("left", bulletDistance + 15);
    }
  };

  const collision = () => {
    var collision1 = $("#player").collision($("#enemy1"));
    var collision2 = $("#player").collision($("#enemy2"));
    var collision3 = $("#shoot").collision($("#enemy1"));
    var collision4 = $("#shoot").collision($("#enemy2"));
    var collision5 = $("#player").collision($("#ally"));
    var collision6 = $("#enemy2").collision($("#ally"));

    if (collision1.length > 0) {
      playerEnergy--;
      explosion1Y = $("#enemy1").css("top");
      explosion1X = $("#enemy1").css("left");
      $("#enemy1").css("top", parseInt(Math.random() * 334));
      $("#enemy1").css("left", 694);
      explosion("explosion", explosion1X, explosion1Y);
    }

    if (collision2.length > 0) {
      playerEnergy--;
      explosion2Y = $("#enemy2").css("top");
      explosion2X = $("#enemy2").css("left");
      explosion("explosion", explosion2X, explosion2Y);
      $("#enemy2").remove();
      setTimeout(() => {
        if (!gameOver) $("#game-bg").append("<div id='enemy2'></div>");
      }, 5000);
    }

    if (collision3.length > 0) {
      enemy1Speed += 0.3;
      totalScore += 100;
      explosion3Y = $("#enemy1").css("top");
      explosion3X = $("#enemy1").css("left");
      $("#shoot").remove();
      canShoot = true;
      $("#enemy1").css("top", parseInt(Math.random() * 334));
      $("#enemy1").css("left", 694);
      explosion("explosion", explosion3X, explosion3Y);
    }

    if (collision4.length > 0) {
      totalScore += 50;
      explosion4Y = $("#enemy2").css("top");
      explosion4X = $("#enemy2").css("left");
      explosion("explosion", explosion4X, explosion4Y);
      $("#enemy2").remove();
      setTimeout(() => {
        if (!gameOver) $("#game-bg").append("<div id='enemy2'></div>");
      }, 5000);
    }

    if (collision5.length > 0) {
      allySaved++;
      $("#ally").remove();
      setTimeout(() => {
        if (!gameOver)
          $("#game-bg").append("<div id='ally' class='ally-animated'></div>");
      }, 6000);
    }

    if (collision6.length > 0) {
      allyLost++;
      deathAllyY = $("#ally").css("top");
      deathAllyX = $("#ally").css("left");
      deathAlly(deathAllyX, deathAllyY);
      $("#ally").remove();
      setTimeout(() => {
        if (!gameOver)
          $("#game-bg").append("<div id='ally' class='ally-animated'></div>");
      }, 6000);
    }
  };

  const explosion = (el, x, y) => {
    $("#game-bg").append(`<div id='${el}'></div>`);
    $(`#${el}`).css("top", y);
    $(`#${el}`).css("left", x);
    $(`#${el}`).css("background-image", "url('../img/explosion.png')");
    $(`#${el}`).animate({ width: 200, opacity: 0 }, "slow");
    setTimeout(() => $(`#${el}`).remove(), 1000);
  };

  const deathAlly = (x, y) => {
    $("#game-bg").append(`<div id='death-ally' class='death-animated'></div>`);
    $("#death-ally").css("top", y);
    $("#death-ally").css("left", x);
    setTimeout(() => $("#death-ally").remove(), 1000);
  };

  const score = () => {
    $("#scoreboard").html(
      `<h2>Score: ${totalScore} Saved: ${allySaved} Lost: ${allyLost} </h2>`
    );
  };

  const energy = () => {
    if (playerEnergy === 0) gameOver();
    $("#player-energy").css(
      "background-image",
      `url('../img/energy_${playerEnergy}.png')`
    );
  };

  const loop = () => {
    score();
    energy();
    backgroundMoviment();
    moveEnemy1();
    moveEnemy2();
    moveAlly();
    moveBullet();
    collision();
  };

  $("#game-instructions").hide();
  $("#game-bg").append("<div id='player' class='chopper-animated'></div>");
  $("#game-bg").append("<div id='enemy1' class='chopper-animated'</div>");
  $("#game-bg").append("<div id='enemy2'></div>");
  $("#game-bg").append("<div id='ally' class='ally-animated'></div>");
  $("#game-bg").append("<div id='scoreboard'></div>");
  $("#game-bg").append("<div id='player-energy'></div>");

  window.addEventListener("keydown", (event) => movePlayer(event.key));
  var game = {};
  var playerEnergy = 3;
  var totalScore = 0;
  var allySaved = 0;
  var allyLost = 0;
  var gameOver = false;
  var enemy1Speed = 5;
  var enemy1Height = Math.random() * 334;
  var enemy2Speed = 3;
  var allySpeed = 1;
  var canShoot = true;
  game.timer = setInterval(loop, 30);
}
