let historyArray;

let formEl = document.querySelector("#form");
let historyContainerEl = document.querySelector("#history");
let currentWeatherEl = document.querySelector("#current-weather");
let forecastEl = document.querySelector("#forecast");

window.onload = function() {
    loadHistoryArray();
    addHistoryButtons();
};

function formSubmitHandeler(event) {
    let cityName = document.querySelector(".form-control").value.trim().toUpperCase();
    let apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=7347a58ac895179cbb99b48ec4541594";
    
    if(cityName != "") {
        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=7347a58ac895179cbb99b48ec4541594";

            return fetch(oneCallApi)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            currentWeatherEl.innerHTML = "";
            forecastEl.innerHTML = "";

            currentWeatherEl.appendChild(createCurrentWeather(data, cityName));

            for(let i = 1; i < 6; i++) {
                let card = createCard(data, i);

                forecastEl.appendChild(card);
            }
        })
        .catch(function(error) {
            alert("Not a valid city.");
        });

        addToHistory(cityName);
    }
    document.getElementById("form").reset();

    event.preventDefault();
};

function historyButtonHandeler(event) {
    if(event.target.type === "button") {
        let cityName = event.target.textContent;
        let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=7347a58ac895179cbb99b48ec4541594";
    
        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=7347a58ac895179cbb99b48ec4541594";

            return fetch(oneCallApi)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            currentWeatherEl.innerHTML = "";
            forecastEl.innerHTML = "";

            currentWeatherEl.appendChild(createCurrentWeather(data, cityName));

            for(let i = 1; i < 6; i++) {
                let card = createCard(data, i);

                forecastEl.appendChild(card);
            }
        })
        .catch(function(error) {
            alert("Not a valid city.");
        });
    
        addToHistory(cityName);
    }
};

function createCurrentWeather(weatherObj, cityName) {
    let icon = "https://openweathermap.org/img/w/" + weatherObj.current.weather[0].icon + ".png"

    let weatherDisplayEl = document.createElement("div");
    let h2El = document.createElement("h2");
    let imgEl = document.createElement("img");
    let p1El = document.createElement("p");
    let p2El = document.createElement("p");
    let p3El = document.createElement("p");
    let p4El = document.createElement("p");

    h2El.textContent = cityName + " " + moment().format("M/D/YYYY");
    imgEl.setAttribute("src", icon);
    p1El.textContent = "Temp: " + weatherObj.current.temp + " F";
    p2El.textContent = "Wind: " + weatherObj.current.wind_speed + " MPH";
    p3El.textContent = "Humidity: " + weatherObj.current.humidity + "%";
    p4El.textContent = "UV Index: " + weatherObj.current.uvi;

    weatherDisplayEl.appendChild(h2El);
    weatherDisplayEl.appendChild(imgEl);
    weatherDisplayEl.appendChild(p1El);
    weatherDisplayEl.appendChild(p2El);
    weatherDisplayEl.appendChild(p3El);
    weatherDisplayEl.appendChild(p4El);

    return weatherDisplayEl;
};

function createCard(weatherObj, i) {
    let icon = "https://openweathermap.org/img/w/" + weatherObj.daily[i].weather[0].icon + ".png"

    let cardEl = document.createElement("div");
    let cardBodyEl = document.createElement("div");
    let h6El = document.createElement("h6");
    let imgEl = document.createElement("img");
    let p1El = document.createElement("p");
    let p2El = document.createElement("p");
    let p3El = document.createElement("p");

    cardEl.classList = "col-lg-2 col-md-10 border border-dark card";
    cardBodyEl.classList = "card-body";

    h6El.setAttribute("class", "card-title");
    h6El.textContent = moment().add(i, 'days').format("M/D/YYYY");

    imgEl.setAttribute("id", "wicon");
    imgEl.setAttribute("src", icon);

    p1El.setAttribute("class", "card-text");
    p1El.textContent = "Temp: " + weatherObj.daily[i].temp.day + " F";

    p2El.setAttribute("class", "card-text");
    p2El.textContent = "Wind: " + weatherObj.daily[i].wind_speed + " MPH";

    p3El.setAttribute("class", "card-text");
    p3El.textContent = "Humidity: " + weatherObj.daily[i].humidity + "%";

    cardBodyEl.appendChild(h6El);
    cardBodyEl.appendChild(imgEl);
    cardBodyEl.appendChild(p1El);
    cardBodyEl.appendChild(p2El);
    cardBodyEl.appendChild(p3El);

    cardEl.appendChild(cardBodyEl);

    return cardEl;
};

function addToHistory(cityName) {
    if(historyArray === undefined) {
        historyArray = [];
    }
    if (historyArray.length === 0) {
        historyArray.push(cityName);
    } else if(!historyArray.includes(cityName)) {
        historyArray.unshift(cityName);
        if(historyArray.length > 8) {
            historyArray.pop();
        }
    }
    
    localStorage.setItem("History", JSON.stringify(historyArray));
    addHistoryButtons();
};

function loadHistoryArray() {
    if(localStorage.getItem("History")) {
        historyArray = JSON.parse(localStorage.getItem("History"));
    }
};

function addHistoryButtons() {
    if(historyArray !== undefined && historyArray.length > 0) {
        let historyEl = document.querySelector("#history");
        historyEl.innerHTML = "";

        for(let city of historyArray) {
            let historyButton = document.createElement("button");

            historyButton.setAttribute("type", "button");
            historyButton.classList = "btn btn-secondary w-100 my-2"
            historyButton.textContent = city.toUpperCase();

            historyEl.appendChild(historyButton);
        }
    }
};


formEl.addEventListener("submit", formSubmitHandeler);
historyContainerEl.addEventListener("click", historyButtonHandeler);