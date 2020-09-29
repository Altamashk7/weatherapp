const express= require("express");
const app=express();
const https = require('https');

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{

res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{

const city=req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="Please enter your own api key"&units=metric"
https.get(url, (response) => {
 // console.log(response);
  

  response.on('data', (data) => {
    const weatherdata=JSON.parse(data)

    const temp=weatherdata.main.temp
    const weatherd=weatherdata.weather[0].description
    const icon=weatherdata.weather[0].icon
    const image="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>Temperature in "+city+" is "+temp+" degree Celcius </h1>");
    res.write("<img src="+image+">");
    res.send();
    console.log(temp);
  });

}
);

})

app.listen(3000,function()
{
console.log("server  loading fine");


});
