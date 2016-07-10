var DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function handleForecastData(data) {
	var skycons = new Skycons({"color": "white"});

	var temp = document.getElementById('temp');
	var summary = document.getElementById('summary');
	var current = data.currently;

	summary.innerHTML = current.summary;
	skycons.add('icon', current.icon);
	temp.innerHTML = Math.floor(current.temperature) + '&deg;F';

	skycons.play();

	var weeklyDays = data.daily.data;

    var dayElem = document.getElementsByClassName('day');
    var lowTempElem = document.getElementsByClassName('lowTemp');
    var highTempElem = document.getElementsByClassName('highTemp');

	for(var i = 1; i < weeklyDays.length;i++){
		    var day = weeklyDays[i];
			var d = new Date(day.time * 1000);
			var dayOfWeek = DAYS_OF_WEEK[d.getDay()];
            var x = i-1;

            dayElem[x].innerHTML = dayOfWeek;
            lowTempElem[x].innerHTML = 'Low of ' + Math.floor(day.temperatureMin) + '&deg;F';
            highTempElem[x].innerHTML = 'High of ' + Math.floor(day.temperatureMax) + '&deg;F';

	};
}

navigator.geolocation.getCurrentPosition(function(location){
	var longitude = location.coords.longitude;
	var latitude = location.coords.latitude;

	var reqUrl = 'https://api.forecast.io/forecast/d3ed9b8433ef9b385ae53be0e690f730/' + latitude + ',' + longitude + '?callback=handleForecastData';
	var script = document.createElement('script');
	script.setAttribute('src', reqUrl);
	document.body.appendChild(script);
});
