$(document ).ready(function() {
    console.log("ready!");
    getCurrentWeather('hubli');
    $('#search-btn').on('click',searchCity);
    //getWeekWeather();
});

var days = new function(){
	this.MONDAY = 1;
	this.TUESDAY = 2;
	this.WEDNESDAY = 3;
	this.THURSDAY = 4;
	this.FRIDAY = 5;
	this.SATURDAY = 6;
	this.SUNDAY = 0; 
}

var months = new function(){
	this.january = 0;
	this.february = 1;
	this.march = 2;
	this.april = 3;
	this.may = 4;
	this.june = 5;
	this.july = 6;
	this.august = 7;
	this.september = 8;
	this.october = 9;
	this.november = 10;
	this.december = 11;
}

var city = '';
var url = 'https://api.openweathermap.org/data/2.5/';
var APIKey = 'bcd0ad0825444df9ce3db60bc04e933e';
//var locId = '1269920';
function getCurrentWeather(cityName){
	
	if(city != ''){
		cityName = city;
	}else{
		//do nothing
	}

	$.getJSON(url+"weather?q="+cityName+"&appid="+APIKey+"", 
		function(result){
		console.log(result);
		var cityName = result.name;
		var temp = result.main.temp;
		var d = new Date();
		var day = d.getDay();
		var month = d.getMonth();
		var currDate = d.getDate();
		var celsius = temp-273.15;

		$('.location').html(result.name);
		$('.temp').html(Math.ceil(celsius));
		$('.forecast-icon').html('<img src="https://openweathermap.org/img/w/'+result.weather[0].icon+'.png" alt="" class="weather_icon" height=90 width=90>');

		switch(day){
			case days.MONDAY:
				$('.day').html('Monday');
				break;
			case days.TUESDAY:
				$('.day').html('Tuesday');
				break;
			case days.WEDNESDAY:
				$('.day').html('Wednesday');
				break;
			case days.THURSDAY:
				$('.day').html('Thursday');
				break;
			case days.FRIDAY:
				$('.day').html('Friday');
				break;
			case days.SATURDAY:
				$('.day').html('Saturday');
				break;
			case days.SUNDAY:
				$('.day').html('Sunday');
				break;
			default:
                break;							
		}

		switch(month){
			case months.january:
				$('.date').html(currDate+" Jan");
				break;
			case months.february:
				$('.date').html(currDate+" Feb");
				break;	
			case months.march:
				$('.date').html(currDate+" Mar");
				break;
			case months.april:
				$('.date').html(currDate+" Apr");
				break;
			case months.may:
				$('.date').html(currDate+" May");
				break;
			case months.june:
				$('.date').html(currDate+" June");
				break;
			case months.july:
				$('.date').html(currDate+" July");
				break;
			case months.august:
				$('.date').html(currDate+" Aug");
				break;
			case months.september:
				$('.date').html(currDate+" Sept");
				break;
			case months.october:
				$('.date').html(currDate+" Oct");
				break;
			case months.november:
				$('.date').html(currDate+" Nov");
				break;
			case months.december:
				$('.date').html(currDate+" Dec");
				break;
			default:
				break;											
		}
	}).fail(function(){
		console.log('404 error occured.');
		toastMsg('City not found','Please Enter a valid city name','info');
	});
}

/*function getWeekWeather(){
	$.getJSON(url+"forecast/daily?id="+locId+"&mode=json&units=metric&cnt=7&appid="+APIKey+"", function(result){
		console.log(result);
	});
}*/

function searchCity(){
	city = $('#searchCity').val();
	getCurrentWeather(city);
	return false;
}

function toastMsg(title,text,infoIcon){
	$.toast({
	    heading: title,
	    text: text,
	    icon: infoIcon,
	    loader: false,        
	    loaderBg: '#9EC600',
	    bgColor: '#009ad8',
	    stack: 3,
	    hideAfter: 3000, 
	    beforeShow: function () {
	    	$('#searchCity').val('');
	    }   
	})
}