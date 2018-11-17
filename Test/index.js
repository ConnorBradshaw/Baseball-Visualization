function Batter(name, hits)
{
	this.name = name;
	this.hits = hits;
}
function Hits(date, velocity, angle, distance, outcome, video)
{
	this.date = date;
	this.velocity = velocity;
	this.angle = angle;
	this.distance = distance;
	this.outcome = outcome;
	this.video = video;
}
function bats(batterID, batter, pitcherID, pitcher, date, launchAngle, velocity, angle, distance, hangTime, spinRate, outcome, video)
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

var ball = new Array();
var i = 0;
d3.csv("BattedBallData.csv", function(d){
	for(var count = 0; count < d.length; count++)
	{
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
}
for(var p = 0; p < ball.length; p++)
{

	function myFunction(j, k, video, angle, distance, outcome, velocity)
	{
		if(outcome == "Undefined")
		{
		}
		else{

		use = "h" + j;
		used = ".h" + j;
		uses = ".h" + j + " svg";
		if(!$( used ).length)
		{
			var div = document.createElement('div');
			div.classList.add(use);
			div.classList.add("float");
			div.classList.add("sample");
			document.body.appendChild(div);
			
			var sampleSVG = d3.select(used)
			.append("svg:svg")
			.attr("class", "sample")
			.attr("width", 600)
			.attr("height", 468);
			d3.select(used)
			.append("text")
			.text(k)
			.attr("class", "title");
			d3.select(uses)
			.append("svg:image")
			.attr('width', 600)
			.attr('height', 468)
			.attr("xlink:href", "baseballfield.png");
			
		}
		theta = (angle * 1 + 90) * (Math.PI / 180);
		d3.select(uses)
		.append("svg:line")
		.attr("id", ".test_div" + i)
		.attr("stroke", "black")
		.attr("x1", 300)
		.attr("y1", 400)
		.attr("x2", 300 + distance * -Math.cos(theta))
		.attr("y2", 400 + distance * -Math.sin(theta))
		.attr("stroke-width", 2.5)
		.attr("stroke-opacity", .7)
		.on("mouseover", function(){return tooltip.style("visibility", "visible"), tooltip.html("Outcome: " + outcome + "<br/> Distance: " + distance + " ft<br/> Velocity: " + velocity + " mph"), d3.select(this).attr("stroke-width", 4), d3.select(this).attr("stroke","white");  })
		.on("mousemove", function(event){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden"), d3.select(this).attr("stroke-width", 2.5), d3.select(this).attr("stroke","black");})
		.on("mousedown", function(){window.open(video, 'newwindow');});
	}
}

	myFunction(ball[p].batterID, ball[p].batter, ball[p].video, ball[p].angle, ball[p].distance, ball[p].outcome, ball[p].velocity);
	i++;



}	
});
var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("font-size", "20px")
	.style("background", "white")
	.style("border", 1)
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("a simple tooltip");


