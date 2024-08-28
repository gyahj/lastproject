function realData(response) {
  //console.log(response.data);

  let tempRound = Math.round(response.data.temperature.current);
  let h1Element = document.querySelector("#h1");
  let countryElement = document.querySelector("#country");
  let tempElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let timeDate = new Date(response.data.time * 1000);
  //let descriptionElement = document.querySelector("#descrip ");
  //console.log(descriptionElement);
  let hour = timeDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = timeDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let humidityElement = document.querySelector("#humi");
  let windElement = document.querySelector("#wini");
  let dayElemet = document.querySelector("#day-sec");
  let timeElement = document.querySelector("#time-sec");
  let dateElement = document.querySelector("#date-sec");
  let descriptionElement = document.querySelector("#descrip");
  let hcity = response.data.city;

  countryElement.innerHTML = `•${response.data.country}`;
  h1Element.innerHTML = `&#x2762; ${hcity}`;
  tempElement.innerHTML = tempRound;
  //descriptionElement.innerHTML = `des:${response.data.condition.description}`;
  humidityElement.innerHTML = `${Math.round(
    response.data.temperature.humidity
  )} %`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" >`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
  dayElemet.innerHTML = dateMach(timeDate);
  timeElement.innerHTML = `${hour}:${minute}`;
  dateElement.innerHTML = fullDt(timeDate);

  castKeys(response.data.city);
}

function dateMach(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}
function fullDt(month) {
  let year = month.getFullYear();
  let years = month.getDate();
  let allYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let fullDet = allYear[month.getMonth()];

  if (years < 10) {
    years = `0${years}`;
  }
  return `${years}-${fullDet}-${year}`;
}

function searchCity(city) {
  let apiKey = "d8629b2a0231f4b2b7t6f9cd82o33b14";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  //console.log(axios);
  axios.get(apiUrl).then(realData);
}

function searchForm(evnt) {
  evnt.preventDefault();
  let inputElement = document.querySelector("#type");
  // console.log(inputElement.value);

  // h1Element.innerHTML = `&#x2762;${inputElement.value}`;

  searchCity(inputElement.value);
}

function lastDays(time) {
  let tym = new Date(time * 1000);
  let myDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return myDays[tym.getDay()];
}

function castKeys(city) {
  let apiK = "d8629b2a0231f4b2b7t6f9cd82o33b14";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiK}&unit=metric`;
  axios.get(apiUrl).then(forcastBord);
  console.log(apiUrl);
}

function forcastBord(response) {
  console.log(response.data);
  //let forcastDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forcastHtml = "";
  response.data.daily.forEach(function (dayss, index) {
    if (index < 5) {
      forcastHtml += `<div class="for-main" id="for-main">
          <div class="for-day" id="for-day">${lastDays(dayss.time)}</div>
            <img src="${dayss.condition.icon_url}" class="for-icon"/>
          
            <div class="for-unit" id="for-unit">
              <span class="max" id="max">${Math.round(
                dayss.temperature.maximum
              )}°</span>

              <span class="mini" id="mini">${Math.round(
                dayss.temperature.minimum
              )}°</span>
            </div>
            </div>`;
    }
  });

  let forcastTool = document.querySelector("#forcast");
  forcastTool.innerHTML = forcastHtml;
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", searchForm);

searchCity("Berlin");
