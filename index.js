const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput"
);
const card=document.querySelector(".card");
const apikey="db7047485e9ffb3d43e22aa3577620c7";


weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayError("An error occurred while fetching the weather data. Please try again later.");
        }

    }
    else{
        displayError("Please enter a city");
    }

});
async function getWeatherData(city){

    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const responce = await fetch(apiurl);
    console.log(responce);

    if(!responce.ok){
        throw new Error("Failed to fetch weather data");
    }

    const data = await responce.json();
    return data;
}
function displayWeatherInfo(data){
    const {name: city, main:{temp,humidity},weather:[{id:weatherId,description}] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `Temperature: ${((temp-273.15)*(9/5)+32).toFixed(2)}°F`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    const descDisplay = document.createElement("p");
    descDisplay.textContent = `Weather: ${description}`;
    descDisplay.classList.add("weatherDisplay");
    card.appendChild(descDisplay);

    const weatherEmoji = getWeatherEmoji(weatherId);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId){
    const emoji = document.createElement("span");
    if(weatherId >= 200 && weatherId < 300){
        emoji.textContent = "🌩️"; // Thunderstorm
    } else if(weatherId >= 300 && weatherId < 400){
        emoji.textContent = "🌧️"; // Drizzle
    } else if(weatherId >= 500 && weatherId < 600){
        emoji.textContent = "🌧️"; // Rain
    } else if(weatherId >= 600 && weatherId < 700){
        emoji.textContent = "❄️"; // Snow
    } else if(weatherId >= 700 && weatherId < 800){
        emoji.textContent = "🌫️"; // Atmosphere
    } else if(weatherId === 800){
        emoji.textContent = "☀️"; // Clear
    } else if(weatherId > 800){
        emoji.textContent = "☁️"; // Clouds
    }
    return emoji;

}
function displayError(message){
const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

card.textContent = "";
card.style.display = "flex";
card.appendChild(errorDisplay);

}
