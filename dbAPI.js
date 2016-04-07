var postScore = function(name, score){
	alert(name + score);
	var scoresRef = new Firebase("https://blistering-inferno-139.firebaseio.com/leaderboard");
	scoresRef.child(name).setWithPriority( score, -score );
}

var getRanking = function(rankingCallback){
	var scoresRef = new Firebase("https://blistering-inferno-139.firebaseio.com/leaderboard");
	var jsonArr = [];
	
	scoresRef.limitToFirst(3).once('value', function(snap) {
	   var i = 0;
	   console.log('First 3 in the ranking:');
	   console.log(snap.val());
	   snap.forEach(function(userSnap) {
			// create the json with the scores
			jsonArr.push({
				name: userSnap.key(),
				score: userSnap.val()
			});
	   });
	   
	   // callback with the ranking
	   rankingCallback(jsonArr);
	});
}

