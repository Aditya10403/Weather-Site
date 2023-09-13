let locationtimezone = document.querySelector(".location-timezone");
let icon = document.querySelector(".icon"); // img
let temperature = document.querySelector(".temperature-degree");
let temperatureSection = document.querySelector(".temperature");
let temperatureSpan = document.querySelector(".temperature span");
let description = document.querySelector(".temperature-description");
let humidity = document.querySelector(".humidity-per");
let speed = document.querySelector(".speed");
let input = document.getElementById("input");
let api_key = "1d509ee9c64c3f79d8b44cb27257bce0";

window.addEventListener("load", () => {
  // setIcons("PARTLY_CLOUDY_DAY", "white");
  // let lon, lat, loc;
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     lon = position.coords.longitude;
  //     lat = position.coords.latitude;
  //     const api_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  //     let gdata = await fetch(api_1);
  //     let jdata = await gdata.json();
  //     loc = jdata.name;
  //     console.log(loc);
  //     data(loc);
  //   });
  // }
});
window.onload = () => {
  setIcons("PARTLY_CLOUDY_DAY", "white");
  let lon, lat, loc;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      let gdata = await fetch(api_1);
      let jdata = await gdata.json();
      loc = jdata.name;
      console.log(loc);
      data(loc);
    });
  }
};
const data = async function (search) {
  let getdata = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`
  );

  let jsondata = await getdata.json();
  console.log(jsondata);

  if (jsondata.cod == 404) {
    alert("!Please Enter correct Location");
    changeBGImage("DEFAULT");
    locationtimezone.innerHTML = "Timezone";
    temperature.innerHTML = "30";
    humidity.innerHTML = "60";
    speed.innerHTML = "6.8";
    setIcons("PARTLY_CLOUDY_DAY", "white");
    return;
  }
  if (jsondata.cod == 400) {
    alert("!Please First enter location");
    return;
  }

  locationtimezone.innerHTML = jsondata.name;
  let temp = jsondata.main.temp;
  temperature.textContent = Math.floor(temp);
  description.innerHTML = jsondata.weather[0].description;
  humidity.innerHTML = jsondata.main.humidity;
  speed.innerHTML = jsondata.wind.speed;
  let icon_code = jsondata.weather[0].icon;

  let icon_id;
  let color_code;

  if (icon_code == "01d" || icon_code == "01n") {
    icon_id = "CLEAR_DAY";
  } else if (icon_code == "02d" || icon_code == "02n") {
    icon_id = "PARTLY_CLOUDY_DAY";
  } else if (
    icon_code == "03d" ||
    icon_code == "04d" ||
    icon_code == "03n" ||
    icon_code == "04n"
  ) {
    icon_id = "CLOUDY";
  } else if (icon_code == "09d" || icon_code == "09n") {
    icon_id = "SLEET";
  } else if (icon_code == "10d" || icon_code == "10n") {
    icon_id = "RAIN";
  } else if (icon_code == "11d" || icon_code == "11n") {
    icon_id = "WIND";
  } else if (icon_code == "13d" || icon_code == "13n") {
    icon_id = "SNOW";
  } else if (icon_code == "50d" || icon_code == "50n") {
    icon_id = "FOG";
  }

  let img_code;
  color_code = colour(icon_code[2]);

  function colour(color_code) {
    if (color_code == "d") {
      img_code = icon_id;
      return "white";
    } else {
      img_code = icon_id.concat(color_code);
      return "black";
    }
  }

  setIcons(icon_id, color_code);
  changeBGImage(img_code);

  let farh = temp * (9 / 5) + 32;
  temperatureSection.addEventListener("click", () => {
    if (temperatureSpan.textContent === "°C") {
      temperatureSpan.textContent = "°F";
      temperature.textContent = Math.floor(farh);
    } else {
      temperatureSpan.textContent = "°C";
      temperature.textContent = Math.floor(temp);
    }
  });
};

function openFun() {
  search = input.value;
  data(search);
}

function setIcons(icon_id, color_code) {
  const skycons = new Skycons({ color: color_code });
  const currentIcon = icon_id;
  skycons.play();
  return skycons.set(document.querySelector(".icon"), Skycons[currentIcon]);
}

function changeBGImage(backgrnd) {
  document.body.style = `
  background: url('photos/${backgrnd}.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
`;
}

//       // const proxy = "https://cors-anywhere.herokuapp.com/";
//       // const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=${long}&lat=${lat}`;
//       const api = `http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=${long}&lat=${lat}&units=imperial`;
//       //const api = `http://api.openweathermap.org/data/2.5/weather?APPID=1d509ee9c64c3f79d8b44cb27257bce0&lon=87.321930&lat=2&units=imperial`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           // Set DOM elements from the API
//           const icon = data.weather[0].icon;
