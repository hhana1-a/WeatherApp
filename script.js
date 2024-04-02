const apiKey = "8594f6bf44f5c7bcaaba081193b6f3f2";

const search = document.querySelector('.search_cont');
const searchInput = document.querySelector('#search-input'); 
const info = document.querySelector('.info'); 
const infoBlock = document.querySelector('.info .info_block'); 
const infoCont = document.querySelector('.info .info_cont');

search.addEventListener("submit", async event => {
    event.preventDefault(); 
    const city = searchInput.value;

    if (!city) {    
        displayError("Please fill in the form.");
    } else {
        try {
            const data = await getWeatherData(city);
            displayWeather(data); 
        } catch(error) {
            console.error(error);
               
        
         }
    } 
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl);
    if (!response.ok) {
       displayError('Data unavailable.');
    } else {
        return await response.json();
    }
}

function displayWeather(data) {
    const temp = Math.floor(data.main.temp);
    const feelsLike = Math.floor(data.main.feels_like);
    const humidity = Math.floor(data.main.humidity);
    const name = data.name;
    const country = data.sys.country;
    const id = data.weather[0].id;

    const icon = document.createElement("p");

    icon.innerText = getIcon(id);


    console.log(temp, feelsLike, humidity, name + ", " + country, icon)

    infoBlock.innerHTML = ""; 
    infoBlock.style.display = "flex";
    infoCont.innerHTML = ""; 
    infoCont.style.display = "flex";

    const infoContTitle = document.createElement('p');
    infoContTitle.classList.add('info_cont');
    infoCont.appendChild(infoContTitle);
  
    infoContTitle.textContent = name + ", " + country + ", " + icon.innerText;
    

    const infoBlock_1 = document.createElement("div")
    const pTemp = document.createElement('p');
    pTemp.textContent = temp + "°C";
    const pTempText = document.createElement('p');
    pTempText.textContent = "Temperature";

    infoBlock_1.classList.add('info_block_1');
    pTemp.classList.add('temp_data')

    infoBlock_1.appendChild(pTemp)
    infoBlock_1.appendChild(pTempText)
    infoBlock.appendChild(infoBlock_1)

    const infoBlock_2 = document.createElement("div")
    const pFeels = document.createElement('p');
    pFeels.innerHTML = feelsLike + "&deg;C";
    const pFeelsText = document.createElement('p');
    pFeelsText.textContent = "Feels like";

    infoBlock_2.classList.add('info_block_2');
    pFeels.classList.add('feels_like_data')

    infoBlock_2.appendChild(pFeels)
    infoBlock_2.appendChild(pFeelsText)
    infoBlock.appendChild(infoBlock_2)

    const infoBlock_3 = document.createElement("div")
    const pHumidity = document.createElement('p');
    pHumidity.textContent = humidity + "%";
    const pHumidityText = document.createElement('p');
    pHumidityText.textContent = "Humidity";

    infoBlock_3.classList.add('info_block_3');
    pHumidity.classList.add('humidity_data')

    infoBlock_3.appendChild(pHumidity)
    infoBlock_3.appendChild(pHumidityText)
    infoBlock.appendChild(infoBlock_3)

    info.appendChild(infoBlock);

}

function getIcon (id) {

        switch(true){
            case (id >= 200 && id < 300):
                return "⛈";
            case (id >= 300 && id < 400):
                return "🌧";
            case (id >= 500 && id < 600):
                return "🌧";
            case (id >= 600 && id < 700):
                return "❄";
            case (id >= 700 && id < 800):
                return "🌫";
            case (id === 800):
                return "☀";
            case (id >= 801 && id < 810):
                return "☁";
            default:
                return "❓";
        }
    
}



function displayError(message) {
    infoCont.style.display = "flex";

        const newTitleElement = document.createElement('p');
        newTitleElement.textContent = message;
        newTitleElement.classList.add("title", "info_cont");
        infoCont.textContent = ""; 
        infoCont.appendChild(newTitleElement);
  
    infoBlock.style.display = "none";
}
