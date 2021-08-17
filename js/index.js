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

const loop = () => {
  backgroundMoviment();
};

function start() {
  $("#game-instructions").hide();
  $("#game-bg").append("<div id='player' class='chopper-animated'></div>");
  $("#game-bg").append("<div id='enemy1' class='chopper-animated'</div>");
  $("#game-bg").append("<div id='enemy2'></div>");
  $("#game-bg").append("<div id='ally' class='ally-animated'></div>");
  window.addEventListener("keydown", (event) => movePlayer(event.key));
  var game = {};
  game.timer = setInterval(loop, 30);
}
