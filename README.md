Set up connection between git and github
Create a skeletal html structure
Use tailwindCSS to design the web page (layout and responsiveness)
Link js and html using references by id
Adding an eventlistener to handle form submission
Implemented functions to get weather data from OpenWeatherAPI, display weathers, change background and emojis dynamically, displaying errors, toggle temperature from celsius to Farenheit and vise versa, dropdown menu, currentlocation and weather alerts

The user enters a city name
The website sends an request to openweahterAPI: If the city exists then the weather card for 5 days is shown, else it gives an error
Dropdown menu is loaded using previously searched cities using localstorage
Geolocation is also supported: it gives the current gps location to user 
When the temps are extreme, an alert is shown
The website is responsive for mobiles, tablets and desktop.
On page reload, the data persists(Since LocalStorage is used)
