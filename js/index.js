const backgroundMoviment = () => {
  left = parseInt($("#game-bg").css("background-position"));
  $("#game-bg").css("background-position", left - 1);
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

  var game = {};
  game.timer = setInterval(loop, 30);
}
