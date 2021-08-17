const backgroundMoviment = () => {
  left = parseInt($("#game-bg").css("background-position"));
  $("#game-bg").css("background-position", left - 1);
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
    default:
      break;
  }
};

function start() {
  $("#game-instructions").hide();
  $("#game-bg").append("<div id='player' class='chopper-animated'></div>");
  $("#game-bg").append("<div id='enemy1' class='chopper-animated'</div>");
  $("#game-bg").append("<div id='enemy2'></div>");
  $("#game-bg").append("<div id='ally' class='ally-animated'></div>");

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

  const loop = () => {
    backgroundMoviment();
    moveEnemy1();
    moveEnemy2();
    moveAlly();
  };

  window.addEventListener("keydown", (event) => movePlayer(event.key));
  var game = {};
  var enemy1Speed = 5;
  var enemy1Height = Math.random() * 334;
  var enemy2Speed = 3;
  var allySpeed = 1;
  game.timer = setInterval(loop, 30);
}
