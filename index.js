//creates object that has information from BattedBallData
function bats(batterID, batter, lastName, pitcherID, pitcher, date, launchAngle, velocity, angle, distance, hangTime, spinRate, outcome, video)
{
	this.batterID = batterID;
	this.batter = batter;
	this.pitcherID = pitcherID;
	this.pitcher = pitcher;
	this.date = date;
	this.launchAngle = launchAngle;
	this.velocity = velocity;
	this.angle = angle;
	this.distance = distance;
	this.hangTime = hangTime;
	this.spinRate = spinRate;
	this.outcome = outcome;
	this.video = video;
}
//makes each card for each player
function setChart(name, batterID, batter, video, angle, distance, outcome, velocity)
{
	//sorting out foul balls
	if(outcome == "Undefined"){}
	//creating visualization for anything that isn't a foul ball
	else
	{
		//setting up class identifiers for later use
		identifier = "h" + batterID;
		cIdentifier = ".h" + batterID;
		cIdentifierSVG = ".h" + batterID + " svg";
		//checks to see if a player already has a card set up
		if(!$( cIdentifierSVG ).length)
		{
			//creates div to put visualization into for each player
			var div = document.createElement('div');
			div.classList.add(identifier);
			div.classList.add("float");
			document.body.appendChild(div);
			
			//creates space for chart
			var sampleSVG = d3.select(cIdentifier)
			.append("svg:svg")
			.attr("class", "sample")
			.attr("width", 600)
			.attr("height", 468);
			//adds player name information
			d3.select(cIdentifier)
			.append("text")
			.text(batter)
			.attr("class", "title");
			//creates overlay of baseball field to map hits on
			d3.select(cIdentifierSVG)
			.append("svg:image")
			.attr('width', 600)
			.attr('height', 468)
			.attr("xlink:href", "baseball.png");
			
		}
		//calculates theta so hit can be mapped in the correct direction
		theta = (angle * 1 + 90) * (Math.PI / 180);
		//adds lines hit
		d3.select(cIdentifierSVG)
		.append("svg:line")
		.attr("id", ".test_div" + i)
		.attr("stroke", "black")
		.attr("x1", 300)
		.attr("y1", 340)
		.attr("x2", 300 + (distance * .65) * -Math.cos(theta))
		.attr("y2", 340 + (distance * .65) * -Math.sin(theta))
		.attr("stroke-width", 2.5)
		.attr("stroke-opacity", .7)
		//creates various events to handle where the mouse is at so when a user hovers it shows the tooltip or when they click it shows the video
		.on("mouseover", function(){return tooltip.style("visibility", "visible"), tooltip.html("Outcome: " + outcome + "<br/> Distance: " + distance + " ft<br/> Velocity: " + velocity + " mph"), d3.select(this).attr("stroke-width", 4), d3.select(this).attr("stroke","white");  })
		.on("mousemove", function(event){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden"), d3.select(this).attr("stroke-width", 2.5), d3.select(this).attr("stroke","black");})
		.on("mousedown", function(){window.open(video, 'newwindow');});
	}
}
//creates tooltip that occurs when a user hovers over a hit
var tooltip = d3.select("body")
	.append("div")
	.attr("class", "border")
	.style("position", "absolute")
	.style("font-size", "20px")
	.style("background", "white")
	.style("border", 1)
	.style("z-index", "10")
	.style("visibility", "hidden")
//creates array to store each hit in BattedBallData
var ball = new Array();
//creates variable to distinguish between each hit
var i = 0;
//reads csv file
d3.csv("BattedBallData.csv", function(d)
{
	//reads each entry to the end of the file
	for(var count = 0; count < d.length; count++)
	{
		//adds each hit and stores each variable
		ball.push(new bats());
		ball[count].batterID = d[count].BATTER_ID;
		ball[count].batter = d[count].BATTER,
		ball[count].pitcherID = d[count].PITCHER_ID,
		ball[count].pitcher = d[count].PITCHER,
		ball[count].date = d[count].GAME_DATE,
		ball[count].launchAngle = d[count].LAUNCH_ANGLE,
		ball[count].velocity = d[count].EXIT_SPEED,
		ball[count].angle = d[count].EXIT_DIRECTION,
		ball[count].distance = d[count].HIT_DISTANCE,
		ball[count].hangTime = d[count].HANG_TIME,
		ball[count].spinRate = d[count].HIT_SPIN_RATE,
		ball[count].outcome = d[count].PLAY_OUTCOME,
		ball[count].video = d[count].VIDEO_LINK
		//splits the batter name into first and last name
		var temp = ball[count].batter.split(",");
		//stores last name for sorting purposes
		ball[count].lastName = temp[0];
		//puts together batter name with first name then last name
		ball[count].batter = temp[1] + " " + temp[0];
	}
	//sorts batters by last name
	ball.sort(function(x, y)
	{
	   return d3.ascending(x.lastName, y.lastName);
	})
	//function for creating visualization
	function createChart(name)
	{
		//reads through every entry to map all data
		for(var p = 0; p < ball.length; p++)
		{
			setChart(name, ball[p].batterID, ball[p].batter, ball[p].video, ball[p].angle, ball[p].distance, ball[p].outcome, ball[p].velocity);
			i++;
		}
	}
	//runs entire code to create visualization
	createChart();

});



