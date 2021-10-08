// let submit = document.querySelector("#submit");
let form = document.querySelector("#form");

console.log(submit);

let cityInput = document.querySelector("#city-input");
console.log(cityInput);

let city = ""

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    city = cityInput.value;
    console.log(city);
    let div = document.querySelector(".weather-data");

    removeAllChildNodes(div)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ba72ac2eb7df535ec2d852238ea17b60`)
    .then(response => response.json())
    .then(data => {
    
    // gets temp in kelvin, followed by conversions to farenheit
    let kelvin = data.main.temp;
    // convert kelvin to celcius;
    let degC = kelvin - 273.15; 
    // convert celcius to farenheit;
    let degF = Math.floor(degC * 1.8 + 32)

    let tempEl = document.createElement('div');
    let tempIcon = ``;
    if(degF >= 90) {
        tempIcon = `<i class="fas fa-thermometer-full"></i>`;
    }
    else if (degF >= 70) {
        tempIcon = `<i class="fas fa-thermometer-three-quarters"></i>`;
    }
    else if (degF >= 50) {
        tempIcon = `<i class="fas fa-thermometer-half"></i>`;
    }
    else if (degF >= 30) {
        tempIcon = `<i class="fas fa-thermometer-quarter"></i>`;
    }
    else if (degF < 29) {
        tempIcon = `<i class="fas fa-thermometer-empty"></i>`;
    }
    tempEl.innerHTML = `${tempIcon} <b>Current Temperature:</b>  ${degF}ºF`;
    let feel = data.main.feels_like;
    let feelC = feel - 273.15;
    let feelF = Math.floor(feelC * 1.8 + 32);
    let feelIcon = ``;
    if(feelF >= 90) {
        feelIcon = `<i class="fas fa-thermometer-full"></i>`;
    }
    else if (feelF >= 70) {
        feelIcon = `<i class="fas fa-thermometer-three-quarters"></i>`;
    }
    else if (feelF >= 50) {
        feelIcon = `<i class="fas fa-thermometer-half"></i>`;
    }
    else if (feelF >= 30) {
        feelIcon = `<i class="fas fa-thermometer-quarter"></i>`;
    }
    else if (feelF < 29) {
        feelIcon = `<i class="fas fa-thermometer-empty"></i>`;
    }
    let feelEl = document.createElement('div');
    feelEl.innerHTML = `${feelIcon} <b>Feels like:</b> ${feelF}ºF`;

    // description
    let weatherDescription = data.weather[0].description
    console.log(weatherDescription)
    let descripIcon = ``;
    if (weatherDescription.includes("cloud") && weatherDescription.includes("sun")) {
        descripIcon = `<i class="fas fa-cloud-sun"></i>`;
    }
    else if (weatherDescription.includes("cloud") || weatherDescription.includes("fog")) {
        descripIcon = `<i class="fas fa-cloud"></i>`;
    }
    else if (weatherDescription.includes("sun")) {
        descripIcon = `<i class="fas fa-sun"></i>`;
    }
    else if (weatherDescription.includes("rain")) {
        descripIcon = `<i class="fas fa-cloud-rain"></i>`;
    }
    else if (weatherDescription.includes("clear")) {
        descripIcon = `<i class="fas fa-wind"></i>`;
    }

    let descriptionEl = document.createElement('div');
    descriptionEl.innerHTML = `${descripIcon} <b>Sky:</b>  ${weatherDescription}`

     // humidity
    let humidity = data.main.humidity;
    let humidityEl = document.createElement('div');
    let humidityIcon = ``;
    if (humidity >= 80) {
        humidityIcon = `<i class="fas fa-tint"></i>`;
    }
    else if (humidity >= 50) {
        humidityIcon = `<i class="fas fa-leaf"></i>`;
    }
    else if (humidity < 49) {
        humidityIcon = `<i class="fas fa-wind"></i>`;
    }
    humidityEl.innerHTML = `${humidityIcon} <b>Humidity: </b> ${humidity}%`;

    
    div.appendChild(tempEl);
    div.appendChild(feelEl);
    div.appendChild(descriptionEl);
    div.appendChild(humidityEl)
})
})

