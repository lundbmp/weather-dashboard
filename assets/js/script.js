//let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&units=imperial&appid=7347a58ac895179cbb99b48ec4541594';
let formEl = document.querySelector("#form");

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

// fetch(apiUrl)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);

//         let h2El = document.createElement("h2");
//         let p1El = document.createElement("p");
//         let p2El = document.createElement("p");
//         let p3El = document.createElement("p");

//         h2El.textContent = data.city.name + " " + data.list[0].dt_txt.split(" ")[0];
//         p1El.textContent = "Temp: " + data.list[0].main.temp;
//         p2El.textContent = "Wind: " + data.list[0].wind.speed;
//         p3El.textContent = "Humidity: " + data.list[0].main.humidity;

//         currentWeatherEl.appendChild(h2El);
//         currentWeatherEl.appendChild(p1El);
//         currentWeatherEl.appendChild(p2El);
//         currentWeatherEl.appendChild(p3El);

//         for(let i = 1; i < 40; i += 8) {

//             let card = createCard(data, i);

//             console.log(createCard(data, i));
//             forecastEl.appendChild(card);
//         }

//     });


function formSubmitHandeler(event) {
    let text = document.querySelector(".form-control").value;
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + text + "&units=imperial&appid=7347a58ac895179cbb99b48ec4541594";

    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let icon = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"

        let h2El = document.createElement("h2");
        let imgEl = document.createElement("img");
        let p1El = document.createElement("p");
        let p2El = document.createElement("p");
        let p3El = document.createElement("p");

        h2El.textContent = data.city.name + " " + data.list[0].dt_txt.split(" ")[0];
        imgEl.setAttribute("src", icon);
        p1El.textContent = "Temp: " + data.list[0].main.temp;
        p2El.textContent = "Wind: " + data.list[0].wind.speed;
        p3El.textContent = "Humidity: " + data.list[0].main.humidity;

        currentWeatherEl.appendChild(h2El);
        currentWeatherEl.appendChild(imgEl);
        currentWeatherEl.appendChild(p1El);
        currentWeatherEl.appendChild(p2El);
        currentWeatherEl.appendChild(p3El);

        for(let i = 1; i < 40; i += 8) {
            let card = createCard(data, i);

            forecastEl.appendChild(card);
        }
    });

    document.getElementById("form").reset();

    event.preventDefault();
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
    p1El.textContent = "Temp: " + weatherObj.list[i].main.temp;
    cardBodyEl.appendChild(p1El);
    p2El.setAttribute("class", "card-text");
    p2El.textContent = "Wind: " + weatherObj.list[i].wind.speed;
    cardBodyEl.appendChild(p2El);
    p3El.setAttribute("class", "card-text");
    p3El.textContent = "Humidity: " + weatherObj.list[i].main.humidity;
    cardBodyEl.appendChild(p3El);

    cardEl.appendChild(cardBodyEl);

    return cardEl;
};

formEl.addEventListener("submit", formSubmitHandeler);