$( document ).ready(function() {
	startGameScope();
});

startGameScope = function() {
	// hold reference to hole from previous round to remove the style and click handler
	var $previousHole = null;
	var $increment = 10;
	
	playNextRound = function() {
			// get all holes except the one currently active
			var $allHoles = $(".hole").not(".mole,.deadMole");
			
			// get next hole randomly
			var $nextHole = $($allHoles.get(Math.floor(Math.random() * $allHoles.size())));

			if ($previousHole != null)
			{
				// Turn off previous hole and remove tapHandler
				$previousHole.removeClass("mole").off("click", tapHandler);
			}
			
			tapHandler = function () {
				// increment points
				var currentScore = $("#points").text();
				$("#points").text($increment + Number(currentScore));
				
				// change hole style to smashed and remove tap handler
				$nextHole.addClass("deadMole").removeClass("mole").off("click", tapHandler); 
				
				// remove clicked hole style after 250ms
				setTimeout(function() { $nextHole.removeClass("deadMole") }, 250);
			}

			// hold hole reference for the next round
			$previousHole = $nextHole.addClass("mole").on("click", tapHandler);
		  
			// wait for 1 second and play next round
			setTimeout(playNextRound, 1000);
	}
	
	playNextRound();
}
