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
    let cityName = document.querySelector(".form-control").value.toUpperCase();
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=7347a58ac895179cbb99b48ec4541594";

    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        currentWeatherEl.innerHTML = "";
        forecastEl.innerHTML = "";

        currentWeatherEl.appendChild(createCurrentWeather(data));

        for(let i = 1; i < 40; i += 8) {
            let card = createCard(data, i);

            forecastEl.appendChild(card);
        }
    });

    addToHistory(cityName);
    document.getElementById("form").reset();

    event.preventDefault();
};

function createCurrentWeather(weatherObj) {
    let icon = "https://openweathermap.org/img/w/" + weatherObj.list[0].weather[0].icon + ".png"

    let weatherDisplayEl = document.createElement("div");
    let h2El = document.createElement("h2");
    let imgEl = document.createElement("img");
    let p1El = document.createElement("p");
    let p2El = document.createElement("p");
    let p3El = document.createElement("p");

    h2El.textContent = weatherObj.city.name + " " + weatherObj.list[0].dt_txt.split(" ")[0];
    imgEl.setAttribute("src", icon);
    p1El.textContent = "Temp: " + weatherObj.list[0].main.temp + " F";
    p2El.textContent = "Wind: " + weatherObj.list[0].wind.speed + " MPH";
    p3El.textContent = "Humidity: " + weatherObj.list[0].main.humidity + "%";

    weatherDisplayEl.appendChild(h2El);
    weatherDisplayEl.appendChild(imgEl);
    weatherDisplayEl.appendChild(p1El);
    weatherDisplayEl.appendChild(p2El);
    weatherDisplayEl.appendChild(p3El);

    return weatherDisplayEl;
};

function createCard(weatherObj, i) {
    let icon = "https://openweathermap.org/img/w/" + weatherObj.list[i].weather[0].icon + ".png"

    let cardEl = document.createElement("div");
    let cardBodyEl = document.createElement("div");
    let h6El = document.createElement("h6");
    let imgEl = document.createElement("img");
    let p1El = document.createElement("p");
    let p2El = document.createElement("p");
    let p3El = document.createElement("p");

    cardEl.classList = "col-md-2 border border-dark card";
    cardBodyEl.classList = "card-body";

    h6El.setAttribute("class", "card-title");
    h6El.textContent = weatherObj.list[i].dt_txt.split(" ")[0];
    cardBodyEl.appendChild(h6El);

    imgEl.setAttribute("id", "wicon");
    imgEl.setAttribute("src", icon);
    cardBodyEl.appendChild(imgEl);

    p1El.setAttribute("class", "card-text");
    p1El.textContent = "Temp: " + weatherObj.list[i].main.temp + " F";
    cardBodyEl.appendChild(p1El);
    p2El.setAttribute("class", "card-text");
    p2El.textContent = "Wind: " + weatherObj.list[i].wind.speed + " MPH";
    cardBodyEl.appendChild(p2El);
    p3El.setAttribute("class", "card-text");
    p3El.textContent = "Humidity: " + weatherObj.list[i].main.humidity + "%";
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

function historyButtonHandeler(event) {
    if(event.target.type === "button") {
        let cityName = event.target.textContent;
        let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=7347a58ac895179cbb99b48ec4541594";
    
        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            currentWeatherEl.innerHTML = "";
            forecastEl.innerHTML = "";
    
            currentWeatherEl.appendChild(createCurrentWeather(data));
    
            for(let i = 1; i < 40; i += 8) {
                let card = createCard(data, i);
    
                forecastEl.appendChild(card);
            }
        });
    
        addToHistory(cityName);
    }
};

formEl.addEventListener("submit", formSubmitHandeler);
historyContainerEl.addEventListener("click", historyButtonHandeler);