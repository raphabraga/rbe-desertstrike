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
    $("#enemy1").css("top", enemy1Height);
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

  const loop = () => {
    backgroundMoviment();
    moveEnemy1();
    moveEnemy2();
    moveAlly();
    moveBullet();
  };

  $("#game-instructions").hide();
  $("#game-bg").append("<div id='player' class='chopper-animated'></div>");
  $("#game-bg").append("<div id='enemy1' class='chopper-animated'</div>");
  $("#game-bg").append("<div id='enemy2'></div>");
  $("#game-bg").append("<div id='ally' class='ally-animated'></div>");

  window.addEventListener("keydown", (event) => movePlayer(event.key));
  var game = {};
  var enemy1Speed = 5;
  var enemy1Height = Math.random() * 334;
  var enemy2Speed = 3;
  var allySpeed = 1;
  var canShoot = true;
  game.timer = setInterval(loop, 30);
}
