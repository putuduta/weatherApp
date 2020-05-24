//jshint esversion:6
//call packages
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
//bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));


//get request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//post request
app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = '7a797fbc260254a04bcf5a91d5005e5f';
    const unit = 'metric';
    //call the api
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID=' + apiKey + '&units=' + unit;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            //turn into json format
            const weatherData = JSON.parse(data);
            //call temp from weather data branch
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            //call the image from icon
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degress Celcius.</h1>');
            res.write('<p>The weather is currently ' + weatherDesc + '</p>');
            res.write('<img src=' + imageUrl + '>');
            res.send();
        });
    });
});



app.listen(3000, () => console.log('Server port is running on port 3000.'));