let weather = {
    apiKey : "80e8cbead53ed48dc68c1a0d429a6e44",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&appid=" + this.apiKey
        ).then((response)=>response.json())
        .then((data)=>this.displayWeather(data))
    },


    displayWeather : function(data){
        const { name } = data;
        const { icon , description } = data.weather[0];
        const { temp , humidity ,temp_min, temp_max  } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;

        console.log(name , icon , description , temp , humidity , temp_min , temp_max  , speed , country);

        document.querySelector(".location").innerHTML = name + " , " + country;
        document.querySelector(".description").innerHTML = description;        
        document.querySelector(".temp").innerHTML = (temp-273.15).toFixed(2)  + "°C";
        document.querySelector(".humidity").innerHTML ="Humidity: " + humidity + "%";
        document.querySelector(".tempmin_max").innerHTML = "Min "+ temp_min + " | " + "Max "  +temp_max;
        document.querySelector(".wind-speed").innerHTML = "Wind speed: "+speed + " km/hr";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?"+ name + "')"

    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};


document.querySelector(".search button").addEventListener("click" , function () {
    weather.search();
    document.querySelector('.search-bar').value = ""
});


document.querySelector(".search-bar").addEventListener("keyup" , function (event) {
    if(event.key == "Enter"){
        weather.search();
        document.querySelector('.search-bar').value = ""
        
    }
});

weather.fetchWeather("London")
