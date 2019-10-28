
// Fonction appelée lors du click du bouton
function start() {

   
  city = document.getElementById('city-input').value; //q3
  if(city === "")
  { city=undefined;
  }

  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

//recup des 3 jours

    apiWeather
    .fetchTroisjourForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data2 = response.data;
      let jours=0;


      data2.list.forEach((data2, index)=> {
      jours++;

      document.getElementById(`${jours}-forecast-main`).innerHTML = data2.weather[0].main;
      document.getElementById(`${jours}-forecast-more-info`).innerHTML = data2.weather[0].description;
      document.getElementById(`${jours}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data2.weather[0].icon);
      document.getElementById(`${jours}-forecast-temp`).innerHTML = `${data2.temp.day}°C`;
      
    });

  
  });
  console.log(apiWeather.city);

}

