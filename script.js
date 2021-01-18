// https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/11.457650,78.192291

window.addEventListener('load' , ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempratureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.longitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
                fetch(api)
                .then(response => {
                    console.log(response.json()); 
                })
                .then(data => {
                    const {temperature , summary , icon} = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // console.log(data);

                    // temp convertion formula
                    let f = (temperature * 9/5) + 32;

                    //set icon
                    setIcons(icon,document.querySelector('.icon'));

                    //F to Celcius
                    tempratureSection.addEventListener('click', ()=>
                {
                    if(temperatureSpan.textContent === 'C°')
                    {
                        temperatureSpan.textContent = 'F°';
                        temperatureDegree.textContent = Math.floor(f);
                    }
                    else
                    {
                        temperatureSpan.textContent = 'C°';
                        temperatureDegree.textContent = temperature;
                    }
                });
                });
        });
    }
function setIcons(icon, iconID)
{
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}
});