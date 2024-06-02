const apiKey = '63af8f0dc923c395faf1fe2572bae82b';

        //écouteur d'évènement
        document.getElementById('weatherForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const city = document.getElementById('city').value;
            getWeatherData(city);
        });

        //récupération de données
        function getWeatherData(city) {
            const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
            const params = new URLSearchParams({
                q: city,
                appid: apiKey,
                units: 'metric',  // Pour obtenir les températures en Celsius
                lang: 'fr'  // Pour obtenir les descriptions en français
            });

            fetch(`${baseUrl}?${params.toString()}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(error => {
                    document.getElementById('weatherResult').innerText = error.message;
                });
        }

        //affichage des données
        function displayWeatherData(data) {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `
                <h2>Météo à ${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Température: ${data.main.temp}°C</p>
                <p>Humidité: ${data.main.humidity}%</p>
                <p>Vent: ${data.wind.speed} m/s</p>
            `;
        }
