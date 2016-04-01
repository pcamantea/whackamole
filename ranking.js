var setRanking = function() {
	var ranking = getRanking();
	//alert(ranking[0].name);

	if (gPoint >= 0) {
		$("#showResult").show();
		if (gPoint > ranking[2].score) {
			$("#boardRanking").show();
			$("#startGame").text("Submit");
		} else {
			$("#boardRanking").hide();
			$("#startGame").text("Restart Game");
		}
	} else {
		$("#showResult").hide();
		$("#startGame").text("Start Game");
	}

	$("#scoreCurrent").text(gPoint);
	displayRanking(ranking);


	$("#startGame").click(function() {
		if($("#startGame").text() === "Submit") {
			postScore("aaa", gPoint);
			$("#boardRanking").hide();
			$("#startGame").text("Restart Game");
		} else {
			window.location.href = '#pagetwo';
		}
	});
}

var displayRanking = function(ranking) {
	if(gPoint > ranking[0].score){
		$("#name1").text("YOU");
		$("#score1").text(gPoint);
		$("#name2").text(ranking[0].name);
		$("#score2").text(ranking[0].score);
		$("#name3").text(ranking[1].name);
		$("#score3").text(ranking[1].score);
		setInterval(function(){
			$('#name1').fadeOut(500,function(){$(this).fadeIn(500)});
		},1000);
	} else if(gPoint > ranking[1].score){
		$("#name1").text(ranking[0].name);
		$("#score1").text(ranking[0].score);
		$("#name2").text("YOU");
		$("#score2").text(gPoint);
		$("#name3").text(ranking[1].name);
		$("#score3").text(ranking[1].score);
		setInterval(function(){
			$('#name2').fadeOut(500,function(){$(this).fadeIn(500)});
		},1000);
	} else if(gPoint > ranking[2].score){
		$("#name1").text(ranking[0].name);
		$("#score1").text(ranking[0].score);
		$("#name2").text(ranking[1].name);
		$("#score2").text(ranking[1].score);
		$("#name3").text("YOU");
		$("#score3").text(gPoint);
		setInterval(function(){
			$('#name3').fadeOut(500,function(){$(this).fadeIn(500)});
		},1000);
	} else {
		$("#name1").text(ranking[0].name);
		$("#score1").text(ranking[0].score);
		$("#name2").text(ranking[1].name);
		$("#score2").text(ranking[1].score);
		$("#name3").text(ranking[2].name);
		$("#score3").text(ranking[2].score);
	}
}

