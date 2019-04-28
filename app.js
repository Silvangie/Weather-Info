const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny",
  "Snow": "wi wi-day-snow",
  "Mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
}




function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}


async function main(withIP = true){
  const url = "https://api.ipify.org?format=json";
  const url2 = 'https://freegeoip.app/json/';
  const id ="1e9f9c07cf160afdf318e76b46078f64";
  let ville;

  if(withIP) {
  // Recherche de l'IP
    const ip = await fetch(url)
      // console.log('url', url);
      .then (res => res.json())
      .then (json => json.ip)
      console.log ('ip', ip);
    
    // Recherche de la ville grâce à l'IP  
    ville = await fetch (url2 + ip) 
        // console.log ('url2', url2);
        .then(res => res.json())
        .then(json => json.city)
        console.log ('ville', ville);
  } else {
    ville = document.querySelector('#ville').textContent;
  }


  const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${id}&lang=fr&units=metric`;
  const meteo = await fetch (url3)
  
    .then(res => res.json())
    .then(json => json)
    console.log(meteo);
       
    displayWeatherInfos(meteo)
}
  function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions =  data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector('.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
  }

   // Rendre le  ville editable
  const ville = document.querySelector('#ville');

  ville.addEventListener('click', () => {
    ville.contentEditable = true;
  })

  // Paramétrage de la touche "entrée"
  // keycode.io
  ville.addEventListener('keydown', (e)=> {
    if(e.keyCode === 13){
      e.preventDefault();
      ville.contentEditable = false;
      // arret de l'édition
      main(false);
    }
  })
main();