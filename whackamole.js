var GAME_ON = true;
var currentTimeout;

var phonegapReady = function(){
	var viewportScale = 1 / window.devicePixelRatio;
	startGameScope();
	setRanking();
	
	// add misclick handler on all holes
	$(".hole").on("click", missClickHandler);
	
	// todo: delete this. this is just sample code
	$("#giveup").click(gameOver);
}
 
document.addEventListener("deviceready", phonegapReady, false);
//document.addEventListener("touchmove", function(event) { event.preventDefault(); });

$( document ).ready(function() {
});

gameOver = function() {
	// maybe need to stop all timers.
	gPoint = Number($("#points").text());
	setRanking();
	window.location.href = '#pageone';
	
	GAME_ON = false;
	clearTimeout(currentTimeout);
	resetGameValues();
}

resetGameValues = function() {
	$(".hole").removeClass("mole").off("click").on("click", missClickHandler);
	$("#points").text('0');
	$("#level").text('1');
	$("#tries").text('50');
}

startGameScope = function() {
	// hold reference to hole from previous round to remove the style and click handler
	var $previousHole = null;
	var $increment = 1;
	var $initialTime = 1300;
	var $time = $initialTime;
	var $decrementPerLevel = 150;
	
	GAME_ON = true;
	
	playNextRound = function() {
			if (!GAME_ON) {
				return;
			}
			
			// get all holes except the one currently active
			var $allHoles = $(".hole").not(".mole,.deadMole");
			
			// get next hole randomly
			var $nextHole = $($allHoles.get(Math.floor(Math.random() * $allHoles.size())));

			if ($previousHole != null)
			{
				// Turn off previous hole and remove tapHandler
				$previousHole.removeClass("mole").off("click").on("click", missClickHandler);
			}
			
			tapHandler = function () {
				// increment points
				var currentPoint = $("#points").text();
				var newPoint = $increment + Number(currentPoint);
				$("#points").text(newPoint);
				
				// Update level
				var newLevel = parseInt(parseInt(newPoint / $increment) / 10) + 1;
				$("#level").text(newLevel);
				
				if ((newPoint % 10) == 0)
				{
					if (newLevel <= 8)
					{
						$time -= $decrementPerLevel;
					}
					else
					{
						$time = $initialTime;
						alert('You killed all the moles :(\nGood job! I guess...');
						$("#level").text(1);
						$("#points").text(0);
					}
				}
				
				// change hole style to smashed and remove tap handler
				$nextHole.addClass("deadMole").removeClass("mole").off("click", tapHandler).on("click", missClickHandler);
				
				// remove clicked hole style after 250ms
				setTimeout(function() { $nextHole.removeClass("deadMole") }, 250);
				
			}
			
			missClickHandler = function () {
				// decrement tries
				var currentTries = $("#tries").text();
				
				if (currentTries == 1) {
					// game over
					gameOver();
					return;
				}
				
				var newTries = Number(currentTries) - 1;
				$("#tries").text(newTries);
			}

			// hold hole reference for the next round
			$previousHole = $nextHole.addClass("mole").off("click").on("click", tapHandler);
		  
			// wait for 1 second and play next round
			currentTimeout = setTimeout(playNextRound, $time);
	}
	
	playNextRound();
}

