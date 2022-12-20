if (window.localStorage.theme == "dark") { document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  theme.html("Light Mode");
} else {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
  theme.html("Dark Mode");
}

let date = new Date();
let weekdays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
let day = weekdays[date.getDay()];
function setTime() {
  let date = new Date();
  let Hours = date.getHours();
  Hours == 0 ? (Hours = "12") : Hours;
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  Seconds < 10 ? (Seconds = "0" + Seconds) : Seconds;
  Minutes < 10 ? (Minutes = "0" + Minutes) : Minutes;
  Hours > 12 ? (Hours -= 12) : Hours;
  Hours < 10 ? (Hours = "0" + Hours) : Hours;

  // console.log(Hours + ":" + Minutes);
  Time.html(Hours + ":" + Minutes + ":" + Seconds );
}

function calculateDaysBetweenDates(begin, end) {
  var oneDay = 24 * 60 * 60 * 1000;
  var diffDays = Math.round(Math.abs((begin - end) / oneDay));
  return diffDays;
}