let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&units=imperial&appid=7347a58ac895179cbb99b48ec4541594';


/*
data being displayed:
    will be an abj

    city  obj.city.name
    date    obj.list[index].list.dt_txt
    weather icon    obj.listindex[].weather[0].icon
    wind    obj.list[index].wind.speed
    humidity obj.list[index].main.humidity
might need seperate API call
    UV index 
*/

let currentWeatherEl = document.querySelector("#current-weather");
let forecastEl = document.querySelector("#forecast");

fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let h2El = document.createElement("h2");
        let p1El = document.createElement("p");
        let p2El = document.createElement("p");
        let p3El = document.createElement("p");

        h2El.textContent = data.city.name + " " + data.list[0].dt_txt.split(" ")[0];
        p1El.textContent = "Temp: " + data.list[0].main.temp;
        p2El.textContent = "Wind: " + data.list[0].wind.speed;
        p3El.textContent = "Humidity: " + data.list[0].main.humidity;

        currentWeatherEl.appendChild(h2El);
        currentWeatherEl.appendChild(p1El);
        currentWeatherEl.appendChild(p2El);
        currentWeatherEl.appendChild(p3El);

        for(let i = 1; i < 40; i += 8) {

            let cardEl = document.createElement("div");
            let cardBodyEl = document.createElement("div");

            cardEl.classList = "col-md-2 border border-dark";

            cardBodyEl.innerHTML = "<h6 class='card-title'>" + data.list[i].dt_txt.split(" ")[0] + "</h6>"
                                    + "<p class='card-text'> Temp: " + data.list[i].main.temp + "</p>"
                                    + "<p class='card-text'> Wind: " + data.list[i].wind.speed + "</p>"
                                    + "<p class='card-text'> Humidity: " + data.list[i].main.humidity + "</p>";

            cardEl.appendChild(cardBodyEl);
            forecastEl.appendChild(cardEl);

        }

    });

