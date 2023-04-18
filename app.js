window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = "https://cors-anywhere.herokuapp.com/";
            // const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=${long}&lat=${lat}`;
            const api = `http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=${long}&lat=${lat}&units=imperial`;
            // const api = `http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=82.987289&lat=25.321684&units=imperial`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Set DOM elements from the API
                    const icon = data.weather[0].icon;
                    const temp = data.main.temp;
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;

                    // Formula for celcius
                    let celcius = (temp - 32) * (5 / 9);

                    // Set Icons
                    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                    //setIcons(icon,icon_id);

                    // Change temperatur in cel/Farh
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                        }
                    })
                })
        })
    }


    /*function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
         50n -> PARTLY_CLOUDY_DAY 
           50n -> PARTLY_CLOUDY_DAY 
           50n -> PARTLY_CLOUDY_DAY 
           50n -> PARTLY_CLOUDY_DAY 
           50n -> PARTLY_CLOUDY_DAY 
        
        const currentIcon = icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }*/
})